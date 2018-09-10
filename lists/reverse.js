const generateList = require('./listUtils').generateList;
const printList = require('./listUtils').printList;

function reverse(head) {
    let result = reverseInternal(head);
    head.next = null;
    return result.newHead;
}

function reverseInternal(current) {
    let prevResult;

    if (current.next) {
        prevResult = reverseInternal(current.next);
        prevResult.current.next = current;
    }

    return {
        current: current,
        newHead: prevResult
            ? prevResult.newHead
            : current
    }
}

let list = generateList(10);
printList(list);
printList(reverse(list));