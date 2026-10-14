// ✅ How would you optimize a large React application and improve its performance?

//  Answer:
// https://www.youtube.com/watch?v=qPto6cNPdzU


1. web page load time  => within 3 seconds
2. execution time => within 100ms
3. user action delay => within 100ms
4. DOM Elements length => 3000 to 4000
5. large Array > >10,000
6. Light house report 

1. CODE TIME:

    a. Code in predictive manner
    b.  USE NUMBER CONSTANTS, avoid string constants
    c.  avoid shape transation for objects
    d.  avoid chaining Filter, map and reduce on large arrays and objects, use traditional for loop
    e. reusability, create small functions

2. BUILD TIME

    a. lazy loading : component/pages/modules/images
    b. minification
    c. Tree shaking: webpack bundle analyzer, bundle phobia
    d. Dead code elimination: 
    e. GZIP

    STRATEGY:
    1. Loading strategy for web pages
    2. inline critical CSS
    3. Avoid Library bloat (NPM graph)

3. RUN TIME

    1. Long Running Function
    2. DOM updates frequent, bundle
    3. style changes frequest, bundle
    4. document fragment
    5. Too many HTTP request (batching, requestIdleCallback, DOM efficient)

4. Deploy time

    1. CDN
    2. Cache Policy
    3. PPPP => preload, prefetch, preconnect, prerender
    4. Right Rendering Technique
        CSR
        SSR
        SSG
        ISR

LOW HANGING FRUITS

    images Compress images , lazy load images, give height and weight, serve images based on device size.
    videos: use good service like youtube
    css sprites
    avoid tag selectore in css
    js async and defer
    deprioritize CSS
    schedule low priority call with requestIdleCallback
    icon fonts
    less Api on home page
    use timings API to measure time between page load and to complete a flow using userTiming
    remove unused CSS


    PROFILE in LOW NETWORK and LOW CPU PERFORMANCE
    performance optimization is a Process
    Always come up with Number
    