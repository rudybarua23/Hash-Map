# Hash Map 

A learning-focused implementation of a **hash map** in plain JS using **separate chaining** for collisions and **dynamic resizing** when the load factor is exceeded. Includes a minimal browser page and built-in console tests.

## ✨ Features
- **Hashing:** polynomial rolling hash with prime **31** → `Math.abs(hash % bucketsLength)` (keeps index in range).
- **Buckets:** array of arrays (each bucket holds `{ key, value }` pairs).
- **Dynamic resize:** doubles capacity when `count / buckets.length > loadFactor` and **rehashes** entries.
- **Default config:** `initialSize = 16`, `loadFactor = 0.75`.
- **String keys** (per assignment).

## 📦 Project Structure
```text
.
├─ index.html        # Loads hashmap.js and prints demo results to the console
└─ hashmap.js        # hash(key, bucketsLen) + HashMap class + example tests

```

## 🧩 How It Works 

Hashing: iterates each character of the key, multiplying by 31 and adding charCodeAt, then takes abs(mod) to select a bucket index.

Collisions: handled via separate chaining—each bucket is an array you linearly scan for the key.

Resizing: when count / buckets.length exceeds loadFactor, capacity doubles and entries are reinserted via set (so they land in the right buckets).

