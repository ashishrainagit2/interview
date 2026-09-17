# SEO interview questions (frontend)

Use these out loud. A good answer is: **what it is → why it matters → what you do in code**.

---

## Level 1 — Beginner

**1. What is SEO?**  
Make pages easy for search engines to **find, crawl, understand, and rank** — and useful for humans. Frontend owns HTML, links, meta, and speed.

**2. What happens after you publish a URL?**  
Discover → crawl → index → rank. If Google never discovers or cannot read HTML, ranking never starts.

**3. Title vs meta description?**  
`title` is a ranking signal and the blue link. `meta description` is **not** a ranking factor; it can become the snippet and affect clicks. Unique per page.

**4. Does `<meta name="keywords">` help Google?**  
No. Google ignores it. Legacy / spam magnet. Skip it.

**5. What is semantic HTML and why does it help?**  
Use real meaning: one `h1`, then `h2`, `nav`, `article`, `a href`. Bots and a11y tools understand structure. Fake headings in `div`s do not.

**6. Why do images need `alt`?**  
Google can index the description; screen readers need it. Describe the image, don’t keyword-stuff.

**7. Why is `<a href="/watches">` better than `<div onclick>`?**  
Crawlers follow links. Click-only `div`s often are not crawled as navigation.

React: keep a real `href`. `onClick` is extra (analytics / SPA). `preventDefault` skips a full reload; the URL is still `/watches`.

```jsx
// good — React Router / Next Link render <a href="/watches">
<Link to="/watches" onClick={() => track("watches")}>Watches</Link>

// good — hand-rolled SPA, crawler still sees href
<a href="/watches" onClick={(e) => { e.preventDefault(); navigate("/watches"); }}>
  Watches
</a>

// bad — no URL for Google or "open in new tab"
<div onClick={() => navigate("/watches")}>Watches</div>
```

**8. What does `robots.txt` do?**  
Hints which paths crawlers **may fetch**. It is **not** security. Secrets stay behind auth, not robots.txt.

```txt
# live file: https://example.com/robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /cart

Sitemap: https://example.com/sitemap.xml
```

**9. `noindex` vs blocking in robots.txt?**  
`noindex` (meta or header) = “you may crawl, don’t put me in the index.”  
robots.txt disallow = “don’t fetch.” If you disallow, Google may never see the `noindex`.

```html
<meta name="robots" content="noindex, follow" />
```

```txt
# robots.txt — don’t fetch (Google never sees a noindex on that URL)
Disallow: /cart
```

Header (PDFs, APIs): `X-Robots-Tag: noindex`

**10. What is a sitemap?**  
`sitemap.xml` lists important URLs so Google can discover them. It does not guarantee ranking. Live file: `https://example.com/sitemap.xml` (absolute `https` URLs only). Point to it from `robots.txt`: `Sitemap: https://example.com/sitemap.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-09-09</lastmod>
  </url>
  <url>
    <loc>https://example.com/watches</loc>
  </url>
</urlset>
```

**11. Viewport meta — SEO or not?**  
Mobile-friendly pages are expected. Missing viewport hurts mobile usability (and thus SEO indirectly).

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**12. Open Graph vs SEO?**  
OG/Twitter tags control **share previews**. They do not replace title, content, or crawlable HTML.

```html
<meta property="og:title" content="Blue Watch" />
<meta property="og:description" content="Shop men's watches. Free shipping." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://example.com/watches" />
<meta property="og:image" content="https://example.com/og-watch.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## Level 2 — Mid

**1. CSR vs SSR vs SSG for SEO?**  
CSR: first HTML is often empty `#root` → weak for public pages unless prerender.  
SSR: HTML per request → good for dynamic + SEO.  
SSG: HTML at build → great for blogs, docs, marketing.

**2. When is CSR fine?**  
Logged-in dashboards, admin, app shells that should not rank. Public marketing/product/blog should ship HTML.

**3. What is a canonical URL?**  
Tells Google the **preferred** URL when the same content exists on many URLs (`?utm=`, trailing slash, `/page` vs `/page/`). Prevents duplicate-content dilution.

```html
<!-- on both /watches?utm=ad and /watches/ — point at one URL -->
<link rel="canonical" href="https://example.com/watches" />
```

**4. Duplicate content — frontend examples?**  
HTTP vs HTTPS, www vs non-www, filters `?color=red`, sort params, print views. Fix with canonical + consistent internal links.

**5. How do you set title/description in a React SPA?**  
Per route: `document.title` is not enough for the **first** HTML. Need SSR/SSG or a prerender, plus React Helmet / Next `metadata` so the **response** has the tags.

**6. Core Web Vitals — name them and targets.**  
LCP ≤ 2.5s (hero/content paint). INP ≤ 200ms (interaction). CLS ≤ 0.1 (layout shift). Ranking + conversion.

**7. One frontend fix for each CWV.**  
LCP: optimize LCP image, reduce blocking JS/CSS, faster TTFB.  
INP: less main-thread JS, code-split, debounce expensive handlers.  
CLS: `width`/`height` or `aspect-ratio` on images/ads; no late-injected banners.

**8. Lazy-load everything?**  
No. Lazy-loading the **LCP image** delays LCP. Lazy-load below the fold; preload/priority-load the hero.

**9. Internal linking — why interviewers ask.**  
Crawlers discover pages through links. Orphan pages (only in sitemap) are weaker. Descriptive anchor text beats “click here.”

**10. Clean URLs?**  
`/watches/blue-dial` is crawlable and shareable. `/p?id=3847` works but is worse for humans and often for duplicates.

**11. How do you check SEO without guessing?**  
View source / `curl` (HTML without JS). Lighthouse SEO. Search Console (coverage, indexing). Rich Results Test for schema.

**12. `index, follow` — what does it mean?**  
Index this page; follow its links. `nofollow` = don’t treat links as ranking endorsement (still often crawled).

---

## Level 3 — Expert

**1. Googlebot and JavaScript — what actually happens?**  
Crawl raw HTML first. JS may be rendered later (second wave), queued, limited. Don’t bet ranking on a slow client render. Critical content should be in the first HTML.

**2. Soft 404 in an SPA?**  
App returns HTTP 200 with “not found” UI. Google may index junk or miss that the URL is dead. Unknown routes should be **HTTP 404/410** (SSR/edge) or `noindex` at minimum.

**3. Pagination, filters, faceted nav.**  
Infinite filters explode URLs (`?color=&size=&sort=`). Canonical to a main listing, `noindex` thin filter pages, or `robots.txt` carefully. Don’t let crawl budget die on combinations.

**4. Crawl budget — when do you care?**  
Huge sites (e-comm, news). Wasted on duplicates, faceted URLs, infinite calendars, blocked JS/CSS needed to render. Fix with canonicals, parameter handling, sitemap of **canonical** URLs only.

**5. JSON-LD — ranking or rich results?**  
Structured data does **not** magically rank you. It can unlock rich results (product, FAQ, article) if the visible page matches the JSON. Mismatch = ignore or manual action.

**6. Schema pitfalls.**  
Markup that’s invisible on the page. FAQ spam. Product schema without real offers. Always align JSON-LD with UI.

**7. hreflang (if they go international).**  
Tell Google language/region variants. Reciprocal annotations, correct `x-default`, don’t mix with random canonicals. Wrong hreflang = wrong country in SERP.

**8. Canonical vs hreflang vs redirect.**  
Redirect = this URL is gone, use that one. Canonical = duplicates, pick primary. hreflang = equivalents in other locales, **not** duplicates of the same language.

**9. Rendering architecture: Next.js App Router.**  
Public routes: Server Components / SSG / SSR so HTML exists. Client islands for interactivity. Don’t client-fetch the H1 after paint on a marketing page.

**10. Hydration and SEO.**  
SEO cares about **first HTML**, not hydration. Hydration affects INP/CLS if the UI jumps. Mismatch HTML vs client = hydration errors + possible content flicker.

**11. `robots.txt` blocking JS/CSS.**  
Old mistake: block `/static/` and Google cannot render. Allow assets needed to understand the page.

**12. How you debug “page not indexing.”**  
Search Console URL inspection: crawled HTML vs live. Coverage: excluded by `noindex`, canonical elsewhere, crawled not indexed. Confirm sitemap, internal links, status code, compare `curl` vs rendered.

**13. Meta refresh / JS-only redirects.**  
Prefer HTTP 301/302. JS redirects are slower and less reliable for transferring signals.

**14. Accessibility overlap.**  
Heading order, alt, real buttons/links, contrast — overlap with SEO because both need a clear document. A11y is not a ranking knob, but broken DOM hurts both users and parsers.

---

## Level 4 — Master

**1. Design SEO for a large React e-commerce site.**  
Talk architecture: SSR/SSG for PLP/PDP; canonical strategy for variants; facet rules; sitemap of indexable URLs only; CWV on LCP product image; JSON-LD Product/Offer; 404 for dead SKUs; crawl budget monitoring. Trade-offs: TTFB vs cache vs personalization (personalized HTML can wreck cache and confuse Google — default to a crawlable anonymous version).

**2. Google’s rendering pipeline vs your CDN.**  
HTML cache at edge, `Vary` cookies, bot vs user. Serving bots a different page than users (cloaking) is against guidelines. Prerender must match user-visible content. Stale SSR cache can show old titles.

**3. Migration: domain or HTTP → HTTPS or new JS framework.**  
URL mapping 1:1 301s, update internal links/canonicals/sitemaps, keep content parity, Search Console change of address if needed, watch coverage + CWV after launch. SPA rewrite that changes all URLs without redirects is a ranking cliff.

**4. JavaScript SEO at the limit.**  
Explain: crawl → render queue → index. Render delay, resource limits, broken `history` routes, fragment `#/` URLs (fragments not sent to server — **hash routes are bad for SEO**). Prefer History API + real paths.

**5. Index bloat vs under-indexing.**  
Bloat: parameters, previews, tags, thin AI pages. Under: orphan PDPs, JS-only links, blocked resources. Fix discovery graph + indexation policy, not more blog posts.

**6. Content quality vs frontend (E-E-A-T).**  
Frontend cannot fake expertise. You **can** make experience visible: author, dates, main content in HTML, not behind tabs that never render. Helpful content is a quality issue; your job is not hiding it in a client fetch.

**7. Core Web Vitals as a ranking system, not a Lighthouse score.**  
Field data (CrUX / Search Console) beats lab. Optimize real LCP element (often a font or hero, not what Lighthouse guessed). INP is about the slowest interactions, not “total JS size” alone. Explain how you’d find the LCP resource in Performance panel.

**8. International + performance together.**  
hreflang, CDN by region, don’t geo-redirect Googlebot into a loop. `hreflang` + canonical must not fight (each locale canonicalizes to itself).

**9. Log-file / bot analysis (senior).**  
Googlebot hits, status codes, wasted crawl on 404/302 chains. Frontend + SRE: reduce hop chains, fix infinite query URLs, ensure 304/etag for assets.

**10. “We prerender for bots only.”**  
If prerender HTML ≠ user HTML, that’s cloaking risk. If it matches, it’s a pragmatic CSR rescue. Prefer SSR/SSG so one pipeline serves everyone.

**11. SEO for a design system / micro-frontends.**  
Shared titles colliding, duplicate headers, multiple `h1`s, conflicting canonicals from fragments. Ownership: one document policy per URL. Performance: duplicate JS from MFEs kills INP/LCP.

**12. How you’d argue with a PM who wants a CSR marketing site.**  
Cost of SSR vs cost of invisible pages. Show `curl` empty shell, Search Console “crawled – currently not indexed,” competitor SSR pages. Offer hybrid: SSG landing, CSR app.

**13. Legal / guidelines you won’t do.**  
Hidden text, doorway pages, purchased links, keyword stuffing, fake schema, cloaking. Say you refuse black-hat — interviewers listen for this.

**14. End-to-end story (use this if they say “walk me through SEO on your last app”).**  
Discoverability (sitemap + links) → HTML in first byte (SSR) → unique title/canonical → CWV on template → schema if product → verify GSC + no-JS view. Mention one metric you moved (LCP, index coverage, etc.).

---

## 60-second closer (any level)

“SEO on the frontend is crawlable HTML, unique titles, honest canonicals, and Core Web Vitals. Public pages get SSR or SSG so the first response isn’t an empty root. I verify with curl, Lighthouse, and Search Console — not with a keywords meta tag.”

---

## Don’t bother memorizing

Keyword density %, exact Google algorithm names, black-hat tricks, stuffing `meta keywords`.
