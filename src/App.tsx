import { About } from './components/About'
import { Contact } from './components/Contact'
import { Currently } from './components/Currently'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Dsa } from './components/Dsa'
import { Projects } from './components/Projects'
import { Spotlight } from './components/Spotlight'
import { TechStack } from './components/TechStack'
import { Terminal } from './components/Terminal'

export default function App() {
  return (
    <div className="frame">
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <div className="chrome">
        <span>ctrl.plane v1.0</span>
        <span>ghrushnesh.rathod</span>
        <span>sys.ok</span>
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Spotlight />
        <Projects />
        <Dsa />
        <TechStack />
        <Currently />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
