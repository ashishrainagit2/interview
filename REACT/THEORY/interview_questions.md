⚛️ React
✅ When does a React component re-render?

https://www.youtube.com/watch?v=AwW7olQ84Qs
https://www.joshwcomeau.com/react/why-react-re-renders/

✅ What are the different ways to prevent unnecessary re-renders?

FROM AI:
React re-renders when state or props change, or when a parent re-renders. Not every re-render is bad — only optimize when you’ve measured a real problem. Here are the main ways to avoid unnecessary re-renders:

1. Fix the root cause first
Often the best fix isn’t memoization — it’s not triggering extra updates:

Don’t put unrelated state in the same component — split so only the part that changes re-renders.
Avoid creating new objects/functions in render when passing them as props (see #3).
Colocate state — keep state as low in the tree as possible.
Use keys correctly — wrong keys cause remounts and extra work.

2. React.memo (memoize components)
Wrap a component so it skips re-render if props are shallow-equal:

const UserCard = React.memo(function UserCard({ name, age }) {
  return <div>{name}, {age}</div>;
});

Use when:

Component re-renders often with the same props
Render is moderately expensive
Custom comparison (optional):

React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // true = skip re-render
});

3. Stable references: useCallback & useMemo
Parent re-renders create new function/object references every time, which breaks React.memo.

Parent re-renders create new function/object references every time, which breaks React.memo.

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

const config = useMemo(() => ({ theme, size }), [theme, size]);

<Child onClick={handleClick} config={config} />

useCallback — stable function reference
useMemo — stable object/array/computed value
Don’t overuse these — they have their own cost.

4. Split context to avoid broad subscriptions
Context updates re-render every consumer of that context.

Bad: one giant context with { user, theme, cart }
Better: separate contexts, or split provider value:

const UserContext = createContext();
const ThemeContext = createContext();

Also consider:

use-context-selector (library) for selective subscriptions
Passing props / composition instead of context when possible

5. Composition / children pattern
Pass static JSX as children so the parent doesn’t force child re-renders:

function Layout({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {children} {/* doesn't re-render when count changes */}
    </div>
  );
}

// Usage
<Layout>
  <ExpensiveTree />
</Layout>

ExpensiveTree is created outside Layout, so it isn’t re-created on each Layout render.

6. State colocation & lifting state down
Instead of one parent holding all state:

// Bad: typing in Search re-renders entire page
function Page() {
  const [query, setQuery] = useState('');
  return (
    <>
      <Search query={query} setQuery={setQuery} />
      <HeavyList />
    </>
  );
}

// Better: state lives inside Search
function Page() {
  return (
    <>
      <Search />
      <HeavyList />
    </>
  );
}

7. External stores (when appropriate)
For global state that many components read, libraries like Zustand, Jotai, or Redux with selectors let components subscribe to slices of state instead of re-rendering on every store change.

8. Virtualization for long lists
For large lists, don’t render 10,000 items — use react-window or react-virtualized so only visible rows render.

9. Lazy loading & code splitting
React.lazy + Suspense doesn’t stop re-renders, but reduces work by not mounting heavy subtrees until needed.

10. Avoid inline object/array props
// Creates new object every render → breaks memo
<Child style={{ color: 'red' }} />

// Better
const style = useMemo(() => ({ color: 'red' }), []);
// Or define outside component if static
const style = { color: 'red' };

Quick decision guide


Situation	                                        Tool
Child re-renders with same props                    React.memo
Passing callbacks/objects to memoized child         useCallback / useMemo
Context causes whole tree updates                   Split context / selectors
Parent state changes unrelated children          Composition / colocate state
Huge lists                                       Virtualization
Expensive computation                            useMemo

Important caveats (good for interviews)
Measure first — React DevTools Profiler, why-did-you-render, etc.
memo / useMemo / useCallback aren’t free — only use when benefit > cost.
Shallow comparison — React.memo won’t help if you pass new object/array references every time.
React 18+ — automatic batching reduces some unnecessary renders from multiple setState calls.
Server Components (React 19 / Next.js) — move non-interactive UI to the server so it never re-renders on the client.

One-line interview answer
Prevent unnecessary re-renders by colocating state, splitting context, using composition, and memoizing components (React.memo) with stable props via useCallback/useMemo — but only after profiling shows a real problem.

https://www.youtube.com/watch?v=zJdZ9o2Pc-A


✅ useEffect vs useLayoutEffect

https://www.youtube.com/watch?v=E6nr6zRcN3w
https://www.youtube.com/watch?v=pHxQtHwcT-s

✅ Controlled vs Uncontrolled Components


✅ How would you optimize a large React application and improve its performance?

FROM AI:
This is a broader interview question than "prevent re-renders." Interviewers want a structured, end-to-end approach: measure first, then optimize loading, runtime, network, and architecture.

Interview framework: Measure → Diagnose → Fix → Verify

Always start here:
1. Profile — React DevTools Profiler, Chrome Performance tab, Lighthouse, Web Vitals (LCP, INP, CLS)
2. Identify the bottleneck — slow initial load? janky interactions? huge bundle? API waterfalls?
3. Fix the biggest issue first — don't sprinkle memo everywhere without data

"I'd profile first, fix the highest-impact bottleneck, and re-measure."

1. Initial load & bundle size
How fast the app first loads matters most for large apps.

Code splitting — React.lazy() + Suspense — load routes/features on demand
Route-based splitting — Each page = separate chunk (Next.js does this automatically)
Tree shaking — Import only what you need: import debounce from 'lodash/debounce'
Analyze bundle — webpack-bundle-analyzer, Vite visualizer — find heavy deps
Replace heavy libraries — e.g. moment → dayjs, full lodash → individual functions
Dynamic imports — Load charts, editors, PDF viewers only when needed
Compression — Gzip/Brotli on the server
CDN — Serve static assets from edge locations
Preload / prefetch — <link rel="preload"> critical assets; prefetch next likely route

const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>

2. Rendering performance (runtime)
What happens after the app is loaded.

Reduce unnecessary work:
- Colocate state — keep state close to where it's used
- React.memo — skip re-renders when props unchanged
- useCallback / useMemo — stable references for memoized children
- Split Context — avoid one giant provider re-rendering the whole tree
- Composition pattern — pass static children to isolate updates

Handle expensive UI:
- Virtualize long lists — react-window, TanStack Virtual (render only visible rows)
- Debounce/throttle — search inputs, scroll/resize handlers
- startTransition — mark non-urgent updates (filtering large lists) as low priority
- useDeferredValue — defer expensive renders while typing

const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);

const filtered = useMemo(
  () => hugeList.filter(item => item.name.includes(deferredQuery)),
  [deferredQuery]
);

Avoid common mistakes:
- Inline objects/functions as props → breaks memoization
- Wrong key props → unnecessary remounts
- Rendering thousands of DOM nodes without virtualization

3. Data fetching & network
Often the real bottleneck in large apps.

Parallel requests — Don't waterfall APIs — fetch independent data together
Caching — React Query / SWR / RTK Query — cache, dedupe, background refetch
Pagination / infinite scroll — Don't load 10,000 records at once
Optimistic updates — Update UI before server responds
Stale-while-revalidate — Show cached data instantly, refresh in background
Request deduplication — Same request in flight? Share one promise
GraphQL / field selection — Fetch only fields you need

// Bad: waterfall
const user = await fetchUser(id);
const posts = await fetchPosts(user.id);

// Good: parallel
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
]);

4. Architecture & state management
Large apps need clear boundaries.

Feature-based folder structure — colocate components, hooks, API logic per feature
Smart vs dumb components — containers fetch/manage state; presentational components just render
Global state only when needed — URL state, local state, and server cache before Redux
Selectors — Redux/Zustand selectors so components subscribe to slices, not the whole store
Server state vs client state — React Query for server data; Zustand/Context for UI state

5. Images & assets
Lazy load images — loading="lazy", Intersection Observer
Modern formats — WebP/AVIF instead of PNG/JPG
Responsive images — srcset for different screen sizes
SVG for icons — or an icon sprite; avoid icon font bundles
Optimize images — compress before deploy (Sharp, Squoosh)

6. SSR, SSG & React Server Components
For large apps, move work off the client:

SSR (Next.js) — SEO, faster first paint, dynamic data
SSG — Static pages (docs, marketing)
ISR — Static + periodic revalidation
RSC (React 19 / Next.js App Router) — Non-interactive UI rendered on server — zero client JS for that tree

Benefits: smaller client bundle, faster FCP/LCP, better SEO.

7. Build & deployment
Production builds — minification, dead code elimination
Hash-based caching — app.[hash].js → long cache headers for static assets
Service workers / PWA — cache shell for repeat visits (careful with stale data)
HTTP/2 or HTTP/3 — multiplexed requests
Edge rendering — Vercel Edge, Cloudflare Workers for low-latency SSR

8. Web Workers
Offload CPU-heavy work off the main thread:
- Large JSON parsing
- Image processing
- Complex filtering/sorting of big datasets

Keeps the UI thread free → better INP (Interaction to Next Paint).

9. Error boundaries & graceful degradation
Not pure "speed," but important at scale:
- Error boundaries prevent one broken widget from crashing the whole app
- Skeleton loaders / suspense fallbacks improve perceived performance

10. Monitoring in production
Optimize with real user data:
- Web Vitals — LCP, INP, CLS via web-vitals library
- Sentry / Datadog RUM — errors + performance in prod
- Custom marks — performance.mark() around critical flows

Sample interview answer (2–3 min)

> For a large React app, I'd start by measuring with Lighthouse, Web Vitals, and the React Profiler to find whether the problem is load time, render time, or network.
>
> For load time: code-split by route with React.lazy, analyze the bundle, tree-shake imports, lazy-load heavy libraries, compress assets, and use a CDN.
>
> For runtime: colocate state, use React.memo and virtualization for long lists, split Context, and use useDeferredValue / startTransition for expensive updates — but only where profiling shows a problem.
>
> For data: use React Query or SWR for caching and deduplication, parallelize API calls, paginate large datasets.
>
> Architecturally: feature-based structure, server state separate from UI state, and where possible SSR/RSC to reduce client JS.
>
> Then I'd re-measure in production with real user monitoring to confirm the fix.

Quick checklist (memorize for interviews)

□ Profile first (Lighthouse, React Profiler, Web Vitals)
□ Code split routes & heavy features
□ Analyze & reduce bundle size
□ Cache & dedupe API calls (React Query/SWR)
□ Virtualize long lists
□ Colocate state, split context
□ Memoize only where measured (memo, useMemo, useCallback)
□ Optimize images & lazy load
□ SSR/SSG/RSC where appropriate
□ Monitor in production

How this differs from "prevent re-renders"

Re-renders question          | Large app optimization
Runtime only                  | Load + runtime + network + architecture
Component-level               | App-wide strategy
memo, useCallback             | Code splitting, caching, SSR, CDN, monitoring

One-line interview answer
Profile first, then optimize load time (code splitting, bundle size), runtime (colocate state, memoization, virtualization), and network (caching, parallel requests) — with SSR/RSC and production monitoring for large apps.

✅ Explain the complete Authentication Flow in a React application:
- Login flow
- Token storage
- Best practices
- Security considerations
- Follow-up questions on implementation

✅ Explain redux with example?

✅ Have you used Redux Toolkit?
- What problem does it solve?
- How does it work?
- When should you use it?
- Why Redux Toolkit over traditional Redux?
