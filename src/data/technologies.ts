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
      { name: 'Go', blurb: 'Primary language for services, stream processors, and tooling.' },
      { name: 'Java', blurb: 'Spring Boot platforms, federated search, batch jobs.' },
      { name: 'Python', blurb: 'FastAPI backends, LangGraph agents, data tooling.' },
      { name: 'TypeScript', blurb: 'Operational UIs and typed frontend surfaces.' },
      { name: 'SQL', blurb: 'Schema design, query shape, multi-engine search paths.' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems',
    items: [
      { name: 'Kafka', blurb: 'Ingestion, transformation, enrichment, and replay.' },
      { name: 'gRPC', blurb: 'Typed service contracts alongside REST.' },
      { name: 'REST', blurb: 'Public APIs, playgrounds, and integration surfaces.' },
      { name: 'Event-driven', blurb: 'Outbox, change flags, DLQ, at-least-once delivery.' },
      { name: 'CQRS', blurb: 'Policy evaluation paths that need to be fast and explicit.' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: [
      { name: 'PostgreSQL', blurb: 'Source of truth for multi-tenant services and workflows.' },
      { name: 'ClickHouse', blurb: 'Result caches, OLAP analytics, high-volume query paths.' },
      { name: 'Redis', blurb: 'Caches, atomic gates, rate limits, hot paths.' },
      { name: 'MySQL', blurb: 'RDS-backed identity and platform data.' },
    ],
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    items: [
      { name: 'Kubernetes', blurb: 'Workloads, batch jobs, and dependency-aware readiness.' },
      { name: 'Helm', blurb: 'Repeatable service packaging across environments.' },
      { name: 'Docker', blurb: 'Local parity and worker runtimes.' },
      { name: 'AWS', blurb: 'S3, Athena, RDS, SNS, Route 53, Security Lake.' },
      { name: 'Azure', blurb: 'Event Hub, Blob, Synapse, ADX, Sentinel.' },
      { name: 'ArgoCD', blurb: 'GitOps promotion instead of snowflake deploys.' },
    ],
  },
  {
    id: 'security',
    label: 'Identity & Security',
    items: [
      { name: 'SAML', blurb: 'Enterprise SSO in multi-tenant IDM.' },
      { name: 'OIDC / OAuth2', blurb: 'Modern auth flows next to legacy LDAP.' },
      { name: 'SCIM', blurb: 'Automated user lifecycle across tenants.' },
      { name: 'RBAC', blurb: 'Tenant-scoped roles, not a global admin flag.' },
      { name: 'OCSF / ECS / UDM', blurb: 'Security telemetry normalization and SIEM mapping.' },
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
