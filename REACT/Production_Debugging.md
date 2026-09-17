9️⃣ Production Debugging
A React application becomes significantly slower in production. How would you identify the root cause using React profiling and browser debugging tools?

Watch these. The Q8 story is “same URL twice, late response, abort.”

Best read (RTK Query actually dedupes):
https://redux-toolkit.js.org/tutorials/rtk-query
They show several components asking for the same pokemon — one network call. That’s the interview.

Official walkthrough:
https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

Best video (same library, spoken):
Jack Herrington — Redux Toolkit Query vs React Query

Creator of RTK Query (free course):
https://egghead.io/courses/rtk-query-basics-query-endpoints-data-flow-and-typescript-57ea3c43

Cancel / race (the “user 1 then user 2” bit):
https://developer.mozilla.org/en-US/docs/Web/API/AbortController
fetch(url, { signal }) → leave the page or change id → abort(). Late response is dead.

Cache / stale (if they say React Query instead of RTK):
https://tkdodo.eu/blog/practical-react-query

Start with the pokemon tutorial + Jack’s video. That’s enough to talk through Q8 without a glossary.