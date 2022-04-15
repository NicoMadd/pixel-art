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

const appendPixel = (pixel, containerID) => {
  $(`<div>`, {
    class: "pixel",
    style: `background-color:${pixel.color}`,
    id: pixel.id,
    click: async function () {
      if (!pickedColour) {
        logger.warn("Please pick a colour first")
      } else {
        changePixelColor(containerID, this.id, pickedColour)
      }
    },
  }).appendTo(`#container_${containerID}`)
}

const appendMenuOption = (text, to, click) => {
  $("<div>", {
    class: "menu-option",
    text: text,
    click: click,
  }).appendTo(to)
}

const appendPixelsContainer = (containerId, pixels, to) => {
  $("<div>", {
    class: "pixels-container",
    id: `container_${containerId}`,
  }).appendTo(to)
  for (var i = 0; i < pixels.length; i++) {
    //TODO make method in elements
    appendPixel(pixels[i], containerId)
  }
}
