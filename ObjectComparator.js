function objectComparator(obj1, obj2, keys =null) {
    const keysToCompare = keys || [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];

    for (const key of keysToCompare) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}