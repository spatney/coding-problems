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
            printList(head);
            return true;
        }
    }

    console.log("List Mid Point " + slow.value);
    printList(head);
    return false;
}

function createNode(value) {
    return {
        next: null,
        value: value
    };
}

function generateList(loop) {
    let head = first = createNode(0);

    for (let i = 1; i <= 10; i++) {
        head.next = createNode(i);
        head = head.next;
    }

    if (loop) {
        head.next = first.next.next;
    }

    return first;
}

function printList(head) {
    let log = `HEAD -> ${head.value}`
    while (head.next) {
        head = head.next;
        log += ` -> ${head.value}`
    }

    console.log(`${log} -> NULL`);
}

console.log(detectAndBreakCircularList(generateList(true)));
