import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <section className="panel">
      <h2>Counter</h2>
      <p className="panel-value">Count is {count}</p>
      <div className="button-row">
        <button
          type="button"
          className="counter"
          onClick={() => dispatch(decrement())}
        >
          −
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </section>
  )
}

export default Counter
