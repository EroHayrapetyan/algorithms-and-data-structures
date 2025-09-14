function selectionSort(arr, type) {
   for (let i = 0; i < arr.length - 1; i++) {
      let index = i; // index of min/max element
      for (let j = i + 1; j < arr.length; j++) {
         // Find the minimum/maximum element in unsorted array
         if (
            (type === "asc" && arr[j] < arr[index]) ||
            (type === "desc" && arr[j] > arr[index])
         ) {
            index = j; //update index if a new min/max is found
         }
      }
      // Swap the found minimum/maximum element with the first element
      if (index !== i) {
         [arr[i], arr[index]] = [arr[index], arr[i]];
      }
   }
   return arr;
}

// Example usage: to order in ascending or descending order use "asc" or "desc" by passing as second argument
let arr = [64, 34, 25, 12, 22, 11, 90];
console.log(selectionSort(arr, "asc"));
console.log(selectionSort(arr, "desc"));
