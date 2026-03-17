//https://www.youtube.com/watch?v=670f71LTWpM
// https://www.youtube.com/watch?v=ap-6PPAuK1Y
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

//1.Create a Promise
const myPromise = new Promise((resolve, reject) => {
    const randomNumber = Math.random();
    if (randomNumber > 0.5) {
        resolve("Promise resolved");
    } else {
        reject("Promise rejected");
    }
});

myPromise.then((result) => {
    console.log("inside then=>" , result);
}).catch((error) => {
    console.log("inside catch =>", error);
});

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

