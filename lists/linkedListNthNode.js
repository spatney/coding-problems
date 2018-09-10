const generateList = require('./listUtils').generateList;
const printList = require('./listUtils').printList;

function findNthNode(l, n) {
    let head = generateList(l);

    printList(head);

    let fast = head;
    let slow = head;

    for(let i=0; i<n; i++) {
        fast = fast.next;
        if(!fast) { return false; }
    }

    while(fast.next) {
        slow = slow.next;
        fast = fast.next;
    }

    console.log("Nth from back: " + slow.value);
}

findNthNode(10,0);
