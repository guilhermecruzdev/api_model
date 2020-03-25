const Joi = require('../utils/joi')

module.exports = {

    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().trim(),

    get: Joi.object({
        search: Joi.string().min(2).max(100).empty('').default('').trim(),
        offset: Joi.number().min(1).default(1).empty(''),
        limit: Joi.number().min(10).multiple(10).default(10).empty(''),
        sort: Joi.string().regex(/^[0-9a-zA-Z_]+$/).empty('').default('createdAt'),
        direction: Joi.string().lowercase().valid('1', '-1', 'asc', 'desc', 'ascending', 'descending').default('-1').empty('').trim(),
    }),

    post: Joi.object({
        name: Joi.string().min(2).max(250).required().trim(),
        phones: Joi.array().items({
            area_code: Joi.string().regex(new RegExp(global.__('REGEXP_AREA_CODE'))).allow(null).required().trim(),
            phone_number: Joi.string().regex(new RegExp(global.__('REGEXP_PHONE_NUMBER'))).required().trim(),
        }),
        emails: Joi.array().items({
            email: Joi.string().email().min(6).max(100).required().trim(),
        }),
    }),

}

/*
/**
 * Temporarily disabled because 'joigoose' is not working with custom types.
 * 
 * Joi Extensions: https://github.com/hapijs/joi/blob/v16/API.md#extensions
 * Issue: https://github.com/yoitsro/joigoose/issues/38

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
*/