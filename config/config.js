require("dotenv").config()

const PORT = process.env.PORT
const REDIS_HOST = process.env.REDIS_HOST

module.exports = {
	PORT,
	REDIS_HOST,
}
