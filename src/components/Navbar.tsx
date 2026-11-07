import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { ArrowUpRight, Menu, Moon, Sun, X } from './Icons'

const sectionIds = navItems.filter((item) => !('href' in item)).map((item) => item.id)

function NavAnchor({
  item,
  active,
  onClick,
}: {
  item: (typeof navItems)[number]
  active: string
  onClick?: () => void
}) {
  const external = 'href' in item && Boolean(item.href)
  const href = external ? item.href : `#${item.id}`
  const title = 'title' in item ? item.title : undefined

  return (
    <a
      className={!external && active === item.id ? 'nav__link is-active' : 'nav__link'}
      href={href}
      title={title}
      aria-label={title ?? item.label}
      aria-current={!external && active === item.id ? 'location' : undefined}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      onClick={onClick}
    >
      {item.label}
      {external ? <ArrowUpRight size={11} /> : null}
    </a>
  )
}

export function Navbar() {
  const active = useActiveSection(sectionIds)
  const { theme, toggle, busy } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="nav">
      <a className="nav__brand" href="#home">
        <span className="nav__mark">GR</span>
        <span className="nav__name">{profile.handle}</span>
      </a>
      <div className="nav__actions">
        <nav className="nav__links" aria-label="Primary">
          {navItems.map((item) => (
            <NavAnchor key={item.id} item={item} active={active} />
          ))}
        </nav>
        <button
          className="nav__theme"
          type="button"
          aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to dark mode'}
          aria-busy={busy}
          disabled={busy}
          onClick={toggle}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="nav__drawer" aria-label="Mobile">
          {navItems.map((item) => (
            <NavAnchor key={item.id} item={item} active={active} onClick={() => setOpen(false)} />
          ))}
        </nav>
      ) : null}
    </header>
  )
}
