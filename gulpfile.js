var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var flatten = require('gulp-flatten');
var watch = require('gulp-watch');
var merge = require('merge2');
var runSequence = require('run-sequence');


var pkg = './package/';
var tsProject = ts.createProject('./tsconfig.json');

gulp.task('default', ['tsCompilation', 'srcTsMove', 'runTests']);


gulp.task('cleanPkg', function () {
  return gulp.src(['./package/*.*'], {
    force: true
  })
    .pipe(clean());
});

gulp.task('copyTsToPkg', ['cleanPkg'], function () {
  return gulp.src(['./src/**/*.ts', '!./src/**/*.d.ts', './package.json', './readme.md'])
    .pipe(flatten())
    .pipe(gulp.dest(pkg));
});

gulp.task('compilePkgTs', ['copyTsToPkg'], function () {
  var tsResult = gulp.src('./package/*.ts')
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest(pkg)),
    tsResult.js.pipe(gulp.dest(pkg))
  ]);
});

gulp.task('dwp', function () {
  runSequence('compilePkgTs')
  watch('./src/**/*.ts', function () {
    console.log('Build started', (new Date(Date.now())).toString());
    return runSequence('compilePkgTs');
  });
});