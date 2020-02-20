'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
//var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var minify = require("gulp-babel-minify");
var rename = require("gulp-rename");

sass.compiler = require('node-sass');

gulp.task('sass', function() {
    return gulp.src('./public/stylesheets/*.sass')
        // .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // .pipe(sourcemaps.write('./'))
        .pipe(rename(function(path) {
            if (!path.extname.endsWith('.map')) {
                path.basename += '.min';
                // gulp-rename with function only concats 'dirname + basename + extname'
            }
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('scss', function() {
    return gulp.src('./public/stylesheets/*.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        // .pipe(sourcemaps.write('./'))
        .pipe(rename(function(path) {
            if (!path.extname.endsWith('.map')) {
                path.basename += '.min';
                // gulp-rename with function only concats 'dirname + basename + extname'
            }
        }))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
    return gulp.src('./public/javascripts/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(minify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function() {
    gulp.watch('./public/stylesheets/*.sass', gulp.series('sass'));
    gulp.watch('./public/stylesheets/*.scss', gulp.series('scss'));
    gulp.watch('./public/javascripts/*.js', gulp.series('js'));
});