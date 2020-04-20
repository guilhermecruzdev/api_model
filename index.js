require('dotenv').config()

const path = require('path')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const httpLogger = require('morgan')
const httpError = require('./middlewares/http-error')
const httpSecurity = require('./middlewares/http-security')
const errorHandler = require('./middlewares/error-handler')
const express = require('express')
const app = express()
let router = express.Router()

/**
 * #### Middlewares ####
 */

// HTTP Logger
if (process.env.LOG_HTTP === 'true') {
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d',
        path: path.join(__dirname, 'logs')
    })
    router.use(httpLogger('combined', { stream: accessLogStream }))
}

// Body parsing (req.body)
const bodyParser = require('body-parser')
router.use(bodyParser.json({ type: 'application/json' }))
router.use(bodyParser.urlencoded({ extended: true }))

// Cookie parsing (req.cookies)
const cookieParser = require('cookie-parser')
router.use(cookieParser())

// Translations (i18n)
global.lang = {}
const i18n = require('i18n')
const i18nConfig = require(path.join(__dirname, 'configs', 'i18n'))(path)
i18n.configure(i18nConfig)
router.use(i18n.init)

// HTTP Error
router.use(httpError)

// HTTP Security
router.use(httpSecurity)

// Static files (in order to use with Micro Frontends: https://micro-frontends.org/)
router.use(express.static(path.join(__dirname, 'public')))

// Error Handler (Last but not least)
router.use(errorHandler)

/**
 * #### End of middlewares ####
 */

/**
 * #### Routes ####
 */

// ping (Check if API is running)
router.get('/ping', (req, res) => {
    switch (req.headers['content-type']) {
        case 'text/html':
            {
                res.send(`API is running.`)
                break
            }
        case 'application/json':
            {
                let date = require('./utils/date')
                res.json({
                    api: {
                        status: 'On',
                        statusDate: date.utc(),
                    }
                })
                break
            }
        default:
            {
                res.httpError(404, `Not Found`)
            }
    }
})

// API Routes
router = require('./routes/Item')(router)

// 404 Not Found
router.use(function(req, res) {
    res.httpError(404, `Not Found`)

})

/**
 * #### End of routes ####
 */

app.use(router)

// Views (in order to use with Micro Frontends: https://micro-frontends.org/)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Start application
const port = process.env.APP_PORT
const server = app.listen(port, () => console.log(`App listening on port ${port}.`))
server.setTimeout(1000)