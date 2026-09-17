// Akshay Saini Youtube Video: https://www.youtube.com/watch?v=Zo-6_qx8uxg

// https://codesandbox.io/p/sandbox/mvzs8w

var debouncer = (func, delay) => {
    console.log("douncer called"); // runs only first time
    let timer; //It creates timer inside closure.
  
    return function (...args) {
      console.log("This is called every time");
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  
  var searchHandler = (value) => {
    console.log("api call....", value);
  };
  
  var debounceSearch = debouncer(searchHandler, 3000);
  console.log(debounceSearch);
  
  document
    .getElementById("searchInput")
    .addEventListener("input", (e) => debounceSearch(e.target.value));
  
  console.log("js is connected...");


// Full call chain
// debouncer(searchHandler, 3000) runs once

// creates timer in closure
// returns inner function (debounceSearch)
// On each input event

// debounceSearch(e.target.value) called
// inner function receives value in args
// clears previous timer
// starts new timer
// After 3s of no new typing

// timeout callback runs
// func.apply(context, args) executes with last typed value
// So last input wins.

// returned function has no own name
// variable debounceSearch becomes the handle to call it
// closure (timer, func, delay) stays attached to that function reference





