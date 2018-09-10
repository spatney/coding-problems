function createNode(value) {
    return {
        next: null,
        value: value
    };
}

function printList(head) {
    let log = `HEAD -> ${head.value}`
    while (head.next) {
        head = head.next;
        log += ` -> ${head.value}`
    }

    console.log(`${log} -> NULL`);
}

function generateList(count) {
    let current = head = createNode(0);

    for (let i = 1; i < count; i++) {
        current.next = createNode(i);
        current = current.next;
    }

    return head;
}

module.exports = {
    generateList: generateList,
    printList: printList,
    createNode: createNode
}