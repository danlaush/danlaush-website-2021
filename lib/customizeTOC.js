const headings = [
  'Give the people what they want, nothing more.', // exploring-dynamic-imports
  'A real-world task in the interview', // dribbble-as-interview,
  'Basic definition', // front-end-currying
  'Random Hacks of Kindness', // rhok-melbourne
  'TL;DR', // a-webfont-bug
]

function showToC(tree) {
  const ol = tree.children[0];
  if(!ol) return false;
  const li = ol.children[0];
  if(!li) return false;
  const a = li.children[0];
  if(!a) return false;
  const textNode = a.children[0];
  if(!textNode) return false;
  return headings.includes(textNode.value);
}

// Compatible with @jsdevtools/rehype-toc.
// This is dumb but the easiest way I could
// toggle the table of contents on/off per
// blog post is to use the customise hook which
// provides access to the current page's headings.
// This config has the first heading of each
// blog post which should show the ToC.
function customizeTOC(tree) {
  if(!showToC(tree)) return null;
  return {
    ...tree,
    tagName: "TableOfContents",
  }
}

module.exports = {
  customizeTOC,
}