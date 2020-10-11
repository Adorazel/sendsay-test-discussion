import React, {Component} from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {withSendsay} from "../hoc"
import {deleteHistoryItem, purgeHistory, setHistory, setRequestBody, setResponseBody, send} from "../actions"
import {compose, copyToClipboard} from "../utils"
import {History} from "../components"


class HistoryContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      copiedId: null
    }
  }

  insertItem = id => {
    const {historyItems, setRequestBody} = this.props
    const {query} = historyItems.find(item => item.id === id)
    if (query) {
      setRequestBody(JSON.stringify(query, null, 2))
    }
  }

  doItem = id => {
    const {send, historyItems, setRequestBody, setResponseBody} = this.props
    const {query} = historyItems.find(item => item.id === id)
    if (query) {
      setResponseBody("")
      setRequestBody(JSON.stringify(query, null, 2))
      send({query})
    }
  }

  copyItem = id => {
    this.setState({copiedId: null}, () => {
      const {historyItems} = this.props
      const {query} = historyItems.find(item => item.id === id)
      if (query && copyToClipboard(JSON.stringify(query, null, 2))) {
        this.setState({copiedId: id}, () => {
          setTimeout(() => {
            this.setState({copiedId: null})
          }, 500)
        })
      }
    })

  }

  deleteItem = id => {
    const {deleteHistoryItem} = this.props
    deleteHistoryItem(id)
  }

  cleanHistory = () => {
    const {purgeHistory} = this.props
    purgeHistory()
  }

  componentDidMount() {
    try {
      const history = localStorage.getItem("SENDSAY_HISTORY")
      if (history) {
        const {setHistory} = this.props
        setHistory(JSON.parse(history))
      }
    } catch (e) {
      process.env.NODE_ENV === "development" && console.log(e)
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisState = this.state
    const thisProps = this.props
    switch (true) {
      case thisProps.historyItems !== nextProps.historyItems:
        return true
      case thisState.copiedId !== nextState.copiedId:
        return true
      default:
        return false
    }
  }

  render() {
    const {insertItem, doItem, copyItem, deleteItem, cleanHistory} = this
    const {historyItems} = this.props
    const {copiedId} = this.state
    const historyProps = {historyItems, copiedId, insertItem, doItem, copyItem, deleteItem, cleanHistory}
    return <History {...historyProps}/>
  }
}

const mapStateToProps = ({history: {items: historyItems}}) => ({historyItems})

const mapDispatchToProps = (dispatch, {sendsayService}) => bindActionCreators({
  send: send(sendsayService),
  deleteHistoryItem,
  purgeHistory,
  setHistory,
  setRequestBody,
  setResponseBody
}, dispatch)

export default compose(
  withSendsay(),
  connect(mapStateToProps, mapDispatchToProps)
)(HistoryContainer)