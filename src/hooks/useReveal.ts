import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function show(node: HTMLElement) {
  node.classList.add('is-visible')
  node.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduced) {
      show(node)
      return
    }

    // Already in view on mount (common for first sections under the sticky nav)
    const rect = node.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    if (rect.top < vh * 0.92 && rect.bottom > 0) {
      show(node)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show(node)
          observer.unobserve(node)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return ref
}
