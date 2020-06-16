const path = require('path');
const fs = require('fs');
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
    // delete the build target directory and the resources list
    await del([BUILD_DIR, SAVE_TO]);
    // create a new resources list
    fs.writeFileSync(SAVE_TO, JSON.stringify(data))
})();
