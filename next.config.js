const rehypePrism = require('mdx-prism');
const slug = require('rehype-slug')
const toc = require("@jsdevtools/rehype-toc");

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
    ],
    rehypePlugins: [
      slug,
      [toc, {
        headings: ["h2"],
        customizeTOC: function(tree) {
          console.log('CUSTOMIZE TOC', tree);
          tree.tagName = "TableOfContents";
          return tree;
        }
      }],
      rehypePrism,
    ]
  }
})

module.exports = withMDX({
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/",
        permanent: true,
      },
    ];
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
});
