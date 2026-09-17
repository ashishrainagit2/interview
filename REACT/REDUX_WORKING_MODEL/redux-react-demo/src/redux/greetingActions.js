// Action types for the greeting slice (separate from counter actions)
export const SET_NAME = 'greeting/SET_NAME'

// Action creator — payload carries the new name
export const setName = (name) => ({
  type: SET_NAME,
  payload: name,
})
