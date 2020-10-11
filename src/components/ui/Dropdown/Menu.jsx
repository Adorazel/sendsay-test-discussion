import React, {forwardRef} from "react"
import {createPortal} from "react-dom"


const Menu = forwardRef((props, ref) => {

  const {className, state, children, style, ...otherProps} = props

  if (!state.isOpened) return null

  const {x, y} = state.position
  const left = x !== "" ? x + "px" : ""
  const top = y !== "" ? y + "px" : ""

  return createPortal(
    <div ref={ref} className={`dropdown-menu${className ? ` ${className}` : ""}`} style={{left, top}} {...otherProps}>
      {children}
    </div>,
    document.getElementById("portal")
  )
})

Menu.displayName = "DropdownMenu"

export default Menu