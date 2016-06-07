/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const path = require('path')
const fs = require('fs')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')

const passport = require('./lib/passport')
const hbs = require('./helpers/handlebarsHelper')

const ctrlPath = path.join(__dirname, 'controllers')

module.exports = function(app) {
    // set controllers
    var readControllers = (dir) => {
        console.log('Scanning for controllers ' + dir)
        
        fs.readdirSync(dir).forEach((file) => {
            var fullPath = dir + '/' + file

            if (file.substr(-3) === '.js') {
                console.log('Loading '+file)

                var route = require(fullPath)
                
                if (route.controller) {
                    route.controller(app)
                }
            } else if(fs.lstatSync(fullPath).isDirectory()) {
                readControllers(fullPath)
            }
        })
    }

    // view engine setup
    app.engine('hbs', hbs.engine)
    app.set('view engine', 'hbs')
    app.set('views', `${__dirname}/views`)

    //parsers
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())

    //passport
    app.use(session({ 
        secret: 'Virg0HomeWork',
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    readControllers(ctrlPath)

    app.set('express', express)

    //path
    app.use(express.static(path.join(__dirname, 'public')))
}