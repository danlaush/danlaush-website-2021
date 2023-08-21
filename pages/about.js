import React from "react";
import Layout from "../components/layout";
import Container from "../components/container";
import TwoUp from "../components/two-up";

const AboutPage = () => (
  <Layout title="About" breadcrumb>
    <Container>
      <TwoUp title="In brief">
        <p>I’m a skilled <strong>frontend developer</strong> with 15 years of delivering exceptional <strong>user experiences</strong> and <strong>leading high-performing teams</strong>.</p>
        <p>I enjoy enabling storytelling at scale, using Content Management Systems to help people of all technical skill levels create compelling narratives online. I build websites with React/Next.js (<a href="https://wise.com/">example</a>), Vue/Nuxt (<a href="https://www.worksafe.vic.gov.au/">example</a>), and many other frontend systems over the years. I’m familiar with CMSes like WordPress and Drupal (both headless and traditional), and for the last few years have led development of a custom in-house CMS for tens of thousands of complex landing pages on wise.com.</p>
        <p>What sets me apart in a team is my ability to communicate about technology to all types of stakeholders. I’m looking to <strong>transition back to an individual contributor role</strong> to leverage my technical expertise and collaborate with designers, product owners, and business leadership.</p>
      </TwoUp>
    </Container>
  </Layout>
);

export default AboutPage;
