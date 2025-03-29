const memoization = (fn) => {   
    const cache = {};   

    const serialize = (value) => {
       if(typeof value === 'object') {
           const sortedKeys = Object.keys(value).sort();
           return sortedKeys.map(key => `${key}:${serialize(value[key])}`).join(',');
       }

       return JSON.stringify(value);
    }; 

    return function(...args) {
        const strArgs = serialize(args);
        if (!cache[strArgs]) {
            cache[strArgs] = fn(...args);
        }
        return cache[strArgs];
    };
}