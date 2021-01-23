import fs from 'fs'
import { join } from 'path'
import markdownToHtml from './markdownToHtml';

const rolesDirectory = join(process.cwd(), 'data/roles')

async function getRoles() {
  const roles = await import('../data/roles/index.json').then(m => m.default);
  const rolesWithDescription = roles.map(async (role) => {
    const fullPath = join(rolesDirectory, `${role.id}.md`)
    const skillsLearnedRaw = await fs.readFileSync(fullPath, 'utf8')
    const skillsLearned = await markdownToHtml(skillsLearnedRaw);
    return {
      ...role,
      skillsLearned
    }
  })
  return Promise.all(rolesWithDescription);
}

export {
  getRoles
};