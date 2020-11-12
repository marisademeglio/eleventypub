# eleventypub

Create an EPUB by authoring your pages as simple [markdown](https://www.markdownguide.org/basic-syntax/) files and then letting a script do the rest. 

(Note that you could also use XHTML or templates -- see the [FAQ](#faq).)

This is an [11ty](https://11ty.io) project template, configured to build an [EPUB 3](https://w3c.github.io/publ-epub-revision/epub32/spec/epub-spec.html) fileset. It also validates with [EPUBCheck](https://github.com/w3c/epubcheck) and runs accessibility checks with [Ace](https://daisy.github.io/ace).

## Quickstart
Make sure you have already installed a reasonably recent version of [nodejs](https://nodejs.org). 

Clone this repo and start editing:
```
$ mkdir my-epub-project
$ npx degit marisademeglio/eleventypub
$ cd my-epub-project
$ npm install
```
### Edit your files
All the files you will be editing are in the `src` directory.

#### 1. Create your EPUB's pages as markdown files in `src/pages`.

E.g. `page.md`:
```
---
title: Chapter One
---
# Chapter One

"Laborum culpa mollit id," she thought. "Do eu cillum eu magna? 
Dolor voluptate laborum reprehenderit esse labore occaecat."

Consectetur id ad sit excepteur commodo id pariatur ipsum voluptate 
et do pariatur. Et id nisi enim veniam ea non in dolor. Elit eu 
pariatur magna veniam consectetur sit deserunt excepteur.

"Hey! Non ullamco proident!"
```

#### 2. Edit the metadata in `src/_data/metadata.json`.
```
{
  "dc": {
    "title": "eleventypub-demo",
    "creator": "Marisa DeMeglio"
  },
  "properties": {
    "dcterms:modified": "2019-03-13T00:00:00Z",
    "schema:accessibilityHazard": "none",
    "schema:accessMode": ["textual", "visual"]
  }
}
```

#### 3. Edit the values in `src/_data/pub.json`.

* Specify the cover image `src` and `alt` properties (you can leave `page` as-is)
* List pages in order in `src/pub.json` by listing the [file slugs](https://github.com/simov/slugify) (in their simplest form, these are the markdown filenames w/o  extensions). 

```
{
  "cover": {
    "page": "cover/index.xhtml",
    "src": "resources/images/under-construction.jpg",
    "alt": "Cartoon bear with construction tools"
  },
  "readingOrder": [
    "intro", "chapter1", "end"
  ],
  ...
}
```

### Build your EPUB
In the terminal:

    $ npm run all

The following output is created:

1. `build/epub`: the expanded EPUB fileset
2. `build/<title>.epub`: the EPUB file itself
3. `build/report`: an [Ace](https://daisy.github.io/ace) report about accessibility

You will see any [EPUBCheck](https://github.com/w3c/epubcheck) validation issues in the terminal.

## Advanced

If your page has scripting in it, add `scripted` to the block of front-matter data, e.g. 
```
---
scripted: true
title: Chapter One
---
```

to make sure it gets noted as such in the package document.

If your page template (e.g. `page.njk`) has scripting, you can put the `scripted` property there instead, in the same kind of block, e.g. 

```
---
scripted: true
---
{% extends 'base.njk' %}
...
```

## Conventions

This part assumes you are familiar with [11ty](https://11ty.io). It discusses project structure and options.

You have as much freedom as you have with 11ty to mix and match templates and options. It's up to you to make sure the resulting output passes EPUB 3 validation.

This project uses the following fileset conventions:

### `src/pages`
Chapter files live in this directory.

In the pages-wide configuration file, `pages.json`, it says, among other things:

```
tags: pages
```

Don't change this.

### `src/index.md`
This becomes the package document. Don't touch this file.

### `src/toc.md`
Table of contents. The filename isn't special, just reference the output correctly from `pub.json` and use a TOC template (in this case, `toc.njk`).

### `src/cover.md`
Cover. The filename isn't special, just reference the output correctly from `pub.json`.

### `src/_data`
The data in this directory ends up in the package document.
  - `metadata.json`: as many `dc` terms, `properties`, and `links` as you want. Use arrays for metadata properties that should appear more than once, e.g. 
  ```
  "schema:accessibilityFeature": ["alternativeText", "readingOrder"]
  ```
  will create this in `package.opf`:
  ```
  <meta property="schema:accessibilityFeature">alternativeText</meta>
  <meta property="schema:accessibilityFeature">readingOrder</meta>      
  ```
  - `pub.json`: Says which files are the `toc` and `cover`, describes the cover image, and lists the `readingOrder`

### `src/resources`
This directory is for fonts, CSS, images, etc; basically, anything you want listed in the manifest and copied over.

### `_includes`
This directory is for all the layout templates, which create XHTML, OPF, and navigation documents. You can edit and replace these with your own, using any markup syntax supported by [11ty](https://11ty.io). If you use your own templates, it's up to you to make sure you're producing valid EPUB 3 output.

## Scripts

    $ npm run [something from the list below]

- `all`: build, prettify, validate+save, and check accessibility
- `all-no-stylelint`: same as the above, but without running stylelint on the CSS

You may want to run just a single step of the larger process, for which you can use these commands:

- `build`: create the EPUB fileset in `build/epub`
- `epubcheck`: run EPUBCheck on the output in `build/epub`
- `save`: run EPUBCheck on `build/epub` and if valid, save an EPUB file as `build/<title>.epub`
- `ace`: run the Ace accessibility checker on the files in `build/epub`. The report will be in `build/report`

    
## FAQ

### Can I use other formats for my templates?

Yes absolutely! You can do whatever's possible with [11ty](https://11ty.io), which is a lot.

The templates in this project are nunjucks and markdown. The configuration I use for markdown includes having it [output XHTML](https://github.com/marisademeglio/eleventypub/blob/5af185071780aa650ea79939b671177e1db3591f/.eleventy.js#L22). Then, in the `postbuild` step, all `html` files are [renamed to `xhtml`](https://github.com/marisademeglio/eleventypub/blob/5af185071780aa650ea79939b671177e1db3591f/postbuild.js#L16). Even so, there are surely still ways to produce EPUB-invalid XHTML with this setup.

So, whatever you try, it's up to you to make sure that your output is valid.

### What are the TOC options?

Reference your TOC file from `pub.json`. Use the name of the output file, e.g. `toc/index.html`, not the source `toc.md`.

```
{
  "cover": {
    "page": "cover/index.xhtml",
    "src": "resources/images/under-construction.jpg",
    "alt": "Cartoon bear with construction tools"
  },
  "toc": {
    "page": "toc/index.xhtml"
  },
  "readingOrder": [
    "intro", "chapter1", "end"
  ]
}
```

In this basic example, the TOC is the file generated by [`src/toc.md`](https://github.com/marisademeglio/eleventypub/blob/master/src/toc.md). Because it is set to autogenerate (`auto: true`), the file is intentionally empty after the front matter data. It gets filled in by the automated process, which makes one entry per markdown file in `pages`.

If I wanted to write a TOC manually, I would write something like:

```
---
layout: toc.njk
title: Table of contents
EPUBRoot: ".."
auto: false
---
1. [Introduction]({{EPUBRoot}}/pages/intro/index.html)
1. [Chapter 1]({{EPUBRoot}}/pages/chapter1/index.html)
1. [The end]({{EPUBRoot}}/pages/end/index.html)
```

`auto: true` the TOC will be autogenerated. Each chapter file will get an entry with its title, in a flat hierarchy.

`auto: false`: you provide everything that's going to go between `<nav>` and `</nav>` in your TOC file. It's up to you to make sure these contents are EPUB 3 compliant (e.g. a valid XHTML ordered list).

If you're providing your own TOC, triple-check the file references to make sure the relative path is correct (use `EPUBRoot` to help). Also, make sure you point to `xhtml` files, as that's what they'll be in the end, as a result of our `postbuild` step.

### What are the reading order options?

You can add a `readingOrder` in `pub.json`. It's an array of [file slugs](https://github.com/simov/slugify) of the files in order. If `readingOrder` is not specified, a reading order gets generated automatically in alphabetical order based on what's in `pages/`.

All file slugs in a custom reading order have to be for files in `pages/`.

