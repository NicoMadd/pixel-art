
const errorsHandler = async (err, req, res, next) => {
	// logger.error(err);
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message,
		},
	});
};

const error404Handler = async (req, res, next) => {
	res.status(404).json({
		//TODO set error page
		error: "No existe ese recurso",
	});
};

module.exports = {
	errorsHandler,
	error404Handler,
};
