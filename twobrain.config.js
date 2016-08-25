module.exports = {
  port: 4000,

  tasks: {
    imagemin:   true,
    sass:       true,
    server:     true,
    webpack:    true,
  },

  paths: {
    dest:      "build",
    posts:     "source/_posts",
    assets:    "source/assets",
    css:       "styles",
    js:        "scripts",
    images:    "images",
    sass:      "_styles",
    jsSrc:     "_scripts",
    imagesSrc: "_images",
  },

  jekyll: {
    config: {
      default:     "_config.yml",
      development: "_config.dev.yml",
      production:  "_config.prod.yml",
    }
  },

  sass: {
    outputStyle: "compressed",
  },

  autoprefixer: {
    browsers: [
      "> 1%",
      "last 2 versions",
      "Firefox ESR",
    ]
  },

  pxtorem: {
    options: {
      selectorBlackList: ['html', 'site-header', 'two-brain', 'site-content', 'teaser', 'site-footer', 'nav', 'uberspace', 'legal', 'padding-border'],
      prop_white_list: [],
      rootValue: 20,
      replace: true
    }
  },

  htmlmin: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true
    }
  },
  js: {
    entry: [
      "main.js",
    ],
  },
}
