//https://www.youtube.com/watch?v=670f71LTWpM
// https://www.youtube.com/watch?v=ap-6PPAuK1Y
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://www.youtube.com/watch?v=DHvZLI7Db8E

//1.Create a Promise
const myPromise = new Promise((resolve, reject) => {
    const randomNumber = Math.random();
    console.log("randomNumber =>", randomNumber);
    if (randomNumber > 0.5) {
        resolve("Promise resolved");
    } else {
        reject("Promise rejected");
    }
});

// const myPromise = new Promise((resolve, reject) => {
//     // this runs RIGHT NOW
// });
// That function is called the executor — it runs synchronously the moment you hit new Promise(...).

// So randomNumber logs before myPromise.then runs


myPromise.then((result) => {
    console.log("inside then=>" , result);
}).catch((error) => {
    console.log("inside catch =>", error);
});

// You're registering a callback:

// myPromise.then((result) => {
//     // "call me WHEN the promise succeeds"
// });
// Think of it like: "Hey promise, when you're done, run this function and give me whatever value you got."

// 3. Where does result come from?
// From resolve(...), not from randomNumber directly:

//  FLOW:

// resolve("Promise resolved")
//         ↓
// Promise stores that value internally
//         ↓
// .then callback gets called with result = "Promise resolved"

// The random number only decides resolve vs reject — it is not passed to .then.

// Tiny mental model:

// resolve(value)  →  promise succeeds  →  .then(fn) runs  →  fn(value)
// reject(error)   →  promise fails      →  .catch(fn) runs  →  fn(error)



//2. fetch data from api using promise

fetch("https://pokeapi.co/api/v2/pokemon/ditto")
  .then((res) => res.json())
  .then((data) => console.log("data =>", data))
  .catch((err) => console.log("err =>", err));

//3. fetch data from api using async await

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            console.log("data =>", data);
        } catch (err) {
            console.log("err =>", err);
        }
    };

    fetchPokemon(1);

