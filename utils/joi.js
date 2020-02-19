//const validator = require('validator')

const Joi = require('@hapi/joi')

module.exports = Joi.extend(

    // email
    {
        type: 'email',
        base: Joi.string().email().min(6).max(100).allow(null).required().trim(),
    },

    // emails
    {
        type: 'emails',
        base: Joi.array().items({
            email: Joi.string().email().min(6).max(100).required().trim(),
        }),
    },

    // name
    {
        type: 'name',
        base: Joi.string().min(2).max(250).required().trim(),
    },

    // number
    {
        type: 'number',
        base: Joi.number().strict(),
    },

    // phone
    {
        type: 'phone',
        base: Joi.object({
            area_code: Joi.string().regex(new RegExp(global.__('REGEXP_AREA_CODE'))).allow(null).required().trim(),
            phone_number: Joi.string().regex(new RegExp(global.__('REGEXP_PHONE_NUMBER'))).required().trim(),
        }),
    },

    // phones
    {
        type: 'phones',
        base: Joi.array().items({
            area_code: Joi.string().regex(new RegExp(global.__('REGEXP_AREA_CODE'))).allow(null).required().trim(),
            phone_number: Joi.string().regex(new RegExp(global.__('REGEXP_PHONE_NUMBER'))).required().trim(),
        }),
    },

    // zip_code
    {
        type: 'zip_code',
        base: Joi.string().regex(new RegExp(global.__('REGEXP_ZIP_CODE'))).trim(),
    }

)