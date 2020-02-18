//const httpErrors = require('http-errors')

const httpError = function(req, res, next) {
    res.httpError = function(code, message, error) {
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
    next()
}

module.exports = httpError