// explain web vitals?

// Web Vitals are a set of metrics that measure the user experience of a website.
// https://developers.google.com/search/docs/appearance/core-web-vitals
// https://web.dev/articles/vitals
// https://developers.google.com/search/docs/appearance/core-web-vitals
//Purchesed roadside coder: https://learn.roadsidecoder.com/new-courses/1/content?activeTab=Content

// AI

/**
 * Core Web Vitals (CWV) — interview cheat sheet
 * ----------------------------------------------
 * Subset of Web Vitals that Google treats as key UX signals (field + lab).
 * Focus: loading, interactivity, visual stability.
 *
 * Official:
 * - https://web.dev/articles/vitals
 * - https://developers.google.com/search/docs/appearance/core-web-vitals
 *
 * Extra:
 * - Roadside Coder (your link): https://learn.roadsidecoder.com/new-courses/1/content?activeTab=Content
 */

// =========================
// 1) LCP — Largest Contentful Paint (LOADING)
// =========================
//
// What: Time until the largest visible content in the viewport is painted.
// Often: hero image, large text block, video poster.
// Good (75th percentile rule of thumb): <= 2.5s
//
// Improve:
// - Optimize images (size, format WebP/AVIF, responsive srcset)
// - Preload critical hero asset if needed
// - Faster server/TTFB, CDN, caching
// - Avoid huge render-blocking CSS above the fold
//
// Example: User sees the main product image appear — that paint moment is LCP.

// =========================
// 2) INP — Interaction to Next Paint (RESPONSIVENESS)
// =========================
//
// What: How fast the page responds to interactions (click, tap, keypress)
// across the page session — until the browser can paint the next frame.
// Replaced FID (First Input Delay) as the Core Web Vital for interactivity.
// Good (75th percentile rule of thumb): <= 200ms
//
// Improve:
// - Break up long JS tasks (yield to main thread)
// - Defer non-critical work
// - Avoid huge sync work in event handlers
// - Virtualize long lists, lazy load heavy widgets
//
// Example: Tap "Add to cart" — UI updates without feeling frozen.

// =========================
// 3) CLS — Cumulative Layout Shift (VISUAL STABILITY)
// =========================
//
// What: Unexpected layout movement while page loads (content jumps).
// Good (75th percentile rule of thumb): <= 0.1
//
// Improve:
// - Set width/height (or aspect-ratio) on images and embeds
// - Reserve space for ads/skeletons
// - Avoid inserting content above existing content without reserving space
// - Font: font-display, size-adjust, preload critical fonts
//
// Example: Button jumps down when an ad loads — bad CLS, mis-taps.

// =========================
// Quick interview summary
// =========================
//
// LCP  — "Did main content show fast?"
// INP  — "Does the page feel snappy when I use it?"
// CLS  — "Does the layout stay stable?"
//
// Note: Thresholds are assessed on real-user data (e.g. 75th percentile), not a single lab run.


// ========================
// ========================
// ========================
// LCP: Large Contentful Paint

// LCP: https://web.dev/articles/lcp
// Largest Contentful Paint

// VERY IMP IMP
// Officiial video: https://www.youtube.com/watch?v=480m72yjZv8


// This video from Google Search Central provides a comprehensive guide on understanding and improving Largest Contentful Paint (LCP), a core web vital that measures perceived load speed.

// What is Largest Contentful Paint (LCP)?
// Definition: LCP measures the time from when the page first starts loading to when the largest image or text block within the viewport is fully rendered [04:10].

// The Goal: Aim for an LCP of 2.5 seconds or less for at least 75% of page visits [05:38].

// User Perception: Unlike older metrics (like onload), LCP focuses on when a user perceives the page is actually useful [02:10].

// How to Improve LCP
// The video categorizes improvements into three main areas:

// 1. Server & Network Optimization
// Server Speed: Reduce server logic, use caching for CMS pages, and set long-lived caching headers for static assets [09:22].

// CDNs: Use a Content Delivery Network to store files closer to the user, reducing physical distance and latency [10:01].

// Service Workers: Implement a "cache-first" strategy using service workers to make subsequent loads near-instant [10:41].

// 2. Resource Loading Hints
// Early Connections: Use dns-prefetch and preconnect to resolve domains and establish secure handshakes before the browser even requests the specific file [14:11].

// Preloading: Use <link rel="preload"> for critical assets (like hero images or main fonts) that are needed for the initial viewport [16:05].

// Async & Defer: Use these attributes on scripts to prevent them from blocking the browser's ability to paint the page [12:39].

// 3. Image & Content Optimization
// Modern Formats: Serve images in formats like WebP or AVIF, which can be up to 90% smaller than JPEGs [18:48].

// Lazy Loading: Use loading="lazy" for images below the fold, but never for the LCP element itself, as it will delay the paint [17:21].

// Compression: Use tools like Squoosh to find the smallest file size without losing visual quality [17:04].

// Key "Gotchas" and Technical Nuances
// Hidden Pixels Don't Count: LCP only measures visible pixels. If an element is transparent (opacity: 0) or clipped, it isn't the LCP candidate [19:01].

// Layout Shifts: LCP only looks at the initial size and position. If an element moves after it is painted, it doesn't trigger a new LCP event [19:17].

// Testing vs. Reality: The most accurate data is in Google Search Console (field data), which reflects real user experiences on varying devices and networks [06:57].

// Watch the full video here: https://www.youtube.com/watch?v=480m72yjZv8


// ========================
// ========================
// ========================

// CLS: Cumulative Layout Shift
// https://www.youtube.com/watch?v=Z6WiGWDU0nU

// summary

// This video from Google Search Central provides a comprehensive guide to Cumulative Layout Shift (CLS), a Core Web Vital that measures the visual stability of a webpage.

// What is Cumulative Layout Shift (CLS)?
// Definition: CLS measures how much the visible parts of a page "jump" or shift unexpectedly as content loads [01:04].

// The Goal: A good user experience means the page is stable and predictable. Users shouldn't accidentally click the wrong button because an ad suddenly pushed it down [00:13].

// The Score: CLS is a value between 0 and 1. A "Good" score is 0.1 or less for at least 75% of page views [05:35].

// How CLS is Calculated
// Session Windows: Shifts are grouped into "session windows." A window stays open for up to 5 seconds or until there is a 1-second gap between shifts [03:48].

// User Interactions: Layout shifts that occur within 500 milliseconds of a user interaction (like a click or keypress) are ignored, as these shifts are usually expected [02:51].

// Visibility: Only shifts of visible elements in the viewport are counted [04:39].

// Common Causes of Poor CLS
// Images without dimensions: Browsers don't know how much space to reserve until the image downloads [11:45].

// Ads, Embeds, and iFrames: These often load late and push existing content down if space isn't reserved [12:55].

// Dynamic Content: Injected banners or "infinite scroll" items that pop in without warning [14:21].

// Web Fonts: Fonts loading late can cause "Flash of Unstyled Text" (FOUT) or "Flash of Invisible Text" (FOIT), changing the size of text blocks [15:10].

// How to Improve Your CLS Score
// Set Explicit Dimensions: Always include width and height attributes on images and video elements. Modern browsers use these to calculate the aspect ratio and reserve space even before the file loads [12:03].

// Reserve Space for Ads: Wrap ad slots in a div with a defined height and width. Avoid "collapsing" the slot if no ad is returned, as this also causes a shift [13:54].

// Use CSS Transforms: For animations, use transform: translate() instead of changing top or left properties. Transforms don't trigger layout shifts [04:17].

// Optimize Web Fonts: * Use <link rel="preload"> to fetch essential fonts early [16:13].

// Use font-display: optional to prevent the page from shifting if a font takes too long to load [16:32].

// Avoid font-display: swap if the fallback font has significantly different dimensions than the web font [17:14].

// Measuring CLS
// Field Data: Real-world data from users (found in Chrome User Experience Report/Search Console). This is the only data Google Search uses for ranking [06:01].

// Lab Data: "Best guess" data from tools like Lighthouse or Chrome DevTools, useful for testing during development [07:02].

// Custom Tracking: You can use the PerformanceObserver API in JavaScript to track layout shifts in real-time on your own site [08:05].

// For more details, you can watch the full video here: https://www.youtube.com/watch?v=Z6WiGWDU0nU

// ========================
// ======================== 
// ========================
// Interaction to Next Paint (INP)