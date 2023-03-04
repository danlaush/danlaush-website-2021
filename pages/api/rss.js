export default function handler(req, res) {
  if (!res) {
    return;
  }
  // fetch your RSS data from somewhere here
  // const blogPosts = getRssXml(fetchMyPosts());
  res.setHeader("Content-Type", "text/xml");
  res.write('<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">\
  <channel>\
      <title><![CDATA[Dan Laush]]></title>\
      <description><![CDATA[Dan Laush]]></description>\
      <link>https://danlaush.biz</link>\
      <generator>RSS for Node</generator>\
      <lastBuildDate>Sat, 04 Mar 2023 11:37:28 GMT</lastBuildDate>\
      <atom:link href="https://danlaush.biz/feed.xml" rel="self" type="application/rss+xml"/>\
  </channel>\
</rss>');
  res.end();
}