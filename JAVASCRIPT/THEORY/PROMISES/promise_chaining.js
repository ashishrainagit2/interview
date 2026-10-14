// https://www.youtube.com/watch?v=U74BJcr8NeQ

// explain promise chaining with example

/*
  PROMISE CHAINING — what & why

  Each .then() returns a NEW promise.
  Return a value (or another promise) from .then() → next .then() receives it.
  That's chaining: step 1 → step 2 → step 3 without nested callbacks.

  Flow:
    fetch user → get userId → fetch posts for that user → log posts
*/

// --- Example 1: chain with return values ---

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Ashish" }), 500)
  })
}

function getPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([`post-A-${userId}`, `post-B-${userId}`]), 500)
  })
}

getUser()
  .then((user) => {
    console.log("1. user:", user.name)
    return getPosts(user.id) // return promise → next .then waits for it
  })
  .then((posts) => {
    console.log("2. posts:", posts)
    return posts.length // return plain value → next .then gets 2
  })
  .then((count) => {
    console.log("3. post count:", count)
  })
  .catch((err) => {
    console.error("any step failed:", err)
  })

/*
  --- Example 2: fetch style (real world) ---

  fetch("/api/user/1")
    .then((res) => res.json())
    .then((user) => fetch(`/api/posts?userId=${user.id}`))
    .then((res) => res.json())
    .then((posts) => console.log(posts))
    .catch((err) => console.error(err))

  --- Rules to remember ---

  1. return inside .then() — otherwise next .then gets undefined
  2. return a promise — chain waits for it to settle
  3. throw or reject — jumps to nearest .catch()
  4. .catch() can return a value — chain continues after recovery
  5. async/await is the same flow, flatter syntax:

     const user = await getUser()
     const posts = await getPosts(user.id)

  Interview one-liner:
  "Promise chaining links async steps — each .then returns a promise,
   and returning a value or promise passes it to the next .then."
*/
