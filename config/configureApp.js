const express = require("express")
const { configureRoutes } = require("./configureRoutes.js")
const cors = require("cors")

const configureBasics = (app) => {
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))
	app.use(cors())
	// app.use(expressLogger)
}

const configureHeaders = (app) => {
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", req.headers.origin)
		res.header("Access-Control-Allow-Credentials", true)
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		)
		res.header(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, DELETE"
		)
		next()
	})
}


const configure = (app) => {
	configureBasics(app)
	configureHeaders(app)

	//ruta de swagger + config
	// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

	//Configuracion de rutas
	app = configureRoutes(app)

	return app
}

module.exports = { configure }
