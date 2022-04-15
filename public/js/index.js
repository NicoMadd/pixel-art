var interval = null
const updateFrequency = 100
var delta = 0
var updateTimes = 0

const stopRefresh = () => {
  clearInterval(interval)
}

const startRefresh = () => {
  interval = setInterval(updatePixels, updateFrequency)
}

const updatePixels = async () => {
  updateTimes++
  if (updateTimes % 10 == 0) {
    logger.info("Updating pixels", delta)
  }
  api.getDeltaPixels(delta).then(({ lastDelta, pixels }) => {
    if (lastDelta >= delta) {
      delta = lastDelta
      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i]
        const pixelId = pixel.id
        const pixelColor = pixel.color
        $(`#${pixelId}`).css("background-color", pixelColor)
      }
    } else {
      // lost synchronization
      logger.info("lost synchronization")
      setInitialPixels()
    }
  })
}

const changePixelColor = (containerId, pixelId, color) => {
  logger.info("changePixelColor", containerId, pixelId, color)
  api.changePixelColour(containerId, pixelId, color).then((response) => {
    $(`#container_${containerId} #${pixelId}`).css("background-color", color)
  })
}

const setInitialPixels = () => {
  api.getAllPixels().then((containers) => {
    logger.info("set Pixels")
    containers.forEach((container) => {
      const containerId = container.container_id
      const pixels = container.pixels
      $(`#container_${containerId}`).empty()
      appendPixelsContainer(containerId, pixels, "main")
    })
  })
}

const getDelta = async () => {
  await api.getDelta()
}

$("document").ready(function () {
  setMenu()
  setColourPalette()
  setInitialPixels()
  // delta = getDelta()
  startIconCycle()
  debug = true
  // updateManager = startRefresh()
})
