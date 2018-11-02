A very fast static spatial index for 2D points based on a flat KD-tree.
Compared to [RBush](https://github.com/mourner/rbush):

- points only — no rectangles
- static — you can't add/remove items
- indexing is 5-8 times faster

```js
const index = new KDBush(x,y);         // make an index
const ids1 = index.range(10, 10, 20, 20); // bbox search - minX, minY, maxX, maxY
const ids2 = index.within(10, 10, 5);     // radius search - x, y, radius
```

## Install

Install using NPM (`npm install @julien.cousineau/kdbush`), then:

```js
// import as a ES module
import KDBush from '@julien.cousineau/kdbush';

// or require in Node / Browserify
const KDBush = require('kdbush');
```



## API

#### new KDBush(points[, getX, getY, nodeSize, arrayType])

Creates an index from the given points.

- `x`: Input array of x.
- `y`: Input array of y.
- `nodeSize`: Size of the KD-tree node, `64` by default. Higher means faster indexing but slower search, and vise versa.
- `arrayType`: Array type to use for storing coordinate values. `Float64Array` by default, but if your coordinates are integer values, `Int32Array` makes things a bit faster.

```js
const x = new Float32Array(n);
const y = new Float32Array(n);
const index = new KDBush(x, y, 64, Float32Array);
```

#### index.range(minX, minY, maxX, maxY)

Finds all items within the given bounding box and returns an array of indices that refer to the items in the original `x` and `y` input array.

```js
const results = index.range(10, 10, 20, 20).map(id => [x[id],y[id]]);
```

#### index.within(x, y, radius)

Finds all items within a given radius from the query point and returns an array of indices.

```js
const results = index.within(10, 10, 5).map(id => [x[id],y[id]]);
```
