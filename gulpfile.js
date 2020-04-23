"use strict"

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')
const babel = require('gulp-babel')
const minify = require("gulp-babel-minify")
const rename = require("gulp-rename")
const imagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminGifsicle = require('imagemin-gifsicle')
    //const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')

gulp.task('sass', function() {
    return gulp.src('./public/stylesheets/*.sass')
        // .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // .pipe(sourcemaps.write('./'))
        .pipe(rename(function(path) {
            if (!path.extname.endsWith('.map')) {
                path.basename += '.min'
                    // gulp-rename with function only concats 'dirname + basename + extname'
            }
        }))
        .pipe(gulp.dest('./public/css'))
})

gulp.task('scss', function() {
    return gulp.src('./public/stylesheets/*.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // .pipe(sourcemaps.write('./'))
        .pipe(rename(function(path) {
            if (!path.extname.endsWith('.map')) {
                path.basename += '.min'
                    // gulp-rename with function only concats 'dirname + basename + extname'
            }
        }))
        .pipe(gulp.dest('./public/css'))
})

gulp.task('js', function() {
    return gulp.src('./public/javascripts/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(minify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/js'))
})

gulp.task('img', function() {
    return gulp.src('./public/images/**')
        .pipe(imagemin({
            use: [imageminPngquant(), imageminJpegtran(), imageminGifsicle()]
        }))
        .pipe(gulp.dest('./public/img'))
})

gulp.task('nodemon', function(cb) {
    let called = false
    return nodemon({
            ext: '*',
            script: 'index',
            ignore: [
                'gulpfile.js',
                'node_modules/',
                'logs/',
            ]
        })
        .on('start', function() {
            if (!called) {
                called = true
                cb()
            }
        })
})

gulp.task('default', gulp.series('nodemon', function() {
    gulp.watch('./public/stylesheets/*.sass', gulp.parallel('sass'))
    gulp.watch('./public/stylesheets/*.scss', gulp.parallel('scss'))
    gulp.watch('./public/javascripts/*.js', gulp.parallel('js'))
    gulp.watch('./public/images/**', gulp.parallel('img'))
}))