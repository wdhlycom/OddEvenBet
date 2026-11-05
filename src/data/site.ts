/**
 * Single source of truth for site-wide identity.
 * Change the brand here once — header, footer, meta tags and schema all follow.
 * Domain: https://oddevenbet.com
 */
export const site = {
  name: 'OddEvenBet',
  domain: 'https://oddevenbet.com',
  tagline: 'Independent research on real-event prediction markets and licensed sports betting',
  description:
    'Hands-on reviews, side-by-side comparisons and plain-English explainers on prediction markets and licensed sportsbooks — events with a real, checkable result, not casino-style games. We publish our scoring method and say who pays us.',
  locale: 'en',
  twitter: '',
  foundedYear: 2026,
  // Shown in the footer and on /disclosure. Required by the FTC for affiliate
  // content, and by Google's reviewers when they assess trust signals.
  disclosureShort:
    'Some links on this site are affiliate links. If you sign up through one we may earn a commission — it never changes our score.',
} as const

/** The three publishing languages. Default (en) has no URL prefix. */
export const locales = [
  { code: 'en', label: 'English', prefix: '', dir: 'ltr' },
  { code: 'zh', label: '中文', prefix: '/zh', dir: 'ltr' },
  { code: 'es', label: 'Español', prefix: '/es', dir: 'ltr' },
] as const

export type LocaleCode = (typeof locales)[number]['code']

export const nav = [
  { label: 'Learn', labelZh: '学习', href: '/learn' },
  { label: 'Prediction Markets', labelZh: '预测市场', href: '/prediction-markets' },
  { label: 'Niche Sports', labelZh: '冷门运动', href: '/niche-sports' },
  { label: 'Major Sports', labelZh: '热门运动', href: '/major-sports' },
  { label: 'Reviews', labelZh: '评测', href: '/reviews' },
  { label: 'About', labelZh: '关于', href: '/about' },
] as const

export const trustNav = [
  { label: 'Methodology', labelZh: '评分方法', href: '/methodology' },
  { label: 'Disclosure', labelZh: '披露', href: '/disclosure' },
  { label: 'Responsible Gambling', labelZh: '理性博彩', href: '/responsible-gambling' },
] as const

/**
 * Scores are 0-10 and must map to the published rubric on /methodology.
 * Keep weights in one place so a scorecard and the ranking page never disagree.
 */
export const scoreDimensions = [
  { key: 'fees', label: 'Fees & payout structure', weight: 0.2 },
  { key: 'liquidity', label: 'Market depth & liquidity', weight: 0.2 },
  { key: 'usability', label: 'Usability', weight: 0.2 },
  { key: 'trust', label: 'Licensing & fund safety', weight: 0.2 },
  { key: 'payout', label: 'Payout speed & methods', weight: 0.1 },
  { key: 'support', label: 'Support & dispute handling', weight: 0.1 },
] as const

export type ScoreKey = (typeof scoreDimensions)[number]['key']

/** Weighted average — used by scorecards and the /best ranking pages. */
export function weightedScore(scores: Record<ScoreKey, number>): number {
  const total = scoreDimensions.reduce(
    (sum, d) => sum + (scores[d.key] ?? 0) * d.weight,
    0,
  )
  return Math.round(total * 10) / 10
}
