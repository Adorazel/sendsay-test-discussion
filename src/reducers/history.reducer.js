import {ADD_HISTORY_ITEM, DELETE_HISTORY_ITEM, SET_HISTORY} from "../actionTypes"

const HISTORY_MAX_LENGTH = 15

const sorter = (a, b) => a.timestamp === b.timestamp ? 0 : a.timestamp < b.timestamp ? 1 : -1

const saveHistory = history => {
  try {
    localStorage.setItem("SENDSAY_HISTORY", JSON.stringify(history))
  } catch (e) {
    process.env.NODE_ENV === "development" && console.log(e)
  }
}

const initialState = {
  items: []
}

const historyReducer = (state = initialState, action) => {

  let history

  switch (action.type) {

    case ADD_HISTORY_ITEM:
      history = [...state.items, action.payload]
      const query = JSON.stringify(action.payload.query)
      const item = state.items.find(item => JSON.stringify(item.query) === query && item.isError === action.payload.isError)
      if (item) {
        history = [...state.items]
        const index = state.items.indexOf(item)
        history[index].timestamp = action.payload.timestamp
        history[index].isError = action.payload.isError
      }
      history = history.sort(sorter).slice(0, HISTORY_MAX_LENGTH + 1)
      saveHistory(history)
      return {
        ...state,
        items: history
      }

    case DELETE_HISTORY_ITEM:
      history = [...state.items.filter(item => item.id !== action.payload)].sort(sorter)
      saveHistory(history)
      return {
        ...state,
        items: history
      }

    case SET_HISTORY:
      saveHistory(action.payload)
      return {
        ...state,
        items: action.payload
      }

    default:
      return state
  }
}

export default historyReducer