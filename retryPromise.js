async function retryPromise(fn, retries = 3, delay = 1000) {
       try {
        return fn();
       }
        catch (err) {
            if (retries === 0) {
            throw new Error(`Failed after ${retries} attempts: ${error}`);
            }
            console.log(`Retrying... Attempts left: ${retries}`);
            await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
            return retryPromise(fn, retries - 1, delay); // Retry recursively             
         }
}

const unstableOperation = () => {
    return new Promise((resolve, reject) => {
       const success = Math.random() > 0.5;
       setTimeout(() => {
              if (success) {
                resolve('success');
              } else {
                reject('error');
              }
         }, 1000);
    });
}

retryPromise(unstableOperation, 5, 1000)
.then((res) => console.log(res))
.catch((err) => console.error(err.message));