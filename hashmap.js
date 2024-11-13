function hash(key, bucketsLength) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return Math.abs(hashCode % bucketsLength); // Ensure non-negative index
} 

class HashMap {
    constructor(initialSize = 16, loadFactor = 0.75) {
        this.buckets = new Array(initialSize).fill(null).map(() => []);
        this.count = 0;
        this.loadFactor = loadFactor;
    }

    set(key, value) {
        const index = hash(key,this.buckets.length);
        let found = false;
        for (let entry of this.buckets[index]) {
            if (entry.key === key) { // Key exists; update the value
                entry.value = value;
                found = true;
                break;
            }
        }

        if (!found) {
        this.buckets[index].push({ key, value }); // Key doesn’t exist; add a new entry
        this.count++; // Only increase count if it’s a new key
        }
        if (this.count / this.buckets.length > this.loadFactor) {
            this.resize();
        }
        

    }

    get(key) {
        const index = hash(key, this.buckets.length);
        const bucket = this.buckets[index];
        if (!bucket) return null;

        for (let pair of bucket) {
            if (pair.key === key) {
                return pair.value;
            }
        }
        return null;
    }

    has(key) {
        const index = hash(key,this.buckets.length);
        if (!this.buckets[index]) {
            return false;
        }
        for (let pair of this.buckets[index]) {
            if (pair.key === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = hash(key, this.buckets.length);
        const bucket = this.buckets[index];
        if (!bucket) return false;
        const mini_index = bucket.findIndex(pair => pair.key === key);
        if (mini_index === -1) return false; // findIndex will return -1 if the key doesn't exist
        bucket.splice(mini_index, 1); // Step 4: Remove the key-value pair from the bucket
        this.count--; // Step 5: Decrement the count
        return true; // Indicate success
    }
 
    length() {
        return this.count;
    }

    clear() {
        this.buckets = Array(this.buckets.length).fill(null).map(() => []); // Reset all buckets
        this.count = 0; // Reset the count
    }

    keys() {
        let arr = [];
        for (let node of this.buckets) {
            if(node) { // checks if the node is empty or not
                for (let entry of node) {
                    arr.push(entry.key);
                }
            }
        }
        return arr;
    }

    values() {
        let bigArr = [];
        for (let node of this.buckets) {
            if(node) { // checks if the node is empty or not
                for (let entry of node) {
                    bigArr.push(entry.value);
                }
            }
        }
        return bigArr;
    }

    entries() {
        let bigArr = [];
        for (let node of this.buckets) {
            if(node) { // checks if the node is empty or not
                for (let entry of node) {
                    bigArr.push([entry.key, entry.value]);
                }
            }
        }
        return bigArr;
    }
 
    resize() {
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.buckets.length * 2).fill(null).map(() => []);
        this.count = 0;
        for (let bucket of oldBuckets) {
            if (bucket) {
                for (let entry of bucket) {
                    this.set(entry.key,entry.value)
                }
            }
        }
    }
}

const hashMap = new HashMap();

// Test 1: Basic Set and Get
hashMap.set("apple", "red");
hashMap.set("banana", "yellow");
console.log(hashMap.get("apple")); // Output: "red"
console.log(hashMap.get("banana")); // Output: "yellow"

// Test 2: Keys, Values, and Entries
console.log(hashMap.keys()); // Output: ["apple", "banana"]
console.log(hashMap.values()); // Output: ["red", "yellow"]
console.log(hashMap.entries()); // Output: [["apple", "red"], ["banana", "yellow"]]

// Test 3: Update Existing Key
hashMap.set("apple", "green");
console.log(hashMap.get("apple")); // Output: "green"

// Test 4: Remove Key
hashMap.remove("banana");
console.log(hashMap.get("banana")); // Output: null
console.log(hashMap.keys()); // Output: ["apple"]

// Test 5: Check Key Existence
console.log(hashMap.has("apple")); // Output: true
console.log(hashMap.has("banana")); // Output: false

// Test 6: Resizing
for (let i = 0; i < 50; i++) {
    hashMap.set(`key${i}`, `value${i}`);
}
console.log(hashMap.keys().length); // Output: 51 (50 new keys + "apple")
console.log(hashMap.get("key25")); // Output: "value25"

// Test 7: Clear Hash Map
hashMap.clear();
console.log(hashMap.keys()); // Output: []
console.log(hashMap.length()); // Output: 0

// Test 8: Collisions
hashMap.set("a", 1); // Assume these collide with "b"
hashMap.set("b", 2);
console.log(hashMap.get("a")); // Output: 1
console.log(hashMap.get("b")); // Output: 2