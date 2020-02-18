module.exports = (path) => {
    return {
        locales: [
            'en',
            'pt-BR',
        ],
        defaultLocale: process.env.APP_LANG,
        cookie: 'lang',
        directory: path.join(__dirname, '../locales'),
        queryParameter: 'lang',
        register: global
    }
}