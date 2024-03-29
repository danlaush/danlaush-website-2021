import RSS from 'rss'
import { parseISO, compareDesc } from "date-fns";
import { listPosts } from "../../lib/api";

const siteUrl = 'https://danlaush.biz'

const feed = new RSS({
  title: 'Dan Laush',
  description: 'Personal blog, mostly tech with occasional other thoughts',
  site_url: siteUrl,
  feed_url: `${siteUrl}/api/rss`,
})

export default async function handler(req, res) {
  if (!res) {
    return;
  }
  // fetch your RSS data from somewhere here
  const posts = await listPosts()
  posts.sort(sortPostsByDate)
  posts.forEach(post => {
    const feedItem = {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/posts/${post.slug}`,
      date: post.date,
    }
    if(post.media) {
      feedItem.enclosure = {
        'url'  : `https://danlaush.biz${post.media}`,
      }
    }
    feed.item(feedItem)
  })
  res.setHeader("Content-Type", "text/xml");
  res.write(feed.xml({ indent: true }));
  res.end();
}

function sortPostsByDate(a, b) {
  const dateA = parseISO(a.date);
  const dateB = parseISO(b.date);
  return compareDesc(dateA, dateB);
}