import { profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function About() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" id="about" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader index="01" kicker="philosophy" title="Boring in production is a feature." />
        <div className="about__grid">
          <div className="about__copy">
            <p>
              I spend most of my time thinking about how data enters a system, who is allowed to
              touch it, and what happens when a worker dies mid-flight.
            </p>
            <p>
              At Velotio I own ingestion and delivery platforms — connectors, replay, PII masking,
              tenant RBAC. Before that, at Forcepoint, I built identity: SSO, SCIM, MFA, and a
              policy service that had to be both correct and fast.
            </p>
            <p>
              The interesting work is rarely the happy path. It is backpressure, backup topics,
              dependency-aware readiness, and making sure one tenant never sees another tenant’s
              secrets.
            </p>
            <div className="about__words">
              <span className="chip">Observable</span>
              <span className="chip">Predictable</span>
              <span className="chip">Recoverable</span>
              <span className="chip">Multi-tenant</span>
            </div>
          </div>
          <aside className="status">
            <div className="status__head">
              <span>education</span>
              <span>{profile.education.period}</span>
            </div>
            <div className="status__row">
              <span className="dot" aria-hidden="true" />
              <span className="status__label">{profile.education.school}</span>
              <span className="status__state">DONE</span>
            </div>
            <p style={{ padding: '14px 0 10px', color: 'var(--text-dim)', fontSize: 14 }}>
              {profile.education.degree}
              <br />
              {profile.education.detail}
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
