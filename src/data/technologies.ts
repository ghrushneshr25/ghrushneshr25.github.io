export type TechItem = {
  name: string
  blurb: string
}

export type TechGroup = {
  id: string
  label: string
  items: TechItem[]
}

export const technologies: TechGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'Go', blurb: 'Primary language for services, libraries, and tooling.' },
      { name: 'Java', blurb: 'Spring Boot platforms, policy services, orchestration.' },
      { name: 'TypeScript', blurb: 'Operational UIs and typed frontend surfaces.' },
      { name: 'Python', blurb: 'Scripting, ML experiments, earlier systems work.' },
      { name: 'SQL', blurb: 'Schema design, query shape, transactional boundaries.' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems',
    items: [
      { name: 'Kafka', blurb: 'Ingestion, replay, and event contracts across pipelines.' },
      { name: 'RabbitMQ', blurb: 'Work queues where ordering and ack semantics matter.' },
      { name: 'gRPC', blurb: 'Typed service contracts alongside REST.' },
      { name: 'REST', blurb: 'Public APIs, dispensers, and integration surfaces.' },
      { name: 'CQRS', blurb: 'Policy evaluation paths that need to be fast and explicit.' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: [
      { name: 'PostgreSQL', blurb: 'Source of truth for multi-tenant services and workflows.' },
      { name: 'MySQL', blurb: 'RDS-backed identity and platform data.' },
      { name: 'Redis', blurb: 'Caches, session-adjacent state, hot paths.' },
      { name: 'Memcached', blurb: 'Simple, fast caching where TTL is enough.' },
    ],
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    items: [
      { name: 'Kubernetes', blurb: 'Workloads, probes, and dependency-aware readiness.' },
      { name: 'Helm', blurb: 'Repeatable service packaging across environments.' },
      { name: 'Docker', blurb: 'Local parity and worker runtimes.' },
      { name: 'AWS', blurb: 'S3, RDS, SNS, Route 53 — the pieces I actually used.' },
      { name: 'Azure', blurb: 'Event Hub, Blob, Log Analytics on ingestion paths.' },
      { name: 'ArgoCD', blurb: 'GitOps promotion instead of snowflake deploys.' },
    ],
  },
  {
    id: 'security',
    label: 'Identity',
    items: [
      { name: 'SAML', blurb: 'Enterprise SSO in multi-tenant IDM.' },
      { name: 'OIDC / OAuth2', blurb: 'Modern auth flows next to legacy LDAP.' },
      { name: 'SCIM', blurb: 'Automated user lifecycle across tenants.' },
      { name: 'RBAC', blurb: 'Tenant-scoped roles, not a global admin flag.' },
      { name: 'MFA', blurb: 'Duo Push and TOTP behind contextual policy.' },
    ],
  },
  {
    id: 'observe',
    label: 'Observability',
    items: [
      { name: 'OpenTelemetry', blurb: 'Traces and metrics as a default, not an afterthought.' },
      { name: 'Prometheus', blurb: 'Service-level signals that paging can trust.' },
      { name: 'Grafana', blurb: 'The board you actually look at during an incident.' },
    ],
  },
]
