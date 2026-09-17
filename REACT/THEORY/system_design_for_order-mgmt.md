# System Design — Order Management (React)

**The app:** Login → Order list → Order detail → Create / edit order → Settings.  
Many users, big tables, filters, roles (admin / support / viewer).

---

## 30-second answer

“Order mgmt is mostly **read-heavy lists + occasional writes**. I’d split by feature folder, put **auth + session** in global state, fetch orders through **one API layer with cache**, lazy-load heavy screens, virtualize the table, and role-gate actions at the route + UI level.”

---

## 1. Folder structure (modules)

```
src/
  auth/           login, logout, PrivateRoute
  orders/         list, detail, create — pages + order hooks only
  settings/       user prefs
  api/            one HTTP client (token, errors, abort)
  store/          Redux — auth + maybe filters if shared across routes
  ui/             Button, Modal, DataTable — no business logic
```

- Orders team owns `src/orders/` — not a giant `components/` dump.
- Shared table lives in `ui/` — orders pass `columns` + `rows`.

---

## 2. State — what goes where

| In Redux / RTK Query | Local `useState` |
|---|---|
| Logged-in user, roles, token | Search text while typing |
| Order list cache (RTK Query) | Modal open / closed |
| Filters if URL + list page share them | Pagination if only this table cares |
| Selected order id (if many screens need it) | Form field focus |

- **Don’t** put “search box text” in Redux — whole app re-renders on every key.
- **Do** use RTK Query for `GET /orders`, `GET /orders/:id` — dedupe + cache.

---

## 3. Authentication

1. Login → save session (token + user + roles).
2. `PrivateRoute` on `/orders/*` — no session → redirect login.
3. **One** `api` file adds token to every request.
4. 401 → refresh token once in `api` — not in every page.
5. Hide “Cancel order” button with `user.canCancel` — not `if (role === 'admin')` in 20 files.

---

## 4. API architecture

```
OrdersPage ──┐
OrderDetail ─┼──► api.get('/orders')  or  useGetOrdersQuery()
Header badge ─┘         │
                        ├── dedupe (same URL → one call)
                        ├── cache (back from detail → no blind refetch)
                        ├── abort on unmount
                        └── toast on error in one place
```

- **List:** `GET /orders?page=1&status=shipped`
- **Detail:** `GET /orders/:id`
- **Write:** `POST /orders`, `PATCH /orders/:id/cancel`
- After cancel → **invalidate** list + detail tags (stale data fixed).

---

## 5. Caching & stale data

- Show cached list while refetching (no blank flash).
- After user cancels order → invalidate `Orders` tag → list refreshes.
- Detail page open + background poll every 30s only if order status is `processing` (not for `delivered`).

---

## 6. Performance

- **Virtualize** order table (`react-window`) — 10k rows, only ~20 DOM nodes.
- **Debounce** search or `useDeferredValue` on filter.
- **Lazy load** routes:

```js
const OrdersPage = React.lazy(() => import('./orders/OrdersPage'))
const OrderDetail = React.lazy(() => import('./orders/OrderDetail'))
```

- Colocate state — filter state inside list, not in App.
- `React.memo` on row **only if** Profiler shows wasted renders.

---

## 7. Code splitting

| Route | Load when |
|---|---|
| Login | initial (small) |
| Dashboard shell | after auth |
| Orders list | user opens `/orders` |
| Order detail | user opens `/orders/123` |
| Admin reports | role = admin only |

Heavy chart libs → dynamic import inside that page only.

---

## 8. Observability

- **Errors:** Sentry (or similar) — which route, user id, API status.
- **Perf:** Web Vitals (LCP, INP, CLS) on list + detail.
- **API:** log slow requests (>2s) from the central `api` client.
- Feature flags for “new order flow” rollout.

---

## 9. Scalability (teams + product)

- Feature folders → teams ship without merge wars.
- Design tokens + shared `ui/` → one look, many modules.
- API contract (OpenAPI / typed client) → frontend not guessing shapes.
- Role-based routes + components → same app, different power users.

---

## Flow (one picture)

```
Login → token in store
          │
          ▼
    PrivateRoute (/orders)
          │
          ▼
    OrdersPage ──RTK Query──► GET /orders (cached)
          │                        │
          │ click row              │
          ▼                        ▼
    OrderDetail ◄── GET /orders/:id
          │
          │ Cancel
          ▼
    PATCH + invalidate cache → list updates
```

---

## Close (say this)

“Orders is list-heavy: shared API layer with cache, auth at the gate, lazy routes, virtual table, invalidate after writes. Global store only for session and shared server cache — not every keystroke.”
