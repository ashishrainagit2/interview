1.  237. Delete Node in a Linked List

 https://leetcode.com/problems/delete-node-in-a-linked-list/description/

 /**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    
};

ANS
https://www.youtube.com/watch?v=klQooeHnZ-I

var deleteNode = function(node) {
    if (!node || !node.next) return;
    node.val = node.next.val;
    node.next = node.next.next;
};

