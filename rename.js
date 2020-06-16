// rename the generic epub.epub output to <title>.epub

const fs = require("fs");
const sanitize = require("sanitize-filename");

const metadata = JSON.parse(fs.readFileSync('./src/_data/metadata.json').toString());

if (fs.existsSync('./build/epub.epub')) {
    if (metadata.hasOwnProperty('dc') && metadata.dc.hasOwnProperty('title')) {
        let newFilename = `./build/${sanitize(metadata.dc.title)}.epub`;
        fs.renameSync('./build/epub.epub', newFilename);
        console.log("File saved as " + newFilename);
    }
    else {
        console.log("Could not rename epub.epub; title metadata not found.");
    }
}
