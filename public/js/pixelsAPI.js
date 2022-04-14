const apiUrl = "http://localhost:5000/api"

const api = {
  changePixelColour: async (pixelId, color) => {
    return axios
      .post(`${apiUrl}/pixels`, {
        pixelId: pixelId,
        color: color,
      })
      .then((res) => {
        if (res.status == 200) {
          return res.data.delta
        } else {
          throw new Error(res.data.message)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getAllPixels: async () => {
    logger.info("getAllPixels")
    return axios
      .get(`${apiUrl}/pixels`)
      .then((res) => {
        return res.data.pixels
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getDeltaPixels: async (delta) => {
    logger.info("getDeltaPixels")
    logger.info("delta", delta)
    return axios
      .get(`${apiUrl}/pixels/${delta}`)
      .then((res) => {
        const { delta, pixels } = res.data
        return { lastDelta: delta, pixels: pixels }
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getDelta: async () => {
    logger.info("getDelta")
    axios
      .get(`${apiUrl}/pixels/delta`)
      .then((res) => {
        return res.data.delta
      })
      .catch((error) => {
        console.error(error)
      })
  },
}
