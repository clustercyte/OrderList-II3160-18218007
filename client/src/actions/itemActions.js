import axios from 'axios'
import {
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_LOADING,
  EDIT_ITEM
} from './types'
import { tokenConfig } from './authActions'
import { returnError } from './errorActions'

export const getItems = () => dispatch => {
  dispatch(setItemLoading())
  axios
    .get('/api/pesanan')
    .then(res => {
      console.log(res.data.pesanan)
      dispatch({
        type: GET_ITEM,
        payload: res.data.pesanan
      })
    })
    .catch(err => dispatch(returnError(err.res.data, err.res.status)))
}

export const deleteItems = id => (dispatch, getState) => {
  axios.delete(`api/pesanan/${id}`, tokenConfig(getState)).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  )
}

export const addItems = item => (dispatch, getState) => {
  axios
    .post('api/pesanan', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnError(err.res.data, err.res.status)))
}

export const editItems = item => (dispatch, getState) => {
  axios
    .put('api/pesanan', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EDIT_ITEM,
        payload: item
      })
    )
    .catch(err => dispatch(returnError(err.res.data, err.res.status)))
}

export const setItemLoading = () => {
  return {
    type: ITEM_LOADING
  }
}
