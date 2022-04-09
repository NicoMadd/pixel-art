const apiUrl = "http://localhost:5000/api"
const updateFrequency = 100
var delta = 0
var updateTimes = 0
pickedColour = "red"
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
const colourPaletterId = "colour_palette"

const getDeltaPixels = async (callback) => {
  axios.get(`${apiUrl}/pixels/${delta}`).then(callback)
}

const updatePixels = () => {
  updateTimes++
  if (updateTimes % 10 == 0) {
    console.log("Updating pixels", delta)
  }
  getDeltaPixels(async (res) => {
    const lastDelta = res.data.delta
    if (lastDelta >= delta) {
      delta = lastDelta
      const pixels = res.data.pixels
      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i]
        const pixelId = pixel.id
        const pixelColor = pixel.color
        $(`#${pixelId}`).css("background-color", pixelColor)
      }
    } else {
      // lost synchronization
      console.log("lost synchronization")
      setPixels()
    }
  })
}

const changePixelColor = (pixelId, color) => {
  console.log("changePixelColor", pixelId, color)
  axios
    .post(`${apiUrl}/pixels`, {
      pixelId: pixelId,
      color: color,
    })
    .then(function (response) {
      if (response.status == 200) {
        $(`#${pixelId}`).css("background-color", color)
      }

      // setPixels()
    })
    .catch(function (error) {
      console.log(error)
    })
}
const setPixels = () => {
  $.ajax({
    url: `${apiUrl}/pixels`,
    method: "GET",
    success: function (data) {
      console.log("set Pixels")
      $("#container").empty()
      pixels = data.pixels
      lastDelta = data.delta
      for (var i = 0; i < pixels.length; i++) {
        //TODO make method in elements
        appendPixel(pixels[i], "#container")
      }
      delta = lastDelta
    },
  })
}

const getDelta = async () => {
  await axios.get(`${apiUrl}/pixels/delta`).then((res) => {
    delta = res.data.delta
    return delta
  })
}

const changePickedColour = (colour) => {
  console.log("changePickedColour", colour)
  pickedColour = colour
}

const setColourPalette = () => {
  const palette = $(`#${colourPaletterId}`)
  for (let i = 0; i < colours.length; i++) {
    const colour = colours[i]
    const colourId = `palette-colour-${colour}`
    appendColourOption(colour, palette)
    $(`#${colourId}`).click(function () {
      changePickedColour(colour)
    })
  }
}

$("document").ready(function () {
  setColourPalette()
  setPixels()
  delta = getDelta()
  setInterval(updatePixels, updateFrequency)
})
