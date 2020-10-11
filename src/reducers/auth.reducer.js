import {SET_AUTH_ERROR, SET_AUTH_LOADING, SET_AUTH_STATUS, SET_AUTH_USER} from "../actionTypes"

const saveUser = ({login, sublogin}) => {
  try {
    localStorage.setItem("SENDSAY_USER", JSON.stringify({login, sublogin}))
  } catch (e) {
    process.env.NODE_ENV === "development" && console.log(e)
  }
}

const initialState = {
  isAuth: false,
  login: null,
  sublogin: null,
  isLoading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_AUTH_USER:
      const {login, sublogin} = action.payload
      /* При разработке я столкнулся с тем, что метод getUsername (как врочем и action pong)
         возвращает не то значение, что я ожидал получить.
         Поэтому я решил сохранять пользователя в localStorage */
      saveUser({login, sublogin})
      return {
        ...state,
        login,
        sublogin,
      }

    case SET_AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: action.payload,
        error: null,
        isLoading: false
      }

    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuth: false,
        isLoading: false
      }

    default:
      return state
  }
}

export default authReducer