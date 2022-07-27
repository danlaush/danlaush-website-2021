import Head from "next/head";
import Layout from "./layout";
import Container from "./container";
import projectStyles from "./project.module.css";

const Project = ({ title, description, media, children, breadcrumb }) => {
  return (
    <Layout
      title={title}
      description={description}
      media={media}
      breadcrumb={breadcrumb || true}
      typeIsArticle
    >
      <Container>
        {description && (
          <p className={projectStyles.description}>{description}</p>
        )}
      </Container>
      {children}
    </Layout>
  );
};

export default Project;
