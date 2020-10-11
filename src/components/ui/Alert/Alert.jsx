import React from "react"

const Alert = ({error = {}}) => <div className="alert alert--danger">
  <div className="alert__heading">{error.message || "Что-то пошло не так..."}</div>
  <div className="alert__description">{error.description}</div>
</div>

export default Alert