const menuId = "menu"

const options = [
  {
    name: "Home",
  },
  {
    name: "About",
  },
]

const setMenu = () => {
  const menu = $(`#${menuId} .content`)
  setOptions(options, menu)
}

const setOptions = (options, to) => {
  for (let i = 0; i < options.length; i++) {
    appendMenuOption(options[i].name, to, () =>
      logger.info(`clicked ${options[i].name}`)
    )
  }
}
