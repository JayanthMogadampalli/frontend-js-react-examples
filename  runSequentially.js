function runSequentially(promises) {
    return promises.reduce((acc, curr) => {
        return acc.then((results) => {
            curr().then((res) => [...results, res]);
        })
    }, Promise.resolve([]));
}

function flattenArray(arr) {
    return arr.reduce((acc, curr) => {
        if(Array.isArray(curr)) {
            acc.concat(flattenArray(curr));
        }else {
            acc.concat(curr);
        }
    }, []);
}

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map((item) => deepClone(item));
    }
    
    const clone = {};
    for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
   }

   return clone;

}