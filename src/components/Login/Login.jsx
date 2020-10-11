import React from "react"
import {Button, Alert} from "../ui"
import {Copyright} from "../"
import logo from "../../img/logo.png"
import logo_2x from "../../img/logo@2x.png"

const Login = props => {

  const {loginHandler, changeHandler, loginRef, isLoading, alertProps, login, sublogin, password, isFormValid} = props

  return <div className="login">
    <div className="login__logo">
      <img src={logo} srcSet={`${logo} 1x, ${logo_2x} 2x`} alt="API-консолька"/>
    </div>
    <div className="login__form">
      <h1 className="login__form-title">API-консолька</h1>
      {alertProps && <Alert error={alertProps}/>}
      <div className={`login__form-group${login.isValid ? "" : " login__form-group--error"}`}>
        <label htmlFor="login">Логин</label>
        <input ref={loginRef} type="text" id="login" name="login" className="login__form-control"
               value={login.value} onChange={changeHandler} disabled={isLoading}/>
      </div>
      <div className="login__form-group">
        <div className="login__label-group">
          <label htmlFor="sublogin">Сублогин</label>
          <span className="login__optional-item">Опционально</span>
        </div>
        <input type="text" id="sublogin" name="sublogin" className="login__form-control"
               value={sublogin.value} onChange={changeHandler} disabled={isLoading}/>
      </div>
      <div className={`login__form-group${password.isValid ? "" : " login__form-group--error"}`}>
        <label htmlFor="password">Пароль</label>
        <input type="password" id="password" name="password" className="login__form-control"
               value={password.value} onChange={changeHandler} disabled={isLoading}/>
      </div>
      <Button onClick={loginHandler} loading={isLoading} disabled={!isFormValid}>Войти</Button>
    </div>
    <Copyright/>
  </div>
}

export default Login