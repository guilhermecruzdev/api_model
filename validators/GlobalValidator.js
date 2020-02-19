const Joi = require('../utils/joi')

module.exports = GlobalValidator = {

    SearchPaginationOrder: Joi.object({
        search: Joi.search(),
        offset: Joi.offset(),
        limit: Joi.limit(),
        order: Joi.order(),
    }),

    SearchPagination: Joi.object({
        search: Joi.search(),
        offset: Joi.offset(),
        limit: Joi.limit(),
    }),

    Search: Joi.object({
        search: Joi.search(),
    }),

    Pagination: Joi.object({
        offset: Joi.offset(),
        limit: Joi.limit(),
    }),

    Order: Joi.object({
        order: Joi.order(),
    }),

}