import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import greetingReducer from './greetingSlice'

/**
 * configureStore — RTK replaces createStore + combineReducers + DevTools setup.
 *
 * Global state shape (same as vanilla Redux):
 *   {
 *     counter:  { value: 0 },
 *     greeting: { name: 'World' },
 *   }
 *
 * Redux DevTools is enabled automatically in development.
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    greeting: greetingReducer,
  },
})
