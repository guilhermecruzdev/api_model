const ItemService = require('../services/ItemService')

module.exports = (router) => {

    router.route('/items/:id')
        .get(Service(ItemService.id, global.types.JSON))
        .put(Service(ItemService.put, global.types.JSON))
        .delete(Service(ItemService.delete, global.types.JSON))

    router.route('/items')
        .get(Service(ItemService.get, global.types.JSON))
        .post(Service(ItemService.post, global.types.JSON))

    return router

}