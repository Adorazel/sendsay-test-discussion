import React from "react"
import {SendsayServiceConsumer} from "../contexts"

const withSendsay = () => Wrapped => {
  return props => <SendsayServiceConsumer>{service => <Wrapped {...props} sendsayService={service}/>}</SendsayServiceConsumer>
}

export default withSendsay