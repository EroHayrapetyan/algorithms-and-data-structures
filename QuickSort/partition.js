// lomutoPartition: partitions array using Lomuto scheme and returns pivot final index
function lomutoPartition(arr, low, high, pivotIndex) {
   const pivot = arr[pivotIndex];
   [arr[pivotIndex], arr[high]] = [arr[high], arr[pivotIndex]];
   let i = low;
   for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
         [arr[i], arr[j]] = [arr[j], arr[i]];
         i++;
      }
   }
   [arr[i], arr[high]] = [arr[high], arr[i]];
   return i;
}

// hoarePartition: partitions array using Hoare scheme and returns partition index
function hoarePartition(arr, low, high, pivotIndex) {
   const pivot = arr[pivotIndex];
   let i = low - 1;
   let j = high + 1;
   while (true) {
      do i++;
      while (arr[i] < pivot);
      do j--;
      while (arr[j] > pivot);
      if (i >= j) return j;
      [arr[i], arr[j]] = [arr[j], arr[i]];
   }
}

module.exports = { lomutoPartition, hoarePartition };
