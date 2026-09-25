export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  location: string
  current?: boolean
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'velotio',
    company: 'Velotio Technologies',
    role: 'Senior Software Engineer',
    period: 'Apr 2025 — Present',
    location: 'Pune, India',
    current: true,
    highlights: [
      'Built a pipeline simulation playground that cut customer onboarding from a day to ~30 minutes.',
      'Designed a data replay framework with backup topics, retry orchestration, and asynchronous recovery.',
      'Shipped 40+ ingestion connectors and 10+ dispensers across REST, gRPC, GraphQL, Kafka, and Azure Event Hub.',
      'Owned dispenser services used by 40+ customers; a generic HTTP framework dropped new integrations from days to hours.',
      'Built a Sensitive Data Service to mask credentials and PII before multi-tenant ingestion.',
      'Designed tenant-level RBAC, Keycloak SSO audit workflows, and Kubernetes readiness checks that wait on real dependencies.',
    ],
  },
  {
    id: 'forcepoint-ii',
    company: 'Forcepoint',
    role: 'Software Development Engineer II',
    period: 'Aug 2024 — Apr 2025',
    location: 'Mumbai, India',
    highlights: [
      'Led Remote Browser Isolation convergence onto ForcepointOne through centralized policy microservices.',
      'Integrated Salesforce, AWS SNS, and S3 to scale multi-tenant onboarding and communication.',
      'Implemented SCIM user provisioning and context-aware MFA / LDAP authentication.',
      'Migrated users, tenants, and policies into a multi-tenant architecture with minimal downtime.',
    ],
  },
  {
    id: 'forcepoint-i',
    company: 'Forcepoint',
    role: 'Software Development Engineer I',
    period: 'Jul 2022 — Aug 2024',
    location: 'Mumbai, India',
    highlights: [
      'Designed a multi-tenant Identity Management system supporting SAML, LDAP, and local authentication.',
      'Implemented MFA with Duo Push and TOTP, gated by contextual security policies.',
      'Built a Policy Microservice on CQRS that improved evaluation performance by 200%.',
      'Deployed services on Kubernetes with Helm; used AWS Route 53 and RDS (MySQL) for regional identity infrastructure.',
    ],
  },
]
