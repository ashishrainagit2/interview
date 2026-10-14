Rahul JhaView Rahul Jha’s profile 
• 2nd
Frontend Developer Who Turns Complex Requirements Into Fast, Reliable UI | React.js · Next.js · TypeScript
6d • 6d Visible to everyone


🚀 Deloitte Frontend Developer Interview Experience (Round 1)

I recently appeared for the first round of the Frontend Developer interview at Deloitte. Sharing all the questions I was asked in case it helps someone preparing for frontend interviews.

💡 JavaScript
✅ Why were Arrow Functions introduced when traditional functions already existed?
✅ Explain how the Event Loop works.
✅ Callbacks:
- What are callbacks?
- How many callback queues are there?
- Which callback queue has the highest priority?

✅ How does Hoisting work in JavaScript?
✅ Difference between var, let, and const in terms of hoisting.
✅ What are Generator Functions, and when would you use them?
✅ Have you used Closures in any real project? If yes, where and why?
✅ Multiple output-based questions on:
- setTimeout
- Promises
- Event Loop execution order

✅ Write a program to flatten a nested array, followed by several in-depth follow-up questions.
✅ Difference between:
- map()
- filter()
- reduce()
- forEach()

⚛️ React
✅ When does a React component re-render?
✅ What are the different ways to prevent unnecessary re-renders?
✅ useEffect vs useLayoutEffect
✅ Controlled vs Uncontrolled Components
✅ How would you optimize a large React application and improve its performance?
✅ Explain the complete Authentication Flow in a React application:
- Login flow
- Token storage
- Best practices
- Security considerations
- Follow-up questions on implementation

✅ Have you used Redux Toolkit?
- What problem does it solve?
- How does it work?
- When should you use it?
- Why Redux Toolkit over traditional Redux?

💭 One thing I really liked about the interview: It was highly discussion-based. The interviewer didn't stop at theoretical answers—they kept asking follow-up questions to understand my thought process, real-world experience, and depth of knowledge.

If you're preparing for frontend interviews, focus on understanding concepts instead of memorizing answers. Strong JavaScript fundamentals and practical React knowledge can make a huge difference.

Hope this helps! ❤️

Feel free to connect if you're preparing for frontend interviews or want detailed answers to any of these questions.

#InterviewExperience #FrontendDeveloper #JavaScript #ReactJS #FrontendInterview #WebDevelopment #SoftwareEngineer #CodingInterview #React #Developers #TechCareers

ANSWERS:

1. ✅ Why were Arrow Functions introduced when traditional functions already existed?

Answer:
Arrow functions were not added just for shorter syntax. They were added to fix how `this` works, and to make callbacks less painful.

Traditional functions get a new `this` every time they are called, depending on the caller. Arrow functions take `this` from where they were written and never change it.

Run this yourself: `node JAVASCRIPT/this.js`

```js
const user = {
  name: "Rahul",

  sayNameRegular: function () {
    console.log("1 regular method:", this.name); // Rahul  (called as user.sayNameRegular)
  },

  sayNameArrow: () => {
    console.log("2 arrow as method:", this.name); // undefined  (this is NOT user)
  },

  delayed: function () {
    console.log("3 inside delayed:", this.name); // Rahul

    setTimeout(function () {
      console.log("4 nested regular:", this.name); // undefined  (setTimeout called it)
    }, 0);

    setTimeout(() => {
      console.log("5 nested arrow:", this.name); // Rahul  (keeps delayed's this)
    }, 0);
  },
};

user.sayNameRegular();
user.sayNameArrow();
user.delayed();
```

Expected:
- `1` Rahul → regular method, `this` = object on the left of the dot
- `2` undefined → arrow as a method is wrong; it does not take `this` from `user`
- `3` Rahul → still inside the regular method
- `4` undefined → nested regular function got a new `this`
- `5` Rahul → nested arrow kept `this` from `delayed`

That `4` vs `5` pair is why arrows were introduced.

**Before ES6 you had to `.bind(this)` (or save `self = this`). Arrow does the same job with no bind.**

```js
const user = {
  name: "Rahul",

  greet: function () {
    // here this === user

    // 1. Broken: nested regular function gets its own this
    setTimeout(function () {
      console.log("broken:", this.name); // undefined
    }, 0);

    // 2. Old fix: bind the outer this onto the nested function
    setTimeout(function () {
      console.log("bind:", this.name); // Rahul
    }.bind(this), 0);

    // 3. Old fix: copy this into a variable
    const self = this;
    setTimeout(function () {
      console.log("self:", self.name); // Rahul
    }, 0);

    // 4. New: arrow takes lexical this from greet. No bind needed.
    setTimeout(() => {
      console.log("arrow:", this.name); // Rahul
    }, 0);
  },
};

user.greet();
```

`greet` is a regular function, so `this` inside `greet` is `user` (because we called `user.greet()`).
The arrow is *written inside* `greet`, so it permanently uses that same `this`.

They also inherit `arguments` and `super` from the outer function, and they cannot be used as constructors (`new` throws). That is intentional: they are for callbacks and short expressions, not for creating objects.

**`arguments`** — regular function has its own. Arrow does not; it uses the outer function's.

```js
function outer(a, b) {
  const arrow = () => {
    console.log(arguments); // outer's arguments: a, b
  };
  arrow(9, 8, 7); // 9,8,7 are ignored. still logs a, b
}

outer("x", "y"); // Arguments { '0': 'x', '1': 'y' }
```

A standalone arrow (not inside a function) has no `arguments` at all → `ReferenceError`.

**`new`** — arrow cannot be a constructor.

```js
function Person(name) {
  this.name = name;
}
new Person("Rahul"); // { name: "Rahul" }

const PersonArrow = (name) => {
  this.name = name;
};
new PersonArrow("Rahul"); // TypeError: PersonArrow is not a constructor
```

**`super`** — same idea as `this`. A nested regular function cannot use `super`. An arrow inside a method can, because it uses that method's `super`.

```js
class Parent {
  hello() { return "parent"; }
}

class Child extends Parent {
  greet() {
    setTimeout(function () {
      // super.hello(); // SyntaxError
    }, 0);

    setTimeout(() => {
      console.log(super.hello()); // "parent"
    }, 0);
  }
}

new Child().greet();
```

Shorter syntax was a bonus, especially with `map` / `filter` / `reduce`:

```js
nums.map(n => n * 2);
```

When not to use them: object methods that need their own `this`, constructors, and anything that needs `arguments` or to be a prototype method.

Interview one-liner: Traditional functions are dynamic (`this` depends on the call). Arrow functions are lexical (`this` depends on where they were written). ES6 added them to kill the `self = this` / `.bind(this)` pattern in callbacks. 


2. ✅ Explain how the Event Loop works.

Answer:
https://www.youtube.com/watch?v=8zKuNo4ay8E

JavaScript has **one main thread**. It can run only one thing at a time. The event loop is how it still handles timers, fetch, clicks, etc. without freezing.

Is it C program that tracks what to run?

Kind of — but it is not a separate C app you write. The event loop lives **inside the JS runtime**, in native code:

- Node → **libuv** (written in C)
- Chrome → **Blink / V8** (C++)
- JS engine (V8) runs your JS on the call stack
- Event loop is the native loop that asks: stack empty? any microtasks? any macrotasks? then push the next callback onto the stack

You do not write the event loop. You write JS. The runtime's loop decides **what runs next**.

```
 Your JS (you write this)
            │
            ▼
 ┌─────────────────────┐
 │     Call Stack      │  V8 runs JS here, one thing at a time
 │  greet()            │
 │  GEC                │
 └──────────┬──────────┘
            │  hit setTimeout / fetch / Promise
            ▼
 ┌─────────────────────┐
 │      Web APIs       │  native: browser or libuv (C)
 │  timer, fetch, DOM  │
 └──────────┬──────────┘
            │  finished
            ▼
 ┌──────────────┐   ┌──────────────┐
 │  Microtasks  │   │  Macrotasks  │
 │  Promises    │   │  setTimeout  │
 │  queueMicro  │   │  I/O, click  │
 └──────┬───────┘   └──────┬───────┘
        │                  │
        └────────┬─────────┘
                 ▼
      ┌─────────────────────┐
      │     Event Loop      │  native C / C++ loop
      │                     │
      │  stack empty?       │
      │  1. drain ALL micro │
      │  2. run ONE macro   │
      │  3. repeat          │
      └──────────┬──────────┘
                 │  push next callback onto stack
                 ▼
           back to Call Stack
```

**Parts**

- Call stack — runs your JS, one thing at a time
- Web APIs — native side handles `setTimeout`, `fetch`, DOM events
- Microtask queue — Promises (high priority)
- Macrotask queue — `setTimeout`, I/O, clicks
- Event loop — stack empty? drain **all** microtasks, then **one** macrotask, repeat

**What goes in which queue**

Microtask (drain ALL before the next macrotask):

- `promise.then` / `.catch` / `.finally`
- code after `await`
- `queueMicrotask()`
- `MutationObserver`
- Node: `process.nextTick` (before other microtasks)

Macrotask (one per loop turn):

- `setTimeout` / `setInterval`
- `setImmediate` (Node)
- DOM events → `click`, `input`, `scroll`
- I/O, network callbacks (but `fetch().then` is a microtask)
- `postMessage`

**Order:** sync → all microtasks → one macrotask → repeat

**Example 1 — why `setTimeout(fn, 0)` is not instant**

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

console.log("3");

// Output: 1  3  2
```

- `"1"` runs now (stack)
- `setTimeout` goes to Web APIs; callback waits in macrotask queue
- `"3"` runs now (stack still busy)
- stack empty → event loop runs `"2"`

**Example 2 — Promise beats setTimeout**

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

// Output: A  D  C  B
```

- `A`, `D` → sync
- `C` → microtask (Promise)
- `B` → macrotask (`setTimeout`)
- microtasks always run before the next macrotask

Interview one-liner: JS is single-threaded. Sync code runs first. Async work is offloaded. When the stack is empty, the event loop runs all microtasks (Promises), then one macrotask (`setTimeout`), and repeats.

The **Global Execution Context (GEC)** is the default environment created when JS starts running a file. It is the outermost context. Everything starts here.

**Analogy:** opening a restaurant. GEC is the restaurant itself (global space). Each function call is a new table (function execution context). When the last table is done, the restaurant (GEC) is still there until the program ends.

**What it contains**

- Global object → `window` (browser) or `global` / `globalThis` (Node)
- `this` at the top level → that global object (in sloppy/browser script; in ES modules `this` is `undefined`)
- All top-level `var` / `function` declarations

**Two phases**

1. Creation — memory is allocated, `var` is `undefined`, function declarations are hoisted
2. Execution — code runs line by line

**On the call stack**

- GEC is pushed first, sits at the **bottom**
- `foo()` creates a Function Execution Context on top
- `foo` finishes → that context is popped
- GEC stays until the script is done

```js
var name = "Rahul";        // lives in GEC

function greet() {         // greet's FEC is created when called
  var msg = "hi";
  console.log(name, msg);  // name found via scope chain → GEC
}

greet();                   // GEC → greet FEC → back to GEC
```

- `name`, `greet` → Global Execution Context
- `msg` → Function Execution Context of `greet`

Interview one-liner: GEC is the first context JS creates for a script. It holds the global object, top-level variables, and sits at the bottom of the call stack until the program finishes.

✅ Callbacks:
- What are callbacks?
- How many callback queues are there?
- Which callback queue has the highest priority?

Answer:

**1. What are callbacks?**

A callback is a function passed **as an argument** to another function, to be called later.

- Functions are values in JS (first-class), so you can pass them around
- "Later" can be immediately (sync) or after some work finishes (async)

```js
// sync callback — runs immediately, inside map
[1, 2, 3].map((n) => n * 2);

// async callback — runs later, after the timer
setTimeout(() => console.log("done"), 1000);

// your own
function greet(name, callback) {
  console.log("Hi " + name);
  callback();
}

greet("Rahul", () => console.log("callback ran"));
// Hi Rahul
// callback ran
```

Problem with callbacks: nesting them for sequential async work gives **callback hell** (the pyramid), which is why Promises and `async/await` exist.

```js
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getItems(orders[0], (items) => {
      // deep, hard to read, error handling repeats everywhere
    });
  });
});
```

**2. How many callback queues are there?**

Two that matter in the browser:

- **Macrotask queue** (task / callback queue) → `setTimeout`, `setInterval`, DOM events, I/O
- **Microtask queue** → Promises, `await`, `queueMicrotask`, `MutationObserver`

Extras worth mentioning:

- `requestAnimationFrame` has its own callback list, run before paint
- Node has more phases (timers, pending, poll, check, close) plus `process.nextTick` as a separate queue

Safe interview answer: **two main queues — macrotask and microtask.**

**3. Which has the highest priority?**

**Microtask queue.**

- After the stack empties, the event loop drains the **entire** microtask queue
- Only then does it run **one** macrotask
- If a microtask queues another microtask, that runs too — still before any `setTimeout`

```js
setTimeout(() => console.log("macro"), 0);

Promise.resolve().then(() => {
  console.log("micro 1");
  Promise.resolve().then(() => console.log("micro 2"));
});

// Output: micro 1  micro 2  macro
```

In Node, `process.nextTick` beats even Promise microtasks:

```js
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));

// Output: nextTick  promise  timeout
```

Warning: infinite microtasks starve the macrotask queue and block rendering, because the loop will not move on until microtasks are empty.

Interview one-liner: A callback is a function passed to another function to be run later. There are two main callback queues — microtask and macrotask — and microtasks always win: the loop drains all microtasks before running a single macrotask.

✅ How does Hoisting work in JavaScript?

Answer:
Before running any code, JS scans the scope and **allocates memory** for declarations. So a declaration is "known" before the line where you wrote it.

Nothing physically moves to the top. It is just the **creation phase** of the execution context happening before the execution phase.

**Two phases (same as GEC above)**

1. Creation — memory is set aside for every declaration in that scope
2. Execution — code runs line by line, assignments actually happen

**What gets what value in phase 1**

- `function` declaration → the **whole function** is stored → callable before its line
- `var` → set to `undefined`
- `let` / `const` → memory reserved but **uninitialized** → touching it throws (TDZ)
- `class` → hoisted like `let`/`const` → TDZ

```js
console.log(a);       // undefined   (var is hoisted as undefined)
console.log(greet()); // "hi"        (function fully hoisted)
console.log(b);       // ReferenceError: Cannot access 'b' before initialization

var a = 10;
let b = 20;

function greet() {
  return "hi";
}
```

**Function declaration vs function expression**

```js
hoisted();     // works
notHoisted();  // TypeError: notHoisted is not a function

function hoisted() {
  console.log("declaration — fully hoisted");
}

var notHoisted = function () {
  console.log("expression — only the var is hoisted");
};
```

`notHoisted` is a `var`, so it exists as `undefined`. Calling `undefined()` → `TypeError`, not `ReferenceError`.

**Hoisting is per scope, not just global**

```js
function outer() {
  console.log(x); // undefined — not an error, x is hoisted inside outer
  var x = 5;
}
```

**Classic gotcha — shadowing**

```js
var value = "global";

function test() {
  console.log(value); // undefined, NOT "global"
  var value = "local";
}

test();
```

The inner `var value` is hoisted to the top of `test`, so it shadows the global one and is `undefined` at that point.

**TDZ (Temporal Dead Zone)**

The gap between entering the scope and the line where a `let`/`const` is initialized. Accessing it in that gap throws `ReferenceError`.

```js
{
  // TDZ for c starts here
  // console.log(c); // ReferenceError
  let c = 1;      // TDZ ends
  console.log(c); // 1
}
```

Interview one-liner: Hoisting is memory being allocated for declarations during the creation phase, before execution. Functions are hoisted with their body, `var` as `undefined`, and `let`/`const`/`class` are hoisted but sit in the Temporal Dead Zone until initialized.


✅ Difference between var, let, and const in terms of hoisting.

Answer:
All three **are** hoisted. The difference is what happens between hoisting and initialization.

|         | Hoisted? | Initial value          | Access before the line     | Scope    |
| :------ | :------: | :--------------------- | :------------------------- | :------- |
| `var`   |    ✅    | `undefined`            | ✅ works → `undefined`      | function |
| `let`   |    ✅    | none  *(uninitialized)* | ❌ `ReferenceError` (TDZ)   | block    |
| `const` |    ✅    | none  *(uninitialized)* | ❌ `ReferenceError` (TDZ)   | block    |

Same idea as a timeline. Scope starts on the left, your declaration line is the marker:

```
                 scope entered                   declaration line
                       │                                │
 var a ────────────────┼────── a === undefined ─────────►┼── a === 1
                       │        (safe to read)           │

 let b ────────────────┼══════ TEMPORAL DEAD ZONE ══════►┼── b === 2
                       │        ReferenceError           │

 const c ──────────────┼══════ TEMPORAL DEAD ZONE ══════►┼── c === 3
                       │        ReferenceError           │
```

All three names exist from the moment the scope is entered. Only `var` has a usable value there.

The common wrong answer is "`let` and `const` are not hoisted." They are. They just have no value yet, so the engine refuses to read them.

```js
console.log(a); // undefined
console.log(b); // ReferenceError: Cannot access 'b' before initialization
console.log(c); // ReferenceError: Cannot access 'c' before initialization

var a = 1;
let b = 2;
const c = 3;
```

Proof that `let` **is** hoisted (it shadows the outer one instead of falling back to it):

```js
let x = "outer";

{
  console.log(x); // ReferenceError, not "outer"
  let x = "inner";
}
```

If the inner `x` were not hoisted, the lookup would go up the scope chain and print `"outer"`. It does not — the inner `x` already owns that name in the block.

**Other hoisting-related differences**

- Scope: `var` is function-scoped, so it leaks out of `if` / `for` blocks. `let` / `const` are block-scoped.
- Redeclaration: `var x; var x;` is fine. `let x; let x;` → `SyntaxError`.
- `const` must be initialized on the same line. `const c;` → `SyntaxError: Missing initializer`.
- `var` at the top level creates a property on `window` / `global`. `let` / `const` do not.

```js
var v = 1;
let l = 2;

console.log(window.v); // 1
console.log(window.l); // undefined
```

**Classic loop question**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3 — one shared function-scoped i

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);
}
// 0 1 2 — a fresh block-scoped j per iteration
```

Interview one-liner: All three are hoisted. `var` is initialized to `undefined` so reading it early is allowed, while `let` and `const` are hoisted uninitialized and sit in the TDZ, so reading them early throws a `ReferenceError`.

✅ Difference between var, let, and const in terms of hoisting. (second pass — different framing)

Answer:
Think of every declaration as **three separate steps**:

1. **Declare** — the name is registered in the scope
2. **Initialize** — the name is given a starting value
3. **Assign** — your code puts the real value in

Hoisting is just step 1 (and sometimes step 2) happening early, when the scope is created.

```
             Step 1 declare    Step 2 initialize    Step 3 assign
var          at scope entry    at scope entry       at your line
let          at scope entry    at your line         at your line
const        at scope entry    at your line (same)  same line, once
function     at scope entry    at scope entry       —
```

That single shifted cell — **when step 2 happens** — is the entire difference.

- `var` gets step 2 for free with the value `undefined`, so an early read is legal
- `let` / `const` skip step 2 until you reach the line, so an early read has nothing to return. The engine throws instead of guessing.

The window between step 1 and step 2 is the **Temporal Dead Zone**. It is "temporal" (time-based), not positional — what matters is whether execution has *reached* the line, not where the line sits in the file.

```js
function demo() {
  if (false) {
    let secret = 1;
  }
  console.log(typeof secret); // "undefined" — different block, no TDZ here
}

function demo2() {
  console.log(typeof secret); // ReferenceError — same block, still in TDZ
  let secret = 1;
}
```

Note that `typeof` is normally the safe way to test an unknown variable. TDZ breaks even that — `typeof` on a `let` in its dead zone still throws. That is a favourite trick question.

**Why the language does this**

`var` returning `undefined` early hides bugs — you get a silent wrong value instead of an error. TDZ makes the same mistake fail loudly at the exact line, which is why `let` / `const` are the default in modern code.

**Quick recall for the room**

- Hoisted? All of them. Yes.
- Usable early? Only `var`.
- `var` early → `undefined`. `let` / `const` early → `ReferenceError`.
- `const` also needs its value on the declaration line, so it can never sit un-assigned.

Interview one-liner: Hoisting registers all three names when the scope is created; `var` is also initialized to `undefined` at that moment, while `let` and `const` stay uninitialized until execution reaches their line, and that gap is the Temporal Dead Zone.

✅ What are Generator Functions, and when would you use them?

Answer:
https://www.youtube.com/watch?v=IJ6EgdiI_wU
A **generator** is a function you can **pause and resume**. It is marked with `function*` and uses `yield` to hand a value back without finishing.

Calling it does **not** run the body. It returns an **iterator** object. You pull the next value with `.next()`.

```js
function* count() {
  yield 1; // pause, give 1
  yield 2; // pause, give 2
  yield 3; // pause, give 3
}

const g = count();     // body has not run yet
g.next();              // { value: 1, done: false }
g.next();              // { value: 2, done: false }
g.next();              // { value: 3, done: false }
g.next();              // { value: undefined, done: true }
```

You can also loop it:

```js
for (const n of count()) {
  console.log(n); // 1 2 3
}
```

**How it differs from a normal function**

- Normal function runs to the end and returns **once**
- Generator runs until `yield`, saves its local state, then waits
- Next `.next()` continues from that exact line
- `return` (or falling off the end) sets `done: true`

**When would you use them (say this in the interview)**

1. **Lazy sequences** — do not build a huge array in memory; produce the next item only when asked
2. **Infinite lists** — IDs, pagination cursors, "next page" — a normal function cannot return forever
3. **Custom iterators** — make an object `for...of` compatible (`[Symbol.iterator]`)
4. **Stepping through a process** — state machines, parsing, "give me the next chunk"
5. **Redux Saga** (if they use it) — `function*` + `yield` for async flows. Mention only if you have used it.

**Lazy vs eager**

```js
function eagerRange(n) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(i);
  return arr; // all n numbers exist in memory now
}

function* lazyRange(n) {
  for (let i = 0; i < n; i++) yield i; // one number at a time
}

lazyRange(1_000_000).next(); // only computed 0, not a million-item array
```

**Infinite sequence (only possible because you pause)**

```js
function* ids() {
  let i = 1;
  while (true) yield i++; // never ends, but does not freeze the thread
}

const gen = ids();
gen.next().value; // 1
gen.next().value; // 2
```

**Two-way: you can send a value back in**

```js
function* greeter() {
  const name = yield "what is your name?";
  yield `hi ${name}`;
}

const g = greeter();
g.next();          // { value: "what is your name?", done: false }
g.next("Rahul");   // { value: "hi Rahul", done: false }
```

The argument to the **second** `.next()` becomes the result of the previous `yield`.

**When not to use them**

- Everyday async → `async/await` (clearer). `async function*` exists, but you do not reach for it first.
- Simple arrays → `map` / `filter` is enough
- React UI state → hooks, not generators

Interview one-liner: A generator (`function*` + `yield`) is a pausable function that returns an iterator. Use it when you want values on demand — lazy or infinite sequences — instead of building the whole list in memory up front.


✅ Have you used Closures in any real project? If yes, where and why?

Answer:
A **closure** is a function that remembers variables from the scope where it was **created**, even after that outer function has returned.

You do not "opt in" to closures. Every nested function is one. In a project you use them on purpose for **private state**, **callbacks**, and **function factories**.

**Where I have used them (say these, they are real frontend work)**

1. **Debounce / throttle on search** — keep `timer` private so each keystroke does not fire an API call

2. **Event listeners** — the click handler still needs `userId` / `clickCount` after `setup()` has returned

```js
function setupButton(userId) {
  let clickCount = 0; // closed over — still alive after setupButton returns

  document.getElementById("btn").addEventListener("click", function () {
    clickCount++; // closure: inner function reads outer clickCount
    console.log(userId, clickCount); // closure: also remembers userId
  });
}

setupButton(42); // setupButton is done, but the listener still has userId + clickCount
```

3. **React hooks** — `useState` / `useEffect` close over that render's props and state. Custom hooks like `useDebounce` / `useFetch` are closures

```js
function useToggle(initial) {
  const [on, setOn] = useState(initial);

  const toggle = () => setOn((v) => !v); // closure over setOn from this hook instance
  return [on, toggle];
}
```

4. **Memoize / once** — cache or a `hasRun` flag lives in the outer scope, hidden from callers

```js
function once(fn) {
  let hasRun = false; // closed over — private flag
  let result;

  return function (...args) {
    if (hasRun) return result; // closure: reads hasRun from outer once()
    hasRun = true;
    result = fn.apply(this, args);
    return result;
  };
}

const init = once(() => console.log("boot"));
init(); // boot
init(); // skipped — same hasRun, because of the closure
```

```js
function memoize(fn) {
  const cache = {}; // closed over — private cache object

  return function (n) {
    if (n in cache) return cache[n]; // closure: inner fn uses outer cache
    cache[n] = fn(n);
    return cache[n];
  };
}
```

5. **Module / factory** — hide internals, expose only `{ increment, get }`

```js
function createStore(start) {
  let value = start; // closed over — not on the returned object as a public field

  return {
    increment() {
      value++; // closure: methods remember value
    },
    get() {
      return value; // closure: same private value
    },
  };
}

const store = createStore(0);
store.increment();
store.get(); // 1
// store.value is undefined — only the closures can see it
```

**Why** — the outer function is gone, but the inner function still needs that data. Closure keeps it alive **and private**. No global variable.

**Example I would walk through — debounce (most honest "real project" answer)**

```js
function debounce(fn, delay) {
  let timer; // private, closed over

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const onSearch = debounce((q) => fetch(`/api?q=${q}`), 300);
input.addEventListener("input", (e) => onSearch(e.target.value));
```

- Outer `debounce` runs once, returns the inner function
- `timer` is not on `window` and not on the input
- Every keystroke hits the **same** `timer` because the inner function closed over it
- Why: avoid 10 API calls while the user is still typing

**Tiny classic (if they want the definition first)**

```js
function createCounter() {
  let count = 0; // private
  return function () {
    count++;
    return count;
  };
}

const c1 = createCounter();
c1(); // 1
c1(); // 2
// count is not accessible from outside
```

**React — this is the one they often follow up with**

```js
function Search({ userId }) {
  useEffect(() => {
    const id = setTimeout(() => {
      fetch(`/api/${userId}`); // closes over userId from this render
    }, 300);
    return () => clearTimeout(id);
  }, [userId]);
}
```

The effect callback is a closure over `userId`. Stale closure happens when that capture is **old** (missing dep). That is why the dependency array exists.

**Gotcha they may ask**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3 3 3 — one shared `i`, all three callbacks close over it
```

Fix: `let` (new `i` per iteration) or wrap in an IIFE.

Interview one-liner: Yes — debounce, event handlers, and React hooks. A closure lets an inner function keep private outer state after the outer function has returned, which is how I hide a timer, a cache, or a counter without putting it on the global object.

✅ Write a program to flatten a nested array, followed by several in-depth follow-up questions.

Simple Way

let arr = [1,2,3,[4,5, [6, 7]]]

let flatten = (arr) => {
  return arr.flat(Infinity)
}

console.log(flatten(arr))

let customFlatter = (arr, flat=[]) => {
  
    for(let j = 0; j < arr.length ; j ++){
      if(Array.isArray(arr[j])){
        customFlatter(arr[j], flat)
      } else {
        flat.push(arr[j])
      }
      
    }
    return flat
}

console.log(customFlatter(arr))


✅ Difference between:
- map()
- filter()
- reduce()
- forEach()

Answer:
Same input: they all walk the array. Different **return**.

| | Returns | Use for |
|---|---|---|
| `forEach` | `undefined` | side effects (log, mutate, DOM) |
| `map` | **new** array, **same length** | transform each item |
| `filter` | **new** array, **maybe shorter** | keep items that pass a test |
| `reduce` | **one value** (any type) | sum, object, flatten — boil down |

```js
const nums = [1, 2, 3, 4];

nums.forEach((n) => console.log(n)); // no array back

nums.map((n) => n * 2);     // [2, 4, 6, 8]
nums.filter((n) => n % 2);  // [1, 3]
nums.reduce((sum, n) => sum + n, 0); // 10
```

Same reduce, no short arrow — you must `return` the next accumulator:

```js
const nums = [1, 2, 3, 4];

const total = nums.reduce(function (sum, n) {
  return sum + n;
}, 0); // 10
```

`0` is the starting `sum`. Each step: take current `sum`, add `n`, return the new `sum`. Without `0`, the first item becomes the start (`1`) and it still works for a sum, but always pass an initial value so empty arrays do not throw.

Another shape — object, not a number:

```js
const fruits = ["a", "b", "a"];

const count = fruits.reduce(function (acc, fruit) {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

// { a: 2, b: 1 }
```

`forEach` does not chain. The other three do, because they return a value.

```js
nums.filter((n) => n > 1).map((n) => n * 10); // [20, 30, 40]
```

Interview one-liner: `forEach` is for doing something. `map` transforms. `filter` keeps some. `reduce` collapses to one value.

⚛️ React
✅ When does a React component re-render?

Answer:
A re-render means React **calls the function again** (or `render()` on a class). That is not the same as painting the DOM. React still diffs, and commit only updates what changed.

**It re-renders when it has a reason to believe its output might be stale.** The reasons:

1. **Its own state changed** — `setState` / `useState` / `useReducer` (compared with `Object.is`)

```js
function Counter() {
  const [n, setN] = useState(0);

  return (
    <button
      onClick={() => setN(n + 1)} // new number → re-render
    >
      {n}
    </button>
  );
}

setN(0);     // already 0 → Object.is same → no re-render
setN(n + 1); // 0 → 1 → re-render
```

React compares the next state to the current one with `Object.is`. A new object is always "different", even with the same fields:

```js
setUser({ ...user, name: "Rahul" }); // new object → re-render
user.name = "Rahul";
setUser(user);                       // same reference → no re-render (mutation trap)
```

2. **Its parent re-rendered** — by default the whole subtree renders again, even if this child's props look the same. **`React.memo` (or `PureComponent`) skips this** when props are shallow-equal. It does **not** skip reason 1 (own state) or reason 3 (context).

```js
function Parent() {
  const [n, setN] = useState(0);
  return (
    <>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <Child /> {/* re-renders with Parent, even with no props */}
      <MemoChild /> {/* skipped — same props after Parent re-renders */}
    </>
  );
}

const MemoChild = React.memo(function MemoChild() {
  return <p>stable</p>;
});
```

Trap: `React.memo` is useless if the parent passes a new object/function every render (`style={{}}`, `onClick={() => {}}`). Stabilize those with `useMemo` / `useCallback`.

3. **Context it consumes changed** — any `useContext` / `Context.Consumer` in this component. `React.memo` does **not** skip this.

```js
const ThemeContext = createContext("light");

function ThemedButton() {
  const theme = useContext(ThemeContext); // subscribed
  return <button className={theme}>ok</button>;
}

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedButton /> {/* re-renders when theme changes */}
      <MemoChild />    {/* no useContext → not this reason */}
    </ThemeContext.Provider>
  );
}
```

Trap: `value={{ theme, setTheme }}` is a **new object every parent render**, so every consumer re-renders even if `theme` did not change. Split context or memoize the value.

4. **A hook it uses subscribed to something that changed** — e.g. Redux `useSelector`, a store hook, `useSyncExternalStore`

```js
// Redux: only this component re-renders when `count` in the store changes
function CounterView() {
  const count = useSelector((s) => s.counter.count);
  return <span>{count}</span>;
}

// same idea, any external store
function Width() {
  const width = useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth
  );
  return <span>{width}</span>;
}
```

`useSelector` re-renders when the **selected slice** changes (strict `===` by default). A bad selector that returns a new object every time (`(s) => ({ n: s.n })`) re-renders on every store update.

**What does *not* re-render it**

- Mutating state in place (`state.count++`) — React never sees a new reference
- Setting the **same** state (`setN(0)` when it is already `0`) — bails out
- Changing a `ref` (`ref.current = x`) — no render
- Props changing on a parent that this component does not receive — unless the parent re-render walks down into it (which it does, unless memoized)

**Senior nuance**

- React 18 **batches** all `setState` in the same event (and in timeouts/promises). Several updates → one render, not N.
- `React.memo` / `PureComponent` is an **opt-out** of reason 2: skip if props are shallow-equal.
- New object/function props (`style={{}}`, `onClick={() => {}}`) look like a change every time, so memo will not help until those are stable.
- Strict Mode in dev **double-invokes** render on purpose. That is not two commits.

Interview one-liner: A component re-renders when its state or a context/store it subscribed to changes, or when its parent re-renders. Render is cheap to talk about and expensive only when the tree is large — it is a function call plus a diff, not a full DOM rebuild.

https://www.joshwcomeau.com/react/why-react-re-renders/

- Every re-render starts with a **state change**. That is the only trigger.
- Owner of that state re-renders, plus **all descendants**. Ancestors do not.
- Not the whole app. Data does not flow up.
- Re-render = new UI snapshot. React diffs snapshots, then patches the DOM.
- **Not about props.** Children re-render because the parent did, even with no props (`Decoration`).
- React over-renders on purpose (impure components, refs). Stale UI is worse than extra renders.
- `React.memo` / `PureComponent`: skip unless **props** changed. Reuse the last snapshot.
- Memo is not the default. Checking props can cost more than re-rendering a cheap leaf.
- Context ≈ invisible props. `memo` still re-renders if that component **consumes** the changed context. Unused context is fine.
- DevTools Profiler: “Record why each component rendered” + highlight updates.
- Values created in render (`const dog = {}`) are new every time → they bust `memo`.
- Don’t chase fewer renders. Profile a real slowness first. Dev timings lie vs production.


✅ What are the different ways to prevent unnecessary re-renders?

Answer:
Not every re-render is a problem. Fix **where state lives** first. Memo is a last resort after the Profiler shows a real cost.

**1. Don’t trigger the extra work**

- Colocate state — keep it as low as possible so siblings don’t render
- Split unrelated state into different components
- Correct `key`s — a bad key remounts, it does not just re-render
- Don’t mutate; don’t pass new `{}` / `() => {}` if a child is memoized

```js
// typing in Search re-renders HeavyList
function Page() {
  const [q, setQ] = useState("");
  return (
    <>
      <Search q={q} setQ={setQ} />
      <HeavyList />
    </>
  );
}

// state lives in Search — HeavyList stays still
function Page() {
  return (
    <>
      <Search />
      <HeavyList />
    </>
  );
}
```

**2. Composition — `children` is already “memoized”**

JSX you pass as `children` is created by the parent of `Layout`, so it does not re-create when `Layout`’s state changes.

What that means: `<ExpensiveTree />` is built in **App’s** render, then handed in as a prop. `n` lives in **Layout**. When you click, only Layout re-renders. App did not run again, so it does not build a new `<ExpensiveTree />`. Layout gets the **same** `children` object as last time → React skips `ExpensiveTree`.

```js
function App() {
  return (
    <Layout>
      <ExpensiveTree />  {/* created here, in App */}
    </Layout>
  );
}

function Layout({ children }) {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      {children} {/* same element App already made */}
    </div>
  );
}
```

Do not mix the arrows:

- Layout’s `n` changes → Layout re-renders, **ExpensiveTree does not**. That is the win.
- ExpensiveTree’s own state changes → **Layout does not** re-render. State never flows up. True either way.
- App re-renders → App builds a new `<ExpensiveTree />` → ExpensiveTree re-renders too (unless `memo`).

`{children}` is not “Layout owns ExpensiveTree.” It is “App already built this element; Layout is only a slot to put it in.” Layout changing does **not** mean everything changes. That is the old pattern (tree written *inside* Layout).

Contrast — `ExpensiveTree` **inside** Layout’s return. Now it is created on every Layout render, so it re-renders with the button.

```js
function Layout() {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>{n}</button>
      <ExpensiveTree /> {/* new element every click */}
    </div>
  );
}
```

**3. `React.memo` — skip parent-driven renders if props are shallow-equal**

Does not skip own state or `useContext`. Dies if props are new references every time.

```js
const UserCard = React.memo(function UserCard({ name }) {
  return <div>{name}</div>;
});
```

**4. Stable props — `useCallback` / `useMemo`**

Only needed to feed a memoized child.

```js
const onClick = useCallback(() => save(id), [id]);
const style = useMemo(() => ({ color }), [color]);
<UserCard name={name} onClick={onClick} style={style} />
```

**5. Split context / select a slice**

One `{ user, theme, cart }` value re-renders every consumer. Separate providers, or Redux/Zustand **selectors**.

**6. Lists** — `react-window` so you don’t mount 10k rows. Not a re-render trick; it skips work.

```js
// bad — 10_000 DOM nodes, every parent render walks all of them
function BadList({ items }) {
  return items.map((item) => <Row key={item.id} item={item} />);
}

// good — only ~10 visible rows exist in the DOM
import { FixedSizeList } from "react-window";

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}
```

Windowing = only paint what is on screen. Scroll reuses those row nodes. `memo` would still create 10k components; this never mounts them.

**Decision**

| Situation | Tool |
|---|---|
| Unrelated sibling updates | colocate state / composition |
| Child same props, still rendering | `React.memo` |
| Memoized child gets new fn/object | `useCallback` / `useMemo` |
| Whole tree on any context tick | split context / selector |
| Huge list | virtualize |

Interview one-liner: Push state down, use `children` so static subtrees don’t follow the parent, then `React.memo` + stable props if the Profiler still shows waste. Don’t wrap everything.


https://www.youtube.com/watch?v=lnyjhglL5-A


✅ useEffect vs useLayoutEffect

Answer:
https://www.youtube.com/watch?v=wU57kvYOxT4
Same API (`setup`, `deps`, cleanup). Different **when** they run relative to the browser paint.

```
render → React commits DOM → ① useLayoutEffect (sync) → browser PAINTS → ② useEffect (async)
```

**useEffect one-liner:** After paint — user already sees the screen; use for fetch, timers, subscriptions (won’t block paint).

| | `useLayoutEffect` | `useEffect` |
|---|---|---|
| When | after DOM update, **before paint** | after paint |
| Blocks paint? | yes (runs sync) | no |
| Default for? | measure / mutate DOM to avoid flicker | fetch, subscriptions, logging |
| SSR | warning — no DOM on server | fine |

**`useEffect` — default.** User sees the first paint, then you work.

```js
useEffect(() => {
  document.title = name;
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, [name]);
```

**`useLayoutEffect` — when the first paint would look wrong.** You read layout and write to the DOM in the same frame, so the user never sees the broken frame.

```js
const boxRef = useRef(null);
const [h, setH] = useState(0);

useLayoutEffect(() => {
  setH(boxRef.current.getBoundingClientRect().height);
}, []);
```

Classic flicker case: tooltip position. `useEffect` paints at `(0,0)` then jumps. `useLayoutEffect` measures, sets position, **then** paints.

**Do not** put data fetching in `useLayoutEffect`. You freeze the screen until it finishes.

Interview one-liner: Both run after commit. `useLayoutEffect` is sync and before paint — use it only to measure or fix the DOM. Everything else is `useEffect`, so you don’t block the first pixel.

✅ Controlled vs Uncontrolled Components

Answer:
Who owns the input’s value — **React state** or the **DOM**?

**Controlled** — React is the source of truth. `value` + `onChange`. Every keystroke → setState → re-render → input shows that state.

```js
function NameField() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

You can validate live, disable submit, format as they type. One source of truth. Re-renders on each key.

**Uncontrolled** — the DOM keeps the value. You read it when you need it (`ref`), usually on submit. React does not drive `value`.

```js
function NameField() {
  const ref = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    console.log(ref.current.value); // read once, from the DOM
  }

  return (
    <form onSubmit={onSubmit}>
      <input ref={ref} defaultValue="Rahul" />
      <button>save</button>
    </form>
  );
}
```

`defaultValue` is the initial HTML value. After that, the browser owns it.

| | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | DOM |
| Read value | `state` | `ref.current.value` |
| Instant validation / disable | easy | extra work |
| Re-render per keystroke | yes | no |
| File input | awkward (`value` is read-only) | natural (`<input type="file" />`) |
| Forms with many fields | more code | less code, less React |

**Default in real apps:** controlled, so UI and data stay in sync.

**Use uncontrolled** for simple “submit and forget” forms, file picks, or wrapping a non-React widget.

Mix is allowed: controlled text, uncontrolled file. Don’t mix **on the same field** (`value` and `defaultValue` together) — React will warn.

Interview one-liner: Controlled means React state is the value (`value` + `onChange`). Uncontrolled means the DOM is (`ref` + `defaultValue`). Prefer controlled unless you only need the value at submit, or it’s a file input.




✅ How would you optimize a large React application and improve its performance?

Answer:
https://www.youtube.com/watch?v=qPto6cNPdzU

TOOLS to check performance
  1. LightHouse
  2. Google page speed : https://pagespeed.web.dev/
  3. webpage test : https://www.webpagetest.org/
  4. Real User monitoring tool like data dog
  5. React profiling

Things to consider
  1. Web page load time (should be less than 3 seconds)
  2. Execution time of function s (1 ms)
  3. User action delay (100ms)
  4. DOM element length (allowed 3000 to 4000)
  5. Large Array (fine upto 3000)
  6. light house report
  7. LCP (Largest Contentful Paint) — should be ≤ 2.5s (main content visible)
  8. INP (Interaction to Next Paint) — should be ≤ 200ms (click/type feels snappy)
  9. CLS (Cumulative Layout Shift) — should be ≤ 0.1 (page doesn’t jump)

  Phases:
    CODE TIME, BUILD TIME, RUN TIME, DEPLOY TIME

    CODE TIME (PNSCR){predictive, number constants, shape transactions for objects, chaining, function reusability}
    PNSCR: “Please Never Sprinkle Chaos Randomly” —
            Predictive code · Number constants · Shape stable · Chain less · Reuse functions


      1. write code in predictive manner
          const a = 99;
          function test(){

          }
          const b = 100;
          ==============
          const a = 99;
          const b = 100;
          function test(){
          }

      2. Use number costants

          const User = {
            ADMIN : "admin",
            GUEST : "guest"
          }

          if (currentUser === User.Admin)
           =================

          const User = {
            ADMIN : 1,
            GUEST : 2
          }

      3. Avoid shape transactions for Objects
              const obj = {}
              obj.x = 1;
              obj.y = 2;

              const properObj = { a: 1, b : 2}

      4. Avoid chaining map filter reduce on large arrays 7000

      5. Resuability: function 


    2. BUILD TIME (LMTDG){lazy load modules, minification, tree shaking, dead code elimination, GZIP}

        LMTDG: “Lazy Monks Throw Dead Grapes” —
                Lazy load · Minify · Tree-shake · Dead-code kill · GZIP

        1. Lazy load modules
           Don’t ship Orders JS on Login. Load a chunk only when needed.
           Example: `React.lazy(() => import('./OrdersPage'))` + Suspense

        2. Minification
           Build step renames vars, strips spaces/comments → smaller JS.
           Example: `function incrementCount()` → `function a()` in prod bundle

        3. Tree shaking
           Bundler drops **unused exports** from packages you import.
           Example: `import { debounce } from 'lodash-es'` keeps debounce, drops the rest
           Tools: webpack-bundle-analyzer, Bundlephobia

        4. Dead code elimination
           Removes code that can never run (unreachable `if (false)`, unused functions).
           Example: feature flag off forever → that branch deleted at build
           Overlaps with tree shaking; DCE = “this path is dead”; tree shake = “this export unused”

        5. GZIP (or Brotli)
           Server/CDN compresses the file on the wire → smaller download.
           Example: `app.js` 200KB → ~60KB over the network; browser decompresses

        Strategies:
          a. Loading strategy of web page
          b. inline critical css
          c. Avoid library blot

          1. Bundle Size, bundle analyzer
          2. remove unnecessary packages : npx dep check
          3. react profiler


      3. RUN TIME

        1. long running function
        2. dom updates
            a. avoid layout changes in loop
            b. Cache DOM references
            c. style changes
            d. document fragment
        3. too many api requests

        SOLUTION:
          batching
          requestIdleCallback
          efficiently update DOM
          Make fewer request

      4.DEPLOY TIME

        server slow response
          
          1. use CDN
          2. Cache policy
          3. pppp -> Super power in disguise
              a. preconnect
                  a.1 Resolve DNS in Advance
                  a.2 Do TCP connection in Advance
                  a.3 SSL certification Verification in advance
              b. preloading
                  b.1 Download the resource
              c. prefetching
                  c.1 download other pages
              d. prerender
                  depricated


    CHOOSE RIGHT RENDERING TECH
        1. CSR => sending the recipe (browser cooks)
        2. SSR => kitchen cooks before delivery (ready HTML each request)
        3. SSG => dark store with pre-cooked food (built once at build time)
        4. ISR => refresh dark store shelf without rebuilding whole menu

        Code-world one-liners:
        - CSR (Client-Side Rendering): index.html + bundle.js → ReactDOM.createRoot().render() in browser
        - SSR (Server-Side Rendering): server runs React → renderToString() → HTML sent → client hydrates (Next: getServerSideProps)
        - SSG (Static Site Generation): next build bakes pages to static HTML files (Next: getStaticProps / output export)
        - ISR (Incremental Static Regeneration): static page + revalidate in background (Next: getStaticProps + revalidate: 60)

        When to pick:
        - CSR → logged-in app / dashboard (SEO less important)
        - SSR → SEO + fresh per-request data (user-specific first paint)
        - SSG → marketing, docs, blog that rarely changes
        - ISR → blog/CMS that updates every N minutes without full rebuild


  LOW HANGING FRUITS

    Images: Compress, use modern format, provide initial height and width

    serve Images based on device size and density

    videos

    use css sprites

    avoid using tag selectore in css, class is better

    lazy load images 

    load javascript async or defer

    de-priototize css

    schedule low priority tasks : requestIdleCallback

    use icon font

    less api on initial page load

    remove unused css


    WEB VITALS

    IMP THING

    Profile in low network and low cpu
    always come up with number


ALSO COVER LCP< INP CLS>


✅ Explain the complete Authentication Flow in a React application:
- Login flow
- Token storage
- Best practices
- Security considerations
- Follow-up questions on implementation

Ans.

---

### 1. Login flow (happy path)

1. User types email + password on Login page  
2. React calls API: `POST /login { email, password }`  
3. Server checks credentials → returns **access token** (and maybe refresh token + user)  
4. Frontend saves token + user in memory/store  
5. Redirect to Dashboard (`/`)  
6. Every later API call sends the token in header  

```js
// simple login
async function login(email, password) {
  const res = await api.post('/login', { email, password })
  // res = { token: 'eyJ...', user: { id: 1, name: 'Ashish' } }
  setToken(res.token)        // save
  setUser(res.user)          // Redux / context
  navigate('/')              // go home
}
```

```
Login form → POST /login → token + user → save → redirect → PrivateRoute opens app
```

---

### 2. Protecting pages

```js
// PrivateRoute — one door
function PrivateRoute({ children }) {
  const token = getToken()
  if (!token) return <Navigate to="/login" />
  return children
}

// usage
<Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
```

No token → Login. Has token → show page.

---

### 3. Sending token on every API call

One API helper — not in every component:

```js
// api.js
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

```
OrdersPage → api.get('/orders') → header: Authorization: Bearer eyJ...
```

---

### 4. Token storage (where to put it)

| Place | Pros | Cons |
|-------|------|------|
| **memory** (variable / Redux) | safest vs XSS steal | lost on refresh |
| **sessionStorage** | gone when tab closes | XSS can read it |
| **localStorage** | survives refresh | XSS can read it — common but risky |
| **httpOnly cookie** | JS can’t read it (XSS harder) | need CSRF care; backend sets cookie |

**Simple interview pick for SPA:**

- Access token: **memory** (or short-lived in memory)  
- Refresh token: **httpOnly cookie** (best)  
- Or: access + refresh in **httpOnly cookies** only  

If they only use localStorage in the app, say: *“common for demos; for bank-level I’d prefer httpOnly cookies.”*

```js
// demo style (many apps)
localStorage.setItem('token', token)

// better for access token
let accessToken = null  // memory only
function setToken(t) { accessToken = t }
```

---

### 5. Refresh when access token expires

1. API returns **401**  
2. API helper tries `POST /refresh` once  
3. Got new access token → retry original request  
4. Refresh failed → clear auth → send to Login  

```js
// sketch
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401 && !err.config._retry) {
      err.config._retry = true
      const newToken = await refreshAccessToken() // uses refresh cookie/token
      setToken(newToken)
      err.config.headers.Authorization = `Bearer ${newToken}`
      return api(err.config) // retry
    }
    logout()
    return Promise.reject(err)
  }
)
```

Pages don’t each write this — **one place** in `api.js`.

---

### 6. Logout

```js
function logout() {
  clearToken()
  clearUser()
  // optional: POST /logout to invalidate server-side
  navigate('/login')
}
```

---

### 7. Best practices (say these)

1. **One auth gate** — PrivateRoute + one API client  
2. **Short-lived access token** (e.g. 15 min) + refresh  
3. **Don’t store password** anywhere after login  
4. **Roles in UI** for show/hide — but **server must enforce** permissions  
5. **HTTPS** always  
6. Don’t put secrets in React code / env exposed to browser  

```js
// UI only — not security
{user.role === 'admin' && <DeleteButton />}

// Real security: DELETE /orders/1 must fail on server if not admin
```

---

### 8. Security considerations

| Risk | What you do |
|------|-------------|
| **XSS** steals localStorage token | Prefer httpOnly cookie; sanitize HTML; CSP |
| **CSRF** with cookies | SameSite cookies, CSRF token if needed |
| **Token in URL** | Never — use header or cookie |
| **Long-lived token forever** | Expiry + refresh + logout revoke |
| **Open redirect after login** | Only allow relative paths like `/orders` |

---

### 9. Follow-ups they may ask (short answers)

**Q: JWT vs session?**  
JWT = token carries claims, often stateless. Session = server stores session id. Both fine; JWT common in SPAs.

**Q: Where is user stored?**  
Token for API; **user object** (name, role) in Redux/context for UI.

**Q: How do you handle refresh on page reload?**  
If token only in memory → call `/me` or refresh on app start (cookie-based refresh works). If localStorage → read token, then fetch `/me`.

**Q: Social login?**  
Redirect to Google → callback with code → backend exchanges → same token flow.

---

### 30-second closer

“Login hits `/login`, I store a short-lived access token (memory or httpOnly cookie), wrap private routes, attach `Bearer` in one API client, refresh once on 401, logout clears everything. UI roles are nice; server is the real permission check.”



