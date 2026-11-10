import { getCollection } from 'astro:content'
import { locales } from './site'

/**
 * Route registry + language-sibling resolver.
 *
 * The problem this solves: a URL prefix swap does not always land on a real
 * page. Chinese articles live in a `zh/` subfolder of each collection, so
 * their content id is "zh/<pinyin-slug>", while English articles sit at the
 * collection root. Swapping `/zh` off a Chinese URL produces something like
 * `/reviews/kalshi-review` which may or may not exist in English.
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

const SECTIONS = ['prediction-markets', 'niche-sports', 'major-sports', 'essentials', 'reviews'] as const
type Section = (typeof SECTIONS)[number]

/**
 * Hand-maintained translation table. One line per page lists the slug that
 * single article uses in each language. The build expands it into a
 * bidirectional lookup, so adding (or updating) a translation is a one-line
 * edit — this is how the language switcher stays in sync as content grows.
 *
 * Only *content* articles need an entry: static pages (About, Glossary, the
 * section indexes) share one slug across all languages and are covered by the
 * prefix swap in `sibling()`. Content slugs differ per language, so they have
 * to be declared here explicitly.
 */
const TRANSLATIONS: Record<string, { en: string; zh?: string; es?: string }[]> = {
  essentials: [
    {
      en: 'what-is-a-prediction-market',
      zh: 'shen-me-shi-yu-ce-shi-chang',
      es: 'que-es-un-mercado-de-prediccion',
    },
    {
      en: 'how-prediction-markets-work',
      zh: 'yu-ce-shi-chang-zen-me-yun-zuo',
      es: 'como-funcionan-los-mercados-de-prediccion',
    },
    {
      en: 'three-core-betting-markets',
      zh: 'san-da-pan-kou',
      es: 'los-tres-mercados-basicos',
    },
    {
      en: 'active-vs-passive-risk',
      zh: 'zhu-dong-vs-bei-dong-feng-xian',
      es: 'riesgo-activo-vs-pasivo',
    },
    {
      en: 'against-the-anti-gambling-bias',
      zh: 'fan-fan-du-pian-jian',
      es: 'contra-el-sesgo-antijuego',
    },
    {
      en: 'bankroll-management',
      zh: 'zi-jin-guan-li',
      es: 'gestion-del-bankroll',
    },
    {
      en: 'can-knowledge-make-you-money',
      zh: 'ren-zhi-ke-yi-bian-xian-ma',
      es: 'el-conocimiento-da-dinero',
    },
    {
      en: 'common-beginner-mistakes',
      zh: 'xin-shou-zui-rong-yi-fan-de-cuo',
      es: 'errores-comunes-de-principiante',
    },
    {
      en: 'four-prediction-market-strategies',
      zh: 'si-lei-ji-chu-da-fa',
      es: 'cuatro-estrategias-de-mercado-de-prediccion',
    },
    {
      en: 'how-prediction-market-fees-work',
      zh: 'shou-xu-fei-zen-me-suan',
      es: 'como-funcionan-las-comisiones',
    },
    {
      en: 'how-prediction-market-prices-are-set',
      zh: 'jia-ge-zen-me-ding',
      es: 'como-se-fijan-los-precios',
    },
    {
      en: 'how-prediction-market-withdrawals-work',
      zh: 'jie-suan-zen-me-jin-xing',
      es: 'como-funcionan-los-retiros',
    },
    {
      en: 'how-to-read-odds',
      zh: 'pei-lv-san-zhong-xie-fa',
      es: 'como-leer-las-cuotas',
    },
    {
      en: 'life-is-a-series-of-bets',
      zh: 'ren-sheng-wu-chu-bu-shi-xia-zhu',
      es: 'la-vida-es-una-serie-de-apuestas',
    },
    {
      en: 'managing-emotions-when-betting',
      zh: 'qing-xu-guan-li',
      es: 'gestionar-las-emociones-al-apostar',
    },
    {
      en: 'only-bet-what-you-can-afford-to-lose',
      zh: 'zhi-yong-kui-de-qi-de-qian',
      es: 'apuesta-solo-lo-que-puedas-perder',
    },
    {
      en: 'prediction-market-legality',
      zh: 'he-gui-nian-ling-xian-zhi',
      es: 'legalidad-de-los-mercados-de-prediccion',
    },
    {
      en: 'prediction-market-vs-sportsbook',
      zh: 'prediction-market-vs-sportsbook',
      es: 'mercado-de-prediccion-vs-casa-de-apuestas',
    },
    {
      en: 'probability-vs-expected-value',
      zh: 'ke-neng-xing-vs-qi-wang-zhi',
      es: 'probabilidad-vs-valor-esperado',
    },
    {
      en: 'types-of-prediction-markets',
      zh: 'yu-ce-shi-chang-pin-lei-di-tu',
      es: 'tipos-de-mercados-de-prediccion',
    },
    {
      en: 'welcome-to-oddevenbet',
      zh: 'huan-ying-lai-dao-oddevenbet',
      es: 'bienvenido-a-oddevenbet',
    },
    {
      en: 'what-are-affiliate-links',
      zh: 'lian-meng-lian-jie-shi-shen-me',
      es: 'que-son-los-enlaces-de-afiliado',
    },
    {
      en: 'what-is-liquidity',
      zh: 'liu-dong-xing-shi-shen-me',
      es: 'que-es-la-liquidez',
    },
    {
      en: 'what-is-live-betting',
      zh: 'gun-qiu-shi-shen-me',
      es: 'que-son-las-apuestas-en-vivo',
    },
    {
      en: 'what-is-value-betting',
      zh: 'zhao-jia-zhi',
      es: 'que-son-las-apuestas-de-valor',
    },
    {
      en: 'where-to-start',
      zh: 'xin-shou-cong-na-li-kai-shi',
      es: 'por-donde-empezar',
    },
    {
      en: 'why-most-traders-lose-money',
      zh: 'wei-shen-me-da-duo-shu-ren-kui-qian',
      es: 'por-que-la-mayoria-pierde-dinero',
    },
    {
      en: 'why-parlays-lose',
      zh: 'chuan-guan-wei-shen-me-kui',
      es: 'por-que-las-apuestas-combinadas-pierden',
    },
  ],
  'prediction-markets': [
    {
      en: 'is-polymarket-legal',
      zh: 'polymarket-he-fa-ma',
      es: 'polymarket-es-legal',
    },
    {
      en: 'polymarket-vs-kalshi',
      zh: 'polymarket-hai-shi-kalshi',
      es: 'polymarket-vs-kalshi',
    },
    {
      en: 'how-to-bet-on-us-elections',
      zh: 'da-xuan-zen-me-ya',
      es: 'como-apostar-en-las-elecciones-de-ee-uu',
    },
    {
      en: 'how-to-place-your-first-trade',
      zh: 'di-yi-dan-zen-me-xia',
      es: 'como-hacer-tu-primera-operacion',
    },
    {
      en: 'polymarket-referral-code',
      zh: 'polymarket-tui-jian-ma',
      es: 'codigo-de-referido-de-polymarket',
    },
  ],
  'niche-sports': [
    {
      en: 'mma-betting-guide',
      zh: 'ufc-mma-ru-men',
      es: 'guia-de-apuestas-mma',
    },
    {
      en: 'niche-sports-betting-guide',
      zh: 'xiao-zhong-ti-yu-ru-men',
      es: 'guia-de-deportes-de-nicho',
    },
    {
      en: 'esports-betting-guide',
      zh: 'dian-jing-xia-shu-zhi-nan',
      es: 'guia-de-apuestas-esports',
    },
    {
      en: 'darts-betting-guide',
      zh: 'fei-biao-ru-men',
      es: 'guia-de-apuestas-dardos',
    },
    {
      en: 'snooker-betting-guide',
      zh: 'si-nuo-ke-ru-men',
      es: 'guia-de-apuestas-snooker',
    },
    {
      en: 'tennis-betting-guide',
      zh: 'wang-qiu-ru-men',
      es: 'guia-de-apuestas-tenis',
    },
    {
      en: 'f1-betting-guide',
      zh: 'f1-ru-men',
      es: 'guia-de-apuestas-f1',
    },
    {
      en: 'cricket-betting-guide',
      zh: 'ban-qiu-ru-men',
      es: 'guia-de-apuestas-cricket',
    },
  ],
  'major-sports': [
    {
      en: 'soccer-betting-guide',
      zh: 'zu-qiu-xin-shou-ru-men',
      es: 'guia-de-apuestas-futbol',
    },
    {
      en: 'major-sports-betting-guide',
      zh: 'zhu-liu-ti-yu-ru-men',
      es: 'guia-de-deportes-principales',
    },
    {
      en: 'nfl-betting-guide',
      zh: 'nfl-ru-men',
      es: 'guia-de-apuestas-nfl',
    },
    {
      en: 'nba-betting-guide',
      zh: 'nba-ru-men',
      es: 'guia-de-apuestas-nba',
    },
    {
      en: 'nhl-betting-guide',
      zh: 'bing-qiu-nhl-ru-men',
      es: 'guia-de-apuestas-nhl',
    },
    {
      en: 'mlb-betting-guide',
      zh: 'mlb-ru-men',
      es: 'guia-de-apuestas-mlb',
    },
  ],
  reviews: [
    {
      en: 'polymarket-review-2026',
      zh: 'polymarket-review-2026',
      es: 'resena-de-polymarket',
    },
    {
      en: 'kalshi-review',
      zh: 'kalshi-review',
      es: 'resena-de-kalshi',
    },
    {
      en: 'best-sportsbooks',
      zh: 'zui-jia-ti-yu-bo-cai-zhan',
      es: 'mejores-casas-de-apuestas',
    },
    {
      en: 'bet365-review',
      zh: 'bet365-review',
      es: 'resena-de-bet365',
    },
    {
      en: 'best-prediction-markets-for-beginners',
      zh: 'best-prediction-markets-for-beginners',
      es: 'mejores-mercados-de-prediccion-para-principiantes',
    },
    {
      en: 'polymarket-vs-limitless',
      zh: 'polymarket-vs-limitless',
      es: 'polymarket-vs-limitless',
    },
    {
      en: 'stake-vs-bcgame',
      zh: 'crypto-bo-cai-zhan',
      es: 'stake-vs-bcgame',
    },
    {
      en: 'novig-review',
      zh: 'novig-review',
      es: 'resena-de-novig',
    },
    {
      en: 'coinbase-predict-review',
      zh: 'coinbase-predict-review',
      es: 'resena-de-coinbase-predict',
    },
    {
      en: 'fanduel-predicts-review',
      zh: 'fanduel-predicts-review',
      es: 'resena-de-fanduel-predicts',
    },
    {
      en: 'draftkings-predictions-review',
      zh: 'draftkings-predictions-review',
      es: 'resena-de-draftkings-predictions',
    },
    {
      en: 'underdog-predict-review',
      zh: 'underdog-predict-review',
      es: 'resena-de-underdog-predict',
    },
    {
      en: 'og-com-review',
      zh: 'og-com-review',
      es: 'resena-de-og-com',
    },
    {
      en: 'fanatics-markets-review',
      zh: 'fanatics-markets-review',
      es: 'resena-de-fanatics-markets',
    },
    {
      en: 'robinhood-predict-review',
      zh: 'robinhood-predict-review',
      es: 'resena-de-robinhood-predict',
    },
    {
      en: 'predictit-review',
      zh: 'predictit-review',
      es: 'resena-de-predictit',
    },
    {
      en: 'prophetx-review',
      zh: 'prophetx-review',
      es: 'resena-de-prophetx',
    },
    {
      en: 'betsio-review',
      zh: 'betsio-review',
      es: 'resena-de-betsio',
    },
    {
      en: 'apuesta360-review',
      zh: 'apuesta360-review',
      es: 'resena-de-apuesta360',
    },
    {
      en: 'pinnacle-review',
      zh: 'pinnacle-review',
      es: 'resena-de-pinnacle',
    },
    {
      en: 'ggbet-review',
      zh: 'ggbet-review',
      es: 'resena-de-ggbet',
    },
    {
      en: 'thunderpick-review',
      zh: 'thunderpick-review',
      es: 'resena-de-thunderpick',
    },
    {
      en: 'draftkings-review',
      zh: 'draftkings-review',
      es: 'resena-de-draftkings',
    },
  ],
}

type LanguageCode = (typeof locales)[number]['code']

/** Expand TRANSLATIONS into a key-lookup: language-neutral path -> target slug. */
const ALIASES: Record<string, Record<string, string>> = {}
for (const [section, groups] of Object.entries(TRANSLATIONS)) {
  for (const g of groups) {
    const present = (['en', 'zh', 'es'] as LanguageCode[])
      .filter((code) => g[code])
      .map((code) => [code, g[code] as string] as const)
    for (const [from, fromSlug] of present) {
      const key = `/${section}/${fromSlug}`
      ALIASES[key] ??= {}
      for (const [to, toSlug] of present) {
        ALIASES[key][to] = toSlug
      }
    }
  }
}

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

    // Topic pages are generated from the articles themselves (each
    // essentials/topic/[topic].astro derives getStaticPaths from its data).
    // Register only (language, topic) pairs that really have articles, or
    // sibling() would advertise a translation the build never emits.
    const essentials = await getCollection('essentials', ({ data }) => !data.draft)
    for (const entry of essentials) {
      const d = entry.data as { lang?: string; topic?: string }
      const prefix = locales.find((l) => l.code === (d.lang ?? 'en'))?.prefix ?? ''
      if (d.topic) routes.add(`${prefix}/essentials/topic/${d.topic}`)
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

  // 2. Hand-written translation table, keyed by target language code.
  const targetCode = locales.find((l) => l.prefix === targetPrefix)?.code ?? 'en'
  const alias = ALIASES[base]?.[targetCode]
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
