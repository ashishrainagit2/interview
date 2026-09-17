// Short checklist. Explanations → deep.js
// Skip what this folder already covers:
// closure, this, call/apply/bind, curry, debounce/throttle, promises,
// async/await, event loop, let/const/var, shallow/deep copy,
// value vs reference, storage, CRP, async/defer, array methods,
// object looping, flatten, memoize, polyfills, output questions

// ============================================================
// LANGUAGE vs JS
// ============================================================
// source → parse → AST → bytecode / machine code → CPU
// AOT vs VM vs interpret/JIT
// manual memory vs ownership vs GC
// threads vs actors vs event loop
// static vs dynamic, strong vs weak types
// how JS differs (browser-born, prototypes, weak types)
// good / bad of JS

// ============================================================
// ENGINE / RUNTIME / SYSTEM
// ============================================================
// browser processes (browser, GPU, network, renderer)
// main thread vs compositor vs workers
// execution context + call stack + lexical environment
// microtask queue vs macrotask (callback) queue
// V8: parse → Ignition → TurboFan JIT → deopt
// stack vs heap, young gen vs old gen, mark-sweep-compact
// memory leaks (timers, detached DOM, closures, unbounded cache)
// hidden classes (object shape) + inline caches
// array kinds: packed SMI → packed double → holey
// 16.6ms frame budget / long tasks freeze UI
// event loop vs OS scheduler
// Node libuv threadpool

// ============================================================
// SCOPE / HOISTING
// ============================================================
// temporal dead zone (let/const)
// scope chain + shadowing
// function vs block vs module scope
// default params also have a TDZ

// ============================================================
// TYPES / EQUALITY / COERCION
// ============================================================
// ToPrimitive, valueOf, toString
// == abstract equality algorithm
// Object.is / SameValueZero (Map, Set, includes)
// NaN, -0, 0.1 + 0.2
// typeof null === "object"
// JSON.stringify pitfalls (undefined, Date, NaN, functions, circular)

// ============================================================
// OBJECTS
// ============================================================
// property descriptors: writable, enumerable, configurable
// Object.defineProperty / getOwnPropertyDescriptor
// freeze vs seal vs preventExtensions
// getters / setters
// Object.create(null) — no prototype
// in vs hasOwnProperty vs Object.hasOwn

// ============================================================
// PROTOTYPE / CLASS  (files exist but empty — fill these)
// ============================================================
// __proto__ vs .prototype
// new keyword steps
// prototype chain lookup
// instanceof + Symbol.hasInstance
// class: super, static, private #fields
// composition vs inheritance

// ============================================================
// ITERATION / ADVANCED TYPES
// ============================================================
// Symbol + well-known symbols (iterator, toStringTag)
// iterator protocol + for...of
// generators (function*) + yield
// async iterators / for await...of
// Map vs Object vs Set
// WeakMap / WeakSet (GC-friendly, no leak)

// ============================================================
// META / HARD INTERVIEW
// ============================================================
// Proxy + Reflect (validation, observe, default values)
// WeakRef / FinalizationRegistry
// structured clone (postMessage, history.state, deep clone)
// AbortController (cancel fetch)
// ESM vs CJS, circular imports, tree-shaking
// event delegation + capturing vs bubbling
// requestAnimationFrame vs setTimeout (render pipeline)
// Web Workers (JS off main thread)

// ============================================================
// FUNCTIONS
// ============================================================
// arity (fn.length) + rest vs arguments
// new.target
// pipe / compose
// partial application vs currying
// pure function + immutability

// START HERE:
// 1. prototype + new          → prototyping.js
// 2. class / super / #private → THEORY/classes_and_objects_in_js.js
// 3. Map / Set / WeakMap      → THEORY/get_expert_with.js
// 4. system / language model  → deep.js
// 5. coercion + Object.is
// 6. Proxy
// 7. generators
// 8. AbortController


// ============================================================

// ES6 and ES7 features:

// ES6 features:
// 1. let and const
// 2. arrow functions
// 3. template literals
// 4. destructuring assignment
// 5. spread operator
// 6. rest parameter
// 7. default parameter
// 8. object literal enhancements
// 9. class
// 10. modules

// ES7 features:
// 1. async/await
// 2. exponential operator
// 3. Object.entries and Object.values
// 4. String padding
// 5. Array.includes
// 6. Object.getOwnPropertyDescriptors
// 7. Array.find and Array.findIndex
// 8. Array.fill
// 9. Array.copyWithin
// 10. Array.from
// 11. Array.of

// Search more in namastey javascript youtube channel.