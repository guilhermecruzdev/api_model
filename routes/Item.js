ItemService = require('../services/ItemService')

module.exports = (router) => {

    router.route('/items/:id')
        .get(ItemService.id)
        .put(ItemService.put)
        .delete(ItemService.delete)

    router.route('/items')
        .get(ItemService.get)
        .post(ItemService.post)

    return router

}