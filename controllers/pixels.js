const { logger } = require("../config/loggerConfig.js")
const { generateAllPixels } = require("../utils/pixels-generator.js")
const { PixelsContainerManager } = require("../utils/pixels-manager.js")
const { PixelsContainer } = require("../utils/pixel.js")
const X = 100
const Y = 100

var container = new PixelsContainer(0, X, Y)
const pixelsManager = new PixelsContainerManager()

const getAllPixels = async (req, res) => {
  logger.info("getAllPixels")
  const pixels = container.getAllPixels()
  const delta = container.getDelta()
  res.send({ pixels, delta })
}

const setPixel = async (req, res) => {
  try {
    const { pixelId, color } = req.body
    console.log(pixelId, color)
    var delta = container.setPixelColor(pixelId, color)
    res.send({ delta })
  } catch (error) {
    logger.error(error)
    res.status(409).send({ error: { message: error.message } })
  }
}

const getDeltaPixels = async (req, res) => {
  // logger.info("getDeltaPixels")
  const { deltaID } = req.params

  const { delta, pixels } = container.getDeltaPixels(deltaID)
  res.send({ delta, pixels })
}

const getDelta = async (req, res) => {
  // logger.info("getDelta")
  const delta = container.getDelta()
  res.send({ delta })
}

const generatePixels = async (req, res) => {
  logger.info("generatePixels")
  generateAllPixels("0.json")
  res.send({ message: "Pixels generated" })
}

module.exports = {
  getAllPixels,
  setPixel,
  getDeltaPixels,
  getDelta,
  generatePixels,
}
