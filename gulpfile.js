(function () {
  'use strict';

  var gulp = require('gulp'),
      nodemon = require('gulp-nodemon'),
      jshint = require('gulp-jshint');

  gulp.task('lint', function () {
    gulp.src('./**/*.js')
        .pipe(jshint());
  });

  gulp.task('default', function () {
    nodemon({
      script: 'server.js',
      ext: 'js',
      env: {
          PORT: 8000
      },
      ignore: ['./node_modules/**']
    })
    .on('restart', function () {
      console.log('watering the money tree...');
    });
  });
})();