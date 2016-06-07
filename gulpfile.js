/**
 * Created by lgabster on 2016.05.29..
 */
'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-ruby-sass')
const autoprefixer = require('gulp-autoprefixer')
const minifycss = require('gulp-minify-css')
const jshint = require('gulp-jshint')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const notify = require('gulp-notify')
const handlebars = require('gulp-handlebars')
const wrap = require('gulp-wrap')
const declare = require('gulp-declare')
const connect = require('gulp-connect')
const runSequence = require('run-sequence').use(gulp)
const lr = require('tiny-lr')
const server = lr()
const lsPort = 35729

const paths = {
    scripts: ['public/js/**/*.js', '!public/js/vendor/**', '!gulpfile.js'],
    serverFiles: ['*.js', 'lib/**/*.js', 'controllers/**/*.js', 'helpers/**/*.js', 'services/**/*.js', '!node_modules'],
    styles: ['public/styles/**/*.scss', '!public/styles/vendor/**'],
    sharedTemplates: ['views/shared/**/*.hbs'],
    templates: ['views/**/*.hbs', '!views/shared/**/*.hbs']
}


// Start server
gulp.task('server', function(){
    return nodemon({
        'script': 'app.js'
    }).on('restart', function() {
        gulp.src('*')
            .pipe(connect.reload())
    })
})

// Styles
gulp.task('styles', function() {
    return sass('public/styles/main.scss')
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dist/css'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Styles task complete' }))
})

// Scripts
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/dist/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Scripts task complete' }))
})

// Server side scripts
gulp.task('server-scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(connect.reload())
        .pipe(notify({ message: 'Server script task complete' }))
})

// precompiled template files
gulp.task('compile-templates', function() {
    return gulp.src(paths.sharedTemplates)
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'HBTemplates',
            noRedeclare: true
        }))
        .pipe(concat('template.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/templates'))
        .pipe(connect.reload())
        .pipe(notify({ message: 'Template compile task complete' }))
})

// template
gulp.task('hbs', function() {
    return gulp.src(paths.templates)
        .pipe(connect.reload())
})



// Build task
gulp.task('build', function(done) {
    runSequence('styles', 'scripts', 'compile-templates', function() {
        done()
    })
})


// Live-reload
gulp.task('connect', function() {
    return connect.server({
        root: 'app',
        livereload: true,
        auto: false
    });
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['public/dist/*'], {read: true})
        .pipe(clean({force: true}))
})

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch(paths.styles, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        gulp.run('styles')
    })

    // Watch .js files
    gulp.watch(paths.scripts, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        gulp.run('scripts')
    })

    // Watch .js files
    gulp.watch(paths.serverFiles, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        gulp.run('server-scripts')
    })

    // Watch shared templates files
    gulp.watch(paths.sharedTemplates, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        gulp.run('compile-templates')

    }).on('change', function (file) {
        gulp.src(file.path)
            .pipe(connect.reload())
    })

    // Watch templates
    gulp.watch(paths.templates, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        gulp.run('hbs')
    })
})


// Default task
gulp.task('default', function(done) {
    runSequence('clean', 'build', 'connect', 'server', 'watch', function() {
        done()
    })
})
