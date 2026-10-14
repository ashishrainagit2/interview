How do you fix react production only issue? Give answer point wise. Use diagram id necessary

1. Reproduce production, not localhost

Local is development. Prod is minified, NODE_ENV=production, no Strict Mode double-render, no webpack proxy.

npm run build && npm run preview

If it still fails here, it is a real prod bug. If it only fails on the server, it is deploy/env/cache.

2. Compare the three environments

Local (npm start)
  → Strict Mode, source maps, proxy, unminified
Build preview (npm run preview)
  → minified, prod React, still your machine
Real prod
  → HTTPS, env vars, CDN, service worker, Linux case-sensitive paths

3. Typical prod-only causes (say these first)

Env vars missing — VITE_* / REACT_APP_* not set on the host → API URL undefined

Dev proxy gone — /api works locally, 404/CORS in prod

Case-sensitive import — User.jsx vs user.jsx works on Mac, dies on Linux

Asset path — homepage / base wrong → white screen, chunk 404 after deploy
Old cache / service worker — user still runs the previous bundle


Hydration mismatch — SSR HTML ≠ first client render (Date.now(), window, random ids)

Minify / dead code — PropTypes stripped; if (process.env.NODE_ENV !== 'production') never runs


4. Debug when you cannot use the React overlay

Prod has no red box. Use:

Browser Network — failed JS chunks, API 4xx/5xx, CORS
Console + source maps (enable them on the build for this hunt)
Sentry / LogRocket — real stack traces
React Profiler only if it is slowness, not a crash


5. Fix in this order

Confirm with build && preview
Check env + API URL + CORS
Hard refresh / disable SW / cache-bust hashed filenames
Fix the actual bug (path, hydrate, missing env)
Re-deploy and verify in prod, not only locally

Interview line: “Dev and prod are different runtimes. I reproduce with a production build first, then I check env, proxy/CORS, case-sensitive paths, and cache before I touch React code.”

// STACK OVERFLOW
https://medium.com/@CodersWorld99/the-react-bug-that-crashed-our-production-app-in-2-sec-ed20a0be0a8f


### ROUTING ISSUE

he app worked on localhost and showed a white screen in production. React did not crash. One if was false, so the component returned null. Empty tree = blank page, no error.

What they did

They drove UI from the URL string, roughly:

if (window.location.pathname === "/dashboard") {
  return <Dashboard />;
}
return null;

Local

App lives at the root:

http://localhost:3000/dashboard
pathname → "/dashboard"   ✅ match

Production

App lives under a subpath (basename):

https://company.com/my-app/dashboard
pathname → "/my-app/dashboard"   ❌ not "/dashboard"

The condition fails → return null → white screen. No exception, so no overlay.

That is the same family as wrong homepage / base: the real URL is not /, it is /my-app/.

What useLocation() changes

React Router knows the basename. useLocation().pathname is the path inside the app, not the full browser path.

// Router
<BrowserRouter basename="/my-app">

// inside a page
const { pathname } = useLocation();
// still "/dashboard" even when the browser bar is /my-app/dashboard

window.location.pathname does not strip basename. Router location does.

Why “don’t return null from route-level components”

A route component that returns null looks like “the app died,” but React is fine. Better:

always render a layout / fallback
or use <Route path="dashboard" element={<Dashboard />} /> so the router decides, not a manual string check

Interview line: prod was hosted under /my-app. I compared window.location.pathname to "/dashboard", got a miss, returned null. useLocation() respects basename, so the check matches.

