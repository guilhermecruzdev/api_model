//const validator = require('validator')

const Joi = require('@hapi/joi')

module.exports = Joi.extend(

    // direction
    {
        base: Joi.string().lowercase().valid('1', '-1', 'asc', 'desc', 'ascending', 'descending').default('-1').empty('').trim(),
        type: 'direction',
    },

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
        base: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().trim(),
        type: 'id',
    },

    // limit
    {
        base: Joi.number().min(10).multiple(10).default(10).empty(''),
        type: 'limit',
    },

    // name
    {
        base: Joi.string().min(2).max(250).required().trim(),
        type: 'name',
    },

    // objectId
    {
        base: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().trim(),
        type: 'objectId',
    },

    // offset
    {
        base: Joi.number().min(1).default(1).empty(''),
        type: 'offset',
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

    // postalCode
    {
        base: Joi.string().regex(new RegExp(global.__('REGEXP_ZIP_CODE'))).trim(),
        type: 'postalCode',
    },

    // search
    {
        base: Joi.string().min(2).max(100).empty('').default('').trim(),
        type: 'search',
    },

    // sort
    {
        base: Joi.string().regex(/^[0-9a-zA-Z_]+$/).empty('').default('createdAt'),
        type: 'sort',
    },

    // zipCode
    {
        base: Joi.string().regex(new RegExp(global.__('REGEXP_ZIP_CODE'))).trim(),
        type: 'zipCode',
    }

)