const { Mongoose, Schema } = require('../infrastructure/database')
const AuthValidator = require('../validators/AuthValidator')
const Joigoose = require('joigoose')(Mongoose, { convert: false })

// Creates the Auth's Schema based on Joi Schema
const AuthSchema = new Schema(Joigoose.convert(AuthValidator.register), { versionKey: false })

// Custom schema definitions such as indexes, primary keys, foreign keys, ...

const AuthModel = Mongoose.model('User', AuthSchema)

module.exports = AuthModel