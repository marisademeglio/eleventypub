const { parallel, src, dest } = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const prettyData = require('gulp-pretty-data');

const epubFolder = 'build/epub/EPUB/**/';

// pretty-print the xml files
function xml() {
    return src(epubFolder + '*.{opf,xhtml}', { base: './' })
        .pipe(prettyData({
          type: 'prettify',
          preserveComments: true,
          extensions: {
            'opf': 'xml',
            'xhtml': 'xml',
          }}))
        .pipe(dest('./'));
}
function css() {
    return src(epubFolder + '*.css', { base: './' })
    .pipe(gulpStylelint({
        reporters: [
            { formatter: 'string', console: true, fix: true }
        ]
    }));

}

exports.default = parallel(xml, css);
exports.xml = xml;
exports.css = css;