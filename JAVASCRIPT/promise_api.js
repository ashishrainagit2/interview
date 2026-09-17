// https://www.youtube.com/watch?v=DlTVt1rZjIo


//ONE AFTER ANOTHER
// https://codesandbox.io/p/sandbox/tc35jm
async function getPostWithComments() {
    // Step 1: Get a post
    const postRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await postRes.json();
    
    // Step 2: Use post.id to get its comments
    const commentsRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
    );
    const comments = await commentsRes.json();
    
    return { post, comments };
  }
  
getPostWithComments().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
});

// Flatter version using nested promises:

function getPostWithComments() {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(post =>
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
          .then(res => res.json())
          .then(comments => ({ post, comments }))
      )
      .catch(err => {
        console.error('Error:', err);
        throw err;
      });
  }
  
  getPostWithComments()
    .then(({ post, comments }) => console.log(post, comments))
    .catch(console.error);

// Runs multiple promises in parallel and waits for all of them to finish.
// Basic syntax: Promise.all(iterable)

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // results is an array of all resolved values
  })
  .catch((error) => {
    // runs if ANY one promise rejects
  });


//   Simple example
// https://codesandbox.io/p/sandbox/qp96h7

const p1 = fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => r.json());
const p2 = fetch("https://jsonplaceholder.typicode.com/posts/2").then(r => r.json());
const p3 = fetch("https://jsonplaceholder.typicode.com/posts/3").then(r => r.json());

Promise.all([p1, p2, p3])
  .then(([post1, post2, post3]) => {
    console.log(post1.title);
    console.log(post2.title);
    console.log(post3.title);
  })
  .catch((error) => {
    console.log("One of them failed:", error);
  });

//   All 3 fetches start at the same time. Promise.all waits until all 3 are done, then gives you the results in order.

// https://codesandbox.io/p/sandbox/3yj2nr
async function getPostAndRelated() {
    const postRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await postRes.json();
    
    // Now fetch comments and user in parallel
    const [commentsRes, userRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`),
      fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
    ]);
    
    const [comments, user] = await Promise.all([
      commentsRes.json(),
      userRes.json()
    ]);
    
    return { post, comments, user };
  }


  // All three requests run in parallel instead of one after another.
  // https://codesandbox.io/p/sandbox/nylzcw

const p11 = fetch('https://jsonplaceholder.typicode.com/posts/1');
const p22 = fetch('https://jsonplaceholder.typicode.com/posts/2');
const p33 = fetch('https://jsonplaceholder.typicode.com/posts/3');

Promise.all([p11, p22, p33])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(data => {
    console.log(data[0]);  // post 1
    console.log(data[1]);  // post 2
    console.log(data[2]);  // post 3
  });

  //   Sequential vs Parallel

// Sequential (slow) - ~3 seconds total
async function sequential() {
    const a = await fetch('/api/a');  // wait 1s
    const b = await fetch('/api/b');  // wait 1s
    const c = await fetch('/api/c');  // wait 1s
  }
  
  // Parallel (fast) - ~1 second total
  async function parallel() {
    const [a, b, c] = await Promise.all([
      fetch('/api/a'),
      fetch('/api/b'),
      fetch('/api/c')
    ]);
  }


//   1. Promise.allSettled
//   Waits for all promises to finish (resolve or reject) and returns a result for each.
// When you need the outcome of every promise, even if some fail

Promise.allSettled([
    Promise.resolve(1),
    Promise.reject('Failed'),
    Promise.resolve(3)
  ])
  .then(results => {
    console.log(results);
  });

// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'Failed' },
//   { status: 'fulfilled', value: 3 }
// ]

//   Example – multiple API calls, some may fail:

async function getPosts() {
const results = await Promise.allSettled([
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/nnn').then(r => r.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/3').then(r => r.json()),
  ]);
  
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(`Request ${i} succeeded:`, result.value);
    } else {
      console.log(`Request ${i} failed:`, result.reason);
    }
  });
}

getPosts();

//   3. Promise.race
//   Settles as soon as the first promise settles (resolve or reject).

Promise.race([
    fetch('/api/slow'),
    fetch('/api/fast'),
    new Promise((_, reject) => setTimeout(() => reject('Timeout'), 3000))
  ])
  .then(result => console.log('First to finish:', result))
  .catch(err => console.log('First to fail or timeout:', err));

//   Example – timeout wrapper:

function fetchWithTimeout(url, ms) {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), ms)
      )
    ]);
  }

//   Promise.any
//   Resolves when the first promise resolves; rejects only if all promises reject.

Promise.any([
    Promise.reject('Error 1'),
    Promise.resolve('Success!'),
    Promise.reject('Error 2')
  ])
  .then(console.log);  // "Success!"

  Promise.any([
    Promise.reject('Error 1'),
    Promise.reject('Error 2')
  ])
  .catch(err => console.log(err));  // AggregateError: All promises were rejected

  // Practical: same file on 3 CDNs — use the first one that actually works
  // (one CDN down / blocked / 404 does not matter)
  const file = "/logo.png";

  function fetchOk(url) {
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error(res.status); // 404/500 must count as fail
      return res;
    });
  }

  const res = await Promise.any([
    fetchOk("https://cdn1.cloudflare.com" + file),
    fetchOk("https://cdn2.jsdelivr.net" + file),
    fetchOk("https://cdn3.unpkg.com" + file),
  ]);
  // first SUCCESSFUL response — same image, whichever CDN answered ok

  // Why not Promise.race?
  // race → first to settle wins. If cdn1 fails in 50ms, you get the error
  //        even though cdn2 would succeed in 80ms.
  // any  → ignores rejects, waits for the first resolve. That is the CDN case.

  // USE CASE (one-liner, real site):
  // Promise.all        → homepage: fetch user + cart + products together; if ANY fails, show error page
  // Promise.allSettled → dashboard widgets: show the ones that loaded, keep a fallback on the ones that failed
  // Promise.race       → timeout: first of (API response vs 3s timer) wins — cancel/slow-network guard
  // Promise.any        → same logo/script on 3 CDNs; take first that returns 200, ignore the dead ones


// Quick comparison
// Method	    Resolves when	Rejects when	Result
// all	        All resolve	    Any rejects	    Array of values
// allSettled	All settle	    Never	        Array of { status, value/reason }
// race	        First settles	First rejects	First value or reason
// any	        First resolves	All reject	    First value


// Decision guide
// Need all to succeed → Promise.all
// Need outcome of every promise → Promise.allSettled
// Need first to finish (e.g. timeout) → Promise.race
// Need first success among many → Promise.any


// CLEAN THIS FILE AND MAKE IT MORE READABLE AND EASY TO UNDERSTAND FROM AKSHAY SAINI YOUTUBE VIDEO
