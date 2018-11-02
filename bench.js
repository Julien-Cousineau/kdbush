
import KDBush from './src/index.js';
import v8 from 'v8';

// const randomInt = max => Math.floor(Math.random() * max);
// const randomPoint = max => ({x: randomInt(max), y: randomInt(max)});
const n = 1000000;
const x = new Float32Array(n);
const y = new Float32Array(n);
const heapSize = () => `${v8.getHeapStatistics().used_heap_size / 1000  } KB`;


for (let i = 0; i < 1000000; i++) { x[i] = Math.random() * n; y[i] = Math.random() * n; }

console.log(`memory: ${  heapSize()}`);

console.time(`index ${  x.length  } points`);
const index = new KDBush(x, y, 64, Float32Array);
console.timeEnd(`index ${  x.length  } points`);

console.log(`memory: ${  heapSize()}`);

console.time('10000 small bbox queries');
for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 1000;
    const y = Math.random() * 1000;
    index.range(x - 1, y - 1, x + 1, y + 1);
}
console.timeEnd('10000 small bbox queries');

console.time('10000 small radius queries');
for (let i = 0; i < 10000; i++) {
    const x = Math.random() * 1000;
    const y = Math.random() * 1000;
    index.within(x, y, 1);
}
console.timeEnd('10000 small radius queries');
