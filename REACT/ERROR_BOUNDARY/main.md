https://www.youtube.com/watch?v=_FuDMEgIy7I

https://onecompiler.com/react/454upbrpd

# Error Boundary

A parent that catches a **render crash in its children** and shows fallback UI instead of a white screen.

Must be a **class** component. Hooks cannot do this.

- `static getDerivedStateFromError(error)` → update state, show fallback
- `componentDidCatch(error, info)` → log the error

**Catches:** render, lifecycle methods, child constructor  
**Does not catch:** event handlers, async (`fetch`, `setTimeout`, promises), errors in the boundary itself, SSR

---

## Error Boundary

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Caught by Error Boundary:", error);
    console.error("Component stack:", info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleRetry}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## Component that uses it

`UserProfile` can throw during render. `App` wraps only that subtree, so the rest of the page stays up.

```jsx
import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

function UserProfile({ user }) {
  if (!user) {
    throw new Error("User data is missing");
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  const [user, setUser] = useState({
    name: "Ada",
    email: "ada@example.com",
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setUser(null)}>Break profile</button>
      <button onClick={() => setUser({ name: "Ada", email: "ada@example.com" })}>
        Restore user
      </button>

      <ErrorBoundary>
        <UserProfile user={user} />
      </ErrorBoundary>

      <p>This text stays visible even if the profile crashes.</p>
    </div>
  );
}

export default App;
```

---

## Flow

1. Click **Break profile** → `user` becomes `null`.
2. `UserProfile` throws while rendering.
3. `getDerivedStateFromError` sets `hasError: true`.
4. Boundary shows fallback. Dashboard heading and buttons still render.
5. **Try again** resets boundary state. If `user` is valid again, the child remounts.

---

## Event handlers are not caught

```jsx
function SaveButton() {
  const handleClick = () => {
    try {
      throw new Error("click failed");
    } catch (e) {
      console.error(e);
    }
  };

  return <button onClick={handleClick}>Save</button>;
}
```
