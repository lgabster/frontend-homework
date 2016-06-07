/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const request = require('request');

module.exports.controller = function(app) {

    app.get('/modal', function(req, res) {
        res.render('partials/modal')
    })
}