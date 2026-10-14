// queue has push and shift methods

class Queue {
    constructor(){
        this.items = []
    }

    enqueue(element){
       this.items.push(element)
    }
     
    dequeue(element){
        this.items.shift(element)
    }

    isEmpty(){
        return this.items.length === 0
    }

    size(){
        return this.items.length
    }

    peek(){
        if (this.isEmpty()) return null;
        return this.items[0]
    }

    print(){
        console.log(this.items.toString())
    }
}

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.print()
console.log(queue.peek())
console.log(queue.size())
console.log(queue.isEmpty())
console.log(queue.dequeue())
console.log(queue.print())