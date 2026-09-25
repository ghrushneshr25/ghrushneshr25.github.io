export type GithubRepo = {
  name: string
  description: string
  language: string
  href: string
  stars?: number
}

export const githubProfile = {
  login: 'ghrushneshr25',
  href: 'https://github.com/ghrushneshr25',
  publicRepos: 42,
  followers: 8,
  location: 'Mumbai',
} as const

export const selectedRepos: GithubRepo[] = [
  {
    name: 'nexus',
    description:
      'Interface-first DI and service registry for Go. Lazy singletons, named services, groups.',
    language: 'Go',
    href: 'https://github.com/ghrushneshr25/nexus',
    stars: 1,
  },
  {
    name: 'chronos-dev',
    description:
      'Distributed job scheduling and analytics: Postgres control plane, Kafka outbox, ClickHouse OLAP.',
    language: 'Go',
    href: 'https://github.com/ghrushneshr25/chronos-dev',
  },
]

export const recentLanguages = ['Go', 'PostgreSQL', 'Kafka', 'TypeScript'] as const
