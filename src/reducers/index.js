import {combineReducers} from "redux"
import authReducer from "./auth.reducer"
import requestReducer from "./request.reducer"
import responseReducer from "./response.reducer"
import fetchReducer from "./fetch.reducer"
import historyReducer from "./history.reducer"


export default combineReducers({
  auth: authReducer,
  request: requestReducer,
  response: responseReducer,
  fetch: fetchReducer,
  history: historyReducer
})