const Joi = require('../utils/joi')

const ItemValidator = Joi.object().keys({
    name: Joi.name(),
    phones: Joi.phones(),
    emails: Joi.emails()
})

module.exports = ItemValidator