import React from "react";
import Link from "next/link";
import Head from "next/head";
import { format } from "date-fns";
import Layout from "../components/layout";
import Container from "../components/container";
import TwoUp from "../components/two-up";
import styles from "./index.module.css";
import { getRoles } from "../lib/api";

const formatDate = (date) => {
  if (!date) return null;
  return format(new Date(date), "MMM yyyy");
};

const RootIndex = ({ roles }) => {
  const headerTitle = (
    <>
      Front-end developer.
      <br />I build things for <span>people</span>.
    </>
  );
  const headerLink = {
    url: "/about",
    text: "About me",
  };

  return (
    <Layout htmlTitle="Hello" title={headerTitle} link={headerLink}>
      <Head>
        <meta name="description" content="I build things for people." />
      </Head>
      <Container>
        <TwoUp title="Work">
          <ul className={styles.projectsList}>
            <li>
              <Link href="/projects/our-watch">
                <a className="link">Our Watch</a>
              </Link>
              <p className={styles.projectsListMeta}>
                JavaScript, Vue, WordPress, Static site <span>2019</span>
              </p>
            </li>
            <li>
              <Link href="/projects/worksafe">
                <a className="link">WorkSafe</a>
              </Link>
              <p className={styles.projectsListMeta}>
                JavaScript, Vue, Drupal <span>2018</span>
              </p>
            </li>
            <li>
              <Link href="/projects/side-projects">
                <a className="link">Side projects</a>
              </Link>
              <p className={styles.projectsListMeta}>
                JavaScript <span>2018</span>
              </p>
            </li>
            <li>
              <Link href="/projects/talks">
                <a className="link">Talks</a>
              </Link>
              <p className={styles.projectsListMeta}>Public speaking</p>
            </li>
          </ul>
        </TwoUp>

        <TwoUp title="Resume" pdf>
          {roles.map(
            ({
              id,
              entryTitle,
              url,
              organisation,
              startDate,
              endDate,
              skillsLearned,
            }) => (
              <React.Fragment key={id}>
                <h3>{entryTitle}</h3>
                <p className={styles.roleMeta}>
                  <a className={styles.roleLink} href={url}>
                    {organisation}
                  </a>
                  &nbsp;
                  <span className={styles.roleDuration}>
                    {formatDate(startDate)}—{formatDate(endDate)}
                  </span>
                </p>
                <div
                  className={styles.roleDetails}
                  dangerouslySetInnerHTML={{
                    __html: skillsLearned,
                  }}
                />
              </React.Fragment>
            )
          )}
          <h3>See complete resume</h3>
          <a href="/Laush-resume.pdf">Download full history (PDF)</a>
        </TwoUp>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const roles = await getRoles();
  return {
    props: {
      roles,
    },
  };
};

export default RootIndex;
