import { githubProfile, recentLanguages, selectedRepos } from '../data/github'
import { ArrowUpRight } from './Icons'
import { useReveal } from '../hooks/useReveal'
import { SectionHeader } from './SectionHeader'

export function Github() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="section" ref={ref}>
      <div className="wrap reveal">
        <SectionHeader
          index="07"
          kicker="github"
          title="Public work, selected."
          aside={githubProfile.login}
        />
        <div className="gh">
          <div className="gh__profile">
            <a href={githubProfile.href} rel="noreferrer" target="_blank">
              github.com/{githubProfile.login} <ArrowUpRight size={12} />
            </a>
            <span>
              {githubProfile.publicRepos} public repos · {githubProfile.location}
            </span>
          </div>
          <div className="tags" aria-label="Languages in recent public repositories">
            {recentLanguages.map((lang) => (
              <span className="tag" key={lang}>
                {lang}
              </span>
            ))}
          </div>
          <div className="gh__grid">
            {selectedRepos.map((repo) => (
              <a className="repo" href={repo.href} key={repo.name} rel="noreferrer" target="_blank">
                <div className="repo__top">
                  <span>{repo.name}</span>
                  <span style={{ color: 'var(--text-mute)' }}>{repo.language}</span>
                </div>
                <p>{repo.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
