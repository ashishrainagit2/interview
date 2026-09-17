Array.prototype.myMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

Array.prototype.myFilter = function(callback) {
    const result = [];
    for(let i = 0; i < this.length ; i++){
        if(callback(this[i],i, this)){
            result.push(this[i])
        }
    }
    return result;

}