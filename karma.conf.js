// Karma configuration
// Generated on Tue Dec 01 2015 23:29:38 GMT+0200 (EET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'public/libs/jquery/dist/jquery.min.js',
        'public/libs/bootstrap/dist/js/bootstrap.min.js',
        'public/libs/angular/angular.min.js',
        'public/libs/angular-mocks/angular-mocks.js',
        'public/libs/angular-ui-router/release/angular-ui-router.min.js',
        'public/libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/libs/Chart.js/Chart.min.js',
        'public/libs/angular-chart.js/dist/angular-chart.min.js',
        'public/libs/angular-cookies/angular-cookies.min.js',
        'public/js/app.js',
        'public/js/services/*.js',
        'public/js/modules/app.*.js',
        'public/tests/*.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

  });
};
