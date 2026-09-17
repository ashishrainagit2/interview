// LINKED LIST
// https://www.youtube.com/playlist?list=PLC3y8-rFHvwg6nsAOfC5Is18KB2DrVOJy
// https://www.geeksforgeeks.org/dsa/linked-list-data-structure/


// https://onecompiler.com/javascript/4537sapbp

class Node {
    constructor(data){
        this.data = data;
        this.next = null
    }
}

let head = new Node(90);

head.next = new Node(99);

head.next.next = new Node(109);

head.next.next.next = new Node(119);

while(head !== null){
    process.stdout.write(head.data + " ");
    head = head.next;
}

// Transversing a linked List

// https://www.geeksforgeeks.org/dsa/traversal-of-singly-linked-list/

class Node {
    constructor(newData){
        this.data = newData;
        this.next = null;
    }
}

let head = new Node(100);
head.next = new Node(200);
head.next.next = new Node(300);
head.next.next.next = new Node(400);

function Transversing(head){
    while(head !== null){
        console.log(head.data.toString());
        head = head.next;
    }

}

Transversing(head)

// https://onecompiler.com/javascript/4537u8uxm


// Delete a node in linkedList

let deleteNode = function(Node) {
    Node.value = Node.next.val;
    Node.next = Node.next.next;
}


//Delete Nth Node from last  , given head and node

var removeNthFromEnd = function(head, n) {
        let temp = head;
        let i = -2;
        let j = 2;
        while(temp != null){
            i++;
            if(temp?.next?.next == null || temp?.next?.next == undefined){
                temp = 
            }
            temp = head.next;
        }


};


