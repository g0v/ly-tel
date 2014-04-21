module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'web/lib/angular/angular.js',
      'web/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'web/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'web/lib/angular/angular-loader.js',
      'web/lib/angular/*.min.js',
      'web/lib/angular/angular-scenario.js',
      'web/js/script.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
