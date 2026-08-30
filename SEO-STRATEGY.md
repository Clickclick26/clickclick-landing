# ClickClick — SEO Strategy & Backlog

_Last updated: 2026-08-31_

Domain: **https://www.clickclick.video/** (GitHub Pages, static one-pager)

---

## 1. Where things stand

**Good foundation already in place:**

- Server-rendered static HTML (ideal for crawling — no JS dependency for content)
- Clean `<title>`, meta description, canonical, Open Graph + Twitter cards
- `robots.txt` + `sitemap.xml`
- JSON-LD: `WebSite`, `Organization`, `ProfessionalService`

**Improvements shipped in this pass** (see section 5):

- Added `FAQPage` schema + a visible FAQ section (5 Q&As targeting real queries)
- Added `hasOfferCatalog` (5 services) to `ProfessionalService`
- Added `award`, `contactPoint`, `foundingLocation`, `slogan` to `Organization`
- `robots` meta with `max-image-preview:large` (better AI / rich previews)
- Non-render-blocking Google Fonts load (LCP win)
- `preconnect` to YouTube, `geo.*` meta, `lang` consistency fix

**The core limitation: it's one page.** A single URL can realistically rank for
the brand name and maybe one or two head terms. Every additional intent
("what is live commerce", "live shopping platform UK", "influencer marketing
agency Belfast") needs its own page to compete. Section 3 is the plan for that.

---

## 2. Target keywords

> **Positioning:** ClickClick is a **video marketing software company**, not an
> agency. Keywords, copy and schema should say "software / platform", not
> "agency / services". (Google currently shows an old title, "Click Click | Video
> Marketing Agency", for the site — see the perception-correction note in §5.)

### Tier 1 — commercial, realistic to win (low competition, high intent)

| Keyword | Monthly intent | Notes |
|---|---|---|
| video marketing software | Buyers | Primary head term — build the home page + a pillar around it |
| live commerce software / platform | Buyers | Few dedicated players — ClickClick's wedge |
| live shopping platform UK / Ireland | Buyers | Same |
| shoppable video platform | Buyers | |
| social listening software (retail / ecommerce) | Buyers | Ties to "signals" product |
| influencer marketing software / creator workflow platform | Buyers | |
| video signage software / digital signage software | Buyers | Signage module |
| TikTok Shop software / live commerce for TikTok | Buyers | Official TikTok Partner — lean in hard |
| Amazon Live tools / software | Buyers | Official Amazon Partner |
| live commerce software Belfast / UK-built | Local + national | Incumbents (ProfileTree, BlueSky, SmartVideo) are *production*, not software |

### Tier 2 — informational (feeds AI answers + top-of-funnel)

- what is live commerce / live shopping
- how does live commerce work
- live commerce vs traditional ecommerce
- what is social listening
- influencer marketing workflow / systems
- retail digital signage vs video signage
- how to sell products on live video

### Tier 3 — brand & entity

- clickclick / click click video / clickclick.video → already ranking #1
- clickclick video marketing reviews
- who owns clickclick / clickclick Belfast

### Anti-targets (don't chase)

- "video production Belfast", "corporate video", "explainer video", "video
  agency" — saturated by incumbents and off-strategy. ClickClick sells software,
  not shoots. Ranking here attracts the wrong leads and reinforces the wrong
  category.

---

## 3. Recommended page architecture

Turn the one-pager into a small hub. Each page = one keyword cluster, ~600–1,200
words, internally linked, added to `sitemap.xml`.

```
/                         Home — "Video marketing software" (positioning + overview)  ← keep
/live-commerce/           "Live commerce & live shopping software"  ← build first
/social-listening/        "Social listening software / signals for retail"
/influencer-marketing/    "Influencer marketing software & creator workflows"
/media/                   "TV advertising & video signage software"
/consultations/           "Video marketing strategy & implementation"
/about/                   Team, story, InvestNI, awards, partners (E-E-A-T page)
/case-studies/            Index + one page per client (L'Occitane, Revolución de Cuba, Astrid & Miyu)
/guides/what-is-live-commerce/   Cornerstone informational article
/guides/live-commerce-uk/        "State of live commerce in the UK" — link-bait
```

**Priority order:**

1. `/live-commerce/` — the single biggest differentiator and least contested term
2. `/about/` — real named people + credentials = E-E-A-T, helps *everything* rank
3. `/case-studies/` with at least one detailed story (real numbers if allowed)
4. `/guides/what-is-live-commerce/` — the asset AI engines will cite
5. The remaining service pages

**Each service page needs:**

- `<h1>` with the exact keyword ("Live commerce software")
- A 2–3 sentence plain-language definition near the top (AI-answer friendly)
- What ClickClick's platform specifically does
- Proof (client, partner badge, award)
- `SoftwareApplication` schema (+ `Service` for the consultation page) + `BreadcrumbList` schema
- One clear CTA to the lead form
- Internal links to 2–3 sibling pages

---

## 4. Content / AEO notes (getting cited in ChatGPT, Perplexity, Google AI Overviews)

- Lead each page with a **direct, self-contained answer** to the page's question in
  the first 1–2 sentences. AI engines lift these verbatim.
- Keep the **FAQ blocks** on every page, with `FAQPage` schema. This pass added one
  to the homepage — replicate the pattern.
- Define your terms. "Social listening signals" is your coinage; a page that clearly
  defines it means you own the definition when someone asks an LLM.
- Publish at least one **genuinely original data or opinion piece** on live commerce
  in the UK/Ireland — LLMs and journalists cite primary sources, not brochure copy.
- Make sure the company has consistent **NAP** (name, address, phone) everywhere and
  a populated **Google Business Profile** — feeds the local pack and entity graph.
- Add `sameAs` links to the `Organization` schema once social profiles exist
  (LinkedIn company page, TikTok, Instagram, YouTube, Crunchbase). Placeholder left
  out deliberately — don't ship fake URLs.

---

## 5. Technical SEO backlog

### Done in this pass
- [x] Reframed schema + copy as a **software company**: `SoftwareApplication` +
      `OfferCatalog` (software modules) replace the old `ProfessionalService`
      (agency signal); `naics` 511210 (software publishing); OG/Twitter/FAQ/chatbot
      wording aligned to "software company, not an agency"
- [x] `FAQPage` schema + visible FAQ section (incl. "Is ClickClick an agency or a software company?")
- [x] `award`, `contactPoint`, `foundingLocation`, `makesOffer` in `Organization`
- [x] `robots` meta with preview directives
- [x] Non-render-blocking font load + YouTube `preconnect`
- [x] `sitemap.xml` `lastmod` refreshed
- [x] `lang="en-GB"` consistency

### Perception correction — "agency" → "software company"
- [ ] Google is showing an outdated title (**"Click Click | Video Marketing
      Agency"**) that doesn't match the current `<title>`. After deploying,
      request re-indexing in GSC; the corrected `<title>`, H1 and schema should
      replace it within a few crawls.
- [ ] Audit off-site listings for the "agency" label: InvestNI directory, TikTok
      / Amazon partner directories, LinkedIn company "industry" field, Crunchbase,
      any press. Set them all to "Software / Software Development" and "video
      marketing software".
- [ ] Rewrite the `/about/` line "founded by experienced agency owners" →
      keep the credibility but frame as "founded by agency veterans who became
      software builders" so the page doesn't self-identify as an agency.
- [x] `<title>` kept as "ClickClick | Video Marketing Software & Strategy |
      Belfast" — software-first, "& Strategy" retained per founder. `og:title` /
      `twitter:title` match.

### Next (no new pages required)
- [ ] **Lazy-load the hero YouTube embed** behind a click/scroll facade (a poster
      image + play button that swaps in the iframe). The autoplay iframe is the
      biggest Core Web Vitals cost on the page (LCP + main-thread blocking).
- [ ] Serve **WebP/AVIF** for the BTS polaroids and `og-image.png`; they're large PNGs.
- [ ] Add explicit `width`/`height` on every `<img>` that's missing it (CLS).
- [ ] Consider a stronger, keyword-bearing `<h1>`. Current `From creatives to cart.`
      is great branding but carries no query. Option that keeps the visual:
      ```html
      <h1 class="hero-title">
        <span class="hero-kicker">Video marketing software &amp; strategy</span>
        <span class="hero-line">From creatives</span>
        <span class="hero-line"><em>to</em> cart.</span>
      </h1>
      ```
      (style `.hero-kicker` small/uppercase above the big line).
- [ ] Add `BreadcrumbList` schema once sub-pages exist.
- [ ] Self-reference `hreflang="en-gb"` + `x-default` if you ever add `/ie/` content.
- [ ] Add a human-readable `/humans.txt` and keep `security.txt` in mind (minor).

### Measurement
- [ ] Google Search Console: confirm the **domain property** (`clickclick.video`)
      is verified, not just the URL-prefix one. Submit `sitemap.xml`.
- [ ] Request indexing for the homepage after this deploy so the new schema is picked up.
- [ ] Validate structured data: https://validator.schema.org/ and Google's
      Rich Results Test — paste the deployed URL after release.
- [ ] Set up Bing Webmaster Tools (feeds ChatGPT search).
- [ ] Baseline the homepage in PageSpeed Insights now; re-check after the YouTube
      facade change.
- [ ] Track rankings for the Tier 1 list monthly (even a spreadsheet + incognito checks).

---

## 6. Off-page / authority

- **Directory + citation consistency:** Invest NI directory, TikTok Partner
  directory, Amazon Partner Network, UK Startup Awards winners page, Belfast/NI
  tech ecosystem lists (Catalyst, Digital DNA). Each is a relevant, trusted link.
- **PR angle:** "Belfast startup building live-commerce software, TikTok + Amazon
  partner, UK Startup Awards winner" is a clean local-press + trade-press story.
  Target: Belfast Telegraph business, Sync NI, UlsterBusiness, The Drum, Retail Week.
- **Client backlinks:** ask L'Occitane / Astrid & Miyu / Revolución de Cuba for a
  case-study link or logo-wall mention where appropriate.
- **Founder profiles:** LinkedIn articles + podcast guest spots on ecommerce/retail
  shows. Personal authority transfers to the domain over time.
- Avoid paid link schemes and low-quality guest-post networks.

---

## 7. 90-day sequence

**Weeks 1–2:** Deploy this pass. Verify GSC domain property, submit sitemap,
run Rich Results Test, baseline PageSpeed + rankings.

**Weeks 3–6:** Build `/live-commerce/` and `/about/`. Add `Service` + `Breadcrumb`
schema. Internal-link from homepage. Lazy-load hero video.

**Weeks 7–10:** Publish `/guides/what-is-live-commerce/` cornerstone article and
first `/case-studies/` page. Start directory/citation submissions.

**Weeks 11–13:** Remaining service pages. First PR push. Review GSC
Performance report — double down on any query showing impressions but low position.
