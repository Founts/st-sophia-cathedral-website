module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        // 2. Package configuration for files goes here.
        sass: {
            dist: {         // Target
                options: {  // Target options
                    style: 'expanded'
                },
                files: {    // Dictionary of files
                    src: 'source/css/style.scss',
                    dest: 'source/css/style.css'
                }
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
        cssmin: {
            dist: {
                src: 'source/css/style.css',
                dest: 'source/css/style.min.css'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: 'source/js/main.js',
                dest: 'source/js/prod.js'
            }
        },
        uglify: {
            dist: {
                src: 'source/js/prod.js',
                dest: 'source/js/prod.min.js'
            }
        },
        copy: {
            // NOTE PatternLab copies the files it needs to the public directory when generated
            dist_css: {
                files: [
                    { src:"source/css/style.css", dest:"dist/css/style.css" },
                    { src:"source/css/style.min.css", dest:"dist/css/style.min.css" },
                ]
            },
            wp_css: {
                files: [
                    { src:"dist/css/style.css", dest:"/Users/jasonfounts/repos/saint-sophia-wp/style.css" },
                    { src:"dist/css/style.min.css", dest:"/Users/jasonfounts/repos/saint-sophia-wp/style.min.css" },
                ]
            },
            dist_images: {
                files: [
                    { expand: true, cwd: 'dist/', src:"images/*", dest:"public/" }
                ]
            },
            wp_images: {
                files: [
                    { expand: true, cwd: 'dist/', src:"images/*", dest:"/Users/jasonfounts/repos/saint-sophia-wp/" }
                ]
            },
            dist_js: {
                files: [
                    { expand: true, cwd:"source/", src:"js/*", dest:"dist/" }
                ]
            },
            wp_js: {
                files: [
                    { expand: true, cwd:"dist/", src:"js/*", dest:"/Users/jasonfounts/repos/saint-sophia-wp/" }
                ]
            },
            php: {
                files: [
                    { expand: true, cwd: "/Users/jasonfounts/repos/saint-sophia-wp/", src: ["*", "**/*", "!.git", "!.DS_Store"], dest: "/Users/jasonfounts/sites/stsophia.dev/wp-content/themes/saint-sophia/" }
                ]
            },
            //NOT USED YET. EXPLORING WATCH + RSYNC SEPARATE GRUNT TASK RUNNER PROCESS
            wp_themetodev: {
                files: [
                    { expand: true, cwd: "/Users/jasonfounts/repos/saint-sophia-wp/", src: ["*", "**/*", "!.git", "!.DS_Store"], dest: "/Users/jasonfounts/sites/stsophia.dev/wp-content/themes/saint-sophia/" }
                ]
            }
        },
        shell: {
            patternlab: {
                command: "php core/builder.php -g"
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'source/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
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
                tasks: ['sass', 'autoprefixer', 'cssmin', 'copy:wp_css', 'copy:wp_images', 'copy:dist_css', 'copy:php', 'shell:patternlab']
            },
            js: {
                files: ['source/js/*.js'],
                tasks: ['concat', 'uglify', 'shell:patternlab', 'copy:dist_js', 'copy:wp_js', 'copy:php']
            },
            php: {
                files: ['/Users/jasonfounts/repos/saint-sophia-wp/**/*.php'],
                tasks: ['copy:php']
            },
            images: {
                files: ['source/images/**'],
                tasks: ['imagemin', 'copy:dist_images', 'copy:wp_images']
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
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
    grunt.registerTask('dist', ['connect', 'watch']);
    grunt.registerTask('images', ['imagemin']);
};