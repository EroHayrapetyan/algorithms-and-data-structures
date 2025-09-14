function bubbleSort(arr, type) {
   for (let i = 0; i < arr.length - 1; i++) {
      let swapped = false; //flag to check if any swapping occurred
      for (let j = 0; j < arr.length - i - 1; j++) {
         //compare adjacent elements based on type
         if (type === "asc" ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]) {
            //swap if they are in the wrong order
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swapped = true; //set flag to true if swapping occurred
         }
      }
      if (!swapped) break; //if no swapping occurred, the array is already sorted
   }
   return arr;
}

// Example usage: to order in ascending or descending order use "asc" or "desc" by passing as second argument

let arr = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(arr, "asc"));
console.log(bubbleSort(arr, "desc"));
