const iconRefreshFreq = 7000
var iconCycle = null
var i = 0 //index of pa icon to display

const changeIconColour = (colour) => {
  if (colours.includes(colour)) {
    stopIconCycle()
    $("link[rel~='icon']").attr("href", `/icons/${colour}.png`)
  } else {
    startIconCycle()
  }
}

const changeIcon = (href) => {
  $("link[rel~='icon']").attr("href", href)
}
const startIconCycle = () => {
  logger.info("startIconCycle")
  iconCycle = setInterval(() => {
    changeIcon(`/icons/pa${(i++ % 3) + 1}.png`)
  }, iconRefreshFreq)
}

const stopIconCycle = () => {
  logger.info("stopIconCycle")
  clearInterval(iconCycle)
}
