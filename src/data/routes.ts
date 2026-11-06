import { getCollection } from 'astro:content'
import { locales } from './site'

/**
 * Route registry + language-sibling resolver.
 *
 * The problem this solves: a URL prefix swap does not always land on a real
 * page. Chinese articles live in a `zh/` subfolder of each collection, so
 * their content id is "zh/<pinyin-slug>", while English articles sit at the
 * collection root. Swapping `/zh` off a Chinese URL produces something like
 * `/prediction-markets/kalshi-review` which may or may not exist in English.
 *
 * `sibling()` answers three questions at build time:
 *   1. Does an exact sibling in the target language exist?  -> use it
 *   2. Does it exist after normalising the `zh/` prefix?    -> use it
 *   3. Otherwise                                            -> fall back to
 *      the section index in that language, never to a dead URL.
 *
 * When a hand-written EN<->ZH translation table arrives later, it slots in at
 * `ALIASES` below and takes priority over the guesswork.
 */

const SECTIONS = ['prediction-markets', 'niche-sports', 'major-sports', 'essentials'] as const
type Section = (typeof SECTIONS)[number]

/**
 * Hand-maintained overrides, keyed by the language-neutral path (no /zh, /es
 * prefix) and mapping to the slug used in the other language.
 * Empty for now — the prefix heuristic covers the obvious cases.
 */
const ALIASES: Record<string, Record<string, string>> = {}

const LOCALE_PREFIXES = locales.map((l) => l.prefix)

/**
 * Static (non-dynamic) pages, read straight off the file tree so this list can
 * never drift from reality. A language that has no /es/glossary simply does not
 * get one registered here.
 */
const PAGE_FILES = Object.keys(import.meta.glob('/src/pages/**/*.astro'))

function staticRoutes(): string[] {
  return PAGE_FILES.filter((p) => !p.includes('[') && !p.endsWith('/404.astro')).map((p) => {
    const url = p.replace('/src/pages', '').replace(/\.astro$/, '')
    if (url === '/index') return '/'
    return url.replace(/\/index$/, '')
  })
}

/** Strip the language prefix ("/zh", "/es") from a pathname. */
export function stripLocale(path: string): string {
  return path.replace(/^\/(zh|es)(?=\/|$)/, '') || '/'
}

/** Normalise a content-collection id into the slug that appears in the URL. */
function slugOf(id: string): string {
  return id.replace(/^(zh|es)\//, '')
}

let routePromise: Promise<Set<string>> | null = null

/**
 * Every URL this build actually emits, as a plain string set. Cached for the
 * whole build — the collections are read once per process, not once per page.
 */
export function allRoutes(): Promise<Set<string>> {
  if (routePromise) return routePromise

  routePromise = (async () => {
    const routes = new Set<string>(staticRoutes())

    // Topic listings and their index pages only exist where the language has
    // a page file for them; the glob above already covered the index routes.
    for (const s of SECTIONS) {
      for (const prefix of LOCALE_PREFIXES) {
        const index = `${prefix}/${s}`
        if (!routes.has(index)) continue
        for (const t of ['getting-started', 'betting-basics', 'betting-strategy', 'mindset']) {
          routes.add(`${index}/topic/${t}`)
        }
      }
    }

    for (const s of SECTIONS) {
      const entries = await getCollection(s, ({ data }: { data: { draft?: boolean; lang?: string } }) => !data.draft)
      for (const entry of entries) {
        const lang = (entry.data as { lang?: string }).lang ?? 'en'
        const prefix = locales.find((l) => l.code === lang)?.prefix ?? ''
        routes.add(`${prefix}/${s}/${slugOf(entry.id)}`)
      }
    }

    return routes
  })()

  return routePromise
}

export interface Sibling {
  /** A URL that is guaranteed to exist in the target language. */
  href: string
  /** True when this is the same article/list page, not a fallback. */
  exact: boolean
}

/**
 * Resolve the URL of the current page in another language.
 *
 * @param path        Current page path, e.g. "/zh/prediction-markets/zh-kalshi-review"
 * @param targetPrefix Language URL prefix: "" for English, "/zh", "/es"
 */
export async function sibling(path: string, targetPrefix: string): Promise<Sibling> {
  const routes = await allRoutes()
  const base = stripLocale(path)
  const parts = base.split('/').filter(Boolean) // ["prediction-markets", "kalshi-review"]
  const segment = parts[0]
  const rest = parts.slice(1).join('/')

  // The homepage is its own translation.
  if (base === '/') return { href: targetPrefix || '/', exact: true }

  // 1. Direct translation of the path.
  const direct = targetPrefix + base
  if (routes.has(direct)) return { href: direct, exact: true }

  // 2. Hand-written alias table.
  const alias = ALIASES[base]?.[targetPrefix || 'en']
  if (alias && routes.has(targetPrefix + '/' + segment + '/' + alias)) {
    return { href: targetPrefix + '/' + segment + '/' + alias, exact: true }
  }

  // 3. Toggle the "zh-" slug prefix in either direction.
  if (segment && rest) {
    const withoutPrefix = rest.replace(/^zh-/, '')
    const withPrefix = rest.startsWith('zh-') ? rest : 'zh-' + rest
    for (const candidate of [withoutPrefix, withPrefix]) {
      if (candidate === rest) continue
      const url = `${targetPrefix}/${segment}/${candidate}`
      if (routes.has(url)) return { href: url, exact: true }
    }
  }

  // 4. Fallback: the section index in that language, then that language's home.
  //    A real page beats a 404, but never point at a section the language lacks
  //    (Spanish has no /es/prediction-markets yet).
  if (segment && SECTIONS.includes(segment as Section)) {
    const sectionIndex = `${targetPrefix}/${segment}`
    if (routes.has(sectionIndex)) return { href: sectionIndex, exact: false }
  }
  return { href: targetPrefix || '/', exact: false }
}
