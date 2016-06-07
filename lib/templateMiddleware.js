/**
 * Created by lgabster on 2016.05.31..
 */
'use strict'

const hbs = require('../helpers/handlebarsHelper')

module.exports = function exposeTemplates(req, res, next) {
    hbs.getTemplates('views/shared/', {
        // TODO set template cache
        //cache      : app.enabled('view cache'),
        precompiled: true
    }).then(function (templates) {
        var extRegex = new RegExp(hbs.extname + '$')

        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            }
        })

        if (templates.length) {
            res.locals.templates = templates
        }

        next()
    })
    .catch(next)
}