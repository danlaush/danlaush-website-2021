import { parseISO, getYear, compareDesc } from "date-fns";
import Container from "../../components/container";
import Layout from "../../components/layout";
import TwoUp from "../../components/two-up";
import formatDate from "../../lib/formatDate";
import { listPosts } from "../../lib/api";

const PostsIndex = ({ posts }) => {
  return (
    <Layout title="Web log" breadcrumb>
      <Container>
        {Object.keys(posts)
          .sort()
          .reverse()
          .map((year) => (
            <TwoUp title={year} key={year}>
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
  const posts = organizePostsByYear(postsList);
  return {
    props: { posts },
  };
}

const sortPostsByYear = (postA, postB) =>
  compareDesc(new Date(postA.date), new Date(postB.date));

/**
 * {
 *   [year]: [
 *     { ...post }
 *   ]
 * }
 */
function organizePostsByYear(postsList) {
  return postsList.reduce((accumulator, post) => {
    const year = getYear(parseISO(post.date));
    accumulator[year] = accumulator[year] || [];
    accumulator[year].push(post);
    accumulator[year] = accumulator[year].sort(sortPostsByYear);
    return accumulator;
  }, {});
}

export default PostsIndex;
