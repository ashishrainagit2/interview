https://www.youtube.com/watch?v=CWkD2kP6Wug

## Run (required for `type="module"`)

Browsers block ES modules on `file://` (CORS). Use a local server:

```bash
cd DESIGN_PATTERNS/SINGLETON/example1
npx serve .
```

Open `http://localhost:3000` → check Console.

**Or:** VS Code / Cursor **Live Server** on `index.html`.

## What you should see

`app.js` and `pay.js` both import the **same** `singletonShopping` bag — items from both files share one cart.
