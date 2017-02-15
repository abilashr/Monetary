"use strict";
// include required package
var gulp = require("gulp");

var cleanCSS = require("gulp-clean-css");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var pump = require("pump"); // To help properly handle error conditions with Node streams, recommended by gulp-uglify
var browserSync = require("browser-sync").create();

// Sets style paths
    // Sets destination css paths
var cssFiles = "app/*/*.css";
var minDest = "app/dist/css";
    // Sets JavaScript paths
var jsFiles = ["app/*.js", "app/*/*.js", "app/js/*/*.js"];
var jsDest = "app/dist/js";
    //Set Html paths
var htmlFiles = ["app/*/*.html", "app/*.html"];


// Converts CSS to minified CSS with gulp-clean-css
gulp.task("minify-css", function () {
    return gulp.src(cssFiles)
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(minDest))
        .pipe(browserSync.stream());
});

// JavaScript --------------------------------------------->
// Concatenates, Uglifies, and Minifies JS files with gulp-uglify
gulp.task("scripts", function () {
    pump([
        gulp.src(jsFiles),
        concat("scripts.js"),
        gulp.dest(jsDest)
    ]);
});

// BrowserSync -------------------------------------------->
// Sets up Browser Sync
gulp.task("browserSync", function () {
    browserSync.init({
        startPath: "./app/index.html",
        server: {
            baseDir: "./"
        }
    });
});

// Watch -------------------------------------------------->
// Watch for file changes in and run Browser Sync...
gulp.task("watch", ["browserSync", "minify-css", "scripts"], function () {
    gulp.watch(cssFiles, ["minify-css"], browserSync.reload);
    gulp.watch(jsFiles, ["scripts"], browserSync.reload);
    gulp.watch(htmlFiles, browserSync.reload);
});

gulp.task("default", ["browserSync", "watch"]);
