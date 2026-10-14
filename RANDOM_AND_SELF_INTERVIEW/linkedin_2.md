https://www.linkedin.com/feed/update/urn:li:activity:7497007199471345664/


🚀 Oracle — Frontend Engineer (React.js) Interview Experience
Recently interviewed for a Frontend Engineer / React.js role at Oracle.
This was not a typical “What is React?” interview. The discussion focused heavily on React internals, JavaScript, Redux architecture, performance, debugging, and frontend system design.

🔥 Technical Interview Round 1 — Key Questions

1️⃣ React Architecture
How would you design a scalable React application with multiple modules, shared state, API integrations, authentication, and reusable components?

Ans.

https://www.youtube.com/watch?v=O29b_DD6f8s
https://www.youtube.com/watch?v=AMerB8XjfZ0

The question has five parts. Answer them one by one so it does not sound like a buzzword dump.

**The app:** Login → Dashboard → Orders → Settings. Many teams. Goal: Orders team ships without breaking Login.

---

**1. Multiple modules (folders)**

Keep everything for one area together:

```
src/auth/      login, logout, “must be logged in” wrapper
src/orders/    order page + order API + order-only state
src/settings/  settings page
src/ui/        Button, Modal, Table — look and feel only
src/api/       one helper for all HTTP
src/store/     Redux — only data many pages need
```

Do **not** make `src/components/` with 200 mixed files. You cannot tell who owns what.

---

**2. Shared state**

Rule: *Does more than one page need this after I click around?*

- **Yes** → Redux / Auth context: logged-in user, roles, cart
- **No** → `useState` on that page: search text, open modal, “page 3 of this table”

Orders search box is not global. Putting it in Redux makes every screen re-render when someone types.

---

**3. Authentication**

One door:

1. Login saves the session.
2. A wrapper around `/orders` (`PrivateRoute`): not logged in → send to Login.
3. All API calls go through `src/api`. That file adds the token. If the server says “unauthorized”, **that file** refreshes the token once. Pages do not each write this.
4. Show/hide Edit with `user.canEdit` from session — do not paste `if (role === 'admin')` in 40 files.

---

**4. API integrations**

Every screen: `api.get('/orders')`. Not a new `fetch('https://...')` in each file.

That one helper also:
- stops the request if the user left the page
- if Header and Dashboard both need `/me`, only **one** network call
- shows a toast on error in one place

---

**5. Reusable components**

- One `DataTable({ columns, rows })` for users, orders, invoices — not three tables
- App layout: `{children}` so clicking a sidebar number does not rebuild the big page
- Do **not** put user + theme + cart + filters in **one** Context. A change in filters would re-render the whole app.

Load Orders JS only when the user opens Orders:

```js
const OrdersPage = React.lazy(() => import("./orders/OrdersPage"));
```

---

**Say this to close**

“I’d keep each product area in its own folder, put only the logged-in user in a global store, run login and HTTP through one gate, load extra screens when you open them, and share one table component. That way ten teams can ship without stepping on each other.”

1. Design Tokens
2. Reusable Components (story book)
3. Composition pattern

2️⃣ React Internals
What actually happens when state changes in React? Explain the flow through reconciliation → Fiber → render phase → commit phase → DOM update.

Ans.

https://www.youtube.com/watch?v=i793Qm6kv3U

https://www.youtube.com/watch?v=OQYsHvEq7nE&list=PLC3y8-rFHvwg7czgqpQIBEAHn8D6l530t

https://www.youtube.com/watch?v=MPCVGFvgVEQ

https://github.com/acdlite/react-fiber-architecture

https://www.youtube.com/watch?v=YP2f-ErXG_M&list=PLC3y8-rFHvwg7czgqpQIBEAHn8D6l530t&index=1

Reconciliation = the job: compare old tree vs new tree, decide create / update / delete.

Fiber = how React does that job now. Not a wrapper that calls some other tool.

“Reconciliation is what. Fiber is how (the current implementation of that algorithm).”

One sentence: The Fiber reconciler is React’s current implementation of the reconciliation algorithm; it runs on Fiber nodes.


REACT FIBRE: The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.
Other key features include the ability to pause, abort, or reuse work as new updates come in; the ability to assign priority to different types of updates; and new concurrency primitives.

JOB: 
pause work and come back to it later.
assign priority to different types of work.
reuse previously completed work.
abort work if it's no longer needed.

Fiber reimplements the reconciler — the part that walks the tree, diffs, and decides what to update.

reconciliation
The algorithm React uses to diff one tree with another to determine which parts need to be changed.

1. Fiber is the reconciler.
There is not “Fiber, then a separate reconciler.” Fiber is the new reconciler. Same job as before (walk tree, diff), new engine that can pause.

2. You don’t hand a diff to ReactDOM.
React’s Fiber work calls the renderer. react-dom is the host that knows document.createElement, textContent, etc. You never pass a “diff object” yourself.

Click → screen updates

setState — state is 1 in memory. Screen still 0. React marks that fiber dirty and schedules work.

Render phase (Fiber reconciler) — can pause (React 18 concurrent).
Re-runs your component. Builds a new tree of fibers. Diffs old fiber vs new. Writes a list of effects: “this text node: 0 → 1.”
Still no real DOM change. Screen still 0.

Commit phase — cannot pause.
Fiber walks that effect list and asks react-dom: update this DOM node.
Now the real DOM is 1. Then the browser paints.

So: Fiber decides what changed. react-dom applies it. The browser paints.

“Virtual DOM is what we compare. Fiber is how React schedules that comparison so it can pause. Fiber replaced the stack reconciler, not the virtual DOM.”

Fiber = a data structure — one JS object per component (the unit of work).

The algorithm is reconciliation (how to diff old vs new).

The Fiber reconciler is the code that runs that algorithm on Fiber objects.

Watch these (better than notes):

- **Must:** https://react.dev/learn/render-and-commit — official, 10 min read, same words as the question
- **Fiber cartoon (best video):** https://www.youtube.com/watch?v=ZCuYPiUIONs — Lin Clark, React Conf. Fiber = pause work. That’s the whole point.
- **You already have:** https://www.youtube.com/watch?v=i793Qm6kv3U
- Extra: https://www.developerway.com/posts/react-re-renders-guide

---

**30-second answer (memorize this)**

“`setState` does not edit the page. React first **re-runs my component** (render). It **diffs** the old tree vs the new tree on **Fibers** — that’s reconciliation. Then in **commit** it copies only the diff onto the **DOM**, then the browser paints. Fiber is just React’s JS object per component so it can pause that thinking. Re-render ≠ rebuild the whole HTML.”

---

**2-minute version with the click**

```js
<button onClick={() => setCount(count + 1)}>{count}</button>
```

Screen shows `0`. You click.

| Step | Their word | What happens | Screen |
|---|---|---|---|
| 1 | state change | `count` becomes 1 in memory. Component marked dirty. | still `0` |
| 2 | Fiber | React’s private tree: one JS object for Counter, one for button. | still `0` |
| 3 | render phase | React **calls** `Counter()` again. Gets `<button>1</button>`. | still `0` |
| 4 | reconciliation | Diff: same `<button>`, only the **text** changed. Plan: “edit text node”. | still `0` |
| 5 | commit + DOM update | React writes `"1"` into the real DOM. Then paint. | now `1` |

Render/reconcile = **thinking** (can pause in React 18).  
Commit/DOM = **doing** (cannot pause, or you’d see a broken page).

Same type (`button` → `button`) → update in place.  
Type change (`button` → `p`) → throw away, create new.

---

**Say this to close**

“Notebook then house. Fiber/render/reconcile = notebook. Commit/DOM = builders update the house. That’s why a re-render is cheap compared to innerHTML on the whole page.”


3️⃣ React Performance
A page renders thousands of records and becomes slow during filtering and state updates. How would you identify the bottleneck and optimize it?

Ans.

**30-second answer (memorize this)**

“I’d profile first. Slow filter+list is usually (1) JS work on every keystroke and (2) React committing thousands of DOM nodes. Confirm with React Profiler: which components, how long is commit. Then: debounce or `useDeferredValue` on the query, filter in a cheaper place, **virtualize** the list so only visible rows mount, keep filter state out of a parent that re-renders every row. Memo only if Profiler still shows wasted row renders.”

---

**Identify**

| Tool | What you’re checking |
|---|---|
| React Profiler | Record a filter keystroke. Long **commit** = too many nodes. Yellow parent + all children = state too high. |
| Highlight updates | Whole table flashing on each letter → that’s the bug. |
| Chrome Performance | Long task on main thread → `filter`/`map` on 10k items every keypress, not just React. |

Typical split:

- **JS:** `records.filter(...)` on every `onChange` (10k items × every letter).
- **React:** 10k row components + 10k DOM nodes on every state update (Fiber has to walk them; commit has to touch them).
- **Layout:** browser reflow on a huge table.

---

**Optimize** (say in this order)

1. **Virtualize** — `react-window` / `@tanstack/react-virtual`. 10k rows → ~20 in the DOM. This is the real fix for “thousands of records.”
2. **Don’t re-render the world** — search input state in the input (or `children` pattern), not in a parent that owns every row.
3. **Make the filter cheap** — debounce 200ms, or `useDeferredValue(query)` / `startTransition` so typing stays snappy and the list catches up.
4. **`React.memo` on `Row`** + stable `key={id}` — only if Profiler shows rows re-rendering with the same data. Not the first move.
5. **Don’t** `filter` inside render of a giant parent if you can memoize the result (`useMemo`) once the query is deferred.

---

**Say this to close**

Wrong: “I’d wrap everything in `memo` and `useCallback`.”  
Right: “Profile → too many DOM nodes → window the list; too much work per keystroke → defer the filter.”


4️⃣ Redux Toolkit — Internal Working
You mentioned Redux Toolkit. Explain the complete flow:
dispatch → middleware → reducer → store update → subscription → component re-render

Add API call in projects create already?



5️⃣ Real-World Redux Design
For an enterprise application with authentication, user data, filters, pagination, and API data, what should be stored in Redux and what should remain local component state?

Ans.

**30-second answer (memorize this)**

“Redux is for state many screens need, that must survive navigation, or that is shared + cached. Auth and the current user go in the store. API lists I’d rather keep in RTK Query cache, not a hand-written slice. Filters/pagination: global if the URL or other pages must see them; local if only this table cares. Form inputs, modals, hover, ‘is this dropdown open’ stay in the component.”

---

| In Redux (or RTK Query cache) | Local component state |
|---|---|
| Auth token / session, current user, roles | Input while typing, `isOpen`, hover |
| Data several routes need (cart, feature flags) | One-page UI, a single modal |
| Server lists — prefer **RTK Query**, not a giant `items` slice | Derived UI (`filtered = items.filter(...)` in render) |
| Filters/pagination if they are **shared or in the URL** | Filters/pagination if **only this table** uses them |

Rule: if losing it on unmount is fine → local. If two components would otherwise prop-drill or refetch blindly → store / RTK Query.

Don’t dump the whole app in Redux. Don’t keep the JWT only in a child button either.

---

**Say this to close**

“Shared + durable → Redux. Server cache → RTK Query. Ephemeral UI → `useState`.”

6️⃣ 🔥 Coding Challenge — Build Redux Using JavaScript
Implement a simplified Redux-like state management system using plain JavaScript with:
• Store
• Reducer
• Dispatch
• Subscribe
• State updates
• Unsubscribe
Then explain how the implementation maps to the actual Redux architecture.


7️⃣ JavaScript Deep Dive
Given synchronous code, Promises, queueMicrotask, setTimeout, and other async operations, predict the exact execution order and explain the event loop.

IGNORE


8️⃣ API Architecture
Multiple components request the same API simultaneously. How would you handle request deduplication, caching, cancellation, race conditions, errors, and stale responses?

Ans.

https://www.youtube.com/watch?v=NxAwOjb_NlA

**Watch / read (mapped to the question)**

Dedupe + cache:
- https://redux-toolkit.js.org/tutorials/rtk-query — same query, many components → one HTTP call (check Network)
- https://redux-toolkit.js.org/rtk-query/usage/cache-behavior — why that happens
- https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
- https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced — tags / invalidate after save (stale)

Videos:
- https://www.youtube.com/watch?v=LDS1ll93P-s — Jack Herrington, RTK Query vs React Query
- https://egghead.io/courses/rtk-query-basics-query-endpoints-data-flow-and-typescript-57ea3c43 — creator of RTK Query
- https://www.youtube.com/watch?v=c4vuAwgpDEw — caching / refetch

Cancel + race:
- https://developer.mozilla.org/en-US/docs/Web/API/AbortController
- https://react.wiki/hooks/fetching-api-best-practice/

Stale / cache mindset (React Query, same ideas):
- https://tkdodo.eu/blog/practical-react-query

For Oracle: do the RTK tutorial (#1) + Jack’s video. Skim AbortController for the whiteboard.

---

### What they’re looking for

Not “did you memorize RTK Query.” They’re checking: **do you understand what breaks when every component owns its own `fetch`?**

A senior answer:

1. Name the **failure modes** (double fetch, late response wins, setState after unmount, refetch on every remount, error that nukes global state).
2. Describe a **shared request layer** keyed by endpoint + args — not five `useEffect`s.
3. Name a **real tool** (RTK Query / TanStack Query) — and sketch the same idea on a whiteboard without it.

“I’d use Axios interceptors” alone is mid. Cache + in-flight map + abort + invalidate is the job.

---

### The normal flow (and why it sucks)

```js
function UserCard({ id }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then(setUser)
  }, [id])
  return <div>{user?.name}</div>
}
```

Two `<UserCard id={1} />` → **two HTTP calls** for the same resource. Remount → fetch again. Change `id` 1→2 fast → response for 1 can land **after** 2 and overwrite the UI. Leave the page → `setUser` may still run. Save user → other screens still show old data until hard refresh.

That’s not “React is slow.” That’s **no shared ownership of server state**.

---

### Terms

| Term | Meaning |
|---|---|
| **Deduplication** | Same key in flight → reuse one Promise / one HTTP call. Second subscriber joins the first. |
| **Cache** | After success, keep `{ data, status, error }` by key (`users/1`). Remount can read cache instead of refetching blindly. |
| **Cancellation** | Request no longer needed (unmount / new args) → `AbortController.abort()`. Avoids writing into a dead component. |
| **Race condition** | Older request finishes after a newer one. Fix: abort previous, or ignore if `requestId !== latest`. |
| **Stale** | Cache is old vs server (e.g. after a mutation). Fix: invalidate / refetch / tags — often still **show** cached data while refreshing. |
| **Server state vs client state** | User from API = server state (shared, async). `isModalOpen` = client state (`useState`). Don’t dump both into one messy slice. |

---

### What RTK Query is / why it’s needed

**RTK Query** = data-fetching + caching layer **inside Redux Toolkit**. Not a replacement for Redux for counters/auth UI prefs — a replacement for hand-rolled thunks + `loading`/`error`/`data` slices for **server data**.

You declare endpoints once; components use `useGetUserQuery(1)`. Under the hood:

- cache key from endpoint + args  
- **de-dupes** concurrent identical queries  
- stores result in the Redux store  
- **aborts** when last subscriber leaves / args change  
- per-query `isLoading` / `isError` / `data`  
- after mutations, **`invalidateTags`** so related queries refetch  

TanStack Query does the same job **outside** Redux. Same interview answer: **shared cache keyed by query, not fetch-in-every-component.**

Why needed: these are **system** problems. Copy-pasting `useEffect`+`fetch` invents a worse RTK Query with bugs.

Whiteboard without a library:

```js
const inflight = new Map() // key → Promise
// same key → return existing Promise
// AbortController per request
// if (id !== latestId) return  // before setState
```

Then: “In production I’d use RTK Query so I’m not maintaining that Map.”

---

### Map to the question

| They say | You say |
|---|---|
| Deduplication | One in-flight request per cache key; both components subscribe. |
| Caching | Result in query cache; remount ≠ always network. |
| Cancellation | Abort on unmount / arg change. |
| Race | Only latest request may commit; abort or drop stale. |
| Errors | Per-query error; don’t wipe the whole app store. |
| Stale | Invalidate after mutation; cached UI + background refetch when it fits. |

---

### Just say this

“Two widgets both need user 1. If each one `fetch`es, that’s two HTTP calls, and they can come back in the wrong order.

I’d put that behind RTK Query / React Query. Same endpoint, same id → **one** request, both wait on it. When it lands, it stays in a cache, so leaving and coming back doesn’t hit the network for no reason.

If they leave the page, **abort** the call. No `setState` on a component that’s gone.

Race: they open user 1, then immediately user 2. User 1’s response arrives last — I throw that away. Only the **latest** request writes.

Error is ‘this query failed’ on that screen, not nuke the whole store.

Stale: after they save, invalidate that cache. Until then I can show old data instead of a blank spinner.

I wouldn’t build a `Map` of Promises by hand in an Oracle app. That’s what the library is for. Whiteboard: one in-flight Promise per key, abort on unmount, ignore if `id` changed.”

**Close:** “Each component fetching is the bug. API data is a shared cache with dedupe, abort, and invalidation — RTK Query or React Query — not five independent `useEffect`s.”

9️⃣ Production Debugging
A React application becomes significantly slower in production. How would you identify the root cause using React profiling and browser debugging tools?

🔟 Frontend System Design
Design a large-scale enterprise frontend covering state management, API architecture, authentication, caching, performance, code splitting, observability, and scalability.

💡 Overall Takeaway
The interview was less about memorizing React concepts and more about:
“Do you understand what happens underneath React, JavaScript, and Redux — and can you apply that knowledge to production-scale systems?”
The most interesting part for me was the Redux-from-scratch JavaScript challenge.










The most interesting part for me was the Redux-from-scratch JavaScript challenge.

Definitely a strong learning experience. 🚀

#ReactJS #FrontendDevelopment #JavaScript #ReduxToolkit #SoftwareEngineering #InterviewExperience #ReactInterview #React.js