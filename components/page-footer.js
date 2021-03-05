import React from 'react'
import TwoUp from './two-up'
import Container from './container'

const PageFooter = ({ children, hasSidebar }) => (
  <footer>
    <Container>
      <TwoUp title="Get in touch">
        <p>
          <a className="link" href="mailto:dan.laush@gmail.com">dan.laush@gmail.com</a>
        </p>
        <p>
          <a className="link" href="https://twitter.com/danlaush">Twitter</a>
        </p>
        <p>
          <a className="link" href="https://github.com/danlaush">Github</a>
        </p>
        <p>
          <a className="link" href="https://www.linkedin.com/in/danlaush/">LinkedIn</a>
        </p>
      </TwoUp>
    </Container>
  </footer>
)

export default PageFooter;
