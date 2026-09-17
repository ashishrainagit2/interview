//https://onecompiler.com/javascript/4538f2pcz

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

let test = Obj.log.bind(bob)

Function.prototype.bind = function(context = {}, ...args){
    // console.log(this)
    // console.log(context)
    context.fn = this
    context.fn(...args)
}

// Obj.log.myCall(bob)
