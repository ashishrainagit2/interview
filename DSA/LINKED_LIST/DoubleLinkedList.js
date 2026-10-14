class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  // walk to index (0 = head)
  get(index) {
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }
    return curr;
  }

  append(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  insert(value, index) {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index === this.size) {
      this.append(value);
      return;
    }

    // same idea as singly list, plus prev arrows
    const node = new Node(value);
    const prev = this.get(index - 1);
    const next = prev.next;

    prev.next = node;
    node.prev = prev;
    node.next = next;
    next.prev = node;
    this.size++;
  }

  remove(index) {
    if (index < 0 || index >= this.size) return null;

    let removed;
    if (index === 0) {
      removed = this.head;
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
    } else if (index === this.size - 1) {
      removed = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      removed = this.get(index);
      removed.prev.next = removed.next;
      removed.next.prev = removed.prev;
    }

    this.size--;
    return removed.value;
  }

  print() {
    const values = [];
    let curr = this.head;
    while (curr) {
      values.push(curr.value);
      curr = curr.next;
    }
    console.log(values.join(" ⇄ "));
  }
}

const list = new DoubleLinkedList();
list.append(10);
list.append(20);
list.append(30);
list.prepend(5);
list.insert(15, 2);
list.print(); // 5 ⇄ 10 ⇄ 15 ⇄ 20 ⇄ 30
list.remove(2);
list.print(); // 5 ⇄ 10 ⇄ 20 ⇄ 30
