import React from 'react'
import Link from 'next/link'
import styles from './page-header.module.css'
import Container from './container'

const PageHeader = ({ title, link, breadcrumb }) => (
  <Container>
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {!!breadcrumb && <p className={styles.breadcrumb}>
        <Link href={breadcrumb.url || "/"}>&larr; {breadcrumb.text || "Home"}</Link>
      </p>}
      <p className={styles.name}>
        <Link href="/" className={styles.nameLink}>Dan Laush</Link>
      </p>
      {link && <p className={styles.link}>
        <Link href={link.url}>{link.text} →</Link>
      </p>}
    </header>
  </Container>
)

export default PageHeader;
