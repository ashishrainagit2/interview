/**
 * Web Accessibility Checkpoints (Quick Checklist)
 * -----------------------------------------------
 * Use this before shipping any UI.
 */

// 1) Page structure
// - Exactly one meaningful <h1> per page.
// - Heading levels are in logical order (h1 -> h2 -> h3).
// - Landmark elements used: header, nav, main, section, footer.

// 2) Keyboard support
// - Every interactive element is reachable via Tab.
// - Focus indicator is clearly visible.
// - Enter/Space works for buttons and custom controls.
// - Escape closes modals, dropdowns, popovers.

// 3) Semantic HTML first
// - Use <button> for actions, <a href> for navigation.
// - Use real form elements: label, input, select, textarea.
// - Avoid clickable <div>/<span> unless fully accessible.

// 4) Labels and instructions
// - Every input has an associated label (htmlFor + id).
// - Placeholder is not used as the only label.
// - Help/error text is connected via aria-describedby.

// 5) Forms and validation
// - Invalid fields announce errors clearly.
// - Use aria-invalid for invalid inputs when needed.
// - Error messages are specific ("Email is required").

// 6) Screen reader support
// - Accessible name exists for every control.
// - Decorative icons/images use aria-hidden="true" or alt="".
// - Important images have meaningful alt text.

// 7) Color and contrast
// - Text contrast meets WCAG AA (normal text >= 4.5:1).
// - Meaning is not conveyed by color alone.
// - Links are distinguishable (not color-only).

// 8) Dynamic UI states
// - Toggle controls expose state (aria-pressed/aria-expanded).
// - Loading/error/success updates are announced if needed (aria-live).
// - Focus is managed during UI changes.

// 9) Modals/dialogs
// - Focus moves into modal on open.
// - Focus is trapped inside while open.
// - Focus returns to trigger on close.
// - Dialog has role="dialog", aria-modal="true", and a title.

// 10) Responsive and zoom
// - UI works at 200% zoom without content loss.
// - No horizontal scrolling for normal content on mobile widths.
// - Touch targets are reasonably large.

// 11) Motion and timing
// - Respect prefers-reduced-motion.
// - Avoid flashing/flickering content.
// - Users get enough time for timed interactions.

// 12) Final manual checks
// - Keyboard-only pass.
// - Screen reader smoke test (NVDA/VoiceOver).
// - Automated checks (Lighthouse/axe) with manual follow-up.

// search for roadside coder playlist below
//https://learn.roadsidecoder.com/new-courses/1/content?activeTab=Content