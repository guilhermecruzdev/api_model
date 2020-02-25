ItemValidator = require('../validators/ItemValidator')
ItemModel = require('../models/ItemModel')

module.exports = {

    id: (req, res) => {

        let result = ItemValidator.id.validate(req.params.id)
        if (result.error) {
            res.httpError(400, `Invalid Request`, result.error)
        } else {
            ItemModel.post.findOne({ _id: req.params.id }, function(error, data) {
                if (error) {
                    res.httpError(400, `Could not retrieve the Item`, result.error)
                } else {
                    res.send(data)
                }
            })
        }
    },

    get: (req, res) => {

        let result = ItemValidator.get.validate(req.query)
        if (result.error) {
            res.httpError(400, `Invalid Request`, result.error)
        } else {
            ItemModel.post.find({ name: req.query['search'] }, function(error, data) {
                if (error) {
                    res.httpError(400, `Could not retrieve the Items`, result.error)
                } else {
                    res.send(data)
                }
            })
        }
    },

    post: (req, res) => {
        // Validates the req.body (JSON) with the validator based on rules in the object model
        let result = ItemValidator.post.validate(req.body)
        if (result.error) {
            res.httpError(400, `Invalid JSON`, result.error)
        } else {
            // Will req.body (JSON) fit the database model?
            let Item = ItemModel.post(req.body)
            let error = Item.validate().then(() => {
                Item.save(req.body).then(() => {
                    res.send(req.body)
                }).catch(error => {
                    res.httpError(400, `Error while saving Item`, error)
                })
            }).catch(error => {
                res.httpError(400, `Invalid JSON`, error)
            })
        }
    }

}