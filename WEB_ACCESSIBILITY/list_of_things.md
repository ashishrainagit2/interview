### 📑 Semantic HTML & Structure
* **Semantic Elements:** Use correct tags like `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>` instead of generic `<div>` tags so screen readers can map the page layout.
* **Heading Hierarchy:** Nest headings in a sequential, logical order (`<h1>` followed by `<h2>`, then `<h3>`) without skipping levels to provide a clear page outline.
* **Landmarks and ARIA:** Apply ARIA roles (`role="search"`, `aria-label`) only when native HTML elements cannot handle the structural definition.

### ⌨️ Keyboard Navigation
* **Full Operability:** Ensure every interactive element (links, buttons, forms, dropdowns) can be reached and triggered using only the `Tab` and `Enter`/`Space` keys.
* **Visible Focus States:** Never remove the outline on focused elements (`outline: none`); style a highly visible focus ring so keyboard users know where they are.
* **Logical Focus Order:** Maintain a natural tabbing order that matches the visual flow of the page (typically top-to-bottom, left-to-right).
* **Focus Traps:** Implement focus trapping inside modal dialogs so keyboard navigation stays inside the active window until it is closed.

### 🖼️ Media & Text Alternatives
* **Alt Text for Images:** Provide descriptive `alt` attributes for informative images, and use empty alt tags (`alt=""`) for purely decorative images so screen readers skip them.
* **Form Labels:** Explicitly connect every input field to a `<label>` tag using the `for` and `id` attributes so users know what information to enter.
* **Captions and Transcripts:** Include accurate, synchronized captions for videos and text transcripts for audio files.

### 🎨 Visual & Contrast Design
* **Color Contrast:** Maintain a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text against their backgrounds.
* **Don't Rely on Color Alone:** Never use color as the only way to convey information (e.g., changing text to red for an error; add an error icon or text label as well).
* **Text Resizing:** Ensure the layout does not break or clip text when users zoom in up to 200% in their browsers.

### ⚡ Dynamic Content & State Management
* **ARIA Live Regions:** Use `aria-live="polite"` or `aria-live="assertive"` to announce dynamic changes—like toast notifications, error alerts, or live search results—to screen reader users.
* **Accessible Forms:** Provide clear, real-time error messages that are programmatically linked to the invalid input field using `aria-describedby`.
