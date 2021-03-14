const rehypePrism = require('mdx-prism');
const slug = require('rehype-slug')
const toc = require("@jsdevtools/rehype-toc");

const headings = [
  'Give the people what they want, nothing more.',
]

// This is dumb but the easiest way I could
// toggle the table of contents on/off per
// blog post is to use the customise hook which
// provides access to the current page's headings.
// This config has the first heading of each
// blog post which should show the ToC.
const showToC = (tree) => {
  try {
    const heading = tree.children[0].children[0].children[0].children[0].value;
    console.log('tree :>> ', );
    return headings.includes(heading);
  } catch(e) {
    console.log(tree)
    console.log(e);
  }
}

const withMDX = require('@next/mdx')({
  options: {
    rehypePlugins: [
      slug,
      [toc, {
        headings: ["h2"],
        customizeTOC: (tree) => {
          if(!showToC(tree)) return null;
          return {
            ...tree,
            tagName: "TableOfContents",
          }
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
