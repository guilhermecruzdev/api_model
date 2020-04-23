const AuthValidator = require('../validators/AuthValidator')
const AuthModel = require('../models/AuthModel')

const bcrypt = require('bcrypt')

module.exports = {

    login: (req, res) => {

        let schema = AuthValidator.login.validate(req.body)
        if (schema.error) {
            res.security(schema.error, 'Auth Login')
        } else {
            let email = schema.value.email
            let password = schema.value.password
            AuthModel.findOne({
                email: email,
            }).exec(function(error, data) {
                if (error) {
                    res.security(error, 'Auth Login')
                } else {
                    if (data === null) {
                        res.sendStatus(404)
                    } else {
                        bcrypt.compare(password, data.password, function(error, result) {
                            if (error) {
                                res.security(error, 'Auth Login')
                            } else {
                                if (result === true) {
                                    res.status(200).send(data)
                                } else {
                                    res.sendStatus(404)
                                }
                            }
                        });
                    }
                }
            })
        }

    },

    register: (req, res) => {

        let schema = AuthValidator.register.validate(req.body)
        if (schema.error) {
            res.security(schema.error, 'Auth Register')
        } else {
            let body = schema.value
            AuthModel.findOne({
                email: body.email,
            }).exec(function(error, data) {
                if (error) {
                    res.security(schema.error, 'Auth Register')
                } else {
                    if (data !== null) {
                        res.sendStatus(409)
                    } else {
                        bcrypt.hash(body.password, 10, function(error, hash) {
                            if (error) {
                                res.security(error, 'Auth Register')
                            } else {
                                body.password = hash
                                AuthModel.create(body, function(error, data) {
                                    if (error) {
                                        res.security(error, 'Auth Register')
                                    } else {
                                        res.status(201).send(data)
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }

    },

}