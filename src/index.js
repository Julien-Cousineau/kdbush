
import sort from './sort';
import range from './range';
import within from './within';

export default class KDBush {
    constructor(x, y, nodeSize = 64, ArrayType = Float64Array) {
        if (x.length !== y.length) { console.warn('Size of x and y must match'); return null; }
        const n = x.length;
        this.nodeSize = nodeSize;


        const IndexArrayType = n < 65536 ? Uint16Array : Uint32Array;

        // store indices to the input array and coordinates in separate typed arrays
        const ids = this.ids = new IndexArrayType(n);
        const coords = this.coords = new ArrayType(n * 2);

        for (let i = 0; i < n; i++) {
            ids[i] = i;
            coords[2 * i] = x[i];
            coords[2 * i + 1] = y[i];
        }

        // kd-sort both arrays for efficient search (see comments in sort.js)
        sort(ids, coords, nodeSize, 0, ids.length - 1, 0);
    }

    range(minX, minY, maxX, maxY) {
        return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    }

    within(x, y, r) {
        return within(this.ids, this.coords, x, y, r, this.nodeSize);
    }
}
