// input:[{x:1}, {y:2}, {z:3}]
// output: {
// x:1,
// y:2,
// z:3
// }

let input = [{x:1}, {y:2}, {z:3}]



let converter = (input) => {
    let obj = {};
    let val = input.map((item) => {
        // let key = Object.keys(item);
        // // console.log(key)
        // // console.log(item[key])
        // obj[key] = item[key]
        obj = {...obj, ...item}
    })
    console.log(obj)
} 

// Better

const converter2 = (arr) => {
    const res = {};
    for (const item of arr) {
      Object.assign(res, item);
    }
    return res;
  };