const Service = require('../services/Service')
const AuthService = require('../services/AuthService')

module.exports = (router) => {

    router.route('/auth/login')
        .post(Service(AuthService.login, global.types.JSON))

    router.route('/auth/register')
        .post(Service(AuthService.register, global.types.JSON))

    return router

}