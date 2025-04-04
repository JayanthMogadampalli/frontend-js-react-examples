function batchPromises(promiseFns, limit) {
    return new Promise((resolve, reject) => {
        const results = [];
        let nextIndex = 0;
        let resolvedCount = 0;

        async function runTask(index) {
            try {
                const result = await promiseFns[index]();
                results[index] = result;
                resolvedCount++;
                if (resolvedCount === promiseFns.length) {
                    resolve(results);
                    return;
                } 

                if (nextIndex < promiseFns.length) {
                    runTask(nextIndex++);
                  }
            } catch (error) {
                reject(error);
            }
        }

        const initialTasksCount = Math.min(limit, promiseFns.length);
        // Start the initial batch of tasks
        for (let i = 0; i < initialTasksCount && i < promiseFns.length; i++) {
            runTask(i);
        }
    });

}