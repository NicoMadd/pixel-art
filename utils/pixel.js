const { readPersistedPixels } = require("../utils/pixels-generator.js")

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

class Pixel {
  constructor(id, color) {
    this.id = id
    this.color = color
  }

  getId() {
    return this.id
  }
  getColor() {
    return this.color
  }
  setColor(color) {
    this.color = color
  }
}

class PixelsContainer {
  constructor(id, x, y) {
    this.id = id
    this.x = x
    this.y = y
    this.deltaPixels = []
    this.pixels = require(`../pixels-map/${id}.json`).map((pixel) => {
      return new Pixel(pixel.id, pixel.color)
    })
    this.delta = 0
  }

  validatePixelChange(pixelId, color) {
    if (pixelId < 0 || pixelId >= this.x * this.y) {
      throw new Error(`PixelId ${pixelId} is out of range`)
    } else if (validColours.includes(color)) {
      return
    } else if (color.length != 6) {
      throw new Error(`Color ${color} is not a valid color`)
    } else if (!color.match(/^#[0-9A-F]{6}$/i)) {
      throw new Error(`Color ${color} is not a valid color`)
    }
  }

  setPixelColor(pixelId, color) {
    const pixel = this.getPixel(pixelId)
    pixel.setColor(color)
    this.deltaPixels.push(pixel)
    this.delta++
    return this.delta
  }

  getAllPixels() {
    return this.pixels
  }

  getPixel(pixelId) {
    const pixel = this.pixels.find((pixel) => pixel.id == pixelId)
    if (!pixel) throw new Error(`PixelId ${pixelId} doesnt exist`)
    return pixel
  }

  getDelta() {
    return this.delta
  }

  getDeltaPixels(deltaID) {
    if (this.delta > deltaID) {
      newPixels = this.deltaPixels.slice(deltaID, this.delta)
      return { delta, newPixels }
    } else {
      return { delta, newPixels: [] }
    }
  }
}

module.exports = { PixelsContainer }