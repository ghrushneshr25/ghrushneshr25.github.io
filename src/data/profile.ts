export const profile = {
  name: 'Ghrushnesh Rathod',
  firstName: 'Ghrushnesh',
  lastName: 'Rathod',
  handle: 'ghrushneshr25',
  role: 'Senior Software Engineer',
  years: '4+',
  location: 'Pune / Mumbai, India',
  headline: 'I build backend systems that stay quiet when traffic isn’t.',
  thesis:
    'Distributed infrastructure, multi-tenant platforms, and the failure paths nobody wants to debug at 2am.',
  email: 'ghrushneshr25@gmail.com',
  github: 'https://github.com/ghrushneshr25',
  linkedin: 'https://www.linkedin.com/in/ghrushnesh-rathod',
  education: {
    school: 'University of Mumbai',
    degree: 'B.E. Computer Engineering',
    period: '2018 — 2022',
    detail: 'GPA 9.2 / 10',
  },
} as const

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const

export const systemStatus = [
  { key: 'backend', label: 'backend', state: 'ONLINE' },
  { key: 'distributed', label: 'distributed', state: 'ONLINE' },
  { key: 'cloud', label: 'cloud', state: 'ONLINE' },
  { key: 'iam', label: 'iam', state: 'ONLINE' },
  { key: 'ai', label: 'ai / llm', state: 'EXPLORING' },
] as const

export const currently = {
  building: [
    'Distributed systems',
    'Data pipeline platforms',
    'Cloud infrastructure',
    'AI / LLM tooling',
  ],
  learning: ['Machine learning', 'Deep learning', 'AI systems'],
  exploring: [
    'Developer tooling',
    'Agentic coding',
    'LLM infrastructure',
    'MCP servers',
  ],
} as const
