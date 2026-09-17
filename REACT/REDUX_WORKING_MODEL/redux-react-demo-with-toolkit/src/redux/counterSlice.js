import { createSlice } from '@reduxjs/toolkit'

/**
 * createSlice — RTK replaces separate action files + reducer files.
 * It auto-generates:
 *   - action creators (increment, decrement)
 *   - action types   ('counter/increment', 'counter/decrement')
 *   - the reducer    (counterSlice.reducer)
 */
const counterSlice = createSlice({
  name: 'counter', // prefix for auto-generated action types
  initialState: { value: 0 },
  reducers: {
    // RTK uses Immer — you can write "mutating" code; it produces immutable updates
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
