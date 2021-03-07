import 'highlight.js/styles/github.css';
import formatDate from "../lib/formatDate";
import Project from './project';
import Container from './container';
import styles from './post.module.css';

const Post = ({ title, date, children }) => {
  return (
    <Project
      title={title}
      breadcrumb={{ url: "/posts", text: "Web log"}}
      description={formatDate(date)}
    >
      <Container>
        <div className={styles.post}>{children}</div>
      </Container>
    </Project>
  );
};

export default Post;
