module.exports = (route, types) => {

    return (req, res, next) => {
        if (types === undefined) {
            route(req, res)
        } else {
            if (!Array.isArray(types)) {
                types = [types]
            }
            let type, found = false
            types.forEach(type => {
                if (req.headers['content-type'] === type) {
                    found = true
                }
            })
            if (found) {
                route(req, res)
            } else {
                res.security(route, 'Route Content-Type')
            }
        }
    }
}