var obj = {
    name: "John",
    age: 30,
    city: "New York",
    details: {
        email: "first@example.com",
        phone: "1234567890"
    }
}

var obj2 = obj;

obj.details.email = "changed@example.com";

console.log(obj);
console.log(obj2);

var obj3 = JSON.parse(JSON.stringify(obj));

console.log(obj3);


// Deep copy (preferred in modern JS environments)
function deepCopyObject(obj) {
    return structuredClone(obj);
  }

var obj4 = deepCopyObject(obj);
console.log(obj4);

// Fallback deep copy for plain objects/arrays
function deepCopyObjectFallback(value) {
    console.log('value is ', value);
    if (value === null || typeof value !== "object") return value;
  
    if (Array.isArray(value)) {
      return value.map(deepCopyObjectFallback);
    }
  
    const copied = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        copied[key] = deepCopyObjectFallback(value[key]);
      }
    }
    return copied;
  }

// Example
const original = {
    id: 101,
    user: {
      name: "first",
      age: 27,
      skills: ["JS", "React", "TypeScript"],
      contact: {
        email: "first@example.com",
        phones: ["+91-9000000001", "+91-9000000002"],
      },
      address: {
        current: { city: "Kolkata", zip: 700001 },
        permanent: { city: "Bhubaneswar", zip: 751001 },
      },
    },
    projects: [
      {
        name: "Interview Portal",
        tech: ["React", "Node.js"],
        stats: { stars: 120, contributors: 4 },
      },
      {
        name: "UI Toolkit",
        tech: ["TypeScript", "Storybook"],
        stats: { stars: 85, contributors: 2 },
      },
    ],
    preferences: {
      theme: "dark",
      notifications: { email: true, sms: false, push: true },
      shortcuts: ["ctrl+k", "ctrl+p"],
    },
    isActive: true,
    lastLogin: null,
};
  
const copied = deepCopyObjectFallback(original);
copied.user.name = "Updated";
  
console.log(original.user.name); // "Ashis" (unchanged)
console.log(copied.user.name);   // "Updated"


Write a generic function `getArrayItems` in TypeScript that takes an array of any type and returns an array consisting of every other item starting from the first element.

function getArrayItems<T>(arr: T[]): T[] {
  return arr.filter((_, index) => index % 2 === 0);
}

// Example usage:
const numbers = [1, 2, 3, 4, 5, 6];
console.log(getArrayItems(numbers)); // [1, 3, 5]

const strings = ["a", "b", "c", "d", "e"];
console.log(getArrayItems(strings)); // ["a", "c", "e"]`


