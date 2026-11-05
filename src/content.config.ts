import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

/**
 * Four content collections = four TOPIC sections in the navigation.
 *
 *   prediction-markets  ->  /prediction-markets/...
 *   niche-sports        ->  /niche-sports/...
 *   major-sports        ->  /major-sports/...
 *   learn               ->  /learn/...  (the cross-topic explainer layer)
 *
 * Each article carries a `kind` tag that says WHAT form it takes
 * (review / compare / guide / best / explainer). The form is a property of
 * the article, not its URL. The URL belongs to the topic.
 *
 * Adding an article = drop a .md file in the topic folder. Nothing else.
 */

const author = z.string().default('Editorial Team')
const updated = z.coerce.date()

/**
 * Shared fields for every topic article. `kind` selects the render path;
 * the rest are editorial metadata used by cards, bylines and schema.
 */
const topicBase = {
  title: z.string(),
  /** Meta description AND search snippet. 80-170 chars for EN; CJK packs
   *  more meaning so the lower bound is relaxed. */
  description: z.string().min(30).max(170),
  /** Short plain-English summary shown on cards and list pages. */
  summary: z.string(),
  updated,
  author,
  /** Slugs of related pages, rendered as internal links for topical authority. */
  related: z.array(z.string()).default([]),
  /** Language of this article. Default en; zh/es live under their own URL prefix. */
  lang: z.enum(['en', 'zh', 'es']).default('en'),
  /** Manual ordering within a topic list (lower = first). Falls back to date. */
  order: z.number().int().min(0).optional(),
  draft: z.boolean().default(false),
}

/**
 * REVIEW — the money pages. One platform per review.
 * Every claim must be checkable; the "watchOut" field is mandatory because a
 * review with no downsides reads as paid placement to both users and Google.
 */
const review = z.object({
  ...topicBase,
  kind: z.literal('review'),
  /** Must match a slug in src/data/platforms.ts — this is the join key. */
  platformSlug: z.string(),
  verdict: z.string(),
  pros: z.array(z.string()).min(2),
  cons: z.array(z.string()).min(1),
  bestFor: z.string(),
  notFor: z.string(),
  /** true once the affiliate link is live; gates the CTA and disclosure. */
  affiliate: z.boolean().default(false),
})

/**
 * COMPARE — head-to-head. Highest commercial intent, hardest to rank.
 * Only publish when both platforms already have a review, otherwise the page
 * has nothing to cite and reads as thin content.
 */
const compare = z.object({
  ...topicBase,
  kind: z.literal('compare'),
  left: z.string(),
  right: z.string(),
  winner: z.string(),
  verdict: z.string(),
  rows: z
    .array(z.object({ label: z.string(), left: z.string(), right: z.string() }))
    .default([]),
})

/**
 * GUIDE — how-to and strategy pages. Transactional intent, but softer than
 * reviews. Bridges Learn traffic toward the money pages.
 */
const guide = z.object({
  ...topicBase,
  kind: z.literal('guide'),
  audience: z.string(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  steps: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
})

/**
 * BEST — ranked listicles. These eat "best X for Y" queries.
 * The ordering is derived from platforms.ts scores, not hand-written, so a
 * ranking page can never contradict the review it links to.
 */
const best = z.object({
  ...topicBase,
  kind: z.literal('best'),
  scope: z.enum(['all', 'prediction-market', 'sportsbook']),
  audience: z.string(),
  criteria: z.string(),
})

/**
 * EXPLAINER — the default long-form article inside a topic.
 */
const explainer = z.object({
  ...topicBase,
  kind: z.literal('explainer'),
})

/**
 * A topic collection accepts any of the five kinds. Astro's discriminated
 * union keeps the schema honest: a `kind: "review"` file must carry the
 * review fields, and a typo fails `npm run build`.
 */
const topic = (base: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${base}` }),
    schema: z.discriminatedUnion('kind', [review, compare, guide, best, explainer]),
  })

/**
 * LEARN — the trust layer. Definitional, question-first pages.
 * Target: "what is X", "how does X work", "is X legal".
 * No affiliate CTA in the body. This layer exists to earn rankings, not clicks.
 */
const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string().min(30).max(170),
    question: z.string(),
    answer: z.string(),
    /**
     * Three-part Learn structure:
     *   getting-started   -> what the site is, how to use it
     *   betting-basics    -> how the market works (concepts/mechanics)
     *   betting-strategy  -> how to play, why people lose, common mistakes
     *   mindset           -> risk literacy / "The Edge" editorial layer
     */
    topic: z.enum(['getting-started', 'betting-basics', 'betting-strategy', 'mindset']),
    lang: z.enum(['en', 'zh', 'es']).default('en'),
    updated,
    author,
    related: z.array(z.string()).default([]),
    order: z.number().int().min(0).optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = {
  'prediction-markets': topic('prediction-markets'),
  'niche-sports': topic('niche-sports'),
  'major-sports': topic('major-sports'),
  learn,
}
