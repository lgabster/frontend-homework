/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')

module.exports = exphbs.create({
    defaultLayout: 'main',
    handlebars: Handlebars,
    extname: '.hbs',
    partialsDir: [
        'views/partials',
        'views/shared'
    ],
    layoutsDir: `views/layouts`
})
