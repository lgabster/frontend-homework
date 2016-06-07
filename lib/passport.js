/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const _ = require('lodash')
const passport = require('passport')
const Strategy = require('passport-local').Strategy

const users = require('../users')

passport.use(new Strategy(
    (username, password, cb) => {
        var myUser = _.find(users, (user) => {
            return user.username === username
        })
        if (!myUser) {
            console.log('noMyUser')
            return cb(null, false)
        }
        if (myUser.password !== password) {
            console.log('wrongPassword')
            return cb(null, false)
        }
        return cb(null, myUser)
    }))

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    var myUser = _.find(users, (user) => {
        return user.id === id
    })
    if (myUser) {
        cb(null, myUser)
    } else {
        cb('ERROR')
    }
})

module.exports = passport