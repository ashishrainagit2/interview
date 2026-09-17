# Difference between … (interview cheat sheet)

Today’s ask + similar “X vs Y” questions. Short, with examples.

---

## Spread (`...`) vs `Object.assign`

Both **copy enumerable own properties** into a target (shallow).

```js
const a = { x: 1, y: { z: 2 } }

const b = { ...a }                 // spread
const c = Object.assign({}, a)     // assign

a.y.z = 9
// b.y.z and c.y.z are also 9 — SHALLOW copy either way
```

| | Spread `{...obj}` | `Object.assign(target, ...sources)` |
|--|-------------------|-------------------------------------|
| Syntax | Newer, common in React | ES6, more verbose |
| Mutate? | Usually build **new** object | **Mutates** first argument |
| Arrays | `[...arr]` copies array | `Object.assign([], arr)` works but odd |
| Getters | Invokes getter, copies **value** | Same |
| Symbols / non-enumerable | Skips (own enumerable only) | Same |
| `null` / `undefined` source | Ignored in object spread | Ignored as source |

```js
// spread — always a new object expression
const next = { ...state, count: state.count + 1 }

// assign — mutates target
const target = { a: 1 }
Object.assign(target, { b: 2 }) // target is { a: 1, b: 2 }

// assign without mutating original:
Object.assign({}, state, { count: 1 })
```

**Interview one-liner:** *Same shallow merge idea; prefer spread for immutable updates. `Object.assign` mutates its first arg — pass `{}` first if you want a copy.*

---

## Similar “difference” questions

### Shallow copy vs deep copy

| Shallow | Deep |
|---------|------|
| Top level new; nested **shared** | Nested objects cloned too |
| `{...o}`, `Object.assign`, `arr.slice()` | `structuredClone`, custom recurse, `JSON.parse(JSON.stringify)` (lossy) |

---

### `==` vs `===`

| `==` | `===` |
|------|-------|
| Coerces types | No coerce — type + value |
| `0 == '0'` → true | `0 === '0'` → false |

Prefer `===`.

---

### `var` vs `let` vs `const`

| | Scope | Redeclare | Reassign | TDZ |
|--|-------|-----------|----------|-----|
| `var` | function | yes | yes | no |
| `let` | block | no | yes | yes |
| `const` | block | no | no (binding) | yes |

`const` object: binding fixed, **properties** can change.

---

### `null` vs `undefined`

| `undefined` | `null` |
|-------------|--------|
| Missing / not set | Intentional empty |
| `typeof` → `"undefined"` | `typeof` → `"object"` (bug legacy) |

---

### `map` vs `forEach`

| `map` | `forEach` |
|-------|-----------|
| Returns **new array** | Returns `undefined` |
| Transform | Side effects only |

---

### `map` vs `filter` vs `reduce`

| | Job |
|--|-----|
| `map` | 1→1 transform |
| `filter` | keep some |
| `reduce` | fold to one value (sum, object, etc.) |

---

### `slice` vs `splice`

| `slice` | `splice` |
|---------|----------|
| Copy portion; **no mutate** | Add/remove; **mutates** |
| `arr.slice(0, 2)` | `arr.splice(1, 1)` |

---

### `call` vs `apply` vs `bind`

| | Args | Returns |
|--|------|---------|
| `call` | list `fn.call(this, a, b)` | result of call |
| `apply` | array `fn.apply(this, [a,b])` | result of call |
| `bind` | list | **new function** with fixed `this` |

---

### Promise vs async/await

Same async model. `async/await` = syntax over promises (`await` pauses the async function, not the whole JS thread).

---

### `Promise.all` vs `Promise.allSettled` vs `Promise.race`

| | Behavior |
|--|----------|
| `all` | Fail fast if any rejects |
| `allSettled` | Wait all; `{status, value/reason}` each |
| `race` | First settle (win or fail) wins |

---

### Debounce vs throttle

| Debounce | Throttle |
|----------|----------|
| Wait until quiet | At most once per window |
| Search input | Scroll / resize handler |

---

### `localStorage` vs `sessionStorage`

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| Survives tab close | Cleared when tab closes |
| Same-origin shared across tabs | Per tab |

Both sync, string-only, XSS-readable.

---

### Event bubbling vs capturing

| Capturing | Bubbling |
|-----------|----------|
| Root → target | Target → root (default for most handlers) |

`addEventListener(type, fn, true)` → capture.

---

### `for...in` vs `for...of`

| `for...in` | `for...of` |
|------------|------------|
| Keys (objects; avoid on arrays) | Values (iterables: arrays, Map, Set, string) |

---

### Map vs Object

| Object | Map |
|--------|-----|
| String/symbol keys | Any key type |
| Prototypes | Pure key→value |
| JSON friendly | Better frequent add/delete |

---

### Set vs Array

| Array | Set |
|-------|-----|
| Ordered, duplicates OK | Unique values |
| Index access | `.has` O(1) membership |

---

### Spread vs rest

| Spread | Rest |
|--------|------|
| Expand into place | Collect into array/object |
| `fn(...arr)` / `{...o}` | `function(...args)` / `const {a, ...rest} = o` |

Same `...` token, opposite job.

---

### Shallow compare vs deep compare (React.memo)

`memo` = shallow (`===` per prop). Nested object new reference → re-render. Fix: `useMemo` / `useCallback`.

---

### Controlled vs uncontrolled (React)

| Controlled | Uncontrolled |
|------------|--------------|
| `value` + `onChange` | `defaultValue` + `ref` |
| React is source of truth | DOM is |

---

### `useEffect` vs `useLayoutEffect`

| `useEffect` | `useLayoutEffect` |
|-------------|-------------------|
| After paint | After DOM mutate, **before** paint |
| Fetch, subscriptions | Measure DOM / avoid flicker |

---

### `useMemo` vs `useCallback`

| `useMemo` | `useCallback` |
|-----------|---------------|
| Cache **value** | Cache **function** |
| `useMemo(() => fn, deps)` ≈ callback | `useCallback(fn, deps)` |

---

### `useTransition` vs `useDeferredValue`

| `useTransition` | `useDeferredValue` |
|-----------------|---------------------|
| Mark **update** non-urgent | Lag a **value** |
| You call `setState` | Value is prop / already set |

---

### Context vs Redux / RTK

| Context | Redux / RTK |
|---------|-------------|
| Avoid prop drilling; rare changes | Complex shared + middleware / DevTools |
| Bad for high-frequency updates | Selectors; still coalesce hot paths |

---

### CSR vs SSR vs SSG vs ISR

| | When HTML is made |
|--|-------------------|
| CSR | In browser |
| SSR | Each request on server |
| SSG | At build time |
| ISR | Static + revalidate later |

---

### Axios vs `fetch`

| `fetch` | Axios |
|---------|-------|
| Native; no throw on 404 | Throws on non-2xx (default) |
| Manual JSON | Auto transform |
| No progress/interceptors built-in | Interceptors, timeout helpers |

---

### `Object.keys` vs `for...in`

| `Object.keys` | `for...in` |
|---------------|------------|
| Own enumerable keys | Own + inherited |
| Array of keys | Need `hasOwn` filter |

---

### `JSON.stringify` clone vs `structuredClone`

| JSON round-trip | `structuredClone` |
|-----------------|-------------------|
| Loses functions, `undefined`, Date→string, Map/Set | Handles Date, Map, Set, cyclic (with care) |
| Easy | Prefer modern deep clone |

---

## Objects — more “X vs Y” (related)

### Spread / assign vs `Object.create`

| `{...o}` / `Object.assign({}, o)` | `Object.create(proto)` |
|-----------------------------------|-------------------------|
| Copy **own enumerable** props onto a normal object | New object with **prototype** = `proto` |
| Flat clone of data | Inheritance / null-prototype (`Object.create(null)`) |

```js
const proto = { hi() { return 'hi' } }
const a = { ...proto }           // copies hi as own if enumerable
const b = Object.create(proto)   // hi lives on prototype chain
```

---

### `Object.keys` vs `Object.values` vs `Object.entries`

| | Returns |
|--|---------|
| `keys` | `['a','b']` |
| `values` | `[1,2]` |
| `entries` | `[['a',1],['b',2]]` — best for `map` / rebuild |

Own **enumerable** string keys only (not Symbols).

---

### `Object.keys` vs `Object.getOwnPropertyNames` vs `Reflect.ownKeys`

| | Includes |
|--|----------|
| `Object.keys` | Own **enumerable** string keys |
| `getOwnPropertyNames` | Own string keys — enumerable **+ non-enumerable** |
| `Reflect.ownKeys` | Own strings **+ Symbols** (all) |

---

### `hasOwnProperty` vs `in` vs `Object.hasOwn`

```js
const proto = { inherited: true }
const o = Object.create(proto)
o.own = 1
```

| Check | `own` | `inherited` |
|-------|-------|-------------|
| `'own' in o` | yes | **yes** (prototype too) |
| `o.hasOwnProperty('own')` | yes | no |
| `Object.hasOwn(o, 'own')` | yes | no — **prefer** (safe if no prototype) |

---

### Dot vs bracket access

| `obj.name` | `obj['name']` |
|------------|---------------|
| Fixed identifier | Dynamic key, spaces, reserved words |
| | `obj[key]` when key is variable |

---

### Mutable update vs immutable update

```js
// mutate
state.count++
Object.assign(state, { count: 1 })

// immutable (React/Redux style)
{ ...state, count: state.count + 1 }
```

Mutate = same reference; immutable = new reference → React sees change.

---

### `Object.freeze` vs `Object.seal` vs `Object.preventExtensions`

| | Add props | Delete | Change values |
|--|-----------|--------|---------------|
| `preventExtensions` | no | yes | yes |
| `seal` | no | no | yes |
| `freeze` | no | no | **no** |

All **shallow** — nested objects still mutable unless frozen too.

---

### Enumerable vs non-enumerable

```js
Object.defineProperty(o, 'hidden', { value: 1, enumerable: false })
Object.keys(o)        // skips hidden
JSON.stringify(o)     // skips hidden
'hidden' in o         // true
Object.getOwnPropertyNames(o) // includes hidden
```

---

### Own vs inherited properties

| Own | Inherited |
|-----|-----------|
| Set on the object itself | Come from prototype chain |
| `Object.keys` / `hasOwn` | Seen by `in` / `for...in` |

Deep clone / serialize should usually copy **own** only.

---

### `Object.assign` multiple sources vs nested merge

```js
Object.assign({}, { a: { x: 1 } }, { a: { y: 2 } })
// { a: { y: 2 } } — later source REPLACES whole `a`, does not deep-merge
```

Same with `{ ...a, ...b }` for nested objects. Need a **deep merge** helper for nested combine.

---

### Object literal vs `new Object()` vs `Object.create(null)`

| `{}` | `new Object()` | `Object.create(null)` |
|------|----------------|------------------------|
| Normal object | Same idea | **No** `Object.prototype` |
| Has `toString`, etc. | Same | Safe dictionary — no inherited keys |

---

### Optional chaining vs nullish coalescing (often with objects)

| `?.` | `??` |
|------|------|
| Safe access `user?.address?.city` | Default only for `null`/`undefined` |
| | `x ?? 'default'` (not for `0`/`''` like `||`) |

```js
const city = user?.address?.city ?? 'N/A'
```

---

### Destructuring vs spread (objects)

| Destructuring | Spread |
|---------------|--------|
| Pull out fields | Copy / merge into new object |
| `const { a, ...rest } = o` | `const o2 = { ...o, a: 2 }` |

Rest in destructuring = leftover **own enumerable** keys.

---

### Reference equality vs value equality

```js
const a = { x: 1 }
const b = { x: 1 }
a === b  // false — different references
a.x === b.x  // true
```

React `memo` / deps use **reference** equality for objects.

---

### `JSON.stringify` vs spreading for “clone”

| `{...o}` | `JSON.parse(JSON.stringify(o))` |
|----------|----------------------------------|
| Shallow | Deep-ish but lossy |
| Keeps undefined in object? (spread keeps) | Drops `undefined`, functions, symbols |

---

## Quick quiz (say out loud)

1. Does `{...obj}` deep clone? → **No**  
2. Does `Object.assign(a, b)` mutate `a`? → **Yes**  
3. Spread vs rest? → expand vs collect  
4. `map` vs `forEach`? → returns array vs undefined  
5. Debounce vs throttle? → trailing quiet vs rate limit  
6. `'toString' in {}` vs `Object.hasOwn({}, 'toString')`? → true vs **false**  
7. Nested merge with assign/spread? → **No**, replaces nested object  
8. `freeze` deep? → **No**, shallow  

---

*Add more “X vs Y” here as interviews throw them.*
