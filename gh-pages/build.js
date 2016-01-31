import Metalsmith from 'metalsmith';
import collections from 'metalsmith-collections';
import layouts from 'metalsmith-layouts';
import inPlace from 'metalsmith-in-place';
import markdown from 'metalsmith-markdown';
import permalinks from 'metalsmith-permalinks';
import sass from 'metalsmith-sass';
import htmlMinifier from 'metalsmith-html-minifier';
import prefix from 'metalsmith-prefix';
import date from 'metalsmith-build-date';
import metalsmithPrism from 'metalsmith-prism';

Metalsmith(__dirname)
  .use(collections({
    posts: {
      pattern: 'blog/!(index).md',
      sortBy: 'date',
      reverse: true
    },
    docs: {
      pattern: 'doc/!(index).md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(sass({
    outputDir: 'css'
  }))
  .use(markdown({
    gfm: true,
    langPrefix: 'language-'
  }))
  .use(metalsmithPrism())
  .use(permalinks({
    linksets: [{
       match: { collection: 'posts' },
       pattern: 'blog/:date/:permalink',
    },{
       match: { collection: 'docs' },
       pattern: 'doc/:permalink'
    }]
  }))
  .use(layouts({
    engine: 'liquid',
    directory: 'layouts',
    includeDir: 'layouts/includes'
  }))
  .use(inPlace({
    engine: 'liquid',
    pattern: '**/*.html',
    includeDir: 'layouts/includes'
  }))
  .use(prefix({
      prefix: 'github-comment',
      selector: 'a, img, link, script'
  }))
  .use(htmlMinifier())
  .use(date())
  .build(function () {
    console.log('Cheers!');
  });
