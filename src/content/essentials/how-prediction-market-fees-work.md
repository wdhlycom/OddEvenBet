---
title: "How Prediction Market Fees Work"
description: "Prediction market fees hit takers, not makers, and peak near $0.50. Here's the fee formula, the spread, and what they do to your edge."
question: "How are prediction market fees calculated?"
answer: "There are two costs: the taker fee (charged by the platform) and the spread (charged by the market). The taker fee peaks around 50% probability, and the spread is often the larger, overlooked cost."
topic: "betting-basics"
updated: 2026-11-04
author: "Editorial Team"
related:
  - "how-prediction-market-prices-are-set"
  - "what-is-liquidity"
order: 6
draft: false
---

Prediction market fees come in two kinds, and you must treat them separately: the **taker fee** (charged by the platform) and the **spread** (charged by the market itself). Beginners usually see only the first and miss the second — even though the second is often the bigger cost.

## The taker fee: why it peaks near 50%

On crypto-native markets, the fee is usually calculated like this:

```
fee = shares × rate × price × (1 − price)
```

The `price × (1 − price)` term is a parabola. It's 0 when the price is 0 or 1, and hits its maximum of 0.25 at $0.50. So the fee is highest when the market is most uncertain, and lowest when the outcome is nearly decided.

The intuition holds too: when everyone agrees on the result (price near 0 or 1), there's little new information to match, so the platform charges less; when the market is a 50/50 dogfight, matching is costly, so the fee is high.

## Makers pay nothing, and sometimes get a rebate

If you post a limit order and let someone else trade against it, you're the maker. Most platforms charge makers nothing, and even pay a small rebate, because your order is what gives the market liquidity.

Which is also why this fee structure is effectively "farming" a small group of market makers to stay online — and why "everyone is a trader" is a myth. The genuinely cheap default position is *providing* liquidity, which requires carrying inventory risk and usually writing code.

## The spread: the cost everyone forgets

The spread is the gap between the price you can buy at and the price you can sell at. If the best bid is $0.59 and the best ask is $0.61, the spread is $0.02.

On a $0.60 contract, a $0.02 spread means you lose about **3.3%** of your capital the moment you enter, because selling back right away only gets you 0.59. A round trip charges the spread twice: once in, once out.

For a short trade with a small edge, the spread alone can exceed your entire expected profit.

## What this means for your edge

Add the taker fee and the spread together and ask yourself: does my probability judgment give me an edge that clears both costs? On a $0.60 contract, a 2-cent spread plus a 1-cent taker fee means your round-trip cost is around 4–5%. If your edge is only 2 or 3 points, you're paying the market to trade against you.

An uncomfortable conclusion: most manual traders, in mid-price, short-horizon markets, are structurally behind before they even place the order. The fee curve and the spread aren't friction you can ignore — they *are* the game.

Next: [How prediction market withdrawals work](/essentials/how-prediction-market-withdrawals-work)