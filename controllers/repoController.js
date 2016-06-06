/**
 * Created by lgabster on 2016.05.31..
 */

const request = require('request-promise');
const _ = require('lodash');

module.exports.controller = function(app) {
    // routing
    app.get('/repo', function(req, res) {
        var result = {}
        if (req.user) {
            result.user = req.user
            var limit = req.query.limit || 5
            var offset = req.query.offset || 10

            console.log(limit, offset)

            var requestOptions = {
                url: 'https://api.github.com/users/gulpjs/repos',
                headers: {
                    'User-Agent': 'Awesome-Electron-App'
                },
                json: true
            }

            request(requestOptions)
            .then(function (body) {
                body = _.slice(body, 0, limit)
                result.githubRepos = body
                if (req.xhr) {
                    res.send(result)
                }
                res.render('index', result)
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