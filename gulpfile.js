const gulp       = require('gulp');
const browserify = require('browserify');
const babelify   = require('babelify');
const source     = require('vinyl-source-stream');
const livereload = require('gulp-livereload');
const sass       = require('gulp-sass');
const plumber    = require('gulp-plumber');
const beep       = require('beepbeep');
const gutil      = require('gulp-util');

const onError = function (err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
};

// thesocietea.org/2016/01/building-es6-javascript-for-the-browser-with-gulp-babel-and-more/
gulp.task('build', function () {
  return browserify({ entries: './index.js', debug: true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
});

gulp.task('watch', ['build'], function () {
  livereload.listen();
  gulp.watch('index.html', ['html']);
  gulp.watch('css/*.css', ['css']);
  gulp.watch('scss/*.scss', ['scss']);
  gulp.watch('*.js', ['build']);
  gulp.watch('./js/*.js', ['build']);
});

gulp.task('default', ['watch']);

gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(livereload());
});

gulp.task('css', function() {
  gulp.src('css/*.css')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(livereload());
});

gulp.task('scss', function() {
  return gulp.src(['./scss/index.scss'])
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
    // .pipe(livereload());
});
