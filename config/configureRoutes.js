// const { router: usuariosRoutes } = require("../routes/usuarios.js");
// const { router: repositoriosRoutes } = require("../routes/repositorios.js");
const express = require("express");
const { router: pixelsRoutes } = require("../routes/pixels.js");

const middlewares = require("../utils/middlewares");




const configureRoutes = (app) => {

	app.use("/",express.static('public'));

	app.use("/api/pixels", pixelsRoutes);

	//errorhandlers
	app.use(middlewares.error404Handler);
	app.use(middlewares.errorsHandler);

	return app;
};

module.exports = { configureRoutes };
