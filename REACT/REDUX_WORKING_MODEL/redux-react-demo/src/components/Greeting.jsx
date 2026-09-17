import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../redux/greetingActions'

function Greeting() {
  // Reads state.greeting — a different slice, managed by greetingReducer
  const name = useSelector((state) => state.greeting.name)
  const dispatch = useDispatch()

  return (
    <section className="panel">
      <h2>Greeting</h2>
      <p className="panel-value">Hello, {name}!</p>
      <input
        type="text"
        className="name-input"
        value={name}
        onChange={(event) => dispatch(setName(event.target.value))}
        placeholder="Enter a name"
      />
    </section>
  )
}

export default Greeting
