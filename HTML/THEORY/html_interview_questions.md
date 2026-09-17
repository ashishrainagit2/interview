✅ Explain different html input types?

FROM AI:
HTML <input> types define what kind of data the user can enter. The type attribute changes UI, keyboard on mobile, and built-in browser validation.

Basic syntax:
<input type="text" name="username" placeholder="Enter name" />

Common HTML input types:

1. Text-based inputs

type="text"
- Single-line plain text (default if type omitted)
- Use for names, titles, search boxes
<input type="text" name="username" />

type="password"
- Masks characters (shows dots/asterisks)
- Does NOT encrypt data — only hides on screen; use HTTPS for security
<input type="password" name="password" />

type="email"
- Email address field
- Built-in validation (must contain @ and domain)
- Mobile shows email-optimized keyboard (@, .com)
<input type="email" name="email" required />

type="url"
- Website URL field
- Validates URL format (must include protocol like https://)
<input type="url" name="website" />

type="tel"
- Telephone number
- No built-in format validation (formats vary globally)
- Mobile shows numeric phone keypad
<input type="tel" name="phone" />

type="search"
- Search field (visually similar to text, may show clear button)
- Used in search bars
<input type="search" name="q" />

2. Number & range inputs

type="number"
- Numeric input with spinner arrows
- Supports min, max, step attributes
<input type="number" name="age" min="1" max="120" step="1" />

type="range"
- Slider control for selecting a number in a range
- Shows current value via JS or output element
<input type="range" name="volume" min="0" max="100" />

3. Date & time inputs

type="date"         — Date picker (YYYY-MM-DD)
type="time"         — Time picker (HH:MM)
type="datetime-local" — Date + time (no timezone)
type="month"        — Month + year picker
type="week"         — Week + year picker

<input type="date" name="dob" />
<input type="time" name="appointment" />
<input type="datetime-local" name="event" />

Note: Browser support/UI varies; some teams use libraries (Flatpickr) for consistent styling.

4. Choice inputs

type="checkbox"
- Multiple selections (on/off toggles)
- Value sent only when checked
<input type="checkbox" name="subscribe" value="yes" />

type="radio"
- Single selection from a group (same name attribute)
<input type="radio" name="gender" value="male" />
<input type="radio" name="gender" value="female" />

5. File & hidden inputs

type="file"
- File upload (images, documents, etc.)
- accept attribute filters file types
<input type="file" name="avatar" accept="image/*" />

type="hidden"
- Not visible to user; sends data with form silently
- Used for IDs, tokens, tracking values
<input type="hidden" name="userId" value="123" />

6. Action inputs (buttons)

type="submit"  — Submits the form
type="reset"   — Resets all form fields to default
type="button"  — Generic button (no default form action; use with JS)
type="image"   — Image that acts as submit button

<input type="submit" value="Sign Up" />
<input type="button" value="Click Me" onclick="doSomething()" />

7. Other types

type="color"  — Color picker (returns hex value e.g. #ff0000)
type="button" — Generic clickable button

<input type="color" name="theme" />

Important attributes (work with many input types):
- required     — Field must be filled before submit
- placeholder  — Hint text inside input
- disabled     — User cannot interact
- readonly     — Visible but not editable
- min / max    — Range limits (number, date)
- step         — Increment step (number, range)
- pattern      — Regex validation (text)
- autocomplete — Browser autofill hint (on/off, email, name, etc.)
- name         — Key sent to server on form submit
- value        — Default/current value

Validation example:
<input type="email" required pattern="[^@]+@[^@]+\.[^@]+" />

Interview comparison table:

Type          | Use case              | Validation built-in?
text          | General text          | No (use pattern)
email         | Email addresses       | Yes (@, domain)
url           | Website URLs          | Yes (URL format)
tel           | Phone numbers         | No
number        | Numeric values        | Yes (numeric only)
date/time     | Dates & times         | Yes (format)
checkbox      | Multiple choices      | No
radio         | Single choice group   | No
file          | File uploads          | No (use accept)
hidden        | Hidden data           | No
password      | Passwords             | No (masking only)

HTML5 input types vs <textarea> vs <select>:
- <input>     — single value, many types
- <textarea>  — multi-line text
- <select>    — dropdown list of options

Mobile benefit (important for interviews):
HTML5 input types change the mobile keyboard — email shows @, tel shows number pad, number shows numeric keypad. Better UX than type="text" for everything.

One-line interview answer:
HTML input types (text, email, password, number, date, checkbox, radio, file, etc.) define the kind of data collected, provide built-in validation, show appropriate UI/keyboard on mobile, and improve form UX — always pick the most specific type for the data you need.


2 How do we make radio button select only one option?

The radio group must share the same name (the value of the name attribute) to be treated as a group. Once the radio group is created, selecting any radio button in that group automatically deselects any other selected radio button in the same group. You can have as many radio groups on a page as you want, as long as each group has its own name.

