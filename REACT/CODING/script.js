/**
 * Mini Redux — plain JavaScript
 *
 * Real Redux pieces we recreate:
 *   createStore(reducer) → { getState, dispatch, subscribe }
 *   reducer(state, action) → newState   (pure function)
 *   action = { type: '...', ...payload }
 */

// ─────────────────────────────────────────────
// 1. createStore — the heart of Redux
// ─────────────────────────────────────────────
function createStore(reducer) {
  // Private: nobody touches this except through getState / dispatch
  let state
  let listeners = [] // functions to call after every dispatch

  // First run: reducer(undefined, { type: '@@INIT' }) → initial state
  // Same trick real Redux uses on startup
  state = reducer(undefined, { type: '@@INIT' })
  // state is build by reducer function and initial state is undefined and action is { type: '@@INIT' }
  // later state is build by reducer function and state is the old state and action is the action.
 // initail state is {value: 0}

  function getState() {
    return state
  }

  // dispatch(action) → reducer computes next state → notify subscribers
  // dippatch does two things:
  // 1. it gets new state
  // 2. it calls all the callback functions in listeners array. which will update the UI.
  function dispatch(action) {
    // Reducer must return a NEW state (never mutate the old one)
    // we get new state
    state = reducer(state, action)

    // Tell everyone who subscribed: "state changed"
    // we call all the callback functions in listeners array. which will update the UI.
    // we push callback function (render) to listeners array.
    listeners.forEach((listener) => listener())

    return action // real Redux also returns the action
  }

  // subscribe(fn) → call fn after every dispatch
  // returns unsubscribe() so you can stop listening
  function subscribe(listener) {
    listeners.push(listener)

    // Unsubscribe = remove this listener from the array
    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  return { getState, dispatch, subscribe }
}

// ─────────────────────────────────────────────
// 2. Action types + creators (optional, but clear)
// ─────────────────────────────────────────────
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const ADD = 'ADD'

const increment = () => ({ type: INCREMENT })
const decrement = () => ({ type: DECREMENT })
const add = (amount) => ({ type: ADD, payload: amount })

// ─────────────────────────────────────────────
// 3. Reducer — (oldState, action) => newState
// ─────────────────────────────────────────────
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + 1 }

    case DECREMENT:
      return { value: state.value - 1 }

    case ADD:
      return { value: state.value + action.payload }

    // Unknown action → return same state (required)
    default:
      return state
  }
}

// ─────────────────────────────────────────────
// 4. Create the store
// ─────────────────────────────────────────────
const store = createStore(counterReducer)
console.log('==>', store);
console.log('-------------------');
console.log('==>', typeof store); // object
console.log('-------------------');
console.log('==>', store.getState()); // {value: 0}
console.log('-------------------');
console.log('==>', 'store.dispatch', store.dispatch);
console.log('-------------------');
console.log('==>', 'store.subscribe', store.subscribe);
console.log('-------------------');
// store:  {getState: ƒ, dispatch: ƒ, subscribe: ƒ}

// ─────────────────────────────────────────────
// 5. UI — subscribe so the page updates on every dispatch
// ─────────────────────────────────────────────
const countEl = document.getElementById('count')
const logEl = document.getElementById('log')

function render() {
  countEl.textContent = store.getState().value
}

// Subscribe returns unsubscribe — keep it if you need to stop later
// before that, pushes callback function (render) to listeners array.
const unsubscribe = store.subscribe(render)

// Also log every change (second subscriber — real Redux allows many)
store.subscribe(() => {
  const line = document.createElement('div')
  line.textContent = 'state → ' + JSON.stringify(store.getState())
  logEl.prepend(line)
})

// First paint
render()

// Buttons
document.getElementById('inc').onclick = () => store.dispatch(increment())
document.getElementById('dec').onclick = () => store.dispatch(decrement())
document.getElementById('add5').onclick = () => store.dispatch(add(5))

// Demo unsubscribe: after "Stop listening", the count label stops updating
// (log subscriber still runs — we only removed the render listener)
document.getElementById('stop').onclick = () => {
  unsubscribe()
  logEl.prepend(document.createTextNode('render unsubscribed — count label frozen\n'))
}
