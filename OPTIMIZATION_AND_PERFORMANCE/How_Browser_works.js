// Video: https://www.youtube.com/watch?v=0IsQqJ7pwhw
// https://web.dev/articles/howbrowserswork

// Video By Semi colon guy
// https://www.youtube.com/watch?v=Tnp3yX9Z93Q
// https://www.youtube.com/watch?v=f8-m7zPzjJc
// https://www.youtube.com/watch?v=XXHtB_z0ehY

// | # | Technique | One-liner |
// | :--- | :--- | :--- |
// | 1 | **Minification** | Remove whitespace/comments to shrink file size and speed download. |
// | 2 | **Async/defer** | Download JS in parallel; `async` runs when ready, `defer` runs after HTML parse. |
// | 3 | **Content-encoding** | Compress responses with gzip/brotli so fewer bytes travel over the network. |
// | 4 | **Cache-control** | Tell browser/CDN how long to store a file before re-fetching it. |
// | 5 | **ETag** | File fingerprint — browser asks "changed?" server replies 304 or new file. |
// | 6 | **CDN** | Serve static assets from edge servers closer to the user. |
// | 7 | **Name mangling** | Shorten variable/function names in build output to reduce JS bundle size. |
// | 8 | **Media attribute** | Load non-critical CSS with `media="print"` so it doesn't block first render. |

// | # | Technique | One-liner |
// | :--- | :--- | :--- |
// | 9 | **Resource Hints** | `dns-prefetch`, `preconnect`, `preload` (current page), `prefetch` (next page asset), `prerender` (next page full render) — connect and fetch early. |
// | 10 | **Reflow** | Browser recalculates layout when geometry changes — expensive, minimize it. |
// | 11 | **Document Fragment** | In-memory DOM bucket — batch DOM updates, trigger one reflow instead of many. |
// | 12 | **Lazy Loading** | Load images/routes only when needed (e.g. scroll into view). |
// | 13 | **Code Splitting** | Split JS into smaller chunks loaded on demand instead of one huge bundle. |