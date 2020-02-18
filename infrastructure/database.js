require('dotenv').config()

const Mongoose = require('mongoose')
Mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const db = Mongoose.connection
db.on('error', () => {
    console.log(`Database Connection: Error`)
})
db.once('open', () => {
    console.log(`Database Connection: Success`)
})

const Schema = Mongoose.Schema
module.exports = { Mongoose, Schema }