import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {setRequestBody} from "../actions"
import {Console} from "../components"


class ConsoleContainer extends Component {

  changeHandler = event => {
    const {setRequestBody} = this.props
    setRequestBody(event.target.value)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisProps = this.props
    switch (true) {
      case thisProps.isLoading !== nextProps.isLoading:
        return true
      case thisProps.request.value !== nextProps.request.value:
        return true
      case thisProps.request.isValid !== nextProps.request.isValid:
        return true
      case thisProps.response.value !== nextProps.response.value:
        return true
      case thisProps.response.isValid !== nextProps.response.isValid:
        return true
      default:
        return false
    }
  }

  render() {
    const {changeHandler} = this
    const {request, response, isLoading} = this.props
    const consoleProps = {request, response, changeHandler, isLoading}
    return <Console {...consoleProps}/>
  }
}

const mapStateToProps =
  ({
     request: {body: requestBody, error: requestError},
     response: {body: responseBody, error: responseError},
     fetch: {isLoading}
   }) => ({
    request: {value: requestBody, isValid: !requestError},
    response: {value: responseBody, isValid: !responseError},
    isLoading
  })

const mapDispatchToProps = dispatch => bindActionCreators({setRequestBody}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleContainer)
