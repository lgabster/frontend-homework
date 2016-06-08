/**
 * Created by lgabster on 2016.05.31..
 */
/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const _ = require('lodash')
const templateMiddleware = require('../lib/templateMiddleware')
const repoService = require('../services/repoService')

module.exports.controller = (app) => {

    app.get('/repo', templateMiddleware, (req, res) => {
        var result = {}
        if (req.user) {
            result.user = req.user
            var limit = req.query.limit || 5
            var offset = req.query.offset || 0

            repoService.getNextPage(limit, offset)
                .then((repos) => {
                    result = _.extend({}, result, repos)
                    console.log(result)
                    if (req.xhr) {
                        res.send(result)
                    } else {
                        res.render('index', result)
                    }
                })
                .catch((err) => {
                    console.log(error)
                    res.render('index')
                })
        } else {
            res.redirect('/')
        }

    })
}