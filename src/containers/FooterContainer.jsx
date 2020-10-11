import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {setRequestError, setRequestBody, setResponseBody, send} from "../actions"
import {compose} from "../utils"
import {withSendsay} from "../hoc"
import {Footer} from "../components"


class FooterContainer extends Component {

  doFormat = () => {
    const {request, setRequestBody, setRequestError} = this.props
    try {
      let value = JSON.parse(request.value)
      value = JSON.stringify(value, null, 2)
      setRequestBody(value)
      return true
    } catch (e) {
      setRequestError()
    }
    return false
  }

  doSend = () => {
    const {send, request, setResponseBody} = this.props
    setResponseBody("")
    if (this.doFormat()) {
      const query = JSON.parse(request.value)
      send({query})
    }
  }

  keydownListener = event => {
    if (event.key === "Enter" && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
      event.preventDefault()
      this.doSend()
    }
    if (event.key === "f" && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
      event.preventDefault()
      this.doFormat()
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keydownListener)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisProps = this.props
    switch (true) {
      case thisProps.isLoading !== nextProps.isLoading:
        return true
      default:
        return false
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownListener)
  }

  render() {
    const {doSend, doFormat} = this
    const {isLoading} = this.props
    const footerProps = {doSend, doFormat, isLoading}
    return <Footer {...footerProps}/>
  }
}

const mapStateToProps =
  ({
     request: {body: requestBody},
     fetch: {isLoading}
   }) => ({
    request: {value: requestBody},
    isLoading
  })

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  setRequestBody,
  setRequestError,
  setResponseBody,
  send: send(sendsayService)
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(FooterContainer)

