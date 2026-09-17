import { createSlice } from '@reduxjs/toolkit'

const greetingSlice = createSlice({
  name: 'greeting',
  initialState: { name: 'World' },
  reducers: {
    // action.payload holds the value passed to setName('Alice')
    setName: (state, action) => {
      state.name = action.payload
    },
  },
})

export const { setName } = greetingSlice.actions
export default greetingSlice.reducer
