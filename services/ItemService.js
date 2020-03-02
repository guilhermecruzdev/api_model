ItemValidator = require('../validators/ItemValidator')
ItemModel = require('../models/ItemModel')

module.exports = {

    id: (req, res) => {

        // Validates the req.params parameters (id)
        let schema = ItemValidator.id.validate(req.params.id)
        if (schema.error) {
            res.httpError(400, `Invalid Request`, schema.error)
        } else {
            let id = schema.value
            ItemModel.post
                .findOne({
                    _id: id
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
            let find = {}
            if ((schema.value.search) && (schema.value.search !== '')) {
                find = {
                    name: schema.value.search
                }
            }
            let skip = schema.value.limit * (schema.value.offset - 1)
            let limit = schema.value.limit
            let sort = {}
            sort[schema.value.sort] = schema.value.direction
            ItemModel.post
                .find(find)
                .skip(skip)
                .limit(limit)
                .sort(sort)
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
            let body = schema.value
            let Item = ItemModel.post(body)
            Item.validate().then(() => {
                Item.save(body).then(() => {
                    res.send(Item)
                }).catch(error => {
                    res.httpError(400, `Error while saving Item`, error)
                })
            }).catch(error => {
                res.httpError(400, `Invalid JSON`, error)
            })
        }
    }

}