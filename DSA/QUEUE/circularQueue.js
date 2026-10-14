class CircularQueue {
  constructor(capacity) {
    this.queue = new Array(capacity);
    this.capacity = capacity;
    this.size = 0;
    this.front = 0;
    this.rear = 0;
  }

  enqueue(element) { //means add to the end of the queue
    if (this.isFull()) return "Queue is full";

    this.queue[this.rear] = element;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }

  dequeue() {//means remove from the front of the queue
    if (this.isEmpty()) return "Queue is empty";

    const item = this.queue[this.front];
    this.queue[this.front] = undefined;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return item;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.queue[this.front];
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }

  print() {
    const values = [];
    for (let i = 0; i < this.size; i++) {
      values.push(this.queue[(this.front + i) % this.capacity]);
    }
    console.log(values);
  }
}

const queue = new CircularQueue(5);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
queue.enqueue(5);
console.log(queue.enqueue(6)); // Queue is full
queue.dequeue();
queue.dequeue();
queue.enqueue(6);
queue.enqueue(7);
queue.print(); // [3, 4, 5, 6, 7]  — 6 and 7 reused slots 0 and 1
