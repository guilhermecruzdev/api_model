const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const token = req.headers["x-access-token"] || req.headers["authorization"]
    if (!token) {
        res.security(token, 'Auth Token', 401)
    } else {
        try {
            const decoded = jwt.verify(token, process.env.AUTH_PRIVATE_KEY)
            req.user = decoded
            next()
        } catch (ex) {
            res.security(token, 'Auth Token', 401)
        }
    }

}