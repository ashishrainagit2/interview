https://onecompiler.com/javascript/4538dhwt4


let Obj = {
    firstName: this.firstName,
    lastName: this.lastName,
    log: function(){
        console.log(this.firstName + '_' + this.lastName)
    }
}

const bob = {
    firstName: 'bob',
    lastName: 'marley'
}

// Obj.log.call(bob)

Function.prototype.myApply = function(context = {}, ...args){
    if(typeof this !== "function"){
       throw new Error(this + 'is not callable') 
    }
    context.fn = this
    context.fn(...args)
}

Obj.log.myCall(bob)
