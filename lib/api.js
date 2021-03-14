import fs from "fs";
import { join, parse } from "path";
import { parseISO, compareDesc } from "date-fns";
import markdownToHtml from "./markdownToHtml";

const dataDir = join(process.cwd(), "data/");
const rolesDirectory = join(dataDir, "roles");
const keyProjectsFileName = "keyProjects.json";

const stripExtension = (filename) => parse(filename).name;

async function getRoles() {
  const roles = await import("../data/roles/index.json").then((m) => m.default);
  const rolesWithDescription = roles.map(async (role) => {
    const fullPath = join(rolesDirectory, `${role.id}.md`);
    const skillsLearnedRaw = await fs.readFileSync(fullPath, "utf8");
    const skillsLearned = await markdownToHtml(skillsLearnedRaw);
    return {
      ...role,
      skillsLearned,
    };
  });
  return Promise.all(rolesWithDescription);
}

async function getAllProjects() {
  const projectsDir = join(dataDir, "projects");
  const projects = await fs
    .readdirSync(projectsDir)
    .filter((file) => file !== keyProjectsFileName)
    .map(stripExtension);
  return projects;
}


async function getKeyProjects() {
  const projects = await import(`../data/projects/keyProjects.json`).then(
    (m) => m.default
  );
  return projects;
}

async function getProject(id) {
  const projectFile = join(dataDir, "projects", `${id}.mdx`);
  const file = await import(`../data/projects/${id}.mdx`).then(
    (m) => m.default
  );
  // fs.readFileSync(projectFile, "utf8");
  console.log("file", file);
  // const { data, content } = matter(file);
  // const html = await markdownToHtml(content);
  return {
    Project: file,
  };
}

async function listPosts() {
  const postsDir = join(process.cwd(), "pages/posts");
  const postFiles = await fs.readdirSync(postsDir);
  const postsMdx = await Promise.all(
    postFiles
      // Posts are all the .mdx files in this folder
      .filter((p) => p.endsWith("mdx"))
      .map(getPostData)
  );
  return postsMdx;
}

async function listFeaturedPosts() {
  const posts = await listPosts(); 
  return posts.filter(p => p.featured).sort(sortPostsByDate);
}

function sortPostsByDate(a, b) {
  const dateA = parseISO(a.date);
  const dateB = parseISO(b.date);
  return compareDesc(dateA, dateB);
}

async function getPostData(fileName) {
  return import(`../pages/posts/${fileName}`).then(p => ({
    ...p.data,
    slug: stripExtension(fileName)
  }));
}

export {
  getRoles,
  getAllProjects,
  getKeyProjects,
  getProject,
  stripExtension,
  listPosts,
  listFeaturedPosts,
};
