# How would you optimize a slow React application?

**Rule:** Profile first. Fix the layer the tools point at — not guess.

---

## 30-second answer

“I split **load time** vs **runtime**. Lighthouse + bundle for the first; Chrome Performance + React Profiler for clicks and renders. Route code-splitting and smaller bundles for load. Virtualize lists, colocate state, defer filters, cache APIs for runtime. `memo` only where profiling proves waste.”

---

## Step 1 — Diagnose (always first)

| Symptom | Likely layer | Tool |
|---|---|---|
| White screen / slow first paint | Bundle size, SSR, assets | Lighthouse, Network, bundle analyzer |
| Slow route change | Too much JS on that route | Network (chunk size), lazy routes |
| Lag on type / filter | Re-renders + JS work | React Profiler, Highlight updates |
| Janky scroll | Too many DOM nodes | Performance tab, virtualize |
| Flaky / slow data | Network, duplicate calls | Network tab, RTK Query / React Query |

**Web Vitals (good targets):** LCP ≤ **2.5s** (main content visible) · INP ≤ **200ms** (click/type response) · CLS ≤ **0.1** (no layout jump). Quote your numbers in the interview if you measured them.

---

## Step 2 — Load-time optimization

- **Code split by route** — `React.lazy` + `Suspense`; don’t ship Orders JS on Login
- **Lazy heavy libs** — editor, charts, maps via dynamic `import()` on demand
- **Vendor split** — separate app chunk from `node_modules` (Vite `manualChunks` / Webpack splitChunks)
- **Tree-shake & drop dead code** — bundle analyzer; remove unused deps
- **Images** — WebP/AVIF, correct size, `width`/`height`, lazy below fold
- **Fonts** — subset, `font-display: swap`, preload only critical
- **Caching** — CDN, long cache for hashed assets, short cache for HTML/API where needed

---

## Step 3 — Runtime / render optimization

**State placement (fix before memo)**

- Search / filter / modal → local state on that screen, not App/Redux
- **`children` pattern** — layout holds state; static sidebar passed as `children` doesn’t re-render with it
- **Split Context** — don’t put theme + cart + filters in one provider

**Lists & DOM**

- 1k+ rows → **virtualize** (`react-window`, `@tanstack/react-virtual`)
- Stable **`key={id}`** — never index for reorderable lists

**Expensive updates**

- **Debounce** search input (200ms) or **`useDeferredValue`** / **`startTransition`** for heavy filter work
- **`useMemo`** for derived data only when profiling shows cost — not everywhere

**Memo (last resort)**

- **`React.memo`** on row components when Profiler shows same props, same data, still re-rendering
- **`useCallback`** only when passing callbacks to memoized children — otherwise skip

---

## Step 4 — Network / server state

- **One API layer** — token, errors, abort in `src/api`
- **Cache + dedupe** — RTK Query / TanStack Query (same URL → one in-flight request)
- **Abort** on unmount / id change — kill race conditions
- **Invalidate** after mutations — stale list after cancel order
- Avoid **waterfalls** — parallel `Promise.all` where requests are independent

---

## Step 5 — Production vs dev

- Dev feels fast; prod doesn’t → real bundle, real network, minification
- Test **Slow 3G + 4× CPU** throttle
- React Profiler: some detail needs **profiling build** or staging; Chrome Performance works on prod
- **Error boundaries** on lazy routes — failed chunk load ≠ white screen

---

## Priority order (say this if they ask “what first?”)

1. Measure — find load vs runtime vs network  
2. Biggest bundle / route split  
3. Virtualize + state colocation on hot screens  
4. API cache + dedupe  
5. Memo only on proven hot components  

---

## What not to do

- `memo` / `useCallback` on every component  
- Redux for every input keystroke  
- `fetch` in every `useEffect` with no cache  
- Optimize without a number (“felt slow” → “commit took 400ms on filter”)

---

## Close

“Slow React is usually **too much JS**, **too much DOM**, or **state in the wrong place** — not React itself. I profile, fix the hot spot, then codify the pattern so the team doesn’t repeat it.”
