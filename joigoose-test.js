const Joi = require('@hapi/joi')
const Mongoose = require('mongoose')
const Joigoose = require('joigoose')(Mongoose, { convert: false, abortEarly: false })

// Extending Joi by creating the new types firstname() and lastname()
const JoiExtended = Joi.extend((Joi) => (

    // firstname()
    {
        base: Joi.string().min(2).max(50).trim(),
        type: 'firstname'
    },

    // lastname()
    {
        base: Joi.string().min(2).max(50).trim(),
        type: 'lastname'
    }

))

const JoiSchema = JoiExtended.object({
    name: JoiExtended.string(),
    firstname: JoiExtended.firstname(),
    lastname: JoiExtended.lastname(),
    email: JoiExtended.email()
})

const MongooseSchema = new Mongoose.Schema(Joigoose.convert(JoiSchema))
const MongooseModel = Mongoose.model('Users', MongooseSchema)

const payload = {
    name: 'Guilherme Cruz',
    firstname: 'Guilherme',
    lastname: 'Cruz',
    email: 'guilhermecruzdev@gmail.com',
}

const result = JoiSchema.validate(payload)
if (result.error) {
    console.log('\nInvalid Schema\n')
} else {
    console.log('\nValid Schema\n')
}