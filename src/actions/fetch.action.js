import {SET_FETCH_ERROR, SET_FETCH_LOADING} from "../actionTypes"
import {addHistoryItem, setResponseBody, setResponseError} from "./"
import {v4} from "uuid"

const setLoading = () => SET_FETCH_LOADING

const setFetchSuccess = () => SET_FETCH_ERROR

const setFetchError = error => ({
  type: SET_FETCH_ERROR,
  payload: error
})

const send = sendsay => ({query, options}) => dispatch => {
  dispatch(setLoading())
  const req = sendsay.request(query, options)
  req.then(res => {
    dispatch(setFetchSuccess())
    try {
      const body = JSON.stringify(res, null, 2)
      dispatch(setResponseBody(body))
      dispatch(addHistoryItem({
        id: v4(),
        timestamp: Date.now(),
        isError: false,
        query
      }))
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e)
    }
  }).catch(error => {
    /* При использовании метода onError ошибка отстается непойманой и выводится в консоль.
       В библиотеке sendsay-api перепутан порядок методов then и catch.
       По этой причине я смользую catch вместо метода onError */
    dispatch(setFetchError(error))
    try {
      const body = JSON.stringify(error, null, 2)
      dispatch(setResponseBody(body))
      dispatch(setResponseError())
      dispatch(addHistoryItem({
        id: v4(),
        timestamp: Date.now(),
        isError: true,
        query
      }))
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e)
    }
  })
}


export {
  send
}