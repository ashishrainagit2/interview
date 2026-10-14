// stale clousers in react and how to overcome-solutions

// What is a stale closure in React?
// A function “remembers” props/state from an old render, then runs later and uses that outdated value.

// Classic case: useEffect / setInterval / event handler with empty deps [], but it reads state.


function Counter() {
    const [count, setCount] = useState(0)
  
    useEffect(() => {
      const id = setInterval(() => {
        console.log(count)   // always 0 — stale!
        setCount(count + 1)  // always sets to 1
      }, 1000)
      return () => clearInterval(id)
    }, []) // effect created once → closure forever sees count = 0
  
    return <p>{count}</p>
  }

//   The interval callback closed over count from the first render.

// Why it happens
// Each render creates new closures.
// If you keep an old callback (effect with [], ref to old handler, debounce without update), it still has old state/props.
// Async: fetch().then(() => setX(data + count)) — count may be old when then runs.

// Solutions
// 1. Functional updates (best for “based on previous state”)

setCount((c) => c + 1) // always latest count

// 2. Put the value in the dependency array

useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, []) // functional update → OK with []
  
  // or if you must read count:
  useEffect(() => {
    console.log(count)
  }, [count]) // re-subscribe when count changes

//   3. useRef for a mutable “always current” value

const countRef = useRef(count)
countRef.current = count

useEffect(() => {
  const id = setInterval(() => {
    console.log(countRef.current) // latest
  }, 1000)
  return () => clearInterval(id)
}, [])

// 4. Don’t capture state in long-lived async — use refs or abort + latest

useEffect(() => {
    let cancelled = false
    fetch(url).then((res) => res.json()).then((data) => {
      if (!cancelled) setData(data)
    })
    return () => { cancelled = true }
  }, [url])

//   5. useCallback with correct deps (for handlers passed down)

const onSave = useCallback(() => {
    save(id) // id must be in deps
  }, [id])

//   Wrong: useCallback(fn, []) while fn uses changing state → stale handler.

// Interview one-liner

// Stale closure = callback from an old render still using old state. Fix with functional setState, correct deps, or a ref that always holds the latest value.







