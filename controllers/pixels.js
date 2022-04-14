const { logger } = require("../config/loggerConfig.js")
const fs = require("fs")

const X = 100
const Y = 100

const validColours = [
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

var pixels = []
var deltaPixels = []
var delta = 0

const validatePixelChange = (pixelId, color) => {
  if (pixelId < 0 || pixelId >= X * Y) {
    throw new Error(`PixelId ${pixelId} is out of range`)
  } else if (validColours.includes(color)) {
    return
  } else if (color.length != 6) {
    throw new Error(`Color ${color} is not a valid color`)
  } else if (!color.match(/^#[0-9A-F]{6}$/i)) {
    throw new Error(`Color ${color} is not a valid color`)
  }
}

fs.readFile("pixels.json", "utf8", function (err, data) {
  if (err) throw err
  pixels = JSON.parse(data)
})

const generateAllPixels = (req, res) => {
  var id = 1
  const color = "#000000"
  for (var x = 0; x < X; x++) {
    for (var y = 0; y < Y; y++) {
      id++
      var pixel = { id, x, y, color }
      pixels.push(pixel)
    }
  }
  fs.writeFileSync("pixels.json", JSON.stringify(pixels))
}

const getAllPixels = async (req, res) => {
  logger.info("getAllPixels")
  res.send({ pixels, delta })
}

const setPixel = async (req, res) => {
  try {
    const { pixelId, color } = req.body
    console.log(pixelId, color)
    validatePixelChange(pixelId, color)
    const pixel = pixels.find((pixel) => pixel.id == pixelId)
    if (!pixel) throw new Error(`PixelId ${pixelId} doesnt exist`)
    pixel.color = color
    deltaPixels.push(pixel)
    delta++
    res.send({ delta })
  } catch (error) {
    logger.error(error)
    res.status(409).send({ error: { message: error.message } })
  }
}

const getDeltaPixels = async (req, res) => {
  // logger.info("getDeltaPixels")
  const { deltaID } = req.params
  // console.log("incoming delta",deltaID)
  // console.log("delta",delta)
  if (delta > deltaID) {
    newPixels = deltaPixels.slice(deltaID, delta)
    res.send({ delta, pixels: newPixels })
  } else {
    res.send({ delta, pixels: [] })
  }
}

const getDelta = async (req, res) => {
  // logger.info("getDelta")
  res.send({ delta })
}

module.exports = {
  getAllPixels,
  setPixel,
  getDeltaPixels,
  getDelta,
}
