const path = require('path');
const fs = require('fs-extra');
const { walk } = require('./utils');

(async () => {
    const EPUB_DIR = __dirname + "/build/epub";

    // create some boilerplate EPUB stuff
    if (!fs.existsSync(EPUB_DIR + "/META-INF")) {
        await fs.mkdir(EPUB_DIR + "/META-INF");
    }
    await fs.copyFile(__dirname + "/extra/mimetype", EPUB_DIR + "/mimetype");
    await fs.copyFile(__dirname + "/extra/container.xml", EPUB_DIR + "/META-INF/container.xml");
    // rename eleventy's index.html output to package.opf
    await fs.rename(EPUB_DIR + "/EPUB/index.html", EPUB_DIR + "/EPUB/package.opf");

    let files = await walk(EPUB_DIR + "/EPUB");
    // rename all the html files to xhtml
    for (file of files) {
        if (path.extname(file) == ".html") {
            await fs.rename(
                file,
                file.replace(".html", ".xhtml")
            );
        }
    }
})();
