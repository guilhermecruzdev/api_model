ItemValidator = require('../validators/ItemValidator')
ItemModel = require('../models/ItemModel')

module.exports = {

    get: (req, res) => {
        if (req.query['search'] !== undefined) {
            let search = req.query['search']
            res.send(`Searching for ${search}`)
        } else {
            res.send(`Get a list of Items on a specific locality and/or sublocality.`)
        }
    },
    post: (req, res) => {
        let result = ItemValidator.validate(req.body)
        if (result.error) {
            res.status(400).json({ error: error })
        } else {
            let newItem = ItemModel(req.body)
            let error = newItem.validate().then(() => {
                newItem.save(req.body)
                res.send(req.body)
            }).catch(error => {
                res.status(400).json({ error: error })
            })
        }
    }
}