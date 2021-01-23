import { getProject, getAllProjects } from '../../lib/api'

const Project = ({id, html}) => {
  return (
    <>
      <h1>Project {id}</h1>
      <div dangerouslySetInnerHTML={{__html: html}} />
    </>
  );
};

export async function getStaticProps({ params: { id }}) {
  const html = await getProject(id);
  console.log('html', html)
  return {
    props: {
      id,
      html
    },
  };
}

export async function getStaticPaths() {
  const projects = await getAllProjects()
  const paths = projects.map((id) => ({
    params: { id },
  }))

  return {
    paths,
    fallback: false,
  };
}

export default Project;
