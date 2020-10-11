import React, {forwardRef} from "react"

const Toggle = forwardRef((props, ref) => {

  const {className, onClick, children, toggle, state, ...otherProps} = props

  return <div ref={ref}  {...otherProps}
              className={`dropdown-toggle${state.isOpened ? " hover" : ""}${className ? ` ${className}` : ""}`}>
    <button type="button" className="btn btn-toggle" onClick={onClick}>{children}</button>
    <button type="button" className="btn btn-toggle dropdown-toggle-caret" onClick={toggle}/>
  </div>
})

Toggle.displayName = "DropdownToggle"

export default Toggle