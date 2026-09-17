import Counter from './components/Counter'
import Greeting from './components/Greeting'
import Test from './components/Test'
import './App.css'

function App() {
  return (
    <section id="center">
      <h1>Redux — Multiple Reducers</h1>
      <p className="subtitle">
        Each component reads its own slice. Updating one does not affect the
        other.
      </p>
      <Counter />
      <Greeting />
      <Test />
    </section>
  )
}

export default App
