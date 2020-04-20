const fs = require('fs')
const path = require('path')
const date = require(path.join(__dirname, '../utils/date'))

module.exports = (req, res, next) => {

    let code = 401
    let message = `Suspicious activities were detected.`
    let events = []

    // Ensure that all POST requests have 'application/json' in Content-Type header
    if ((req.headers['content-type'] != 'text/html') && (req.headers['content-type'] != 'application/json')) {
        events.push(`Content-Type must be 'application/json' in all POST requests.`)
    }

    if (events.length > 0) {

        if (process.env.LOG_SECURITY === 'true') {
            fs.appendFileSync(path.join(__dirname, '../logs/security.log'),
                JSON.stringify({
                    date: date.utc(),
                    timezone: date.timezone(),
                    code: code,
                    message: message,
                    events: events,
                }, null, 2) + '\n\n')
        }

        res.httpError(code, message, events)

    } else {
        // Everything is ok
        next()
    }
}