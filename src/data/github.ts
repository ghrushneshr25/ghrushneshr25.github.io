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
      'Typed Go DI: interface contracts, lazy concurrent singletons, graph validation that fails closed.',
    language: 'Go',
    href: 'https://github.com/ghrushneshr25/nexus',
    stars: 1,
  },
  {
    name: 'chronos-dev',
    description:
      'Job control plane with Postgres authority, Kafka outbox, worker gRPC push, isolated ClickHouse analytics.',
    language: 'Go',
    href: 'https://github.com/ghrushneshr25/chronos-dev',
  },
  {
    name: 'secretmesh',
    description:
      'UDS agent + QUIC mTLS control plane; Raft metadata, NATS events, AES-GCM envelopes in Postgres.',
    language: 'Go',
    href: 'https://github.com/ghrushneshr25/secretmesh',
  },
  {
    name: 'fakemarket',
    description:
      'Exchange kernel: price-time matching, pre-trade risk, fsynced WAL SoT, sharding, authority fencing.',
    language: 'Go',
    href: 'https://github.com/ghrushneshr25/fakemarket',
  },
  {
    name: 'gateflow',
    description:
      'Flash booking: FIFO admission fence, inventory invariant, payment≠confirm, outbox + crash matrix.',
    language: 'Go',
    href: 'https://github.com/ghrushneshr25/gateflow',
  },
]

export const recentLanguages = ['Go', 'Java', 'Python', 'PostgreSQL', 'Kafka', 'TypeScript'] as const
