const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')


const errorHandlerMiddleware = (err, req, res, next) => {
  // tutorial 8:50:00
  // TODO: - handle mongoose validation errors
  // TODO: - handle mongoose duplicate error
  // TODO: - handle mongoose not found error

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

module.exports = errorHandlerMiddleware