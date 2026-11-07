import { profile } from './profile'

export type DsaCatalog = {
  topics: number
  concepts: number
  problems: number
  runtime: string
}

export const dsa = {
  repo: 'https://github.com/ghrushneshr25/dsa',
  pavilion: profile.pavilion,
  catalogUrl: `${profile.pavilion}catalog.json`,
  why: 'Revisiting fundamental computer science concepts through hands-on Go implementations, problem-solving exercises, complexity analysis, engineering notes, and comprehensive testing.',
  how: "Following Karumanchi's DSA roadmap, one topic at a time, with progress and learning logs published through The Pavilion.",
  fallback: {
    topics: 2,
    concepts: 6,
    problems: 6,
    runtime: 'GO',
  } satisfies DsaCatalog,
} as const
