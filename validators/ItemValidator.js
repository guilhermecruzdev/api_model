const Joi = require('../utils/joi')

module.exports = ItemValidator = Joi.object({
    name: Joi.name(),
    phones: Joi.phones(),
    emails: Joi.emails()
})