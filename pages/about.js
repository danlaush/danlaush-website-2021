import React from "react";
import Layout from "../components/layout";
import Container from "../components/container";
import TwoUp from "../components/two-up";

const AboutPage = () => (
  <Layout title="About" breadcrumb>
    <Container>
      <TwoUp title="Work">
        <h3>I build things for people.</h3>
        <p>
          The end users of my digital tools are my guiding compass and my
          programming skills focus on how to bring them value. I make
          accessible, intuitive, beautiful digital interfaces with HTML5, CSS3,
          JavaScript (client- and server-side), and the occasional bit of PHP.
        </p>
        <h3>I use a variety of modern web tools.</h3>
        <p>
          The past couple years I’ve been using Vue and React to build modern
          front-ends without sacrificing accessibility. Vue with Nuxt has been a
          great toolbox for building server-side rendered pages that hydrate
          into fully-fledged webapps or statically-generated HTML sites.
        </p>
        <p>
          I use CMSes like Drupal and WordPress to bring websites to life. After
          many years with traditional PHP templates, I’ve had great results with
          API-first headless CMSes as a complement to a modern JavaScript
          application.
        </p>
        <h3>I make systems.</h3>
        <p>
          I like to build component libraries, not just page templates. The UI
          elements we build should have utility in a variety of circumstances,
          and fit together well enough to provide value for years to come.
        </p>
      </TwoUp>
      <TwoUp title="Team">
        <h3>I excel in design-led teams.</h3>
        <p>
          I get inspired by a strong design vision and enjoy bringing it to life
          on the web. I love the confidence that comes from decisions based on
          insights from user research.
        </p>
        <p>
          A collaborative back-and-forth between designer and developer allows
          us to maximise the quality of what we make, even when time and budget
          are tight.
        </p>
        <h3>I ask the right questions.</h3>
        <p>
          I once received feedback that I’m always the person who’s willing to
          ask questions, whether I need help on a technical challenge or as a
          way to cut through ambiguity when the project gets messy. I can tell
          when different people have different answers to the same question, and
          by putting it out in the open as a question everyone has a chance to
          share their perspective.
        </p>
      </TwoUp>
    </Container>
  </Layout>
);

export default AboutPage;
