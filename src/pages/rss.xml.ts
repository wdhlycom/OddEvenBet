import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { site } from '@/data/site'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const [essentials, predictionMarkets, nicheSports, majorSports, reviews] = await Promise.all([
    getCollection('essentials', ({ data }) => !data.draft),
    getCollection('prediction-markets', ({ data }) => !data.draft),
    getCollection('niche-sports', ({ data }) => !data.draft),
    getCollection('major-sports', ({ data }) => !data.draft),
    getCollection('reviews', ({ data }) => !data.draft),
  ])

  const items = [
    ...essentials.map((e) => ({
      title: e.data.question,
      description: e.data.description,
      pubDate: e.data.updated,
      link: `/essentials/${e.id}/`,
    })),
    ...predictionMarkets.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.updated,
      link: `/prediction-markets/${e.id}/`,
    })),
    ...nicheSports.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.updated,
      link: `/niche-sports/${e.id}/`,
    })),
    ...majorSports.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.updated,
      link: `/major-sports/${e.id}/`,
    })),
    // Platform hub articles (review / compare / best) render under /reviews/.
    ...reviews.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.updated,
      link: e.id.startsWith('zh/')
        ? `/zh/reviews/${e.id.slice(3)}/`
        : `/reviews/${e.id}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.domain,
    items,
  })
}
