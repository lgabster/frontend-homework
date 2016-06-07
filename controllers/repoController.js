/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const request = require('request-promise')
const _ = require('lodash')
const templateMiddleware = require('../lib/templateMiddleware')

module.exports.controller = function(app) {

    app.get('/repo', templateMiddleware, function(req, res) {
        var result = {}
        if (req.user) {
            result.user = req.user
            var limit = req.query.limit || 5
            var offset = req.query.offset || 0

            console.log(limit, offset)

            var requestOptions = {
                url: 'https://api.github.com/users/gulpjs/repos',
                headers: {
                    'User-Agent': 'Awesome-Electron-App'
                },
                json: true
            }

            request(requestOptions)
                .then(function(body) {
                    console.log(Number(offset), body.length)
                    if (Number(offset) > body.length) {
                        result.nextUrl = false
                    } else {
                        var newOffset = Number(offset) + Number(limit)

                        result.repoLimit = limit
                        result.repoOffset = newOffset
                        body = _.slice(body, offset, newOffset)
                        result.repos = body
                        result.nextUrl = true
                    }
                    if (req.xhr) {
                        console.log(result)
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