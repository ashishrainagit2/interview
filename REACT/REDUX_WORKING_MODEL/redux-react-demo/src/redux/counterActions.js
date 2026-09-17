// Action type constants — plain strings that describe "what happened"
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT = 'counter/DECREMENT'

// Action creators — functions that return a plain action object { type, ...payload }
export const increment = () => ({
  type: INCREMENT,
})

export const decrement = () => ({
  type: DECREMENT,
})
