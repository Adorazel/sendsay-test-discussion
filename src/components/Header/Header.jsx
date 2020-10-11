import React from "react"
import logo from "../../img/logo.png"
import logo_2x from "../../img/logo@2x.png"
import {Button} from "../ui"

const Header = props => {

  const {login, sublogin, logoutHandler, isLoading, toggleFullScreen, isFullScreen} = props

  return <header className="header">
    <div className="header__left">
      <div className="header__logo">
        <img src={logo} srcSet={`${logo} 1x, ${logo_2x} 2x`} alt="API-консолька"/>
      </div>
      <h1 className="header__title">API-консолька</h1>
    </div>
    <div className="header__right">
      <div className="header__user">{login}{`${sublogin ? <><span>:</span>sublogin</> : ""}`}</div>
      <Button variant="simple" onClick={logoutHandler} loading={isLoading}>
        <span className="text">Выйти</span>
        <svg width="20" height="20" viewBox="0 0 20 20" className="icon" xmlns="http://www.w3.org/2000/svg">
          <path d="M8,19c0,0.6-0.4,1-1,1H3c-0.8,0-1.6-0.3-2.1-0.9C0.3,18.6,0,17.8,0,17V3c0-0.8,0.3-1.6,0.9-2.1
	C1.4,0.3,2.2,0,3,0h4c0.6,0,1,0.4,1,1S7.6,2,7,2H3C2.7,2,2.5,2.1,2.3,2.3C2.1,2.5,2,2.7,2,3v14c0,0.3,0.1,0.5,0.3,0.7
	C2.5,17.9,2.7,18,3,18h4C7.6,18,8,18.4,8,19z M19.9,10.4c0.1-0.2,0.1-0.5,0-0.8c-0.1-0.1-0.1-0.2-0.2-0.3l-5-5c-0.4-0.4-1-0.4-1.4,0
	s-0.4,1,0,1.4L16.6,9H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h9.6l-3.3,3.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l5-5
	C19.8,10.6,19.9,10.5,19.9,10.4z"/>
        </svg>
      </Button>
      <Button variant="simple" onClick={toggleFullScreen} title={`${isFullScreen ? "Обычный" : "Полноэкранный"}  режим отображения`}>
        <svg width="20" height="20" viewBox="0 0 20 20" className="icon" xmlns="http://www.w3.org/2000/svg">
          {isFullScreen
            ? <path d="M14,20c-0.6,0-1-0.4-1-1v-3c0-0.8,0.3-1.6,0.9-2.1S15.2,13,16,13h3c0.6,0,1,0.4,1,1s-0.4,1-1,1h-3
	c-0.3,0-0.5,0.1-0.7,0.3S15,15.7,15,16v3C15,19.6,14.6,20,14,20z M6,20c-0.6,0-1-0.4-1-1v-3c0-0.3-0.1-0.5-0.3-0.7
	C4.5,15.1,4.3,15,4,15H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h3c0.8,0,1.6,0.3,2.1,0.9C6.7,14.4,7,15.2,7,16v3C7,19.6,6.6,20,6,20z M19,7h-3
	c-0.8,0-1.6-0.3-2.1-0.9C13.3,5.6,13,4.8,13,4V1c0-0.6,0.4-1,1-1s1,0.4,1,1v3c0,0.3,0.1,0.5,0.3,0.7C15.5,4.9,15.7,5,16,5h3
	c0.6,0,1,0.4,1,1S19.6,7,19,7z M4,7H1C0.4,7,0,6.6,0,6s0.4-1,1-1h3c0.3,0,0.5-0.1,0.7-0.3C4.9,4.5,5,4.3,5,4V1c0-0.6,0.4-1,1-1
	s1,0.4,1,1v3c0,0.8-0.3,1.6-0.9,2.1C5.6,6.7,4.8,7,4,7z"/>
            : <path d="M17,20h-3c-0.6,0-1-0.4-1-1s0.4-1,1-1h3c0.3,0,0.5-0.1,0.7-0.3S18,17.3,18,17v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3
	c0,0.8-0.3,1.6-0.9,2.1S17.8,20,17,20z M6,20H3c-0.8,0-1.6-0.3-2.1-0.9C0.3,18.6,0,17.8,0,17v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3
	c0,0.3,0.1,0.5,0.3,0.7C2.5,17.9,2.7,18,3,18h3c0.6,0,1,0.4,1,1S6.6,20,6,20z M19,7c-0.6,0-1-0.4-1-1V3c0-0.3-0.1-0.5-0.3-0.7
	C17.5,2.1,17.3,2,17,2h-3c-0.6,0-1-0.4-1-1s0.4-1,1-1h3c0.8,0,1.6,0.3,2.1,0.9C19.7,1.4,20,2.2,20,3v3C20,6.6,19.6,7,19,7z M1,7
	C0.4,7,0,6.6,0,6V3c0-0.8,0.3-1.6,0.9-2.1C1.4,0.3,2.2,0,3,0h3c0.6,0,1,0.4,1,1S6.6,2,6,2H3C2.7,2,2.5,2.1,2.3,2.3
	C2.1,2.5,2,2.7,2,3v3C2,6.6,1.6,7,1,7z"/>
          }
        </svg>
      </Button>
    </div>
  </header>
}

export default Header