// docs: https://www.11ty.io/docs/config/
const path = require('path');
const mime = require('mime');
const nunjucks = require('nunjucks');
const md = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Copy the `img/` directory
  eleventyConfig.addPassthroughCopy("src/resources");

  let nunjucksEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader("src/_includes")
  );

  nunjucksEnv.addFilter('mediaType', function(str) {
    return mime.getType(path.extname(str).slice(1));
  });

  eleventyConfig.setLibrary("njk", nunjucksEnv);

  let markdownIt = require("markdown-it")({
    xhtmlOut: true,
    html: true
  })
  .use(require('markdown-it-imsize'), {autofill: true});

  eleventyConfig.setLibrary("md", markdownIt);

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "build/epub/EPUB"
    }
  };
};
