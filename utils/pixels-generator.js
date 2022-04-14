const fs = require("fs")

const pixelsDir = "pixels-map"

const X = 100
const Y = 100

const readPersistedPixels = (filename, callback) => {
  fs.readFileSync(`${pixelsDir}/${filename}`, "utf8", callback)
}

const generateAllPixels = (filename) => {
  var id = 1
  const color = "#000000"
  for (var x = 0; x < X; x++) {
    for (var y = 0; y < Y; y++) {
      id++
      var pixel = { id, x, y, color }
      pixels.push(pixel)
    }
  }
  fs.writeFileSync(`${pixelsDir}/${filename}`, JSON.stringify(pixels))
}

module.exports = { readPersistedPixels, generateAllPixels }
