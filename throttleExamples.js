function throttle(callback, delay) {
    let lastCall = 0;

    return function(...args){
        const now = (new Date()).getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return callback(...args);
    }

}


function throttleAsyncFn(callback, delay) {
    let lastCall = 0;
    let isWaiting = false;

    return async function(...args){
        const now = (new Date()).getTime();
        if (now - lastCall < delay || isWaiting) {
            return;
        }
        lastCall = now;
        isWaiting = true;

        try {
            return await callback(...args);
        }
        finally {
            isWaiting = false;
        }
    }
}

function throttleAsyncQueue(callback, delay) {
    let lastCall = 0;
    let isWaiting = false;
    const queue = [];

    async function processQueue() {
        if (isWaiting || queue.length === 0) {
            return;
        }
        isWaiting = true;

        while (queue.length > 0) {
            const { args, resolve } = queue.shift();
            try {
                resolve(await callback(...args));
            }
            catch (error) {
                console.error(error);
            }
        }

        isWaiting = false;
    }

    return function(...args){
        const now = (new Date()).getTime();
        if (now - lastCall < delay) {
            return new Promise((resolve) => {
                queue.push({ args, resolve });
                processQueue();
            });
        }
        lastCall = now;
        return callback(...args);
    }
}