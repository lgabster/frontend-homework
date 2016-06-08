/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const request = require('request-promise')
const _ = require('lodash')
const q = require('bluebird')


var requestOptions = {
    url: 'https://api.github.com/users/gulpjs/repos',
    headers: {
        'User-Agent': 'Awesome-Experss-App'
    },
    json: true
}

module.exports = {
    getNextPage: function(limit, offset) {
        return this.getRepos().then(function(repos) {
            var result = {}
            if (Number(offset) > repos.length) {
                result.nextUrl = false
            } else {
                var newOffset = Number(offset) + Number(limit)
                result.repoLimit = limit
                result.repoOffset = newOffset 
                result.repos = _.slice(repos, offset, newOffset)
                result.nextUrl = true
            }
            return result
        }).catch(function(err) {
            console.log('err')
            return {
                nextUrl: false, 
                repos: {},
                error: 'API error'
            }
        })
    },
    getFilteredRepos: function(queryString) {
        if (queryString) {
            return this.getRepos().then(function(repos) {
                var result = {}
                result.repos = _.filter(repos, function(repo) { 
                    var reponame = repo.name
                    return reponame.indexOf(queryString) > -1
                })
                return result
            }).catch(function(err) {
                console.log(err)
                return {
                    nextUrl: false, 
                    repos: {},
                    error: 'API error'
                }
            })
        } else {
            return new Promise([])
        }
    },
    getRepos: function() {
        return request(requestOptions)
    }
}