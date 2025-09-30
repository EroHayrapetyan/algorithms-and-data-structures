function medianOfThree(arr, left, right) {
   const mid = Math.floor((left + right) / 2);
   const a = arr[left],
      b = arr[mid],
      c = arr[right];
   if ((a > b) ^ (a > c)) return left;
   if ((b < a) ^ (b < c)) return mid;
   return right;
}

function partition(arr, left, right, pivotIndex) {
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

function quickSortMedian(arr, left = 0, right = arr.length - 1) {
   if (left >= right) return arr;
   const pivotIndex = medianOfThree(arr, left, right);
   const newPivot = partition(arr, left, right, pivotIndex);
   quickSortMedian(arr, left, newPivot - 1);
   quickSortMedian(arr, newPivot + 1, right);
   return arr;
}

console.log(quickSortMedian([34, 7, 23, 32, 5, 62]));
