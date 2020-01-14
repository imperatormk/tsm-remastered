const platformModule = require("tns-core-modules/platform")

const getPlayerHeight = () => {
  const width = platformModule.screen.mainScreen.widthDIPs
  const playerHeight = Math.floor(width / 16 * 9)
  return playerHeight
}

export default {
  getPlayerHeight
}