const { logger } = require("../config/loggerConfig.js")
const fs = require('fs');

var pixels = []
var deltaPixels =[]
var delta = 0;

fs.readFile('pixels.json', 'utf8', function (err, data) {
    if (err) throw err;
    pixels = JSON.parse(data);
  });

const generateAllPixels =(req, res) => {
    var id = 1;
    const color = "#000000";
    for (var x = 0; x < 100; x++) {
        for(var y = 0; y < 100; y++) {
            id++
            var pixel = {id, x, y, color}
            pixels.push(pixel)
        }
    }
    fs.writeFileSync('pixels.json', JSON.stringify(pixels));
}

const getAllPixels = async (req, res) => {
    logger.info("getAllPixels")
    res.send({pixels})
}

const setPixel = async (req, res) => {
	const {pixelId, color} = req.body
    console.log(pixelId, color)
    const pixel = pixels.find(pixel => pixel.id == pixelId)
    pixel.color = color
    deltaPixels.push(pixel)
    delta++
    res.send({delta})
    
}

const getDeltaPixels = async (req, res) => {
    logger.info("getDeltaPixels")
    const { deltaID } = req.params
    console.log("incoming delta",deltaID)
    console.log("delta",delta)
    if(delta != deltaID) {
        newPixels = deltaPixels.slice(deltaID, delta)
        res.send({delta,pixels:newPixels})
    }else{
        res.send({delta})
    }
}

const getDelta = async (req, res) => {
    logger.info("getDelta")
    res.send({delta})
}

module.exports = {
getAllPixels,
setPixel,
getDeltaPixels,
getDelta
}
