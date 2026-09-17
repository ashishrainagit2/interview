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