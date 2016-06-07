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

module.exports.controller = function(app) {

    app.get('/repo', templateMiddleware, function(req, res) {
        var result = {}
        if (req.user) {
            result.user = req.user
            var limit = req.query.limit || 5
            var offset = req.query.offset || 0

            repoService.getNextPage(limit, offset)
                .then(function(repos) {
                    result = _.extend({}, result, repos)
                    if (req.xhr) {
                        res.send(result)
                    } else {
                        res.render('index', result)
                    }
                })
                .catch(function(err) {
                    console.log(err)
                    res.render('index', {})
                })
        } else {
            res.render('index', {})
        }

    })
}