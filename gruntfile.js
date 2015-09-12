module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // 2. Package configuration for files goes here.        
        //2-1. Image min would go here if it worked on windows and/or 32bit windows
        sass: {
            dist: {         // Target
                options: {  // Target options
                    style: 'expanded'
                },
                files: {    // Dictionary of files
                    'source/css/style.css': 'source/css/style.scss',    // 'destination': 'source'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'source/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/images'
                }]
            }
        },
        autoprefixer: {
            options: {
                cascade: 'true'
            },
            dist: {
                src: 'source/css/style.css',
                dest: 'source/css/style.css'
            }            
        },
        copy: {
          main: {
            files: [
              { src:"source/css/style.css", dest:"/Users/jasonfounts/sites/stsophia.dev/wp-content/themes/saint-sophia/css/style.css" },
              { expand: true, cwd: 'public/', src:"images/*", dest:"/Users/jasonfounts/sites/stsophia.dev/wp-content/themes/saint-sophia/" }
            ]
          }
        },
        watch: {
            options: {
                livereload: true,
            },
            html: {
                files: ['source/_patterns/**/*.mustache', 'source/_patterns/**/*.json', 'source/_data/*.json'],
                tasks: ['shell:patternlab'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['source/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'copy', 'shell:patternlab']
            },
            js: {
                files: ['source/js/*.js'],
                tasks: ['shell:patternlab']
            }
        },        
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    livereload: true,
                    // keepalive: true
                }
            }
        },
        shell: {
            patternlab: {
                command: "php core/builder.php -g"
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'autoprefixer', 'copy', 'shell:patternlab']);
    grunt.registerTask('dev', ['connect', 'watch']);
    grunt.registerTask('images', ['imagemin']);
};