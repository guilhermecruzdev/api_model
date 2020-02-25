const Joi = require('../utils/joi')

module.exports = {

    id: Joi.object({
        id: Joi.id(),
    }),

    get: Joi.object({
        search: Joi.search(),
        offset: Joi.offset(),
        limit: Joi.limit(),
        order: Joi.order(),
    }),

    post: Joi.object({
        name: Joi.name(),
        phones: Joi.phones(),
        emails: Joi.emails(),
    }),

}