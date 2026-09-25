import { profile } from '../data/profile'

export function Footer() {
  return (
    <footer className="footer wrap">
      <span>{profile.name}</span>
      <span>ctrl.plane · built as a static site</span>
      <a href={profile.github} rel="noreferrer" target="_blank">
        /{profile.handle}
      </a>
    </footer>
  )
}
