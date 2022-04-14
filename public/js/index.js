var interval = null
const updateFrequency = 100
var delta = 0
var updateTimes = 0
pickedColour = null
const colours = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "white",
  "black",
]
const colourPaletteId = "colour_palette"

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

const changePixelColor = (pixelId, color) => {
  logger.info("changePixelColor", pixelId, color)
  api.changePixelColour(pixelId, color).then((response) => {
    $(`#${pixelId}`).css("background-color", color)
  })
}

const setInitialPixels = () => {
  api.getAllPixels().then((pixels) => {
    logger.info("set Pixels")
    $("#container").empty()
    for (var i = 0; i < pixels.length; i++) {
      //TODO make method in elements
      appendPixel(pixels[i], "#container")
    }
  })
}

const getDelta = async () => {
  await api.getDelta()
}

const changePickedColour = (colour) => {
  logger.info("changePickedColour", colour)
  pickedColour = colour
  changeIconColour(colour)
}

const setColourPalette = () => {
  const palette = $(`#${colourPaletteId}`)
  for (let i = 0; i < colours.length; i++) {
    const colour = colours[i]
    appendColourOption(colour, palette)
  }
}

$("document").ready(function () {
  setMenu()
  setColourPalette()
  setInitialPixels()
  delta = getDelta()
  startIconCycle()
  debug = true
  // updateManager = startRefresh()
})