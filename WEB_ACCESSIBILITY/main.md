# Web Accessibility — crash course

**Goal:** everyone can use your app — keyboard, screen reader, low vision, motor issues.

**Rule:** semantic HTML first. ARIA only when native HTML isn't enough.

---

## 1. Semantic HTML

Use the right tag — browser gives you accessibility for free.

```html
<button type="button">Add to cart</button>   <!-- action -->
<a href="/orders">Orders</a>                 <!-- navigation -->

<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
```

**Bad:** `<div onClick={add}>Add</div>` — not focusable, not a button for screen readers.

---

## 2. Keyboard

- **Tab** — reach every interactive thing  
- **Enter / Space** — activate buttons  
- **Escape** — close modal / menu  
- **Never** remove focus outline without a visible replacement  

```css
:focus-visible {
  outline: 2px solid #0066cc;
}
```

**Test:** unplug mouse, use Tab only — can you complete the flow?

---

## 3. Labels (forms)

Placeholder ≠ label.

```html
<label for="email">Email</label>
<input id="email" type="email" name="email" />

<!-- error linked to field -->
<input id="pwd" aria-invalid="true" aria-describedby="pwd-err" />
<span id="pwd-err">Password must be 8+ characters</span>
```

React: `htmlFor` + `id` must match.

---

## 4. Images

```html
<img src="watch.jpg" alt="Blue chronograph watch with leather strap" />
<img src="divider.png" alt="" />  <!-- decorative — empty alt -->
```

Icon-only button:

```html
<button aria-label="Close dialog">×</button>
```

---

## 5. ARIA (when needed)

| Attribute | Use |
|-----------|-----|
| `aria-label` | name when no visible text |
| `aria-labelledby` | point to another element for name |
| `aria-describedby` | help text / errors |
| `aria-expanded` | menu / accordion open/closed |
| `aria-pressed` | toggle button on/off |
| `aria-live="polite"` | announce async updates (toast, saved) |
| `aria-hidden="true"` | hide decorative icons from screen reader |

```html
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>
```

**Don't** slap `role="button"` on a `<div>` unless you also handle keyboard + focus.

---

## 6. Modal / dialog

On open:
1. Move **focus inside** dialog  
2. **Trap** focus (Tab stays inside)  
3. **Escape** closes  
4. On close → focus back to button that opened it  

```html
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Delete order?</h2>
  ...
</div>
```

Libraries (Radix, MUI Dialog) do this — if custom, you must.

---

## 7. Color & contrast

- Text readable on background — **WCAG AA** ≈ 4.5:1 normal text  
- Don't use color alone: ❌ red border only → ✅ red border + "Error: required"  
- Respect motion: `prefers-reduced-motion: reduce`

---

## 8. Tables (data)

```html
<table>
  <thead>
    <tr><th scope="col">Order</th><th scope="col">Status</th></tr>
  </thead>
  <tbody>...</tbody>
</table>
```

Use real `<table>` for tabular data — not CSS grid pretending to be a table.

---

## 9. React quick do / don't

| Do | Don't |
|----|-------|
| `<button>`, `<a href>`, `<label>` | `<div onClick>` as button |
| `type="button"` in forms | mystery submit on Enter |
| `disabled` attribute | fake disabled with only CSS |
| visible focus styles | `outline: none` everywhere |

---

## 10. Test checklist (5 min)

- [ ] Tab through whole page — order makes sense?  
- [ ] Screen reader (NVDA / VoiceOver) — name + role announced?  
- [ ] Form errors — linked and read aloud?  
- [ ] Zoom 200% — still usable?  
- [ ] Contrast — [WebAIM checker](https://webaim.org/resources/contrastchecker/)  

---

## 30-second interview answer

"I start with semantic HTML and keyboard support. Labels on every input, alt on images, focus visible, modals trap focus. ARIA only where native elements fall short. I test with keyboard-only and a screen reader — not just Lighthouse score."

---

## Tools

- [WebAIM contrast checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools → Accessibility tree
- axe DevTools extension
- See also: `HTML/ACCESSIBILITY/accessibility.js`
