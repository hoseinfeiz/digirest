const createCustomError = (message = '', statusCode = 200, arr = []) => {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

module.exports = createCustomError
