debug = false

const displayError = async (error) => {
  alert(error)
}

const logger = {
  error(message) {
    if (debug) {
      console.error(message)
    }
  },
  info(message) {
    if (debug) {
      console.info(message)
    }
  },
  warn(message) {
    if (debug) {
      console.warn(message)
    }
  },
}
