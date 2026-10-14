// explain use strict in react?

// "use strict" is a JavaScript rule, not a React feature.
// In modern React apps you usually do NOT write it yourself.
// ES modules are strict by default, and Vite / CRA / Next compile your files as modules.
// So component code already runs in strict mode.

// What "use strict" changes in JS
// - assigning to an undeclared variable throws (no accidental global)
// - this inside a plain function is undefined, not window
// - duplicate parameter names are a syntax error
// - deleting a non-configurable property throws
// - silent failures become errors

// Example
// "use strict"
// mistyped = 10        // ReferenceError
// function f() { console.log(this) }
// f()                  // undefined

// Do not confuse it with React.StrictMode
// <React.StrictMode> is a React dev-only wrapper.
// It does NOT turn on JS "use strict".
// It double-invokes some functions in development to surface bugs:
// - render, constructor, useState initializer
// - and it warns about unsafe lifecycles / legacy APIs
// Production build does not double-invoke.

// Interview one-liner
// "use strict" = JS strict mode, already on because React files are modules.
// React.StrictMode = extra dev checks from React, unrelated to the "use strict" string.
