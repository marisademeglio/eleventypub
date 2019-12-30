module.exports = {
  makeTocItemsForPage: function(page) {
    return `<li><a href="${page.data.EPUBRoot}${page.data.page.url}index.xhtml">${page.data.title}}</a></li>`;
  }
};
