var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', [
  'build',
  'watch'
]);

gulp.task('build', function () {
  gulp.src([
    'src/app.js'
  ])
    .pipe(babel({
      presets: [
        'es2015',
        'stage-0'
      ]
    }))
    .pipe(gulp.dest('./'))
  ;
});

gulp.task('watch', function () {
  gulp.watch([
    'src/app.js'
  ], function () {
    gulp.run('build');
  });
});
