import assert from "assert";
import { DynamicArray } from "./DynamicArr.js";

let da = new DynamicArray(2);
// Check initial size is zero
assert.equal(da.size(), 0);
// Check initial capacity is 2
assert.equal(da.capacity(), 2);
// Check array is empty
assert.equal(da.empty(), true);

// pushing elements into the array
da.pushBack(10);
da.pushBack(20);
// Verify current elements
assert.deepEqual([...da], [10, 20]);
assert.equal(da.size(), 2);
// Verify array is not empty
assert.equal(da.empty(), false);

// Push beyond initial capacity to trigger resize
da.pushBack(30);
assert.deepEqual([...da], [10, 20, 30]);
// Verify that capacity has increased
assert.ok(da.capacity() >= 3);

// Element access methods
assert.equal(da.at(0), 10); // access first element
assert.equal(da.front(), 10); // front element
assert.equal(da.back(), 30); // back element

// Modifying elements
da.set(1, 99); // set value at index 1
assert.equal(da.at(1), 99);

// Insert and erase
da.insert(1, 50); // insert 50 at index 1, array becomes [10,50,99,30]
assert.deepEqual([...da], [10, 50, 99, 30]);

da.erase(2); // remove element at index 2, array becomes [10,50,30]
assert.deepEqual([...da], [10, 50, 30]);

// Resizing and clearing the array
da.resize(5, 7); // resize to 5 elements, new elements filled with 7
assert.deepEqual([...da], [10, 50, 30, 7, 7]);

da.clear(); // remove all elements
assert.equal(da.size(), 0);
assert.deepEqual([...da], []);

// Swap method
da = DynamicArray.from([1, 2, 3]); // create new array from iterable
da.swap(0, 2); // swap first and last element
assert.deepEqual([...da], [3, 2, 1]);

// Iterators
let values = [];
for (const val of da) values.push(val); // iterate with for..of
assert.deepEqual(values, [3, 2, 1]);

values = [];
da.forEach((v) => values.push(v)); // iterate with forEach
assert.deepEqual(values, [3, 2, 1]);

// Higher-order methods
const mapped = da.map((x) => x * 2); // create new array with doubled values
assert.deepEqual([...mapped], [6, 4, 2]);

const filtered = da.filter((x) => x > 2); // filter elements greater than 2
assert.deepEqual([...filtered], [3]);

// Reduce
const sum = da.reduce((acc, x) => acc + x, 0); // sum all elements
assert.equal(sum, 6);

// Some and every methods
assert.equal(
   da.some((x) => x === 2),
   true
); // check if any element equals 2
assert.equal(
   da.every((x) => x > 0),
   true
); // check if all elements are positive

// Find and findIndex
assert.equal(
   da.find((x) => x > 2),
   3
); // find first element greater than 2
assert.equal(
   da.findIndex((x) => x === 2),
   1
); // find index of element equal to 2

// Includes method
assert.equal(da.includes(2), true); // check if array contains 2
assert.equal(da.includes(99), false); // check if array contains 99

// Reserve and shrinkToFit
da.reserve(10); // increase capacity to at least 10
assert.ok(da.capacity() >= 10);

da.shrinkToFit(); // shrink capacity to current size
assert.equal(da.capacity(), da.size());
