/**
 * Web Performance Topic Tree (Interview Revision)
 * -----------------------------------------------
 */

// Web Performance
// ├── 1) User-Centric Metrics
// │   ├── Core Web Vitals
// │   │   ├── LCP (loading)
// │   │   ├── INP (responsiveness)
// │   │   └── CLS (visual stability)
// │   ├── Supporting Metrics
// │   │   ├── FCP
// │   │   ├── TTFB
// │   │   ├── TBT
// │   │   └── Speed Index
// │   └── Lab vs Field data (Lighthouse vs real users)
// │
// ├── 2) Network Performance
// │   ├── DNS, TCP, TLS, HTTP/2, HTTP/3
// │   ├── Caching (browser, CDN, server)
// │   ├── Compression (gzip, brotli)
// │   ├── Resource hints (preconnect, preload, prefetch)
// │   └── Reduce round trips / API optimization
// │
// ├── 3) Rendering Performance
// │   ├── Critical Rendering Path
// │   ├── DOM + CSSOM -> Render Tree
// │   ├── Layout, Paint, Composite
// │   ├── Reflow/Repaint triggers
// │   └── Minimize render-blocking resources
// │
// ├── 4) JavaScript Performance
// │   ├── Main thread blocking and long tasks
// │   ├── Code splitting / lazy loading
// │   ├── Tree shaking and dead code removal
// │   ├── Debounce / throttle heavy handlers
// │   └── Web Workers for CPU-heavy tasks
// │
// ├── 5) Asset Optimization
// │   ├── Image formats (WebP/AVIF), responsive images
// │   ├── Font loading strategy (preload, font-display)
// │   ├── CSS minification and critical CSS
// │   └── Bundle analysis and chunk optimization
// │
// ├── 6) Runtime UI Optimization
// │   ├── Avoid layout thrashing
// │   ├── Use transform/opacity for animations
// │   ├── Virtualize long lists
// │   └── Memoization where needed (React/useMemo/useCallback)
// │
// ├── 7) Monitoring and Tooling
// │   ├── Lighthouse
// │   ├── Chrome DevTools Performance tab
// │   ├── Web Vitals JS library
// │   ├── RUM (real user monitoring)
// │   └── Performance budgets in CI/CD
// │
// └── 8) Performance Strategy
//     ├── Define SLO/targets (e.g., LCP <= 2.5s p75)
//     ├── Measure baseline
//     ├── Prioritize biggest bottleneck
//     ├── Implement and validate
//     └── Continuously monitor regressions
