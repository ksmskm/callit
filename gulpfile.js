const gulp       = require('gulp');
const browserify = require('browserify');
const babelify   = require('babelify');
const source     = require('vinyl-source-stream');
const livereload = require('gulp-livereload');

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
  gulp.watch('*.js', ['build']);
  gulp.watch('./js/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);

gulp.task('html', function() {
  gulp.src('index.html').pipe(livereload());
});

gulp.task('css', function() {
  gulp.src('css/index.css').pipe(livereload());
});

// DID: 
// npm install jshint gulp-jshint --save-dev
// TODO:
// stackoverflow.com/questions/27669519/browserify-only-if-lint-passes-in-gulp
