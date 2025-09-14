# Sorting

This folder contains implementations of common sorting algorithms in JavaScript. Below are their time and space complexities:

| Algorithm      | Best Time | Average Time | Worst Time | Space Complexity |
| -------------- | --------- | ------------ | ---------- | ---------------- |
| Bubble Sort    | O(n)      | O(n²)        | O(n²)      | O(1)             |
| Selection Sort | O(n²)     | O(n²)        | O(n²)      | O(1)             |
| Insertion Sort | O(n)      | O(n²)        | O(n²)      | O(1)             |
| Counting Sort  | O(n + k)  | O(n + k)     | O(n + k)   | O(n + k)         |

-  n = number of elements in the array
-  k = range of input (max - min + 1) for Counting Sort

# Usage

Each algorithm can sort in ascending or descending order by passing "asc" or "desc" as the second argument.

Example:

let arr = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(arr, "asc"));
console.log(selectionSort(arr, "desc"));
