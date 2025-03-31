function mapAsyncLimit(array, size, asyncFn) {
    return new Promise((resolve, reject) => {
      const results = new Array(array.length);
      let activeCount = 0;
      let nextIndex = 0;
      let resolvedCount = 0;
  
      function startNext() {
        // If all tasks are processed and resolved, complete the promise
        if (resolvedCount === array.length) {
          resolve(results);
          return;
        }
  
        // If active tasks exceed or equal the size, wait for one to complete
        if (activeCount >= size || nextIndex >= array.length) return;
  
        const index = nextIndex++; // Get the current index and increment
        activeCount++; // Increment the active count
  
        // Execute the async function
        asyncFn(array[index])
          .then((result) => {
            results[index] = result;
            resolvedCount++; // Mark as resolved
          })
          .catch((error) => {
            reject(error); // Reject the entire promise on error
          })
          .finally(() => {
            activeCount--; // Decrement active count after task completion
            startNext(); // Start the next task immediately
          });
      }
  
      // Kickstart the first batch of tasks
      for (let i = 0; i <  Math.min(size, array.length); i++) {
        startNext(); 
      }
    });
  }
  