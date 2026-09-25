import { currently } from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function Currently() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader index="08" kicker="currently" title="What has my attention." />
        <div className="nowgrid">
          <article className="nowcard">
            <h3>Building</h3>
            <ul>
              {currently.building.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="nowcard">
            <h3>Learning</h3>
            <ul>
              {currently.learning.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="nowcard">
            <h3>Exploring</h3>
            <ul>
              {currently.exploring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
