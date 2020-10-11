import {ADD_HISTORY_ITEM, DELETE_HISTORY_ITEM, SET_HISTORY} from "../actionTypes"


const addHistoryItem = item => ({
  type: ADD_HISTORY_ITEM,
  payload: item
})

const deleteHistoryItem = item => ({
  type: DELETE_HISTORY_ITEM,
  payload: item
})

const purgeHistory = () => ({
  type: SET_HISTORY,
  payload: []
})

const setHistory = history => ({
  type: SET_HISTORY,
  payload: history
})

export {
  addHistoryItem,
  deleteHistoryItem,
  purgeHistory,
  setHistory
}