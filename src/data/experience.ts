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
      'Built federated search across Athena, Synapse, ClickHouse, and customer SIEM lakes—with async execution and a ClickHouse result cache.',
      'Built a pure-Go transformation service that normalizes security telemetry into OCSF / ECS / UDM (~5 ms → 0.5 ms/event), replacing Vector/VRL.',
      'Built a Kafka rules engine for volume control, detections, and insights—hot-reloadable Grule rules with Redis gating.',
      'Built enrichment and sensitive-data services that look up Redis context and mask/redact secrets in-flight on Kafka streams.',
      'Built LLM backends for deep-research agents, text-to-SQL, and SIEM schema mapping over customer data.',
      'Cut pipeline onboarding from a day to ~30 minutes; owned dispensers used by 40+ customers.',
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
