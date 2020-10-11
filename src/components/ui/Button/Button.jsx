import React, {forwardRef} from "react"

const Button = forwardRef((props, ref) => {

  const {variant = "primary", loading, children, className, ...otherProps} = props

  return <button ref={ref} type="button"
                 className={`btn btn--${variant}${loading ? " btn--loading" : ""}${className ? ` ${className}` : ""}`} {...otherProps}>
    {children}
  </button>
})

export default Button