//const validator = require('validator')

const Joi = require('@hapi/joi')

module.exports = Joi.extend({
    base: Joi.number().strict(),
    type: 'number',
}, {
    base: Joi.string().min(2).max(250).required().trim(),
    type: 'name',
}, {
    base: Joi.string().regex(/^\d{5,8}$/).trim(),
    type: 'zipcode',
}, {
    base: Joi.object({
        area_code: Joi.string().regex(/^\d{2}$/).allow(null).required().trim(),
        phone_number: Joi.string().regex(/^\d{8,11}$/).required().trim(),
    }),
    type: 'phone',
}, {
    base: Joi.array().items({
        area_code: Joi.string().regex(/^\d{2}$/).allow(null).required().trim(),
        phone_number: Joi.string().regex(/^\d{8,11}$/).required().trim(),
    }),
    type: 'phones',
}, {
    base: Joi.string().email().min(6).max(100).allow(null).required().trim(),
    type: 'email',
}, {
    base: Joi.array().items({
        email: Joi.string().email().min(6).max(100).required().trim(),
    }),
    type: 'emails',
})