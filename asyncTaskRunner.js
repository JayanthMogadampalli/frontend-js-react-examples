const createAsyncTask = () => {
    const randomVal  = Math.floor(Math.random()* 10);   
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Async task has been completed' + randomVal);
        }, 1000);
    });
};

const tasks = Array.from({length: 10}, createAsyncTask);

const taskRunner = async (tasks, cb) => {
    const results = [];
    const err = [];

    for (const task of tasks) {
        try {
            const result = await task();
            results.push(result);
        } catch (e) {
            err.push(e);
        });
    }

    cb(results, err);
}

taskRunner(tasks, (results, err) => {
    console.log('Results:', results);
    console.log('Errors:', err);
}



const pipe = (...fns) => {
    return function(initialVal) {
        return fns.reduce((acc, fn) => fn(acc), initialVal);
    };
};

const compose = (...fns) => {
    return function(initialVal) {
        return fns.reduceRight((acc, fn)=> fn(acc), initialVal);
    };
};