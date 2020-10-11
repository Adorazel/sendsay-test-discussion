import {SET_REQUEST_BODY, SET_REQUEST_ERROR} from "../actionTypes"

const initialState = {
  body: "{\"action\":\"pong\"}",
  error: false
}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_REQUEST_BODY:
      return {
        ...state,
        body: action.payload,
        error: false
      }

    case SET_REQUEST_ERROR:
      return {
        ...state,
        error: true
      }

    default:
      return state
  }

}

export default requestReducer