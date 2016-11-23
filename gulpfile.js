var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render');
var uglify = require('gulp-uglify');
var pump = require('pump');
const imagemin = require('gulp-imagemin');


function customPlumber(errTitle) {
	return plumber ({
		errorHandler: notify.onError({
			title: errTitle || "Error running Gulp",
			message: "Error: <%= error.message %>",
			sound: "Glass",
		})
	});
};

gulp.task('js', function(cb) {
    pump([
        gulp.src('src/js/*.js'),
        customPlumber('JSHint Error'),
        jshint(),
        jshint.reporter('default'),
        jshint.reporter('fail'),
        uglify(),
        gulp.dest('dist/js'),
        browserSync.stream()
    ],
    cb
    );
});

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
    	.pipe(customPlumber('Error Running Sass'))
    	.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
    nunjucksRender.nunjucks.configure(['src/parts/'], {watch:false});
    return gulp.src('src/pages/**/*.+(html|nunjucks)')
    .pipe(customPlumber('Error Running Nunjucks'))
    .pipe(nunjucksRender({
        path: 'src/parts'
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./",
        ghostMode: false
    });
});

gulp.task('images', function() {
        return gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/img'))
});

gulp.task('default', ['serve','sass', 'js'], function() {
	gulp.watch([
        'src/pages/**/*',
        'src/parts/**/*.+(html|nunjucks)',
    ], ['nunjucks']
    );
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('./*.html').on('change', browserSync.reload);
});