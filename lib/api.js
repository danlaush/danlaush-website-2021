import fs from "fs";
import { join, parse } from "path";
import markdownToHtml from "./markdownToHtml";
import matter from "gray-matter";

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
  const projectFile = join(dataDir, "projects", `${id}.md`);
  const file = await fs.readFileSync(projectFile, "utf8");
  const { data, content } = matter(file);
  const html = await markdownToHtml(content);
  return {
    ...data,
    html,
  };
}

export { getRoles, getAllProjects, getKeyProjects, getProject };
