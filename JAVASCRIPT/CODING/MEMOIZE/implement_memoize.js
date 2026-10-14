// Memoization:
// Store function results for given inputs so repeated calls return from cache
// instead of recalculating.

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example
function add(a, b) {
  console.log("calculating...");
  return a + b;
}

const memoizedAdd = memoize(add);

console.log(memoizedAdd(2, 3)); // calculating... 5
console.log(memoizedAdd(2, 3)); // 5 (from cache)
// Technical suneja https://www.youtube.com/watch?v=oa0FJyHMuqg