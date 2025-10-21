# Hash Map 

A learning-focused implementation of a **hash map** using **separate chaining** (arrays as buckets) and **dynamic resizing**. Includes a simple browser test page and console-based examples.

## ✨ Features
- String-key hash function (polynomial rolling with prime **31**) and modulo bucket index. :contentReference[oaicite:0]{index=0}
- Separate chaining (each bucket is an array of `{key, value}` pairs). :contentReference[oaicite:1]{index=1}
- Auto-resize when `count / buckets.length > loadFactor` (defaults: `initialSize=16`, `loadFactor=0.75`). :contentReference[oaicite:2]{index=2}
- Full basic API: `set`, `get`, `has`, `remove`, `length`, `clear`, `keys`, `values`, `entries`. :contentReference[oaicite:3]{index=3}
- Example tests included at the bottom of the file (run in browser console or Node). :contentReference[oaicite:4]{index=4}

## 📦 Project Structure
```text
.
├─ index.html        # Minimal page that loads hashmap.js and runs console tests
└─ hashmap.js        # Hash function, HashMap class, and example usage/tests
```

## How it works (quick overview)

Hashing: computes an integer by iterating characters of the key, multiplying by 31 each step, then takes abs(hash % bucketsLength) to pick a bucket. 

Collision handling: each bucket stores an array of entries; lookups linearly scan within that bucket. 

Resizing: when the load factor threshold is exceeded, the table doubles in size and re-inserts all entries (rehash).
