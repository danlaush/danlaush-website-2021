const rehypePrism = require('mdx-prism');
const slug = require('rehype-slug')
const toc = require("@jsdevtools/rehype-toc");
const { customizeTOC } = require("./lib/customizeTOC");

const withMDX = require('@next/mdx')({
  options: {
    rehypePlugins: [
      slug,
      [toc, {
        headings: ["h2"],
        customizeTOC,
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
      {
        source: "/feed.xml",
        destination: "/api/rss",
        permanent: true,
      }
    ];
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx']
});
