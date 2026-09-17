// Deeper notes. Short checklist lives in MISCELLANEOUS.js

// ============================================================
// HOW ANY PROGRAMMING LANGUAGE WORKS
// ============================================================
// Every language is the same pipeline. Only *who does which step* changes.
//
//   1. Source text     you type characters
//   2. Lex + parse     tokens → AST (tree of the program)
//   3. (optional)      type-check / optimize the tree
//   4. Lower           AST → bytecode OR machine code
//   5. Run             CPU executes instructions
//   6. Runtime         stack + heap + stdlib + I/O via OS syscalls
//
// Three classic run models:
//   AOT compiled  C, Rust, Go     → compiler emits a .exe/.bin *before* you run
//   VM + bytecode Java, C#        → compile once to portable bytecode, VM runs it
//   Interpret/JIT Python, JS      → start from source; may JIT hot code later
//
// Three memory models:
//   Manual        C               → malloc / free. Fast, you can leak / use-after-free
//   Ownership     Rust            → compiler inserts frees. Safe + fast, harder to write
//   Garbage collect  Java, Go, JS → runtime finds unreachable objects. Safer, pause cost
//
// Three concurrency models:
//   OS threads + locks    Java, C++, Go (goroutines are lighter)
//   Actors / message pass Erlang, Elixir
//   Event loop + async    JS, early Node — one thread, I/O in the background
//
// Three type models:
//   Static + strong   Rust, Java, TypeScript  — errors before run
//   Dynamic + strong  Python                   — types exist at run, little coercion
//   Dynamic + weak    JavaScript               — types exist at run, lots of coercion


// ============================================================
// HOW JS DIFFERS FROM "NORMAL" LANGUAGES
// ============================================================
// Born in 10 days for the *browser* (glue for buttons), not as a systems language.
// Same language, two hosts: Browser (DOM, fetch) vs Node (fs, http). Engine is V8/etc.
//
// vs C/Rust     no compile step, no pointers you control, no real threads, GC not free()
// vs Java/C#    no required types, no real class-original OOP (it's prototypes + sugar)
// vs Python     similar dynamic feel, but JS is *weakly* typed and event-loop first
// vs Go         Go has goroutines + static types; JS has one thread + promises
//
// JS-specific facts interviewers expect:
//   - single-threaded main thread + event loop (not pthreads)
//   - first-class functions + closures (the language is built around this)
//   - prototype chain, not classical inheritance (class is syntax sugar)
//   - almost everything is an object; functions are objects too
//   - numbers were IEEE-754 doubles only (no int) until BigInt
//   - JIT (Ignition + TurboFan), not a slow "always interpreted" toy
//   - sandboxed in the browser — no raw syscalls, no your-RAM-peek
//   - the DOM / Web APIs are NOT the language; they are the *host*


// ============================================================
// WHAT'S GOOD / WHAT'S BAD
// ============================================================
// GOOD — why it won
//   one language for UI (and now server/edge) — you already ship it to every phone
//   no compile needed; refresh and run. Fast to prototype
//   first-class functions, closures, JSON is literally JS object notation
//   event-loop I/O is excellent for network apps (lots of waiting, little CPU)
//   V8 JIT is *fast* for a dynamic language
//   huge ecosystem, one skill transfers browser ↔ Node ↔ React
//   can be made safe-ish: modules, const, ===, TypeScript on top
//
// BAD — what bites you
//   weak typing / coercion     "" == 0, [] + {} , typeof null === "object"
//   this / new / bind          same function, different this depending on *how* called
//   one main thread            a 200ms loop freezes clicks + paint
//   number is a float          0.1 + 0.2 !== 0.3; Date API is famously awful
//   silent failures            obj.foo.bar when foo is undefined → boom at runtime
//   historical junk            var, arguments, ==, with, automatic semicolons
//   no real stdlib             you pull lodash / date-fns for basics other langs have
//   parallelism is bolted on   Workers copy data; not shared-memory threads by default
//   types are optional         TS is a layer, runtime is still untyped JS
//
// Rule of thumb:
//   JS is a great *product / UI / I/O* language.
//   It is a poor *CPU / systems / correctness-by-default* language.
//   Use JS for the event loop. Use TS for the types. Use a Worker (or another
//   language) when you need real CPU or real threads.


// ============================================================
// HOW JS RUNS ON THE SYSTEM  (OS → browser → V8 → your code)
// ============================================================
// Browser is multi-process. JS is single-threaded *on the page's main thread*.
// Chrome (rough picture):
//   Browser process  → UI, address bar, coordinates everything
//   GPU process      → compositing, draw to screen
//   Network process  → sockets, HTTP, DNS
//   Renderer process → ONE per tab/site (sandbox). This is YOUR JS + DOM.
//
// Inside one renderer:
//   Main thread      → JS + style + layout + paint setup  (this is "the" JS thread)
//   Compositor       → another thread; can scroll/animate transform/opacity
//   Raster / workers → extra threads; images, some paint
// OS gives each thread a time slice on a CPU core. Main-thread JS hogging
// the core = tab feels frozen (no click, no paint) even if other cores are idle.


// --- CPU / how V8 executes your code ---
// 1. Parse source → AST
// 2. Ignition (interpreter) → bytecode, start running fast
// 3. Profiler: if a function is HOT (called a lot) → TurboFan JIT → native machine code
// 4. Deopt: if types change (number became string), throw away optimized code, go back
//
// So JS is not "always interpreted". Hot paths become CPU machine code.
// Stable object/array *shapes* keep JIT happy. Mixing types / adding keys later
// = deopt = more CPU for the same work.
//
// Frame budget: 60fps → 16.6ms per frame for JS + style + layout + paint.
// One long sync loop (big JSON.parse, huge .map, tight for) = dropped frames.
// requestAnimationFrame = "run before next paint". setTimeout(0) is later, not vsync.
// Web Worker = extra OS thread, own heap, no DOM. Talk via postMessage
// (structured clone = COPY, not shared RAM). SharedArrayBuffer = real shared memory.


// --- Memory: what the OS gives vs what V8 manages ---
// OS → virtual address space for the renderer process (GBs, not infinite).
// V8 carves that into:
//
//   CALL STACK  (small, ~few hundred KB–MB, per thread)
//     primitives in frames, return addresses, `this`, execution contexts
//     push on function enter, pop on return — instant, no GC
//     too much recursion → RangeError: Maximum call stack size exceeded
//
//   HEAP  (large, GC-managed) — objects, arrays, closures, strings, DOM wrappers
//     Young gen (nursery)  → new objects. Minor GC (scavenge) is frequent + cheap
//     Old gen              → objects that survived a few minor GCs
//     Major GC             → mark (find live) → sweep (free dead) → compact (defrag)
//     Modern V8 (Orinoco)  → mark can run on other cores; still *pauses* main a bit
//
// Primitive in a variable  → often stack / embedded
// object / array / fn / closure → always heap, variable holds a *pointer*
// Closure keeps the outer heap object ALIVE even after the outer fn returned
//
// Chrome heap for a tab is capped (often ~2–4 GB). Blow it → tab crash "Aw, Snap".
// GC is not instant free(): delete obj.x or obj = null only *drops a ref*.
// Memory frees when NOTHING can reach that object anymore (mark phase).


// --- What actually leaks (still reachable, so GC won't take it) ---
// forgotten setInterval / addEventListener (holds callback + its closure)
// detached DOM: removed from page but a JS var still points at the node
// global cache / unbounded Map / growing array in module scope
// closures capturing a huge object you no longer need
// WeakMap / WeakSet / WeakRef → do NOT keep the key alive; GC can collect it


// --- Who does the I/O? Not the JS thread. ---
// fetch / setTimeout / disk / crypto → handed to browser (or Node libuv)
// OS completes the socket/timer on another thread
// result queued as macrotask or microtask
// Event loop is NOT the OS scheduler — it's V8's cooperative loop:
//   "stack empty? drain ALL microtasks, then ONE macrotask, then maybe render"
// Node extra: libuv threadpool (fs, dns, crypto) — default 4 threads, UV_THREADPOOL_SIZE
//
// Promise / queueMicrotask  → microtask  (can starve paint if you loop them)
// setTimeout / I/O / click  → macrotask
// rAF                       → before paint, after JS


// --- Interview one-liners ---
// CPU: one core runs main-thread JS; JIT turns hot functions into machine code.
// Memory: stack = frames (auto); heap = objects (GC). Leaks = still-reachable junk.
// System: browser is multi-process/multi-thread; YOUR JS shares the renderer's
//         main thread with layout/paint — that's why a busy loop freezes the UI.
// Worker: extra thread + extra heap; messages are copies unless SharedArrayBuffer.
