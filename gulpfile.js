var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var karma = require('karma').server;

gulp.task('default', ['lint', 'test', 'compress']);

gulp.task('test', function(done) {
   karma.start({
	   configFile: __dirname + '/tests/karma.conf.js'
   }, done);
});

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
  gulp.src('./src/**/*.js')
  	.pipe(concat('neutriumJS.steam.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});