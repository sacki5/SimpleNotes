var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');

gulp.task('styles', function() {
    gulp.src('src/scss/*.scss')
      . pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(livereload());
  });

gulp.task('img', function() {
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/assets/'))
		.pipe(livereload());
});

gulp.task('html', function() {
	gulp.src('public/views/*')
		.pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
    gulp.watch('src/scss/*.scss',['styles']);
    gulp.watch('src/img/*',['img']);
    gulp.watch('public/views/*',['html']);
});

gulp.task('default', ['styles','img','html', 'watch']);
