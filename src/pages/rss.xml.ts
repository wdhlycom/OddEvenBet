import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { site } from '@/data/site'
import type { APIContext } from 'astro'

export async function GET(context: APIContext) {
  const [learn, predictionMarkets, nicheSports, majorSports] = await Promise.all([
    getCollection('learn', ({ data }) => !data.draft),
    getCollection('prediction-markets', ({ data }) => !data.draft),
    getCollection('niche-sports', ({ data }) => !data.draft),
    getCollection('major-sports', ({ data }) => !data.draft),
  ])

  const items = [
    ...learn.map((e) => ({
      title: e.data.question,
      description: e.data.description,
      pubDate: e.data.updated,
      link: `/learn/${e.id}/`,
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
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())

  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.domain,
    items,
  })
}
