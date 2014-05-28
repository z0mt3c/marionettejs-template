'use strict';

module.exports = function (grunt) {
    var packageInfo = require('./package.json');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        packageInfo: packageInfo,

        // watch list
        watch: {
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,**/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.js',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.hbs',
                    '{.tmp,<%= yeoman.app %>}/templates/{,**/}*.hbs',
                    '<%= yeoman.app %>/images/{,**/}*.{png,jpg,jpeg,gif,webp}',
                    'test/spec/{,**/}*.js'
                ],
                //tasks: ['exec'],
                options: {
                    livereload: true
                }
            },
            express: {
                files: ['server/{,**/}*.{js,json}'],
                tasks: ['express:dev'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            },
            handlebars: {
                files: [
                    '<%= yeoman.app %>/scripts/{,**/}*.hbs'
                ],
                tasks: ['handlebars'],
                options: {
                    livereload: true
                }
            },
            nothing: {
                files: ['.foobar'],
                tasks: ['build', 'express:prod']
            }
        },

        // testing server
        connect: {
            testserver: {
                options: {
                    port: 1234,
                    base: '.'
                }
            }
        },

        rev: {
            options: {
                algorithm: 'sha1',
                length: 4
            },
            assets: {
                files: [
                    {
                        src: ['<%= yeoman.dist %>/**/*.{js,css}']
                    }
                ]
            }
        },

        // express app
        express: {
            options: {
                // Override defaults here
                port: '9000'
            },
            dev: {
                options: {
                    'node_env': 'development',
                    script: 'server/app.js'
                }
            },
            prod: {
                options: {
                    'node_env': 'production',
                    script: 'server/app.js'
                }
            },
            test: {
                options: {
                    'node_env': 'test',
                    script: 'server/app.js'
                }
            }
        },


        // open app and test page
        open: {
            server: {
                path: 'http://localhost:8000'
            }
        },

        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },

        // linting
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: [
                    '<%= yeoman.app %>/scripts/vendor/*',
                ]
            },
            app: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,**/}*.js',
                'app-test/{,*/}*.js'
            ],
            server: [
                'Gruntfile.js',
                '<%= yeoman.app %>/server/{,**/}*.js',
                'server-test/{,*/}*.js'
            ]
        },

        // compass
        compass: {
                options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: 'app/bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    almond: true,
                    baseUrl: '<%= yeoman.app %>/scripts',
                    mainConfigFile: '<%= yeoman.app %>/scripts/init.js',
                    out: '<%= yeoman.dist %>/scripts/main.js',
                    optimize: 'uglify2',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    findNestedDependencies: true,
                    paths: {
                        'templates': '../../app/scripts/templates'
                    },
                    replaceRequireScript: [
                        {
                            files: ['<%= yeoman.dist %>/index.html'],
                            module: 'main',
                            modulePath: '/scripts/main'
                        }
                    ],
                    pragmasOnSave: {
                        //removes Handlebars.Parser code (used to compile template strings) set
                        //it to `false` if you need to parse template strings even after build
                        excludeHbsParser: true,
                        // kills the entire plugin set once it's built.
                        excludeHbs: true,
                        // removes i18n precompiler, handlebars and json2
                        excludeAfterBuild: true
                    },
                    done: function (done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (duplicates.length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            grunt.log.warn(duplicates);
                            done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        }

                        done();
                    }
                }
            }
        },

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        usemin: {
            html: ['<%= yeoman.dist %>/{,**/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,**/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= yeoman.dist %>/images/'
                    }
                ]
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,**/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     //https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: '*.html',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'styles/fonts/*.*',
                            'images/{,**/}*.{webp,gif}',
                            'bower_components/requirejs/require.js'
                        ]
                    }
                ]
            }
        },

        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },

        // handlebars
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/{,**/}templates/*.hbs', '<%= yeoman.app %>/scripts/{,**/}template/*.hbs']
                }
            }
        },

        compress: {
            main: {
                options: {
                    archive: 'out/<%= packageInfo.name %>-<%= packageInfo.version %>.tar.gz',
                    mode: 'tgz'
                },
                src: [
                    'dist/**/*',
                    'server/**/*',
                    'package.json'
                ]
            }
        },

        mochaTest: {
            app: {
                options: {
                    reporter: 'spec',
                    require: 'server-test/blanketHelper'
                },
                src: ['server-test/**/*.js']
            },
            appCoverage: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: './out/coverage.html'
                },
                src: ['server-test/**/*.js']
            }
        },

        nodemon: {
            development: {
                script: 'standalone-server/server.js',
                options: {
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        NODE_ENV: 'development',
                        PORT: 8000
                    },
                    cwd: __dirname,
                    watch: ['plugin', 'standalone-server'],
                    ignore: ['node_modules/**'],
                    ext: 'js',
                    delay: 1000,
                    legacyWatch: true
                }
            },
            production: {
                script: 'standalone-server/server.js',
                options: {
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    env: {
                        NODE_ENV: 'production',
                        PORT: 8000
                    },
                    cwd: __dirname,
                    watch: ['plugin', 'standalone-server'],
                    ignore: ['node_modules/**'],
                    ext: 'js',
                    delay: 1000,
                    legacyWatch: true
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    // starts express server with live testing via testserver
    grunt.registerTask('default', function (target) {

        // what is this??
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.option('force', true);

        grunt.task.run([
            'clean:server',
            'compass:server',
            'connect:testserver',
            'nodemon:development',
            //'exec',
            //'open',
            'watch'
        ]);
    });

    // todo fix these
    grunt.registerTask('test', [
        //'clean:server',
        //'createDefaultTemplate',
        //'handlebars',
        //'compass',
        //'connect:testserver',
        //'exec:mocha'
        'test:server'
    ]);

    grunt.registerTask('test:server', [
        'mochaTest'
    ]);

    grunt.registerTask('build', [
        'clean',
        'createDefaultTemplate',
        'handlebars',
        'compass:dist',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'requirejs',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('prod', [
        'build',
        'nodemon:production'
    ]);

    grunt.registerTask('dist', [
        'build',
        'compress'
    ]);
};
