// Run: node JAVASCRIPT/this.js

const user = {
  name: "Rahul",

  greet: function () {
    // this === user, because we called user.greet()

    // 1. Broken: nested regular function gets its OWN this
    setTimeout(function () {
      console.log("1 broken nested regular:", this && this.name); // undefined
    }, 0);

    // 2. Old fix: bind outer this onto the nested function
    setTimeout(
      function () {
        console.log("2 with bind:", this.name); // Rahul
      }.bind(this),
      0
    );

    // 3. Old fix: copy this into a variable
    const self = this;
    setTimeout(function () {
      console.log("3 with self = this:", self.name); // Rahul
    }, 0);

    // 4. New: arrow takes lexical this from greet. No bind needed.
    setTimeout(() => {
      console.log("4 arrow (lexical this):", this.name); // Rahul
    }, 0);
  },
};

console.log("--- bind vs arrow ---");
user.greet();

console.log("--- lexical this: where it is written, not how it is called ---");

function outer() {
  const arrow = () => {
    console.log("5 arrow:", this.id);
  };
  function regular() {
    console.log("6 regular:", this && this.id);
  }
  return { arrow, regular };
}

const ctx = { id: "from-outer" };
const other = { id: "from-other" };
const fns = outer.call(ctx); // outer's this = ctx

fns.arrow(); // from-outer — written inside outer, keeps outer's this
fns.arrow.call(other); // from-outer — call cannot change arrow this
fns.regular(); // undefined — no object on the left
fns.regular.call(other); // from-other — call works on regular functions

/*
Expected (1-4 print after 5-6 because setTimeout is async):

--- bind vs arrow ---
--- lexical this: where it is written, not how it is called ---
5 arrow: from-outer
6 regular: undefined
5 arrow: from-outer
6 regular: from-other
1 broken nested regular: undefined
2 with bind: Rahul
3 with self = this: Rahul
4 arrow (lexical this): Rahul

Takeaway:
- Regular function: this depends on HOW it is called
- Arrow function: this depends on WHERE it is written, and never changes
- .bind(this) was the old way to freeze this. Arrow does that automatically.
*/
