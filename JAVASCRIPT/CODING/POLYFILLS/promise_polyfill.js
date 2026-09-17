// Polyfill for Promise with comments for understanding
//
// Real browsers ship Promise. This is a LEARNING polyfill —
// enough for interview talk (states, then, catch, chaining).
// Not a full Promises/A+ certification suite.

(function () {
  // ---------- states (Promises/A+) ----------
  const PENDING = 'pending'
  const FULFILLED = 'fulfilled'
  const REJECTED = 'rejected'

  function MyPromise(executor) {
    // A promise is always in ONE of these states
    this.state = PENDING
    this.value = undefined // fulfilled value
    this.reason = undefined // rejection reason

    // Handlers registered via .then WHILE still pending
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.state !== PENDING) return // settle only once
      this.state = FULFILLED
      this.value = value
      // Flush everyone who waited with .then
      this.onFulfilledCallbacks.forEach((fn) => fn(value))
    }

    const reject = (reason) => {
      if (this.state !== PENDING) return
      this.state = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach((fn) => fn(reason))
    }

    // executor runs sync — like new Promise((resolve, reject) => { ... })
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  /**
   * then(onFulfilled, onRejected) → ALWAYS returns a NEW promise
   * That return is why chaining works: p.then(...).then(...)
   */
  MyPromise.prototype.then = function (onFulfilled, onRejected) {
    // Optional callbacks — pass value/reason through if missing
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (v) => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (e) => {
            throw e
          }

    const self = this

    // Return a NEW promise (chaining)
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        // Microtask-ish: real Promise uses microtask queue
        queueMicrotask(() => {
          try {
            const x = onFulfilled(value)
            // If handler returns a Promise, wait for it
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x)
            }
          } catch (err) {
            reject(err)
          }
        })
      }

      const handleRejected = (reason) => {
        queueMicrotask(() => {
          try {
            const x = onRejected(reason)
            if (x instanceof MyPromise) {
              x.then(resolve, reject)
            } else {
              resolve(x) // catch recovered → next then gets value
            }
          } catch (err) {
            reject(err)
          }
        })
      }

      if (self.state === FULFILLED) {
        handleFulfilled(self.value)
      } else if (self.state === REJECTED) {
        handleRejected(self.reason)
      } else {
        // Still pending — queue handlers for later
        self.onFulfilledCallbacks.push(handleFulfilled)
        self.onRejectedCallbacks.push(handleRejected)
      }
    })
  }

  // catch(onRejected) === then(null, onRejected)
  MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
  }

  // ---------- static helpers ----------
  MyPromise.resolve = function (value) {
    if (value instanceof MyPromise) return value
    return new MyPromise((resolve) => resolve(value))
  }

  MyPromise.reject = function (reason) {
    return new MyPromise((_, reject) => reject(reason))
  }

  // Always expose for demos / learning
  globalThis.MyPromise = MyPromise

  // Real polyfill: only fill the gap if native Promise is missing
  if (typeof Promise === 'undefined') {
    globalThis.Promise = MyPromise
  }
})()

// ---------- demo (run in browser / node) ----------
const MyPromise = globalThis.MyPromise

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve(10), 100)
})

p.then((n) => {
  console.log('1:', n) // 10
  return n * 2
})
  .then((n) => {
    console.log('2:', n) // 20
    return MyPromise.reject('boom')
  })
  .catch((err) => {
    console.log('caught:', err) // boom
    return 'recovered'
  })
  .then((v) => console.log('3:', v)) // recovered

/*
  INTERVIEW FLOW

  1. States: pending → fulfilled | rejected (one-way, once)
  2. executor(resolve, reject) runs immediately
  3. .then registers callbacks; if already settled, run them (async)
  4. .then ALWAYS returns a new promise → chaining
  5. .catch is then(null, onRejected)
  6. Handlers run as microtasks (queueMicrotask / Promise.then)

  What a full polyfill also needs (say if they dig):
  - Thenable assimilation (objects with .then)
  - Promise.all / race / allSettled / finally
  - Strict Promises/A+ edge cases
*/
