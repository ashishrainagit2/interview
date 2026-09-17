// Jack harrington: https://www.youtube.com/watch?v=MzKHrWCymAU
// frontend master : https://www.youtube.com/watch?v=sLhqHsElUDA

// Shallow copy:
const newArray = [...oldArray];
const newObject = { ...oldObject };

const newObject2 = Object.assign({}, oldObject);

const newArray2 = oldArray.slice();
const newArray3 = oldArray.map(
  (item) => item
);

const newArray4 = oldArray.filter(
  (item) => item 
)

// Deep copy (preferred in modern JS environments)
function deepCopyObject(obj) {
  return structuredClone(obj);
}

const newCloned = JSON.parse(JSON.stringify(oldObject));


// *********************************************************************************
          // Deep copy example
// *********************************************************************************


// Simple variation
function deepClone(param, seen= new WeakMap()) {
  const result = {}

  if(seen.has(param)){
    throw new Error("Cyclic Reference");
  }

  // mark BEFORE recursion so cycles (a.loop = a) are detected
  seen.set(param, true)

  Object.keys(param).forEach(function (key) {
    const data = param[key]

    // typeof null === "object" — must check data !== null
    if (typeof data === 'object' && data !== null) {
      result[key] = deepClone(data, seen)
    } else {
      result[key] = data
    }
  })

  return result
}




// Fallback deep copy for plain objects/arrays
function deepCopyObjectFallback(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;

    // circular ref check
    if (seen.has(value)) return seen.get(value);

    if (Array.isArray(value)) {
      const arrCopy = [];
      seen.set(value, arrCopy);
      for (const item of value) {
        arrCopy.push(deepCopyObjectFallback(item, seen));
      }
      return arrCopy;
    }

  const copied = {};
  seen.set(value, copied);
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      copied[key] = deepCopyObjectFallback(value[key]);
    }
  }
  return copied;
}

// Example
let original = {
          name: "Ashis", 
          skills: ["JS", "React"] , 
          profile : {
            role: 'programmer',
          }
        }

// original.loop = original;
// this will create a loop and deep copy will not work
// circular reference creates a loop and deep copy will not work

original.profile.role = 'manager';
original.profile.location = 'Kolkata';

const copied = deepCopyObjectFallback(original);


console.log(original.name); // "Ashis" (unchanged)
console.log(copied.name);   // "Updated"


// explaination for below line

// if (Object.prototype.hasOwnProperty.call(value, key)) {
//   copied[key] = deepCopyObjectFallback(value[key]);
// }

const parent = { x: 1 };
const child = Object.create(parent);
child.y = 2;
for (const key in child) {
  console.log(key); // y, x   (x is inherited)
}
// Now check:

// hasOwnProperty(child, "y") -> true ✅
// hasOwnProperty(child, "x") -> false ❌
// So clone copies y, skips x.

// https://codesandbox.io/p/sandbox/rwxkmk?file=%2Fsrc%2Findex.js
