const path = require('path');
const fs = require('fs');
const dir = require('node-dir');

const EPUB_DIR = __dirname + "/build/epub";

if (!fs.existsSync(EPUB_DIR + "/META-INF")) {
  fs.mkdirSync(EPUB_DIR + "/META-INF");
}
fs.copyFileSync(__dirname + "/extra/mimetype", EPUB_DIR + "/mimetype");
fs.copyFileSync(__dirname + "/extra/container.xml", EPUB_DIR + "/META-INF/container.xml");
fs.renameSync(EPUB_DIR + "/EPUB/index.html", EPUB_DIR + "/EPUB/package.opf");

dir.files(EPUB_DIR + "/EPUB", {sync: true}).map(file => {
  if (path.extname(file) == ".html") {
    fs.renameSync(
      file,
      file.replace(".html", ".xhtml")
    );
  }
});
