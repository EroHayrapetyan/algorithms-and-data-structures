function partitionRandom(arr, left, right) {
   const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
   const pivot = arr[pivotIndex];
   [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
   let store = left;
   for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
         [arr[i], arr[store]] = [arr[store], arr[i]];
         store++;
      }
   }
   [arr[store], arr[right]] = [arr[right], arr[store]];
   return store;
}

function quickSortRandom(arr, left = 0, right = arr.length - 1) {
   if (left >= right) return arr;
   const pivotIndex = partitionRandom(arr, left, right);
   quickSortRandom(arr, left, pivotIndex - 1);
   quickSortRandom(arr, pivotIndex + 1, right);
   return arr;
}

console.log(quickSortRandom([34, 7, 23, 32, 5, 62]));
