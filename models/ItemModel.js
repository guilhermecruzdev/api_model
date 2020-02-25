const { Mongoose, Schema } = require('../infrastructure/database')

/**
 * Temporarily disabled because 'joigoose' is not working with custom types.
 * 
 * Joi Extensions: https://github.com/hapijs/joi/blob/v16/API.md#extensions
 * Issue: https://github.com/yoitsro/joigoose/issues/38
 */

/*
// Creates the Item's Schema based on Joi Schema
const Joigoose = require('joigoose')(Mongoose, { convert: false })
const ItemValidator = require('../validators/ItemValidator')
const ItemSchema = {
    post: new Schema(Joigoose.convert(ItemValidator.post)),
}

// Custom schema definitions such as indexes, primary keys, foreign keys, ...
*/

// This is awful
const ItemSchema = {

    post: new Schema({
        name: {
            type: String,
            minlength: 2,
            maxlength: 250,
            required: true,
            trim: true,
        },
        phones: [{
            area_code: {
                type: String,
                minlength: 2,
                maxlength: 2,
                required: false,
                trim: true,
            },
            phone_number: {
                type: String,
                minlength: 8,
                maxlength: 11,
                required: true,
                trim: true,
            }
        }],
        emails: [{
            email: {
                type: String,
                minlength: 6,
                maxlength: 100,
                required: true,
                trim: true,
            }
        }]
    })

}

const ItemModel = {

    post: Mongoose.model('Items', ItemSchema.post),

}

module.exports = ItemModel