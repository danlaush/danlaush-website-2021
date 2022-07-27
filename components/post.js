import formatDate from "../lib/formatDate";
import Project from './project';
import Container from './container';
import TableOfContents from './table-of-contents';
import styles from './post.module.css';
// import '../styles/prism.css';

const Post = ({ title, date, children, description, media }) => {
  return (
    <Project
      title={title}
      breadcrumb={{ url: "/posts", text: "Web log"}}
      description={`${formatDate(date)}${description ? `—${description}` : ''}`}
      media={media ? media : undefined}
      typeIsArticle
    >
      <Container>
        <div className={styles.post}>{children}</div>
      </Container>
    </Project>
  );
};

export default Post;
