// Akshay Saini's video on currying: https://www.youtube.com/watch?v=vQcCNpuaJO8
// Roadside coder: https://www.youtube.com/watch?v=k5TC9i5HonI

//https://roadsidecoder.hashnode.dev/javascript-interview-questions-currying-output-based-questions-partial-application-and-more?__cf_chl_rt_tk=5UT2m61wHbJ9t9O7mrQCTzrS61pRQ0hwgqosytYOwjk-1773658580-1.0.1.1-pa_pqQOoDdNGoIGxHxx2FRRLp75v326HU6UYL0RVc5c


// bind method
let multiply = (a, b) => a * b;

let multiplyByTwo = multiply.bind(this, 2);

multiplyByTwo(5); // 10

// closure method

let multiple_version_2 = function(x){
    return function(y){
        return x * y;
    }
}

let multiplyByTwo_2 = multiple_version_2(2);
let multipleByThree_2 = multiple_version_2(3);

multiplyByTwo_2(5); // 10
multipleByThree_2(5); // 15


// Q1. convert func(a , b ) into func(a)(b)

function sum(a){
    return function (b) {
        console.log(a + b)
    }
}

sum(9)(10)

// Q2  Why do we use currying?

//Q3 sum(1)(2)(3)

const sum = (a) => {
    return (b) => {
        return (c) => {
            console.log(a + b +c)
        }
    }
}

sum(1)(2)(3)



// Q3. Evaluate ("sum")(4)(2) => 6
//     Evaluate ("multiply")(4)(2) => 8
//     Evaluate ("divide")(4)(2) => 2
//     Evaluate ("subtract")(4)(2) => 2

function Evaluate(operator){
    return function(a){
        return function(b){
            if(operator === 'sum') return b + c;
            else if (operator === 'multiply') return a * b;
            else if (operator === 'divide') return a/b;
            else if (operator === 'subtract') return a - b;
            else return "Invalid Operation"
        }
    }
}

console.log(Evaluate("multiply")(6)(10));

const multiplyCurry = Evaluate("multiply");

console.log(multiplyCurry(99)(100))

// Q4. infinte 
// implement console.log(add(1)(2)(3)(4)()) this can be variable/any number of parameters

function resursiveAdd(a){
    return function(b){
        if(b) return resursiveAdd( a + b)
        return a
    }
}

console.log(resursiveAdd(1)(2)(3)(4)())

const recursiveCurry = (fn, accumulator) => {
    return (...args) => {
        if (args.length === 0) return accumulator;
        const nextValue = args.reduce(fn, accumulator);
        return recursiveCurry(fn, nextValue);
    };
};

const infiniteSum = recursiveCurry((total, value) => total + value, 0);
console.log(infiniteSum(1)(2)(3)(4)()); // 10

// Q5.Difference between currying and partial application
function sum(a) {
    return function (b, c) {
      return a + b + c;
    };
  }
  const x = sum(10);
  console.log(x(5, 6));
  console.log(x(3, 2));
  // or
  console.log(sum(20)(1, 4));


  //Q6. use of currying
  //dom munipulating
  function updateElementText(id) {
    return function (content) {
      document.querySelector("#" + id).textContent = content;
    };
  }
  const updateHeader = updateElementText("heading");
  updateHeader("Subscribe to RoadsideCoder");

//   Q7. infinite params handler currying curry() implementation
    function curry(func){
        // func will become sum for below usage
        return function curriedFunc(...args){
            console.log("args", args)
            if(args.length >= func.length){
                return func(...args)
            }else {
                return function(...next){
                    return curriedFunc(...args, ...next)
                }
            }
        }
    }

    const sum = (a , b , c) => a + b +c;

    const totalSum = curry(sum)

    console.log(totalSum(1)(2)(3))
    console.log(totalSum(1)(2)(3)(5))// wont work for this


