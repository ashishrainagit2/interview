https://www.youtube.com/watch?v=jx5jmI0UlXU

1. display inline vs inline block
2. positioning:
3. fixed vs absolute vs sticky

---

# CSS `position` types

`position` controls **how** an element is placed.  
`top` / `right` / `bottom` / `left` / `z-index` only work when `position` is **not** `static`.

## 1. `static` (default)

- Normal document flow
- `top/left/...` **ignored**
- Use: default layout

```css
.box { position: static; }
```

## 2. `relative`

- Stays in normal flow (space still reserved)
- Offset from **its own original place** with `top/left/...`
- Common use: make a **positioning context** for `absolute` children

```css
.box {
  position: relative;
  top: 10px;  /* nudge down from where it was */
  left: 20px;
}
```

## 3. `absolute`

- **Removed** from normal flow (siblings don’t save a gap for it)
- Positioned relative to nearest ancestor with `position` ≠ `static`
- If none → relative to the **initial containing block** (often the viewport / `<html>`)

```css
.parent { position: relative; } /* create context */

.child {
  position: absolute;
  top: 0;
  right: 0; /* pin to top-right of parent */
}
```

## 4. `fixed`

- Removed from flow
- Positioned relative to the **viewport** (browser window)
- Stays put while scrolling (unless an ancestor has `transform`/`filter`/`perspective` — then that becomes the containing block)

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
```

## 5. `sticky`

- Hybrid: acts like `relative` until a scroll threshold, then sticks like `fixed`
- Needs a scroll container and usually a `top`/`bottom`/…
- Sticks within its **parent** (stops when parent scrolls away)

```css
.header {
  position: sticky;
  top: 0; /* stick when it hits top of viewport */
}
```

---

## Quick compare (interview table)

| Value | In document flow? | Offset relative to |
|-------|-------------------|--------------------|
| `static` | Yes | — (offsets ignored) |
| `relative` | Yes (space kept) | Itself (original spot) |
| `absolute` | No | Nearest positioned ancestor |
| `fixed` | No | Viewport |
| `sticky` | Yes, until stuck | Scroll + `top` etc. |

---

## `fixed` vs `absolute` vs `sticky`

| | `absolute` | `fixed` | `sticky` |
|--|------------|---------|----------|
| Scrolls with page? | Yes (with ancestor) | No (stays on screen)* | Until threshold, then sticks |
| Typical use | Badge on card, dropdown | Navbar, floating button | Table header, section title |
| Needs positioned parent? | Usually yes (`relative`) | No | Needs scroll + `top` |

\*unless a transformed ancestor traps it

---

## Gotchas

1. Always set `position: relative` on parent when using absolute children (so they don’t jump to the viewport).
2. `sticky` fails if any ancestor has `overflow: hidden/auto` in a way that breaks sticky, or if no `top` is set.
3. `z-index` only works on positioned elements (not `static`).

---

## One-liner

> `relative` = nudge + create context; `absolute` = pin to positioned parent; `fixed` = pin to viewport; `sticky` = relative then stick on scroll.
