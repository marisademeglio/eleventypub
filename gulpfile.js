const gulp = require('gulp');
var prettyData = require('gulp-pretty-data');

// pretty-print the xml files
gulp.task('pretty', (done) => {
  gulp.src('build/epub/EPUB/**/*.{opf,xhtml}', {base: './'})
    .pipe(prettyData({
      type: 'prettify',
      preserveComments: true,
      extensions: {
        'opf': 'xml',
        'xhtml': 'xml',
      }}))
    .pipe(gulp.dest('./'));
  done();
});
