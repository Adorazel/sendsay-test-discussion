import {setAuth, signIn, logout, setAuthError, setUser} from "./auth.action"
import {setRequestBody, setRequestError} from "./request.action"
import {setResponseBody, setResponseError} from "./response.action"
import {send} from "./fetch.action"
import {addHistoryItem, deleteHistoryItem, purgeHistory, setHistory} from "./history.action"

export {
  setAuth,
  signIn,
  logout,
  setAuthError,
  setUser,

  setRequestBody,
  setRequestError,

  setResponseBody,
  setResponseError,

  send,

  addHistoryItem,
  deleteHistoryItem,
  purgeHistory,
  setHistory
}