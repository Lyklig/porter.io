module.exports = function (grunt) {

var mozjpeg = require('imagemin-mozjpeg');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      dev: {
        src: 'readme.txt',
        dest: 'README.md'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'assets/css/style.css': 'assets/scss/style.scss',
        }
      }
    },

    concat: {
      css: {
        src: ['assets/vendor/css/*', 'assets/css/style.css'],
        dest: 'assets/css/output.css'
      },
      js: {
        src: ['assets/vendor/js/*', 'assets/js/*'],
        dest: 'assets/js/output.js'
      }
    },

    cssmin: {
      css: {
        src: 'assets/css/output.css',
        dest: '_build/assets/css/output.min.css'
      }
    },

    uglify: {
      dist: {
        files: {
          '_build/assets/js/output.min.js': ['assets/js/output.js']
        },
      }
    },

    slim: {
      dist: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['**/*.slim'],
          dest: '_build/',
          ext: '.html',
        }],
      },
    },

    imagemin: { 
      dist: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'assets/img',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: '_build/assets/img'                  // Destination path prefix
        }]
      }
    },

    watch: {
      css: {
        files: 'assets/**/*.scss',
        tasks: ['sass', 'concat', 'cssmin'],
        options: {
          livereload: true,
        },
      },
      slim: {
        files: ['**/*.slim'],
        tasks: ['slim'],
      },
      scripts: {
        files: 'assets/js/*.js',
        tasks: ['newer:concat', 'newer:uglify'],
      },
      options: {
        livereload: true,
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-slim');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'sass', 'slim', 'cssmin', 'newer:uglify:dist', 'newer:imagemin:dist', 'newer:concat', 'watch']);
};