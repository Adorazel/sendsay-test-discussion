import React from "react"
import Helmet from "react-helmet"
import {HeaderContainer, HistoryContainer, ConsoleContainer, FooterContainer} from "../containers"


const ConsolePage = () => <div className="console__page">
  <Helmet>
    <meta name="viewport" content="width=640, initial-scale=1" />
  </Helmet>
  <HeaderContainer/>
  <HistoryContainer/>
  <ConsoleContainer/>
  <FooterContainer/>
</div>

export default ConsolePage