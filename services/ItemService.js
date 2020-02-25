ItemValidator = require('../validators/ItemValidator')
ItemModel = require('../models/ItemModel')

module.exports = {

    get: (req, res) => {

        let result = ItemValidator.get.validate(req.query)
        if (result.error) {
            res.httpError(400, `Invalid Request`, result.error)
        } else {
            res.send('Listing Items')
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
                Item.save(req.body)
                res.send(req.body)
            }).catch(error => {
                res.httpError(400, `Invalid JSON`, error)
            })
        }
    }
}