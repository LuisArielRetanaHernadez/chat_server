const globalError = (req, res, next, error) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error
    })
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    })
  }
}

module.exports = globalError
