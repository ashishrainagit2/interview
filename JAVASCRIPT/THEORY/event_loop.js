// explain event loop in javascript with a code example?

const fetchPokemon = async () => {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    console.log("data =>", data);
  } catch (err) {
    console.log("err =>", err);
  }
};
fetchPokemon();

// Theoretically, the event loop should work like this:

// 1. The main thread starts executing the code.
// 2. It encounters an asynchronous operation (fetch).
// 3. The event loop registers the fetch operation and continues executing the code.
// 4. The fetch operation is completed in the background.
// 5. The event loop adds the callback function to the callback queue.
// 6. The event loop checks the callback queue and executes the callback function.
// 7. The callback function logs the data to the console.

// Event Loop — Simple Explanation

// JavaScript runs on one thread — it can do one thing at a time. The event loop is what lets it still handle async work (timers, fetch, clicks) without freezing.

// Simple analogy

// Think of a single chef in a kitchen:

// Part	                                            What it is
// Call stack                                       What the chef is cooking right now
// Web APIs                                         Helpers (oven, timer) that work in the background
// Callback queue                                   Finished orders waiting to be served
// Event loop                                       Keeps checking: "Is the chef free? Any finished orders?"


// Chef busy?     → keep cooking (call stack)
// Chef free + order ready? → serve next order (run callback)

// How it works (4 steps)

// 1. Run sync code on the call stack (top to bottom)
// 2. Hit async work (setTimeout, fetch) → hand off to browser, keep going
// 3. When async finishes → callback goes to the queue
// 4. Event loop: when stack is empty → pull callback from queue → run it

// Tiny example

console.log("1");

setTimeout(() => console.log("2"), 0);

console.log("3");

// Output: 1 → 3 → 2

Why?

// console.log("1")     → runs immediately
// setTimeout(...)      → browser starts timer, callback goes to queue
// console.log("3")     → runs immediately (stack not empty yet)
// stack empty          → event loop picks up "2" from queue
// console.log("2")     → runs last




// Key parts (interview)

// Part              | Role
// ------------------|--------------------------------------------------------
// Call stack        | Currently executing functions
// Web APIs          | Browser handles async (fetch, setTimeout, DOM events)
// Microtask queue   | Promises, queueMicrotask — higher priority
// Macrotask queue   | setTimeout, setInterval, I/O
// Event loop        | Stack empty? Run microtasks first, then next macrotask

// Order: Sync code → all microtasks → one macrotask → repeat

// The event loop lets single-threaded JS stay non-blocking: run sync code first, offload async work to the browser, then run callbacks from the queue when the stack is empty — Promises (microtasks) run before setTimeout (macrotasks).

