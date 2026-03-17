// Akshay Saini Youtube Video: https://www.youtube.com/watch?v=75W8UPQ5l7k&t=297s

// call method — simple example
// What it does
// call lets you borrow a function and run it with a different this value.

// Example

const person1 = {
    name: "Alice",
    greet: function(city) {
      console.log(`Hi, I'm ${this.name} from ${city}`);
    }
  };
  
  const person2 = {
    name: "Bob"
  };
  
  // Normal call — this = person1
  person1.greet("Delhi");          // Hi, I'm Alice from Delhi
  
  // Using call — this = person2 (borrowing greet)
  person1.greet.call(person2, "Mumbai");  // Hi, I'm Bob from Mumbai

//   Syntax

// function.call(thisArg, arg1, arg2, ...)

// Part	What it is
// thisArg	The object this will refer to
// arg1, arg2, ...	Arguments passed to the function, one by one

// Simplest possible example

function sayHello() {
    console.log(`Hello, ${this.name}`);
  }
  
  const user = { name: "Ashish" };
  
  sayHello.call(user);  // Hello, Ashish

//   Without call, this.name would be undefined. With call(user), this becomes user.

// call vs apply vs bind — quick glance


function add(a, b) {
    console.log(this.prefix, a + b);
  }
  
  const obj = { prefix: "Result:" };
  
  add.call(obj, 2, 3);          // Result: 5  — args one by one
  add.apply(obj, [2, 3]);       // Result: 5  — args as array
  const bound = add.bind(obj, 2, 3);
  bound();                       // Result: 5  — returns new function, call later

// Method	Runs immediately?	    How args are passed
// call	    Yes	                    One by one
// apply	Yes	                    As an array
// bind	No (returns new function)	One by one
