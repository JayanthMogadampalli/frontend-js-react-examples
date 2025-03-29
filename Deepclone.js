function deepClone(obj) {
    if(obj === null || typeof obj !== 'object') {
        return obj;
    }
    if(Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    return Object.entries(val).map(([key, value]) => ([key, deepClone(value)]));

}