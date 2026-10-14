// This file is a Binary Search Tree (BST), not a generic binary tree.
// Rule: left < node <= right. inOrder() prints sorted values.

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Search Tree: left < node <= right
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let curr = this.root;
    while (true) {
      if (value < curr.value) {
        if (!curr.left) {
          curr.left = newNode;
          return;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          return;
        }
        curr = curr.right;
      }
    }
  }

  search(value) {
    let curr = this.root;
    while (curr) {
      if (value === curr.value) return true;
      curr = value < curr.value ? curr.left : curr.right;
    }
    return false;
  }

  min() {
    if (!this.root) return undefined;
    let curr = this.root;
    while (curr.left) curr = curr.left;
    return curr.value;
  }

  max() {
    if (!this.root) return undefined;
    let curr = this.root;
    while (curr.right) curr = curr.right;
    return curr.value;
  }

  preOrder(node = this.root, result = []) {
    if (!node) return result;
    result.push(node.value);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);
    return result;
  }

  inOrder(node = this.root, result = []) { //
    if (!node) return result;
    this.inOrder(node.left, result);
    result.push(node.value);
    this.inOrder(node.right, result);
    return result;
  }

  

  postOrder(node = this.root, result = []) {
    if (!node) return result;
    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.value);
    return result;
  }

  levelOrder() {
    if (!this.root) return [];
    const queue = [this.root];
    const result = [];

    while (queue.length) {
      const curr = queue.shift();
      result.push(curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
    return result;
  }

  print(node = this.root, prefix = "", child = "") {
    if (!node) return;

    if (node.left) {
    this.print(node.left, prefix + (child === "r" ? "│   " : "    "), "l");
    }

    const branch = child === "l" ? "┌── " : child === "r" ? "└── " : "";
    console.log(prefix + branch + node.value);

    if (node.right) {
    this.print(node.right, prefix + (child === "l" ? "│   " : "    "), "r");
    }
  }
  
}

const tree = new BinarySearchTree();
tree.insert(10);
  tree.insert(5);
  tree.insert(15);
  tree.insert(3);
  tree.insert(7);
  tree.insert(12);
  tree.insert(17);
  tree.insert(1);
  tree.insert(4);
  tree.insert(6);
  tree.insert(8);
  tree.insert(11);
  tree.insert(13);
  tree.print()
  console.log(tree.search(9)); // true
console.log(tree.search(17)); // false
console.log('min', tree.min()); //min 1
console.log('max', tree.max()); // max 17
console.log(tree.inOrder()); 
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.levelOrder()); 
// 1. insert(value)
// 2. search(value)
// 3. min()
// 4. max()
// 5. preOrder()
// 6. inOrder()
// 7. postOrder()
// 8. levelOrder()
