const ItemValidator = require('../validators/ItemValidator')
const ItemModel = require('../models/ItemModel')

module.exports = {

    id: (req, res) => {

        // Validates the req.params parameters (id)
        let schema = ItemValidator.id.validate(req.params.id)
        if (schema.error) {
            res.security(schema.error, 'Item ID')
        } else {
            let id = schema.value
            ItemModel
                .findOne({
                    _id: id
                }).exec(function(error, data) {
                    if (error) {
                        res.security(error, 'Item ID')
                    } else {
                        res.status(200).send(data)
                    }
                })
        }

    },

    get: (req, res) => {

        // Validates the req.query parameters (search, offset, limit, order)
        let schema = ItemValidator.get.validate(req.query)
        if (schema.error) {
            res.security(schema.error, 'Item GET')
        } else {
            let find = {}
            if (schema.value.search !== '') {
                find = {
                    name: { $regex: schema.value.search, $options: 'i' }
                }
            }
            let skip = schema.value.limit * (schema.value.offset - 1)
            let limit = schema.value.limit
            let sort = {}
            sort[schema.value.sort] = schema.value.direction
            ItemModel
                .find(find)
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .exec(function(error, data) {
                    if (error) {
                        res.security(error, 'Item GET')
                    } else {
                        res.status(200).send(data)
                    }
                })
        }

    },

    post: (req, res) => {

        // Validates the req.body (JSON) with the validator based on rules in the object model
        let schema = ItemValidator.post.validate(req.body)
        if (schema.error) {
            res.security(schema.error, 'Item POST')
        } else {
            // Will req.body (JSON) fit the database model?
            let body = schema.value
            ItemModel.create(body, function(error, data) {
                if (error) {
                    res.security(error, 'Item POST')
                } else {
                    res.status(201).send(data)
                }
            })

        }

    },

    put: (req, res) => {

        // Validates the req.params parameters (id)
        let schema = ItemValidator.id.validate(req.params.id)
        if (schema.error) {
            res.security(schema.error, 'Item PUT')
        } else {
            let id = schema.value

            // Validates the req.body (JSON) with the validator based on rules in the object model
            schema = ItemValidator.post.validate(req.body)
            if (schema.error) {
                res.security(schema.error, 'Item PUT')
            } else {
                // Will req.body (JSON) fit the database model?
                let body = schema.value
                ItemModel.findOneAndUpdate({
                    _id: id
                }, body, { new: true }, function(error, data) {
                    if (error) {
                        res.security(error, 'Item PUT')
                    } else {
                        res.status(200).send(data)
                    }
                })

            }
        }

    },

    delete: (req, res) => {

        // Validates the req.params parameters (id)
        let schema = ItemValidator.id.validate(req.params.id)
        if (schema.error) {
            res.security(schema.error, 'Item DELETE')
        } else {
            let id = schema.value
            ItemModel
                .findOneAndDelete({
                    _id: id
                }).exec(function(error, data) {
                    if (error) {
                        res.security(error, 'Item DELETE')
                    } else {
                        res.sendStatus(204)
                    }
                })
        }

    }

}