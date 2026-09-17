# How do you avoid unnecessary re-renders?

**Rule:** Not every re-render is bad. Profile first — fix placement before `memo`.

---

## 30-second answer

“I profile first. Usually the fix is **where state lives** — local instead of global, `children` so static parts don’t follow the parent, split context. Then `React.memo` on expensive rows if props are stable. `useCallback` only for memoized children. Defer heavy filter work with `startTransition`. I don’t memo-wrap the whole app.”

---

## When is a re-render “unnecessary”?

Parent state changed → child re-ran but **props/data didn’t change** and work was wasted (Profiler shows cost).

**Tools:** React DevTools Profiler · “Highlight updates” · record why a component rendered.

---

## 1. State placement (biggest win — do this first)

- **Local `useState`** for search, modal, tab — not App / Redux
- **Colocate** — filter state in the list component, not parent of 500 rows
- **`children` pattern** — layout holds state; sidebar passed as `children` from App doesn’t re-render when layout state changes

```
App:  <Layout><Sidebar /></Layout>   ← Sidebar created in App
Layout state changes → Layout re-renders → Sidebar props unchanged → Sidebar skips (if memo) or was never tied to that state
```

- **Don’t** put keystroke-fast state in Redux — whole app subscribers wake up

---

## 2. Don’t broadcast changes

| Problem | Fix |
|---|---|
| One giant Context (theme + cart + filters) | Split providers — subscribe only to what you need |
| `useSelector(state => state)` | Select narrow slice: `state.user.name` |
| New object every render to child | Stable reference or memo child + `useMemo` for the object |

---

## 3. Memo (last resort — after Profiler)

- **`React.memo(Row)`** — when same row data, same props, still re-renders
- **`useCallback`** — only when passing fn to **memoized** child
- **`useMemo`** — expensive derived data, not every variable
- **Stable `key={id}`** — not index on reorderable lists

---

## 4. React 18 — defer expensive work

- **`useDeferredValue(query)`** — input stays instant; list filter catches up
- **`startTransition(() => setFilter(...))`** — mark update non-urgent

Fewer *felt* janks; may still render twice — that’s OK.

---

## 5. Structure (fewer nodes = fewer commits)

- **Virtualize** long lists — only visible rows mount
- **Lazy routes** — don’t mount heavy tree until route opens
- **Avoid inline `style={{}}` / new fns** — only hurts if child is `memo`’d

---

## Priority order

1. Move state down / split context  
2. Profile — prove it’s a problem  
3. `React.memo` on hot components  
4. `useCallback` / `useMemo` where needed  
5. `startTransition` / deferred value for heavy UI  

---

## What not to do

- `memo` on every component  
- Redux for every input field  
- Goal “zero re-renders” — wrong; goal is **no wasted work on hot paths**

---

## Close

“Unnecessary re-render = subtree re-ran without needing new props or data. Fix **where state lives** first; memo is the last mile.”
