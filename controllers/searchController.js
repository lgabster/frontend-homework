/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const templateMiddleware = require('../lib/templateMiddleware')
const repoService = require('../services/repoService')

module.exports.controller = (app) => {

    app.get('/search', templateMiddleware, (req, res) => {
        if (req.user) {
            var queryString = req.query.q || ''

            repoService.getFilteredRepos(queryString)
                .then((repos) => {
                    var result = repos
                    result.user = req.user
                    result.queryString = queryString
                    res.render('search', result)
                })
                .catch((err) => {
                    console.log(err)
                    res.render('search', {})
                })
        } else {
            res.redirect('/')
        }

    })
}