# Altimetrik / “HFT-like” React Interview Prep

> Not a trading desk interview — **complex, high-traffic, performance-sensitive React apps** (many screens, microfrontends, heavy APIs). Same skills they probe for HFT UIs: **INP, memory, errors, scale**.

**Company note:** Altimetrik — expect production debugging, Web Vitals, architecture, security.

---

## Questions they asked you

### 1. How will you fix INP?

**INP** = Interaction to Next Paint (should be ≤ **200ms**). How fast the page reacts after click/type.

**Find**
- Chrome Performance / Web Vitals → long tasks after interaction
- React Profiler → which components commit on that click

**Fix (priority)**
1. Break up long JS on the main thread (`setTimeout`/scheduler, `startTransition` for non-urgent UI)
2. Don’t re-render the world — colocate state, virtualize lists, split Context
3. Defer heavy work: `useDeferredValue` / `startTransition` on filter/search
4. Less work per keystroke — debounce API, memo only hot paths
5. Code-split so less JS competes on click
6. Avoid layout thrashing (read/write DOM carefully)

**Say:** “INP is interaction delay. I profile the click, then cut main-thread work and unnecessary React commits.”

---

### 2. Hydration error?

**Hydration** = React attaches to server HTML. Error = **server HTML ≠ first client render**.

**Common causes**
- `Date.now()` / `Math.random()` / `window` during render
- `typeof window !== 'undefined'` branching differently on server vs client
- Invalid HTML nesting (`<p><div>`)
- Browser extensions changing DOM
- Locale/timezone differences in formatted dates

**Fix**
1. Keep first client render identical to SSR HTML
2. Move browser-only logic to `useEffect`
3. Suppress only for known safe diffs (`suppressHydrationWarning` on tiny nodes like dates — last resort)
4. Check React error for the mismatched node

**Say:** “Server and client must paint the same tree first. No `window`/`Date` in render — useEffect after hydrate.”

---

### 3. Browser memory gone too heavy?

**Find**
- Chrome Memory / Performance monitor → JS heap climbing
- Detached DOM nodes, growing arrays, leaked listeners

**Typical leaks in React**
- `setInterval` / `addEventListener` without cleanup
- Subscriptions (WebSocket, Redux) not unsubscribed
- Closures holding huge data
- Unbounded cache (API results, images in memory)
- Keeping all 50 screens’ data mounted

**Fix**
1. Cleanup in `useEffect` return
2. Abort fetches on unmount
3. Virtualize long lists — don’t keep 50k DOM nodes
4. Unmount unused routes; don’t cache every page forever
5. Cap caches (LRU); revoke object URLs
6. Avoid accidental global arrays that only grow

**Say:** “Profile heap, find what’s retained. Usually missing cleanup or unbounded lists/caches.”

---

### 3b. Browser / tab crashes because memory is full (OOM) — how do you fix it?

**What happens:** JS heap or DOM grows until Chrome kills the tab (“Aw, Snap!” / Out of Memory). Not a React Error Boundary — the **process dies**.

**1. Confirm it’s memory (not CPU hang)**
- Task Manager → tab memory climbing over time  
- Chrome DevTools → **Memory** → heap snapshots before/after using the app  
- Look for: rising JS heap, detached DOM nodes, growing arrays/Maps

**2. Find the retainer (what won’t let go)**
- Take heap snapshot → search large arrays / `Detached HTMLDivElement`  
- Common: tick history with no cap, image/blob URLs never revoked, WS messages pushed forever, all routes kept mounted with full data

**3. Fix (same day patches)**
1. **Cap everything that grows** — ring buffer / max N ticks; LRU cache with max entries  
2. **Virtualize** — don’t hold 50k DOM nodes  
3. **Cleanup** — `removeEventListener`, clear intervals, close WS, `URL.revokeObjectURL`  
4. **Drop unused screen data** on navigate — don’t keep 50 screens’ API payloads in Redux forever  
5. **Pagination / windowing** for API data — don’t load entire day into one array  
6. **Avoid** accidental duplicates: cloning huge trees, logging big objects, React StrictMode double-mount masking a real leak in prod patterns  

**4. HFT / live feed specific**
- Store **latest quote only** per symbol in hot path  
- Chart history = **fixed-size ring**, not `array.push` all day  
- Parse in Worker; don’t keep raw message strings forever  

**5. Hardening in prod**
- RUM / custom metric: periodic `performance.memory` (Chrome) when available — alert on climb  
- Soft limit: if heap high → flush caches, disconnect non-critical streams, show “memory pressure” banner  
- Don’t expect to `try/catch` an OOM — **prevent** growth  

**30-second answer**  
“Tab crash is OOM. I snapshot the heap, find the unbounded structure or detached DOM, then cap buffers, virtualize, clean up listeners, and stop retaining every screen’s data. For live feeds I use latest-only + ring buffers — never unbounded push.”

---

### 3c. Prod build shows a blank page; `npm run dev` works — how do you fix it?

**Mindset:** Dev ≠ prod. Prod is minified, hashed chunks, stricter paths, different env, often CDN/cache.

**1. See the real error (don’t guess)**
- Open prod URL → DevTools **Console** + **Network**
- Common: red error, failed `.js` chunk (404), MIME type wrong, CORS, CSP

**2. Typical causes & fixes**

| Cause | What you see | Fix |
|-------|----------------|-----|
| **JS crash on boot** | Console error; white screen | Fix the throw; wrap root in Error Boundary + log to Sentry |
| **Wrong `basename` / router** | Routes blank | Match `BrowserRouter basename` to deploy path (`/app`) |
| **Wrong public path / `homepage`** | Chunks 404 (`/static/js/...`) | Vite `base`, CRA `homepage`, asset prefix = CDN/subpath |
| **Lazy chunk 404 after deploy** | Dynamic import fails | Users hold old HTML + new hashed files wiped — cache strategy; versioned deploys; soft reload on chunk error |
| **Env vars missing** | `undefined` API URL | `VITE_*` / `REACT_APP_*` must exist at **build** time, not only on server runtime |
| **Case-sensitive imports** | Works on Windows/Mac, fails on Linux CI/prod | Fix `Import` vs `import` path case |
| **CSS wiped / root empty** | `#root` empty | Confirm `index.html` mounts `createRoot`; build output actually deployed |
| **CSP blocks scripts** | Console CSP violations | Adjust Content-Security-Policy for prod |
| **Extension / SSR hydrate** | Mismatch | Less common for pure CSR blank — still check hydrate errors if SSR |

**3. Lazy route chunk failure (very common after deploy)**

```js
// soft recovery when old client requests missing chunk
import(/* webpackChunkName: "orders" */ './Orders')
  .catch(() => window.location.reload()) // or show “New version — refresh”
```

**4. Checklist (say in order)**
1. Console error? → fix runtime throw  
2. Network: is `main.*.js` **200**? → fix base path / deploy folder  
3. Env: API/base URL defined for prod build?  
4. Compare `npm run build && npm run preview` locally — if blank locally too, it’s build/app; if only on server, it’s deploy/CDN/cache  
5. Hard refresh / disable cache — rule out stale HTML  

**30-second answer**  
“I open Console and Network on prod. Blank is usually a boot crash, wrong asset `base` path, missing env at build time, or stale HTML requesting old chunks. I reproduce with `build && preview`, fix path/env/error, and add chunk-load recovery so users aren’t stuck after deploys.”

---

### 4. Error Boundary? How it catches API errors?

**Error Boundary** = class component with `getDerivedStateFromError` / `componentDidCatch`. Catches **render-phase** errors in children → show fallback UI.

**What it catches**
- Throw during **render**
- Errors in lifecycle / constructors of children

**What it does NOT catch**
- Event handlers (`onClick`)
- `setTimeout` / async
- **Failed `fetch` / axios** (async — not render)
- Errors in the boundary itself
- SSR (need special handling)

**API errors**
- Boundary alone **won’t** catch a rejected promise.
- You must: `try/catch` in async → `setError` → **render** something that throws, or set error state and render fallback:

```js
// Pattern A: error state in component (usual)
if (error) return <ErrorUI />

// Pattern B: rethrow in render so boundary catches
if (error) throw error  // only after you’ve set error from catch
```

Or use libraries (react-query `error`, error boundary + `throwOnError`).

**Say:** “Boundaries catch render errors. API fails in async — I set error state or rethrow during render to surface it to a boundary.”

---

### 5. HFT question in React? (what they really mean)

They mean: **UI must stay responsive under rapid updates** (ticks, live prices, streams).

**Themes**
- Don’t re-render entire app every tick
- Throttle/batch UI updates (`requestAnimationFrame`, store outside React, push to React at 60fps or less)
- Window / virtualize grids
- Web Workers for heavy calc
- `startTransition` for non-urgent paints
- Separate “hot” data path from chrome (header/nav)

**Say:** “Treat feed as high-frequency: batch updates, isolate hot components, never block main thread with full-tree renders.”

---

### 6. Slow microfrontend?

**Causes**
- Duplicate React / shared libs loaded multiple times
- Huge remote bundles, no shared `shared` config (Module Federation)
- Cascade of waterfalls loading remotes
- Version mismatch → runtime slowness / dual React
- No CDN / poor caching of remotes

**Fix**
1. Module Federation `shared: { react, react-dom, singleton: true }`
2. Lazy-load remotes; preload only critical shell
3. Align versions; one React instance
4. Bundle-analyze each remote
5. Independent deploy ≠ independent full React copy
6. Measure: shell TTI vs remote load time separately

**Say:** “Slow MFE is usually duplicate React, fat remotes, or waterfall loads — share singletons and lazy-load remotes.”

---

### 7. 100 APIs and app is 5 sec?

**Diagnose**
- Network waterfall vs parallel
- Same data fetched many times
- Blocking render on all 100
- Huge payloads

**Fix**
1. **Don’t call 100 on boot** — load critical path first (shell + above-fold)
2. Parallelize independent calls (`Promise.all`) — avoid sequential await chains
3. **Dedupe + cache** (RTK Query / React Query)
4. BFF / aggregate endpoint if many tiny calls
5. Prioritize: above-fold APIs first; rest after idle / on navigation
6. HTTP/2, pagination, smaller payloads
7. Skeleton UI so 5s wait *feels* less broken while you cut real time

**Say:** “5s with 100 APIs is usually waterfall + fetching everything upfront. Critical path first, cache/dedupe, aggregate where possible.”

---

### 8. XSS attack?

**XSS** = attacker injects script into your page (runs as your origin).

**In React**
- Default JSX escapes text → safer
- Dangerous: `dangerouslySetInnerHTML`, `eval`, building URLs/scripts from user input, old libs

**Fix / prevent**
1. Don’t use `dangerouslySetInnerHTML` with unsanitized HTML (DOMPurify if you must)
2. CSP (Content-Security-Policy)
3. HttpOnly cookies for tokens (harder for stolen XSS to read)
4. Sanitize user content; encode URLs
5. Avoid inserting user input into `href="javascript:..."` / event handlers

**Say:** “React escapes by default. XSS risk is raw HTML and token theft — sanitize, CSP, prefer httpOnly cookies.”

---

### 9. 50 screens in React — fix user issue?

**Process (they want method, not panic)**
1. **Reproduce** — which screen, which action, browser, account
2. **Logs / RUM** (Datadog, Sentry) — error, URL, user id
3. Narrow: network fail vs render crash vs state bug vs permission
4. Feature flag / screen ownership — which microfrontend or route bundle
5. Fix + regression test; monitor that screen’s Web Vitals / error rate

**Architecture that helps**
- Clear route → screen map
- Error boundaries **per route/screen**
- Shared design system; feature folders
- Code split per screen so one fat screen doesn’t block others

**Say:** “Reproduce, locate screen via routing/RUM, isolate with route-level boundary and network tab, then fix with a test so 49 other screens stay safe.”

---

## More questions (same interview style)

### Performance / Web Vitals

| Q | Short answer |
|---|--------------|
| Fix **LCP**? | Optimize hero image, reduce blocking JS, SSR/stream critical HTML, preload LCP asset |
| Fix **CLS**? | Width/height on images, reserve skeleton space, no late-injected banners without space |
| Main thread blocked? | Long tasks → split work, defer non-critical JS, Web Worker |
| Huge list jank? | Virtualize (`react-window`), don’t render 10k DOM nodes |
| How do you measure prod? | RUM + Lab (Lighthouse), Web Vitals callbacks |

### React rendering

| Q | Short answer |
|---|--------------|
| Why child re-renders with memo? | New object/fn props every time — `useMemo`/`useCallback` |
| Context re-render storm? | Split providers; memo consumers; don’t put fast-changing values in one fat context |
| Concurrent features? | `startTransition`, `useDeferredValue` — keep input snappy |
| Keys in lists? | Stable ids; index keys break state on reorder |

### Data / API

| Q | Short answer |
|---|--------------|
| Race condition (user 1 then 2)? | AbortController / ignore stale; or query lib |
| Stale data after mutation? | Invalidate cache tags / refetch |
| Optimistic UI? | Update cache first, rollback on error |
| GraphQL vs REST here? | Either; problem is overfetch + waterfalls, not logo on API |

### Architecture

| Q | Short answer |
|---|--------------|
| State: Redux vs server cache? | UI/session → Redux/context; server lists → RTK Query/React Query |
| Microfrontends when? | Multiple teams/releases; cost = integration + shared deps |
| Design system? | Tokens + shared components — consistency across 50 screens |
| Feature flags? | Gradual rollout, kill switch for bad screens |

### Reliability

| Q | Short answer |
|---|--------------|
| Retry strategy? | Idempotent GETs yes; POST carefully; exponential backoff |
| Offline / flaky network? | Cache, queue mutations, clear offline UI |
| Chunk load failed? | Error boundary + reload prompt for lazy routes |
| Monitoring? | Sentry + Web Vitals + API latency dashboards |

### Security

| Q | Short answer |
|---|--------------|
| CSRF? | SameSite cookies, CSRF token if cookie auth |
| Token storage? | Prefer memory + httpOnly refresh; localStorage XSS-sensitive |
| Clickjacking? | `X-Frame-Options` / CSP `frame-ancestors` |
| Sensitive data in Redux? | Don’t persist secrets to localStorage |

### Testing / process

| Q | Short answer |
|---|--------------|
| How test INP fix? | Lab interaction trace + prod RUM before/after |
| Flaky e2e? | Stable selectors, wait on network idle carefully, isolate data |
| Rollback? | Flags + versioned deploys |

---

## Server Components vs Client Components

*(Next.js App Router / React RSC — common in large-app interviews)*

### What are Server Components?

**React Server Components (RSC)** run on the **server** (or at build time). They:

- Fetch data / talk to DB / use secrets **on the server**
- Send **HTML + a light payload** — their component JS is **not** shipped to the browser
- Have **zero** client JS cost for that component by default
- **Cannot** use state, effects, or browser APIs (`useState`, `useEffect`, `onClick`, `window`)

In Next.js App Router, components are **Server by default**.

```js
// app/orders/page.js  — Server Component (default)
async function OrdersPage() {
  const orders = await db.orders.findMany() // OK on server
  return <OrderList orders={orders} />
}
```

### What are Client Components?

Marked with `"use client"` at the top. They run in the **browser** (after hydrate).

- Can use hooks, events, browser APIs
- Their JS **is** shipped to the client
- Can receive props from Server parents (serializable data only)

```js
'use client'

import { useState } from 'react'

export function SearchBox() {
  const [q, setQ] = useState('')
  return <input value={q} onChange={(e) => setQ(e.target.value)} />
}
```

### How they differ

| | **Server Component** | **Client Component** |
|---|----------------------|----------------------|
| Where it runs | Server (or build) | Browser |
| JS shipped to user | No (for that component) | Yes |
| `useState` / `useEffect` | No | Yes |
| `onClick` / browser APIs | No | Yes |
| Direct DB / secret keys | Yes | No (unsafe) |
| `async` + await fetch in component | Natural | Usually effects / libs |
| Default in Next App Router | Yes | Only with `"use client"` |

### How they work together

```
Server Page (fetch orders)
   ├── Client SearchBox   ("use client" — needs typing)
   └── Server OrderRow    (no interactivity — stays on server)
```

- Put **interactivity** in small Client leaves  
- Keep **data fetching / layout / static UI** on Server  
- You **cannot** import a Server Component into a Client file — pass it as `children` instead  

```js
// Client wrapper
'use client'
export function Panel({ children }) {
  return <div className="panel">{children}</div>
}

// Server page
<Panel>
  <ServerOnlyChart />  {/* as children — OK */}
</Panel>
```

### Why interviews care (complex apps)

- Smaller JS → better **INP / LCP**
- Secrets and DB stay off the client
- Clear split: mostly server HTML; only widgets are client

### 30-second answer

“Server Components render on the server, can async-fetch and use secrets, and don’t ship their JS. Client Components need `"use client"` for state, effects, and clicks. In a large app I keep data and static UI on the server and push small interactive islands to the client.”

---

## HFT-style React architecture (deep dive)

*500 tickers × 50 updates/sec ≈ **25,000 messages/sec**. You cannot `setState` that often across a React tree.*

### Q1. Design a React dashboard with 500 financial tickers updating 50×/sec

**Wrong approach**
- One Context/Redux store updated every tick → whole dashboard re-renders
- 500 components each subscribed to full state
- Re-creating rows on every message

**Right approach (layers)**

1. **WebSocket outside React**  
   Singleton connection; parse binary/JSON in the socket layer (or Worker).

2. **Store prices in a mutable store / Map** (not React state every tick)  
   e.g. Zustand with `subscribeWithSelector`, or plain `Map` + external store (`useSyncExternalStore`).

3. **Throttle UI to display rate** (e.g. 10–20 fps), not message rate  
   `requestAnimationFrame` batch: flush latest prices to React ~16–50ms, drop intermediate ticks.

4. **Virtualize the grid**  
   Only ~20–40 visible rows mount (`react-window` / TanStack Virtual). 500 tickers in data ≠ 500 DOM nodes.

5. **Subscribe per cell / per row**  
   Row reads `prices.get(symbol)` only; parent layout (filters, chrome) does **not** re-render on each tick.

6. **Canvas / WebGL for dense boards** (optional senior answer)  
   If every cell paints every frame, DOM may lose — draw grid on canvas; React only for chrome.

7. **Workers**  
   Heavy normalize/aggregate in Worker; main thread only paints.

```
WS 25k/s → Worker/store (latest Map)
                ↓ rAF every 16–50ms
         React rows (virtualized, per-symbol subscribe)
```

**30-second answer**  
“I don’t put 25k updates through React state. Socket writes a Map, I flush to UI on animation frames, virtualize rows, and subscribe each row to one symbol so chrome stays idle.”

---

### Q2. Prevent a WebSocket stream from blocking user interactions

**Problem:** parsing + setState on every message → long tasks → bad **INP** (typing/clicks lag).

**Fixes**
1. **Never** do heavy work in the WS `onmessage` on the main thread — hand off to **Worker**
2. **Batch** messages; apply latest-wins per symbol (don’t queue 50 updates for same ticker)
3. **Decouple stream from UI** — store updates ≠ React render; schedule render with `rAF` / `startTransition`
4. Keep **input / buttons** outside the hot tree; or mark list updates as transitions so clicks stay urgent
5. **Backpressure** — if UI behind, drop old ticks (trading UI usually wants *latest*, not every tick)
6. Don’t log / JSON.stringify huge payloads in hot path

```js
// sketch
socket.onmessage = (e) => {
  worker.postMessage(e.data) // parse off main thread
}
worker.onmessage = (batch) => {
  priceStore.applyLatest(batch) // mutate store
  scheduleFlush()               // rAF → notify React subscribers
}
```

**30-second answer**  
“WS must not own the main thread. Parse in a Worker, coalesce to latest prices, flush to React on rAF/transition so clicks and typing stay urgent.”

---

### Q3. Context API for rapidly changing global state — performance implications?

**Bad fit for tick streams**

- Any `Provider` `value` change → **all consumers re-render**
- New object/array as `value` every time → even worse (new reference always)
- 500 consumers × 50 updates/s = UI death

```js
// anti-pattern for HFT
<PriceContext.Provider value={pricesObject}>
  {/* every ticker child re-renders on every tick */}
</PriceContext.Provider>
```

**What Context is good for**
- Theme, locale, auth user — **rare** changes
- Stable config

**What to use instead for high-frequency data**
- External store + `useSyncExternalStore`
- Zustand/Jotai/Redux with **selector** so only changed slice notifies
- Per-symbol subscriptions
- Refs for values that shouldn’t trigger render

**Mitigations if stuck with Context**
- Split contexts (auth ≠ prices)
- Memo consumers + stable value — **still won’t save you at 50Hz**

**30-second answer**  
“Context broadcasts to every consumer. Fine for theme; fatal for tick data. Use an external store with selectors or per-row subscriptions, not one giant Price Context.”

---

### More HFT React / architecture questions

| Q | Point-wise answer |
|---|-------------------|
| **Why not Redux for every tick?** | Redux *can* work with selectors + batching, but naive `dispatch` per message still schedules work. Prefer coalesce outside, dispatch at display rate — or skip Redux for the hot path. |
| **`useSyncExternalStore` — why?** | Subscribe to non-React store correctly (tearing-safe with concurrent React). Ideal for WS price maps. |
| **How do you keep INP good on a live blotter?** | Urgent: clicks/typing. Non-urgent: grid paint via `startTransition` / deferred values. Never block input on full grid reconcile. |
| **Binary vs JSON on the wire?** | Binary (e.g. protobuf/SBE) = less parse cost; JSON.parse at 25k/s hurts main thread — Worker or binary. |
| **Memory on a long-lived trading tab?** | Unbounded tick history → leak. Keep *latest* + ring buffer for charts; cleanup WS/listeners on unmount. |
| **Multiple windows / tabs?** | `BroadcastChannel` / SharedWorker for one socket many tabs; don’t open 5 sockets. |
| **Reconcile React 18 concurrent + live data?** | External store + selectors; avoid rendering stale tearing for critical numbers (useSyncExternalStore). |
| **When Canvas over DOM?** | Thousands of cells updating visually every frame; DOM + CSS can’t keep up. |
| **Order entry vs market data — same tree?** | **No.** Separate “hot” market data path from “critical” order form — form must never wait on tick renders. |
| **Feature flag a new grid?** | Ship canvas/DOM behind flag; RUM on INP/FPS before full rollout. |
| **How do you test this?** | Mock WS firing N msg/s; assert UI update rate capped; Profiler commit count; INP on type-while-streaming. |
| **Microfrontend + live prices?** | One shared market-data singleton in host; remotes subscribe — don’t duplicate WS per MFE. |
| **What breaks first at scale?** | Main-thread parse → React commit → layout/paint. Fix in that order. |
| **Stale quote on screen?** | Coalesce bug, wrong symbol key, or render batch dropped without “latest wins”. Always store *last* tick per id. |
| **Accessibility on live grids?** | Don’t aria-live every tick (noise). Announce on user request / meaningful alerts only. |

---

## Critical HFT React system architecture (interview bank)

*Focus: pipelining, throughput, memory — UI stays at ~60 FPS while the wire is hot.*

### 1. Data pipeline & ingestion

#### The firehose — 20,000 order-book updates/sec → stable 60 FPS

**Goal:** almost nothing hits the React state tree at wire rate.

1. **Ingest** — one WS (or SharedWorker); append to a lock-free-ish queue on main or prefer Worker  
2. **Filter** — drop symbols not on screen / not in watchlist as early as possible  
3. **Coalesce** — per instrument “latest wins” (book snapshot or delta merge into one structure)  
4. **Throttle to display** — flush to UI on `requestAnimationFrame` (~16ms) or fixed 30–60 Hz; **drop** intermediate books  
5. **React only sees frames** — external store notifies subscribers at frame rate, not 20k/s  

```
20k/s WS → Worker (parse + merge book)
         → Map[symbol] latest book
         → rAF @ 60Hz → notify visible rows only
```

**Say:** “React is the display layer at 60 FPS. The firehose never becomes 20k setStates.”

---

#### Threading & offloading — Web Workers + binary (Protobuf / FlatBuffers)

1. **Main thread** = input, layout, paint, light React  
2. **Worker** = decode binary, sort/filter books, aggregate  
3. **Transfer back efficiently**  
   - Prefer **Transferable** `ArrayBuffer` (zero-copy) over structured clone of huge objects  
   - Or SharedArrayBuffer where allowed (cross-origin isolation)  
   - Send **diffs / latest snapshot**, not full history every time  
4. Main applies snapshot into store → rAF flush  

```js
// Worker posts buffer as transferable
worker.postMessage(buffer, [buffer]) // ownership moves — cheap
```

**Say:** “Decode and sort off-main; transfer ArrayBuffers; main only merges latest and paints.”

---

#### Buffer management — sliding window / circular queue (8-hour day)

**Problem:** push every tick into an array all day → OOM / GC thrash.

1. **Circular buffer** (ring) — fixed capacity N (e.g. last 5k–50k points)  
2. Write index `% capacity`; overwrite oldest  
3. Charts read a view into the ring — **no unbounded `push`**  
4. Separate **latest quote** (one object per symbol) from **history** (ring for that symbol/chart)  
5. Cap number of symbols with history; lazy-create rings when chart opens  

```js
// sketch
class Ring {
  constructor(cap) {
    this.buf = new Array(cap)
    this.i = 0
    this.size = 0
    this.cap = cap
  }
  push(x) {
    this.buf[this.i] = x
    this.i = (this.i + 1) % this.cap
    this.size = Math.min(this.size + 1, this.cap)
  }
}
```

**Say:** “Fixed-size ring for history; overwrite old; never let tick arrays grow for 8 hours.”

---

### 2. State & rendering architecture

#### Why Context is a poor fit for a multi-asset trading grid

| Context | What happens |
|---------|----------------|
| One `value={prices}` | Every consumer re-renders on every provider update |
| 100 cells, different rates | Still all wake up if they share one context |
| New object each tick | Reference always changes → memo useless |

**Better**
- **Zustand / Redux Toolkit** with **selectors** + batching — component A subscribes to `AAPL` only  
- **Signals / fine-grained** stores — update one cell’s signal without React tree walk  
- **`useSyncExternalStore`** per symbol or per row  

**Contrast**
- RTK: batch dispatches, selectors, still beware dispatching at 20k/s — **batch outside**, notify at frame rate  
- Zustand: cheap selectors; same rule — don’t notify 20k/s  
- Signals: bypass much of React render for cell text  

**Say:** “Context = broadcast. Grids need per-asset subscriptions and frame-rate notifies.”

---

#### Bypassing reconciliation — cell flashes every 5ms

**You cannot** rely on React VDOM at 200 Hz for one cell.

**Architectures**
1. **Ref + DOM mutate** — `cellRef.current.style.background = ...` / `textContent =` in rAF; React mounts shell once  
2. **Canvas/WebGL cell layer** — draw flash in canvas; React only chrome  
3. **CSS class toggle via ref** without `setState`  
4. Keep React for **structure**; drive **pixels** imperatively for hot cells  

```js
// mount once with React; update imperatively
useEffect(() => {
  return priceStore.subscribe(symbol, (price) => {
    elRef.current.textContent = price
    elRef.current.className = price >= last ? 'up' : 'down'
  })
}, [symbol])
```

**Say:** “For 5ms flashes I skip setState — subscribe outside React and write the DOM/canvas directly.”

---

#### Virtualized live grid from scratch (dynamic rows, flashes, live sort, infinite scroll)

1. **Window** — know scrollTop, viewport height → startIndex / endIndex (+ overscan)  
2. **Absolute position** rows (`transform: translateY`) — don’t mount offscreen  
3. **Dynamic row height** — height cache / estimated height + measure when mounted; adjust spacer  
4. **Live flashes** — imperative/canvas on visible cells only  
5. **Sort on live stream** — sort in Worker on **snapshot** at frame rate; don’t re-sort 20k times/s; keep stable row identity (`symbol` key)  
6. **Infinite scroll** — load more symbols/pages on edge; don’t keep infinite DOM  
7. **Avoid layout thrashing** — batch reads then writes; don’t measure height inside tight tick loop  

**Say:** “Virtual window + height cache + Worker sort at display rate + imperative flashes on visible cells.”

---

### 3. Component & layout architecture

#### Multi-window (OpenFin / Glue42 / Electron) — share state & layout

1. **One market-data bus** — SharedWorker or host process owns WS; windows subscribe via IPC / `BroadcastChannel` / Glue channels  
2. **Pub/sub topics** — `prices/AAPL`, `orders/fill` — not prop-drilling across windows  
3. **Layout sync** — layout service stores positions; windows load/save workspace JSON  
4. **React per window** — each window is its own React root; **don’t** expect one React tree across windows  
5. **Auth/session** once in container; inject into views  
6. Prefer **shared libs** as externals so each window isn’t a full duplicate bundle if platform allows  

**Say:** “Per-window React roots; shared MD via pub/sub; layout as serialized workspace — container owns the bus.”

---

#### Canvas vs SVG vs DOM — depth chart & candlesticks

| Choice | Use when |
|--------|----------|
| **DOM / React** | Sparse UI, forms, accessibility, few nodes |
| **SVG** | Simple shapes, CSS hover, moderate points, crisp scaling |
| **Canvas 2D** | Thousands of points/rects updating often (books, candles) |
| **WebGL** | Extreme density / GPU (advanced depth, heatmaps) |

**Decision walk**
1. Order book depth (many levels, rapid redraw) → **Canvas** (or WebGL)  
2. Candlestick history (lots of rectangles/wicks) → **Canvas**; maybe SVG for small static charts  
3. Axis labels, tooltips, crosshair hit-testing → often **DOM overlay** on top of canvas  
4. React wraps the `<canvas>` and chart controls; **draw loop** is imperative  

**Say:** “DOM for app chrome; Canvas for hot charts; SVG only if scene is small and interactive CSS helps.”

---

### 4. Memory & GC — zero-allocation mindset

**Problem:** allocate new objects every WS message → GC pause → stutter.

**Tactics**
1. **Reuse objects** — mutate fields on pooled book/level structs; don’t `map` to new arrays every tick  
2. **TypedArrays / preallocated buffers** for numeric series  
3. **Ring buffers** (above) — no growing arrays  
4. **Avoid** per-message `{...spread}`, `JSON.parse` on main without reuse, React `setState` with new object trees at wire rate  
5. Custom hooks: subscribe in `useEffect`; update **refs** / external store; don’t create new callback identities in hot path every message  
6. Measure with Performance GC / Memory; prove allocation rate drops  

**Honest line:** “True zero-GC is hard in JS; we aim for **near-zero** in the hot path — pools, typed buffers, mutate-in-place, frame-rate React.”

---

### Architect one-liner (close)

“Wire rate stays in Workers and pooled structures; React paints at frame rate on a virtualized, selectively subscribed UI; Context and per-tick setState never sit in the firehose.”

---

### Architecture sketch (say this on whiteboard)

```
┌─────────────┐     ┌──────────────┐     ┌────────────────────┐
│  WebSocket  │────▶│ Worker/Store │────▶│ rAF / batch flush  │
└─────────────┘     │  Map[sym]    │     └─────────┬──────────┘
                    └──────────────┘               │
         Order form (React, urgent) ◀──────────────┤
         Grid rows (virtualized, per-sym) ◀────────┘
         Context: theme/auth only (cold)
```

**Principles**
1. **Latest wins** over “process every message in React”  
2. **Display rate ≠ network rate**  
3. **Isolate hot path** from interactive chrome  
4. **Measure** FPS, long tasks, INP under load  

---

## Scenario drills (practice out loud)

1. **Dashboard opens in 8s** — what do you check first?  
2. **Only Safari users report bug** — hydration or layout?  
3. **Memory grows after 30 min on live screen** — what leak pattern?  
3b. **Tab crashes / OOM after long trading day** — heap snapshot → ring buffer + drop retained routes; can’t catch OOM, must prevent.  
3c. **Blank page in prod, works in dev** — Console/Network → base path, env at build, boot crash, stale chunks.  
4. **One MFE upgrade breaks host** — shared singleton?  
5. **Search box lags typing** — INP; transition + defer list.  
6. **User sees another user’s data briefly** — race / cache key bug.  
7. **Blank screen after deploy** — chunk hash / CDN cache / boundary.  
8. **API 200 but UI wrong** — normalize/transform bug, not network.

---

## 60-second “senior” framing

“I treat these apps like production systems: **measure** (Vitals, RUM, Profiler), **isolate** (route boundaries, MF shared deps), **protect the main thread** (INP), **don’t fetch the world on boot**, and **assume async errors need explicit handling** — Error Boundaries don’t catch failed fetches by themselves. Security is XSS/CSP/token placement, not only HTTPS.”

---

## Quick cheat numbers

| Metric | Good |
|--------|------|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| First load feel | aim &lt; 3s critical path |

---

## Links worth one pass

- [web.dev INP](https://web.dev/inp/)
- [React hydration](https://react.dev/link/hydration-mismatch) (search hydration mismatch)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

---

*Altimetrik-style: less trivia, more “how do you debug and harden a large React system.”*

---

## React things related to concurrency

**Idea:** React 18 can **interrupt / prioritize** rendering. Urgent work (typing, click) goes first; heavy UI can wait — better **INP**.

---

### Core concepts

| Term | Meaning |
|------|---------|
| **Concurrent rendering** | Render work can pause, resume, or abandon if something more urgent arrives |
| **Urgent update** | Must feel instant — input, click, hover |
| **Transition (non-urgent)** | Can lag — filter 10k rows, switch heavy tab |
| **Fiber** | Enables pause/resume (reconciler); concurrency builds on this |

---

### APIs you’ll name

**1. `useTransition`**
- Wrap heavy `setState` in `startTransition`
- Returns `isPending` for “Updating…” UI

```js
const [isPending, startTransition] = useTransition()
setText(v)                    // urgent
startTransition(() => setFilter(v)) // heavy list later
```

**2. `useDeferredValue`**
- Lag a **value** (often a prop) for expensive children
- Parent/input stays fresh

```js
const deferredQuery = useDeferredValue(query)
<HugeList filter={deferredQuery} />
```

**3. `Suspense`**
- Show fallback while lazy code / async UI is not ready
- Works with `React.lazy` and (in RSC) data boundaries

```js
<Suspense fallback={<Spinner />}>
  <LazyPage />
</Suspense>
```

**4. `useSyncExternalStore`**
- Subscribe to **non-React** stores (WS prices) safely under concurrent rendering
- Avoids tearing (mixed old/new data mid-render)

**5. `React.lazy`**
- Less JS on main thread → fewer long tasks vs interactions

---

### When to use what

| Situation | Tool |
|-----------|------|
| You own the heavy `setState` | `useTransition` |
| Heavy child should lag a fast prop | `useDeferredValue` |
| Loading async UI / route | `Suspense` + `lazy` |
| Zustand/Redux/WS external store | `useSyncExternalStore` (or lib that uses it) |
| 20k ticks/sec feed | External store + rAF first — not transitions alone |

---

### What concurrency is NOT

- Not magic faster JS — still one main thread  
- Not a replacement for virtualization / Workers / throttling on firehoses  
- Not a fix for Context broadcasting every tick  

---

### Interview one-liner

“Concurrency lets React prioritize urgent updates over heavy renders. I use `useTransition` / `useDeferredValue` for search/filter INP, Suspense for loading boundaries, and `useSyncExternalStore` for live external data — plus virtualization when the list itself is the problem.”

---

### Mini cheat

```
User types
  → urgent: update input
  → transition/deferred: update big list when free
  → Suspense: fallback if chunk/data not ready
  → HFT: WS → store → rAF → selective subscribe (outside React rate)
```
