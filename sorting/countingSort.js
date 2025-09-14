function countingSort(arr, type = "asc") {
   if (arr.length === 0) return arr;

   //   Find min and max
   const min = Math.min(...arr);
   const max = Math.max(...arr);

   // Initialize count array
   const range = max - min + 1;
   const count = new Array(range).fill(0);

   // Count occurrences
   for (let num of arr) {
      count[num - min]++;
   }

   // Cumulative count (prefix sum)
   for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
   }

   // Build output array
   const output = new Array(arr.length);
   for (let i = arr.length - 1; i >= 0; i--) {
      const num = arr[i];
      const index = count[num - min] - 1;
      output[index] = num;
      count[num - min]--;
   }

   // Return sorted array based on type
   return type.toLowerCase() === "desc" ? output.reverse() : output;
}

// Example usage:
let arr = [4, 2, 2, 8, 3, 3, 1];

console.log(countingSort(arr, "asc"));
console.log(countingSort(arr, "desc"));
