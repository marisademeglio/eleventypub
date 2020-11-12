const fs = require("fs-extra");
const sanitize = require("sanitize-filename");

// rename the generic epub.epub output to <title>.epub
(async () => {
    try {
        let file = await fs.readFile('./src/_data/metadata.json');
        const metadata = JSON.parse(file.toString());
        if (fs.existsSync('./build/epub.epub')) {
            if (metadata.hasOwnProperty('dc') && metadata.dc.hasOwnProperty('title')) {
                let newFilename = `./build/${sanitize(metadata.dc.title)}.epub`;
                await fs.rename('./build/epub.epub', newFilename);
                console.log("File saved as " + newFilename);
            }
            else {
                console.log("Could not rename epub.epub; title metadata not found.");
            }
        }
    }
    catch(err) {
        console.log(err);
    }
})();