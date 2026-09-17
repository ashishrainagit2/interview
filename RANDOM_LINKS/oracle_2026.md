# Oracle Frontend Interview Experience — Senior Frontend Engineer

> **Source:** [Medium — Frontend Army (Gourav Hammad, Aug 2026)](https://medium.com/frontend-army/oracle-frontend-interview-experience-senior-frontend-engineer-da1a4b64a0cc)  
> **Role:** Senior Frontend Engineer · **Experience cited:** 5.5 years · **Rounds:** 2 technical (90 min each)

---

## TL;DR

Oracle’s loop is **short but deep**: one **medium DSA** + heavy **JS/React fundamentals**, then **machine coding + polyfills + event loop**. Not DSA-only — they want **internals, patterns, and resume-backed project talk**.

---

## Interview overview

| | |
|---|---|
| **Company** | Oracle |
| **Role** | Senior Frontend Engineer |
| **Experience** | 5.5 years (candidate) |
| **Rounds** | 2 × 90 min technical |

### Focus areas

- Data Structures & Algorithms  
- JavaScript fundamentals (closures, hoisting, scope, event loop, promises)  
- React (hooks, lifecycle, controlled vs uncontrolled)  
- Design patterns  
- Machine coding  
- Polyfills (debounce, once, custom `map`)  
- Problem solving + **real project depth**

---

## Round 1 — DSA + technical discussion (90 min)

**Format:** Coding problem → long frontend fundamentals + resume/project deep dive.

### Coding — Longest common substring

**Problem:** Given two strings, return the **length** of the longest substring present in both.

```
Input:  str1 = "abcdef",  str2 = "zabcf"
Output: 3
Why:    "abc" is the longest common substring
```

**Approach:** 2D DP — if chars match, extend diagonal; else 0. Track max.

```js
function longestCommonSubstring(s1, s2) {
  const dp = Array.from({ length: s1.length + 1 }, () =>
    Array(s2.length + 1).fill(0)
  )

  let ans = 0
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
        ans = Math.max(ans, dp[i][j])
      }
    }
  }
  return ans
}
```

| | |
|---|---|
| **Time** | O(n × m) |
| **Space** | O(n × m) |
| **Concepts** | Matrix DP, dynamic programming |

---

### Resume / project discussion

Expect **follow-ups on every project** you list:

- Frontend architecture  
- Performance optimizations  
- State management  
- Challenges faced  
- Scalability  
- Cross-team collaboration  

---

### Memoization & lazy loading

- What is memoization?  
- When to use `useMemo`?  
- `useMemo` vs `useCallback`  
- `React.lazy` vs dynamic imports  
- Benefits of lazy loading  
- Code splitting strategies  

---

### Scenario-based (React / UX)

- How would you optimize a slow React application?  
- What if an API takes several seconds to respond?  
- How do you avoid unnecessary re-renders?  
- How would you improve loading experience for users?  

*(See your notes: `REACT/THEORY/optimize_react_app.md`, `avoid_rerenders.md`)*

---

### Design patterns

Discussed with **real frontend use cases**:

| Pattern | Typical FE use |
|---|---|
| Singleton | One config / API client instance |
| Factory | Create components or handlers by type |
| Observer | Pub/sub, event emitters, store subscribers |
| Module | Encapsulate feature code |

---

### React fundamentals

- Hooks — `useEffect`, `useMemo`, `useCallback`, custom hooks  
- Component lifecycle (conceptual in function components)  
- State updates  
- **Controlled vs uncontrolled** components  

---

### JavaScript fundamentals

- Closures  
- Hoisting  
- Scope & execution context  
- Event loop  
- Async JS — promise chaining  
- Output prediction + **explain order**, not just the answer  

---

## Round 2 — Machine coding + JS deep dive (90 min)

**Format:** Resume tech justification → live JS coding → closures → event loop → polyfills.

### Resume again

Be ready to **justify every technology** on your resume.

---

### JavaScript coding

#### 1. Custom `Array.prototype.map`

```js
Array.prototype.myMap = function (callback) {
  const result = []
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this))
  }
  return result
}
```

#### 2. Singleton pattern

```js
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance
    }
    Database.instance = this
  }
}

const db1 = new Database()
const db2 = new Database()
console.log(db1 === db2) // true
```

#### 3. Closures

- Counter  
- Private variables  
- Currying  

```js
function counter() {
  let count = 0
  return () => ++count
}
```

---

### Event loop

Output questions mixing:

- `setTimeout`  
- Promises  
- `async` / `await`  
- Microtasks vs macrotasks  

**They want execution order explained**, not just the final log.

---

### Polyfills discussed

**Debounce**

```js
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
```

**Once**

```js
function once(fn) {
  let called = false
  let result
  return function (...args) {
    if (!called) {
      called = true
      result = fn.apply(this, args)
    }
    return result
  }
}
```

---

## Outcome (at time of article)

No further update after Round 2.

---

## Prep checklist (from article)

- [ ] Medium DSA (substring / DP style)  
- [ ] JS internals — closures, hoisting, event loop, promises  
- [ ] React hooks, memo/lazy, controlled vs uncontrolled  
- [ ] Design patterns + where they apply in FE  
- [ ] Polyfills — debounce, once, `map`, throttle  
- [ ] Machine coding — small utilities in plain JS  
- [ ] **Own projects** — architecture, perf, state, challenges (STAR stories)  
- [ ] Scenario answers — slow app, slow API, re-renders, loading UX  

---

## Author’s closing line

> Balance of **DSA foundation** + **deep JS/React/design**. Knowing your projects and defending technical decisions matters as much as solving one problem.

---

*Beautified for interview prep — original write-up by Gourav Hammad / Frontend Army.*
