const express = require("express")
const { route } = require("express/lib/application")
const { logger } = require("../config/loggerConfig.js")
const router = express.Router()

const {
	getAllPixels,
	setPixel,
	getDeltaPixels,
	getDelta
} = require("../controllers/pixels.js")

router.route("/").get(getAllPixels).post(setPixel)
router.route("/delta").get(getDelta)
router.route("/:deltaID").get(getDeltaPixels)

module.exports = { router }
