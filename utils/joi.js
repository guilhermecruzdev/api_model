//const validator = require('validator')

const Joi = require('@hapi/joi')

module.exports = Joi.extend(

    // email
    {
        base: Joi.string().email().min(6).max(100).allow(null).required().trim(),
        type: 'email',
    },

    // emails
    {
        base: Joi.array().items({
            email: Joi.string().email().min(6).max(100).required().trim(),
        }),
        type: 'emails',
    },

    // id
    {
        base: Joi.number().strict().min(1),
        type: 'id',
    },

    // limit
    {
        base: Joi.number().strict().min(10).multiple(10).default(10),
        type: 'limit',
    },

    // name
    {
        base: Joi.string().min(2).max(250).required().trim(),
        type: 'name',
    },

    // number
    {
        base: Joi.number().strict(),
        type: 'number',
    },

    // object_id
    {
        base: Joi.string().regex(/^[0-9a-fA-F]{24}$/).trim(),
        type: 'object_id',
    },

    // offset
    {
        base: Joi.number().strict().min(1).default(1),
        type: 'offset',
    },

    // order
    {
        base: Joi.number().strict().min(1).default(1),
        type: 'order',
    },

    // phone
    {
        base: Joi.object({
            area_code: Joi.string().regex(new RegExp(global.__('REGEXP_AREA_CODE'))).allow(null).required().trim(),
            phone_number: Joi.string().regex(new RegExp(global.__('REGEXP_PHONE_NUMBER'))).required().trim(),
        }),
        type: 'phone',
    },

    // phones
    {
        base: Joi.array().items({
            area_code: Joi.string().regex(new RegExp(global.__('REGEXP_AREA_CODE'))).allow(null).required().trim(),
            phone_number: Joi.string().regex(new RegExp(global.__('REGEXP_PHONE_NUMBER'))).required().trim(),
        }),
        type: 'phones',
    },

    // search
    {
        base: Joi.string().min(2).max(100).trim(),
        type: 'search',
    },

    // zip_code
    {
        base: Joi.string().regex(new RegExp(global.__('REGEXP_ZIP_CODE'))).trim(),
        type: 'zip_code',
    }

)