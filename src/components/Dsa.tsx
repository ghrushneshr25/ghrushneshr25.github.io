import { useEffect, useState } from 'react'
import { dsa, type DsaCatalog } from '../data/dsa'
import { useReveal } from '../hooks/useReveal'
import { ArrowUpRight } from './Icons'
import { SectionHeader } from './SectionHeader'

function rows(catalog: DsaCatalog) {
  return [
    { label: 'topics', state: String(catalog.topics) },
    { label: 'concepts', state: String(catalog.concepts) },
    { label: 'problems', state: String(catalog.problems) },
    { label: 'runtime', state: catalog.runtime },
  ]
}

export function Dsa() {
  const ref = useReveal<HTMLElement>()
  const [catalog, setCatalog] = useState<DsaCatalog>(dsa.fallback)

  useEffect(() => {
    const ctrl = new AbortController()
    fetch(dsa.catalogUrl, { signal: ctrl.signal, cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Partial<DsaCatalog>) => {
        setCatalog({
          topics: Number(data.topics) || 0,
          concepts: Number(data.concepts) || 0,
          problems: Number(data.problems) || 0,
          runtime: typeof data.runtime === 'string' && data.runtime ? data.runtime : 'GO',
        })
      })
      .catch(() => undefined)
    return () => ctrl.abort()
  }, [])

  return (
    <section className="section" id="dsa" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader index="05" kicker="catalog" title="Working the book, in Go." />
        <div className="about__grid">
          <div className="about__copy">
            <p>{dsa.why}</p>
            <p>{dsa.how}</p>
            <div className="hero__actions" style={{ marginTop: 8 }}>
              <a className="btn btn--solid" href={dsa.pavilion} rel="noreferrer" target="_blank">
                Open pavilion <ArrowUpRight size={14} />
              </a>
              <a className="btn" href={dsa.repo} rel="noreferrer" target="_blank">
                GitHub <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <aside className="status" aria-label="DSA catalog status">
            <div className="status__head">
              <span>sys.status</span>
              <span>godsa</span>
            </div>
            {rows(catalog).map((row) => (
              <div className="status__row" key={row.label}>
                <span className="dot" aria-hidden="true" />
                <span className="status__label">{row.label}</span>
                <span className="status__state">{row.state}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}
