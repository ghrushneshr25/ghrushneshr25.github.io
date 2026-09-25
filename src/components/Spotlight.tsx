import { projects } from '../data/projects'
import { ArrowUpRight } from './Icons'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function Spotlight() {
  const ref = useReveal<HTMLElement>()
  const project = projects.find((item) => item.featured)

  if (!project) return null

  return (
    <section className="section" id="projects" ref={ref} aria-labelledby="spotlight-title">
      <div className="wrap reveal">
        <SectionHeader index="03" kicker="spotlight" title="The library I wanted in production Go." />
        <article className="spotlight">
          <p className="spotlight__label">Featured · {project.number}</p>
          <h3 id="spotlight-title" style={{ fontSize: 'clamp(32px, 6vw, 56px)', letterSpacing: '-0.05em' }}>
            {project.name}
          </h3>
          <p className="project__tagline" style={{ fontSize: 20, maxWidth: '52ch' }}>
            {project.what} {project.why}
          </p>
          <p style={{ color: 'var(--text-dim)', maxWidth: '62ch' }}>{project.how}</p>
          {project.architecture ? (
            <div className="flow" aria-label={`${project.name} architecture`}>
              {project.architecture.map((node, index) => (
                <span key={node.id} style={{ display: 'contents' }}>
                  {index > 0 ? (
                    <span className="flow__arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <span className="flow__node">
                    {node.label}
                    {node.detail ? <small>{node.detail}</small> : null}
                  </span>
                </span>
              ))}
            </div>
          ) : null}
          <div className="tags">
            {project.stack.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
          {project.href ? (
            <a className="btn btn--solid" href={project.href} rel="noreferrer" target="_blank">
              {project.href.replace(/^https?:\/\//, '')} <ArrowUpRight size={14} />
            </a>
          ) : null}
        </article>
      </div>
    </section>
  )
}
