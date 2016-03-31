var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	KarmaServer = require('karma').Server;

gulp.task('default', ['lint', 'all', 'pt', 'ps', 'ph', 'hs', 'test']);

gulp.task('test', ['all'], function(done) {
   new KarmaServer({
	   configFile: __dirname + '/tests/karma.conf.js'
   }, done).start();
});

gulp.task('lint', function() {
  return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('all', function() {
  return gulp.src([
       './src/neutriumJS.thermo.IAPWS97.js',
	   './src/neutriumJS.thermo.IAPWS97.PT.js',
	   './src/neutriumJS.thermo.IAPWS97.PS.js',
	   './src/neutriumJS.thermo.IAPWS97.PH.js',
	   './src/neutriumJS.thermo.IAPWS97.HS.js'
    ])
  	.pipe(concat('neutriumJS.thermo.IAPWS97.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('pt', function() {
  return gulp.src([
       './src/neutriumJS.thermo.IAPWS97.js',
	   './src/neutriumJS.thermo.IAPWS97.PT.js',
    ])
  	.pipe(concat('neutriumJS.thermo.IAPWS97.pt.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('ps', function() {
  return gulp.src([
       './src/neutriumJS.thermo.IAPWS97.js',
	   './src/neutriumJS.thermo.IAPWS97.PT.js',
	   './src/neutriumJS.thermo.IAPWS97.PS.js'
    ])
  	.pipe(concat('neutriumJS.thermo.IAPWS97.pt-ps.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('ph', function() {
  return gulp.src([
       './src/neutriumJS.thermo.IAPWS97..js',
	   './src/neutriumJS.thermo.IAPWS97.PT.js',
	   './src/neutriumJS.thermo.IAPWS97.PH.js',
    ])
  	.pipe(concat('neutriumJS.thermo.IAPWS97.pt-ph.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('hs', function() {
  return gulp.src([
       './src/neutriumJS.thermo.IAPWS97..js',
	   './src/neutriumJS.thermo.IAPWS97.PT.js',
	   './src/neutriumJS.thermo.IAPWS97.PH.js',
	   './src/neutriumJS.thermo.IAPWS97.HS.js',
    ])
  	.pipe(concat('neutriumJS.thermo.IAPWS97.pt-ph-hs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});