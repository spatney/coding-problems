const utils = require('./listUtils');

function detectAndBreakCircularList(head) {
    let slow = head;
    let fast = head;

    while (slow.next && fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (fast === slow) {
            slow = head;
            while (fast.next !== slow.next) {
                slow = slow.next;
                fast = fast.next;
            }
            console.log("List Loop Point " + fast.next.value);
            fast.next = null;
            utils.printList(head);
            return true;
        }
    }

    console.log("List Mid Point " + slow.value);
    utils.printList(head);
    return false;
}

function generateList(loop) {
    let head = first = utils.createNode(0);

    for (let i = 1; i <= 10; i++) {
        head.next = utils.createNode(i);
        head = head.next;
    }

    if (loop) {
        head.next = first.next.next;
    }

    return first;
}

console.log(detectAndBreakCircularList(generateList(true)));
