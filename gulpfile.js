const gulp       = require('gulp');
const livereload = require('gulp-livereload');
const sass       = require('gulp-sass');
const plumber    = require('gulp-plumber');
const beep       = require('beepbeep');
const gutil      = require('gulp-util');

const onError = function (err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
};

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['./index.html'], ['html']);
  gulp.watch('css/*.css', ['css']);
  gulp.watch('scss/*.scss', ['scss']);
});

gulp.task('default', ['watch']);

gulp.task('html', function () {
  gulp
    .src(['./index.html'])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(livereload());
});

gulp.task('css', function () {
  gulp
    .src('css/*.css')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(livereload());
});

gulp.task('scss', function () {
  gulp
    .src(['./scss/*.scss'])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
