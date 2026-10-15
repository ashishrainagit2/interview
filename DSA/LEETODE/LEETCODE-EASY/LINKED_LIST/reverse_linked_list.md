206. Reverse Linked List

https://leetcode.com/problems/reverse-linked-list/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// https://www.youtube.com/watch?v=L4rNTY6j3JE
// https://www.youtube.com/watch?v=3IN0BP9Ni6E
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    
    while (curr) {
        const next = curr.next;  // Save next before breaking link
        curr.next = prev;        // Reverse the link
        prev = curr;             // Move prev forward
        curr = next;             // Move curr forward
    }
    
    return prev;
};