You’re talking about a layout system (design foundation): shared CSS so every new page is “drop into container / grid / stack” instead of reinventing layout.


What to extract from Figma first
Figma	CSS
Frame max width (e.g. 1200 / 1440)
--container-max
Side padding (16 / 24 / 32)
--space-* / container padding
Columns / gutters
grid columns + gap
Type scale, colors, radius
CSS variables



Minimal starter (copy into layout.css)


:root {
  --container-max: 1200px;
  --page-pad: 1.5rem;      /* 24px — match Figma */
  --gap: 1.5rem;
  --gap-sm: 1rem;
  --gap-lg: 2rem;
}

/* Centered page shell — use on every page */
.container {
  width: min(100% - 2 * var(--page-pad), var(--container-max));
  margin-inline: auto;
}

/* Vertical rhythm */
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
.stack-sm { gap: var(--gap-sm); }
.stack-lg { gap: var(--gap-lg); }

/* Horizontal row */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
  align-items: center;
}

/* Simple responsive grid */
.grid {
  display: grid;
  gap: var(--gap);
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Optional: 12-col (closer to Figma auto-layout / bootstrap mental model) */
.grid-12 {
  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(12, 1fr);
}
.col-12 { grid-column: span 12; }
@media (min-width: 768px) {
  .col-md-6 { grid-column: span 6; }
  .col-md-4 { grid-column: span 4; }
  .col-md-8 { grid-column: span 8; }
}

usage on page

<main class="container stack-lg">
  <header>...</header>
  <section class="grid grid-3">
    <article>...</article>
    <article>...</article>
    <article>...</article>
  </section>
</main>

How teams usually structure it

styles/
  tokens.css     /* colors, spacing, fonts from Figma */
  layout.css     /* container, stack, grid, row */
  utilities.css  /* mt-4, text-center — optional */
  components.css /* button, card — after layout exists */


  Practical tips from Figma → CSS
One container for content width — don’t invent a new max-width per page.
Prefer flex stack + CSS grid over a heavy 12-col unless the design is strictly columnar.
Match Figma spacing to a scale (4/8/16/24/32), not random px.
Mobile-first media queries; Figma frames = breakpoints.
Optional: Tailwind / Bootstrap if you want utilities already built — same idea, pre-made.
