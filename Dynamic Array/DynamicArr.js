class DArray {
   #size = 0;
   #capacity = 0;
   #arr = null;
   #CAP_EXPONENT = 2;

   constructor(cap) {
      if (cap <= 0) throw new Error("Capacity must be > 0");
      this.#capacity = cap;
      this.#arr = new Uint32Array(cap);
   }

   resize(newCap) {
      const tmp = new Uint32Array(newCap);
      for (let i = 0; i < this.#size; i++) {
         tmp[i] = this.#arr[i];
      }
      this.#arr = tmp;
      this.#capacity = newCap;
   }

   push_back(elem) {
      if (this.#size === this.#capacity) {
         const newCap = Math.max(1, this.#capacity * this.#CAP_EXPONENT);
         this.resize(newCap);
      }
      this.#arr[this.#size++] = elem;
   }

   get(index) {
      if (index < 0 || index >= this.#size)
         throw new Error("Index out of range");
      return this.#arr[index];
   }

   length() {
      return this.#size;
   }

   [Symbol.iterator]() {
      let index = 0;
      const data = this.#arr;
      const size = this.#size;
      return {
         next() {
            if (index < size) {
               return { value: data[index++], done: false };
            }
            return { done: true };
         },
      };
   }
}

const arr = new DArray(2);
arr.push_back(4);
arr.push_back(10);
arr.push_back(3);
arr.push_back(20);

console.log(...arr); // 4 10 3 20
console.log(arr.length()); // 4
console.log(arr.get(2)); // 3
