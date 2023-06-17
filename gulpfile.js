const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const mode = require('gulp-mode')({
  modes: ["production", "development"],
  default: "development",
  verbose: false
});

// ejs
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const htmlbeautify = require("gulp-html-beautify");
// css
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const gulpPostcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gulpDartSass = require('gulp-dart-sass')
const sassGlob = require('gulp-sass-glob-use-forward');
const gcmq = require('gulp-group-css-media-queries');
//　js
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');
// images
const imagemin = require('gulp-imagemin');
// browserSync
const browserSync = require('browser-sync').create();

// ==============================
// distの中身を削除
// ==============================
function removeFiles(done) {
  del(['./dist/**/*']);
  done();
};

// ==============================
// images / htmlファイルコピー
// ==============================
function copyFiles() {
  return src([
    './src/images/**/*',
    './src/**/*.html',
  ],
    {
      base: './src',
      since: lastRun(copyFiles)
    })
    .pipe(dest('./dist'));
};

// ==============================
// HTMLのビルド。
// ==============================
function buildHTML() {
  return src(["./src/**/*.ejs", "!./src/**/_*.ejs"])
    .pipe(ejs())
    .pipe(rename({ extname: ".html" }))
    .pipe(htmlbeautify({
      "indent_size": 2,
      "indent_char": " ",
      "max_preserve_newlines": 0,
      "preserve_newlines": false,
      "extra_liners": [],
    }))
    .pipe(dest('./dist'));
}

// ==============================
// sassのコンパイル。
// ==============================
function buildSass() {
  return src('./src/scss/**/*.scss', { sourcemaps: true })
    .pipe(sassGlob())
    .pipe(gulpDartSass())
    .pipe(sass().on('error', sass.logError))
    .pipe(gcmq())
    .pipe(gulpPostcss([autoprefixer("last 2 versions"), cssnano()]))
    .pipe(mode.development(dest('./dist/css', { sourcemaps: './sourcemaps' })))
    .pipe(mode.production(dest('./dist/css')));
};

// ==============================
// JSのバンドル
// ==============================
function buildJS() {
  return src(`.src/js/**/*.js`, {
    since: lastRun(buildJS)
  })
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(dest('./dist/js'));
};

// ==============================
// 画像の圧縮
// ==============================
function imagesMin() {
  return src('./src/images/**/*', {
    since: lastRun(imagesMin)
  })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo()
      ])
    )
    .pipe(dest('./dist/images'));
};

// ==============================
// browserSync
// ==============================
function staticServer(done) {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: 'index.html',
    }
  });
  done();
};

// reload
function reloadBrowser(done) {
  browserSync.reload();
  return done();
}

// watch
function watchingFiles() {
  watch(
    [
      './src/**/*.html',
      './src/**/*.ejs',
      './src/scss/**/*.scss',
      './src/images/**/*',
      './src/js/**/*.js',
    ],
    { delay: 500 },
    series(parallel(buildHTML, buildSass, buildJS), copyFiles, reloadBrowser)
  );
};

// ==============================
// exports
// ==============================
if (process.env.NODE_ENV === 'development') {
  exports.default = series(
    removeFiles,
    parallel(buildHTML, buildSass, buildJS),
    copyFiles,
    staticServer,
    watchingFiles
  );
}
if (process.env.NODE_ENV === 'production') {
  exports.default = series(
    removeFiles,
    parallel(buildHTML, buildSass, buildJS),
    copyFiles,
    imagesMin
  );
}