import React, {useRef, useState, useEffect} from "react"

const Console = props => {

  const {request, response, changeHandler, isLoading} = props

  const [dividerPosition, setDividerPosition] = useState(.5)
  const divider = useRef()
  const area = useRef()

  const startHandler = () => {
    area.current.addEventListener("mousemove", moveListener)
    area.current.addEventListener("mouseup", endListener)
    area.current.addEventListener("touchmove", moveListener)
    area.current.addEventListener("touchend", endListener)
  }

  const moveListener = event => {
    let value = event.clientX || event.touches[0].clientX
    value = value / window.innerWidth
    value = Math.min(.8, value)
    value = Math.max(.2, value)
    setDividerPosition(value)
  }

  const endListener = () => {
    area.current.removeEventListener("mousemove", moveListener)
    area.current.removeEventListener("mouseup", endListener)
    area.current.removeEventListener("touchmove", moveListener)
    area.current.removeEventListener("touchend", endListener)
  }

  useEffect(() => {
    const initialPosition = localStorage.getItem("SENDSAY_DIVIDER_POSITION") || ".5"
    setDividerPosition(parseFloat(initialPosition))
  }, [])

  useEffect(() => {
    if (dividerPosition !== .5) localStorage.setItem("SENDSAY_DIVIDER_POSITION", "" + dividerPosition)
  }, [dividerPosition])

  return <section className="console">
    <div ref={area} className="console__draggable-area">
      <div className={`console__column${request.isValid ? "" : " console__column--error"}`}
           style={{width: `${100 * dividerPosition}%`}}>
        <label htmlFor="request">Запрос:</label>
        <textarea name="request" id="request" className="console__field"
                  value={request.value} onChange={changeHandler} disabled={isLoading}/>
      </div>
      <div ref={divider} onMouseDown={startHandler} onTouchStart={startHandler} className="console__divider"/>
      <div className={`console__column${response.isValid ? "" : " console__column--error"}`}
           style={{width: `${100 * (1 - dividerPosition)}%`}}>
        <label htmlFor="response">Ответ:</label>
        <textarea name="response" id="response" className="console__field" readOnly value={response.value}/>
      </div>
    </div>
  </section>
}

export default Console