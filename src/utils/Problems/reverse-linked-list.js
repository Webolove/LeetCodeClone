import assert from "assert";

const starterCodeReverseLL = `/**
* Definition for singly-linked list.
* function ListNode(val, next) {
*     this.val = (val===undefined ? 0 : val)
*     this.next = (next===undefined ? null : next)
* }
*/
function reverseLinkedList(head){

};`;

class LinkedList{
    constructor(value){
        this.value = value;
        this.next = null;
    }

    reverse(){
        let curr = this;
        let prev = null;
        while(curr != null){
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}

function createLinkedList(tst){
    const head = new LinkedList(tst[0]);
    let curr = head;
    for(let i = 1; i < tst.length; ++i){
        const node = new LinkedList(tst[i]);
        curr.next = node;
        curr = node;
    }
    return head;
}

function getListValues(head){
    let curr = head;
    let ans = [];
    while(curr != null){
        ans.push(curr.value);
        curr = curr.next;
    }
    return ans;
}

const handlerReverseLL = (fn)=>{
    try{
        const tests = [[1, 2, 3, 4, 5], [3, 2, 1], [], [1]];
        const answer = [[5, 4, 3, 2, 1], [1, 2, 3], [], [1]];

        for(let i = 0; i < tests.length; ++i){
            // user function results
            // fn is user typed function
            const list = createLinkedList(tests[i]);
            const res = fn(list);
            assert.deepEqual(getListValues(res), answer[i]);
        }
        return true;
    }catch(error){
        throw new Error(error);
    }
}

export const reverseLinkedList = {
    id: "reverse-linked-list",
    title: "1. Reverse Linked List",
    problemStatement: `<p class='mt-3'>Given the <code>head</code> of a singly linked list, reverse the list and return <em>the head of reversed list</em></p>`,
    examples: [
        {
            id: 1,
            inputText: "nums = [1, 2, 3, 4, 5]",
            outputText: "[5, 4, 3, 2, 1]",
            explanation: "",
            img: ``
        },
        {
            id: 2,
            inputText: "nums = [2, 3, 4]",
            outputText: "[4, 3, 2]",
            explanation: "",
            img: ``
        }
    ],
    constraints: `<li class='mt-2'>The number of nodes are in the list are in range <code>[0, 5000]</code>.</li>
<li class='mt-2'><code>-5000</code> <= Node.val <= <code>5000</code></li>`,
    handlerfunction: handlerReverseLL,
    starterCode: starterCodeReverseLL,
    order: 2,
    StarterFunctionName: "function reverseLinkedList("
}