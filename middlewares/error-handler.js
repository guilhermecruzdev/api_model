const fs = require('fs')
const path = require('path')
const date = require(path.join(__dirname, '../utils/date'))

module.exports = (error, req, res, next) => {

    let code = res.statusCode
    let message = error.message
    let stack = error.stack

    if (process.env.LOG_ERRORS === 'true') {
        fs.appendFileSync(path.join(__dirname, '../logs/errors.log'),
            JSON.stringify({
                date: date.utc(),
                timezone: date.timezone(),
                code: code,
                message: message,
                stack: stack,
                error: error,
            }, null, 2) + '\n\n')
    }

    if (res.headersSent) {
        return next(error)
    }

    res.status(code).json({
        "code": code,
        "message": message,
        "error": error
    })
}