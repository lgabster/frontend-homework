/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const request = require('request')
const templateMiddleware = require('../lib/templateMiddleware')

module.exports.controller = (app) => {
    // routing
    app.get('/', templateMiddleware, (req, res) => {
        var result = {}
        if (req.user) {
            result.user = req.user
            res.render('index', result)
        } else {
            res.render('index')
        }
    })
}