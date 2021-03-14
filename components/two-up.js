import React from 'react'

import styles from './two-up.module.css'

const TwoUp = ({ children, title, subtitle }) => (
  <section className={styles.section}>
    <div className={styles.sectionHeading}>
      <h2>{title}</h2>
      {subtitle}
    </div>
    <div className={styles.sectionContent}>
      {children}
    </div>
  </section>
)

export default TwoUp;
