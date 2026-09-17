https://onecompiler.com/javascript/4538buu6x



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

Function.prototype.myCall = function(context = {}, ...args){
    // console.log(this)
    // console.log(context)
    context.fn = this
    context.fn(...args)
}

Obj.log.myCall(bob)
