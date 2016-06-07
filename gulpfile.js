'use strict'

var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var sass = require('gulp-ruby-sass')
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var clean = require('gulp-clean')
var concat = require('gulp-concat')
var notify = require('gulp-notify')
var handlebars = require('gulp-handlebars')
var wrap = require('gulp-wrap')
var declare = require('gulp-declare')
var concat = require('gulp-concat')
var connect = require('gulp-connect')
var lr = require('tiny-lr')
var server = lr()
var lsPort = 35729

var paths = {
    scripts: ['public/js/**/*.js', '!public/js/vendor/**', '!gulpfile.js'],
    serverFiles: ['*.js', 'lib/**/*.js', 'controllers/**/*.js'],
    styles: ['public/styles/**/*.scss', '!public/styles/vendor/**'],
    templates: ['views/shared/**/*.hbs']
}


// Start server
gulp.task('server', function(){
    nodemon({
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
    //.pipe(livereload(server))
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

gulp.task('compile-templates', function() {
    return gulp.src(paths.templates)
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
});

// Build task
gulp.task('build', ['styles', 'scripts', 'compile-templates'])


// Live-reload
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['public/dist'], {read: false})
        .pipe(clean())
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

    // Watch .js files
    gulp.watch(paths.templates, function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
        //gulp.run('compile-templates')

    }).on('change', function (file) {
        gulp.src(file.path)
            .pipe(connect.reload())
    })
})


// Default task
gulp.task('default', ['clean', 'build', 'connect', 'server', 'watch'])
