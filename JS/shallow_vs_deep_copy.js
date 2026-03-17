// Deep copy (preferred in modern JS environments)
function deepCopyObject(obj) {
  return structuredClone(obj);
}

// Fallback deep copy for plain objects/arrays
function deepCopyObjectFallback(value) {
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
  user: { name: "Ashis", skills: ["JS", "React"] },
};

const copied = deepCopyObjectFallback(original);
copied.user.name = "Updated";

console.log(original.user.name); // "Ashis" (unchanged)
console.log(copied.user.name);   // "Updated"
