import Counter from './components/Counter'
import Greeting from './components/Greeting'
import './App.css'

function App() {
  return (
    <section id="center">
      <h1>Redux Toolkit — Multiple Slices</h1>
      <p className="subtitle">
        Same UI as the vanilla Redux demo, but slices replace separate
        actions + reducers.
      </p>
      <Counter />
      <Greeting />
    </section>
  )
}

export default App
