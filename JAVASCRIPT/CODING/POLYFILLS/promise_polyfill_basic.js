// create a basic promise polyfill, as simple as it can get and use that and dont worry about edge cases

function MyPromise(executor) {
  // 3 states only — start pending
  this.state = 'pending'
  this.value = undefined
  this.onSuccess = null // callback from .then (one only — keep it simple)

  // resolve is the function that is passed to the executor function as on line 25 and it is the function that is used to resolve the promise, its runs after some delay in this case 5000ms
  // at 5000ms, if by then  this.onSuccess is not null, then it will run the function that is passed to .then

  const resolve = (value) => {
    console.log('resolve value', value.toString())
    if (this.state !== 'pending') return // settle once
    this.state = 'fulfilled'
    this.value = value
    // if someone already called .then, run their callback now
    if (this.onSuccess) {
      console.log(this.onSuccess.toString())
      this.onSuccess(this.value)
    }
  }

  // run the function you pass to new MyPromise(...)
  // it gets resolve so it can finish later (e.g. setTimeout)
  executor(resolve)
}

// You pass one function into MyPromise — that’s executor

// (resolve) => {
//   console.log(resolve)
//   setTimeout(() => {
//    resolve('done')
//   }, 500)
// }

// Above arrow function is the executor function that is passed to MyPromise
// and what it does is run the parameter function that is passed to it at any time, may be after some time or immediately and the resolve is same resolve as it declared at line 9, which internally runs this.onSuccess(this.value) when the state is fulfilled


// Inside MyPromise, it runs: executor(resolve)
// So your (resolve) => { ... } receives the inner resolve function as its argument

MyPromise.prototype.then = function (onSuccess) {
  if (this.state === 'fulfilled') {
    // already done → call immediately
    onSuccess(this.value)
  } else {
    // still waiting → save callback for when resolve runs
    this.onSuccess = onSuccess
  }
}

// Already fulfilled → run onSuccess(this.value) now
// Still pending → save it as this.onSuccess so resolve can fire it later

// ---------- use it ----------
const p = new MyPromise((resolve) => {
    console.log(resolve.toString())
  setTimeout(() => {
    resolve('done')
  }, 5000)
})



p.then((value) => {
  console.log(value) // "done" after 500ms
})

// when resolve runs, it instigated function that is passed to .then
// BUT THERE CAN BE DELAY WHICH IT HANDLES BY SAVING THE FUNCTION TO onSuccess

//lets consider async case only, what happens when then is called?
// then just stores the function that is passed to it in this.onSuccess
// as we know onSucess runs after some delay in this case 5000ms

// Two possible cases:

// under 5000s
// simple when we call then, it just stores the function that is passed to it in this.onSuccess and onSuccess runs after some delay in this case 5000ms

//after 5000s
// then runs the function that is passed to it in this.onSuccess
//By 5000 ms the promise is already settled:
// state = 'fulfilled'
// value = 'done'
// onSuccess = null   // .then has not been called yet
// MyPromise.prototype.then = function (onSuccess) {
//   if (this.state === 'fulfilled') {
//     // already done → call immediately
//     onSuccess(this.value)

//So console.log('done') happens at the moment you call .then, not after another wait.

// When you call .then	                What happens
// Before resolve -> Callback is saved as onSuccess, and resolve runs it later
// After resolve
// Promise is already fulfilled, so .then runs the callback immediately with this.value


// So lines 41–43 are only: “when this succeeds, run this function.”

// .then does not call resolve.
// resolve is what later triggers the .then callback.

// 1. new MyPromise((resolve) => { ... })  → executor runs, gets resolve

// Same Idea as 
// function run(fn) {
//     fn('hello')
//   }
//   run((msg) => console.log(msg)) // msg === 'hello'


// 2. p.then(fn)                           → saves fn as onSuccess (still pending)

// 3. setTimeout fires → resolve('done')   → state = fulfilled, then calls onSuccess('done')

// 4. console.log('done')


// MyPromise(executor) → in the simple case, runs executor right away and passes it resolve.

// .then and resolve are linked, but not by .then calling resolve.

// Wrong piece:
// .then does not call resolve.
// .then only stores (or runs) your callback.
// resolve is what runs that callback later.

// How the .then function actually gets run

// p.then(fn)
//    │
//    └─► this.onSuccess = fn     (save it — don't run yet)

// later: resolve('done')
//    │
//    └─► this.onSuccess(this.value)   ← HERE fn finally runs

// So your question “how do I run the first function passed to .then?”:

// Answer: you don’t run it inside .then (when still pending).
// You save it:

// this.onSuccess = onSuccess

// Then inside resolve:

// this.onSuccess(this.value)

// That’s the link:

// Side	           Role
// .then(fn)          registers fn
// resolve(value)     fulfills + calls fn(value)

// Mental model: .then = subscribe, resolve = fire.

//One line: resolve = the function that marks success and fires subscribers.

// flow:

// new MyPromise( executor ──receives──► resolve )
//                      │
//                      └── later calls resolve('done')
//                                     │
// p.then( onSuccess )  ◄── saved ─────┘
//                      └── resolve fires onSuccess('done')


// So: executor calls resolve; resolve calls the .then function.


// SUMMARY

// p = promise object (state, value, onSuccess + .then on prototype).
// new MyPromise(executor) runs executor(resolve) immediately.
// Executor = arrow fn that receives resolve and calls it when work finishes (sync or async).
// p.then(fn) sets p.onSuccess = fn (if still pending).
// When resolve(value) runs → updates p → calls p.onSuccess(value).


// Executor
// Your arrow fn on lines 42–47 — the whole (resolve) => { ... }
// resolve on line 9
// Function MyPromise builds
// executor(resolve)
// Call your arrow fn, pass line‑9 resolve in



// **********
// Executor (your arrow fn) receives my resolve (line 9) as a parameter, and you decide when to call it — here, after setTimeout 500ms.

// You schedule the work; resolve only fires when you call it.
// ***********



// new MyPromise → schedules setTimeout; onSuccess still null
// p.then(fn) → stores fn on onSuccess
// Timer fires → resolve('done')
// resolve → sets fulfilled + value → runs onSuccess('done') → your .then arrow runs
// Order matters: .then usually registers before the timeout fires, so when resolve runs, the subscriber is already there.


// ***********

// p.then(fn)           → p.onSuccess = fn
// 500 ms later
// resolve('done')      → p.onSuccess('done')  → console.log('done')