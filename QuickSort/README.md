# Quicksort & Singly Linked List (JavaScript)

## Quicksort

### Pivot Strategies

-  **First** – pivot = first element
-  **Last** – pivot = last element
-  **Random** – pivot = random element
-  **Median-of-Three** – pivot = median(first, middle, last)

### Partition Schemes

-  **Lomuto** – pivot at end, simple
-  **Hoare** – two pointers, fewer swaps

### Complexity

Time Complexity O(n log n)

space Complexity O(log n)

## Testing

Empty array → []
Single element → [5]
Reverse sorted → sorted correctly
Many duplicates → sorted correctly
