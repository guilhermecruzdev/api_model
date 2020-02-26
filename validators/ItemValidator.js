const Joi = require('../utils/joi')

module.exports = {

    id: Joi.id(),

    get: Joi.object({
        search: Joi.search(),
        offset: Joi.offset(),
        limit: Joi.limit(),
        sort: Joi.sort(),
        direction: Joi.direction(),
    }),

    post: Joi.object({
        name: Joi.name(),
        phones: Joi.phones(),
        emails: Joi.emails(),
    }),

}