var interval = null
const updateFrequency = 100
var delta = 0
var updateTimes = 0

var mousedown = false

const setPixelColor = (containerId, pixelId, color) => {
  $(`#container_${containerId} #${pixelId}`).css("background-color", color)
}

//API IMPLEMENTATION
const stopRefresh = () => {
  clearInterval(interval)
}

const startRefresh = (socket) => {
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

//WS IMPLEMENTATION

const setSocketUpdates = ({ socket, onMessage }) => {
  onMessage((data) => {
    // console.log("data", data)
    const { container_id, pixel_id, color } = data
    if (container_id == null || pixel_id == null || color == null) {
      logger.info("invalid data")
      return
    }
    $(`#container_${container_id} #${pixel_id}`).css("background-color", color)
  })
}

//------------------------------

const changePixelColor = (containerId, pixelId, color) => {
  // logger.info("changePixelColor", containerId, pixelId, color)
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
  startIconCycle()
  debug = true

  //WS IMPLEMENTATION
  setSocketUpdates(getSocket())

  //API IMPLEMENTATION
  // updateManager = startRefresh(getSocket())

  $("main").mousedown(function () {
    mousedown = true
  })

  $("main").mouseup(function () {
    mousedown = false
  })

  $("main").mousemove(function (e) {
    if (mousedown) {
      const div = $(e.target)
      const containerId = div.parent().attr("id").split("_")[1]
      const pixelId = div.attr("id")
      const color = getPickedColour()
      changePixelColor(containerId, pixelId, color)
    }
  })
})
