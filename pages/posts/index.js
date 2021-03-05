import Container from "../../components/container";
import Layout from "../../components/layout";
import TwoUp from "../../components/two-up";
import { listPosts } from "../../lib/api";
import formatDate from "../../lib/formatDate";

const PostsIndex = ({ posts }) => {
  return (
    <Layout title="Web log" breadcrumb>
      <Container>
        <TwoUp title="2021">
          <ul>
            {posts.map(post => (
              <li key={post.slug}><a href={`/posts/${post.slug}`}>{post.title}</a> {formatDate(post.date)}</li>
            ))}
          </ul>
        </TwoUp>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await listPosts();
  return {
    props: { posts },
  };
}

export default PostsIndex;
