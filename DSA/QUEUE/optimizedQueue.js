class Queue {
    constructor() {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
    }
  
    // Add an element to the back of the queue - O(1)
    enqueue(element) {
      this.items[this.tailIndex] = element;
      this.tailIndex++;
    }
  
    // Remove and return the front element - O(1)
    dequeue() {
      if (this.isEmpty()) return undefined;
      
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex]; // Free up memory
      this.headIndex++;
      return item;
    }
  
    // View the front element without removing it - O(1)
    peek() {
      return this.items[this.headIndex];
    }
  
    // Check if the queue is empty - O(1)
    isEmpty() {
      return this.tailIndex - this.headIndex === 0;
    }
  
    // Get the size of the queue - O(1)
    get size() {
      return this.tailIndex - this.headIndex;
    }

    //print the queue
    print(){
        console.log(this.items)
    }
  }
  
  // Usage:
  const myQueue = new Queue();
  myQueue.enqueue("Task 1");
  myQueue.enqueue("Task 2");
  
  console.log(myQueue.peek());    // Output: "Task 1"
  console.log(myQueue.dequeue()); // Output: "Task 1"
  console.log(myQueue.size);    // Output: 1

  // write a function to reverse a queue that has the following methods:
  // 1. enqueue(element)
  // 2. dequeue()
  // 3. peek()
  // 4. isEmpty()
  // 5. size()
  // 6. print()
  