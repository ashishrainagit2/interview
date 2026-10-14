class HashMap {
  constructor(capacity = 10) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.size = 0;
  }

  hash(key) {
    let total = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      total += str.charCodeAt(i) * (i + 1); // position matters: "ab" ≠ "ba"
    }
    return total % this.capacity;
  }

  getBucket(key) {
    return this.buckets[this.hash(key)];
  }

  findEntry(bucket, key) {
    for (const entry of bucket) {
      if (entry.key === key) return entry;
    }
    return null;
  }

  set(key, value) {
    const bucket = this.getBucket(key);
    const existing = this.findEntry(bucket, key);

    if (existing) {
      existing.value = value;
      return;
    }

    bucket.push({ key, value });
    this.size++;
  }

  get(key) {
    const entry = this.findEntry(this.getBucket(key), key);
    return entry ? entry.value : undefined;
  }

  has(key) {
    return this.findEntry(this.getBucket(key), key) !== null;
  }

  delete(key) {
    const bucket = this.getBucket(key);

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  isEmpty() {
    return this.size === 0;
  }

  print() {
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i].length) continue;
      const pairs = this.buckets[i].map((e) => `${e.key}: ${e.value}`);
      console.log(i, pairs.join(", "));
    }
  }

  printSimple() {
    console.log(JSON.stringify(this.buckets));
  }
}

const map = new HashMap();
map.set("name", "John");
map.set("age", 30);


// map.delete("age");
// map.print();

map.set("name", "Ada");
map.set("mane", "diana");
map.print();

// Create a hash map with a custom hash function with following methods:
// 1. hash(key) - should return a number between 0 and capacity - 1
// 2. getBucket(key) - should return the bucket for the given key
// 3. findEntry(bucket, key) - should return the entry for the given key in the given bucket
// 4. set(key, value) - should set the value for the given key
// 5. get(key) - should return the value for the given key
// 6. has(key) - should return true if the key exists in the map
// 7. delete(key) - should delete the key from the map
// 8. isEmpty() - should return true if the map is empty
// 9. print() - should print the map in the following format:
