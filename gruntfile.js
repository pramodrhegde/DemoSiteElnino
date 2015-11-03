module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass:{
      src:{
        files:{
          'src/css/main.css':'sass/main.scss'
        }
      }
    },
    wiredep:{
      task:{
        src:['index.html']
      }
    },
    watch:{
      scripts:{
        files:['sass/*.scss'],
        tasks:['sass']
      }
    }
  });

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Load the plugin that provides the "wire-dependency" task.
  grunt.loadNpmTasks('grunt-wiredep');

  // Load the plugin that provides the "sass" task.
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['sass']);

};