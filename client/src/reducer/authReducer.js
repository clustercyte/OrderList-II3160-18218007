import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: localStorage.getItem('token') ? true : false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        token: action.payload,
        isAuth: true
      }
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false
      }
    default:
      return state
  }
}
