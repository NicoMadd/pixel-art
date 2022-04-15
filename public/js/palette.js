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

const getPickedColour = () => {
  return pickedColour
}
