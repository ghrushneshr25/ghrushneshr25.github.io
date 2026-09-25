import { profile, systemStatus } from '../data/profile'
import { ArrowUpRight } from './Icons'

export function Hero() {
  return (
    <section className="hero wrap" id="home">
      <div className="hero__rail">
        <span>ctrl.plane // identity</span>
        <span>{profile.location}</span>
      </div>
      <div className="hero__layout">
        <div>
          <p className="hero__kicker">System online</p>
          <h1>
            {profile.firstName}
            <span>{profile.lastName}</span>
          </h1>
          <p className="hero__role">
            {profile.role} · {profile.years} years
          </p>
          <p className="hero__lede">{profile.headline}</p>
          <div className="hero__actions">
            <a className="btn btn--solid" href={profile.github} rel="noreferrer" target="_blank">
              GitHub <ArrowUpRight size={14} />
            </a>
            <a className="btn" href={profile.linkedin} rel="noreferrer" target="_blank">
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              Email <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <aside className="status" aria-label="System status">
          <div className="status__head">
            <span>sys.status</span>
            <span>uptime {profile.years}y</span>
          </div>
          {systemStatus.map((row) => (
            <div className="status__row" key={row.key}>
              <span
                className={row.state === 'EXPLORING' ? 'dot is-scan' : 'dot'}
                aria-hidden="true"
              />
              <span className="status__label">{row.label}</span>
              <span
                className={
                  row.state === 'EXPLORING' ? 'status__state is-scan' : 'status__state'
                }
              >
                {row.state}
              </span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}
