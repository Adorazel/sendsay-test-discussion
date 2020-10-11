import React, {forwardRef} from "react"

const Item = forwardRef((props, ref) => {

  const {variant = "primary", className, children, ...otherProps} = props

  return <div ref={ref} className={`dropdown-item dropdown-item-${variant}${className ? ` ${className}` : ""}`} {...otherProps}>
    {children}
  </div>
})

Item.displayName = "DropdownItem"

export default Item