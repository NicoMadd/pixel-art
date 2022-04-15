const WebSocket = require("ws")

var wss = null

const configure = (server) => {
  wss = new WebSocket.Server({ server })

  wss.on("connection", function connection(ws) {
    console.log("A new client Connected!")

    ws.on("message", function incoming(message) {
      console.log("received: %s", message)

      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    })
  })
  return wss
}

const strToUint8Array = (str) => {
  var arr = new Uint8Array(str.length)
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i)
  }
  return arr
}

const broadcast = async (data) => {
  const array = strToUint8Array(data)
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(array)
    }
  })
}

module.exports = { configure, broadcast, strToUint8Array }
