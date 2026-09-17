# How to iterate objects in JS

```js
const user = { name: "Ashish", age: 30, city: "Noida" }
```

| Method | What you get | Notes |
|--------|--------------|--------|
| `for...in` | keys | includes inherited — use `hasOwnProperty` or `Object.hasOwn` |
| `Object.keys(obj)` | `["name", "age", "city"]` | own keys only |
| `Object.values(obj)` | `["Ashish", 30, "Noida"]` | own values only |
| `Object.entries(obj)` | `[["name","Ashish"], ...]` | key + value pairs — good for `map` |

```js
// for...in (own keys)
for (const key in user) {
  if (Object.hasOwn(user, key)) console.log(key, user[key])
}

// keys / values / entries
Object.keys(user).forEach((k) => console.log(k, user[k]))
Object.values(user).forEach((v) => console.log(v))
Object.entries(user).forEach(([k, v]) => console.log(k, v))
```

**Interview:** `Object.entries` for transform; `for...in` only with own-property check; arrays use `for...of` / `.map` — not `for...in`.


# set

```js
const ids = new Set([1, 2, 3, 2])
```

| Method | What you get |
|--------|--------------|
| `for...of` | each value (`1, 2, 3`) — **preferred** |
| `.forEach(v => ...)` | each value |
| `[...set]` / `Array.from(set)` | array copy |
| `.values()` / `.keys()` | iterator of values (same for Set) |
| `.entries()` | `[value, value]` pairs |

```js
for (const id of ids) console.log(id)

ids.forEach((v) => console.log(v))

const arr = [...ids] // [1, 2, 3]
```

**Note:** Set has **no keys** — only unique **values**. No index like array.  
**Interview:** dedupe → `new Set(arr)`; iterate → `for...of`.

### Set methods

| Method | Does |
|--------|------|
| `.add(x)` | add value (ignores duplicate) |
| `.has(x)` | `true` / `false` |
| `.delete(x)` | remove one value |
| `.clear()` | remove all |
| `.size` | count (property, not function) |

```js
ids.add(4)
ids.has(2)    // true
ids.delete(1)
ids.size      // 2
```

**Interview:** O(1) lookup with `.has` — use for dedupe / fast membership check.


# map

```js
const userMap = new Map([
  ["id", 1],
  ["name", "Ashish"],
])
```

| Method | What you get |
|--------|--------------|
| `for...of` | `[key, value]` pairs — **preferred** |
| `.forEach((v, k) => ...)` | value + key |
| `[...map]` / `Array.from(map)` | array of `[key, value]` pairs |
| `.keys()` | iterator of keys |
| `.values()` | iterator of values |
| `.entries()` | same as default iteration |

```js
for (const [key, value] of userMap) console.log(key, value)

userMap.forEach((v, k) => console.log(k, v))

const arr = [...userMap] // [["id", 1], ["name", "Ashish"]]
```

**Note:** Map keeps **key → value** (any type as key). Order = insertion order.  
**Interview:** use Map over plain object when keys aren't strings or you need frequent add/delete.

### Map methods

| Method | Does |
|--------|------|
| `.set(key, val)` | add / update entry |
| `.get(key)` | get value (or `undefined`) |
| `.has(key)` | `true` / `false` |
| `.delete(key)` | remove one entry |
| `.clear()` | remove all |
| `.size` | count (property, not function) |

```js
userMap.set("city", "Noida")
userMap.get("name")   // "Ashish"
userMap.has("id")     // true
userMap.delete("id")
userMap.size          // 2
```

**Interview:** O(1) `.get` / `.has` — cache, memo, keyed lookups; vs Object for JSON-like string keys.


# array

```js
const nums = [10, 20, 30]
```

| Method | What you get |
|--------|--------------|
| `for...of` | each value — **preferred** |
| `.forEach((v, i) => ...)` | value + index |
| classic `for (let i = 0; ...)` | index access when you need `break` / `continue` |
| `.map` / `.filter` / `.reduce` | transform / filter / accumulate (returns new value) |
| `for...in` | **avoid** — gives index as string + prototype keys |

```js
for (const n of nums) console.log(n)

nums.forEach((n, i) => console.log(i, n))

nums.map((n) => n * 2) // [20, 40, 60]
```

**Note:** Arrays are iterable + have index. Use `for...of` or array methods — not `for...in`.  
**Interview:** mutate → `forEach`; new array → `map` / `filter`; single result → `reduce`.


# string

```js
const s = "hi"
```

| Method | What you get |
|--------|--------------|
| `for...of` | each character (`"h"`, `"i"`) |
| `[...str]` / `Array.from(str)` | char array |
| `.split("")` | char array (empty sep) |

```js
for (const ch of s) console.log(ch)
const chars = [...s] // ["h", "i"]
```

**Note:** Strings are iterable but **immutable** — no `.push`.  
**Interview:** count chars / build array → `for...of` or spread.


# weakmap & weakset (brief)

**WeakMap** — keys must be **objects** only; no iteration, no `.size`; GC can collect entries when key object is gone.  
**Use:** private data on DOM nodes / objects, caches tied to object lifetime.

**WeakSet** — only **objects**; no iteration; weak refs.  
**Use:** track “already seen” objects without memory leak.

```js
const wm = new WeakMap()
const obj = {}
wm.set(obj, "secret")
wm.get(obj) // "secret"
// no wm.forEach, no [...wm]
```

**Interview:** normal Map/Set = iterable + size; Weak* = no iterate, weak refs for GC.


# quick pick (interview)

| Data | Iterate | Lookup / add |
|------|---------|--------------|
| Object | `Object.entries` | `obj[key]` |
| Array | `for...of`, `.map` | `arr[i]` |
| Set | `for...of` | `.has` / `.add` |
| Map | `for...of` `[k,v]` | `.get` / `.set` |
| String | `for...of` | — |
