https://www.youtube.com/watch?v=-hBJz2PPIVE
// FROM AI

// Call by value vs call by reference (JavaScript)

// Short answer for interviews:
// JavaScript is ALWAYS pass-by-value.
// For primitives, the value itself is copied.
// For objects/arrays/functions, the reference (memory address) is copied.
// So you can mutate the original object through that copied reference,
// but reassigning the parameter does not change the outer variable.

// ============================================
// 1. Primitives — pass by value (copy)
// ============================================

let a = 10;

function changePrimitive(num) {
  num = 20; // only changes local copy
  console.log("inside =>", num); // 20
}

changePrimitive(a);
console.log("outside =>", a); // 10 — unchanged

// ============================================
// 2. Objects — reference is copied (not the object itself)
// ============================================

const user = { name: "Ashish", age: 25 };

function updateUser(obj) {
  obj.age = 30; // mutates same object in memory
  console.log("inside =>", obj); // { name: "Ashish", age: 30 }
}

updateUser(user);
console.log("outside =>", user); // { name: "Ashish", age: 30 } — changed

// ============================================
// 3. Reassignment inside function — outer stays same
// ============================================

const person = { name: "Rahul" };

function reassignPerson(obj) {
  obj = { name: "Vikram" }; // reassigns local reference only
  console.log("inside =>", obj); // { name: "Vikram" }
}

reassignPerson(person);
console.log("outside =>", person); // { name: "Rahul" } — unchanged

// ============================================
// 4. Arrays — same behavior as objects
// ============================================

const nums = [1, 2, 3];

function pushNum(arr) {
  arr.push(4); // mutates original array
}

pushNum(nums);
console.log(nums); // [1, 2, 3, 4]

function replaceArray(arr) {
  arr = [9, 9, 9]; // local reassignment only
}

replaceArray(nums);
console.log(nums); // still [1, 2, 3, 4]

// ============================================
// Quick comparison
// ============================================

// | Type        | What gets copied | Change inside function      | Reassign param inside fn |
// |-------------|------------------|-----------------------------|---------------------------|
// | number      | value            | outer unchanged             | outer unchanged           |
// | string      | value            | outer unchanged             | outer unchanged           |
// | boolean     | value            | outer unchanged             | outer unchanged           |
// | object      | reference        | outer CAN change (mutate)   | outer unchanged           |
// | array       | reference        | outer CAN change (mutate)   | outer unchanged           |
// | function    | reference        | outer CAN change (mutate)   | outer unchanged           |

// ============================================
// Mutate vs reassign — remember this
// ============================================

// mutate  -> obj.key = newValue, arr.push(x)     -> affects original
// reassign -> obj = {}, arr = []                 -> affects local copy only

// ============================================
// One-liner for interviews
// ============================================

// JS passes everything by value.
// Primitives copy the actual value.
// Objects copy the reference, so mutation is visible outside,
// but reassignment inside a function is not.
