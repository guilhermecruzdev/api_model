module.exports = (path) => {
    return {
        translationsPath: path.join(__dirname, '../locales'),
        cookieLangName: 'lang',
        browserEnable: true,
        defaultLang: process.env.APP_LANG,
        paramLangName: 'lang',
        siteLangs: [
            'en',
            'pt-BR',
        ],
        textsVarName: 'translate'
    }
}