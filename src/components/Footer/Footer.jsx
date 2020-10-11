import React from "react"
import {Button} from "../ui"
import {Copyright} from "../"

const Footer = props => {

  const {doSend, doFormat, isLoading} = props

  return <footer className="footer">
    <div className="footer__left">
      <Button onClick={doSend} loading={isLoading}>Отправить</Button>
    </div>
    <div className="footer__center">
      <Copyright/>
    </div>
    <div className="footer__right">
      <Button variant="simple" onClick={doFormat} disabled={isLoading}>
        <svg width="20" height="20" viewBox="0 0 20 20" className="icon" xmlns="http://www.w3.org/2000/svg">
          <path d="M19,9H5C4.4,9,4,8.6,4,8s0.4-1,1-1h14c0.6,0,1,0.4,1,1S19.6,9,19,9z M10,4c0-0.6-0.4-1-1-1H1C0.4,3,0,3.4,0,4
	s0.4,1,1,1h8C9.6,5,10,4.6,10,4z M11,12c0-0.6-0.4-1-1-1H5c-0.6,0-1,0.4-1,1s0.4,1,1,1h5C10.6,13,11,12.6,11,12z M6,16
	c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1s0.4,1,1,1h4C5.6,17,6,16.6,6,16z"/>
        </svg>
        <span className="text">Форматировать</span>
      </Button>
    </div>
  </footer>
}

export default Footer