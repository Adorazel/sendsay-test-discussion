import {SET_AUTH_ERROR, SET_AUTH_LOADING, SET_AUTH_STATUS, SET_AUTH_USER} from "../actionTypes"

const setLoading = auth => ({
  type: SET_AUTH_LOADING,
  payload: auth
})

const setAuth = auth => ({
  type: SET_AUTH_STATUS,
  payload: auth
})

const setAuthError = error => ({
  type: SET_AUTH_ERROR,
  payload: error
})

const setUser = ({login, sublogin}) => ({
  type: SET_AUTH_USER,
  payload: {login, sublogin}
})


const signIn = sendsay => ({login, sublogin, password}) => dispatch => {
  dispatch(setLoading(true))
  sendsay
    .login({login, sublogin, password})
    .then(() => {
      document.cookie = `sendsay_session=${sendsay.session}`
      /* При разработке я столкнулся с тем, что метод getUsername (как врочем и action pong)
         возвращает не то значение, что я ожидал получить.
         Поэтому я решил сохранять пользователя в localStorage */
      dispatch(setUser({login, sublogin}))
      dispatch(setAuth(true))
    })
    .catch(error => {
      /* При использовании метода onError ошибка отстается непойманой и выводится в консоль.
         В библиотеке sendsay-api перепутан порядок методов then и catch.
         По этой причине я смользую catch вместо метода onError */
      dispatch(setAuthError(error))
    })
}

const logout = sendsay => () => dispatch => {
  dispatch(setLoading(true))
  sendsay
    .performRequest({action: "logout"})
    .then(response => {
      process.env.NODE_ENV === "development" && console.log(response)
      document.cookie = `sendsay_session=; max-age=-1`
      /* При разработке я столкнулся с тем, что метод getUsername (как врочем и action pong)
         возвращает не то значение, что я ожидал получить.
         Поэтому я решил сохранять пользователя в localStorage */
      dispatch(setUser({login: null, sublogin: null}))
      dispatch(setAuth(false))
    })
    .catch(error => {
      /* При использовании метода onError ошибка отстается непойманой и выводится в консоль.
         В библиотеке sendsay-api перепутан порядок методов then и catch.
         По этой причине я смользую catch вместо метода onError */
      dispatch(setAuthError(error))
    })
}

export {
  setAuth,
  signIn,
  logout,
  setAuthError,
  setUser
}