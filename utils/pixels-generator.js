const fs = require("fs")
const { Pixel } = require("./pixel")
const pixelsDir = "pixels-map"

const X = 100
const Y = 100

const generateAllPixels = (filename) => {
  var id = 0
  const color = "#000000"
  const pixels = []
  for (var x = 0; x < X; x++) {
    for (var y = 0; y < Y; y++) {
      var pixel = new Pixel(id, x, y, color)
      pixels.push(pixel)
      id++
    }
  }
  fs.writeFileSync(`${pixelsDir}/${filename}`, JSON.stringify(pixels))
}

module.exports = { generateAllPixels }
