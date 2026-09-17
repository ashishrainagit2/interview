Video Tutorial By Akshay Saini: https://www.youtube.com/watch?v=IrHmpdORLu8&list=PLlasXeu85E9eV5xUEgrWUB8NAUvNZGsK0&index=15

AI:

async vs defer in <script> tags
Both attributes tell the browser how to load and execute external scripts without blocking HTML parsing.

Default behavior (no attribute)

<script src="app.js"></script>

HTML parsing:  ████████──────BLOCKED──────████████
Script:                 ↓ fetch ↓↓ execute ↓

HTML parsing stops while the script is fetched and executed.
Slow and blocks rendering.

async
<script async src="app.js"></script>
HTML parsing:  ████████████████──BLOCKED──████████
Script:            ↓ fetch ↓↓ execute ↓

Script is fetched in parallel with HTML parsing.
Executes as soon as it's downloaded (pauses HTML parsing briefly).
No guaranteed order — whichever script downloads first runs first.

defer
<script defer src="app.js"></script>
HTML parsing:  ██████████████████████████████████
Script:            ↓ fetch ↓              ↓ execute ↓

Script is fetched in parallel with HTML parsing.
Executes after HTML is fully parsed, right before DOMContentLoaded.
Order is preserved — scripts run in the order they appear in HTML.

Side-by-side comparison

| Feature              | Default (no attr)         | async                         | defer                            |
| :------------------- | :------------------------ | :---------------------------- | :------------------------------- |
| When script downloads| During parse (blocking)   | During parse (parallel)       | During parse (parallel)          |
| When script runs     | Immediately (blocking)    | As soon as downloaded         | After HTML is fully parsed       |
| Execution order      | Document order            | Random (download order)       | Document order                   |
| Blocks HTML parsing  | Yes — fetch & execute     | Briefly — execute only        | No                               |
| DOMContentLoaded     | Delayed until script runs | Not blocked by async scripts  | Scripts run, then event fires    |

When to use what

| Category            | Use case                         | Use   | Why                                      |
| :------------------ | :------------------------------- | :---- | :--------------------------------------- |
| App scripts         | Needs DOM elements               | defer | Runs after HTML is fully parsed          |
| App scripts         | Order matters (jQuery → app.js)  | defer | Executes in document order               |
| App scripts         | External scripts in `<head>`     | defer | Downloads early, runs safely after parse |
| Independent scripts | Analytics, ads, trackers         | async | No DOM or order dependency               |
| Independent scripts | Must run ASAP                    | async | Executes when download finishes          |
| Default             | Scripts at bottom of `<body>`    | none  | DOM ready when parser reaches tag        |
| Default             | Inline scripts (no `src`)        | none  | async/defer only work with external files|

Example 

<!-- Order matters, needs DOM → use defer -->
<script defer src="jquery.js"></script>
<script defer src="app.js"></script>   <!-- runs after jquery.js -->

<!-- Independent, don't need DOM → use async -->
<script async src="analytics.js"></script>
<script async src="ads.js"></script>   <!-- may run before or after analytics -->

async: fetch in parallel, execute immediately when ready, no order guarantee.
defer: fetch in parallel, execute after HTML is parsed, order preserved.
defer is usually the safer default for most scripts.

Why not just put scripts at the bottom of <body>?
Putting <script> at the bottom of <body> used to be the go-to approach. It works, but defer is better in most cases.

What "bottom of body" does

<body>
  <div>All your HTML content...</div>

  <!-- Scripts at the bottom -->
  <script src="app.js"></script>
</body>

HTML is already parsed by the time the browser reaches the script.
But the script doesn't start downloading until the parser gets there (at the very end).

Why defer is better

<head>
  <script defer src="app.js"></script>
</head>
<body>
  <div>All your HTML content...</div>
</body>

| | Bottom of body | defer in `<head>` |
| :--- | :--- | :--- |
| Blocks HTML parsing? | No | No |
| When does download start? | After all HTML is parsed | Immediately (in parallel) |
| When does it execute? | After HTML is parsed | After HTML is parsed |

The key difference: defer starts downloading the script immediately while the browser is still parsing HTML. Bottom-of-body waits until all HTML is parsed before even starting the download.

Visual comparison
Bottom of body:

HTML parsing:  ██████████████████████████
Script:                                  ↓ fetch ↓↓ execute ↓
                                         ^ download starts late

defer in <head>:    

HTML parsing:  ██████████████████████████
Script:        ↓ fetch ↓                 ↓ execute ↓
               ^ download starts early    ^ runs after HTML parsed

With defer, the script is already downloaded by the time HTML parsing finishes, so execution starts sooner.

When bottom-of-body is still fine
Inline scripts (no src) — defer only works with external files
Very small HTML pages — the difference is negligible
Legacy projects where changing <head> is risky

Bottom-of-body delays the download. defer in <head> starts downloading immediately but still waits to execute until after parsing. You get the same safety with faster page load.

Rule of thumb:

Analytics / ads / trackers: async
App scripts needing DOM or strict order: defer


==

Use async for analytics because analytics scripts are usually independent and should not wait for DOM parsing to finish.

async downloads in parallel and executes as soon as ready.
It does not preserve order, which is fine for most analytics tags.
It can fire tracking sooner (pageview/event beacons) without blocking full-page parsing during download.
Why not defer (usually):

defer waits until HTML parsing is complete before execution.
Great for app code that needs DOM/order.
For analytics, that delay can miss very-early timing/event capture in some flows.
Rule of thumb:

Analytics / ads / trackers: async
App scripts needing DOM or strict order: defer



Download: The browser starts fetching the script right away, in parallel with HTML parsing. Parsing is not blocked while the file downloads.

Execute: The script does not run until HTML parsing is finished. Only then does it execute (right before DOMContentLoaded).

So the flow is:

<head>
  <script defer src="app.js"></script>   ← download starts immediately
</head>
<body>
  ... HTML keeps parsing while app.js downloads ...
</body>
                                         ← HTML done → app.js runs → DOMContentLoaded
Quick contrast:

Phase	defer in <head>	Default <script> (no attribute)
Download
Parallel — parsing continues
Blocks parsing
Execute
After HTML is fully parsed
Immediately when parser hits the tag
That's why defer in <head> is often better than putting the same script at the bottom of <body>: download starts earlier, but execution still waits until the DOM is ready.

Three scenarios

async alone = parallel download, run as soon as ready, no order.
defer alone = parallel download, run after HTML parse, order preserved.

Do not put async and defer on the same script.
defer already gives parallel download + delayed execution.
If both are present, modern browsers follow async and ignore defer.
(Old IE used defer as a fallback when async was unknown — legacy only.)

----

Rule of Thumb for Your Projects
Instead of combining them, use this quick checklist to decide which attribute to assign to your script tag: 

Use <script defer> for your core application scripts, UI frameworks, or scripts that depend on one another (e.g., loading a plugin after a main library). 

Use <script async> for independent third-party scripts that do not require access to your site's DOM tree, such as Google Analytics, tracking pixels, or advertisement scripts. 

-----
Yes, you can write both on the same tag — but async wins and defer is ignored.

<script async defer s

No, you should not use defer and async together on the same script tag because they have conflicting execution rules. 

If you place both attributes on a single <script> tag, modern web browsers will prioritize async and completely ignore defer. 

⚙️ How Browsers Handle the Combination
The only technical reason both attributes are ever used together is to handle a legacy fallback system: 

Modern Browsers: They support both attributes but will follow async. The script downloads in the background and executes the exact moment it finishes downloading, potentially interrupting the HTML parser. 

Legacy Browsers (e.g., Internet Explorer 9 and older): These older versions do not recognize async but do recognize defer. They will fall back to using the defer behavior. 

| Use case                              | Use   | Why                                           |
| :------------------------------------ | :---- | :-------------------------------------------- |
| Analytics — prioritize page speed     | defer | No mid-parse interruption, DOM fully ready  |
| Analytics — prioritize early capture  | async | Fires ASAP, catches bounces on slow pages     |
| App scripts needing DOM + order       | defer | Must run after parse, in order                |
| Ads / third-party independent scripts | async | Fire when ready, no order dependency          |

Real-world example
User on slow 3G, page takes 8 seconds to parse:

async:  analytics fires at ~2s (downloaded early, interrupts parse briefly)
defer:  analytics fires at ~8s (after full parse)
If the user bounces at 5s → async captured them, defer missed them.

That's the trade-off. Not speed — data capture vs parse smoothness.
