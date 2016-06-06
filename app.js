/**
 * Created by lgabster on 2016.05.31..
 */

 'use strict'

const express = require('express')
const app = express()

const path = require('path')

const fs = require('fs')

const http = require('http')
const port = process.env.PORT || '8000'

const middleware = require('./middleware')

const ctrlPath = path.join(__dirname, 'controllers')

console.log(ctrlPath);

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
            readControllers(fullPath);
        }
    });
};


middleware(app)

app.set('port', port);

readControllers(ctrlPath);

let server = http.createServer(app);
server.listen(port);

server.on('error', (error) => {
    console.error(error);
    process.exit(1);
});