const { Mongoose, Schema } = require('../infrastructure/database')

/**
 * Temporarily disabled because 'joigoose' is not working with the latest version of '@hapi/joi'.
 * IMO, both projects should go together. IT would be perfect if I could have a single Schema
 * for using with data validation in service layer and, at the same time, fits the database schema
 * with little or no customization.
 * 
 * https://github.com/yoitsro/joigoose/issues/36
 * https://stackoverflow.com/questions/60202382/schema-using-joigoose-and-mongoose-for-validation-in-node-js/60268773#60268773
 */

/*
// Creates the Item's Schema based on Joi Schema
const Joigoose = require('joigoose')(Mongoose, { convert: false })
const ItemValidator = require('../validators/ItemValidator')
const ItemSchema = new Schema(Joigoose.convert(ItemValidator))

// Custom schema definitions such as indexes, primary keys, foreign keys, ...
*/

// This is awful
const ItemSchema = new Schema({
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

const ItemModel = Mongoose.model('Items', ItemSchema)

module.exports = ItemModel