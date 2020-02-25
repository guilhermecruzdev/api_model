const fs = require('fs')
const path = require('path')
const date = require(path.join(__dirname, '../utils/date'))

module.exports = (error, req, res, next) => {

    fs.appendFileSync(path.join(__dirname, '../logs/errors.log'),
        JSON.stringify({
            date: date.utc(),
            timezone: date.timezone(),
            code: res.statusCode,
            message: error.message,
            stack: error.stack,
            error: error
        }, null, 2) + '\n\n')

    if (res.headersSent) {
        return next(error)
    }

    let message = `General error`

    // Checks if JSON in req.body is valid
    if (error instanceof SyntaxError) {
        message = `Syntax error in JSON`
    }

    res.status(500).json({
        "code": 500,
        "message": message,
        "error": error
    })
}