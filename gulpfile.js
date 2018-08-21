var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
var minifyHTML = require('gulp-minify-html');
var rigger = require('gulp-rigger');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var include = require('gulp-include');
var appRoot = require('app-root-path');

var path = {
    build: {
        html: 'dist/',
        js: 'dist/js/',
        vendorScripts: 'dist/js/vendor/',
        css: 'dist/css/',
        vendorStyles: 'dist/css/vendor/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        vendorScripts: 'src/scripts/vendor/*.js',
        css: 'src/sass/*.scss',
        vendorStyles: 'src/sass/vendor/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.*',
        js: 'src/scripts/**/*.*',
        vendorScripts: 'src/scripts/vendor/**/*.*',
        style: 'src/sass/**/*.*',
        vendorStyles: 'src/sass/vendor/**/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    approot: './dist'
};

gulp.task('html', function () {
    gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(minifyHTML())
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('styles', function () {
    gulp.src(path.src.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('vendorStyles', function () {
   gulp.src(path.src.vendorStyles)
       .pipe(minifyCSS())
       .pipe(gulp.dest(path.build.vendorStyles));
});

gulp.task('scripts', function () {
    gulp.src('./src/scripts/main.js')
        .pipe(concat('main.js'))
        .pipe(include({
            includePaths: [
                appRoot,
                appRoot + "/src/scripts"
            ]
        }))
        .on('error', console.log)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('vendorScripts', function () {
    gulp.src(path.src.vendorScripts)
        .pipe(gulp.dest(path.build.vendorScripts));
});

gulp.task('images', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('size', function () {
    gulp.src('./src/**')
        .pipe(size({
            showFiles: true
        }));
});

gulp.task('serve', ['styles', 'vendorStyles', 'html', 'scripts', 'vendorScripts', 'images', 'fonts'], function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });
});

gulp.task('default', ['serve'], function () {
    gulp.watch(path.watch.style, ['styles']);
    gulp.watch(path.watch.vendorStyles, ['vendorStyles']);
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.js, ['scripts']);
    gulp.watch(path.watch.vendorScripts, ['vendorScripts']);
    gulp.watch(path.watch.img, ['images']);
    gulp.watch(path.watch.fonts, ['fonts']);
});

