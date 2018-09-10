const printList = require('./listUtils').printList;
const createNode = require('./listUtils').createNode;
const generateList = require('./listUtils').generateList;

function generatePList(count) {
    count--;
    const mid = count / 2;
    let current, head;
    current = head = createNode(mid | 0);
    for (i = 1; i <= count; i++) {
        current.next = createNode(Math.abs(mid - i) | 0);
        current = current.next;
    }

    return head;
}

function check(head) {
    printList(head);
    if (!head || !head.next) return false;

    let tempHead = {
        value: head.value
    };

    let slow = head;
    let fast = head;

    while (fast.next && fast.next.next) {
        fast = fast.next.next;
        slow = slow.next;

        tempHead = {
            value: slow.value,
            next: tempHead
        }
    }

    if (fast.next) {
        slow = slow.next;
    }

    printList(tempHead);
    printList(slow);

    while (slow) {
        console.log(tempHead.value, slow.value);
        if (tempHead.value !== slow.value) return false;
        tempHead = tempHead.next;
        slow = slow.next;

    }

    return true;
}

console.log(check(generatePList(5)));