/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const express = require('express')
const app = express()

const path = require('path')

const http = require('http')
const port = process.env.PORT || '8000'

const middleware = require('./middleware')


middleware(app)

app.set('port', port)

let server = http.createServer(app)
server.listen(port)

server.on('error', (error) => {
    console.error(error)
    process.exit(1)
})