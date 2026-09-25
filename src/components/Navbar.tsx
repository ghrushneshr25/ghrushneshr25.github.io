import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { Menu, Moon, Sun, X } from './Icons'

const navIds = navItems.map((item) => item.id)

export function Navbar() {
  const active = useActiveSection(navIds)
  const { theme, toggle } = useTheme()
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
            <a
              key={item.id}
              className={active === item.id ? 'nav__link is-active' : 'nav__link'}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="nav__theme"
          type="button"
          aria-label={theme === 'dark' ? 'Switch to day mode' : 'Switch to dark mode'}
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
            <a
              key={item.id}
              className={active === item.id ? 'is-active' : undefined}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
