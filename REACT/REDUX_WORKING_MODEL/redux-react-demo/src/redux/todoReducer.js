import {
  FETCH_TODO_FAILURE,
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
} from './todoActions'

const initialState = {
  data: null, // { userId, id, title, completed }
  loading: false,
  error: null,
}

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODO_REQUEST:
      return { ...state, loading: true, error: null }

    case FETCH_TODO_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null }

    case FETCH_TODO_FAILURE:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
