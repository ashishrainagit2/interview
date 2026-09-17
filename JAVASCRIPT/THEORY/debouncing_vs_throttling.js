// Akshay Saini youtube video: https://www.youtube.com/watch?v=tJhA0DrH5co

// Practical uses of throttling in JS
// scroll events
// Update sticky header/progress bar without running logic on every pixel scroll.
// resize events
// Recalculate layout/cards only every few ms while user resizes window.
// mousemove / pointermove
// Useful for drag UIs, drawing previews, tooltip tracking.
// Infinite scroll checks
// Check “near bottom?” at intervals instead of every scroll event.
// API rate protection
// Prevent too many requests from rapid button clicks/typing/filters.
// Game/input controls
// Limit repeated key/action handling to stable intervals.

function throttle(fn, wait) {
    let lastTime = 0;
  
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  }
  
  const onScroll = throttle(() => {
    console.log("Handled scroll at:", new Date().toLocaleTimeString());
  }, 200);
  
  window.addEventListener("scroll", onScroll);
  
  // Different throttled events
  const onResize = throttle(() => {
    console.log("Handled resize:", window.innerWidth, "x", window.innerHeight);
  }, 3000);
  
  const onMouseMove = throttle((event) => {
    console.log("Mouse:", event.clientX, event.clientY);
  }, 3000);
  
  window.addEventListener("resize", onResize);
  document.addEventListener("mousemove", onMouseMove);

  // https://codesandbox.io/p/sandbox/mmymlt