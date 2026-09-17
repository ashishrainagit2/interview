Local Storage vs Session Storage vs Cookies

https://www.youtube.com/watch?v=MOd5cTJ6kaA

✅ Local Storage (localStorage)
Data persists after the browser/tab is closed
Same origin only (protocol + domain + port)
Shared across all tabs/windows from the same origin
~5–10 MB limit (varies by browser)
Never expires — cleared only by user or code

localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');   // 'dark'
localStorage.removeItem('theme');
localStorage.clear();

✅ Session Storage (sessionStorage)

Data cleared when the tab/window closes
Same origin only
Isolated per tab — Tab A can’t see Tab B’s sessionStorage
~5–10 MB limit
Survives page refresh within the same tab

sessionStorage.setItem('step', '2');
sessionStorage.getItem('step');   // '2'

✅ Cookies

Small text files sent with every HTTP request to the server
~4 KB limit per cookie
Can set expiry — session cookie (until tab closes) or persistent cookie (with Expires / Max-Age)
Accessible from JavaScript (document.cookie) unless marked HttpOnly
Can be shared across subdomains (via Domain attribute)
Sent automatically to server — useful for auth sessions

document.cookie = "theme=dark; max-age=86400; path=/; SameSite=Lax";
document.cookie = "sessionId=abc123; HttpOnly; Secure; SameSite=Strict"; // set by server


Quick comparison

| Feature          | localStorage              | sessionStorage        | Cookies                          |
| :--------------- | :------------------------ | :-------------------- | :------------------------------- |
| Lifetime         | Until manually cleared    | Until tab closes      | Set via Expires / Max-Age        |
| Scope            | All tabs, same origin     | One tab only          | Domain + path configurable       |
| Capacity         | ~5–10 MB                  | ~5–10 MB              | ~4 KB per cookie                 |
| Sent to server   | No                        | No                    | Yes, on every request            |
| JS accessible    | Yes                       | Yes                   | Yes (unless HttpOnly)            |
| Refresh          | Data stays                | Data stays            | Data stays                       |
| New tab          | Same data visible         | Empty (new session)   | Same data visible (if persistent)|
| Storage type     | String only               | String only           | String only                      |


localStorage / sessionStorage API — SAME for both

Both implement the Web Storage `Storage` interface.
Same method names, same arguments. Only lifetime + tab scope differ.

| Method              | What it does                              | Returns              |
| :------------------ | :---------------------------------------- | :------------------- |
| `setItem(key, value)` | Save a string under a key               | `undefined`          |
| `getItem(key)`        | Read value for that key                 | string, or `null`    |
| `removeItem(key)`     | Delete one key                          | `undefined`          |
| `clear()`             | Delete ALL keys in that store           | `undefined`          |
| `key(index)`          | Get the key name at position `index`    | string, or `null`    |
| `length`              | How many keys are stored (property)     | number               |

```js
// Same API — only the store name changes
const store = localStorage;
// const store = sessionStorage;

store.setItem("theme", "dark");
store.getItem("theme");       // "dark"
store.removeItem("theme");    // that key gone
store.clear();                // everything in THIS store gone

store.setItem("a", "1");
store.setItem("b", "2");
store.length;                 // 2
store.key(0);                 // "a" or "b" (order is not guaranteed)
store.getItem("missing");     // null  — not undefined
```

```js
// sessionStorage — identical calls, data dies when this tab closes
sessionStorage.setItem("step", "2");
sessionStorage.getItem("step");       // "2"
sessionStorage.removeItem("step");
sessionStorage.clear();
sessionStorage.length;
sessionStorage.key(0);
sessionStorage.getItem("missing");    // null
```

Values must be strings. Objects need JSON:

```js
localStorage.setItem("user", JSON.stringify({ name: "Amit", age: 28 }));
JSON.parse(localStorage.getItem("user"));  // { name: "Amit", age: 28 }
```

Gotchas
- `clear()` on `localStorage` does not touch `sessionStorage` (and vice versa)
- `getItem` missing key → `null` (so `JSON.parse(localStorage.getItem("x"))` can throw)
- Quota exceeded → `QuotaExceededError` (usually ~5–10 MB)
- Storage events: `window.addEventListener("storage", ...)` fires in OTHER tabs for `localStorage` only, not `sessionStorage`

Cookies API

document.cookie = "name=value; expires=...; path=/; domain=...; Secure; SameSite=Strict";
// No built-in remove — set expiry in the past or empty value

When to use what

| Use case                          | Use                              |
| :-------------------------------- | :------------------------------- |
| Theme, language preference        | `localStorage`                   |
| Form wizard step, temp UI state   | `sessionStorage`                 |
| Auth session / login token        | `HttpOnly` + `Secure` cookies    |
| Server needs data on every request| Cookies                          |
| Sensitive data                    | `HttpOnly` cookies (not storage) |

One-liner for interviews

localStorage = permanent, shared across tabs, client-only. sessionStorage = temporary, per tab, client-only. Cookies = small, sent to server every request, best for auth (use HttpOnly + Secure).

Why do we store auth data in cookie?

What auth cookies store, what theft means, and why cookies still win over localStorage for most auth.

What auth cookies actually store
Usually not your password or full user profile. They store a session identifier:

| Cookie type     | What's stored                              | Example                  |
| :-------------- | :----------------------------------------- | :----------------------- |
| Session cookie  | Random session ID                          | `sessionId=a8f3k2j9x1`   |
| JWT cookie      | Encoded token (user id, expiry, signature) | `token=eyJhbGciOi...`    |

The server maps that ID/token to the real user in a DB or by verifying the signature. The cookie is basically a key, not the vault.

// ❌ Never store this in a cookie (or anywhere client-side)
{ password: "123456", creditCard: "4111..." }

// ✅ Typical auth cookie
sessionId=abc123xyz   // server looks up user from this

What if a cookie is stolen?
The attacker can pretend to be you — that's session hijacking.

You:     Cookie: sessionId=abc123  →  Server: "Hello, Rahul"
Attacker steals abc123
Attacker: Cookie: sessionId=abc123  →  Server: "Hello, Rahul" 😬

They don't get your password directly, but they get your logged-in session until:

the session expires
you log out (server invalidates it)
the server detects suspicious activity

Why still use cookies instead of localStorage?

Because where you store the token matters as much as what you store.

The real enemy: XSS (Cross-Site Scripting)
If an attacker injects JavaScript into your site:

// Attacker's injected script can read:
localStorage.getItem('token')     // ✅ stolen easily
sessionStorage.getItem('token')   // ✅ stolen easily
document.cookie                   // ❌ blocked if HttpOnly

| Storage          | JS can read it? | XSS risk                          |
| :--------------- | :-------------- | :-------------------------------- |
| localStorage     | Yes             | High — any script can grab it     |
| sessionStorage   | Yes             | High                              |
| Cookie (default) | Yes             | High                              |
| HttpOnly cookie  | No              | Low — JS cannot access it         |

Why not other methods?

| Method                      | Problem                                                              |
| :-------------------------- | :------------------------------------------------------------------- |
| localStorage token          | Any XSS script reads it instantly                                    |
| sessionStorage token        | Same XSS problem, plus gone on tab close                             |
| Token in memory only        | Safer from XSS, but lost on refresh — bad UX unless you add refresh-token flow |
| JWT in Authorization header | Still need to store JWT somewhere client-side → back to localStorage problem |



Cookies win because you can combine:

HttpOnly — JS can't read it
Secure — HTTPS only
SameSite=Strict/Lax — blocks many CSRF attacks
Short expiry + refresh token — limits damage if stolen

Two attack types to know

| Attack                                              | Target                              | Cookie defense              |
| :-------------------------------------------------- | :---------------------------------- | :-------------------------- |
| XSS — malicious JS on your site                     | Steals token from storage           | HttpOnly blocks JS access   |
| CSRF — trick browser into sending cookie to server | Forges requests using your cookie   | SameSite, CSRF tokens       |

localStorage helps with neither. Cookies can defend against both.

Best practice flow (what companies actually do)

Login → Server creates session → Sets cookie:

Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600

Browser stores it → Sends automatically on every request
JavaScript never sees it → XSS can't easily steal it

For SPAs, a common pattern:

Access token — short-lived, in memory or HttpOnly cookie
Refresh token — HttpOnly cookie, long-lived, used to get new access tokens

One-liner for interviews
Auth cookies store a session ID or JWT, not passwords. If stolen, an attacker hijacks your session. We still prefer HttpOnly + Secure cookies over localStorage because XSS can't read HttpOnly cookies, while anything in localStorage is one getItem() away from theft. Cookies aren't perfect — use short expiry, HTTPS, and SameSite — but they're the safest default for browser auth.

