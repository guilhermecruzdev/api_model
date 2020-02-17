const express = require('express')

const app = express()

const bodyParser = require('body-parser')

// Router
let router = express.Router()
router.use(bodyParser.json({ type: 'application/json' }))
router.use(bodyParser.urlencoded({ extended: true }))

// Ensure that all POST requests have 'application/json' in Content-Type header
router.route('*').post((req, res, next) => {
    if (!req.is('application/json')) {
        res.status(400).json({ error: `Content-Type must be 'application/json' in all POST requests.` })
    } else {
        next()
    }
})

// Check if JSON in req.body is valid
router.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(500).send({ error: error });
    } else {
        next();
    }
});

// ping (Check if API is running)
router.get('/ping', (req, res) => {
    res.send(`API is running.`)
})

// Routes
router = require('./routes/Item')(router)

app.use(router)

const port = process.env.APP_PORT
app.listen(port, () => console.log(`App listening on port ${port}.`))