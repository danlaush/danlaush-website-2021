const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
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
