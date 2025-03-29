class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key){
        if(!this.cache.has(key)) return undefined;
        const value = this.cache.get(key);

        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value){
        if(this.cache.has(key)){
            this.cache.delete(key);
        } else if(this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);

    }

};

const lru = new LRUCache(2);
lru.put(1, "A");
lru.put(2, "B");
lru.put(3, "C");
console.log(lru.get(1));
lru.put(4, "D"); // ❌ Removes 2 (LRU)
console.log(lru.get(2)); // ❌ undefined (removed)
console.log(lru.get(3)); // ✅ C