const {
  broadcast,
  strToUint8Array,
} = require("../config/configureWebSocket.js")
const { logger } = require("../config/loggerConfig.js")
const { generateAllPixels } = require("../utils/pixels-generator.js")
const { PixelsContainerManager } = require("../utils/pixels-manager.js")
const X = 100
const Y = 100
const ncontainers = 4
const pixelsManager = new PixelsContainerManager(ncontainers, X, Y)

const getAllPixels = async (req, res) => {
  logger.info("getAllPixels")
  const containers = pixelsManager.getAllPixels()
  res.send({ containers })
}

const setPixel = async (req, res) => {
  try {
    const { container_id, pixel_id, color } = req.body
    console.log(container_id, pixel_id, color)
    const delta = pixelsManager.setPixel(container_id, pixel_id, color)
    broadcast(JSON.stringify({ container_id, pixel_id, color }))
    res.send({ delta })
  } catch (error) {
    logger.error(error)
    res.status(409).send({ error: { message: error.message } })
  }
}

const getDeltaPixels = async (req, res) => {
  // logger.info("getDeltaPixels")
  try {
    const { container_id, delta_id } = req.params
    const { delta, pixels } = pixelsManager.getDeltaPixels(
      container_id,
      delta_id
    )
    res.send({ delta, pixels })
  } catch (error) {
    logger.error(error)
    res.status(409).send({ error: { message: error.message } })
  }
}

const getDelta = async (req, res) => {
  // logger.info("getDelta")
  try {
    const { container_id } = req.params
    const delta = pixelsManager.getDelta(container_id)
    res.send({ delta })
  } catch (error) {
    logger.error(error)
    res.status(409).send({ error: { message: error.message } })
  }
}

const generatePixels = async (req, res) => {
  logger.info("generatePixels")
  for (let i = 0; i < ncontainers; i++) {
    generateAllPixels(`${i}.json`)
  }
  res.send({ message: "Pixels generated" })
}

module.exports = {
  getAllPixels,
  setPixel,
  getDeltaPixels,
  getDelta,
  generatePixels,
}
