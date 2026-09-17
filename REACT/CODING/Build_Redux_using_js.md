# 6️⃣ Build Redux using plain JavaScript

Implement: Store · Reducer · Dispatch · Subscribe · State updates · Unsubscribe  
Then map it to real Redux.

**Run:** open `index.html` in the browser (or Live Server). Code is in `script.js`.

---

## What you built vs real Redux

| Mini (`script.js`) | Real Redux |
|---|---|
| `createStore(reducer)` | `createStore` / RTK `configureStore` |
| `getState()` | `store.getState()` |
| `dispatch(action)` | `store.dispatch(action)` |
| `subscribe(fn)` → returns `unsubscribe` | same |
| `counterReducer(state, action)` | any reducer / `createSlice` reducer |
| `{ type, payload }` | same action shape |
| `listeners.forEach(...)` after dispatch | store notifies subscribers (react-redux `useSelector` is a subscriber) |

**Flow (say this in the interview):**

```
UI click → dispatch(action)
        → reducer(oldState, action) → newState
        → store saves newState
        → all subscribers run (re-render / log)
```

**Rules that match real Redux:**

1. One store, one state tree  
2. Change state only via `dispatch`  
3. Reducer is pure — no `fetch`, no DOM, return a **new** object  
4. Unknown `action.type` → return previous state  
5. `subscribe` returns `unsubscribe`

**Not in this mini version (real Redux has them):** middleware (thunk), `combineReducers`, DevTools, Immer (RTK).
