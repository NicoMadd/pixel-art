const express = require("express")
const http = require("http")
const { logger } = require("./config/loggerConfig.js")
const config = require("./config/config.js")
const { configure: ConfigureApp } = require("./config/configureApp.js")
const {
  configure: ConfigureWebSocket,
} = require("./config/configureWebSocket.js")

const app = ConfigureApp(express())
const server = http.createServer(app)
const wss = ConfigureWebSocket(server)

server.listen(config.PORT, () => {
  logger.info(`Server is listening on port ${config.PORT}....`)
})

// app.listen(config.PORT, () => {
//   logger.info(`Server is listening on port ${config.PORT}....`)
// })
