import type { ScoreKey } from './site'

/**
 * The platform registry. Every review, comparison and ranking page reads from
 * here, so affiliate links, fees and scores live in exactly one file.
 *
 * `affiliateUrl` is the tracked link. Leave it as null until the programme
 * approves you — the CTA component degrades to a plain "visit site" note
 * instead of shipping a broken link.
 */
export type PlatformType = 'prediction-market' | 'sportsbook'

export interface Platform {
  slug: string
  name: string
  type: PlatformType
  /** One-line positioning, used on cards and in rankings. */
  oneLiner: string
  /** True US/UK/other licence holders only. Never list an unlicensed book. */
  licence: string
  regions: string[]
  /** Human-readable, e.g. "$0 maker / 0.2% taker". */
  fees: string
  minDeposit: string
  payoutMethods: string
  payoutSpeed: string
  scores: Record<ScoreKey, number>
  bestFor: string
  watchOut: string
  affiliateUrl: string | null
  /** Filled in once the programme is live; drives the disclosure line. */
  commissionNote?: string
  launched?: number
  /** Chinese localisation of the display fields. Falls back to the English
   *  value when absent, so a missing zh string never breaks a page. */
  zh?: Partial<Pick<Platform, 'oneLiner' | 'licence' | 'regions' | 'fees' | 'minDeposit' | 'payoutMethods' | 'payoutSpeed' | 'bestFor' | 'watchOut'>>
}

/** Pick the field for a given language, falling back to the English default. */
export function localized<T extends keyof Platform>(p: Platform, key: T, lang: 'en' | 'zh'): Platform[T] {
  if (lang === 'zh' && p.zh && p.zh[key] !== undefined) return p.zh[key] as Platform[T]
  return p[key]
}

export const platforms: Platform[] = [
  {
    slug: 'polymarket',
    name: 'Polymarket',
    type: 'prediction-market',
    oneLiner: 'The deepest order book for real-world event contracts',
    licence: 'Crypto-native, offshore; US access via a separate regulated entity',
    regions: ['Global (excl. restricted jurisdictions)'],
    fees: 'No fee to post liquidity; taker fee applies on some categories',
    minDeposit: 'USDC on Polygon',
    payoutMethods: 'USDC',
    payoutSpeed: 'Instant on settlement',
    scores: { fees: 8, liquidity: 10, usability: 7, trust: 6, payout: 9, support: 5 },
    bestFor: 'Traders who want size and will accept self-custody risk',
    watchOut: 'Restricted in several jurisdictions, and it lost share to Kalshi through 2026',
    affiliateUrl: null,
    zh: {
      oneLiner: '真实世界事件合约里，订单簿最深的一个',
      licence: '加密原生、离岸运营；美国用户经一个独立受监管实体进入',
      regions: ['全球（受限司法辖区除外）'],
      fees: '挂单不收手续费；部分品类吃单收手续费',
      minDeposit: 'Polygon 上的 USDC',
      payoutMethods: 'USDC',
      payoutSpeed: '结算即时到账',
      bestFor: '想要深度、且能接受自托管风险的交易者',
      watchOut: '多个司法辖区受限，且 2026 年份额被 Kalshi 抢走不少',
    },
  },
  {
    slug: 'limitless',
    name: 'Limitless',
    type: 'prediction-market',
    oneLiner: 'Short-horizon crypto and macro markets on Base',
    licence: 'Crypto-native, no fiat licence',
    regions: ['Global (excl. restricted jurisdictions)'],
    fees: 'Per-market spread; check each market before trading',
    minDeposit: 'USDC on Base',
    payoutMethods: 'USDC',
    payoutSpeed: 'Instant on settlement',
    scores: { fees: 7, liquidity: 6, usability: 8, trust: 5, payout: 9, support: 4 },
    bestFor: 'Crypto-native users who want fast, short-dated markets',
    watchOut: 'Thinner books — large orders move the price',
    affiliateUrl: null,
    zh: {
      oneLiner: 'Base 链上的短期加密与宏观市场',
      licence: '加密原生，无法币牌照',
      regions: ['全球（受限司法辖区除外）'],
      fees: '每个盘各自有价差；下单前先看这个盘',
      minDeposit: 'Base 上的 USDC',
      payoutMethods: 'USDC',
      payoutSpeed: '结算即时到账',
      bestFor: '想要快节奏、短周期市场的加密原生用户',
      watchOut: '盘口薄——大额订单会直接把价格打飞',
    },
  },
  {
    slug: 'kalshi',
    name: 'Kalshi',
    type: 'prediction-market',
    oneLiner: 'The CFTC-regulated prediction market with fiat on-ramps',
    licence: 'CFTC-regulated exchange (US)',
    regions: ['United States (state-dependent)'],
    fees: 'Per-market trading fees; check each contract before trading',
    minDeposit: 'USD via ACH / debit card',
    payoutMethods: 'USD to bank account',
    payoutSpeed: '1-3 business days',
    scores: { fees: 6, liquidity: 6, usability: 8, trust: 9, payout: 7, support: 6 },
    bestFor: 'US users who want a licensed venue and fiat deposits',
    watchOut: 'US-only, and market depth is far shallower than Polymarket',
    affiliateUrl: null,
    zh: {
      oneLiner: '受 CFTC 监管、能用法币出入金的预测市场',
      licence: '受 CFTC 监管的交易所（美国）',
      regions: ['美国（各州情况不同）'],
      fees: '每个盘分别收交易费；下单前先看具体合约',
      minDeposit: '美元，经 ACH / 借记卡',
      payoutMethods: '美元，退回银行账户',
      payoutSpeed: '1-3 个工作日',
      bestFor: '想要持牌平台、法币入金的美国用户',
      watchOut: '仅限美国，且深度远不如 Polymarket',
    },
  },
  {
    slug: 'draftkings',
    name: 'DraftKings Sportsbook',
    type: 'sportsbook',
    oneLiner: 'State-licensed US book with the widest market menu',
    licence: 'State gaming licences (US)',
    regions: ['United States (state-dependent)'],
    fees: 'Built into the odds (vig)',
    minDeposit: '$5',
    payoutMethods: 'Bank transfer, PayPal, card, cash at retail',
    payoutSpeed: '1-3 business days',
    scores: { fees: 7, liquidity: 9, usability: 9, trust: 9, payout: 7, support: 7 },
    bestFor: 'US bettors who want a licensed book with deep same-game markets',
    watchOut: 'Promo odds are shorter than the headline suggests',
    affiliateUrl: null,
    zh: {
      oneLiner: '持美国各州牌照、市场菜单最全的体育博彩',
      licence: '美国各州博彩牌照',
      regions: ['美国（各州情况不同）'],
      fees: '已含在赔率里（抽水 vig）',
      minDeposit: '$5',
      payoutMethods: '银行转账、PayPal、银行卡、线下现金',
      payoutSpeed: '1-3 个工作日',
      bestFor: '想要持牌、且同场过关玩法深的美国投注者',
      watchOut: '宣传赔率往往比标题暗示的要短',
    },
  },
  {
    slug: 'bet365',
    name: 'bet365',
    type: 'sportsbook',
    oneLiner: 'The global benchmark for in-play depth and stream quality',
    licence: 'UKGC, Malta MGA and local licences',
    regions: ['UK', 'EU', 'Australia', 'Canada (ON)', 'Latin America'],
    fees: 'Built into the odds (vig)',
    minDeposit: 'Varies by market (often £5/$10)',
    payoutMethods: 'Card, bank transfer, e-wallet',
    payoutSpeed: '1-5 business days',
    scores: { fees: 7, liquidity: 10, usability: 8, trust: 9, payout: 7, support: 7 },
    bestFor: 'In-play bettors who care about live pricing and streams',
    watchOut: 'Account restrictions on winning accounts are well documented',
    affiliateUrl: null,
    zh: {
      oneLiner: '滚球深度与直播画质的全球标杆',
      licence: '英国 UKGC、马耳他 MGA 及各地牌照',
      regions: ['英国', '欧盟', '澳大利亚', '加拿大（安大略）', '拉丁美洲'],
      fees: '已含在赔率里（抽水 vig）',
      minDeposit: '按市场不同（通常 £5/$10）',
      payoutMethods: '银行卡、银行转账、电子钱包',
      payoutSpeed: '1-5 个工作日',
      bestFor: '在意滚球实时定价和直播的滚球玩家',
      watchOut: '对赢钱账户做限制的情况，有大量公开记录',
    },
  },
  {
    slug: 'stake',
    name: 'Stake',
    type: 'sportsbook',
    oneLiner: 'The largest crypto sportsbook with mature rakeback',
    licence: 'Offshore (Curaçao)',
    regions: ['Global (excl. restricted jurisdictions)'],
    fees: 'Built into the odds (vig)',
    minDeposit: 'Crypto (USDT, BTC, etc.)',
    payoutMethods: 'Crypto',
    payoutSpeed: 'Instant on-chain',
    scores: { fees: 7, liquidity: 8, usability: 8, trust: 5, payout: 8, support: 5 },
    bestFor: 'Crypto users who want a large, established offshore book',
    watchOut: 'Offshore licence — weak regulatory recourse',
    affiliateUrl: null,
    zh: {
      oneLiner: '体量最大的加密博彩站，返水体系成熟',
      licence: '离岸牌照（库拉索）',
      regions: ['全球（受限司法辖区除外）'],
      fees: '已含在赔率里（抽水 vig）',
      minDeposit: '加密资产（USDT、BTC 等）',
      payoutMethods: '加密资产',
      payoutSpeed: '链上即时到账',
      bestFor: '想要体量大、相对稳的加密博彩站的用户',
      watchOut: '离岸牌照，监管救济弱',
    },
  },
  {
    slug: 'bcgame',
    name: 'BC.Game',
    type: 'sportsbook',
    oneLiner: 'Crypto book known for aggressive promos and bonuses',
    licence: 'Offshore (Curaçao)',
    regions: ['Global (excl. restricted jurisdictions)'],
    fees: 'Built into the odds (vig)',
    minDeposit: 'Crypto (broad token support)',
    payoutMethods: 'Crypto',
    payoutSpeed: 'Instant on-chain',
    scores: { fees: 7, liquidity: 7, usability: 7, trust: 4, payout: 8, support: 5 },
    bestFor: 'Bonus-chasing users who want variety and low entry barriers',
    watchOut: 'Promo-heavy, offshore, and less established than Stake',
    affiliateUrl: null,
    zh: {
      oneLiner: '以激进促销和注册奖金出名的加密博彩站',
      licence: '离岸牌照（库拉索）',
      regions: ['全球（受限司法辖区除外）'],
      fees: '已含在赔率里（抽水 vig）',
      minDeposit: '加密资产（支持代币种类多）',
      payoutMethods: '加密资产',
      payoutSpeed: '链上即时到账',
      bestFor: '被促销吸引、想找低门槛花哨玩法的用户',
      watchOut: '促销多、离岸、体量不如 Stake 稳',
    },
  },
]

export const bySlug = (slug: string) => platforms.find((p) => p.slug === slug)

export const byType = (type: PlatformType) => platforms.filter((p) => p.type === type)

/** Sorted by weighted score — the single ranking used everywhere. */
export function ranked(type?: PlatformType) {
  const pool = type ? byType(type) : platforms
  return [...pool].sort((a, b) => scoreOf(b) - scoreOf(a))
}

function scoreOf(p: Platform): number {
  const w: Record<ScoreKey, number> = {
    fees: 0.2,
    liquidity: 0.2,
    usability: 0.2,
    trust: 0.2,
    payout: 0.1,
    support: 0.1,
  }
  return Object.entries(p.scores).reduce(
    (sum, [k, v]) => sum + v * w[k as ScoreKey],
    0,
  )
}
