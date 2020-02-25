module.exports = {

    utc: () => {
        return new Date().toUTCString()
    },

    timezone: () => {
        return new Date().getTimezoneOffset()
    }

}