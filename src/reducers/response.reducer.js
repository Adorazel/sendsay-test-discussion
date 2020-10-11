import {SET_RESPONSE_BODY, SET_RESPONSE_ERROR} from "../actionTypes"

const initialState = {
  body: "",
  error: false
}

const responseReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_RESPONSE_BODY:
      return {
        ...state,
        body: action.payload,
        error: false,
      }

    case SET_RESPONSE_ERROR:
      return {
        ...state,
        error: true,
      }

    default:
      return state
  }

}

export default responseReducer