class SinglyLinkedListNode {
   constructor(value) {
      this.value = value;
      this.next = null;
   }
}

class SinglyLinkedList {
   constructor(iterable) {
      this.head = null;
      this.tail = null;
      this._size = 0;
      if (iterable) {
         for (const item of iterable) this.push_back(item);
      }
   }

   size() {
      return this._size;
   }

   isEmpty() {
      return this._size === 0;
   }

   clear() {
      this.head = this.tail = null;
      this._size = 0;
   }

   front() {
      return this.head ? this.head.value : undefined;
   }

   push_front(value) {
      const node = new SinglyLinkedListNode(value);
      if (!this.head) {
         this.head = this.tail = node;
      } else {
         node.next = this.head;
         this.head = node;
      }
      this._size++;
   }

   push_back(value) {
      const node = new SinglyLinkedListNode(value);
      if (!this.tail) {
         this.head = this.tail = node;
      } else {
         this.tail.next = node;
         this.tail = node;
      }
      this._size++;
   }

   pop_front() {
      if (!this.head) return undefined;
      const val = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this._size--;
      return val;
   }

   pop_back() {
      if (!this.head) return undefined;
      if (this.head === this.tail) {
         const val = this.head.value;
         this.head = this.tail = null;
         this._size = 0;
         return val;
      }
      let cur = this.head;
      while (cur.next && cur.next !== this.tail) cur = cur.next;
      const val = this.tail.value;
      cur.next = null;
      this.tail = cur;
      this._size--;
      return val;
   }

   at(index) {
      if (index < 0 || index >= this._size) return undefined;
      let cur = this.head;
      for (let i = 0; i < index; i++) cur = cur.next;
      return cur.value;
   }

   insert(index, value) {
      if (index < 0 || index > this._size)
         throw new RangeError("Index out of range");
      if (index === 0) return this.push_front(value);
      if (index === this._size) return this.push_back(value);
      let cur = this.head;
      for (let i = 0; i < index - 1; i++) cur = cur.next;
      const node = new SinglyLinkedListNode(value);
      node.next = cur.next;
      cur.next = node;
      this._size++;
   }

   erase(index) {
      if (index < 0 || index >= this._size) return undefined;
      if (index === 0) return this.pop_front();
      let cur = this.head;
      for (let i = 0; i < index - 1; i++) cur = cur.next;
      const removed = cur.next;
      cur.next = removed.next;
      if (removed === this.tail) this.tail = cur;
      this._size--;
      return removed.value;
   }

   remove(value, equals = (a, b) => a === b) {
      let count = 0;
      while (this.head && equals(this.head.value, value)) {
         this.pop_front();
         count++;
      }
      let cur = this.head;
      while (cur && cur.next) {
         if (equals(cur.next.value, value)) {
            if (cur.next === this.tail) this.tail = cur;
            cur.next = cur.next.next;
            this._size--;
            count++;
         } else {
            cur = cur.next;
         }
      }
      return count;
   }

   reverse() {
      let prev = null;
      let cur = this.head;
      this.tail = this.head;
      while (cur) {
         const next = cur.next;
         cur.next = prev;
         prev = cur;
         cur = next;
      }
      this.head = prev;
   }

   mergeSorted(a, b, compare) {
      const dummy = new SinglyLinkedListNode(null);
      let cur = dummy;
      while (a && b) {
         if (compare(a.value, b.value) <= 0) {
            cur.next = a;
            a = a.next;
         } else {
            cur.next = b;
            b = b.next;
         }
         cur = cur.next;
      }
      cur.next = a || b;
      return dummy.next;
   }

   mergeSort(node, compare) {
      if (!node || !node.next) return node;
      let slow = node,
         fast = node.next;
      while (fast && fast.next) {
         slow = slow.next;
         fast = fast.next.next;
      }
      const mid = slow.next;
      slow.next = null;
      const left = this.mergeSort(node, compare);
      const right = this.mergeSort(mid, compare);
      return this.mergeSorted(left, right, compare);
   }

   sort(compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
      this.head = this.mergeSort(this.head, compare);
      let cur = this.head;
      while (cur && cur.next) cur = cur.next;
      this.tail = cur;
   }

   merge(other, compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
      this.head = this.mergeSorted(this.head, other.head, compare);
      let cur = this.head;
      while (cur && cur.next) cur = cur.next;
      this.tail = cur;
      this._size += other._size;
      other.clear();
   }

   toArray() {
      const res = [];
      for (const v of this) res.push(v);
      return res;
   }

   static fromArray(arr) {
      return new SinglyLinkedList(arr);
   }

   [Symbol.iterator]() {
      let cur = this.head;
      return {
         next() {
            if (cur) {
               const val = cur.value;
               cur = cur.next;
               return { value: val, done: false };
            }
            return { value: undefined, done: true };
         },
      };
   }
}

const list = new SinglyLinkedList([3, 1, 4, 1, 5, 9]);
list.push_back(2);
list.push_front(0);
console.log(list.size());
console.log(list.toArray());
list.sort();
console.log(list.toArray());
