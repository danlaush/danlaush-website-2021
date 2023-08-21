import React from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";
import Container from "../components/container";
import TwoUp from "../components/two-up";
import styles from "./index.module.css";
import { getRoles, listFeaturedPosts } from "../lib/api";
import formatDate from "../lib/formatDate";

const RootIndex = ({ roles, posts }) => {
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
    <Layout htmlTitle="Hello" description="Frontend developer | I build things for people" title={headerTitle} link={headerLink}>
      <Head>
        <meta name="description" content="I build things for people." />
      </Head>
      <Container>

        <TwoUp title="Web Log" subtitle={<><Link href="/posts">View all</Link> | <a href="/api/rss">RSS</a></>}>
          <ul className={styles.projectsList}>
            {posts.map(({title, slug, date}) => (
              <li key={slug}>
                <Link href={`/posts/${slug}`} className="link">
                  {title}
                </Link>
                <p className={styles.projectsListMeta}>
                  {formatDate(date)}
                </p>
              </li>
            ))}
          </ul>
        </TwoUp>

        <TwoUp title="Resume" subtitle={<a href="/Laush-resume.pdf">Download PDF</a>}>
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
        
        <TwoUp title="Work">
          <ul className={styles.projectsList}>
            <li>
              <Link href="/projects/lienzo" className="link">
                TransferWise CMS refresh
              </Link>
              <p className={styles.projectsListMeta}>
                JavaScript, Next.js, React <span>2020</span>
              </p>
            </li>
            <li>
              <Link href="/projects/our-watch" className="link">
                Our Watch
              </Link>
              <p className={styles.projectsListMeta}>
                JavaScript, Vue, WordPress, Static site <span>2019</span>
              </p>
            </li>
            <li>
              <Link href="/projects/worksafe" className="link">
                WorkSafe
              </Link>
              <p className={styles.projectsListMeta}>
                JavaScript, Vue, Drupal <span>2018</span>
              </p>
            </li>
            <li>
              <Link href="/projects/side-projects" className="link">
                Side projects
              </Link>
              <p className={styles.projectsListMeta}>
                JavaScript <span>2018</span>
              </p>
            </li>
            <li>
              <Link href="/projects/talks" className="link">
                Talks
              </Link>
              <p className={styles.projectsListMeta}>Public speaking</p>
            </li>
          </ul>
        </TwoUp>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const roles = await getRoles();
  const posts = await listFeaturedPosts();
  return {
    props: {
      roles,
      posts,
    },
  };
};

export default RootIndex;
