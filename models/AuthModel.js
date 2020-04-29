const { Mongoose, Schema } = require('../infrastructure/database')
const AuthValidator = require('../validators/AuthValidator')
const Joigoose = require('joigoose')(Mongoose, { convert: false })
const jwt = require('jsonwebtoken')

// Creates the Auth's Schema based on Joi Schema
const AuthSchema = new Schema(Joigoose.convert(AuthValidator.register), { versionKey: false })

// Custom schema definitions such as indexes, primary keys, foreign keys, ...
AuthSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        type: this.type
    }, process.env.AUTH_PRIVATE_KEY);
    return token;
}

const AuthModel = Mongoose.model('User', AuthSchema)

module.exports = AuthModel