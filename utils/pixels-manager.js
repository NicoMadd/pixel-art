const { logger } = require("../config/loggerConfig.js")
const { PixelsContainer } = require("./pixel.js")

class PixelsContainerManager {
  constructor(containersCount, x, y) {
    this.x = x
    this.y = y
    this.containers = []
    for (let i = 0; i < containersCount; i++) {
      this.containers.push(new PixelsContainer(i, x, y))
    }
  }

  getContainer(containerId) {
    if (containerId < 0 || containerId >= this.containers.length) {
      throw new Error(`Container ${containerId} doesnt exist`)
    }
    return this.containers[containerId]
  }

  getAllPixels() {
    return this.containers.map((container) => {
      return container.getAllPixels()
    })
  }

  setPixel(containerId, pixelId, color) {
    const container = this.getContainer(containerId)
    const delta = container.setPixelColor(pixelId, color)
    return delta
  }

  getDelta(containerId) {
    const container = this.getContainer(containerId)
    const delta = container.getDelta()
    return delta
  }

  getDeltaPixels(containerId, delta_id) {
    const container = this.getContainer(containerId)
    const { delta, pixels } = container.getDeltaPixels(delta_id)
    return { delta, pixels }
  }
}

module.exports = { PixelsContainerManager }
