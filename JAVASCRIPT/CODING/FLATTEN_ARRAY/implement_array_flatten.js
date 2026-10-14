// Flatten: turn a nested array into a single-level array of values.

/**
 * @param {unknown[]} arr - may contain nested arrays to any depth
 * @returns {unknown[]}
 */

const arrayFlatten = (arr) => {
    const result = [];
    const flatten = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                flatten(arr[i]);
            } else {
                result.push(arr[i]);
            }
        }
    }
    flatten(arr);
    return result;
}

// Built-in (modern): arr.flat(Infinity)

// Examples
console.log(arrayFlatten([1, [2, 3], 4])); // [1, 2, 3, 4]
console.log(arrayFlatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]

//https://codesandbox.io/p/sandbox/hpgp39


// modern solution
const flattenArray = (arr) => {
    return arr.flat(Infinity);
}

// Examples
console.log(flattenArray([1, [2, 3], 4])); // [1, 2, 3, 4]
console.log(flattenArray([1, [2, [3, [4]]]])); // [1, 2, 3, 4]


// ---------------------------------------------------------------------------
// Beyond the basic flatten (interview follow-ups)
// ---------------------------------------------------------------------------

// 1. Depth-limited flatten  (like arr.flat(depth))
//    depth 1 → only one level. depth 2 → two levels. omit depth → all the way.
const arrayFlattenDepth = (arr, depth = Infinity) => {
    const result = [];
    const flatten = (list, d) => {
        for (let i = 0; i < list.length; i++) {
            if (Array.isArray(list[i]) && d > 0) {
                flatten(list[i], d - 1);
            } else {
                result.push(list[i]);
            }
        }
    };
    flatten(arr, depth);
    return result;
};

console.log(arrayFlattenDepth([1, [2, [3, [4]]]], 1)); // [1, 2, [3, [4]]]
console.log(arrayFlattenDepth([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]


// 2. Iterative (stack) — no recursion
//    Deep nesting can blow the call stack. A stack loop is O(n) time, O(n) space,
//    and does not grow JS call frames.
const arrayFlattenIterative = (arr) => {
    const stack = [...arr];
    const result = [];
    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            stack.push(...item);
        } else {
            result.push(item);
        }
    }
    return result.reverse(); // pop() walks right-to-left, so reverse at the end
};

console.log(arrayFlattenIterative([1, [2, [3, [4]]]])); // [1, 2, 3, 4]


// 3. reduce + concat (one level only unless you recurse)
const arrayFlattenReduce = (arr) =>
    arr.reduce(
        (acc, item) =>
            acc.concat(Array.isArray(item) ? arrayFlattenReduce(item) : item),
        []
    );

console.log(arrayFlattenReduce([1, [2, [3, 4]]])); // [1, 2, 3, 4]


// 4. What they may still ask
//    - Do not flatten strings (they are array-like). Always use Array.isArray, not typeof / length.
//    - Sparse holes: for-loop visits holes as empty; for...of skips them. Know the difference.
//    - Time O(n), space O(n), n = total nested elements.
//    - arr.flat(Infinity) is the production answer; they still want you to write it by hand.