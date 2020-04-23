const fs = require('fs')
const path = require('path')
const date = require(path.join(__dirname, '../utils/date'))

module.exports = (req, res, next) => {

    res.security = ($data, $message = null) => {

        if (process.env.LOG_SECURITY === 'true') {
            fs.appendFileSync(path.join(__dirname, '../logs/security.log'),
                JSON.stringify({
                    date: date.utc(),
                    timezone: date.timezone(),
                    data: data,
                    message: message,
                    req: req,
                    res: res,
                }, null, 2) + '\n\n')
        }
        res.sendStatus(400)

    }

    // Content-Type
    let contentType = req.headers['content-type']
    if (Object.values(global.types).indexOf(contentType) === -1) {
        res.security.log(contentType, 'Content-Type')
    } else {
        next()
    }
}