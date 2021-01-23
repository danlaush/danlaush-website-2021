import Head from "next/head";
import { getProject, getAllProjects } from "../../lib/api";
import Layout from "../../components/layout";
import Container from "../../components/container";
import projectStyles from "./project.module.css";

const Project = ({ title, description, html }) => {
  return (
    <Layout title={title} breadcrumb>
      <Container>
        <Head title={`${title}`} htmlAttributes={{ lang: "en" }} />
        {description && (
          <p className={projectStyles.description}>{description}</p>
        )}
      </Container>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const getStaticProps = async ({ params: { id } }) => {
  const project = await getProject(id);
  return {
    props: {
      ...project,
    },
  };
};

export const getStaticPaths = async () => {
  const projects = await getAllProjects();
  const paths = projects.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Project;
