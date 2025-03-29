const flattenObject = (obj, prefix = '', res = {}) => {
   if( obj == null) {
     res[prefix] = obj;
    return res; 
    }

    if (typeof obj !== 'object' || Array.isArray(obj)) {
        res[prefix] = obj;
        return res;
    }

    for (const key in obj) {
        if(obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
        
            if(Array.isArray(obj[key])) {
                obj[key].forEach((item, index) => {
                    flattenObject(item, `${newKey}[${index}]`, result);
                });
            }
            else if(typeof obj[key] === 'object') {
                flattenObject(obj[key], newKey, res);
            }
            else {
                res[newKey] = obj[key];
            }
        }


    }

    return res;
}