/**
 * Web Accessibility Cheat Sheet (React/Web)
 * -------------------------------------------
 * Use this as a quick checklist for building accessible UIs.
 *
 * Core mindset:
 * - Prefer semantic HTML over ARIA.
 * - Make everything usable with keyboard only.
 * - Ensure screen readers get correct labels, roles, and states.
 * - Don’t rely on color alone for meaning.
 */

// =========================
// 1) Semantics & structure
// =========================
//
// - Use headings in order: <h1> then <h2>...
// - Use landmarks: <header>, <nav>, <main>, <section>, <footer>
// - For navigation use <nav> not a generic <div>.
// - Use lists (<ul>/<ol>) for lists of items.
// - Use <button> for actions; use <a href="..."> for navigation.
//
// React note:
// - Don’t add role/aria-* to “fix” bad HTML.

// =========================
// 2) Keyboard accessibility
// =========================
//
// - Every interactive control must be reachable via Tab.
// - Use a visible focus indicator (never remove outline without a strong replacement).
// - Ensure custom components support:
//   - Enter/Space to activate buttons
//   - Arrow-key navigation where appropriate (tabs/menus)
//   - Escape to close dialogs/menus
//
// Common anti-pattern:
// - Using <div onClick=...> as a button. Use <button> instead.

// ==================================
// 3) Labels, names, and instructions
// ==================================
//
// For form fields:
// - Always associate labels:
//   <label htmlFor="id">Name</label>
//   <input id="id" ... />
// - If using aria-label, prefer a meaningful human string.
// - For complex instructions:
//   - Put help text in an element and connect via aria-describedby.
//
// For invalid fields:
// - Set aria-invalid="true" on the field (optional but helpful).
// - Provide the error text in a dedicated element.
// - Connect with aria-describedby (so the error is announced).

// =========================
// 4) Images & media
// =========================
//
// - Use alt text:
//   - Meaningful image: alt="Blue chronograph watch with leather strap"
//   - Decorative: alt="" (empty) so screen readers skip it
// - For SVG icons:
//   - If decorative, use aria-hidden="true"
//   - If meaningful, add accessible text (title/aria-label on the SVG or via surrounding text)

// =========================
// 5) ARIA (use sparingly)
// =========================
//
// Rules of thumb:
// - ARIA can add information, but it can’t fix missing semantics.
// - Use native elements first; ARIA second.
//
// Prefer these patterns:
// - Labeling:
//   - aria-label for a direct, simple label
//   - aria-labelledby for labeling from another element
//   - aria-describedby for extra instruction/error text
//
// Stateful controls:
// - Toggle buttons:
//   - aria-pressed for “pressed/not pressed”
//   - aria-expanded for “open/closed” regions (collapsible, menus)
//
// Live regions:
// - Use aria-live="polite" for non-urgent updates.
// - Use aria-live="assertive" only for urgent alerts (rare).
// - Avoid too many live regions (can be noisy).

// =========================
// 6) Dialogs, modals, popovers
// =========================
//
// When you open a modal/dialog:
// - Move focus into the dialog on open.
// - Trap focus inside the dialog.
// - Allow closing with Escape.
// - Return focus to the trigger when closed.
// - Provide an accessible name and role:
//   <div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
// - Put the title inside an element with id="dialog-title".

// =========================
// 7) Color, contrast, and motion
// =========================
//
// - Ensure sufficient text/background contrast (WCAG AA is typical target).
// - Do not convey meaning by color alone (also use text/icons).
// - Respect reduced motion:
//   - If you animate, consider prefers-reduced-motion.

// =========================
// 8) Tables & data
// =========================
//
// - Use <table> semantics for tabular data.
// - Use <th> for header cells.
// - For complex tables, ensure correct scope/headers usage.

// =========================
// 9) React-specific do/don’t
// =========================
//
// Do:
// - Use correct elements: <button>, <a>, <form>, <label>.
// - Keep labels outside placeholders (placeholders are not labels).
// - Ensure key events mirror native behavior for custom widgets.
// - Ensure disabled state uses the real disabled attribute when possible.
//
// Don’t:
// - Don’t use onClick-only for keyboard users.
// - Don’t assign role="button" to non-buttons unless you fully implement keyboard behavior.
//
// Extra check:
// - Add type="button" for buttons inside forms to avoid accidental submits.

// =========================
// 10) Quick testing checklist
// =========================
//
// - Keyboard only: can you reach, operate, and close everything?
// - Screen reader: do controls announce name/role/state?
// - Focus: is focus visible and moved predictably?
// - Validation: are error messages announced and associated with fields?
// - Contrast: do texts remain readable in different themes?

// WCAG Color contrast checker
// https://chromewebstore.google.com/detail/wcag-color-contrast-check/plnahcmalebffmaghcpcmpaciebdhgdf

// https://webaim.org/resources/contrastchecker/