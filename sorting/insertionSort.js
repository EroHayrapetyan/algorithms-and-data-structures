function insertionSort(arr, type) {
   for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      // Move elements of arr[0..i-1], that are greater (or smaller) than key,
      // to one position ahead of their current position
      while (
         j >= 0 &&
         ((type === "asc" && arr[j] > key) || (type === "desc" && arr[j] < key))
      ) {
         arr[j + 1] = arr[j]; //shift element to the right
         j = j - 1; //move to the previous element
      }
      arr[j + 1] = key; //place key at its correct position
   }

   return arr;
}

// Example usage: to order in ascending or descending order use "asc" or "desc" by passing as second argument

let arr = [64, 34, 25, 12, 22, 11, 90];
console.log(insertionSort(arr, "asc"));
console.log(insertionSort(arr, "desc"));
