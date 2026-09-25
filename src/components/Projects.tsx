import { projects } from '../data/projects'
import { ArrowUpRight } from './Icons'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function Projects() {
  const ref = useReveal<HTMLElement>()
  const rest = projects.filter((project) => !project.featured)

  return (
    <section className="section" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader
          index="04"
          kicker="projects"
          title="Systems I built to understand systems."
        />
        <div className="projects">
          {rest.map((project) => (
            <article className="project" key={project.id}>
              <span className="project__num">{project.number}</span>
              <div>
                <h3>{project.name}</h3>
                <p className="project__tagline">{project.tagline}</p>
                <dl className="project__story">
                  <div>
                    <dt>What</dt>
                    <dd>{project.what}</dd>
                  </div>
                  <div>
                    <dt>Why</dt>
                    <dd>{project.why}</dd>
                  </div>
                  <div>
                    <dt>How</dt>
                    <dd>{project.how}</dd>
                  </div>
                </dl>
                <div className="tags" style={{ marginTop: 16 }}>
                  {project.stack.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                {project.href ? (
                  <a className="btn" href={project.href} rel="noreferrer" target="_blank" style={{ marginTop: 18 }}>
                    Repository <ArrowUpRight size={14} />
                  </a>
                ) : null}
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
