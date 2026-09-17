https://www.youtube.com/watch?v=wstwjQ1yqWQ

// ============================================================
// __proto__ vs prototype
// ============================================================
// They are NOT two names for the same thing.
//
// prototype  → lives on a FUNCTION.  The "blueprint" for instances.
// __proto__  → lives on EVERY OBJECT. The actual link used for lookup.
//
// After `const p = new Person()`:
//   p.__proto__ === Person.prototype     // true  ← this is the whole trick
//
// Reading p.sayHi() → JS looks on p, then walks p.__proto__,
// which is Person.prototype, then Object.prototype, then null.


function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log("Hi, " + this.name);
};

const p = new Person("Amit");

p.sayHi(); // "Hi, Amit"  — not on p, found via __proto__

console.log(p.__proto__ === Person.prototype);           // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__);                 // null  (end of chain)

// Person is a function, so it is ALSO an object:
console.log(Person.__proto__ === Function.prototype);    // true
// Person.prototype  = "what my instances inherit"
// Person.__proto__  = "what Person itself inherits" (Function.prototype)


// Quick table
//
//                 Who has it?              Points to
// prototype       functions only           the object instances will inherit
// __proto__       every object             that object's [[Prototype]]
// [[Prototype]]   hidden slot on objects   the real link (what JS actually uses)


// Don't use __proto__ in real code (legacy getter). Prefer:
Object.getPrototypeOf(p) === Person.prototype;           // true
Object.setPrototypeOf(p, someOtherObj);                  // works, but slow — avoid
// Create with a chosen prototype:
const p2 = Object.create(Person.prototype);


// Interview one-liner
// prototype is the blueprint hanging off a constructor.
// __proto__ is the instance's pointer to that blueprint.
// new wires them: instance.__proto__ === Constructor.prototype


// ============================================================
// Analogy — factory + toolbox
// ============================================================
// Person              = the factory (the constructor function)
// Person.prototype    = ONE toolbox hanging on the factory wall
//                       (shared methods: sayHi, etc.)
// p = new Person()    = a product rolling off the line
// p.__proto__         = a sticker on the product: "missing a tool? use THAT box"
//
// Every product gets its own sticker.
// There is still only ONE toolbox.
// That's why 1000 Person objects share sayHi — they don't copy the function,
// they all point at the same box.
//
// p.sayHi()
//   1. Is sayHi in my own pocket?  No.
//   2. Read the sticker (__proto__) → walk to Person.prototype
//   3. Toolbox has sayHi → use it, with this = me
//
// Person.__proto__ is a different sticker: "I am a function,
// if I don't have something, ask Function.prototype."
// The factory's own parent is not the toolbox it gives to products.
//
// One picture:
//
//   Person  ──.prototype──►  { sayHi }  ◄──.__proto__──  p (Amit)
//      │
//      └──.__proto__──►  Function.prototype
//
// Left arrow  = blueprint the factory publishes
// Right arrow = how the instance finds that blueprint

