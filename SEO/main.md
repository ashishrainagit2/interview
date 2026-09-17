https://www.youtube.com/watch?v=K62aFUwViMM

https://www.youtube.com/watch?v=AB0VMbvEz7g&list=PLvJ_dXFSpd2tThwk2t057HdK9hMLKd5k8&index=1

https://www.youtube.com/watch?v=0YgJLXgZCj4

https://www.youtube.com/watch?v=Oab78wir-k0

QUICK CHECK LIST:

 https://www.hostinger.com/in/tutorials/wordpress-seo-checklist

https://htmlcheatsheet.com/seo/

https://victorious.com/blog/technical-seo/

# SEO — crash course (frontend)

**Goal:** Google (and users) can **find**, **crawl**, **understand**, and **rank** your pages.

**Frontend angle:** HTML structure, meta, performance, rendering (CSR vs SSR), crawlability.

---

## 1. Basics — what Google needs

1. **Discover** URLs (links, sitemap)  
2. **Crawl** HTML (bot reads the page)  
3. **Index** content (store in search index)  
4. **Rank** (relevance + quality + Core Web Vitals)

If JS app shows empty `<div id="root">` on first HTML → bad for SEO unless SSR/SSG.

---

## 2. Essential HTML `<head>`

```html
<head>
  <title>Buy Watches Online | BrandName</title>
  <meta name="description" content="Shop men's and women's watches. Free shipping." />
  <meta name="keywords" >
  <link rel="canonical" href="https://example.com/watches" />
  <meta name="robots" content="index, follow" />
</head>
```

| Tag | Why |
|-----|-----|
| `<title>` | Blue link in Google — unique per page |
| `meta description` | Snippet under title (not ranking factor, affects clicks) |
| `canonical` | avoid duplicate content (`/page?utm=...`) |
| `robots` | `noindex` to hide page from search |

---

## 3. Semantic HTML (free SEO)

```html
<h1>One main topic per page</h1>
<h2>Section</h2>
<article>...</article>
<nav>...</nav>
```

- One **`<h1>`** per page, logical heading order  
- Real **`<a href>`** links — crawlers follow them  
- **Alt text** on images — indexed + accessibility  

---

## 4. CSR vs SSR vs SSG (React)

| | SEO |
|---|-----|
| **CSR** | Bot gets empty shell unless prerender — poor for public marketing pages |
| **SSR** | Full HTML per request — good for dynamic + SEO |
| **SSG** | Pre-built HTML — great for blogs, docs, landing |

**Interview:** public marketing/blog → SSR or SSG; logged-in dashboard → CSR is fine.

---

## 5. Core Web Vitals (ranking signal)

| Metric | Target | Frontend fix |
|--------|--------|--------------|
| **LCP** | ≤ 2.5s | fast server, optimize hero image, less JS |
| **INP** | ≤ 200ms | less main-thread work, code split |
| **CLS** | ≤ 0.1 | width/height on images, no layout jump |

Fast + stable pages rank better and convert better.

---

## 6. URLs & linking

```html
<a href="/products/watch-1">Watch 1</a>   <!-- good -->
<div onclick="go()">Watch 1</div>        <!-- bad — bot may not follow -->
```

- Clean URLs: `/watches/blue-dial` not `/p?id=3847`  
- Internal links help crawlers find pages  
- **Sitemap:** `sitemap.xml` lists important URLs  
- **robots.txt:** what bots may crawl (not for hiding secrets)

---

## 7. Structured data (rich results)

JSON-LD in `<script type="application/ld+json">` — tells Google *what* the page is.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Blue Chronograph Watch",
  "offers": { "@type": "Offer", "price": "4999", "priceCurrency": "INR" }
}
</script>
```

Can enable star ratings, product cards in search — optional but useful for e-commerce.

---

## 8. Social / sharing (Open Graph)

```html
<meta property="og:title" content="Blue Watch" />
<meta property="og:description" content="Shop now" />
<meta property="og:image" content="https://example.com/og.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

Doesn't replace SEO — controls preview when link is shared.

---

## 9. SPA / React checklist

- [ ] Meaningful `<title>` + meta per route (React Helmet / Next metadata)  
- [ ] SSR or SSG for public pages  
- [ ] Don't block crawlers in `robots.txt` by mistake  
- [ ] Lazy load below fold — but LCP image loads fast  
- [ ] Avoid duplicate URLs without `canonical`  
- [ ] Mobile-friendly viewport meta  

---

## 10. Quick test

- Google **Search Console** — indexing, errors  
- **Lighthouse** SEO audit  
- View page **without JS** (curl or disable JS) — is content there?  
- [Rich Results Test](https://search.google.com/test/rich-results) for schema  

---

## 30-second interview answer

"SEO on the frontend: unique title and meta per page, semantic HTML, fast LCP with optimized images, stable layout for CLS. Public pages need HTML in the first response — SSR or SSG, not empty CSR shell. Sitemap, canonical URLs, structured data for products. I verify with Lighthouse and Search Console."

---

## Don't bother memorizing

Black-hat tricks, keyword stuffing, hidden text — hurts more than helps.
