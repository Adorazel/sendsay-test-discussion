import React from "react"
import Helmet from "react-helmet"
import {LoginContainer} from "../containers"


const LoginPage = () => <>
  <Helmet>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
  </Helmet>
  <LoginContainer/>
</>

export default LoginPage