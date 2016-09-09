'use strict';

module.exports = function (grunt) {

    // Load all grunt plugins
    require('matchdep')
        .filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'styles/main.css': 'styles/main.scss'
                }
            }
        },

        watch: {
            sass: {
                files: 'styles/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        }

    });

    var devTasks = ['sass'];
    var prdTasks = ['sass'];

    grunt.registerTask('default', prdTasks);
    grunt.registerTask('dev', devTasks);
    grunt.registerTask('prd', prdTasks);
};
