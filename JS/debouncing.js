// Akshay Saini Youtube Video: https://www.youtube.com/watch?v=Zo-6_qx8uxg

// https://codesandbox.io/p/sandbox/mvzs8w

var debouncer = (func, delay) => {
    console.log("douncer called"); // runs only first time
    let timer; //It creates timer inside closure.
  
    return function (...args) {
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
  
  document
    .getElementById("searchInput")
    .addEventListener("input", (e) => debounceSearch(e.target.value));
  
  console.log("js is connected...");