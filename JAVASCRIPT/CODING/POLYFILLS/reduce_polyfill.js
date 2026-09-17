// https://onecompiler.com/javascript/45389u63s

let arr = [1,2,3,4,5]

let val = arr.reduce((acc, curr) => {
    return acc + curr
})

console.log(val)


Array.prototype.MyReduce = function(cb , initialValue){
    let accumulator = initialValue;
    for(let i = 0; i < this.length; i++){
        accumulator = accumulator ? cb(accumulator, this[i], i, this): this[i]
    }
    return accumulator;
}

const nums = [1,2,3,4]

const sum = nums.MyReduce((acc, curr, i, arr) => {
    return acc + curr
}, 0)

console.log(sum)