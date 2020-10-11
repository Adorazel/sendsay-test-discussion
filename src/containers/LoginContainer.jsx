import React, {Component, createRef} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {setAuthError, signIn} from "../actions"
import {compose} from "../utils"
import {withSendsay} from "../hoc"
import {Login} from "../components"


class LoginContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      login: {value: "", isValid: true, isChanged: false},
      sublogin: {value: "", isValid: true, isChanged: false},
      password: {value: "", isValid: true, isChanged: false},
      isFormValid: true,
      isFormChanged: false
    }

    this.loginRef = createRef()
  }

  clearError = () => {
    const {setAuthError} = this.props
    setAuthError(null)
  }

  changeHandler = event => {

    this.clearError()
    const {name, value} = event.target
    let isValid = false

    this.setState(state => {

      let isFormValid = state.isFormValid

      if (name === "login") {
        /* Минимальная длина 3 символа, максимальная - 20 */
        isValid = /^(?:[A-Z\d][A-Z\d_]{3,20}|[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,6})$/i.test(value.trim())
        isFormValid = state.password.isValid && isValid
      }

      if (name === "password") {
        /* Правила валидации соответствуют таковым при смене пароля на сайте */
        /* Есть строчная буква
           Есть цифра
           Есть заглавная буква
           Минимум 8 символов
         */
        isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\s\da-zA-Z]{8,}$/.test(value.trim())
        isFormValid = state.login.isValid && isValid
      }

      return {
        ...state,
        [name]: {value, isValid, isChanged: true},
        isFormValid
      }
    })
  }

  loginHandler = () => {
    const {login, sublogin, password, isFormValid} = this.state
    const isFormChanged = login.isChanged && password.isChanged

    if (!isFormChanged) {
      return this.setState(state => {
        const {login, password} = state
        return {
          ...state,
          isFormValid: false,
          login: {
            ...login,
            isValid: login.isChanged && login.isValid
          },
          password: {
            ...password,
            isValid: password.isChanged && password.isValid
          }
        }
      })
    }

    const {signIn} = this.props

    if (isFormChanged && isFormValid) signIn({
      login: login.value.trim(),
      sublogin: sublogin.value.trim(),
      password: password.value.trim()
    })
  }

  keydownHandler = event => {
    if (event.key === "Enter") this.loginHandler()
  }

  componentDidMount() {
    this.loginRef.current.focus()
    document.addEventListener("keydown", this.keydownHandler)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisState = this.state
    const thisProps = this.props
    switch (true) {
      case thisProps.error !== nextProps.error:
        return true
      case thisProps.isLoading !== nextProps.isLoading:
        return true
      case thisState.isFormValid !== nextState.isFormValid:
        return true
      case thisState.login.value !== nextState.login.value:
        return true
      case thisState.sublogin.value !== nextState.sublogin.value:
        return true
      case thisState.password.value !== nextState.password.value:
        return true
      case thisState.login.isValid !== nextState.login.isValid:
        return true
      case thisState.sublogin.isValid !== nextState.sublogin.isValid:
        return true
      case thisState.password.isValid !== nextState.password.isValid:
        return true
      default:
        return false
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler)
  }

  render() {
    const {isLoading, error} = this.props
    let alertProps = null
    if (error) alertProps = {
      message: error.explain === "wrong_credentials" && "Вход не вышел",
      description: JSON.stringify(error, ["id", "explain"], 1)
    }
    const {loginHandler, changeHandler, loginRef} = this
    const {login, sublogin, password, isFormValid} = this.state
    const loginProps = {
      loginHandler,
      changeHandler,
      loginRef,
      isLoading,
      alertProps,
      login,
      sublogin,
      password,
      isFormValid
    }
    return <Login {...loginProps}/>
  }
}

const mapStateToProps = ({auth: {error, isLoading}}) => ({error, isLoading})

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  signIn: signIn(sendsayService),
  setAuthError
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginContainer)