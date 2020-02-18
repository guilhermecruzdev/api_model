require('dotenv').config()

const path = require('path')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const httpError = require('./middlewares/http-error')
const httpLogger = require('morgan')
const express = require('express')
const app = express()

// HTTP Logger
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
})
app.use(httpLogger('combined', { stream: accessLogStream }))

// Cookie parsing middleware (req.cookies)
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Static files to use with micro frontends (https://micro-frontends.org/)
app.use(express.static(path.join(__dirname, 'public')))

// Translations (i18n)
const i18n = require('i18n-express')
const i18nConfig = require(path.join(__dirname, 'configs', 'i18n'))(path)
app.use(i18n(i18nConfig))

// Views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

/**
 * #########################
 * #### Start of routes ####
 * #########################
 */

let router = express.Router()

// Body parsing middleware (req.body)
const bodyParser = require('body-parser')
router.use(bodyParser.json({ type: 'application/json' }))
router.use(bodyParser.urlencoded({ extended: true }))

// HTTP Error
router.use(httpError)

// Ensure that all POST requests have 'application/json' in Content-Type header
router.route('*').post((req, res, next) => {
    if (!req.is('application/json')) {
        res.httpError(400, `Content-Type must be 'application/json' in all POST requests.`)
    } else {
        next()
    }
})

// Check if JSON in req.body is valid
router.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.httpError(500, `Syntax error in JSON`, error)
    } else {
        next()
    }
})

// ping (Check if API is running)
router.get('/ping', (req, res) => {
    res.send(`API is running.`)
})

// Routes
router = require('./routes/Item')(router)

// 404 Not Found
router.use(function(req, res) {
    res.httpError(404, `Not Found`)
})

app.use(router)

/**
 * #########################
 * #### End of routes ####
 * #########################
 */

// Start application
const port = process.env.APP_PORT
const server = app.listen(port, () => console.log(`App listening on port ${port}.`))
server.setTimeout(1000)