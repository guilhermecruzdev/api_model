//const httpErrors = require('http-errors')

module.exports = (req, res, next) => {
    res.httpError = function(code, message, error, send) {
        if (typeof message !== 'string') {
            message = ''
        }
        if (error === undefined) {
            error = null
        }
        if (send === undefined) {
            send = true
        }
        if (send) {
            res.status(code).json({
                "code": code,
                "message": message,
                "error": error
            })
        } else {
            return {
                "code": code,
                "message": message,
                "error": error
            }
        }
    }
    next()
}