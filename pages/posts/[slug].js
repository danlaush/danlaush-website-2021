import Project from '../../components/project';
import Container from '../../components/container';
import { listPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from '../../lib/markdownToHtml';
import formatDate from "../../lib/formatDate";
import styles from '../../components/post.module.css';
import 'highlight.js/styles/github.css';

const Post = ({ html, title, date }) => {
  return (
    <Project
      title={title}
      breadcrumb={{ url: "/posts", text: "Web log"}}
      description={formatDate(date)}
    >
      <Container>
        <div className={styles.post} dangerouslySetInnerHTML={{__html: html}} />
      </Container>
    </Project>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const { content, ...post} = await getPostBySlug(slug);
  const html = await markdownToHtml(content)
  return {
    props: {
      ...post,
      html
    },
  };
}

export async function getStaticPaths() {
  const posts = await listPosts();
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default Post;
