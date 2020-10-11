import React, {Component} from "react"
import {Header} from "../components"
import {bindActionCreators} from "redux";
import {logout, setUser} from "../actions";
import {compose} from "../utils";
import {withSendsay} from "../hoc";
import {connect} from "react-redux";

class HeaderContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isFullScreen: false
    }
  }

  logoutHandler = () => {
    const {logout} = this.props
    logout()
  }

  toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => this.setState({
        isFullScreen: false
      })).catch(error => process.env.NODE_ENV === "development" && console.log(error))
    } else {
      document.documentElement.requestFullscreen().then(() => this.setState({
        isFullScreen: true
      })).catch(error => process.env.NODE_ENV === "development" && console.log(error))
    }
  }

  keydownHandler = event => {
    if (event.key === "F11") {
      event.preventDefault()
      this.toggleFullScreen()
    }
  }

  componentDidMount() {
    /* При разработке я столкнулся с тем, что метод getUsername (как врочем и action pong)
         возвращает не то значение, что я ожидал получить.
         Поэтому я решил сохранять пользователя в localStorage */
    try {
      const user = localStorage.getItem("SENDSAY_USER")
      if (user) {
        const {setUser} = this.props
        const {login, sublogin} = JSON.parse(user)
        setUser({login, sublogin})
      }
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e)
    }
    document.addEventListener("keydown", this.keydownHandler)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisState = this.state
    const thisProps = this.props
    switch (true) {
      case thisProps.isLoading !== nextProps.isLoading:
        return true
      case thisProps.login !== nextProps.login:
        return true
      case thisProps.sublogin !== nextProps.sublogin:
        return true
      case thisState.isFullScreen !== nextState.isFullScreen:
        return true
      default:
        return false
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler)
  }

  render() {
    const {logoutHandler, toggleFullScreen} = this
    const {isLoading, login, sublogin} = this.props
    const {isFullScreen} = this.state
    const headerProps = {login, sublogin, logoutHandler, isLoading, toggleFullScreen, isFullScreen}
    return <Header {...headerProps}/>
  }

}

const mapStateToProps = ({auth: {isLoading, login, sublogin}}) => ({isLoading, login, sublogin})

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  logout: logout(sendsayService),
  setUser
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(HeaderContainer)

