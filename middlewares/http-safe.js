module.exports = (req, res, next) => {

    // Ensure that all POST requests have 'application/json' in Content-Type header
    if ((req.method === 'POST') && (!req.is('application/json'))) {
        res.httpError(400, `Content-Type must be 'application/json' in all POST requests.`)
    }

    // Everything is ok
    else {
        next()
    }
}