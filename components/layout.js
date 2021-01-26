import React from 'react'
import Head from 'next/head'
import PageHeader from './page-header';
import PageFooter from './page-footer'

const Layout = ({ children, title, description, media, link, breadcrumb, htmlTitle }) => (
  <>
    <Head>
      <title>{htmlTitle || title} | Dan Laush</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="preload" href="/fonts/IBMPlexMono-Light-Latin1.woff2" as="font" />
      <link rel="preload" href="/fonts/IBMPlexSans-Regular-Latin1.woff2" as="font" />
      <link rel="preload" href="/fonts/IBMPlexSans-Medium-Latin1.woff2" as="font" />
      <link rel="preload" href="/fonts/IBMPlexSans-SemiBold-Latin1.woff2" as="font" /> */}
      {description && <meta property="og:description" content={description} />}
      {media && <meta property="og:image" content={`https://danlaush.biz${media}`} />}
    </Head>
    <PageHeader title={title} link={link} breadcrumb={breadcrumb} />
    {children}
    <PageFooter />
  </>
)

export default Layout;
