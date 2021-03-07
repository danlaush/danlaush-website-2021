import { parseISO, getYear } from "date-fns";
import Container from "../../components/container";
import Layout from "../../components/layout";
import TwoUp from "../../components/two-up";
import formatDate from "../../lib/formatDate";
import { listPosts } from "../../lib/api";

const PostsIndex = ({ posts }) => {
  return (
    <Layout title="Web log" breadcrumb>
      <Container>
        {Object.keys(posts).sort().reverse().map(year => (
          <TwoUp title={year}>
            <ul>
            {posts[year].map((post) => (
              <li key={post.slug}>
                <a href={`/posts/${post.slug}`}>{post.title}</a>{" "}
                {formatDate(post.date)}
              </li>
            ))}
            </ul>
          </TwoUp>
        ))}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const postsList = await listPosts();
  const posts = sortPostsByYear(postsList);
  return {
    props: { posts },
  };
}


/**
 * {
 *   [year]: [
 *     { ...post }
 *   ]
 * }
 */
function sortPostsByYear(postsList) {
  return postsList.reduce((accumulator, post) => {
    const year = getYear(parseISO(post.date))
    accumulator[year] = accumulator[year] || [];
    accumulator[year].push(post);
    return accumulator;
  }, {})
}

export default PostsIndex;
