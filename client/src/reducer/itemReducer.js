import {
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  ITEM_LOADING,
  EDIT_ITEM
} from '../actions/types'

const initialState = {
  items: [],
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        items: action.payload,
        loading: false
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case ITEM_LOADING:
      return {
        ...state,
        loading: true
      }
    case EDIT_ITEM:
      const temp = state.items
      temp.find(item => item._id === action.payload.id).name =
        action.payload.name
      console.log(temp)
      return {
        ...state,
        items: temp
      }
    default:
      return state
  }
}
