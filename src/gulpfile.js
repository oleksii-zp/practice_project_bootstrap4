'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    staticServer = require('node-static');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./../",
        },
        port: 5000
    });
});

gulp.task('styles', function () {
    gulp.src('sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../css'))
        .pipe(browserSync.stream())
        .pipe(notify('Style task completed'))
});

gulp.task('scripts', function() {
    gulp.src('js/script.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../js'))
        .pipe(browserSync.stream())
        .pipe(notify('Scripts task completed'))
});

gulp.task('default', ['browser-sync'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch("../**/*.html").on('change', browserSync.reload);
});

gulp.task('static-server', function () {
    var file = new staticServer.Server('./../', { cache: 600 });

    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            file.serve(request, response);
        }).resume();
    }).listen(8080);
});