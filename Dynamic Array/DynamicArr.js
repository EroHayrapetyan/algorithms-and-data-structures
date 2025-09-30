export class DynamicArray {
   #arr;
   #size = 0;
   #capacity = 0;
   #CAP_EXPONENT = 2;

   constructor(initialCapacity = 1) {
      if (initialCapacity < 1) initialCapacity = 1;
      this.#capacity = initialCapacity;
      this.#arr = new Uint32Array(this.#capacity);
   }

   static from(iterable) {
      const da = new DynamicArray();
      for (const val of iterable) da.pushBack(val);
      return da;
   }

   size() {
      return this.#size;
   }
   capacity() {
      return this.#capacity;
   }
   empty() {
      return this.#size === 0;
   }

   reserve(n) {
      if (n > this.#capacity) this.#resizeBuffer(n);
   }

   shrinkToFit() {
      if (this.#capacity > this.#size) this.#resizeBuffer(this.#size);
   }

   clear() {
      this.#size = 0;
   }

   at(i) {
      if (i < 0 || i >= this.#size) throw new RangeError("Index out of bounds");
      return this.#arr[i];
   }

   set(i, value) {
      this.#checkUint32(value);
      if (i < 0 || i >= this.#size) throw new RangeError("Index out of bounds");
      this.#arr[i] = value;
   }

   front() {
      if (this.empty()) throw new RangeError("Array is empty");
      return this.#arr[0];
   }

   back() {
      if (this.empty()) throw new RangeError("Array is empty");
      return this.#arr[this.#size - 1];
   }

   toArray() {
      return Array.from(this);
   }

   pushBack(value) {
      this.#checkUint32(value);
      if (this.#size === this.#capacity)
         this.#resizeBuffer(Math.max(1, this.#capacity * this.#CAP_EXPONENT));
      this.#arr[this.#size++] = value;
   }

   popBack() {
      if (this.empty()) throw new RangeError("Array is empty");
      this.#size--;
   }

   insert(pos, value) {
      this.#checkUint32(value);
      if (pos < 0 || pos > this.#size)
         throw new RangeError("Index out of bounds");
      if (this.#size === this.#capacity)
         this.#resizeBuffer(Math.max(1, this.#capacity * this.#CAP_EXPONENT));
      for (let i = this.#size; i > pos; i--) this.#arr[i] = this.#arr[i - 1];
      this.#arr[pos] = value;
      this.#size++;
   }

   erase(pos) {
      if (pos < 0 || pos >= this.#size)
         throw new RangeError("Index out of bounds");
      for (let i = pos; i < this.#size - 1; i++)
         this.#arr[i] = this.#arr[i + 1];
      this.#size--;
   }

   resize(n, fill = 0) {
      this.#checkUint32(fill);
      if (n > this.#capacity) this.#resizeBuffer(n);
      if (n > this.#size) {
         for (let i = this.#size; i < n; i++) this.#arr[i] = fill;
      }
      this.#size = n;
   }

   swap(i, j) {
      if (i < 0 || i >= this.#size || j < 0 || j >= this.#size)
         throw new RangeError("Index out of bounds");
      [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
   }

   // Iterators
   [Symbol.iterator]() {
      let index = 0;
      const size = this.#size;
      const arr = this.#arr;
      return {
         next() {
            return index < size
               ? { value: arr[index++], done: false }
               : { value: undefined, done: true };
         },
      };
   }

   values() {
      return this[Symbol.iterator]();
   }
   keys() {
      let index = 0;
      const size = this.#size;
      return {
         [Symbol.iterator]() {
            return {
               next() {
                  return index < size
                     ? { value: index++, done: false }
                     : { value: undefined, done: true };
               },
            };
         },
      };
   }
   entries() {
      let index = 0;
      const size = this.#size;
      const arr = this.#arr;
      return {
         [Symbol.iterator]() {
            return {
               next() {
                  return index < size
                     ? { value: [index, arr[index++]], done: false }
                     : { value: undefined, done: true };
               },
            };
         },
      };
   }

   forEach(fn) {
      for (let i = 0; i < this.#size; i++) fn(this.#arr[i], i, this);
   }

   map(fn) {
      const result = new DynamicArray(this.#size);
      for (let i = 0; i < this.#size; i++)
         result.pushBack(fn(this.#arr[i], i, this));
      return result;
   }

   filter(fn) {
      const result = new DynamicArray();
      for (let i = 0; i < this.#size; i++)
         if (fn(this.#arr[i], i, this)) result.pushBack(this.#arr[i]);
      return result;
   }

   reduce(fn, init) {
      let acc = init;
      let start = 0;
      if (init === undefined) {
         if (this.empty())
            throw new TypeError("Reduce of empty array with no initial value");
         acc = this.#arr[0];
         start = 1;
      }
      for (let i = start; i < this.#size; i++)
         acc = fn(acc, this.#arr[i], i, this);
      return acc;
   }

   some(fn) {
      for (let i = 0; i < this.#size; i++)
         if (fn(this.#arr[i], i, this)) return true;
      return false;
   }

   every(fn) {
      for (let i = 0; i < this.#size; i++)
         if (!fn(this.#arr[i], i, this)) return false;
      return true;
   }

   find(fn) {
      for (let i = 0; i < this.#size; i++)
         if (fn(this.#arr[i], i, this)) return this.#arr[i];
      return undefined;
   }

   findIndex(fn) {
      for (let i = 0; i < this.#size; i++)
         if (fn(this.#arr[i], i, this)) return i;
      return -1;
   }

   includes(value) {
      this.#checkUint32(value);
      for (let i = 0; i < this.#size; i++)
         if (this.#arr[i] === value) return true;
      return false;
   }

   // Private helpers
   #resizeBuffer(newCapacity) {
      const tmp = new Uint32Array(newCapacity);
      for (let i = 0; i < this.#size; i++) tmp[i] = this.#arr[i];
      this.#arr = tmp;
      this.#capacity = newCapacity;
   }

   #checkUint32(value) {
      if (!Number.isInteger(value) || value < 0 || value > 0xffffffff)
         throw new TypeError("Only Uint32 allowed");
   }
}
