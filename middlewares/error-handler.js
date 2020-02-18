module.exports = (error, req, res, next) => {

    if (res.headersSent) {
        return next(err)
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