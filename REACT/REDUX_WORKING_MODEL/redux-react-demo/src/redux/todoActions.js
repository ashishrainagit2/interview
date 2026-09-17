// Action types
export const FETCH_TODO_REQUEST = 'todo/FETCH_REQUEST'
export const FETCH_TODO_SUCCESS = 'todo/FETCH_SUCCESS'
export const FETCH_TODO_FAILURE = 'todo/FETCH_FAILURE'

// Sync action creators — plain objects the reducer understands
export const fetchTodoRequest = () => ({ type: FETCH_TODO_REQUEST })

export const fetchTodoSuccess = (todo) => ({
  type: FETCH_TODO_SUCCESS,
  payload: todo,
})

export const fetchTodoFailure = (error) => ({
  type: FETCH_TODO_FAILURE,
  payload: error,
})

/**
 * Thunk — a function that returns another function (dispatch, getState) => {}
 *
 * Reducers stay pure (no fetch). Thunk middleware lets dispatch accept this
 * function, run the async work, then dispatch real actions when done.
 *
 * Flow:
 *   dispatch(fetchTodo())           ← UI
 *     → dispatch(REQUEST)           ← loading true
 *     → fetch(...)
 *     → dispatch(SUCCESS | FAILURE) ← data or error
 */
export const fetchTodo = () => {
  return async (dispatch) => {
    dispatch(fetchTodoRequest())

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      dispatch(fetchTodoSuccess(data))
    } catch (err) {
      dispatch(fetchTodoFailure(err.message || 'Failed to fetch'))
    }
  }
}
