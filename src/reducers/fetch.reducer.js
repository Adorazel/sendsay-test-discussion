import {SET_FETCH_LOADING, SET_FETCH_SUCCESS, SET_FETCH_ERROR} from "../actionTypes"

const initialState = {
  isLoading: false,
  success: true,
  error: null
}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FETCH_LOADING:
      return {
        ...state,
        isLoading: true,
      }

    case SET_FETCH_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
      }

    case SET_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
        isLoading: false,
      }

    default:
      return state
  }

}

export default requestReducer