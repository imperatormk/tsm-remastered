import * as appSettings from 'application-settings'
const platformModule = require('tns-core-modules/platform')

const getPlayerHeight = () => {
  const width = platformModule.screen.mainScreen.widthDIPs
  const playerHeight = Math.floor(width / 16 * 9)
  return playerHeight
}

const storeBoolean = ({ key, value }) => {
  appSettings.setBoolean(key, value)
}

const getBoolean = (key) => appSettings.getBoolean(key)

const storeValue = (obj) => {
  const type = typeof obj.value
  if (type === 'boolean') return storeBoolean(obj)
}

const getValue = (key, type) => {
  if (type === 'boolean') return getBoolean(key)
  return null
}

export default {
  getPlayerHeight,
  getValue,
  storeValue
}