import { experience } from '../data/experience'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function Experience() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" id="work" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader
          index="02"
          kicker="work"
          title="Four years of identity, pipelines, and platforms."
          aside="2022 — now"
        />
        <div className="timeline">
          {experience.map((job) => (
            <article className="job" key={job.id}>
              <div>
                <div className="job__meta">
                  <span>{job.period}</span>
                  <span>{job.location}</span>
                  {job.current ? <span className="now">● live</span> : null}
                </div>
              </div>
              <div>
                <h3 className="job__company">{job.company}</h3>
                <p className="job__role">{job.role}</p>
                <ul>
                  {job.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
