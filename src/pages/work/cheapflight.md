---
layout: ../../layouts/Project.astro
order: 0
title: cheapflight
status: active
year: 2026
lede: Watches a route and messages me the hour a fare breaks its floor.
stats:
  - { n: "25 min", label: "scan interval" }
  - { n: "0", label: "servers running" }
links:
  - { label: "source", href: "https://github.com/caubanhan/traveloka-price-alert" }
---

## Problem

Fares move all day, and the hour one drops is the only hour that matters. Checking by
hand means checking at the wrong times — and the price you want is usually gone by
evening.

There is no public API. On Traveloka a fare does not exist until the page has rendered
it in a real session, which rules out the obvious approach of fetching a URL on a timer.

## Approach

A Chrome extension, so the scan happens inside a real logged-in browser and sees exactly
what a person would see.

Every 25 minutes it opens the search, reads the fares off the rendered page, and pushes
to Telegram when one breaks the floor I set. Three things it does beyond that, because a
single threshold alert is not enough to act on:

- **New low** — re-alerts when a fare comes in 50,000 VND under the last one it reported,
  so a falling price keeps telling me it is still falling.
- **Closing window** — warns when a fare creeps back up to within 5% of the threshold.
  That is the signal to buy now or stop watching.
- **Morning summary** — one message at 8am, so silence still means something.

Commands travel the other way too. I can add or change a watch from Telegram without
going near the machine it runs on.

> **Rejected: holding job state in memory.** Chrome suspends background service workers
> to save battery, and a suspended worker loses everything mid-scan. The queue is written
> to disk instead — a scan killed halfway resumes on the next tick rather than starting
> over or dying silently. This is the decision the whole thing rests on; without it the
> tool works on a desk and fails overnight, which is exactly when it needs to work.

> **Rejected: a server-side scraper.** Cheaper to run and easier to deploy, but prices
> render client-side behind a session. A headless fetch returns a page with no fares in it.

## Result

Runs unattended on a spare machine, with the laptop free to sleep.

<!-- TODO: viết bằng lời của bạn — đã bắt được bao nhiêu lần giá đáy,
     tiết kiệm được bao nhiêu, có chuyến nào nhờ nó mà mua được không -->

One known rough edge, kept on purpose: the prices on the date strip are indicative and
measured about 22% above the real fare. Rather than trust them, the scan widens its
margin to 1.45× — it would rather open a few extra pages than miss a day worth looking at.
