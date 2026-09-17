import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodo } from '../redux/todoActions'

function Test() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.todo)

  // On mount: dispatch the thunk (async fetch lives in todoActions, not here)
  useEffect(() => {
    dispatch(fetchTodo())
  }, [dispatch])

  return (
    <section className="panel">
      <h2>Todo (thunk + API)</h2>

      {loading && <p className="panel-value">Loading…</p>}
      {error && <p className="panel-value">Error: {error}</p>}

      {data && (
        <div>
          <p className="panel-value">#{data.id} — {data.title}</p>
          <p className="subtitle">
            completed: {String(data.completed)} · userId: {data.userId}
          </p>
        </div>
      )}

      <button
        type="button"
        className="counter"
        onClick={() => dispatch(fetchTodo())}
      >
        Refetch
      </button>
    </section>
  )
}

export default Test
