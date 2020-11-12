const path = require('path');
const fs = require('fs-extra');
const {walk} = require('./utils');

const RESOURCES_DIR = __dirname + "/src/resources";
const REL_TO = __dirname + "/src/";
const SAVE_TO = __dirname + "/src/_data/resources.json";
const BUILD_DIR = __dirname + "/build";

// list all the resources in /resources and save as a json data file
(async () => {
    
    let data = await walk(RESOURCES_DIR);
    data = data.filter(file => path.basename(file) != ".DS_Store")
               .map(file => file.replace(REL_TO, ''));

    await fs.remove(BUILD_DIR);
    await fs.remove(SAVE_TO);
    await fs.writeFile(SAVE_TO, JSON.stringify(data))

})();


    
