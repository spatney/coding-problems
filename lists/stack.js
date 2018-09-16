class Stack {

    constructor() {
        this.head = undefined;
    }

    push(value) {
        const node = {
            value: value,
            next: this.head
        }

        this.head = node;
    }

    pop() {
        if (this.head) {
            const value = this.head.value;
            this.head = this.head.next;
            return value;
        }

        return null;
    }

}

let stack = new Stack();

for (let i = 0; i < 10; i++) {
    stack.push(i);
}

while ((value = stack.pop()) != null) {
    console.log(value);
}