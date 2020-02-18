//const httpError = require('http-errors')

module.exports = (res, code, message, error) => {
    if (typeof message !== 'string') {
        message = ''
    }
    if (error === undefined) {
        error = null
    }
    res.status(code).json({
        "code": code,
        "message": message,
        "error": error
    })
}