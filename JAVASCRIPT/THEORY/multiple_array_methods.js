// ✅ Difference between:
// - map()
// - filter()
// - reduce()
// - forEach()
// Interview: map transforms (array→array), filter selects (array→array), reduce accumulates (array→value), forEach side effects (returns undefined).

// ✅ Map function in array
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => { 
    return number * 2; 
});
// output: [2, 4, 6, 8, 10]
// map function is used to create a new array by applying a function to each element of the original array.
//input is an array and output is an array.
// map function is not mutating the original array.

// ✅ Filter function in array
// filter function is used to create a new array by filtering the original array based on a condition.
//input is an array and output is an array.
// filter function is not mutating the original array.

const numbers = [1, 2, 3, 4, 5];
const newNumbers = numbers.filter(number => { 
    return number > 2; 
});
// output: [3, 4, 5]

// ✅ Reduce function in array
// Reduce function is used to reduce the original array to a single value.
//input is an array and output is a single value.
// Reduce function is not mutating the original array.

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => { 
    return accumulator + currentValue; }, 0);
// output: 15

// ✅ forEach function in array
// forEach function is used to iterate over the original array and perform a function on each element.
//input is an array and output is undefined.
// forEach function is not mutating the original array.

const numbers = [1, 2, 3, 4, 5];
let a = numbers.forEach(number => { return (number * 2); });
console.log(a);
// output: undefined
// forEach function is not returning anything, so the output is undefined.
// forEach function is not mutating the original array.
// forEach function is not returning anything, so the output is undefined.
