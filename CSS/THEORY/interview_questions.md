✅ Explain HTML DOCTYPE?

https://www.youtube.com/watch?v=zwSs54iAogs
(instruction for browser how to render page on browser)

FROM AI:
The DOCTYPE (Document Type Declaration) is the very first line in an HTML document. It tells the browser which HTML version/spec to use when parsing and rendering the page.

Modern HTML5 DOCTYPE:
<!DOCTYPE html>

What it does:
- Switches the browser into standards mode (not quirks mode)
- Tells the parser to follow modern HTML rules
- Is NOT an HTML tag — it's a declaration/instruction to the browser

Standards mode vs Quirks mode:
- With a correct DOCTYPE → standards mode → CSS/layout behave predictably (box model, margins, etc.)
- Without DOCTYPE (or old invalid ones) → quirks mode → browser emulates old IE behavior for backward compatibility

Important points for interviews:
- DOCTYPE is not case-sensitive in HTML5 (<!DOCTYPE html> or <!doctype html> both work)
- It must be the first line — nothing (not even whitespace/comments) should come before it
- HTML5 DOCTYPE is short because it doesn't reference a DTD file (unlike HTML4/XHTML)
- It doesn't affect SEO directly, but wrong/missing DOCTYPE can break layout/CSS

Old DOCTYPE examples (don't use today):
- HTML 4.01 Strict — long, references a DTD URL
- XHTML 1.0 — required XML-style strict syntax

One-line interview answer:
DOCTYPE is a browser instruction at the top of the HTML file that enables standards mode so the page is parsed and rendered using modern HTML/CSS rules instead of legacy quirks mode.


✅ What is quirks mode in browser?

FROM AI:
Quirks mode is a backward-compatibility rendering mode in browsers. When a page has no DOCTYPE, an invalid DOCTYPE, or certain old DOCTYPEs, the browser emulates legacy behavior (mainly old Internet Explorer 5) instead of following modern web standards.

Why it exists:
- Old websites were built when browsers had inconsistent, buggy behavior
- Browsers kept that old behavior so ancient sites wouldn't break
- Quirks mode = "pretend to be old IE" for compatibility

How the browser decides (document modes):
1. No DOCTYPE or invalid DOCTYPE → Quirks mode
2. Correct HTML5 DOCTYPE (<!DOCTYPE html>) → Standards mode (full standards compliance)
3. Some old DOCTYPEs → Almost standards mode (minor differences from full standards)

Key differences in Quirks mode (interview favorites):

Box model:
- Standards mode: width/height = content only (padding & border added on top)
- Quirks mode: width/height INCLUDES padding and border (old IE box model)

CSS:
- Percentage heights may not work the same on html/body
- overflow behavior differs
- Some selectors and properties behave differently
- vertical-align on table cells differs

Layout:
- Inline-block gaps handled differently
- Margin collapsing behaves differently in some cases
- Fixed positioning relative to viewport may differ

HTML parsing:
- More forgiving/loose parsing (unclosed tags, nesting errors tolerated differently)

Example — box model difference:
/* div { width: 200px; padding: 20px; border: 5px solid; } */
Standards mode → total width = 200 + 40 + 10 = 250px
Quirks mode     → total width = 200px (padding/border eat into the 200px)

How to avoid quirks mode:
- Always start HTML with: <!DOCTYPE html>
- Put DOCTYPE as the very first line (no whitespace/comments before it)
- Validate your DOCTYPE is correct for HTML5

Related: Almost Standards Mode
- Triggered by some HTML4 DOCTYPEs (e.g. transitional)
- Mostly like standards mode, but table cell vertical alignment matches quirks mode
- Rarely relevant today — use HTML5 DOCTYPE

One-line interview answer:
Quirks mode is a legacy browser rendering mode that mimics old IE behavior when DOCTYPE is missing or invalid — it changes the box model, CSS, and layout rules, so always use <!DOCTYPE html> to get predictable standards mode.


✅ Explain HTML Schema markup?
https://www.youtube.com/watch?v=vJEygBWs80A

FROM AI:
Schema markup (also called structured data) is a standardized way to label content in HTML so search engines understand what the page is about — not just text, but entities like products, reviews, events, FAQs, recipes, etc.

It uses the Schema.org vocabulary — a shared dictionary agreed on by Google, Bing, Yahoo, and others.

Why use it:
- Helps search engines understand page content (semantic meaning, not just keywords)
- Enables rich results / rich snippets in Google (stars, prices, FAQ dropdowns, breadcrumbs, event dates)
- Can improve click-through rate (CTR) — not a direct ranking factor, but better visibility in SERPs
- Helps voice assistants and AI parse structured information

Three formats to add Schema markup:

1. JSON-LD (recommended by Google)
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "iPhone 15",
  "offers": {
    "@type": "Offer",
    "price": "799",
    "priceCurrency": "USD"
  }
}
</script>

2. Microdata (HTML attributes inline on elements)
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">iPhone 15</span>
  <span itemprop="price">799</span>
</div>

3. RDFa (HTML attributes, less common today)
<div vocab="https://schema.org/" typeof="Product">
  <span property="name">iPhone 15</span>
</div>

JSON-LD is preferred because:
- Keeps structured data separate from visible HTML (easier to maintain)
- No need to wrap/affect DOM structure
- Google explicitly recommends it

Common Schema types (interview examples):
- Organization / LocalBusiness — company info, logo, address
- Product — name, price, availability, reviews
- Article / BlogPosting — headline, author, datePublished
- FAQPage — question/answer pairs (FAQ rich results)
- BreadcrumbList — navigation path in search results
- Event — dates, location, tickets
- Recipe — ingredients, cook time, ratings
- Person — author profiles

Example — FAQ Schema (JSON-LD):
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is React?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "React is a JavaScript library for building UIs."
    }
  }]
}
</script>

Important interview points:
- Schema markup is NOT visible to users — it's metadata for crawlers
- Must match visible content on the page (Google penalizes mismatch/misleading markup)
- Validate with Google Rich Results Test or Schema Markup Validator
- Different from semantic HTML (<article>, <nav>) — semantic HTML helps accessibility/browsers; Schema markup helps search engines with explicit entity data
- Can be added server-side (SSR/Next.js) or client-side, but server-rendered JSON-LD is best for crawlers

Schema markup vs Semantic HTML:
Semantic HTML     → <article>, <header>, <nav> — structure & accessibility
Schema markup     → JSON-LD/Microdata — explicit machine-readable entity data for SEO/rich results

One-line interview answer:
Schema markup is structured data (usually JSON-LD using Schema.org vocabulary) added to HTML so search engines understand entities like products, articles, or FAQs — enabling rich snippets and better search visibility.


✅ Explain why should we use table tag instead of creating table with div?

FROM AI:
Yes, this is a proper interview question — it tests semantic HTML, accessibility, and CSS knowledge.

Use <table> when displaying tabular data (rows & columns of related data). Don't use divs to fake a table.

Why <table> is better than div-based "tables":

1. Semantics
- <table>, <thead>, <tbody>, <tr>, <th>, <td> clearly mean "tabular data"
- Screen readers announce it as a table with row/column count
- Search engines understand the data structure

2. Accessibility
- Screen readers support table navigation (jump between rows/columns)
- <th scope="col/row"> links headers to data cells
- caption, thead, tbody give proper context to assistive tech
- Div tables = unreadable mess for blind users

3. Less code & CSS
- Browser handles column alignment, equal heights in rows automatically
- Div table needs display: flex/grid + lots of custom CSS to mimic behavior

4. Built-in features
- colspan / rowspan — merge cells easily
- Sticky headers with minimal effort
- Print-friendly by default

5. SEO
- Search engines parse real tables for structured data (pricing tables, comparisons)

When NOT to use <table>:
- Page layout (header, sidebar, footer) — use CSS Grid/Flexbox instead
- This was common in the 1990s–2000s; it's outdated and bad for accessibility

Interview one-liner:
Use <table> for tabular data because it's semantic, accessible (screen readers can navigate rows/columns), needs less CSS, and supports colspan/rowspan — divs are only for layout, not data tables.

✅ Strong vs Bold tag? i vs italic tag what is difference?

FROM AI:
Two pairs of similar-looking tags — difference is semantic meaning vs visual styling.

1. <b> vs <strong>

<b> (Bold):
- Visual only — makes text bold
- No extra meaning for browsers/screen readers
- Use when you want bold text without semantic importance (keywords, product names in a review)

<strong> (Strong importance):
- Semantic — indicates serious importance, urgency, or seriousness
- Screen readers may change tone/emphasis when reading it
- Use when the content itself is important/warning: "Warning: do not proceed"

Visual: both look bold by default — but meaning is different.

2. <i> vs <em>

<i> (Italic):
- Visual only — makes text italic
- No extra emphasis meaning
- Use for: foreign words, technical terms, thoughts, ship names, icons labels
- Example: The word <i>bon appétit</i> is French.

<em> (Emphasis):
- Semantic — stresses a word when spoken (changes meaning of the sentence)
- Screen readers emphasize it when reading aloud
- Example: I <em>love</em> React. (stress on "love" — really love it)

Visual: both look italic by default — but meaning is different.

Quick comparison:

Tag       | Purpose              | Screen reader        | Use when
<b>       | Bold (visual)        | No special treatment | Style only — keywords, names
<strong>  | Important (semantic) | Adds importance      | Warnings, critical info
<i>       | Italic (visual)      | No special treatment | Foreign words, terms, icons
<em>      | Emphasis (semantic)  | Verbal stress        | Meaning changes when stressed

Interview rule of thumb:
- Need meaning/importance? → <strong> or <em>
- Need look only?           → <b> or <i> (or just use CSS: font-weight / font-style)

Modern note:
HTML5 gave <b> and <i> slightly clearer roles (offset text, alternate voice) — but for interviews, stick to: semantic tags for meaning, CSS for pure styling.

One-line interview answer:
<b> and <i> are visual styling tags; <strong> and <em> are semantic — they carry meaning (importance and emphasis) that screen readers and search engines understand, even though all four look the same by default.

✅ Explain HTML <picture> tag?

FROM AI:
The <picture> tag is a wrapper for responsive images — it lets the browser pick the best image based on screen size, resolution, or format.

Basic structure:
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg" />
  <source media="(min-width: 400px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="Description" />
</picture>

How it works:
- <picture>       — container (no visible output itself)
- <source>        — alternative image options (can have multiple)
- <img>           — required fallback + alt text for accessibility

Two main use cases:

1. Art direction (different crops for different screens)
- Mobile gets a cropped portrait image
- Desktop gets a wide landscape image

<picture>
  <source media="(min-width: 768px)" srcset="hero-wide.jpg" />
  <source media="(max-width: 767px)" srcset="hero-mobile.jpg" />
  <img src="hero-mobile.jpg" alt="Hero banner" />
</picture>

2. Modern format fallback (WebP/AVIF with JPG fallback)
- Browser picks first format it supports

<picture>
  <source srcset="photo.avif" type="image/avif" />
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="Photo" />
</picture>

<picture> vs <img srcset>:

<img srcset="small.jpg 400w, large.jpg 800w" sizes="(max-width: 600px) 400px, 800px" />
- Same image, different resolutions (resolution switching)

<picture>
- Different images OR different formats (art direction + format fallback)
- More control than srcset alone

Key attributes on <source>:
- srcset  — image URL(s)
- media   — CSS media query (screen size)
- type    — MIME type (image/webp, image/avif)
- sizes   — how wide image displays (with srcset width descriptors)

Important interview points:
- <img> inside <picture> is mandatory — provides fallback + alt text
- Always include alt on <img> for accessibility
- Browser picks first matching <source>; falls back to <img>
- Improves performance — smaller images on mobile, modern formats when supported
- Not for background images — use CSS background-image for decorative images

One-line interview answer:
<picture> is a responsive image wrapper that uses <source> elements to serve different images or formats (WebP/AVIF) based on screen size or browser support, with <img> as the required fallback and alt text.

✅ Explain difference between article and section in semantic html?

FROM AI:
Both are semantic HTML5 block elements for grouping content — the difference is independence and purpose.

<article> — Independent, self-contained content
- Makes sense on its own, even outside the page
- Could be syndicated, shared, or appear in RSS/feed alone
- Has its own heading and makes sense without surrounding context

Examples:
- Blog post
- News story
- Forum post
- Product card
- Comment
- Tweet/card widget

<article>
  <h2>How to Learn React</h2>
  <p>React is a JavaScript library...</p>
</article>

<section> — Thematic grouping of content within a page
- Groups related content under a common theme/topic
- Usually needs page context to make full sense
- Often has a heading describing the section

Examples:
- Introduction section on a homepage
- Features section
- Contact section
- Chapter within an article
- Tab panel content

<section>
  <h2>Features</h2>
  <p>Our app includes...</p>
</section>

Key difference:

article  → "Can this stand alone?"  → Yes → use <article>
section  → "Is this a themed group?" → Yes → use <section>

Can they nest?
Yes — common pattern:

<article>                    ← whole blog post
  <h1>My Blog Post</h1>
  <section>                  ← chapter within post
    <h2>Introduction</h2>
    <p>...</p>
  </section>
  <section>                  ← another chapter
    <h2>Conclusion</h2>
    <p>...</p>
  </section>
</article>

Multiple <article> inside <section> also works:

<section>
  <h2>Latest News</h2>
  <article>...</article>   ← each news item is independent
  <article>...</article>
</section>

article vs section vs div:

Tag       | Semantic? | Use when
<article> | Yes       | Self-contained, standalone content
<section> | Yes       | Thematic grouping within a page
<div>     | No        | Generic wrapper when no semantic tag fits

Interview tip — the "RSS test":
If you could put the content in an RSS feed or share it alone and it still makes sense → <article>
If it only makes sense as part of the page → <section>

One-line interview answer:
<article> is for self-contained content that makes sense independently (blog post, comment); <section> is for theming/grouping related content within a page (features, intro) — use article when content stands alone, section when it needs page context.


✅ Explain Css positioning types?
https://www.youtube.com/watch?v=jx5jmI0UlXU&t=190s

FROM AI:
CSS position controls how an element is placed in the document. There are 5 values:

1. static (default)
- Default for all elements
- top, right, bottom, left, z-index have NO effect
- Element stays in normal document flow
- Use: default layout — no special positioning needed

.box { position: static; }

2. relative
- Element stays in normal document flow (keeps its original space)
- Offset using top, right, bottom, left relative to its ORIGINAL position
- Creates a positioning context for absolute children
- Use: slight nudge, badge on icon, parent for absolute child

.box {
  position: relative;
  top: 10px;    /* moves 10px down from original spot */
  left: 20px;   /* moves 20px right */
}

3. absolute
- Removed from normal document flow (no space reserved)
- Positioned relative to nearest positioned ancestor (relative/absolute/fixed/sticky)
- If no positioned ancestor → relative to <html>/viewport
- Use: tooltips, dropdowns, close button on card, overlays

.parent { position: relative; }  /* positioning context */
.child {
  position: absolute;
  top: 0;
  right: 0;
}

4. fixed
- Removed from normal document flow
- Positioned relative to the viewport (browser window)
- Stays in same place even when scrolling
- Use: sticky navbar, floating action button, modal backdrop, chat widget

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

5. sticky
- Hybrid of relative + fixed
- Acts as relative until scroll hits a threshold, then acts as fixed
- Needs at least one of: top, right, bottom, left
- Sticks within its parent container (not entire viewport)
- Use: sticky table headers, section headings, sidebar

.header {
  position: sticky;
  top: 0;       /* sticks when scrolling reaches top: 0 */
}

Quick comparison:

Position  | In flow? | Relative to          | Scroll behavior
static    | Yes      | Normal flow          | Scrolls normally
relative  | Yes      | Own original spot    | Scrolls normally
absolute  | No       | Positioned ancestor  | Scrolls with ancestor
fixed     | No       | Viewport             | Stays fixed on screen
sticky    | Yes*     | Nearest scroll ancestor | Sticks at threshold

* sticky keeps its space until stuck

Important interview concepts:

Positioning context:
- absolute child positions inside nearest ancestor with position ≠ static
- Always set position: relative on parent when using absolute children

top / right / bottom / left:
- Only work when position is NOT static
- Can use px, %, em, rem, etc.

z-index:
- Controls stacking order (which element appears on top)
- Only works on positioned elements (not static)
- Higher value = on top

position vs display:
- position moves elements around
- display (flex, grid) controls layout of children — often used together

Common real-world examples:
- Navbar fixed to top           → position: fixed
- Dropdown menu                 → parent: relative, menu: absolute
- "New" badge on icon           → parent: relative, badge: absolute
- Sticky table header on scroll → position: sticky
- Modal overlay                 → position: fixed, full viewport

One-line interview answer:
CSS has 5 position types — static (default, normal flow), relative (offset from self, creates context), absolute (removed from flow, relative to positioned parent), fixed (relative to viewport, stays on scroll), and sticky (relative until scroll threshold, then fixed within parent).

✅ Explain Css positioning types?