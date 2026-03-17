Akshay Saini: https://www.youtube.com/watch?v=IrHmpdORLu8&list=PLlasXeu85E9eV5xUEgrWUB8NAUvNZGsK0&index=15

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

Feature	                No attribute	        async	                    defer
Fetch	                Blocks parsing	        Parallel	                Parallel
Execute	                Immediately (blocks)	As soon as downloaded	    After HTML is fully parsed
Order guaranteed?	    Yes	                    No	                        Yes
Blocks HTML parsing?	Yes	                    Briefly (during execution)	No
DOMContentLoaded	    Waits for script	    Doesn't wait	            Runs before it

When to use what

Use case	                                            Attribute
Scripts that depend on DOM	                            defer
Scripts that depend on each other (order matters)	    defer
Independent scripts (analytics, ads, tracking)	        async
Critical scripts that must run ASAP	                    async
Scripts at the bottom of <body>	                        Neither needed (already after DOM)

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

                            Bottom of body	            defer in <head>
Blocks HTML parsing?	    No	                        No
When does download start?	After all HTML is parsed	Immediately (in parallel)
When does it execute?	    After HTML is parsed	    After HTML is parsed

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
