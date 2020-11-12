const fs = require("fs-extra");
const path = require('path');

// list all files in a directory, incl. subdirs
async function walk (dir) {
    try {
        let items = await fs.readdir(dir);
        let contents = [];
        for (item of items) {
            let itemPath = path.join(dir, item);
            let stats = await fs.stat(itemPath);
            if (stats.isDirectory()) {
                let subcontents = await walk(itemPath);
                contents = contents.concat(subcontents);
            }
            else {
                contents.push(itemPath);
            }
        }
        return contents;
    }
    catch (err) {
        console.log(err);
        return [];
    }
};

module.exports = {
    walk
};