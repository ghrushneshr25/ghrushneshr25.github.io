import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

type Line = { kind: 'cmd' | 'out'; text: string }

const HELP = [
  'whoami            identity',
  'cat interests.txt current obsessions',
  'uptime            how long this has been going',
  'ls                sections',
  'stack             languages I reach for',
  'contact           how to reach me',
  'github            open the profile',
  'clear             wipe the buffer',
  'help              this list',
].join('\n')

function run(input: string): string | '__CLEAR__' | '__GITHUB__' {
  const cmd = input.trim().toLowerCase()
  switch (cmd) {
    case '':
      return ''
    case 'help':
      return HELP
    case 'whoami':
      return `${profile.handle}\n${profile.role}`
    case 'cat interests.txt':
      return 'distributed-systems\ngolang\ncloud\niam\ndata-pipelines\nai'
    case 'uptime':
      return 'building things that survive production.\n4+ years · identity, pipelines, platforms'
    case 'ls':
      return 'home  work  projects  stack  about  contact'
    case 'stack':
      return 'Go  Java  TypeScript  SQL  Kafka  PostgreSQL  Kubernetes  AWS'
    case 'contact':
      return `${profile.email}\n${profile.github}\n${profile.linkedin}`
    case 'github':
      return '__GITHUB__'
    case 'clear':
      return '__CLEAR__'
    default:
      return `command not found: ${input}\ntry help`
  }
}

export function Terminal() {
  const ref = useReveal<HTMLElement>()
  const scroller = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'ctrl.plane shell  ·  type help' },
    { kind: 'cmd', text: '$ whoami' },
    { kind: 'out', text: profile.handle },
  ])
  const [value, setValue] = useState('')

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [lines])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const command = value
    const result = run(command)
    setValue('')

    if (result === '__CLEAR__') {
      setLines([])
      return
    }

    if (result === '__GITHUB__') {
      window.open(profile.github, '_blank', 'noopener,noreferrer')
      setLines((prev) => [
        ...prev,
        { kind: 'cmd', text: `$ ${command}` },
        { kind: 'out', text: profile.github },
      ])
      return
    }

    setLines((prev) => [
      ...prev,
      { kind: 'cmd', text: `$ ${command}` },
      ...(result ? [{ kind: 'out' as const, text: result }] : []),
    ])
  }

  return (
    <section className="section" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader index="09" kicker="shell" title="A small terminal, because of course." />
        <div className="terminal">
          <div className="terminal__bar">
            <div className="terminal__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            ghrushnesh@control-plane
          </div>
          <div
            className="terminal__body"
            ref={scroller}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, index) => (
              <div
                className={line.kind === 'cmd' ? 'terminal__line is-cmd' : 'terminal__line'}
                key={`${line.text}-${index}`}
              >
                {line.text}
              </div>
            ))}
            <form className="terminal__form" onSubmit={onSubmit}>
              <span aria-hidden="true">$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-label="Terminal command"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
