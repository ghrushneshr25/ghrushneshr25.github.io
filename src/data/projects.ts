export type ArchitectureNode = {
  id: string
  label: string
  detail?: string
}

export type ProjectSpecialty = {
  title: string
  audience: string
  body: string
}

export type Project = {
  id: string
  number: string
  name: string
  tagline: string
  what: string
  why: string
  how: string
  specialty: ProjectSpecialty
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
    what: 'A typed service registry that binds constructors to interface contracts and resolves them lazily into process-wide, concurrent-safe singletons.',
    why: 'Field-injection frameworks hide wiring and leak concrete types into call sites. Nexus keeps the dependency graph explicit, implementations unexported, and startup failure deterministic when the graph is invalid.',
    how: 'Constructor injection with named runtimes and ordered groups. Graph validation walks the type graph without invoking constructors. Resolution is once-per-key under sync.Once semantics; cycles fail closed before any instance is built. Used as the composition root across Chronos and SecretMesh.',
    specialty: {
      title: 'Typed singletons without the mess',
      audience: 'For Go developers',
      body: 'Nexus is the library I wanted on every service: declare constructors once, resolve interface contracts as lazy concurrent-safe singletons, keep implementations private. Built so teams wire apps the same way every time—Validate the graph at startup, fail closed on cycles, no hidden field injection.',
    },
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
    tagline: 'A generic pattern for durable, event-backed async work.',
    what: 'A durable scheduler and worker runtime for asynchronous work: immediate, delayed, one-shot, and cron jobs; fleet assignment over gRPC; failure recovery; and a Kafka → ClickHouse plane for lifecycle analytics that is never on the critical path.',
    why: 'In-process goroutines lose work on restart, lack a single schedule of record, and give operators no historical signal. Chronos separates operational truth (PostgreSQL) from analytical convenience (ClickHouse) so a down OLAP path cannot stall execution.',
    how: 'API and scheduler write jobs and outbox rows in the same Postgres transaction, dispatch through a pluggable queue (Kafka or in-memory), and push assignments to workers with heartbeats, retries, timeouts, and cancel. Outbox publisher drains to Kafka; analytics consumer materializes throughput, latency percentiles, capacity, and anomalies in ClickHouse. Delivery is at-least-once with idempotency keys. Composition root via Nexus.',
    specialty: {
      title: 'Generic event-backed work',
      audience: 'For backend platform patterns',
      body: 'Chronos was my way to nail a reusable shape for event-based systems: durable job state, outbox → Kafka, workers over gRPC, analytics as a separate plane. Not a one-off cron wrapper—a control-plane pattern you can retarget to any async workload while keeping at-least-once delivery and ops/analytics isolation explicit.',
    },
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
  {
    id: 'secretmesh',
    number: '03',
    name: 'SecretMesh',
    tagline: 'Secret delivery built the way SRE teams actually operate fleets.',
    what: 'A four-plane secrets system: workloads speak only to a local agent over UDS; the agent holds a QUIC + TLS 1.3 mTLS session to the control plane for versioned fetch, rotation, revocation, and resync—without long-lived credentials in env, images, or manifests.',
    why: 'Static secret injection forces restarts on rotation, leaves stale values after partition, and often puts cluster credentials inside the app. SecretMesh moves trust to the agent boundary so application code never holds mesh credentials or reaches the control plane network.',
    how: 'Custom framed CBOR on UDS and QUIC. Deny-by-default policy on identity, path, and action. Postgres stores AES-256-GCM envelopes only—no plaintext at rest. Raft replicates path, version, and revocation metadata; NATS fans out rotate/revoke events without secret values. Agent cache is version-monotonic with TTL, RESYNC after disconnect, and subscribe/ACK for live updates. Wired with Nexus.',
    specialty: {
      title: 'Fleet secrets without app restarts',
      audience: 'For SRE / platform teams',
      body: 'SecretMesh is aimed at operators who rotate and revoke across many hosts: apps only talk to a local agent, SREs own the mesh (policy, mTLS, Raft metadata, value-free events). Built so rotation is a control-plane action—not a rollout of new env vars—and partitions heal via version-monotonic RESYNC instead of stale credentials left in pods.',
    },
    stack: ['Go', 'QUIC', 'mTLS', 'Raft', 'NATS', 'PostgreSQL', 'CBOR', 'Nexus'],
    href: 'https://github.com/ghrushneshr25/secretmesh',
    architecture: [
      { id: 'local', label: 'Local', detail: 'App → UDS → Agent' },
      { id: 'wire', label: 'Wire', detail: 'QUIC + mTLS' },
      { id: 'control', label: 'Control', detail: 'policy + discovery' },
      { id: 'meta', label: 'Raft', detail: 'path → version' },
      { id: 'events', label: 'NATS', detail: 'events, no values' },
      { id: 'store', label: 'Postgres', detail: 'AES-GCM only' },
    ],
  },
  {
    id: 'fakemarket',
    number: '04',
    name: 'FakeMarket',
    tagline: 'A finance-shaped product to learn markets, matching, and speed.',
    what: 'An electronic trading stack covering price-time books, pre-trade risk, append-only WAL as source of truth, crash recovery, market data, instrument sharding, and authority fencing under split-brain control.',
    why: 'Matching engines that optimize for happy-path throughput without a journal of record cannot prove post-crash consistency. FakeMarket freezes financial history in a fsynced WAL, rebuilds live state from that journal, and only introduces distribution once single-writer invariants hold under chaos.',
    how: 'Integer money and ticks only—no floats on the authoritative path. LIMIT, MARKET, IOC, FOK with FIFO levels; buying power, reservations, position limits, and price bands gate the book. Length-prefixed WAL with checksums and fail-closed append; startup recover → fold → hot-load books → ready. gRPC trading/query, REST + WebSocket market data (derived, not SoT), multi-worker single-writer shards, WAL prefix replication, consensus fencing, chaos harness, Prometheus/Grafana.',
    specialty: {
      title: 'Markets, speed, and a real ledger',
      audience: 'Finance systems deep-dive',
      body: 'FakeMarket is how I learned exchange internals end-to-end—order books, risk, fills, market data—while measuring hot-path efficiency under benches and pprof. The product constraint that stuck: go fast only after the fsynced WAL is the sole financial truth, single-writer Risk→Match→Journal holds under chaos, then shard for throughput without inventing a second ledger.',
    },
    stack: ['Go', 'gRPC', 'WAL', 'WebSocket', 'Prometheus', 'Grafana'],
    href: 'https://github.com/ghrushneshr25/fakemarket',
    architecture: [
      { id: 'api', label: 'APIs', detail: 'gRPC + REST/WS' },
      { id: 'gate', label: 'Authority', detail: 'fence + shards' },
      { id: 'risk', label: 'Risk', detail: 'limits + bands' },
      { id: 'match', label: 'Match', detail: 'price-time FIFO' },
      { id: 'wal', label: 'WAL', detail: 'financial SoT' },
      { id: 'md', label: 'Market data', detail: 'derived stream' },
    ],
  },
  {
    id: 'gateflow',
    number: '05',
    name: 'Gateflow',
    tagline: 'User-facing booking built to scale under real contention.',
    what: 'A multi-service event booking platform for flash demand: capacity-backed offerings, FIFO admission under a coordination fence, inventory hold/confirm, and checkout where payment success is never sufficient to confirm an order. Buyer (Google) and Admin surfaces on five Go services.',
    why: 'Drop systems fail on three classes of bug: oversell under concurrency, double effects from retries, and treating timeouts as terminal. Gateflow encodes confirmed + reserved ≤ sellable as a Postgres invariant, treats timeout as uncertain and reconciles with stable operation IDs, and keeps Kafka as at-least-once delivery with dedupe—not the ledger of record.',
    how: 'Sale owns catalog, operator auth, and buyer identity linkage. Admission issues FIFO entitlements against durable budgets and fails closed when the fence is raised. Inventory mutates capacity only through hold/confirm/release. Order owns checkout, purchase limits, transactional outbox, and compensation when payment outcome is ambiguous. Redis is never authority for grants, budgets, or stock. Verified with process-kill crash matrix, classified load benches, Compose, and local Kubernetes.',
    specialty: {
      title: 'Product-scale under flash load',
      audience: 'For real user-facing systems',
      body: 'Gateflow is the full product path—buyer and admin UIs, Google sign-in, five services—shaped like something users actually hit on drop day. Built to scale without lying: admission fences and FIFO budgets under load, inventory that cannot oversell, checkout that survives timeouts and kills, load benches that classify outcomes instead of greenwashing p99.',
    },
    stack: ['Go', 'PostgreSQL', 'Kafka', 'Redis', 'React', 'TypeScript', 'Kubernetes'],
    href: 'https://github.com/ghrushneshr25/gateflow',
    architecture: [
      { id: 'clients', label: 'Clients', detail: 'buyer + admin UIs' },
      { id: 'sale', label: 'Sale', detail: 'catalog + identity' },
      { id: 'admit', label: 'Admission', detail: 'FIFO + fence' },
      { id: 'inv', label: 'Inventory', detail: 'hold ≤ capacity' },
      { id: 'order', label: 'Order', detail: 'checkout + outbox' },
      { id: 'pay', label: 'Payment', detail: 'sim → reconcile' },
    ],
  },
]
