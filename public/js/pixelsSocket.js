const apiURL = "localhost:5000"

const socket = new WebSocket("ws://localhost:5000")
socket.binaryType = "arraybuffer"
// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server")
})

const parseMessage = (data) => {
  var array = new Uint8Array(data)
  var str = String.fromCharCode.apply(null, array)
  json = JSON.parse(str)
  return json
}

socket.addEventListener("message", function (event) {
  const str = parseMessage(event.data)
  //   logger.info(str)
})

const onMessage = (callback) => {
  socket.addEventListener("message", function (event) {
    const str = parseMessage(event.data)
    callback(str)
  })
}

const getSocket = () => {
  return { socket, onMessage }
}
