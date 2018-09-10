class LRUCache {

    constructor(size) {
        this.head = this.tail = undefined;
        this.map = {};
        this.size = size;
        this.currSize = 0;
        this.printList();
    }

    get(key) {
        console.log(`get(${key})`);
        let node = this.map[key];
        if (node != null) {
            this.moveToFront(node);
            this.printList();
            return node.data;
        }
        this.printList();

        return null;
    }

    set(key, value) {
        console.log(`set(${key}, ${value})`);
        let node = this.map[key];
        if (node == null) {
            node = {
                prev: null,
                next: this.head,
                data: value,
                key: key
            };
            this.addToFront(node);
            this.map[key] = node;
        } else {
            this.moveToFront(node);
            this.map[key].data = value;
        }

        this.printList();
    }

    moveToFront(node) {
        if (this.head === node) return;
        if (node === this.tail) {
            this.tail = this.tail.prev;
        }

        node.prev.next = node.next;
        if (node.next) {
            node.next.prev = node.prev;
        }

        node.next = this.head;
        if (this.head) {
            this.head.prev = node;
        }

        this.head = node;

        return node;
    }

    delete(key) {
        console.log(`delete(${key})`);
        let node = this.map[key];

        if (node) {
            if (node === this.head) {
                this.head = this.head.next;
            } else if (node === this.tail) {
                this.tail = this.tail.prev;
                this.tail.next = undefined;
            } else {
                node.prev.next = node.next;
                node.next.prev = node.prev;
            }

            this.map[key] = undefined;

            this.currSize--;
        }
        this.printList();
    }

    addToFront(node) {
        if (this.currSize === this.size) {
            this.tail = this.tail.prev;
            this.map[this.tail.next.key] = undefined;
            this.tail.next = undefined;
        } else {
            this.currSize++;
        }

        if (this.head) {
            this.head.prev = node;
        } else {
            this.tail = node;
        }

        this.head = node;
        return node;
    }

    printList() {
        let node = this.head;

        let log = "HEAD -> ";

        while (node) {
            log += `(${node.key}, ${node.data}) -> `;
            node = node.next;
        }

        console.log(`${log}NULL (Size: ${this.currSize})`);
    }
}

let cache = new LRUCache(3);

cache.set("A", 10);
cache.set("B", 20);
cache.set("C", 30);
cache.set("D", 40);
cache.set("E", 50);
cache.get("C");
cache.get("B");
cache.delete("C");
cache.delete("D");
cache.delete("E");
cache.get("C");
cache.set("A", 10);
cache.set("B", 20);
cache.set("C", 30);
cache.set("D", 40);
cache.set("E", 50);
cache.get("C");
cache.get("B");