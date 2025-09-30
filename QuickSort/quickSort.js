const { lomutoPartition, hoarePartition } = require("./partition");

// choosePivot: selects pivot index based on strategy
function choosePivot(arr, low, high, strategy) {
   switch (strategy) {
      case "first":
         return low;
      case "last":
         return high;
      case "random":
         return low + Math.floor(Math.random() * (high - low + 1));
      case "median3": {
         const mid = Math.floor((low + high) / 2);
         const a = arr[low],
            b = arr[mid],
            c = arr[high];
         if ((a > b) ^ (a > c)) return low;
         if ((b < a) ^ (b < c)) return mid;
         return high;
      }
      default:
         return high;
   }
}

// quicksort: returns a sorted copy of the array using chosen partition scheme
function quicksort(arr, options = { pivot: "last", scheme: "lomuto" }) {
   const result = arr.slice();
   const partitionFunc =
      options.scheme === "hoare" ? hoarePartition : lomutoPartition;

   function qs(low, high) {
      if (low >= high) return;
      const pivotIndex = choosePivot(result, low, high, options.pivot);
      const p = partitionFunc(result, low, high, pivotIndex);
      if (options.scheme === "hoare") {
         qs(low, p);
         qs(p + 1, high);
      } else {
         qs(low, p - 1);
         qs(p + 1, high);
      }
   }

   qs(0, result.length - 1);
   return result;
}

// qsFirst: quicksort wrapper using first-element pivot
function qsFirst(arr) {
   return quicksort(arr, { pivot: "first", scheme: "lomuto" });
}
// qsLast: quicksort wrapper using last-element pivot
function qsLast(arr) {
   return quicksort(arr, { pivot: "last", scheme: "lomuto" });
}
// qsRandom: quicksort wrapper using random pivot
function qsRandom(arr) {
   return quicksort(arr, { pivot: "random", scheme: "lomuto" });
}
// qsMedian3: quicksort wrapper using median-of-three pivot
function qsMedian3(arr) {
   return quicksort(arr, { pivot: "median3", scheme: "lomuto" });
}

module.exports = { quicksort, qsFirst, qsLast, qsRandom, qsMedian3 };
