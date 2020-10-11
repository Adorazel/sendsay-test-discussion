import React, {Component, Children, cloneElement} from "react"
import Item from "./Item"
import Menu from "./Menu"
import Toggle from "./Toggle"


export default class Dropdown extends Component {

  static Toggle = Toggle
  static Menu = Menu
  static Item = Item

  constructor(props) {
    super(props)

    this.container = props.container
    this.trigger = React.createRef()
    this.menu = React.createRef()

    this.state = {
      isOpened: false,
      position: {x: "", y: ""}
    }
  }

  setPosition = () => {
    this.setState(state => {
      let x, y
      x = y = ""
      if (state.isOpened) {
        const $menu = this.menu.current
        const $trigger = this.trigger.current
        const {left, right, bottom} = $trigger.getBoundingClientRect()
        $menu.style.minWidth = $trigger.offsetWidth + "px"
        x = right - $menu.offsetWidth
        y = bottom + 1
        if (this.container) {
          const {left: l, right: r} = this.container.getBoundingClientRect()
          x = Math.min(right, r) - $menu.offsetWidth
          if (x < l + 15) x = left
          x = Math.max(x, l)
        }
      }
      return {
        ...state,
        position: {x, y}
      }
    })
  }

  open = () => {
    this.setState(state => ({
      ...state,
      isOpened: true,
    }), () => {
      this.setPosition()
      document.addEventListener("click", this.close)
      document.addEventListener("keydown", this.close)
      document.addEventListener("closeAllDropdowns", this.close)
    })
  }

  close = event => {

    if (!this.menu.current) return

    if (event.key === "Escape" || event.type === "click" || event.type === "closeAllDropdowns") {
      /* Проверка элемента истории "Удалить". Если это ОН,
      то изменять состояние дропдауна не нужно, так как от просто удаляется из списка */
      const isMenuItem = this.menu.current.contains(event.target)
      if (!isMenuItem || (isMenuItem && event.target.dataset.type !== "delete")) {

        this.setState(state => ({
          ...state,
          isOpened: false,
        }), () => {
          this.setPosition()
          document.removeEventListener("click", this.close)
          document.removeEventListener("keydown", this.close)
          document.removeEventListener("closeAllDropdowns", this.close)
        })
      }
    }
  }

  toggle = event => this.state.isOpened ? this.close(event) : this.open(event)

  componentDidMount() {
    window.addEventListener("resize", this.setPosition)
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisState = this.state
    switch (true) {
      case thisState.isOpened !== nextState.isOpened:
        return true
      case thisState.position.x !== nextState.position.x:
        return true
      case thisState.position.y !== nextState.position.y:
        return true
      default:
        return false
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setPosition)
  }

  render() {
    const {className, children, ...otherProps} = this.props
    const {state, toggle, trigger, menu} = this
    return <div className={`dropdown${className ? ` ${className}` : ""}`} {...otherProps}>
      {
        Children.map(children, element => {

          if (!element.type) return element

          let children = element.props.children
          children = Array.isArray(children) ? [...children] : [children]

          switch (element.type.displayName) {
            case "DropdownToggle":
              return cloneElement(
                element,
                {
                  ...element.props,
                  ref: trigger,
                  toggle,
                  state
                },
                children
              )
            case "DropdownMenu":
              return cloneElement(
                element,
                {
                  ...element.props,
                  ref: menu,
                  state
                },
                children
              )
            default:
              return element
          }
        })
      }
    </div>
  }
}