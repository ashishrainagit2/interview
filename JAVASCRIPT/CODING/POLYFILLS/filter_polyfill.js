Array.prototype.myFilter = function(callback) {
    const result = [];
    for(let i = 0; i < this.length ; i++){
        if(callback(this[i],i, this)){
            result.push(this[i])
        }
    }
    return result;

}


let res = [1,2,3, 4,5, 6, 7, 8].myFilter((item) => {
   return  item  > 5
})
