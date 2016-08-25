'use strict';

/**
 * gulp modules
 */
var argv         = require('yargs').argv;
var autoprefixer = require('autoprefixer');
var browsersync  = require('browser-sync').create();
var cp           = require('child_process');
var gulp         = require('gulp');
var htmlmin      = require('gulp-htmlmin');
var imagemin     = require('gulp-imagemin');
var manifest     = require('assets-webpack-plugin');
var named        = require('vinyl-named');
var newer        = require('gulp-newer');
var jshint       = require('gulp-jshint');
var plumber      = require('gulp-plumber');
var pngquant     = require('imagemin-pngquant');
var postcss      = require('gulp-postcss');
var pxtorem      = require('postcss-pxtorem');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var watch        = require('gulp-watch');
var webpack      = require('webpack-stream');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Load configurations & set variables
var config       = require('./twobrain.config.js');
var tasks        = [];
var build        = [];
var paths        = {};
var entry        = [];

// Load PostCSS modules
var processors   = [
  autoprefixer({ browsers: config.autoprefixer.browsers }),
  pxtorem( config.pxtorem.options )
];

/**
 * Set default & build tasks
 */
Object.keys(config.tasks).forEach(function (key) {
  if (config.tasks[key]) {
    tasks.push(key == 'webpack' ? '_' + key : key);
  }
});

Object.keys(config.tasks).forEach(function (key) {
  if (config.tasks[key] && key != 'server') {
    build.push(key);
  }
});

/**
 * Paths
 */
Object.keys(config.paths).forEach(function (key) {
  if (key != 'assets') {
    if (config.paths.assets === '') {
      paths[key] = './' + config.paths[key];
    } else {
      paths[key] = config.paths.assets + '/' + config.paths[key];
    }
  }
});

for (var i = 0; i <= config.js.entry.length - 1; i++) {
  entry.push(paths.jsSrc + '/' + config.js.entry[i]);
}

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  var jekyllConfig = config.jekyll.config.default;
  if (argv.production) {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
  } else {
    jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
  }
  return cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browsersync.notify('Rebuilded Jekyll');
  browsersync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('server', ['jekyll-build'], function() {
  return browsersync.init({
    port: config.port,
    server: {
      baseDir: config.paths.dest,
    }
  });
});

gulp.task('html', function() {
  return gulp.src('build/**/*.html')
    .pipe(htmlmin(config.htmlmin.options))
    .pipe(gulp.dest('build'));
});

/**
 * Sass
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + '/**/*')
    .pipe(sass({
      outputStyle: config.sass.outputStyle,
      includePaths: ['./bower_components/susy/sass']
    }).on('error', sass.logError))
    // .pipe(autoprefixer({ browsers: config.autoprefixer.browsers }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.css));
});

/**
 * Images
 */
gulp.task('imagemin', function () {
  return gulp.src(paths.imagesSrc + '/**/*')
    .pipe(plumber())
    .pipe(newer(paths.images))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.images));
});

/**
 * Linting JS
 */

gulp.task('jshint', function() {
  return gulp.src(paths.jsSrc + '/**/**/*')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});

/**
 * Webpack
 *
 * Bundle JavaScript files
 */
gulp.task('webpack', ['jshint'], function () {
  return gulp.src(entry)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack({
      watch: argv.watch ? true : false,
      output: {
        filename: 'main.[hash].js'
      },
      resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
      },
      plugins: [
        new manifest({
          filename: 'assets.json',
          path: './source/_data',
          // fullPath: false,
          prettyPrint: true
        })
      ]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js));
});

// For internal use only
gulp.task('_webpack', function () {
  argv.watch = true;
  gulp.start('webpack');
});

/**
 * Build
 */
gulp.task('build', build, function (done) {
  var jekyllConfig = config.jekyll.config.default;
  if (argv.production) {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
  } else {
    jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
  }
  return cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
    .on('close', done);
});

/**
 * Default task, running just `gulp` will minify the images, compile the sass, js, and jekyll site,
 * launch BrowserSync, and watch files. Tasks can be configured by twobrain.config.json.
 */
gulp.task('default', tasks, function () {
  if (config.tasks.imagemin) {
    watch(paths.imagesSrc + '/**/*', function () {
      gulp.start('imagemin');
    });
  }

  if (config.tasks.sass) {
    watch(paths.sass + '/**/*', function () {
      gulp.start('sass');
    });
  }

  if (config.tasks['server']) {
    watch([
      '!./node_modules/**/*',
      '!./README.md',
      '!' + paths.dest + '/**/*',
      'gulpfile.js',
      'twobrain.config.js',
      'source/_includes/**/*',
      'source/_layouts/**/*',
      'source/_pages/**/*',
      paths.posts + '/**/*',
      paths.css + '/**/*',
      paths.js + '/**/*',
      paths.images + '/**/*'
    ], function () {
      gulp.start('jekyll-rebuild');
    });
  }
});

/**
 * Test
 */
gulp.task('test', ['build']);
