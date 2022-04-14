const appendColourOption = (colour, to) => {
  const colourId = `palette-colour-${colour}`
  //add colour option to palette
  $("<div>", {
    class: "colour-palette option",
    style: `background-color:${colour}`,
    id: colourId,
    click: function () {
      changePickedColour(colour)
    },
  }).appendTo(to)
}

const appendPixel = (pixel, to) => {
  $(`<div>`, {
    class: "pixel",
    style: `background-color:${pixel.color}`,
    id: pixel.id,
    click: async function () {
      if (!pickedColour) {
        logger.warn("Please pick a colour first")
      } else {
        changePixelColor(this.id, pickedColour)
      }
    },
  }).appendTo(to)
}
