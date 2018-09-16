const printList = require('./listUtils').printList;

class Queue {
    enqueue(value) {
        const node = {
            next: null,
            value: value
        };

        if (!this.head) {
            this.head = node;
        }
        else {
            let current = this.head;

            while (current.next) {
                current = current.next
            }

            current.next = node;
        }
    }

    dequeue() {
        if (this.head) {
            let value = this.head.value;
            this.head = this.head.next;
            return value;
        }

        return null;
    }
}

let queue = new Queue();

for (let i = 0; i < 10; i++) {
    queue.enqueue(i);
}

while ((value = queue.dequeue()) != null) {
    console.log(value);
}
