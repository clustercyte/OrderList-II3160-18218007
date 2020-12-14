import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/types'

export const tokenConfig = getState => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  if (token) {
    config.headers['x-auth-token'] = token
  }
  return config
}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const login = ({ token }) => {
  return {
    type: LOGIN_SUCCESS,
    payload: token
  }
}
