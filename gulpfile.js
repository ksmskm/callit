var gulp = require('gulp');
var livereload = require('gulp-livereload');
 
gulp.task('html', function() {
  gulp.src('index.html').pipe(livereload());
});

gulp.task('js', function() {
  gulp.src('index.js').pipe(livereload());
});
 
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('index.html', ['html']);
  gulp.watch('index.css', ['css']);
  gulp.watch('index.js', ['js']);
});

gulp.task('css', function() {
  gulp.src('index.css').pipe(livereload());
});
