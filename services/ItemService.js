ItemValidator = require('../validators/ItemValidator')
ItemModel = require('../models/ItemModel')

module.exports = {

    id: (req, res) => {

        let schema = ItemValidator.id.validate(req.params.id)
        if (schema.error) {
            res.httpError(400, `Invalid Request`, schema.error)
        } else {
            ItemModel.post
                .findOne({
                    _id: schema.value.id
                }).exec(function(error, data) {
                    if (error) {
                        res.httpError(400, `Could not retrieve the Item`, error)
                    } else {
                        res.send(data)
                    }
                })
        }
    },

    get: (req, res) => {

        // Validates the req.query parameters (search, offset, limit, order)
        let schema = ItemValidator.get.validate(req.query)
        if (schema.error) {
            res.httpError(400, `Invalid Request`, schema.error)
        } else {
            ItemModel.post
                .find({
                    name: schema.value.search
                })
                .skip(schema.value.limit * (schema.value.offset - 1))
                .limit(schema.value.limit)
                .sort(
                    ((new Object())[schema.value.sort] = schema.value.direction)
                )
                .exec(function(error, data) {
                    if (error) {
                        res.httpError(400, `Could not retrieve the Items`, error)
                    } else {
                        res.send(data)
                    }
                })
        }
    },

    post: (req, res) => {
        // Validates the req.body (JSON) with the validator based on rules in the object model
        let schema = ItemValidator.post.validate(req.body)
        if (schema.error) {
            res.httpError(400, `Invalid JSON`, schema.error)
        } else {
            // Will req.body (JSON) fit the database model?
            let Item = ItemModel.post(schema.value)
            let error = Item.validate().then(() => {
                Item.save(schema.value).then(() => {
                    res.send(schema.value)
                }).catch(error => {
                    res.httpError(400, `Error while saving Item`, error)
                })
            }).catch(error => {
                res.httpError(400, `Invalid JSON`, error)
            })
        }
    }

}