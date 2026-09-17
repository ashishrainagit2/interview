// Akshay Saina: https://www.youtube.com/watch?v=qikxEIxsXco
// MDN document: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

// MDN definition:
// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.

// 1. Basic closure – counter

function createCounter() {
  let count = 0;  // This variable is "closed over"
  
  return function() {
    count++;
    return count;
  };
}

let counter1 = createCounter();
console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter1());  // 3


// 2. Write function that runs once only

function runOnce() {
  let hasRun = false;
  
  return function() {
    if (!hasRun) {
      hasRun = true;
      console.log("This runs only once!");
    }
  };
}

const execute = runOnce();
execute();  // "This runs only once!"
execute();  // (nothing)
execute();  // (nothing)

//Where are closures used in or recently used?
// ✅ Have you used Closures in any real project? If yes, where and why?

// Module design pattern
// currying
// functions like once
// memoization
// maintaining state in async world
// setTimeout
// Iterators
// React hooks


//1. Data privacy ( encapsulation )
//Hide data so it isn’t accessible from outside.

function createCounter() {
  let count = 0;  // Private - not accessible outside
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
counter();  // 1
counter();  // 2
// count is hidden - can't access it directly

//2. Event handlers and callbacks
//Keep access to data inside event listeners.

function setupButton() {
  let clickCount = 0;
  document.getElementById('btn').addEventListener('click', function() {
    clickCount++;  // Closure keeps clickCount alive
    console.log(`Clicked ${clickCount} times`);
  });
}

//3. Partial application / currying
//Fix some arguments and return a function that takes the rest.

function multiply(a) {
  return function(b) {
    return a * b;
  };
}
const double = multiply(2);
double(5);  // 10
double(10); // 20

// 4. Function factories
// Create functions with different configurations

function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}
const sayHi = createGreeter('Hello');
const sayBye = createGreeter('Goodbye');
sayHi('Alice');   // "Hello, Alice!"
sayBye('Alice');  // "Goodbye, Alice!"

// 5. Memoization / caching
// Store results so repeated calls avoid recomputation.

function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}

// 6. Module pattern
// Expose only a small public API, hide internals.

const calculator = (function() {
  // Private
  function add(a, b) { return a + b; }
  function subtract(a, b) { return a - b; }
  
  // Public
  return {
    add,
    subtract,
  };
})();
calculator.add(2, 3);  // 5
// add, subtract are not directly accessible

// 7. Iterators and generators
// Track internal state across calls.

function createIterator(arr) {
  let index = 0;
  return function next() {
    return arr[index++];
  };
}
const next = createIterator([1, 2, 3]);
next();  // 1
next();  // 2
next();  // 3

// 8. React (state and effects)
// React hooks use closures to keep values across renders.

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);  // Closure over setCount
    }, 1000);
    return () => clearInterval(id);
  }, []);
  
  return <div>{count}</div>;
}

// 9. setTimeout / setInterval
// Keep access to outer variables inside timers.

function delayedGreeting(name) {
  setTimeout(function() {
    console.log(`Hello, ${name}`);  // Closure captures name
  }, 1000);
}

// 10. Iteration (for loops with var)
// Famous example that highlights closures:

// Classic bug: var + closure
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // Prints 3, 3, 3 (all share same i)
  }, 100);
}

// Fix: let creates new binding per iteration (closure over each i)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // Prints 0, 1, 2
  }, 100);
}

// Summary
// Use case	                What closure does
// Data privacy	            Keeps variables inaccessible from outside
// Event handlers	          Remembers state or data per element
// Partial application	      Binds some arguments for later use
// Memoization	Caches        results per function instance
// Module pattern	          Exposes limited public API
// React hooks	              Keeps state and props across renders
// Callbacks / timers	      Captures surrounding variables

// Closures are everywhere in JavaScript whenever a function is passed around or returned while still referring to variables from its enclosing scope.
