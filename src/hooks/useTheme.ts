import { useCallback, useEffect, useRef, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'portfolio-theme'
const TRANSIT_MS = 1400
const THEME_SWAP_AT = 0.12
const FADE_OUT_MS = 480

function getPreferred(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000')
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function playThemeWave(next: Theme, onMid: () => void, onDone: () => void) {
  if (prefersReducedMotion()) {
    onMid()
    onDone()
    return () => undefined
  }

  const direction = next === 'light' ? 'to-light' : 'to-dark'
  const root = document.createElement('div')
  root.className = `theme-wave theme-wave--${direction}`
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML = '<div class="theme-wave__veil"></div>'

  document.body.appendChild(root)
  document.documentElement.classList.add('is-theme-waving')

  void root.offsetWidth
  root.classList.add('is-active')

  // Swap theme early so palette tokens morph under the soft wave.
  const midTimer = window.setTimeout(onMid, TRANSIT_MS * THEME_SWAP_AT)
  const endTimer = window.setTimeout(() => {
    root.classList.add('is-done')
    window.setTimeout(() => {
      document.documentElement.classList.remove('is-theme-waving')
      root.remove()
      onDone()
    }, FADE_OUT_MS)
  }, TRANSIT_MS)

  return () => {
    window.clearTimeout(midTimer)
    window.clearTimeout(endTimer)
    document.documentElement.classList.remove('is-theme-waving')
    root.remove()
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark'
    const current = document.documentElement.getAttribute('data-theme')
    return current === 'light' || current === 'dark' ? current : getPreferred()
  })
  const [busy, setBusy] = useState(false)
  const themeRef = useRef(theme)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(
    () => () => {
      cleanupRef.current?.()
    },
    [],
  )

  const toggle = useCallback(() => {
    if (busy) return

    const next: Theme = themeRef.current === 'dark' ? 'light' : 'dark'

    setBusy(true)
    cleanupRef.current?.()
    cleanupRef.current = playThemeWave(
      next,
      () => {
        setThemeState(next)
      },
      () => {
        setBusy(false)
        cleanupRef.current = null
      },
    )
  }, [busy])

  return { theme, toggle, setTheme: setThemeState, busy }
}
