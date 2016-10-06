module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    project: {
      tmpDir: 'tmp',
      buildDir: 'build',
      translations: 'locale',
      version: +new Date(),
      oneskyId: "14662"         /* onesky provider panel id */
    },

    watch: {
      scripts: {
        files: ['css/*.less', 'css/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      }
    },

    less: {
      options: {
        paths: [ 'css' ],
        compress: {},
        report: 'min'
      },

      app: {
        src: 'css/app.less',
        dest: 'css/app.css'
      }
    },

    uglify: {
      options: {
        compress: {},
        preserveComments: 'some',
        report: 'min'
      },

      project: {
        src:  'src/*.js',
        dest: 'app.js'
      }
    },

    spritesheet: {
      icons: {
        options: {
          outputImage: 'img/icons<%= project.version %>.png',
          outputCss: 'css/icon-mixins.less',
          selector: '.icon',
          useSingleImageSelector: true,

          resolveImageSelector: function (name) {
            return name.replace(/_+/g, '-') + '()';
          },

          resolveGroupSelector: function (name) {
            return name + '()';
          }
        },

        files: {
          '.': 'img/icons/*'
        }
      }
    }
  });

  // Add to your imports.
  grunt.loadNpmTasks('node-spritesheet');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'spritesheet',
    'less',
    'uglify'
  ]);

};
