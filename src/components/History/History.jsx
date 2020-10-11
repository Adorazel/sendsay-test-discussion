import React, {useRef} from "react"
import {CSSTransition} from "react-transition-group"
import {Button, Dropdown} from "../ui"

const History = props => {

  const {historyItems, copiedId, insertItem, doItem, copyItem, deleteItem, cleanHistory} = props

  const historyRow = useRef()
  const historyScroll = useRef()

  const doScroll = event => {
    document.dispatchEvent(new Event("closeAllDropdowns"))
    const $historyRow = historyRow.current
    let increment = parseInt($historyRow.style.left || 0) - parseInt(event.deltaY)
    let min = 0
    if ($historyRow.offsetWidth < $historyRow.scrollWidth + 15) {
      min = $historyRow.offsetWidth - ($historyRow.scrollWidth + 15)
    }
    increment = Math.min(0, increment)
    increment = Math.max(min, increment)
    $historyRow.style.left = increment + "px"
  }

  const doTouchStart = () => {
    document.dispatchEvent(new Event("closeAllDropdowns"))
    historyRow.current.style.left = ""
  }

  return <div className="history">
    <div ref={historyScroll} className="history__scroll--horizontal" onTouchStart={doTouchStart}
         onWheel={doScroll.bind(this)}>
      <div ref={historyRow} className={`history__scroll-content${!historyItems.length ? " history--empty" : ""}`}>
        {
          !historyItems.length && <div>
            <strong>{navigator.platform.match("Mac") ? "Meta" : "Ctrl"}+Enter</strong>&nbsp;— отправить запрос.
            {" "}
            <strong>{navigator.platform.match("Mac") ? "Meta" : "Ctrl"}+f</strong>&nbsp;— отформатировать запрос.
          </div>
        }
        {
          historyItems.map(item => <div key={item.id} className="history__item">
            <Dropdown className="ml-5" container={historyScroll.current}>
              <Dropdown.Toggle onClick={() => insertItem(item.id)}>
                <span className={`request-dot request-dot-${item.isError ? "danger" : "success"}`}/>
                {item.query["action"]}
                <CSSTransition in={copiedId === item.id} timeout={500} classNames="history__item-copied"
                               mountOnEnter unmountOnExit>
                  <span className="history__item-copied">Скопировано</span>
                </CSSTransition>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => doItem(item.id)}>Выполнить</Dropdown.Item>
                <Dropdown.Item onClick={() => copyItem(item.id)}>Скопировать</Dropdown.Item>
                <div className="dropdown-divider"/>
                <Dropdown.Item variant="danger" data-type="delete" onClick={() => deleteItem(item.id)}>Удалить</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>)
        }
      </div>
    </div>
    {
      !!historyItems.length && <div className="history__trash">
        <Button variant="simple" onClick={cleanHistory}>
          <svg width="18" height="18" viewBox="0 0 18 18" className="icon" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7,16.5c0.4,0.4,0.4,0.9,0,1.3c-0.2,0.2-0.4,0.3-0.6,0.3c-0.3,0-0.5-0.1-0.6-0.3L9,10.3l-7.5,7.5
	c-0.4,0.4-0.9,0.4-1.3,0C0.1,17.5,0,17.4,0,17.1c0-0.3,0.1-0.5,0.3-0.6L7.7,9L0.3,1.5c-0.4-0.4-0.4-0.9,0-1.3s0.9-0.4,1.3,0L9,7.7
	l7.5-7.5c0.4-0.4,0.9-0.4,1.3,0c0.4,0.4,0.4,0.9,0,1.3L10.3,9L17.7,16.5z"/>
          </svg>
        </Button>
      </div>
    }
  </div>
}

export default History