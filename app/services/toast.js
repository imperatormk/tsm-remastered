const toasty = require('nativescript-toasty').Toasty

const showToast = (opts = {}) => {
  const obj = {
    ...opts,
    text: `  ${opts.text || ''}  `,
    yAxisOffset: 20,
    duration: 'LONG',
    backgroundColor: '#8f8f8f'
  }
  const toast = new toasty(obj)
  toast.show()
}

export default {
  showToast
}