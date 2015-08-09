module.exports = function(grunt) {

  'use strict';

  // CUSTOM JQUERY BUILT - http://developer.telerik.com/featured/trimming-jquery-grunt/
  // !! LIST NEEDS TO BE EXPANDED !!
  var version = "2.1.4",
  exclude = [ "core/ready", "effects", "deprecated", "ajax/script", "ajax/jsonp", "event/alias", "wrap" ],
  dest = "jquery-" + version + ".custom.js"
  exclude.forEach(function( module, index ) {
    exclude[ index ] = "-" + module;
  });


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // CONFIGURABLE PATHS
    config: {
      source: 'source',
      dest: 'build'
    },


    // GENERAL TASKS

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config_prod.yml'
      },
      dev: {
        options: {
          config: '_config.yml',
          src: '<%= config.source %>',
          dest: '<%= config.dest %>'
        }
      },
      prod: {
        options: {
          src: '<%= config.source %>',
          dest: '<%= config.dest %>'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '<%= config.dest %>/*.html',
            '<%= config.dest %>/css/*.css',
            '<%= config.dest %>/js/*.js',
            '<%= config.source %>/img/**/*.{jpg,png,svg,gif}'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: '<%= config.dest %>'
          }
        }
      }
    },

    watch: {
      sass: {
        files: '<%= config.source %>/_scss/**/*.scss',
        tasks: ['sass', 'autoprefixer', 'penthouse']
      },
      jekyll: {
        files: ['Gruntfile.js', '<%= config.source %>/**/*.{html,md,css,js}'],
        tasks: ['jekyll:dev']
      }
    },

    copy: {
      OptimizedWebfontLoading: {
        files: {
          '<%= config.source %>/_includes/fontloader.js': 'bower_components/OptimizedWebfontLoading/build/fontloader.js'
        }
      },
      loadCSS: {
        files: {
          '<%= config.source %>/_includes/loadCSS.js': 'bower_components/loadcss/loadCSS.js'
        }
      },
      normalize: {
        files: {
          '<%= config.source %>/_scss/vendor/_normalize.scss': 'bower_components/normalize.css/normalize.css'
        }
      }
    },

    buildcontrol: {
      dist: {
        options: {
          dir: 'build',
          remote: 'git@github.com:S1SYPHOS/S1SYPHOS.github.io.git',
          branch: 'master',
          commit: true,
          push: true
        }
      }
    },

    pagespeed: {
      options: {
        nokey: true,
        url: 'http://daktylos.net',
        locale: 'en_GB'
      },
      desktop: {
        options: {
          strategy: 'desktop'
        }
      },
      mobile: {
        options: {
          strategy: 'mobile'
        }
      }
    },


    // USEMIN SECTION

    useminPrepare: {
      options: {
        dest: '<%= config.dest %>',
        // staging: '<%= config.source %>/_tmp'
      },
      html: '<%= config.dest %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: '<%= config.dest %>',
        /* async / defer for generated JS - https://github.com/yeoman/grunt-usemin/issues/391
        blockReplacements: {
          js: function (block){
            return '<script async src='' + block.dest + '' defer=defer><\/script>';
          }
        } */
      },
      html: ['<%= config.dest %>/**/*.html'],
      // css: ['<%= config.dest %>/css/**/*.css'],
    },

    concat: { },

    uglify: { },


    // STYLESHEET SECTION

    sass: {
      options: {
        // includePaths: ['some/other/path']
      },
      dist: {
        files: {
          '<%= config.source %>/css/style.css': '<%= config.source %>/_scss/style.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        expand: true,
        src: '.tmp/concat/css/style.css'
      }
    },

    csscomb: {
      dist: {
        files: {
          '.tmp/concat/css/style.css': '.tmp/concat/css/style.css'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        // compatibility: 'ie8'
      }
    },

    penthouse: {
      dist: {
        outfile : '<%= config.source %>/_includes/critical.css',
        css : '<%= config.source %>/css/style.css',
        url : 'http://localhost:3000',
        width : 1280,
        height : 800
      }
    },


    // JAVASCRIPT SECTION

    shell: {
      jQuery: {
        command: [
          "cd source/js/vendor",
          "git clone https://github.com/jquery/jquery.git",
          "cd jquery",
          "git checkout " + version,
          "npm install",
          "grunt custom:" + exclude.join( "," ),
          "cd ../",
          "cp jquery/dist/jquery.js " + dest,
          "rm -rf jquery"
        ].join( "&&" )
      }
    },

    modernizr: {
      dist: {
        'devFile' : 'bower_components/modernizr/modernizr.js',
        'outputFile' : '<%= config.dest %>/js/modernizr-custom.js',
        'uglify' : true,
        'parseFiles' : false,
        files: {
          src: [
            '<%= config.dest %>/js/**/*.js',
            '<%= config.dest %>/css/style.css',
            '<%= config.dest %>/*.html'
          ]
        }
      }
    },


    // HTML SECTION

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dest %>',
          src: '**/*.html',
          dest: '<%= config.dest %>'
        }]
      }
    },

    cacheBust: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8,
        deleteOriginals: true,
        // ignorePatterns: ['.png', '.jpg', '.ico'],
        baseDir: '<%= config.dest %>'
      },
      assets: {
        files: [{
            src: ['<%= config.dest %>/**/*.html']
        }]
      }
    },


    // CODE QUALITY SECTION

    scsslint: {
      options: {
        bundleExec: true,
        colorizeOutput: true,
        config: '.scss-lint.yml',
      },
      check: '<%= config.source %>/_scss/*.scss'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      check: ['Gruntfile.js', '<%= config.source %>/js/*.js'],
    },

    devUpdate: {
      check: {
        options: {
          reportUpdated: false,
          updateType: 'prompt'
        }
      }
    }


  });

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('check', [
      'devUpdate',
      'jekyll:check',
      'scsslint',
      'jshint'
    ]);

    grunt.registerTask('dev', [
      'sass',
      'jekyll:dev',
      'browserSync',
    	'watch'
    ]);

    grunt.registerTask('prod', [
      'sass',
      'jekyll:prod',
      'modernizr',
      'useminPrepare',
      'concat',
      'autoprefixer',
      'csscomb',
      'cssmin',
      'uglify',
      'usemin',
      'cacheBust',
      'htmlmin'
    ]);

    grunt.registerTask('upload', [
      'check',
      'prod',
      'buildcontrol'
    ]);

    grunt.registerTask('prepare', [
      'copy',
      'prod',
      'buildcontrol'
    ]);

  };
