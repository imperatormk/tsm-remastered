import { Toasty, ToastDuration } from 'nativescript-toasty'
import { Color } from 'tns-core-modules/color'

const showToast = (opts = {}) => {
  const obj = {
    ...opts,
    text: `  ${opts.text || ''}  `,
    yAxisOffset: 20,
    backgroundColor: '#e5e5e5',
    textColor: new Color('#8c8c8c'),
    duration: ToastDuration.LONG
  }
  const toast = new Toasty(obj)
  toast.show()
}

export default {
  showToast
}