import { g, auth, config } from '@grafbase/sdk';

const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.email().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 20, max: 3000 }),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  projects: g
    .relation(() => Project)
    .list()
    .optional(),
  portfolioUrl: g.url().optional(),
});

const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string().length({ min: 20, max: 3000 }),
  image: g.url(),
  liveSiteUrl: g.url().optional(),
  githubUrl: g.url().optional(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
});

export default config({
  schema: g,
});
