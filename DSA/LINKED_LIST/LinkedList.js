// VIDEO : https://www.youtube.com/watch?v=Tggvw4QlA9U

// Arrays win for most everyday JS work. Linked lists win for specific operations where arrays are expensive.

// Array strengths
// Fast index access: arr[i] → O(1)
// Great cache locality (data sits together in memory)
// Simple, built-in, enough for most frontend code

// Array weaknesses
// Insert/delete in the middle/start → O(n) (shift elements)
// Growing may need reallocation (copy to a bigger block)
// Size is contiguous — awkward for unknown/frequent growth patterns in low-level structures

// Linked list strengths
// Insert/delete at head (or if you already have the node) → O(1)
// No shifting of other elements
// Easy to grow one node at a time
// Good base for queues, stacks, LRU, undo history, etc.

// Linked list weaknesses
// No random access — get i-th item → O(n) walk
// Extra memory per node (next pointer)
// Worse cache performance
// In JS, you rarely hand-roll one for app UI; engines optimize arrays heavily

// Quick compare
//
// | Operation                      | Array      | Singly Linked List                    |
// | ------------------------------ | ---------- | ------------------------------------- |
// | Access by index                | O(1)       | O(n)                                  |
// | Insert/delete at start         | O(n)       | O(1)                                  |
// | Insert/delete at end           | O(1)*      | O(n) without tail / O(1) with tail    |
// | Insert in middle (with ref)    | O(n) shift | O(1) if you have the node             |
//
// * amortized for push at end


// "Arrays have a hidden capacity. push is usually O(1). When capacity is full, the engine allocates a larger buffer and copies — that push is O(n), amortized O(1) overall. Initial capacity isn’t defined by the JS spec; it’s up to the engine.”

class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }

    isEmpty(){
        return this.size === 0;
    }

    getSize(){
        return this.size;
    }

    prepand(value){ //add to the beginning of the list
        const node = new Node(value)
        if(this.isEmpty()){
            this.head = node
        } else {
            node.next = this.head;
            this.head = node
        }
        this.size++;
    }

    append(value){ //add to the end of the list
        const node = new Node(value)
        
        if(this.isEmpty()){
            this.head = node;
        } else {
            let curr = this.head;
            while(curr.next){
                curr = curr.next
            }
            curr.next = node
        }
        this.size++;
    }

    insert(value, index){
        //we have 10 →  20 →  30 →  40
        //insert at 2, 25, means between 20 and 30
        if(index < 0 || index > this.getSize()){
            return 
        }
        if(index === 0){
            this.prepand(value);
        } else {
            const node = new Node(value) 
            //node is 25 -> null
            let prev = this.head;
            for(let i = 0; i < index - 1; i++){
                prev = prev.next;
            }
            // prev = 20 -> 30 -> 40 
            node.next = prev.next
            //node is  25 → 30 → 40 
            prev.next = node
            //20 → 25 → 30 → 40
            // above two lines means
            // prev.next = node
            this.size++;
        }
    }

    remove(index){
        //we have 10 →  20 →  30 →  40
        //remove at 2, means 30
        if(index < 0 || index > this.getSize()){
            return null
        } 

        let removedNode;
        if(index === 0){
            removedNode = this.head
            this.head = this.next.next
        } else {
            let prev = this.head;
            for(let i = 0; i < index - 1; i++){
                prev = prev.next;
            }
            // prev = 20 -> 30 -> 40
           removedNode = prev.next;
           // removedNode = 30 -> 40
           prev.next = removedNode.next;
           // prev = 20 -> 40
           // above twp lines means
           // prev.next = prev.next.next
        }
        this.size--;
        return removedNode.value

    }

    removeValue(value){
        if(this.isEmpty()){
            return null
        }


        if(this.head.value === value){
            this.head = this.head.next;
            this.size--;
            return value
        }else {
            let prev = this.head;
            while(prev.next && prev.next.value !== value){
                prev = prev.next;
            }
            if(prev.next){
                removedNode = prev.next;
                prev.next = removedNode.next;
                this.size--;
                return value;
            }
            return null;
        }
    }

    print(){
        if(this.isEmpty()){
            console.log('List is empty!')
        }else {
            let curr = this.head;
            let listValues = ''
            while(curr){
                listValues += `${curr.data} `;
                curr = curr.next;
            }
            console.log(listValues)
        }
    }
}

const list = new LinkedList()
list.append(10)
list.prepand(20);
list.prepand(30)
list.print();

// write a function to reverse a linked list that has the following methods:
// 1. isEmpty() // check if the list is empty
// 2. getSize()
// 3. print() // print the list
// 4. append(value) // add to the end of the list
// 5. prepand(value) // add to the beginning of the list
// 6. insert(value, index) // insert at a specific index
// 7. remove(index) // remove at a specific index
// 8. removeValue(value) // remove a specific value



