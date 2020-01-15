import * as Toast from 'nativescript-toast'

const showToast = (text) => {
  if (!text) return
  Toast.makeText(text, 'long').show()
}

export default {
  showToast
}