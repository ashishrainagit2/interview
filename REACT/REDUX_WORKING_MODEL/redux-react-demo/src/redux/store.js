import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { counterReducer } from './counterReducer'
import { greetingReducer } from './greetingReducer'
import { todoReducer } from './todoReducer'

/**
 * combineReducers — merges multiple reducers into one root reducer.
 * Each key becomes a slice of the global state:
 *
 *   {
 *     counter:  { value: 0 },
 *     greeting: { name: 'World' },
 *     todo:     { data, loading, error },
 *   }
 */
const rootReducer = combineReducers({
  counter: counterReducer,
  greeting: greetingReducer,
  todo: todoReducer,
})

// DevTools + thunk: compose so both work together
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

/**
 * thunk middleware — lets dispatch accept a FUNCTION (async), not only plain
 * action objects. That function receives (dispatch, getState).
 */
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
)
