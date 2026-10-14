// https://www.youtube.com/watch?v=IJ6EgdiI_wU

// 1. Define the generator function
function* countUpTo(max) {
    let count = 1;
    while (count <= max) {
      yield count; // Pauses and returns the current count
      count++;
    }
  }
  
  // 2. Create the generator object (does not run the code immediately)
  const counter = countUpTo(3);
  
  // 3. Call .next() to step through the execution
  console.log(counter.next()); // { value: 1, done: false }
  console.log(counter.next()); // { value: 2, done: false }
  console.log(counter.next()); // { value: 3, done: false }
  console.log(counter.next()); // { value: undefined, done: true }