import { projects } from '../data/projects'
import { Github } from './Icons'
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
                <div className="project__head">
                  <h3>{project.name}</h3>
                  {project.href ? (
                    <a
                      className="project__gh"
                      href={project.href}
                      rel="noreferrer"
                      target="_blank"
                      aria-label={`${project.name} repository`}
                    >
                      <Github size={32} />
                    </a>
                  ) : null}
                </div>
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
