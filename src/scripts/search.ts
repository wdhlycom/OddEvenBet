// Shared client-side search core for OddEvenBet, powered by Pagefind.
// Used by both the header dropdown and the standalone /search page.
//
// Language filtering: Pagefind indexes all three languages into one index.
// We filter results client-side by URL prefix — /zh/… = Chinese, /es/… = Spanish,
// and everything else = English. A reader only sees results in their language.

export interface SearchHit {
  url: string
  title: string
  excerpt: string
}

export type Lang = 'en' | 'zh' | 'es'

const LANG_PREFIX: Record<Lang, string> = {
  en: '/',
  zh: '/zh',
  es: '/es',
}

let pagefindPromise: Promise<any> | null = null

// The pagefind runtime path. Kept in a variable (not a string literal) so Vite
// does NOT try to bundle the dynamic import at build time — it must resolve at
// runtime from the deployed /pagefind/ directory.
const PAGEFIND_URL = '/pagefind/pagefind.js'

function loadPagefind(): Promise<any> {
  if (pagefindPromise) return pagefindPromise
  pagefindPromise = (async () => {
    try {
      // pagefind.js is an ES module with NAMED exports (init, search, options,
      // debouncedSearch, …). The module namespace itself IS the API — there is
      // no default export and nothing is attached to window.
      return (await import(PAGEFIND_URL)) as any
    } catch {
      return null
    }
  })()
  return pagefindPromise
}

export async function pagefindReady() {
  const pf = await loadPagefind()
  if (!pf) return null
  // pagefind.init() is optional but ensures the worker is warm.
  await pf.init?.()
  return pf
}

/** Does a URL belong to the given language? */
export function urlMatchesLang(url: string, lang: Lang): boolean {
  if (lang === 'en') {
    return !url.startsWith('/zh/') && !url.startsWith('/es/') && url !== '/zh' && url !== '/es'
  }
  const prefix = LANG_PREFIX[lang] // '/zh' or '/es'
  return url === prefix || url.startsWith(prefix + '/')
}

/**
 * Search the index and return hits in the given language.
 * @param query the raw search string
 * @param lang  restrict results to this language
 * @param limit max number of hits to return
 */
export async function search(query: string, lang: Lang, limit = 8): Promise<SearchHit[]> {
  const q = query.trim()
  if (!q) return []

  const pf = await pagefindReady()
  if (!pf) return []

  try {
    const res = await pf.search(q, {})
    if (!res || !res.results) return []

    const hits: SearchHit[] = []
    for (const r of res.results) {
      // NOTE: res.results items are { id, data() } — the url/title/excerpt only
      // exist AFTER awaiting data(). Filter by url AFTER loading the data.
      const data = await r.data()
      // Pagefind returns URLs with a trailing slash (e.g. "/zh/essentials/"), but the
      // site is built with `trailingSlash: 'never'` so the real pages live at
      // "/zh/essentials". Strip the trailing slash (except the bare "/" root) so links
      // don't 404.
      let url = (data?.url as string) || ''
      if (url.length > 1 && url.endsWith('/')) url = url.slice(0, -1)
      if (!urlMatchesLang(url, lang)) continue
      hits.push({
        url,
        title: (data?.meta?.title as string) || url,
        excerpt: (data?.excerpt as string) || '',
      })
      if (hits.length >= limit) break
    }
    return hits
  } catch {
    return []
  }
}

/** Strip HTML tags from a Pagefind excerpt so we can render it safely. */
export function stripHtml(html: string): string {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return (tmp.textContent || '').trim()
}
