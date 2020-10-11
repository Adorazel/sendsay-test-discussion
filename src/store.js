import {applyMiddleware, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducer from "./reducers"

const stringMiddleware = () => dispatch => action => {
  if (typeof action === "string") return dispatch({type: action})
  return dispatch(action)
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(stringMiddleware, thunk)))

export default store