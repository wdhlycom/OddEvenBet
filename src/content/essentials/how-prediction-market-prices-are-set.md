---
title: "How Prediction Market Prices Are Set"
description: "Price comes from the order book, not an oracle. Here's how makers and takers work, where the spread comes from, and why $0.65 means '65% likely,' not a payout."
question: "How are prediction market prices set?"
answer: "Prices are set by the limit orders in the order book, not by an oracle. And a price of $0.65 means the market thinks the event is about 65% likely — it's a probability, not a payout multiple."
topic: "betting-basics"
updated: 2026-11-05
author: "Editorial Team"
related:
  - "how-prediction-markets-work"
  - "what-is-liquidity"
order: 4
draft: false
---

In a prediction market there's no oracle announcing "this is 62% likely." There's only a long list of orders. The midprice is the point where the best buy and best sell meet.

And what that price *means* is exactly where beginners get most confused. This article clears up two things at once: **where the price comes from**, and **what the price is actually saying**.

## Where the price comes from: three kinds of people

| Participant | What they do | What they earn |
|---|---|---|
| Maker | Posts a limit order and waits | The spread, sometimes a rebate |
| Taker | Eats the spread, fills immediately | Nothing — they pay the spread |
| Arbitrageur | Checks external prices, corrects the gap | The gap, if they're fast enough |

## Why there's a spread

A <details class="term"><summary>market maker</summary><span class="term-note">Someone who continuously posts quotes on both sides and earns the spread — their presence keeps the market liquid.</span></details> quoting 0.60 / 0.62 means: I'll buy at 0.60 and sell at 0.62. Between fills, they carry the risk of "holding inventory." The 2-cent <details class="term"><summary>spread</summary><span class="term-note">The distance between the bid and the ask — the cost you pay the instant you enter and exit.</span></details> in the middle is their compensation for "maybe being wrong." On a contract priced near $0.50, a 2-cent spread is 4% of your capital — already large relative to the edge most retail traders actually hold.

## What the price is saying: it's not a payout multiple

The most common misunderstanding in this space is treating the price as a payout. **It isn't. The price is a probability.** Those are two different things, and confusing them is exactly why beginners lose money on events they "called correctly."

A contract settles at $1 or $0. If the market price is $0.65, the market is saying the event is about 65% likely to happen. The mapping is one-to-one:

- $0.65 = 65%
- $0.30 = 30%
- $0.98 = 98%

Nothing else. The price isn't a payout multiple, isn't a rate of return. It's the market's collective estimate of probability, priced in dollars.

## Why $0.90 isn't "safe"

Say you buy "Yes" at $0.90. What happens?

- **You win**: the contract settles at $1. You risked $0.90 to make **$0.10** — about 11%.
- **You lose**: the contract settles at $0. You lose the **entire $0.90**.

Now ask what "safe" means. A $0.90 price means a 10% chance of losing everything. Out of a hundred such positions, ten lose it all. If you stake your whole net worth on a "90% safe" thing, the one failure out of ten wipes you out — while each of the nine wins pays you 11 cents.

## The expected value view

If you buy at price *p* and the true probability is exactly *p*, your expected return is zero, minus fees. You only make money when **you believe the true probability is higher than the market price**. The whole game is a disagreement about probability, not a bet on the outcome.

If you buy at $0.65 believing the true probability is 75%, your edge is 10 points — but you'll still lose 25% of the time. Edge pays off across many trades, never through one.

## Thin markets stay mispriced longer

Liquidity isn't spread evenly. An election market can absorb a six-figure order without the price budging. A niche market — say, a single court ruling or a corporate announcement — may have only one market maker posting a 10-cent spread. In markets like that, the price reflects "one person's inventory," not "a crowd's judgment."

That's the most common way beginners lose on "sure wins": they weren't wrong about the outcome, but the spread ate their entire edge.

## A practical rule

Before buying any contract, write down two numbers:

1. **What I believe the true probability is.**
2. **What the market price is.**

If your number isn't clearly higher than the price, the trade doesn't hold — however "obvious" the outcome feels. Most people skip step one entirely, which is exactly why most people lose.

## What this page should leave you with

1. Price comes from the order book, set jointly by makers, takers, and arbitrageurs.
2. Price = probability, not a payout multiple.
3. A $0.90 "favorite" still has a 10% chance of wiping you out.
4. You only have an edge when your believed probability is above the market price.
5. Only stake money you can afford to lose.

Next: [What is liquidity?](/essentials/what-is-liquidity)