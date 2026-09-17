import { SET_NAME } from './greetingActions'

const initialState = {
  name: 'World',
}

/**
 * Second reducer — only handles greeting/SET_NAME actions.
 * Other action types fall through to `default` and return state unchanged.
 */
export function greetingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload }

    default:
      return state
  }
}
