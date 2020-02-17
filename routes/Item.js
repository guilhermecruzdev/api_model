ItemService = require('../services/ItemService')

module.exports = (router) => {

    router.route('/items')
        .get(ItemService.get)
        .post(ItemService.post)

    return router

}