# DynamicArray

Small DynamicArray implementation using a Uint32Array backing buffer. Provides common array-like methods (pushBack, popBack, insert, erase, resize, map, filter, reduce, iterators, etc.) and uses capacity growth to minimize reallocations.

## Files

-  `DynamicArr.js` - ES module exporting `DynamicArray` class.
-  `DynamicArray.test.js` - Simple test script using Node's `assert` library. Run with Node to verify behavior.

## Notes

-  The array stores only unsigned 32-bit integers and will throw for non-integer or out-of-range values.
-  This is a learning-oriented implementation; adapt types and error handling as needed for production use.
