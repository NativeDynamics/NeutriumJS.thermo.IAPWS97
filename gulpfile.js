var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var karma = require('karma').server;

gulp.task('default', ['lint', 'test', 'all', 'pt', 'ps', 'ph', 'hs']);

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

gulp.task('all', function() {
  gulp.src([
       './src/NeutriumJS.Steam.js',
	   './src/NeutriumJS.Steam_PT.js',
	   './src/NeutriumJS.Steam_PS.js',
	   './src/NeutriumJS.Steam_PH.js',
	   './src/NeutriumJS.Steam_HS.js'
    ])
  	.pipe(concat('neutriumJS.steam.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('pt', function() {
  gulp.src([
       './src/NeutriumJS.Steam.js',
	   './src/NeutriumJS.Steam_PT.js',
    ])
  	.pipe(concat('neutriumJS.steam.pt.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('ps', function() {
  gulp.src([
       './src/NeutriumJS.Steam.js',
	   './src/NeutriumJS.Steam_PT.js',
	   './src/NeutriumJS.Steam_PS.js'
    ])
  	.pipe(concat('neutriumJS.steam.pt-ps.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('ph', function() {
  gulp.src([
       './src/NeutriumJS.Steam.js',
	   './src/NeutriumJS.Steam_PT.js',
	   './src/NeutriumJS.Steam_PH.js',
    ])
  	.pipe(concat('neutriumJS.steam.pt-ph.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('hs', function() {
  gulp.src([
       './src/NeutriumJS.Steam.js',
	   './src/NeutriumJS.Steam_PT.js',
	   './src/NeutriumJS.Steam_PH.js',
	   './src/NeutriumJS.Steam_HS.js',
    ])
  	.pipe(concat('neutriumJS.steam.pt-ph-hs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});