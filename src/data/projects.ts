export type ArchitectureNode = {
  id: string
  label: string
  detail?: string
}

export type Project = {
  id: string
  number: string
  name: string
  tagline: string
  what: string
  why: string
  how: string
  stack: string[]
  href?: string
  featured?: boolean
  architecture?: ArchitectureNode[]
}

export const projects: Project[] = [
  {
    id: 'nexus',
    number: '01',
    name: 'Nexus',
    tagline: 'Interface-first dependency injection for Go.',
    what: 'A lightweight service registry that resolves constructors lazily into thread-safe singletons.',
    why: 'Most Go DI either hides field injection or couples callers to concrete types. Nexus keeps contracts typed and implementations private.',
    how: 'Constructor injection, named runtimes, ordered groups, graph validation without invoking constructors, and concurrent-safe singleton caching. Circular dependencies fail closed.',
    stack: ['Go', 'Generics', 'Concurrency'],
    href: 'https://github.com/ghrushneshr25/nexus',
    featured: true,
    architecture: [
      { id: 'declare', label: 'Declare', detail: 'init() constructors' },
      { id: 'registry', label: 'Registry', detail: 'typed contracts' },
      { id: 'validate', label: 'Validate', detail: 'graph only' },
      { id: 'resolve', label: 'Resolve', detail: 'lazy, once' },
      { id: 'singleton', label: 'Singleton', detail: 'cached instance' },
    ],
  },
  {
    id: 'chronos',
    number: '02',
    name: 'Chronos',
    tagline: 'Distributed job scheduling and analytics in Go.',
    what: 'A production-oriented control plane for asynchronous work: submit jobs, schedule them (immediate, delayed, one-time, cron), execute across a worker fleet, recover from failures, and stream every lifecycle event into a Kafka → ClickHouse analytics plane.',
    why: 'Background goroutines lose work on restart, have no central schedule, weak retries, and no historical visibility. Chronos keeps operational state durable in PostgreSQL and isolates analytics so jobs keep running when ClickHouse is down.',
    how: 'API and scheduler persist jobs and outbox events in Postgres, dispatch via a pluggable queue (Kafka or memory), and push work to workers over gRPC with heartbeats, retries, timeouts, and cancel. An outbox publisher feeds Kafka; an analytics consumer lands events in ClickHouse for throughput, latency percentiles, capacity, and anomalies. At-least-once delivery, idempotency keys, and plane separation are explicit design choices. Wired with Nexus.',
    stack: ['Go', 'PostgreSQL', 'Kafka', 'ClickHouse', 'gRPC', 'Nexus'],
    href: 'https://github.com/ghrushneshr25/chronos-dev',
    architecture: [
      { id: 'api', label: 'API', detail: 'jobs + analytics' },
      { id: 'scheduler', label: 'Scheduler', detail: 'assign + recover' },
      { id: 'queue', label: 'Queue', detail: 'Kafka / memory' },
      { id: 'workers', label: 'Workers', detail: 'gRPC push' },
      { id: 'outbox', label: 'Outbox', detail: '→ Kafka' },
      { id: 'clickhouse', label: 'ClickHouse', detail: 'OLAP plane' },
    ],
  },
]
