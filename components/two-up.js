import React from 'react'

import styles from './two-up.module.css'

export default ({ children, title, pdf }) => (
  <section className={styles.section}>
    <div className={styles.sectionHeading}>
      <h2>{title}</h2>
      {pdf && <a href="/Laush-resume.pdf">Download PDF</a>}
    </div>
    <div className={styles.sectionContent}>
      {children}
    </div>
  </section>
)
