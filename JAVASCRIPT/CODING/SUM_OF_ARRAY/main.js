let arr = [1,2,3,4];

let sumOfArr = (arr) => {
  return arr.reduce((acc, curr) => acc + curr, 0);
};

console.log(sumOfArr(arr)); // 45718

// const result = array.reduce((accumulator, currentValue, currentIndex, array) => {
//   // Logic to update and return the accumulator
// }, initialValue);


// https://onecompiler.com/javascript/454p2vt7w