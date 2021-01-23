import React from 'react'
import TwoUp from './two-up'
import styles from './page-footer.module.css'
import Container from './container'

export default ({ children, hasSidebar }) => (
  <footer>
    <Container>
      <TwoUp title="Get in touch">
        <p>
          <a className="link" href="mailto:dan.laush@gmail.com">dan.laush@gmail.com</a>
        </p>
        <p>
          <a className="link" href="https://twitter.com/danlaush">@danlaush</a>
        </p>
        <p>
          <a className="link" href="https://github.com/danlaush">Github</a>
        </p>
      </TwoUp>
    </Container>
  </footer>
)
