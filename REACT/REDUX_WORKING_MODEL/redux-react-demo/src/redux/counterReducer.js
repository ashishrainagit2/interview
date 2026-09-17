import { DECREMENT, INCREMENT } from './counterActions'

// Initial state when the app first loads
const initialState = {
  value: 0,
}

/**
 * Reducer — a pure function: (previousState, action) => newState
 * - Never mutate state directly; always return a new object
 * - Must return the previous state for unknown action types
 */
export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 }

    case DECREMENT:
      return { ...state, value: state.value - 1 }

    default:
      return state
  }
}
