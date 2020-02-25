ItemService = require('../services/ItemService')

module.exports = (router) => {

    router.route('/items/:id')
        .get(ItemService.id)

    router.route('/items')
        .get(ItemService.get)
        .post(ItemService.post)

    return router

}