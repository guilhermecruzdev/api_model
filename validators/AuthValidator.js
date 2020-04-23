const Joi = require('../utils/joi')

module.exports = {

    login: Joi.object({
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
    }),
    register: Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(6).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
    }),

}