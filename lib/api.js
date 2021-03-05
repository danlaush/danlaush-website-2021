import fs from "fs";
import { join, parse } from "path";
import markdownToHtml from "./markdownToHtml";
import matter from "gray-matter";

const dataDir = join(process.cwd(), "data/");
const rolesDirectory = join(dataDir, "roles");
const postsDir = join(dataDir, "posts");
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

async function listPosts() {
  const posts = await getAllPosts();
  const postsList = posts.map(({ title, date, slug }) => ({
    title,
    date,
    slug,
  }));
  return postsList;
}

async function getAllPosts() {
  const postFiles = await fs.readdirSync(postsDir);
  const posts = await Promise.all(postFiles.map(getPost));
  return posts;
}

async function getKeyProjects() {
  const projects = await import(`../data/projects/keyProjects.json`).then(
    (m) => m.default
  );
  return projects;
}

function getPost(fileName) {
  const fullFilePath = join(postsDir, fileName);
  const file = fs.promises
    .readFile(fullFilePath, "utf-8")
    .then(matter)
    .then(({content, data}) => ({
      content,
      ...data,
      slug: stripExtension(fileName),
    }));
  return file;
}

function getPostBySlug(slug) {
  return getPost(`${slug}.md`)
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

export {
  getRoles,
  getAllProjects,
  getKeyProjects,
  getProject,
  listPosts,
  getAllPosts,
  getPostBySlug,
  stripExtension,
};
