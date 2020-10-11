const fallbackCopyTextToClipboard = text => {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.position = "fixed"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand("copy")
    process.env.NODE_ENV === "development" && console.log("Скопировано")
    return true
  } catch (err) {
    process.env.NODE_ENV === "development" && console.log(err)
  }
  document.body.removeChild(textArea)
  return false
}

const copyToClipboard = text => {
  if (!navigator.clipboard) return fallbackCopyTextToClipboard(text)
  return navigator.clipboard.writeText(text).then(() => {
    process.env.NODE_ENV === "development" && console.log("Скопировано")
    return true
  }, error => {
    process.env.NODE_ENV === "development" && console.log(error)
    return false
  })
}

export default copyToClipboard