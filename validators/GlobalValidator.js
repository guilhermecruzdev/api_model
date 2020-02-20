const Joi = require('../utils/joi')

module.exports = GlobalValidator = {

    Id: Joi.object({
        id: Joi.id(),
    }),

    ObjectId: Joi.object({
        object_id: Joi.object_id(),
    }),

    Order: Joi.object({
        order: Joi.order(),
    }),

    Pagination: Joi.object({
        offset: Joi.offset(),
        limit: Joi.limit(),
    }),

    Search: Joi.object({
        search: Joi.search(),
    }),

    SearchPagination: Joi.object({
        search: Joi.search(),
        offset: Joi.offset(),
        limit: Joi.limit(),
    }),

    SearchPaginationOrder: Joi.object({
        search: Joi.search(),
        offset: Joi.offset(),
        limit: Joi.limit(),
        order: Joi.order(),
    }),

}