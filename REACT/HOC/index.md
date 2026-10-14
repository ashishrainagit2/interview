# HOC (Higher Order Component)

A function that takes a component and returns a new component.

`HOC = (Component) => NewComponent`

---

## Simplest example

```jsx
import React from "react";

function withGreeting(WrappedComponent) {
  return function NewComponent(props) {
    return (
      <div>
        <p>Hello from HOC</p>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

function User({ name }) {
  return <h2>{name}</h2>;
}

const UserWithGreeting = withGreeting(User);

export default function App() {
  return <UserWithGreeting name="Ada" />;
}
```

Renders:

```text
Hello from HOC
Ada
```

---

## What happened

1. `withGreeting` receives `User`.
2. It returns `NewComponent`.
3. `NewComponent` renders extra UI, then renders `User`.
4. `{...props}` forwards `name="Ada"` to `User`.

You use it as `withGreeting(User)`, not `<withGreeting />`.
The HOC is a **function**, the result is a **component**.
