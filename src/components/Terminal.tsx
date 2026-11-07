import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { currently, navItems, profile } from '../data/profile'
import { dsa } from '../data/dsa'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

type Line = { kind: 'cmd' | 'out' | 'err' | 'sys'; text: string }

const FILES: Record<string, string> = {
  'interests.txt': [
    currently.building.map((item) => `building   ${item}`).join('\n'),
    currently.learning.map((item) => `learning   ${item}`).join('\n'),
    currently.exploring.map((item) => `exploring  ${item}`).join('\n'),
  ].join('\n'),
  'about.txt': `${profile.headline}\n${profile.thesis}`,
  'dsa.txt': `${dsa.why}\n${dsa.how}\n${dsa.pavilion}`,
}

const COMMANDS = [
  'help',
  'whoami',
  'cat',
  'ls',
  'pwd',
  'uptime',
  'stack',
  'contact',
  'open',
  'pavilion',
  'clear',
] as const

const HELP = [
  'whoami              identity',
  'cat FILE            read a file',
  'ls                  site map + files',
  'pwd                 where you are',
  'uptime              years in production',
  'stack               languages I reach for',
  'contact             how to reach me',
  'pavilion            open the DSA pavilion',
  'open TARGET         github | linkedin | dsa | pavilion',
  'clear               wipe the buffer',
  'help                this list',
  '',
  'files: interests.txt  about.txt  dsa.txt',
  '↑ ↓ history   tab complete',
].join('\n')

function complete(input: string): string | null {
  const raw = input.trim()
  if (!raw) return null
  const parts = raw.split(/\s+/)
  if (parts.length === 1) {
    const hits = COMMANDS.filter((cmd) => cmd.startsWith(parts[0].toLowerCase()))
    return hits.length === 1 ? hits[0] : null
  }
  if (parts[0].toLowerCase() === 'cat' && parts.length === 2) {
    const hits = Object.keys(FILES).filter((name) => name.startsWith(parts[1].toLowerCase()))
    return hits.length === 1 ? `cat ${hits[0]}` : null
  }
  if (parts[0].toLowerCase() === 'open' && parts.length === 2) {
    const hits = ['github', 'linkedin', 'dsa', 'pavilion'].filter((name) =>
      name.startsWith(parts[1].toLowerCase()),
    )
    return hits.length === 1 ? `open ${hits[0]}` : null
  }
  return null
}

function run(input: string): { lines: Line[]; open?: string; clear?: boolean } {
  const trimmed = input.trim()
  if (!trimmed) return { lines: [] }

  const [bin, ...rest] = trimmed.split(/\s+/)
  const arg = rest.join(' ')
  const cmd = bin.toLowerCase()

  switch (cmd) {
    case 'help':
    case 'man':
      return { lines: [{ kind: 'out', text: HELP }] }
    case 'whoami':
      return {
        lines: [
          {
            kind: 'out',
            text: `${profile.handle}\n${profile.name}\n${profile.role} · ${profile.location}`,
          },
        ],
      }
    case 'cat': {
      if (!arg) return { lines: [{ kind: 'err', text: 'usage: cat FILE' }] }
      const body = FILES[arg.toLowerCase()]
      if (!body) return { lines: [{ kind: 'err', text: `cat: ${arg}: no such file` }] }
      return { lines: [{ kind: 'out', text: body }] }
    }
    case 'ls':
      return {
        lines: [
          {
            kind: 'out',
            text: `${navItems.map((item) => item.id).join('  ')}\ninterests.txt  about.txt  dsa.txt`,
          },
        ],
      }
    case 'pwd':
      return { lines: [{ kind: 'out', text: '/home/ghrushneshr25/ctrl.plane' }] }
    case 'uptime':
      return {
        lines: [
          {
            kind: 'out',
            text: `up ${profile.years} years\nbuilding things that survive production`,
          },
        ],
      }
    case 'stack':
      return {
        lines: [{ kind: 'out', text: 'Go  Java  Python  TypeScript  Kafka  PostgreSQL  Kubernetes  AWS' }],
      }
    case 'contact':
      return {
        lines: [{ kind: 'out', text: `${profile.email}\n${profile.github}\n${profile.linkedin}` }],
      }
    case 'open': {
      const target = arg.toLowerCase()
      if (target === 'github' || target === '') return { lines: [{ kind: 'out', text: profile.github }], open: profile.github }
      if (target === 'linkedin') return { lines: [{ kind: 'out', text: profile.linkedin }], open: profile.linkedin }
      if (target === 'dsa' || target === 'pavilion') {
        return { lines: [{ kind: 'out', text: dsa.pavilion }], open: dsa.pavilion }
      }
      return { lines: [{ kind: 'err', text: 'usage: open github | linkedin | dsa | pavilion' }] }
    }
    case 'github':
      return { lines: [{ kind: 'out', text: profile.github }], open: profile.github }
    case 'pavilion':
    case 'dsa':
      return { lines: [{ kind: 'out', text: dsa.pavilion }], open: dsa.pavilion }
    case 'clear':
      return { lines: [], clear: true }
    case 'echo':
      return { lines: [{ kind: 'out', text: arg }] }
    default:
      return { lines: [{ kind: 'err', text: `command not found: ${bin}\ntry help` }] }
  }
}

export function Terminal() {
  const ref = useReveal<HTMLElement>()
  const scroller = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const history = useRef<string[]>([])
  const historyIndex = useRef(-1)
  const [lines, setLines] = useState<Line[]>([
    { kind: 'sys', text: 'ctrl.plane v1.0  ·  session open' },
    { kind: 'sys', text: 'type help · ↑↓ history · tab complete' },
    { kind: 'cmd', text: 'whoami' },
    { kind: 'out', text: `${profile.handle}\n${profile.role} · ${profile.location}` },
  ])
  const [value, setValue] = useState('')
  const [floated, setFloated] = useState(false)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [lines, floated])

  useEffect(() => {
    if (!floated) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const id = window.setTimeout(() => inputRef.current?.focus(), 0)
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setFloated(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(id)
      window.removeEventListener('keydown', onKey)
    }
  }, [floated])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const command = value
    const result = run(command)
    setValue('')
    historyIndex.current = -1
    if (command.trim()) {
      history.current = [...history.current.filter((item) => item !== command.trim()), command.trim()]
    }

    if (result.clear) {
      setLines([])
      return
    }

    if (result.open) {
      window.open(result.open, '_blank', 'noopener,noreferrer')
    }

    setLines((prev) => [
      ...prev,
      { kind: 'cmd', text: command },
      ...result.lines,
    ])
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.current.length === 0) return
      const next = historyIndex.current < 0 ? history.current.length - 1 : Math.max(0, historyIndex.current - 1)
      historyIndex.current = next
      setValue(history.current[next] ?? '')
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex.current < 0) return
      const next = historyIndex.current + 1
      if (next >= history.current.length) {
        historyIndex.current = -1
        setValue('')
        return
      }
      historyIndex.current = next
      setValue(history.current[next] ?? '')
      return
    }
    if (event.key === 'Tab') {
      const filled = complete(value)
      if (filled) {
        event.preventDefault()
        setValue(filled)
      }
    }
  }

  const session = {
    lines,
    value,
    onSubmit,
    onKeyDown,
    onChange: setValue,
    onOpen: () => setFloated(true),
    onClose: () => setFloated(false),
  }

  return (
    <section className="section" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader index="09" kicker="shell" title="A control plane you can type into." />
        <TerminalWindow
          mode="docked"
          interactive={!floated}
          scrollerRef={floated ? undefined : scroller}
          inputRef={floated ? undefined : inputRef}
          {...session}
        />
      </div>
      {floated
        ? createPortal(
            <div className="terminal-pop" role="dialog" aria-modal="true" aria-label="Terminal">
              <button
                type="button"
                className="terminal-pop__backdrop"
                aria-label="Close terminal"
                onClick={() => setFloated(false)}
              />
              <div className="terminal-pop__card">
                <TerminalWindow
                  mode="float"
                  interactive
                  scrollerRef={scroller}
                  inputRef={inputRef}
                  {...session}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}

function TerminalWindow({
  mode,
  interactive,
  lines,
  value,
  scrollerRef,
  inputRef,
  onOpen,
  onClose,
  onSubmit,
  onKeyDown,
  onChange,
}: {
  mode: 'docked' | 'float'
  interactive: boolean
  lines: Line[]
  value: string
  scrollerRef?: RefObject<HTMLDivElement | null>
  inputRef?: RefObject<HTMLInputElement | null>
  onOpen: () => void
  onClose: () => void
  onSubmit: (event: FormEvent) => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onChange: (value: string) => void
}): ReactNode {
  const floated = mode === 'float'
  const onDot = floated ? onClose : onOpen

  return (
    <div className={floated ? 'terminal terminal--float' : 'terminal'}>
      <div className="terminal__bar">
        <div className="terminal__dots">
          <button
            type="button"
            className="terminal__dot terminal__dot--close"
            aria-label={floated ? 'Close terminal' : 'Open terminal'}
            title={floated ? 'Close' : 'Open'}
            onClick={onDot}
          />
          <button
            type="button"
            className="terminal__dot terminal__dot--min"
            aria-label={floated ? 'Close terminal' : 'Open terminal'}
            title={floated ? 'Close' : 'Open'}
            onClick={onDot}
          />
          <button
            type="button"
            className="terminal__dot terminal__dot--max"
            aria-label={floated ? 'Close terminal' : 'Open terminal'}
            title={floated ? 'Close' : 'Open'}
            onClick={onDot}
          />
        </div>
        <span className="terminal__title">ghrushnesh@ctrl.plane</span>
        <span className="terminal__ok">sys.ok</span>
      </div>
      <div
        className="terminal__body"
        ref={scrollerRef}
        onClick={() => inputRef?.current?.focus()}
      >
        {lines.map((line, index) =>
          line.kind === 'cmd' ? (
            <div className="terminal__line is-cmd" key={`${line.kind}-${index}`}>
              <span className="terminal__prompt" aria-hidden="true">
                $
              </span>
              <span>{line.text}</span>
            </div>
          ) : (
            <div className={`terminal__line is-${line.kind}`} key={`${line.kind}-${index}`}>
              {line.text}
            </div>
          ),
        )}
        {interactive ? (
          <form className="terminal__form" onSubmit={onSubmit}>
            <span className="terminal__prompt" aria-hidden="true">
              $
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        ) : (
          <p className="terminal__hint">Session open in the floating card.</p>
        )}
      </div>
    </div>
  )
}
