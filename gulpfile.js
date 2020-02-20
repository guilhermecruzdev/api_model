'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

gulp.task('sass', function() {
    return gulp.src('./public/stylesheets/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('scss', function() {
    return gulp.src('./public/stylesheets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function() {
    gulp.watch('./public/stylesheets/*.sass', gulp.series('sass'));
    gulp.watch('./public/stylesheets/*.scss', gulp.series('scss'));
});