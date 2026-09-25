import { profile } from '../data/profile'
import { ArrowUpRight } from './Icons'
import { useReveal } from '../hooks/useReveal'

export function Contact() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="wrap reveal contact">
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}
        >
          10 / contact
        </p>
        <h2>Have an interesting system to build?</h2>
        <p>
          I like multi-tenant backends, ingestion platforms, and identity problems with sharp
          edges. If that sounds like your stack, write.
        </p>
        <div className="contact__links">
          <a className="btn btn--solid" href={`mailto:${profile.email}`}>
            {profile.email} <ArrowUpRight size={14} />
          </a>
          <a className="btn" href={profile.github} rel="noreferrer" target="_blank">
            GitHub <ArrowUpRight size={14} />
          </a>
          <a className="btn" href={profile.linkedin} rel="noreferrer" target="_blank">
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
