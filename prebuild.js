const path = require('path');
const fs = require('fs');
const recursive = require("recursive-readdir");
const dir = require('node-dir');
const del = require('del');

const RESOURCES_DIR = __dirname + "/src/resources";
const REL_TO = __dirname + "/src/";
const SAVE_TO = __dirname + "/src/_data/resources.json";
const BUILD_DIR = __dirname + "/build";


let data = dir.files(RESOURCES_DIR, {sync: true})
  .filter(file => path.basename(file) != ".DS_Store")
  .map(file => file.replace(REL_TO, ''));

(async () => {
    const deletedPaths = await del([BUILD_DIR, SAVE_TO]);
    fs.writeFileSync(SAVE_TO, JSON.stringify(data))
})();
