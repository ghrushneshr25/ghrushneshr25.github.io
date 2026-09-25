import { useEffect, useState } from 'react'
import { technologies } from '../data/technologies'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function TechStack() {
  const ref = useReveal<HTMLElement>()
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.tech')) {
        setOpen(null)
      }
    }
    document.addEventListener('pointerdown', onPointer)
    return () => document.removeEventListener('pointerdown', onPointer)
  }, [])

  return (
    <section className="section" id="stack" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader
          index="06"
          kicker="stack"
          title="Tools I actually ship with."
        />
        <div className="stack">
          {technologies.map((group) => (
            <div className="stack__group" key={group.id}>
              <h3>{group.label}</h3>
              <div className="stack__items">
                {group.items.map((item) => {
                  const id = `${group.id}-${item.name}`
                  const isOpen = open === id
                  return (
                    <button
                      className={isOpen ? 'tech is-open' : 'tech'}
                      type="button"
                      key={item.name}
                      aria-expanded={isOpen}
                      aria-describedby={isOpen ? `${id}-tip` : undefined}
                      onClick={() => setOpen((prev) => (prev === id ? null : id))}
                    >
                      {item.name}
                      <span className="tech__tip" id={`${id}-tip`} role="tooltip">
                        {item.blurb}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
