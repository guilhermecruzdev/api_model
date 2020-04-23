const { Mongoose, Schema } = require('../infrastructure/database')
const ItemValidator = require('../validators/ItemValidator')
const Joigoose = require('joigoose')(Mongoose, { convert: false })

// Creates the Item's Schema based on Joi Schema
const ItemSchema = new Schema(Joigoose.convert(ItemValidator.post), { versionKey: false })

// Custom schema definitions such as indexes, primary keys, foreign keys, ...

const ItemModel = Mongoose.model('Item', ItemSchema)

module.exports = ItemModel