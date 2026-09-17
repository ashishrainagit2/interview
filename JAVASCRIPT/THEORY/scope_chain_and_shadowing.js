// https://www.youtube.com/watch?v=uH-tVP8MUs8

// scope chain and shadowing:
// scope chain is the order in which variables are searched for in the code.

// shadowing is when a variable in the inner scope has the same name as a variable in the outer scope.

// example:
let a = 1;
function b() {
    let a = 2;
    console.log(a);
}
b();
console.log(a);

// output:
// 2
// 1

// explanation: when b() is called, the variable a is shadowed by the local variable a in the function b().