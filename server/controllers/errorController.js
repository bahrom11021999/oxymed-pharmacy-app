const errorHandler = (error, req, res, next) => {
	res.status(500).json({
		status: 'error',
		message: error.message
	})
}

module.exports = errorHandler;