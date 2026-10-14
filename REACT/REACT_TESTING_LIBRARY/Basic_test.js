// Basic Test

// write a simplest react compoent and its test using testing library

// ----- Hello.jsx -----
export default function Hello({ name }) {
  return <h1>Hello {name}</h1>
}

// ----- Hello.test.jsx -----
// npm i -D @testing-library/react @testing-library/jest-dom
import { render, screen, fireEvent } from '@testing-library/react'
import Hello from './Hello'

test('shows the greeting', () => {
  render(<Hello name="Ashis" />)
  expect(screen.getByText('Hello Ashis')).toBeInTheDocument()
})

// What this does
// render() puts the component in a fake DOM (jsdom)
// screen.getByText() finds that text — throws if missing
// toBeInTheDocument() asserts it is on the page

// Interview one-liner
// Render the component, query it the way a user would (text, role, label), then expect.

// ----- one level deeper: click updates state -----
// Counter.jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      count is {count}
    </button>
  )
}

// Counter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

test('increments when the button is clicked', () => {
  render(<Counter />)

  const button = screen.getByRole('button', { name: 'count is 0' })
  fireEvent.click(button)

  expect(screen.getByRole('button', { name: 'count is 1' })).toBeInTheDocument()
})

// fireEvent.click runs the onClick and flushes the setState (it uses act inside).
// You assert the new text, not the click itself.

