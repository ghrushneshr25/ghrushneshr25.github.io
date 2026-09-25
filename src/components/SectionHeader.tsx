import type { ReactNode } from 'react'

type SectionHeaderProps = {
  index: string
  kicker: string
  title: string
  aside?: ReactNode
}

export function SectionHeader({ index, kicker, title, aside }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div className="section-header__meta">
        <span className="section-header__index">{index}</span>
        <span className="section-header__kicker">{kicker}</span>
        <span className="section-header__rule" aria-hidden="true" />
        {aside ? <span className="section-header__aside">{aside}</span> : null}
      </div>
      <h2 className="section-header__title">{title}</h2>
    </header>
  )
}
