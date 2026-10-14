Difference between inline and inline-block?

## Short answer
Both sit **on the same line** as surrounding text/elements.
**`inline-block`** lets you set **width / height / vertical margins** like a block; **`inline`** mostly ignores those.

## Compare

| | `inline` | `inline-block` |
|--|----------|----------------|
| Flows with text | Yes | Yes |
| Width / height | Ignored (content-sized) | Respected |
| margin-top / margin-bottom | Ignored (horizontal margin works) | Respected |
| padding | Affects visually; vertical padding can overlap oddly | Respected cleanly |
| Line break | No (stays in line) | No (stays in line) |
| Examples | `<span>`, `<a>`, `<strong>` | Buttons, icons with fixed size, nav items |

## Examples

```html
<span style="display: inline; width: 200px; height: 50px; margin: 20px;">
  inline — width/height/vertical margin don’t apply as you’d expect
</span>

span {
  display: inline-block;
  width: 200px;
  height: 50px;
  margin: 20px; /* all sides work */
}
```

## vs `block` (for interviews)

- **`block`**: new line, full width by default (`div`, `p`)
- **`inline`**: same line, no width/height control
- **`inline-block`**: same line **+** box model control (width/height/margin)

## Gotcha
`inline-block` elements can show a **small gap** between them (whitespace in HTML). Fixes: remove spaces in HTML, `font-size: 0` on parent, or use flex/grid instead.

## One-liner
> `inline` = text-like, can’t size the box; `inline-block` = sits inline but you can set width, height, and margins like a block.
