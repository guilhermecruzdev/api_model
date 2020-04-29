const AuthMiddleware = require('../middlewares/auth')
const Service = require('../services/Service')
const ItemService = require('../services/ItemService')

module.exports = (router) => {

    router.route('/items/:id')
        .get(AuthMiddleware, Service(ItemService.id))
        .put(AuthMiddleware, Service(ItemService.put, global.types.JSON))
        .delete(AuthMiddleware, Service(ItemService.delete, global.types.JSON))

    router.route('/items')
        .get(AuthMiddleware, Service(ItemService.get))
        .post(AuthMiddleware, Service(ItemService.post, global.types.JSON))

    return router

}