---
title: "How Prediction Markets Work"
description: "A prediction market is an exchange for events: you trade contracts that pay $1 if right and $0 if wrong, matched on an order book, with the option to exit early."
question: "How do prediction markets work?"
answer: "It has only a few moving parts: an event contract (pays $1 if right, $0 if wrong), an order book (matching buys and sells), a settlement rule (deciding who wins), and a counterparty (you're betting against a person, not the platform). Understand these and you understand the whole machine."
topic: "betting-basics"
updated: 2026-11-05
author: "Editorial Team"
related:
  - "what-is-a-prediction-market"
  - "how-prediction-market-prices-are-set"
order: 2
draft: false
---

The smallest unit in a prediction market is the <details class="term"><summary>event contract</summary><span class="term-note">A contract that pays $1 if you're right and $0 if you're wrong. It's the smallest unit you can buy or sell in a prediction market.</span></details>. Understand it first, then watch the whole machine turn.

## The event contract: a binary instrument

An event contract is a "binary" instrument — only two outcomes, only two payouts, no middle ground. Buy a "Yes" contract and only one of two things happens at settlement:

- The event happened → you receive **$1**.
- It didn't → you receive **$0**.

No partial payouts, no margin, no "close enough." That black-and-white structure is exactly what lets the price be read as a probability.

**It's not an option**: an option also pays by outcome, but its payout *scales* with how far the underlying moves; an event contract doesn't scale — a win is a win, whether the margin is one vote or a million.

**It's not a lottery ticket either**: a lottery's payout is random, and no skill can change it; an event contract's payout depends on things you can genuinely research — polls, team form, court filings. It's **skill-based**; a lottery is not.

> Whether an instrument gets called a "contract" or a "bet" determines whether it's regulated as a financial product or as gambling. The answer varies by country, and there are still lawsuits over it. All you need to remember: **it's the same instrument — what changes is which regulator claims it.**

## The whole machine has only four parts

Strip away the jargon and a prediction market has only four moving parts: the event contract, the order book, the settlement rule, and the counterparty. Understand these four and you understand the entire machine.

### The order book: where the price comes from

It's the same structure a stock exchange uses. Some people post orders to buy or sell at a price of their choosing — the makers; others accept those prices to fill immediately — the takers. The market price is where the best bid meets the best ask.

Because anyone can post an order, the price reflects the collective judgment of "everyone willing to back their view with money" — not the view of some bookmaker in the back office.

### The settlement rule: who wins and who loses

When an event resolves, it's settled against a written rule — typically "the candidate with the most certified votes" or "the team that wins in regulation." Then every contract settles to its final value.

The wording of that rule matters far more than most people realize. A contract on "Team A wins" and a contract on "Team A wins in 90 minutes" settle differently. Disputes of this kind are almost always about wording, not about facts.

### The counterparty: who you're betting against

You are never betting against the platform. You're betting against the person who sold you the contract. The platform only matches orders, runs settlement, and takes its fee.

That leads to an important consequence: no bookmaker will limit your stakes or close your account for "winning too much." But it also means the platform doesn't guarantee your counterparty is fair — what protects you is the rule and the on-chain (or regulated) settlement mechanism, not a promise.

## Exiting early

Unlike a fixed-odds bet, you don't have to hold to the end. If the price moves your way before the event, you can sell the contract and lock in the gain — the event never has to resolve. That's also why prices react to news within minutes: anyone holding a position can sell the moment information changes.

## What this page should leave you with

1. The event contract is a binary "pays $1 if right, $0 if wrong" instrument — skill-based, not luck-based.
2. The whole machine is just four parts: the contract, the order book, the settlement rule, and the counterparty.
3. You're betting against another trader, not the platform.
4. The wording of the settlement rule causes more disputes than the facts themselves.
5. Only stake money you can afford to lose.

Next: [Prediction market vs sportsbook: the real difference](/essentials/prediction-market-vs-sportsbook)