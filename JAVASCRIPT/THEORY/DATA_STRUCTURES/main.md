https://www.youtube.com/watch?v=vfPd6_H7W4Q&list=PLC3y8-rFHvwg6nsAOfC5Is18KB2DrVOJy

## Array

```js
const arr = [10, 20];
arr.push(30);        // add end
arr.pop();           // remove end
arr.unshift(0);      // add start
arr.shift();         // remove start
arr.includes(20);
arr.indexOf(20);
arr.slice(0, 1);
arr.concat([40]);
arr.map((x) => x * 2);
arr.filter((x) => x > 10);
arr.reduce((a, b) => a + b, 0);
arr.find((x) => x === 20);
arr.length;
[...arr];            // iterable
```

## Object

```js
const obj = { a: 1 };
obj.b = 2;
obj["c"] = 3;
delete obj.b;
"a" in obj;
obj.hasOwnProperty("a");
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
Object.assign({}, obj);
```

## Set

```js
const s = new Set([1, 2]);
s.add(3);
s.has(1);
s.delete(2);
s.size;
s.clear();
s.forEach((v) => console.log(v));
[...s];              // insertion order, unique
s.keys();            // same as values()
s.values();
s.entries();         // [v, v]
```

## WeakSet

```js
const ws = new WeakSet();
const obj = {};
ws.add(obj);         // objects only
ws.has(obj);
ws.delete(obj);
// no .size, not iterable
```

## Map

```js
const m = new Map([
  ["a", 1],
  ["b", 2],
]);
const key = { id: 1 };
m.set("a", 1);
m.set(key, "obj");
m.get("a");
m.get(key);          // same reference
m.has("a");
m.delete("a");
m.size;
m.clear();
m.keys();
m.values();
m.entries();
m.forEach((v, k) => console.log(k, v));
[...m];              // insertion order
```

## WeakMap

```js
const wm = new WeakMap();
const key = {};
wm.set(key, "secret"); // object keys only
wm.get(key);
wm.has(key);
wm.delete(key);
// no .size, not iterable
```

## TypedArray

```js
const t = new Uint8Array(3); // fixed length
t[0] = 255;
t.length;
t.set([1, 2], 0);
t.subarray(0, 2);
```
