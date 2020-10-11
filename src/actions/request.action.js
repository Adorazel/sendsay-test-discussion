import {SET_REQUEST_BODY, SET_REQUEST_ERROR} from "../actionTypes"

const setRequestBody = body => ({
  type: SET_REQUEST_BODY,
  payload: body
})

const setRequestError = () => SET_REQUEST_ERROR

export {
  setRequestBody,
  setRequestError,
}