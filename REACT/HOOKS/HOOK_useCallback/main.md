# useCallback

Q1. Memoizes a function. Same inputs → same function reference, so a `React.memo` child does not re-render for no reason.

```jsx
import { useState, useCallback, memo } from "react";

const Button = memo(function Button({ onClick, label }) {
  console.log("Button render:", label);
  return <button onClick={onClick}>{label}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>{count}</p>
      <Button onClick={increment} label="+" />
    </div>
  );
}
```

**Without** `useCallback`, typing in the input recreates `increment` every render → `Button` re-renders.  
**With** `useCallback` and `[]`, `increment` stays the same → `Button` stays still.

Use it when you pass a function to a **memoized child**, or as a **dependency** of `useEffect`. Don’t wrap every function.
