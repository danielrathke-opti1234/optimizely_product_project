import React, { useEffect, useMemo, useState } from "react";

/* ============================================================
   THE AGENTIC PERSONALIZATION MATURITY MODEL
   Built from: Katie's 2024 Lucid board, Dan's client research,
   the Product Designer briefing, the CMAB deck, Sathya's answers,
   and the Customer Outcomes ELT slide.
   ============================================================ */

const C = {
  lf: "#ABFF44",
  grass: "#7DDD3D",
  gtg: "#3AB533",
  fir: "#08251A",
  midFir: "#0D4A29",
  lightFir: "#197B5D",
  n1: "#FFFFFF",
  n3: "#E4F0DA",
  blue: "#91DBDA",
  darkBlue: "#0D707B",
  pink: "#FF9BBA",
  sand: "#FFF0CC",
};

/* ---------- THE SEVEN DECISIONS BEHIND EVERY PERSONALIZATION ---------- */

const DECISIONS = [
  { id: 1, short: "Where", full: "Where should we personalize?" },
  { id: 2, short: "Who", full: "Who or what context should we personalize for?" },
  { id: 3, short: "Ready?", full: "Does the data actually support this?" },
  { id: 4, short: "What", full: "What should change for them?" },
  { id: 5, short: "How", full: "Which capability fits this situation?" },
  { id: 6, short: "Measure", full: "How will we know it worked?" },
  { id: 7, short: "Next", full: "What do we do about the result?" },
];

/* ---------------------- THE MATURITY MODEL ---------------------- */

const LEVELS = [
  {
    id: 1,
    tag: "Level 1",
    name: "Manual",
    sub: "Mark is absent",
    swatch: C.n3,
    ink: C.fir,
    carries: [],
    population: "Where roughly a third of accounts sit",
    strap: "A human makes all seven decisions, alone, before anything ships. The platform delivers what was already decided elsewhere.",
    humanDoes: [
      "Stares at analytics hoping an opportunity appears",
      "Builds the same audience two or three times in two or three tools",
      "Writes every variant by hand, or doesn't ship",
      "Finds out the tracking was wrong after the campaign failed",
      "Screenshots four dashboards into one slide",
    ],
    agentDoes: ["Nothing"],
    unblocks: [],
    stuckOn: [
      "“Because I'm just a one person show, sometimes I feel I run out of ideas.”",
      "No shared definition of an audience anywhere in the stack",
    ],
    trustHeadline: "No trust required — and that is exactly the problem",
    trustBody:
      "Nothing has been handed over, so nothing scales. Every campaign costs the same as the last one. The ceiling here is one person's available hours, and that ceiling is why personalization programmes quietly get deprioritised.",
    features: [
      { n: "Web Experimentation audiences", d: "Geo, device, source, referrer. Already in the plan." },
      { n: "CMS visitor groups", d: "Built-in targeting where the content already lives." },
      { n: "ODP — instrumentation", d: "Collect events and identity now, or Level 3 is closed to you later." },
    ],
    gates: ["A named owner, even part-time", "One agreed primary metric", "Top entry pages known by volume"],
    ttv: "Every campaign costs what the last one cost",
  },
  {
    id: 2,
    tag: "Level 2",
    name: "Mark Assists",
    sub: "It suggests, you approve everything",
    swatch: C.lf,
    ink: C.fir,
    carries: [1, 4],
    population: "The realistic first step for most of the base",
    strap: "Mark removes the blank canvas and the content bottleneck. It drafts; the human still decides and approves every single thing that ships.",
    humanDoes: [
      "Reviews and approves or rejects each suggestion",
      "Still owns the audience, the approach, the metric, the decision",
      "Keeps full authorship — nothing goes live unseen",
    ],
    agentDoes: [
      "Crawls the site, reads the traffic, points at where relevance would actually matter",
      "Drafts the variants — or finds the asset you already own and forgot about",
      "Turns a blank campaign builder into a starting position",
    ],
    unblocks: ["Ideation doesn't scale", "Content creation is the bottleneck", "No dedicated resourcing"],
    stuckOn: [
      "“We don't have the capacity to produce the amount of content needed for small, hyper-personalized audiences, without AI.”",
    ],
    trustHeadline: "Draft by default. Nothing ships without you.",
    trustBody:
      "This level exists because it carries almost no decision risk — which makes it the cheapest possible place to earn credibility. Mark is visibly useful before it is ever consequential. Customers who skip straight to autonomy without this step have no reason to believe the recommendations when they arrive.",
    features: [
      { n: "Personalization Strategist VT", d: "Starts from their traffic, content and goals instead of a blank canvas." },
      { n: "Mark-assisted content variants", d: "Removes the production ceiling on small audiences." },
      { n: "Content Recommendations", d: "Surface what they already made. Cheaper than generating anything new." },
      { n: "Personalization Campaigns (Web Exp)", d: "The rules workhorse the suggestions land in." },
    ],
    gates: ["An audience worth the effort, not twelve people", "Someone who can approve without a two-week queue"],
    ttv: "First suggestion to live campaign in a day",
  },
  {
    id: 3,
    tag: "Level 3",
    name: "Mark Advises",
    sub: "It chooses the how, you choose the what",
    swatch: C.grass,
    ink: C.fir,
    carries: [1, 3, 4, 5],
    population: "Where the ambitious accounts are heading",
    strap: "Mark assesses readiness, assembles the audience from data they already have, and recommends the approach — rules, test, or bandit — without making the marketer learn the feature names first.",
    humanDoes: [
      "Decides who matters and what the experience should say",
      "Accepts or overrides the recommended approach",
      "Presses go",
    ],
    agentDoes: [
      "Tells them what is missing before they build, not after it fails",
      "Reads what data is usable across ODP, RTS, CRM, Tealium, list attributes",
      "Recommends rules vs A/B vs CMAB from the actual situation",
      "Names the metric the campaign should move",
    ],
    unblocks: [
      "Data access and confidence",
      "Integration confusion",
      "Terminology as a barrier",
      "Proof of value — is the juice worth the squeeze",
    ],
    stuckOn: [
      "“We forget about the personalization type of experiment within Optimizely, I think because it's nested under experiment creation.”",
    ],
    trustHeadline: "Show the reasoning and show the gaps",
    trustBody:
      "A recommendation without a rationale is just a different blank canvas. At this level Mark must be able to say why it recommended this approach, which signals it found usable, and what is not yet good enough to launch on. Being told 'your tracking won't support this yet' is a trust-building moment, not a failure.",
    features: [
      { n: "Behavior Targeting", d: "Onsite behaviour as intent, without needing a data analyst." },
      { n: "ODP Real-Time Segments", d: "Qualifies in-session rather than overnight." },
      { n: "Salesforce Audience / Tealium / CRM", d: "Use the data they already have. Don't make them re-enter it." },
      { n: "Product & Content Recommendations", d: "Catalogue relevance without authoring per segment." },
      { n: "Readiness checks (proposed)", d: "Make the eight readiness dimensions visible in-product." },
    ],
    gates: ["Event tracking trusted enough to target on", "A clear owner for audience definitions", "Primary metric instrumented end to end"],
    ttv: "Data readiness is the long pole, not build time",
  },
  {
    id: 4,
    tag: "Level 4",
    name: "Mark Decides",
    sub: "Within guardrails you set",
    swatch: C.gtg,
    ink: C.n1,
    carries: [1, 2, 3, 4, 5, 6],
    population: "A small minority today — and the current trust frontier",
    strap: "The human defines the option set, the boundaries and the metric. Mark decides who sees which option, continuously, and keeps learning while the campaign runs.",
    humanDoes: [
      "Defines the credible options and the guardrails",
      "Sets the metric the system optimises toward",
      "Reviews what the system learned and why",
    ],
    agentDoes: [
      "Allocates traffic by learning instead of a hand-written rule",
      "Learns which experience works for which context without every combination being defined upfront",
      "Reports results that end in a decision, not a number",
    ],
    unblocks: ["Reporting that doesn't add up", "Rule sprawl — hand-writing more rules forever", "Picking a winner too early"],
    stuckOn: [
      "“CMAB has an education and trust problem before it has a configuration problem.”",
      "“Customers understand the value — they struggle to trust it enough to launch.”",
    ],
    trustHeadline: "Show the work, in the moment, while it is deciding",
    trustBody:
      "This is where a human gives up the pen, and it is the single hardest adoption step in the model. The product has to be able to say, at any moment: here is what I am weighing, here are the options in play, here is what I have learned so far, and here is what I would do next. Explainability is not a reporting feature here — it is the thing that makes the capability sellable.",
    features: [
      { n: "Contextual Multi-Armed Bandits (CMAB)", d: "Multiple viable treatments, learned across visitor context." },
      { n: "Autonomous Optimization", d: "Optimises toward the primary metric without manual check-ins." },
      { n: "Dynamic Experience", d: "Composition that adapts rather than branching into rule sprawl." },
      { n: "Personalization Hub (proposed)", d: "Name, Audience, Status, Uplift, Justification — one place, finally." },
      { n: "Optimizely Analytics", d: "Results consolidated — coordinate with the OA migration." },
    ],
    gates: [
      "Genuinely multiple credible options — nobody already knows the winner",
      "Enough traffic and enough time to learn",
      "One clear primary metric and real visitor context",
      "Meaningful differences between the experiences",
    ],
    ttv: "Configured in days, learns over weeks",
  },
  {
    id: 5,
    tag: "Level 5",
    name: "Mark Orchestrates",
    sub: "You govern, it runs the loop",
    swatch: C.fir,
    ink: C.lf,
    carries: [1, 2, 3, 4, 5, 6, 7],
    population: "The target state, not the entry price",
    strap: "Nobody wrote a rule for this person. Mark reasons about the individual, decides what to change, generates it, decides what to measure, and decides what to do next. The human role becomes governance and review.",
    humanDoes: [
      "Sets the boundaries: what Mark may and may not change",
      "Defines the approval checkpoints that matter",
      "Reviews the audit trail, not every decision",
    ],
    agentDoes: [
      "Assembles an audience of one in the moment from everything known",
      "Produces the experience at a scale manual production cannot reach",
      "Closes its own loop — measures, learns, adjusts, without being asked",
      "Serves the agents now browsing the site, not only the humans",
    ],
    unblocks: ["Each channel is its own island", "Manual production isn't viable", "Nobody can see the whole picture"],
    stuckOn: [
      "Measurement at n=1 — unsolved, see the Trust tab",
      "“Relevancy is really hard to measure. A lot of what you're doing with personalization is qualitative, not quantitative.”",
    ],
    trustHeadline: "Show the boundaries and keep the receipts",
    trustBody:
      "Full autonomy with no checkpoint is precisely what erodes the trust clients do not yet have. The governance surface has to be designed before the autonomy is, not bolted on after: an explicit remit, a visible audit trail, a way back, and a measurement story that survives an audience of one.",
    features: [
      { n: "Limitless 1:1 Personalization (Mark + CMS)", d: "Bespoke pages at a scale nobody can staff." },
      { n: "Front-end Experience Agent (Mark + Graph)", d: "Finds the relevant thing before a returning visitor bounces." },
      { n: "Personalization Strategist VT, end to end", d: "Opportunity through to the next decision, not just ideation." },
      { n: "Agentic-legible experiences", d: "The site readable by the agents doing the browsing." },
    ],
    gates: [
      "A measurement model that works without a control group",
      "Defined checkpoints: what is approved vs what runs free",
      "Governance on what Mark is permitted to change",
      "In regulated sectors, a compliance boundary Mark cannot cross",
    ],
    ttv: "Continuous — there is no launch moment",
  },
];

/* ---------------------- EASE OF EXECUTION ---------------------- */

const EASE = [
  {
    job: "Find the opportunity",
    today: "A person stares at analytics and hopes something jumps out. Ideas come from one person's bandwidth.",
    agentic: "Mark reads the traffic, the content and the goals, then points at where relevance would actually change an outcome.",
    feature: "Personalization Strategist VT",
    level: 2,
  },
  {
    job: "Define the audience",
    today: "The same audience is rebuilt in web, in app, and in the data platform, because none of them share a definition.",
    agentic: "Define it once. Mark reads what is available across ODP, RTS, CRM and list attributes and assembles it.",
    feature: "ODP RTS, Salesforce Audience, Behavior Targeting",
    level: 3,
  },
  {
    job: "Know if you're ready",
    today: "You find out the tracking, content or audience size was insufficient after the campaign underperforms.",
    agentic: "Mark runs the readiness check before a sprint is spent and says plainly what is missing.",
    feature: "Readiness guidance (design gap)",
    level: 3,
  },
  {
    job: "Choose the approach",
    today: "Rules, A/B, or bandit? The marketer has to understand the Optimizely feature before they can pick.",
    agentic: "Describe the situation in plain language. Mark recommends the simplest capability that fits and explains why.",
    feature: "Fit check → Rules / A/B / CMAB",
    level: 3,
  },
  {
    job: "Create the content",
    today: "The hard ceiling. No capacity to produce variants for small audiences, so the audience gets widened until it's meaningless.",
    agentic: "Mark drafts the variants, or surfaces the asset already in the library. The ceiling stops being the ceiling.",
    feature: "Mark content variants, Content Recs",
    level: 2,
  },
  {
    job: "Decide who sees what",
    today: "A human writes every if/then, then writes more forever as the combinations multiply.",
    agentic: "Mark allocates by learning across context, so no one has to predefine every audience-treatment pair.",
    feature: "CMAB, Autonomous Optimization",
    level: 4,
  },
  {
    job: "Measure it",
    today: "Results live in separate dashboards per channel. Someone manually screenshots four tools into a slide.",
    agentic: "One surface, one result, with the justification attached to the campaign that produced it.",
    feature: "Personalization Hub + Optimizely Analytics",
    level: 4,
  },
  {
    job: "Decide what's next",
    today: "The report shows a number and the marketer is left staring at a chart.",
    agentic: "The report ends in a decision: keep, change, expand, stop, or reuse — and at Level 5 Mark acts on it.",
    feature: "Autonomous Optimization, Strategist VT",
    level: 5,
  },
];

/* ---------------------- CLIENT REALITY ---------------------- */

const BLOCKERS = [
  {
    t: "Data access and confidence",
    d: "Data exists across ODP, Salesforce Audience, Tealium, list attributes and behavioural signals — but customers cannot tell what is actually usable.",
    fix: "Mark reads what is connected and reports what is usable, in plain language, before anything is built.",
    lvl: 3,
  },
  {
    t: "Resourcing",
    d: "Almost nobody has dedicated personalization headcount. It is another responsibility bolted onto marketing, experimentation, digital or growth.",
    fix: "Mark absorbs the work that does not need a human judgement call, which is most of the setup.",
    lvl: 2,
  },
  {
    t: "Content creation",
    d: "The single most-cited ceiling. A strong use case dies because nobody can produce the variants.",
    fix: "Generate the variant, or surface the asset they already own. Reuse first — it's cheaper and available today.",
    lvl: 2,
  },
  {
    t: "QA and execution bottlenecks",
    d: "Setup, QA, approvals and cross-functional dependencies make even simple ideas hard to get live.",
    fix: "Draft-by-default with a single approval surface collapses the queue without removing the checkpoint.",
    lvl: 2,
  },
  {
    t: "Proof of value",
    d: "“Is the juice worth the squeeze?” They are weighing planning, audience work, content, design, dev, QA, coordination, measurement and maintenance — not licence cost.",
    fix: "Agentic execution changes the squeeze, not just the juice. That is the actual ROI argument.",
    lvl: 3,
  },
  {
    t: "Integration confusion",
    d: "Multiple sources of customer data, no clear line from any of them to the experience a visitor sees.",
    fix: "The user should never need to understand the integration architecture to understand the opportunity.",
    lvl: 3,
  },
  {
    t: "Terminology",
    d: "The same capability is called different things in different products, and personalization is buried under experiment creation.",
    fix: "Start from the marketer's question. The capability name should arrive last, if at all.",
    lvl: 3,
  },
];

const READINESS = [
  "Available customer and behavioural data",
  "Confidence in that data",
  "Traffic volume",
  "Content and experience resources",
  "Measurement readiness",
  "Operational maturity",
  "Internal ownership",
  "Understanding of the capability",
];

const ASKS = [
  ["Help me identify opportunities", "Start from my traffic, content and goals. Not a blank canvas.", 2],
  ["Help me choose the right approach", "Tell me if this is a rule, a test, or an adaptive approach. I don't know which fits.", 3],
  ["Use the data I already have", "It's already in other systems. Don't make me re-enter it.", 3],
  ["Tell me what is missing", "Warn me before I build, not after it fails.", 3],
  ["Help me understand what to show", "Recommend the message, image or CTA. Don't hand me an empty box.", 2],
  ["Help me measure whether it mattered", "Tell me if the whole experience improved, not just whether something got clicked.", 4],
  ["Tell me what to do next", "Keep it, change it, expand it, or kill it. Don't leave me staring at a chart.", 5],
];

const PROOF = [
  {
    n: "Copeland",
    d: "Helped contractors find the right replacement part faster by surfacing compatibility tools and cross-reference lookups earlier in the visit.",
    l: "The conversation shifted from ‘where can we personalize’ to ‘where can relevance actually improve someone's journey’. CMAB also landed better framed as decision support than as an algorithm.",
  },
  {
    n: "Sysco",
    d: "Recognised what a visitor was already signalling interest in and surfaced the most relevant content when several options could have fit.",
    l: "The investment got easier to justify once the team could name the specific customer behaviour they were trying to move.",
  },
  {
    n: "Tapestry",
    d: "Used experiments to find what works broadly, analytics to find where audiences genuinely differ, then personalized only where the evidence supported it.",
    l: "Personalization sells itself better when it is backed by evidence instead of a hunch.",
  },
  {
    n: "Extra Space Storage",
    d: "CMAB became understandable once it was attached to their actual landing page use case and the practical question of which treatment fits which visitor context.",
    l: "Tie it to a real campaign decision. Never explain it as a standalone feature.",
  },
];

const FRAMING = [
  ["Here is Behavior Targeting.", "A contractor who keeps looking up replacement parts sees compatibility tools and distributor resources earlier."],
  ["This account belongs to this group, so show this message.", "A strategic account showing repeated pricing and technical research gets more relevant proof points."],
  ["Create a new experience for every segment.", "Surface the right calculator, guide or customer story from the library the team already has."],
  ["Configure a contextual multi-armed bandit.", "You have five good ideas and no way to know which wins. Let it learn while it runs."],
];

/* ---------------------- JOURNEY FUNNELS ---------------------- */

const FUNNELS = {
  media: {
    name: "Media & Publishing",
    blurb:
      "Their customer journey runs from an anonymous referral click to a paying habit. Almost all value sits in recirculation and in picking the right moment to ask for something.",
    guardrail: null,
    rows: [
      { step: "Arrive", doing: "Lands from search, social or an aggregator, with no relationship", ch: "Web, AMP, app", sig: "Referrer, article topic, device, time of day", play: "Lead the recirculation with the reason they came, instead of the editorial default", lvl: 2 },
      { step: "Read & recirculate", doing: "Consumes one article, decides in seconds whether to read a second", ch: "Web, app", sig: "Scroll depth, topic affinity, session count", play: "The related-content rail reorders around what they have actually read", lvl: 3 },
      { step: "Register", doing: "Hits a soft wall and weighs giving up an email", ch: "Web, app", sig: "Article count, return frequency, topic value", play: "Learn which prompt, at which article number, converts which kind of reader", lvl: 4 },
      { step: "Subscribe", doing: "Hits the paywall and decides whether this is worth paying for", ch: "Paywall, checkout, email", sig: "Meter position, acquisition source, topics consumed", play: "The offer and the framing chosen per visitor rather than one house price", lvl: 4 },
      { step: "Build the habit", doing: "Decides whether this becomes a daily destination", ch: "Newsletter, push, app, web", sig: "Topics chosen, open behaviour, dwell", play: "A personal edition assembled for them each day", lvl: 5 },
      { step: "Retain", doing: "Drifts, then lapses, usually without warning", ch: "Email, app, web, billing", sig: "Declining frequency, lapse-risk signals", play: "Pre-empt the churn with a reason to come back, chosen for them", lvl: 5 },
    ],
  },
  software: {
    name: "Software Solutions",
    blurb:
      "Their journey crosses the marketing site, the docs, and the product itself. The hardest handoff is web to in-product, and it is usually where personalization stops dead.",
    guardrail: null,
    rows: [
      { step: "Discover", doing: "Researching a problem, reading docs and comparisons before talking to anyone", ch: "Web, docs site, blog", sig: "Search term, referrer, firmographic match", play: "Lead with the use case that matches their segment, not the horizontal pitch", lvl: 2 },
      { step: "Evaluate", doing: "A buying group circles pricing and technical pages repeatedly", ch: "Web, docs, sales-assist", sig: "Repeat pricing plus technical views, account match, multiple contacts", play: "Surface proof points matched to the role that is doing the researching", lvl: 3 },
      { step: "Trial", doing: "Signs up for a trial or free tier with a specific job in mind", ch: "Product, onboarding email", sig: "Signup source, stated use case, ICP fit", play: "Tailor the onboarding path to the job they signed up to do", lvl: 3 },
      { step: "Activate", doing: "Either reaches first value quickly, or quietly stops logging in", ch: "In-product, email, in-app messaging", sig: "Feature adoption, time to first value, drop-off point", play: "Learn which in-app nudge gets which user to value fastest", lvl: 4 },
      { step: "Convert & expand", doing: "Hits a limit, adds seats, or needs an adjacent module", ch: "In-product, web, email, CSM", sig: "Usage against limits, seat growth, module gaps", play: "Reason about the right upgrade moment and the right offer for this account", lvl: 5 },
      { step: "Renew", doing: "Usage drifts and the renewal conversation gets harder", ch: "In-product, CSM, email", sig: "Usage decline, support signals, champion change", play: "Surface the risk and the intervention before the renewal call", lvl: 5 },
    ],
  },
  finserv: {
    name: "Financial Services",
    blurb:
      "A long, trust-led, heavily regulated journey with a notorious drop-off at application. Mark's remit has to be explicitly bounded before any of this is buyable.",
    guardrail:
      "Regulated: Mark operates only on consented signals, and anything touching rates, terms or eligibility language stays behind a human approval checkpoint.",
    rows: [
      { step: "Educate", doing: "Researching rates and products, running calculators, comparing", ch: "Web, search landing, guides", sig: "Topic entry, calculator inputs, return visits", play: "Surface the explainer and the calculator that match the question they arrived with", lvl: 2 },
      { step: "Qualify", doing: "Checking eligibility and narrowing to two or three options", ch: "Web, pre-qual form, app", sig: "Calculator completion, product views, session depth", play: "Assemble the eligibility-matched shortlist and flag which signals are actually permitted", lvl: 3 },
      { step: "Apply", doing: "Starts an application and abandons it partway, often on mobile", ch: "Web flow, mobile app, branch", sig: "Drop-off step, time on step, channel switch", play: "Learn which reassurance framing recovers which abandonment context", lvl: 4 },
      { step: "Fund & onboard", doing: "Opens the product but does not finish setting it up", ch: "App, email, secure inbox", sig: "Setup steps outstanding, account age, first-use behaviour", play: "A next-best-action assembled per customer instead of a static welcome", lvl: 4 },
      { step: "Deepen", doing: "Holds one product, could hold three", ch: "App dashboard, email, branch", sig: "Balance behaviour, tenure, life-event proxies", play: "Reason about the right next product and suppress what they already hold", lvl: 5 },
      { step: "Service & retain", doing: "Hits a problem and decides how they feel about the brand", ch: "Support, app, IVR, web", sig: "Recent issue, declining engagement, channel switching", play: "Pre-empt the question before the ticket is opened", lvl: 5 },
    ],
  },
  health: {
    name: "Healthcare",
    blurb:
      "Their journey mixes anxious anonymous research with highly sensitive known-patient interaction. The value is in reducing friction to care, not in conversion.",
    guardrail:
      "PHI-bounded: Mark personalizes on non-PHI or explicitly consented signals, and clinical content is never Mark-authored without clinical review.",
    rows: [
      { step: "Research symptoms", doing: "Searching a condition, often worried, usually anonymous", ch: "Web, search landing", sig: "Condition topic, location, device, time", play: "Lead with the service-line explainer that matches the question, not the org chart", lvl: 2 },
      { step: "Find care", doing: "Looking for a provider, a location, and whether they are covered", ch: "Provider directory, web, app", sig: "Specialty viewed, location, insurance selector, repeat visits", play: "Assemble a matched shortlist of providers and locations instead of a full directory", lvl: 3 },
      { step: "Schedule", doing: "Tries to book, gives up, calls instead, or does nothing", ch: "Scheduling portal, app, call centre", sig: "Availability shown, drop-off point, device", play: "Learn which scheduling prompt and which slot presentation converts by context", lvl: 4 },
      { step: "Prepare", doing: "Needs to do things before the visit and frequently does not", ch: "Email, SMS, patient portal", sig: "Appointment type, prep steps outstanding, prior no-show", play: "Personalized prep sequencing aimed squarely at no-show reduction", lvl: 4 },
      { step: "Follow through", doing: "Has a care plan and adherence falls off over weeks", ch: "Portal, app, email, SMS", sig: "Care plan stage, follow-up due, engagement history", play: "A nudge assembled per patient at the moment adherence usually drops", lvl: 5 },
      { step: "Stay engaged", doing: "Eligible for programmes and screenings nobody told them about", ch: "Portal, email, app", sig: "Programme eligibility, engagement history, life stage", play: "Proactively surface the programme that fits, within consent", lvl: 5 },
    ],
  },
  retail: {
    name: "B2C Retail",
    blurb:
      "High volume, short cycle, enormous catalogue. The whole journey is about narrowing choice fast and then earning the second purchase.",
    guardrail: null,
    rows: [
      { step: "Discover", doing: "Clicks an ad or a social post and lands somewhere generic", ch: "Web, app, paid landing", sig: "Campaign source, ad creative, geo, device", play: "The landing experience leads with what they clicked, not the house hero", lvl: 2 },
      { step: "Browse", doing: "Scrolls a category and bounces if nothing fits within seconds", ch: "Web, app", sig: "Category dwell, repeat product views, filters used", play: "Reorder the grid toward demonstrated interest and available stock", lvl: 3 },
      { step: "Consider", doing: "Views the same product three times and still does not buy", ch: "Web, app, email, retargeting", sig: "Repeat views without purchase, price sensitivity", play: "Learn which reassurance — reviews, returns, delivery — unlocks which hesitation", lvl: 4 },
      { step: "Check out", doing: "Reaches the cart and stalls at cost or delivery", ch: "Web, app, checkout", sig: "Cart value, shipping threshold, stock", play: "The right nudge from several viable ones, chosen per visitor", lvl: 4 },
      { step: "Repeat", doing: "Comes back on a cadence, or does not come back", ch: "Web, app, email, push", sig: "Purchase cadence, season, weather, size history", play: "An edit assembled for this person, in stock, in their size", lvl: 5 },
      { step: "Advocate", doing: "Becomes a loyal customer or quietly churns to a competitor", ch: "Email, app, loyalty", sig: "Lifetime value, category breadth, lapse risk", play: "Reason about the right retention move per customer instead of a blanket offer", lvl: 5 },
    ],
  },
  b2bmfg: {
    name: "B2B Manufacturing & Distribution",
    blurb:
      "A technical, repeat-purchase journey where the buyer is doing a job, not shopping. Copeland and Sysco both live here — the wins came from removing friction, not from persuasion.",
    guardrail: null,
    rows: [
      { step: "Spec research", doing: "A technician or buyer researches what will actually fit", ch: "Web, docs, catalogue, PDF spec sheets", sig: "Category viewed, doc downloads, firmographic", play: "Surface the compatibility tool and cross-reference lookup earlier in the visit", lvl: 2 },
      { step: "Identify the item", doing: "Hunts for the right part among thousands of near-identical ones", ch: "Catalogue, site search, app", sig: "Search terms, prior orders, equipment owned", play: "Narrow the catalogue to what fits their equipment and their account", lvl: 3 },
      { step: "Quote or cart", doing: "Several products could fit and they need to choose", ch: "Web, rep, EDI, quote tool", sig: "Account pricing, order history, cart composition", play: "Surface the most relevant option when several genuinely fit", lvl: 4 },
      { step: "Order & reorder", doing: "Buys the same things on a predictable rhythm", ch: "Web, app, rep, EDI", sig: "Purchase cadence, SKU history, seasonality", play: "Reorder prompt at the interval that matches their actual pattern", lvl: 4 },
      { step: "Expand the account", doing: "Buys three categories from you and five from someone else", ch: "Web, email, rep", sig: "Category gaps, entitlement, share-of-wallet signals", play: "Reason about the adjacent category and suppress what they already buy", lvl: 5 },
      { step: "Support", doing: "Has a problem and calls, because self-serve did not answer it", ch: "Support portal, docs, rep", sig: "Issue history, products owned, recent orders", play: "Pre-empt the support question using what you already know they bought", lvl: 5 },
    ],
  },
};

/* ---------------------- ELT FOUR PROBLEMS ---------------------- */

const PROBLEMS = [
  {
    n: "01",
    tint: C.n3,
    title: "B2B: reach known accounts with bespoke content",
    quote: "We have a defined universe of landing pages that must be built at scale and manual production isn't viable.",
    metric: "Account engagement, call booked, click-through",
    answer: "Limitless 1:1 Personalization — Mark + CMS",
    status: "NEW",
    lvl: 5,
    customers: "NICE, Suse",
    pattern: { c: "Target account in active evaluation", s: "Firmographic match plus repeated pricing and technical research", n: "Proof this vendor understands their industry", e: "A landing page assembled for that account", o: "Meeting accepted" },
  },
  {
    n: "02",
    tint: "#DCF3C8",
    title: "Keep returning visitors engaged and going deeper",
    quote: "I have recurring visitors and a lot of content. Help them find what's most relevant before they bounce.",
    metric: "Bounce rate, pages/session, lower-funnel content",
    answer: "Front-end Experience Agent — Mark + Graph",
    status: "NEW",
    lvl: 5,
    customers: "KPMG, Outrigger, Teledyne",
    pattern: { c: "Returning visitor with a content history", s: "Prior sessions, topics consumed, funnel position", n: "Get to the next useful thing without searching", e: "The library reordered around them", o: "Deeper session, lower-funnel content reached" },
  },
  {
    n: "03",
    tint: C.blue,
    title: "Pick the best option from a short list",
    quote: "I have 5–20 treatments, variations, or offers. I need to show the right one to each visitor.",
    metric: "Aggregated conversions, sign-ups, transactions",
    answer: "Available today — Web, CMS, RTS, CMAB",
    status: "TODAY",
    lvl: 4,
    customers: "Pizza Hut, Capital One",
    pattern: { c: "Any visitor with usable context", s: "Device, source, geography, session behaviour", n: "The most persuasive of several good options", e: "The treatment most likely to work for this context", o: "Conversion on the primary metric" },
  },
  {
    n: "04",
    tint: C.sand,
    title: "Surface the right item from a massive catalog",
    quote: "I have hundreds of thousands of SKUs. I need to surface 3–5 for each visitor to make a sale.",
    metric: "Revenue per visit, add-to-cart, units per order",
    answer: "Today + gaps — Content or Product Recommendations",
    status: "TODAY + GAPS",
    lvl: 3,
    customers: "Frasers",
    pattern: { c: "Shopper facing too much choice", s: "Browse history, purchase history, stock and size", n: "A short, credible shortlist", e: "Three to five items assembled for them", o: "Revenue per visit" },
  },
];

/* ---------------------- PRIMITIVES ---------------------- */

function Pill({ children, bg, fg, border }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: bg, color: fg, border: border ? `1px solid ${border}` : "none" }}
    >
      {children}
    </span>
  );
}

function LevelBadge({ n }) {
  const l = LEVELS[n - 1];
  return (
    <span
      className="inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{ backgroundColor: l.swatch, color: l.ink, border: `1px solid ${C.fir}22` }}
    >
      L{n} · {l.name}
    </span>
  );
}

function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: C.fir }}>
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>{sub}</p>}
    </div>
  );
}

function DecisionDots({ carries, ink }) {
  return (
    <div className="flex gap-1">
      {DECISIONS.map((d) => {
        const on = carries.includes(d.id);
        return (
          <span
            key={d.id}
            title={d.full}
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: on ? ink : "transparent", border: `1.5px solid ${ink}`, opacity: on ? 1 : 0.35 }}
          />
        );
      })}
    </div>
  );
}

/* ---------------------- TAB: MATURITY ---------------------- */

function Maturity() {
  const [active, setActive] = useState(2);
  const l = LEVELS[active - 1];

  return (
    <div>
      <SectionTitle
        eyebrow="The model"
        title="Maturity is not how advanced your features are. It is how much you have handed over."
        sub="Every personalization involves the same seven decisions. A client's maturity is simply how many of those decisions Mark is trusted to carry — which makes this a trust ladder with features attached, not a feature ladder with trust bolted on."
      />

      {/* the seven decisions legend */}
      <div className="mb-8 rounded-2xl p-5" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>
          The seven decisions behind every personalization
        </div>
        <div className="flex flex-wrap gap-2">
          {DECISIONS.map((d) => (
            <span key={d.id} className="rounded-full px-3 py-1.5 text-xs font-semibold" style={{ backgroundColor: C.n3, color: C.fir }}>
              {d.id}. {d.full}
            </span>
          ))}
        </div>
      </div>

      {/* level strip */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {LEVELS.map((lv) => {
          const on = lv.id === active;
          return (
            <button
              key={lv.id}
              onClick={() => setActive(lv.id)}
              className="rounded-2xl p-4 text-left transition-all duration-150"
              style={{
                backgroundColor: on ? lv.swatch : C.n1,
                color: on ? lv.ink : C.fir,
                border: `2px solid ${on ? C.fir : `${C.fir}22`}`,
                transform: on ? "translateY(-3px)" : "none",
                boxShadow: on ? `0 6px 0 0 ${C.fir}` : "none",
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">{lv.tag}</div>
              <div className="mt-1 text-lg font-extrabold leading-tight">{lv.name}</div>
              <div className="mt-1 text-xs font-semibold opacity-80">{lv.sub}</div>
              <div className="mt-4 flex items-center gap-2">
                <DecisionDots carries={lv.carries} ink={on ? lv.ink : C.fir} />
                <span className="text-[11px] font-bold opacity-80">{lv.carries.length}/7</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mb-8 rounded-2xl p-4" style={{ backgroundColor: C.sand, border: `1px solid ${C.fir}22` }}>
        <p className="text-sm" style={{ color: C.fir }}>
          <span className="font-extrabold">The honest read on the base:</span> the overwhelming majority of accounts are
          at Level 1 or 2, and Level 2 is a genuinely great place to be. This model exists to make the next step
          obvious — not to make anyone feel behind. Nobody jumps from Level 1 to Level 5, and the ones who try are the
          ones who stall.
        </p>
      </div>

      {/* detail */}
      <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="flex flex-wrap items-center gap-3">
          <Pill bg={l.swatch} fg={l.ink} border={`${C.fir}33`}>{l.tag} · {l.name}</Pill>
          <Pill bg={C.n3} fg={C.fir}>{l.carries.length} of 7 decisions carried by Mark</Pill>
          <Pill bg={C.n3} fg={C.fir}>{l.ttv}</Pill>
        </div>
        <p className="mt-5 text-xl font-bold leading-snug md:text-2xl" style={{ color: C.fir }}>{l.strap}</p>

        {/* human vs Mark */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.n3, border: `1px solid ${C.fir}22` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>
              What the human still does
            </div>
            <ul className="mt-3 space-y-2">
              {l.humanDoes.map((x, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: C.fir }}>
                  <span className="font-bold" style={{ color: C.gtg }}>—</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>
              What Mark carries
            </div>
            <ul className="mt-3 space-y-2">
              {l.agentDoes.map((x, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: C.n1 }}>
                  <span className="font-bold" style={{ color: C.lf }}>—</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* trust */}
        <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.pink }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.fir }}>
            The trust this level requires before anyone will use it
          </div>
          <h4 className="mt-2 text-lg font-extrabold" style={{ color: C.fir }}>{l.trustHeadline}</h4>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>{l.trustBody}</p>
        </div>

        {/* blockers + features */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            {l.unblocks.length > 0 && (
              <>
                <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>
                  Client blockers this removes
                </h4>
                <div className="mb-6 flex flex-wrap gap-2">
                  {l.unblocks.map((u, i) => (
                    <Pill key={i} bg={C.lf} fg={C.fir} border={`${C.fir}33`}>{u}</Pill>
                  ))}
                </div>
              </>
            )}
            <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>
              What clients say here
            </h4>
            <div className="space-y-3">
              {l.stuckOn.map((s, i) => (
                <p key={i} className="border-l-2 pl-3 text-sm italic leading-relaxed" style={{ borderColor: C.gtg, color: `${C.fir}C0` }}>
                  {s}
                </p>
              ))}
            </div>
            <h4 className="mb-3 mt-6 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>
              What has to be true
            </h4>
            <ul className="space-y-2">
              {l.gates.map((g, i) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: C.fir }}>
                  <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded" style={{ backgroundColor: C.lf, border: `1px solid ${C.fir}` }} />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>
              The features that live at this level
            </h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {l.features.map((f, i) => (
                <div key={i} className="rounded-xl p-4" style={{ backgroundColor: C.n3, border: `1px solid ${C.fir}22` }}>
                  <div className="text-sm font-extrabold" style={{ color: C.fir }}>{f.n}</div>
                  <div className="mt-1 text-xs leading-relaxed" style={{ color: `${C.fir}B0` }}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- TAB: TRUST ---------------------- */

function Trust() {
  const guarantees = [
    {
      t: "Explainability",
      q: "What is it doing and why?",
      d: "The system can say, in the moment: here is what I am weighing, here are the options in play, here is what I have learned so far, and here is what I would do next. Not a report after the fact — a live answer.",
    },
    {
      t: "Boundedness",
      q: "What is it allowed to touch?",
      d: "Mark's remit is explicit and visible. Which surfaces, which content, which audiences, which decisions require approval. In regulated sectors this is not a nice-to-have, it is the precondition for any conversation at all.",
    },
    {
      t: "Reversibility",
      q: "What happens when it's wrong?",
      d: "There is always a way back, and the client knows where it is before they need it. The perceived cost of trying is a function of how easy it is to undo.",
    },
    {
      t: "Evidence",
      q: "How do I know it worked?",
      d: "The result is legible and honest, including when it did not work. A system that never reports a loss is a system nobody believes about a win.",
    },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="The precondition"
        title="Every decision we take off their plate has to be replaced with something they can see"
        sub="This is the whole design principle. Agentic personalization makes execution dramatically easier, and that ease is worth nothing if the client will not press go. The research is unambiguous: customers understand the value and struggle to trust it enough to launch."
      />

      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>
          The finding that should shape the roadmap
        </div>
        <p className="mt-3 text-2xl font-extrabold leading-snug md:text-3xl" style={{ color: C.n1 }}>
          “CMAB has an education and trust problem before it has a configuration problem.”
        </p>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          That sentence is about bandits, but it is true at every level of autonomy. The moment a human gives up the
          pen — whether that is accepting a drafted headline or letting a system assemble an experience for one named
          person — the same discomfort appears. It scales with autonomy. So the visibility we offer has to scale with it
          too, in lockstep. Build the approval surface first and the autonomy second.
        </p>
      </div>

      {/* the ladder */}
      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>The trust ladder, matched to the maturity model</h3>
      <div className="mb-10 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["Level", "What they hand over", "The guarantee that makes it acceptable"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LEVELS.map((l, i) => (
              <tr key={l.id} style={{ backgroundColor: i % 2 ? C.n3 : C.n1 }}>
                <td className="px-4 py-4 align-top"><LevelBadge n={l.id} /></td>
                <td className="px-4 py-4 align-top text-sm font-semibold" style={{ color: C.fir }}>
                  {l.carries.length === 0 ? "Nothing" : `${l.carries.length} of the 7 decisions`}
                  <div className="mt-1 text-xs font-normal" style={{ color: `${C.fir}A0` }}>{l.sub}</div>
                </td>
                <td className="px-4 py-4 align-top text-sm" style={{ color: C.fir }}>
                  <span className="font-extrabold">{l.trustHeadline}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* four guarantees */}
      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>Four guarantees, owed at every level</h3>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {guarantees.map((g, i) => (
          <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="text-2xl font-extrabold" style={{ color: C.gtg }}>{i + 1}</div>
            <h4 className="mt-2 text-lg font-extrabold" style={{ color: C.fir }}>{g.t}</h4>
            <p className="mt-1 text-sm font-semibold italic" style={{ color: C.lightFir }}>{g.q}</p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{g.d}</p>
          </div>
        ))}
      </div>

      {/* fit inputs trust */}
      <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[
          ["Fit", "There genuinely need to be multiple credible options where the team does not already know which one wins. If they know the answer, adaptive personalization is theatre."],
          ["Inputs", "Enough traffic, enough time, a clear metric, and real context about the visitor. Without these the system cannot learn, and a system that cannot learn destroys trust faster than no system."],
          ["Trust", "The product can explain what is influencing the decision, what it is weighing, and what it has learned. This is the one we control entirely through design."],
        ].map(([t, d], i) => (
          <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: i === 2 ? C.lf : C.n3, border: `2px solid ${C.fir}` }}>
            <h4 className="text-xl font-extrabold" style={{ color: C.fir }}>{t}</h4>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}C0` }}>{d}</p>
          </div>
        ))}
      </div>

      {/* regulated */}
      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.blue, border: `2px solid ${C.fir}` }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.fir }}>
          Regulated sectors change the shape of the conversation
        </div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight" style={{ color: C.fir }}>
          In financial services and healthcare, boundedness is the first question, not the last
        </h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>
          These buyers cannot evaluate autonomy until they can see its limits. An explicit remit — which signals are in
          scope, which content requires human or clinical approval, what is logged, what can be rolled back — is what
          moves the conversation from interesting to procurable. Designing that boundary well is not a compliance tax;
          it is the thing that opens two large, underserved verticals.
        </p>
      </div>

      {/* measurement */}
      <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>
          The unsolved problem, stated plainly rather than hidden
        </div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight" style={{ color: C.n1 }}>
          If only one person ever sees their version, there is no control group
        </h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          Significance testing assumes many people see the same variant. One-to-one personalization breaks that maths
          entirely — and it is already hard at the segment level, where relevancy is largely qualitative. This is the
          single biggest barrier between Level 4 and Level 5, and it is a trust problem before it is a statistics
          problem. Candidate directions worth testing with clients: holdback populations instead of variant comparison,
          journey-level outcome measurement instead of single-event conversion, and honest model-confidence reporting
          instead of borrowed p-values. Raising this before a client does is itself a trust move.
        </p>
      </div>
    </div>
  );
}

/* ---------------------- TAB: EASE ---------------------- */

function Ease() {
  return (
    <div>
      <SectionTitle
        eyebrow="Why agentic changes the economics"
        title="The squeeze, not the juice"
        sub="Clients keep asking whether personalization is worth the effort. They are not weighing licence cost — they are weighing planning, audience definition, content, design, development, QA, coordination, measurement and maintenance. Agentic personalization is the first thing that changes the cost side of that equation rather than arguing harder about the benefit side."
      />

      <div className="mb-8 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[1000px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["The job", "What it costs today", "With Mark carrying it", "How", "From"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EASE.map((e, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 ? C.n3 : C.n1 }}>
                <td className="px-4 py-4 align-top text-sm font-extrabold" style={{ color: C.fir }}>{e.job}</td>
                <td className="px-4 py-4 align-top text-xs leading-relaxed" style={{ color: `${C.fir}A0` }}>{e.today}</td>
                <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: C.fir }}>{e.agentic}</td>
                <td className="px-4 py-4 align-top text-xs font-semibold" style={{ color: C.lightFir }}>{e.feature}</td>
                <td className="px-4 py-4 align-top"><LevelBadge n={e.level} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          ["Day one", "A client at Level 1 with nothing configured can have Mark read their site and hand back a ranked list of where personalizing would actually matter. No data project, no integration, no sprint.", C.n3],
          ["Week one", "Pick one suggestion. Mark drafts the variants or finds the assets already in the library, tells you whether the audience and tracking will support it, and you approve and ship it.", C.lf],
          ["Month one", "You have run several, the reporting is in one place, and Mark is recommending which approach fits the next one. That is Level 3, reached without a platform migration.", C.grass],
        ].map(([t, d, bg], i) => (
          <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: bg, border: `2px solid ${C.fir}` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>{t}</div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: C.fir }}>{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <h3 className="text-xl font-extrabold" style={{ color: C.fir }}>The sequencing rule this all depends on</h3>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {["Customer need", "Audience or context", "Experience", "Measurement", "Capability"].map((s, i, arr) => (
            <React.Fragment key={s}>
              <span className="rounded-full px-4 py-2 text-sm font-bold" style={{ backgroundColor: i === 4 ? C.lf : C.n3, color: C.fir, border: `1px solid ${C.fir}33` }}>{s}</span>
              {i < arr.length - 1 && <span className="font-bold" style={{ color: C.gtg }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
          Capability comes last, and often never needs naming at all. The inverse — capability, then configuration, then
          a hunt for a use case — is what produces the terminology blocker, the abandoned campaign builder, and the
          client who forgets personalization exists because it is nested under experiment creation.
        </p>
      </div>
    </div>
  );
}

/* ---------------------- TAB: CLIENT REALITY ---------------------- */

function Reality() {
  return (
    <div>
      <SectionTitle
        eyebrow="Two years of client sessions"
        title="They are not short of ideas. They are short of confident execution."
        sub="This is the evidence base the rest of the model is built on — the recurring blockers, the readiness dimensions that actually determine whether someone can launch, what clients literally ask for, and what landed when we changed how we talked about it."
      />

      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>The seven recurring blockers — and where agentic answers each</h3>
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {BLOCKERS.map((b, i) => (
          <div key={i} className="flex flex-col rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-extrabold leading-tight" style={{ color: C.fir }}>{b.t}</h4>
              <LevelBadge n={b.lvl} />
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: `${C.fir}A0` }}>{b.d}</p>
            <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>What agentic changes</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{b.fix}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mb-2 text-xl font-extrabold" style={{ color: C.fir }}>Readiness, not entitlement, decides what a client can run</h3>
      <p className="mb-4 max-w-4xl text-sm" style={{ color: `${C.fir}B0` }}>
        Access to an advanced capability does not mean anyone is ready to use it. These eight dimensions are what
        actually determine whether a campaign gets launched, and making them visible in-product is the single most
        useful thing we could build for the Level 1 and Level 2 majority.
      </p>
      <div className="mb-12 flex flex-wrap gap-2">
        {READINESS.map((r, i) => (
          <span key={i} className="rounded-full px-4 py-2 text-sm font-semibold" style={{ backgroundColor: C.lf, color: C.fir, border: `1px solid ${C.fir}33` }}>{r}</span>
        ))}
      </div>

      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>What clients literally ask for</h3>
      <div className="mb-12 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[780px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["What they say", "What they mean", "Answered at"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ASKS.map(([s, m, lv], i) => (
              <tr key={i} style={{ backgroundColor: i % 2 ? C.n3 : C.n1 }}>
                <td className="px-4 py-4 align-top text-sm font-extrabold italic" style={{ color: C.fir }}>“{s}”</td>
                <td className="px-4 py-4 align-top text-sm" style={{ color: `${C.fir}C0` }}>{m}</td>
                <td className="px-4 py-4 align-top"><LevelBadge n={lv} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-12 rounded-2xl p-5" style={{ backgroundColor: C.lf, border: `2px solid ${C.fir}` }}>
        <p className="text-base font-bold" style={{ color: C.fir }}>
          Read that column of asks end to end and it describes one product: clients are not asking for more targeting
          knobs. They are asking for a decision-making partner. That is the definition of agentic personalization, in
          their words, before we had a name for it.
        </p>
      </div>

      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>What landed in the room, and what did not</h3>
      <div className="mb-12 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[780px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: `${C.n1}99` }}>Feature-first — loses people</th>
              <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>Use-case-first — lands</th>
            </tr>
          </thead>
          <tbody>
            {FRAMING.map(([a, b], i) => (
              <tr key={i} style={{ backgroundColor: i % 2 ? C.n3 : C.n1 }}>
                <td className="px-4 py-4 align-top text-sm line-through" style={{ color: `${C.fir}70` }}>{a}</td>
                <td className="px-4 py-4 align-top text-sm font-semibold" style={{ color: C.fir }}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>Proof from the sessions themselves</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROOF.map((p, i) => (
          <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <h4 className="text-lg font-extrabold" style={{ color: C.fir }}>{p.n}</h4>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{p.d}</p>
            <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>The lesson</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{p.l}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>They asked for this two years ago</div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            "AI could recommend and create an audience based on what it's seen in all our integrated tools.",
            "With AI, Optimizely could crawl the website, see what the traffic is like, and recommend areas for tests, to reduce manual effort.",
            "I would like to use AI to empower business teams to do low-level stuff that they don't need my team's help with.",
            "We're considering offering the ability to use AI-generated copy tests to do basic optimizations.",
          ].map((q, i) => (
            <p key={i} className="border-l-2 pl-4 text-sm italic leading-relaxed" style={{ borderColor: C.lf, color: `${C.n1}CC` }}>“{q}”</p>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          Agentic personalization is not a new idea we are introducing to clients. It is the thing they described to us
          in 2024, which we can finally build. That is a much stronger opening line than any capability pitch.
        </p>
      </div>
    </div>
  );
}

/* ---------------------- TAB: FUNNELS ---------------------- */

function Funnels() {
  const [key, setKey] = useState("media");
  const f = FUNNELS[key];

  return (
    <div>
      <SectionTitle
        eyebrow="Their journey, their channels"
        title="Where personalization applies across the customer journey a client already owns"
        sub="Every client has a version of this journey and already talks about it internally. The job is to let them recognise their own funnel, see which moments are personalizable, which of their channels the signal lives in, and what they would need to be trusted with to run it. Pick the closest industry — the shape transfers."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {Object.entries(FUNNELS).map(([k, v]) => {
          const on = k === key;
          return (
            <button
              key={k}
              onClick={() => setKey(k)}
              className="rounded-full px-5 py-2 text-sm font-bold transition-colors"
              style={{ backgroundColor: on ? C.fir : C.n1, color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}
            >
              {v.name}
            </button>
          );
        })}
      </div>

      <p className="mb-4 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{f.blurb}</p>

      {f.guardrail && (
        <div className="mb-6 rounded-2xl p-4" style={{ backgroundColor: C.blue, border: `2px solid ${C.fir}` }}>
          <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: C.fir }}>Guardrail · </span>
          <span className="text-sm" style={{ color: C.fir }}>{f.guardrail}</span>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[1080px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["Journey moment", "What their customer is doing", "Their channels", "Signal available", "The agentic play", "Needs"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {f.rows.map((r, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 ? C.n3 : C.n1 }}>
                <td className="px-4 py-4 align-top text-sm font-extrabold" style={{ color: C.fir }}>{r.step}</td>
                <td className="px-4 py-4 align-top text-xs leading-relaxed" style={{ color: `${C.fir}C0` }}>{r.doing}</td>
                <td className="px-4 py-4 align-top text-xs font-semibold" style={{ color: C.darkBlue }}>{r.ch}</td>
                <td className="px-4 py-4 align-top text-xs leading-relaxed" style={{ color: `${C.fir}C0` }}>{r.sig}</td>
                <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: C.fir }}>{r.play}</td>
                <td className="px-4 py-4 align-top"><LevelBadge n={r.lvl} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl p-5" style={{ backgroundColor: C.n3, border: `1px solid ${C.fir}22` }}>
          <p className="text-sm" style={{ color: C.fir }}>
            <span className="font-extrabold">How a client should use this.</span> Map their own journey stages onto the
            left column first, in their own language, before looking at anything else. If the stages do not match, the
            stages are wrong — not their business. The value is in seeing that personalization is not one thing they do
            on the homepage, it is a different job at every stage, across channels they already run.
          </p>
        </div>
        <div className="rounded-2xl p-5" style={{ backgroundColor: C.lf, border: `1px solid ${C.fir}22` }}>
          <p className="text-sm" style={{ color: C.fir }}>
            <span className="font-extrabold">Read the right column honestly.</span> A client operating at Level 2 can
            genuinely do the Level 2 rows this quarter. The Level 4 and 5 rows are the reason to keep going, not this
            quarter's commitment. Selling past readiness is the fastest way to spend the trust the whole model depends
            on.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- TAB: PROBLEMS ---------------------- */

function Problems() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <SectionTitle
        eyebrow="Customer outcomes"
        title="The four problems, placed on the ladder"
        sub="The ELT slide says what we solve and with which product. The missing column is what the client must already be capable of — and the five-part pattern that makes any of these explainable in a single breath."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PROBLEMS.map((p) => {
          const on = open === p.n;
          return (
            <div
              key={p.n}
              onClick={() => setOpen(on ? null : p.n)}
              className="flex cursor-pointer flex-col rounded-3xl p-6 transition-transform duration-150"
              style={{
                backgroundColor: p.tint,
                border: `2px solid ${C.fir}`,
                transform: on ? "translateY(-4px)" : "none",
                boxShadow: on ? `0 6px 0 0 ${C.fir}` : "none",
              }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold" style={{ backgroundColor: C.fir, color: C.lf }}>{p.n}</div>
              <h3 className="text-lg font-extrabold leading-tight" style={{ color: C.fir }}>{p.title}</h3>
              <p className="mt-3 text-sm italic leading-relaxed" style={{ color: `${C.fir}C0` }}>“{p.quote}”</p>
              <p className="mt-4 text-xs" style={{ color: C.fir }}><span className="font-extrabold">Metric:</span> {p.metric}</p>
              <div className="mt-5"><LevelBadge n={p.lvl} /></div>
              <div className="mt-4 rounded-2xl px-4 py-3 text-center text-xs font-extrabold leading-snug" style={{ backgroundColor: C.midFir, color: C.n1 }}>
                <div className="opacity-70">{p.status}</div>
                <div className="mt-1">{p.answer}</div>
              </div>
              <div className="mt-3 text-center text-[11px]" style={{ color: `${C.fir}99` }}>{p.customers}</div>
              {on && (
                <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: C.n1, border: `1px solid ${C.fir}33` }}>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>Customer → Signal → Need → Experience → Outcome</div>
                  {[["Customer", p.pattern.c], ["Signal", p.pattern.s], ["Need", p.pattern.n], ["Experience", p.pattern.e], ["Outcome", p.pattern.o]].map(([k, v]) => (
                    <div key={k} className="mb-2 last:mb-0">
                      <div className="text-[10px] font-extrabold uppercase" style={{ color: C.gtg }}>{k}</div>
                      <div className="text-xs" style={{ color: C.fir }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 text-center text-[11px] font-semibold" style={{ color: `${C.fir}80` }}>{on ? "Close" : "See the pattern"}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl p-5" style={{ backgroundColor: C.sand, border: `2px solid ${C.fir}` }}>
        <p className="text-sm" style={{ color: C.fir }}>
          <span className="font-extrabold">Worth noticing:</span> two of the four flagship answers sit at Level 5, and
          the client base sits at Level 1 and 2. That is not a reason to change the bets — it is the reason this model
          exists. Without a visible ladder, the two Level 5 answers read as aspirational to almost every account we
          show them to.
        </p>
      </div>
    </div>
  );
}

/* ---------------------- TAB: FIT CHECK ---------------------- */

const QS = [
  { id: "where", q: "Do you know where in your customer journey this matters?" },
  { id: "who", q: "Do you know which audience or context you're personalizing for?" },
  { id: "what", q: "Do you already know what experience you want to show them?" },
  { id: "options", q: "Do you have several credible options where nobody knows the winner?" },
  { id: "reach", q: "Will enough people realistically see this for it to matter?" },
  { id: "metric", q: "Is there one clear metric that should visibly move?" },
  { id: "content", q: "Can you produce or reuse the content this needs?" },
];

function FitCheck() {
  const [a, setA] = useState({});
  const answered = Object.keys(a).length;

  const rec = useMemo(() => {
    if (answered < QS.length) return null;
    if (!a.where) return { t: "Start with opportunity identification", s: "You are earlier than campaign design, and that is fine — it is where most people are. Let Mark read your traffic, content and goals and hand back a ranked list of where relevance would actually change an outcome. This is Level 2 and it needs nothing configured first.", tone: C.lf, lvl: 2 };
    if (!a.metric) return { t: "Not ready — fix measurement first", s: "There is no point launching something nobody can judge. Name the single metric this should move and instrument it. Being told this before the sprint is spent is worth more than any feature on the roadmap.", tone: C.pink, lvl: null };
    if (!a.reach) return { t: "Not ready — the reach is not there", s: "A real lift on a group nobody sees is still nothing. Widen the audience, move to higher-traffic real estate, or spend the sprint somewhere it will show.", tone: C.pink, lvl: null };
    if (!a.content) return { t: "Content is your bottleneck, not targeting", s: "This is the most common ceiling in the whole base. Before adding any targeting sophistication, surface what you already own — recommendations and reordering existing assets. If you genuinely need new variants at volume, that is the Mark-drafted content case at Level 2.", tone: C.blue, lvl: 2 };
    if (a.who && a.what) return { t: "Rules-based personalization", s: "You know who and you know what. Do not over-engineer it. Build the rule, ship it, measure it — this is the fastest credible win available and it earns the trust you will need later.", tone: C.lf, lvl: 2 };
    if (a.who && !a.what && a.options) return { t: "CMAB — you know the audience, not the message", s: "Several viable options and no way to know which wins. This is precisely the decision a contextual bandit exists to make. Let it learn which treatment works for which context rather than picking too early — and insist on seeing what it is weighing while it runs.", tone: C.grass, lvl: 4 };
    if (!a.who && a.options) return { t: "CMAB on contextual signals", s: "No finished audience strategy, but usable signals — device, source, geography, session behaviour. Let the system learn across those contexts instead of hand-defining every combination. You do not need a perfect segmentation to start.", tone: C.grass, lvl: 4 };
    if (a.what && !a.options) return { t: "A/B test it first", s: "One idea you believe in and no real alternatives. Validate it against control before building personalization machinery around it.", tone: C.lf, lvl: 2 };
    return { t: "Let Mark advise", s: "You have the journey moment and the readiness but not the approach. This is exactly the Level 3 conversation — Mark reads what data is usable and recommends the simplest capability that fits.", tone: C.grass, lvl: 3 };
  }, [a, answered]);

  return (
    <div>
      <SectionTitle
        eyebrow="Is the juice worth the squeeze?"
        title="The conversation that should happen before anyone opens a campaign builder"
        sub="A working version of the readiness check. The point is not the questionnaire — it is that a marketer should be able to describe their situation in plain language and be told what fits, including being told they are not ready. This is the single most useful thing to prototype in-product."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="space-y-3">
            {QS.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}22` }}>
                <span className="text-sm font-semibold" style={{ color: C.fir }}>{item.q}</span>
                <div className="flex shrink-0 gap-2">
                  {[true, false].map((v) => {
                    const on = a[item.id] === v;
                    return (
                      <button key={String(v)} onClick={() => setA({ ...a, [item.id]: v })} className="rounded-full px-4 py-1.5 text-xs font-bold transition-colors" style={{ backgroundColor: on ? C.fir : C.n1, color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}>
                        {v ? "Yes" : "No"}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setA({})} className="mt-4 rounded-full px-5 py-2 text-xs font-bold" style={{ backgroundColor: C.n3, color: C.fir, border: `1px solid ${C.fir}33` }}>Reset</button>
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-6 rounded-3xl p-6" style={{ backgroundColor: C.fir, minHeight: 300 }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>Recommendation</div>
            {!rec ? (
              <p className="mt-4 text-sm leading-relaxed" style={{ color: `${C.n1}99` }}>
                Answer all seven and the right approach resolves itself. That is the entire point — nobody should have to
                know which capability fits before they can describe their own situation.
                <br /><br />
                <span style={{ color: C.lf }}>{answered} of {QS.length} answered</span>
              </p>
            ) : (
              <>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight" style={{ color: rec.tone }}>{rec.t}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>{rec.s}</p>
                {rec.lvl && <div className="mt-5"><Pill bg={C.n1} fg={C.fir}>Runs at Level {rec.lvl} · {LEVELS[rec.lvl - 1].name}</Pill></div>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- TAB: NEXT ---------------------- */

function Next() {
  const items = [
    { t: "Build the consistent home before the backends unify", d: "Sathya was explicit: not a fourth standalone product, but dedicated, consistent space across Web Experimentation and FX. The shared surface can ship long before the plumbing underneath it is shared — and the surface is what clients experience as coherence.", owner: "Design-owned · start now" },
    { t: "Personalization Hub — list and detail", d: "Green-lit by name. Name, Audience, Status, Uplift, Justification, with before and after in the detail view. That Justification column is the trust model made concrete. Reporting half needs partnering with Ola given the move to OA.", owner: "Partner with Ola on results" },
    { t: "Make readiness a visible in-product surface", d: "The eight readiness dimensions are currently invisible until something fails. Surfacing them is what turns 'tell me what is missing' from a client ask into a product feature — and it serves the Level 1 and 2 majority directly.", owner: "The highest-leverage build" },
    { t: "Fix the terminology before fixing anything else", d: "The same capability has different names in different products, and personalization is buried under experiment creation. This is the cheapest credibility win available and it needs a decision, not a roadmap slot.", owner: "A naming decision" },
    { t: "Audience definitions: borrow from ODP, do not inherit it", d: "Strongest audience building today, real scalability questions. Take the interaction and mental model, look hard at other CDPs, and do not assume the future is built on that codebase. 'Create audiences once and let all activations feed off them' is still the stated dream.", owner: "Needs a platform position" },
    { t: "Get Dan's Personalization Strategist VT outputs and take a position on FX", d: "Sathya flagged end-to-end agentic personalization as needing design input and named the artifact. He also asked for direction on bringing FX into web and mobile personalization — that is unowned, and his closing line was an invitation to bring a point of view rather than wait.", owner: "The opening · act on it" },
  ];
  return (
    <div>
      <SectionTitle eyebrow="Where this goes" title="Six moves, in the order I would make them" sub="Three are already sanctioned, two need a decision rather than a build, and one is an explicit invitation that is currently going unanswered." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((it, i) => (
          <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-extrabold" style={{ backgroundColor: C.lf, color: C.fir, border: `2px solid ${C.fir}` }}>{i + 1}</div>
              <div>
                <h3 className="text-base font-extrabold leading-tight" style={{ color: C.fir }}>{it.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{it.d}</p>
                <div className="mt-4"><Pill bg={C.n3} fg={C.lightFir}>{it.owner}</Pill></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ---------------------- TAB: THE BASELINE ---------------------- */

const LADDER = [
  { rung: "Creates any audience", n: 408, pct: 76.3, lvl: "Entry to Level 2" },
  { rung: "Custom attribute audiences", n: 217, pct: 40.6, lvl: "Established Level 2" },
  { rung: "Behavioural / visitor-behaviour audiences", n: 96, pct: 17.9, lvl: "Entry to Level 3" },
];

const DIST = [
  { lvl: 1, label: "Level 1 \u00b7 Manual", n: "340 accounts", pct: 67.7, conf: "Measured", d: "No personalization campaign created in nine months, December 2025 to September 2026. This is the model's Level 1, and it is more than two thirds of the paying base." },
  { lvl: 2, label: "Level 2 \u00b7 Mark Assists", n: "up to 162 accounts", pct: 32.3, conf: "Upper bound", d: "Created at least one campaign in the window. Some of these also use behavioural audiences, so the true Level 2-only count is lower. Overlap is not resolvable in the current data." },
  { lvl: 3, label: "Level 3 \u00b7 Mark Advises", n: "up to 96 accounts", pct: 17.9, conf: "Upper bound, different denominator", d: "Use behavioural or visitor-behaviour audiences. This measures audience sophistication, not campaign sophistication, and its denominator differs from the ARR view. Treat as a ceiling, not a count." },
  { lvl: 4, label: "Level 4 \u00b7 Mark Decides", n: "not measurable", pct: 0, conf: "No telemetry", d: "Adaptive and orchestrated usage is not instrumented in this dashboard. We cannot currently evidence that anyone operates here." },
  { lvl: 5, label: "Level 5 \u00b7 Mark Orchestrates", n: "not measurable", pct: 0, conf: "No telemetry", d: "The Assist dimension is uninstrumented. Two of the four ELT flagship bets land at this level and we have no way to measure progress toward it." },
];

const PROOFS = [
  {
    k: "01",
    t: "The ladder halves at every rung",
    n: "76% \u2192 41% \u2192 18%",
    d: "408 accounts create an audience. 217 use custom attributes. 96 reach behavioural targeting. That is the maturity model's shape, measured independently of it \u2014 roughly half of each cohort fails to reach the next rung.",
    so: "The model is not a framing device we invented. It describes a progression that already exists in the data, with the steepest fall exactly where we claimed it was: Level 2 to Level 3.",
    tint: "C.lf",
  },
  {
    k: "02",
    t: "Half of everything built never ships",
    n: "50.4%",
    d: "780 campaigns created in August, 393 qualified. 387 abandoned. That conversion rate has not moved in twelve months. On the same run rate that is roughly 4,600 campaigns a year built and never launched.",
    so: "This is the execution bottleneck with a number attached. It is also the cleanest agentic argument available: lifting conversion to 65% would ship around 114 more campaigns a month with zero new accounts and zero additional campaigns created.",
    tint: "C.sand",
  },
  {
    k: "03",
    t: "Almost nobody looks at the result",
    n: "9 of 101",
    d: "101 accounts created a campaign in August. Nine viewed a results page. Under nine percent close the loop on their own work.",
    so: "This is the most serious finding in the report for our thesis. Trust is built on evidence, and the evidence loop is open. A client who never sees whether it worked cannot build an internal case for doing more \u2014 which is why activation stalls after the first campaign.",
    tint: "C.pink",
  },
  {
    k: "04",
    t: "The people who do use it are at a capacity ceiling",
    n: "+11%",
    d: "Campaigns per active account rose from 6.95 to 7.72 while the per-paying-account ratio fell 21%. Absolute output was flat. The ratio fell because the denominator grew 25%, not because usage declined.",
    so: "The product works for people who use it. They increased throughput while pressed against their own limits. That is the ceiling this model describes \u2014 one team's available hours \u2014 and it is the thing agentic execution removes.",
    tint: "C.blue",
  },
];

function Baseline() {
  return (
    <div>
      <SectionTitle
        eyebrow="Optimizely Analytics · baseline August 2026"
        title="The model is no longer a point of view. This is the measured baseline."
        sub="Adoption data from the Personalization usage dashboard, internal users excluded. It does two things for this vision: it validates the shape of the maturity model against real behaviour, and it replaces every population estimate on the previous tab with something defensible."
      />

      {/* THE CORRECTION */}
      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>
          Correcting this model with real numbers
        </div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: C.n1 }}>
          I estimated a third of accounts sat at Level 1. It is more than two thirds.
        </h3>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          340 of 502 paying accounts — 67.7% — have not created a personalization campaign since December 2025.
          Measured monthly, 79.8% are inactive. The base is substantially earlier than this model assumed, and the
          error ran in the direction that matters: we have been designing and selling for a maturity that most of the
          base has not reached. Every argument on the previous tabs about building for the crawl phase gets stronger,
          not weaker.
        </p>
      </div>

      {/* DISTRIBUTION */}
      <h3 className="mb-2 text-xl font-extrabold" style={{ color: C.fir }}>Where the base actually sits on this ladder</h3>
      <p className="mb-4 max-w-4xl text-sm" style={{ color: `${C.fir}B0` }}>
        Mapped from the adoption data onto the five levels. Where the data cannot support a precise count, the panel
        says so rather than estimating.
      </p>
      <div className="mb-10 space-y-3">
        {DIST.map((d) => (
          <div key={d.lvl} className="rounded-2xl p-5" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3">
                <LevelBadge n={d.lvl} />
                <span className="text-lg font-extrabold" style={{ color: C.fir }}>{d.n}</span>
              </div>
              <Pill bg={d.conf === "Measured" ? C.lf : d.conf === "No telemetry" ? C.pink : C.n3} fg={C.fir} border={`${C.fir}33`}>
                {d.conf}
              </Pill>
            </div>
            {d.pct > 0 && (
              <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: `${C.fir}12` }}>
                <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: LEVELS[d.lvl - 1].swatch === C.n3 ? C.gtg : LEVELS[d.lvl - 1].swatch }} />
              </div>
            )}
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{d.d}</p>
          </div>
        ))}
      </div>

      {/* THE LADDER */}
      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>
          The audience sophistication ladder — independent confirmation
        </div>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: C.fir }}>
          Nobody built this to match our model. It matches anyway.
        </h3>
        <div className="mt-6 space-y-4">
          {LADDER.map((r, i) => (
            <div key={i}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-extrabold" style={{ color: C.fir }}>{r.rung}</span>
                <span className="text-xs font-semibold" style={{ color: C.lightFir }}>{r.n} accounts · {r.pct}% · {r.lvl}</span>
              </div>
              <div className="h-8 w-full overflow-hidden rounded-lg" style={{ backgroundColor: `${C.fir}10` }}>
                <div className="flex h-full items-center justify-end rounded-lg pr-3 text-xs font-extrabold" style={{ width: `${r.pct}%`, backgroundColor: [C.lf, C.grass, C.gtg][i], color: i === 2 ? C.n1 : C.fir }}>
                  {r.pct}%
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
          Roughly half of each cohort fails to reach the next rung. The drop from custom attributes to behavioural
          targeting is the Level 2 to Level 3 transition, and it is the single widest gap in the product. It is also
          the transition the client-facing model points every Level 2 account at, via Behavior Targeting — which the
          data now says is the right call.
        </p>
      </div>

      {/* PROOF POINTS */}
      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>Four findings, and what each one means for this vision</h3>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROOFS.map((p) => {
          const tint = { "C.lf": C.lf, "C.sand": C.sand, "C.pink": C.pink, "C.blue": C.blue }[p.tint];
          return (
            <div key={p.k} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-extrabold" style={{ color: C.gtg }}>{p.k}</span>
                <h4 className="text-lg font-extrabold leading-tight" style={{ color: C.fir }}>{p.t}</h4>
              </div>
              <div className="mt-3 inline-block rounded-xl px-4 py-2 text-2xl font-extrabold" style={{ backgroundColor: tint, color: C.fir }}>
                {p.n}
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}A0` }}>{p.d}</p>
              <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>What it means for us</div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{p.so}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* THE UNCOMFORTABLE ONE */}
      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.pink }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.fir }}>
          The finding that argues against us, kept in on purpose
        </div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: C.fir }}>
          Mark-generated audiences are down 77%, and the suggestion surface is falling fastest
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            ["Mark-Suggested audiences", "280 \u2192 44", "\u221284%"],
            ["Mark Real-Time audiences", "116 \u2192 46", "\u221260%"],
            ["Combined", "396 \u2192 90", "\u221277%"],
          ].map(([t, v, d], i) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: C.n1 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>{t}</div>
              <div className="mt-1 text-sm font-semibold" style={{ color: `${C.fir}B0` }}>{v}</div>
              <div className="text-2xl font-extrabold" style={{ color: C.fir }}>{d}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>
          We are building a thesis that clients adopt personalization when Mark carries more of the work, while the
          one Mark surface we can actually measure is being abandoned. That has to be said out loud in any room where
          this model is presented, because someone will find it.
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>
          <span className="font-extrabold">The asymmetry is the useful part.</span> Suggested audiences fell 84% while
          real-time fell 60%. Users are walking away from the suggestion experience faster than from the underlying
          capability. That points at the surface, not the intelligence — and it is precisely the failure this model
          predicts: a suggestion with no reasoning, no readiness check and no stated confidence is just a different
          kind of blank canvas. Level 2 as currently built does not earn trust, which is the argument for rebuilding
          it around explainability rather than the argument against agentic personalization.
        </p>
      </div>

      {/* ARR */}
      <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-3xl p-6 lg:col-span-2" style={{ backgroundColor: C.fir }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>The commercial framing</div>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight" style={{ color: C.n1 }}>
            More than three quarters of Personalization ARR sits with accounts getting no value from it in a given month
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["Total P13N ARR", "$11.43M"],
              ["Engaged", "$2.57M \u00b7 22.4%"],
              ["Non-engaged", "$8.87M \u00b7 77.6%"],
            ].map(([t, v], i) => (
              <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: i === 2 ? C.pink : `${C.n1}14`, border: `1px solid ${C.lf}44` }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: i === 2 ? C.midFir : C.lf }}>{t}</div>
                <div className="mt-1 text-xl font-extrabold" style={{ color: i === 2 ? C.fir : C.n1 }}>{v}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
            Engaged ARR share fell 4.6 points year over year. The top ten dormant accounts alone carry $9.1M, three of
            them over $1M each. This is the renewal-risk argument, and it is the reason a maturity model that starts
            where clients actually are is a commercial priority rather than a design preference.
          </p>
        </div>
        <div className="rounded-3xl p-6" style={{ backgroundColor: C.sand, border: `2px solid ${C.fir}` }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>The contraction</div>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>
            The July analysis used a six-month window and found 188 active accounts. This one used nine months and
            found 162.
          </p>
          <p className="mt-3 text-sm font-extrabold leading-relaxed" style={{ color: C.fir }}>
            A wider window found fewer accounts. That is a real contraction in the active base, not a measurement
            artifact.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}CC` }}>
            The dormant cohort is growing from both ends at once — new accounts arriving without activating, and
            previously active accounts going quiet.
          </p>
        </div>
      </div>

      {/* WHAT IT CHANGES */}
      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>What this data changes about the plan</h3>
      <div className="mb-10 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["The move", "What the data now says about it", "Verdict"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Make readiness visible in-product", "68% of the base never creates a first campaign. Activation, not sophistication, is the product problem.", "Promote to first", C.lf],
              ["Rebuild the Mark suggestion surface", "Suggested audiences down 84%, faster than the capability itself. The current surface is actively losing users.", "Promote \u00b7 was not on the list", C.lf],
              ["Personalization Hub with a Justification column", "Nine of 101 accounts view a result. The loop is open, and the Hub is the thing that closes it.", "Reframe as activation, not reporting", C.n3],
              ["Fix the terminology", "Telemetry still carries Opal naming in the event schema and the managed flag. The rename is incomplete in the data layer.", "Wider than a UI decision", C.n3],
              ["Instrument the Assist dimension", "Level 4 and 5 adoption cannot be evidenced at all today. Two of the four ELT bets land there.", "Blocking \u00b7 do first", C.pink],
              ["Audience definitions across tools", "76% create an audience, 18% reach behavioural. The Level 2 to 3 gap is the widest in the product.", "Confirmed, unchanged priority", C.n3],
            ].map(([m, d, v, tint], i) => (
              <tr key={i} style={{ backgroundColor: i % 2 ? C.n3 : C.n1 }}>
                <td className="px-4 py-4 align-top text-sm font-extrabold" style={{ color: C.fir }}>{m}</td>
                <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{d}</td>
                <td className="px-4 py-4 align-top"><Pill bg={tint} fg={C.fir} border={`${C.fir}33`}>{v}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CAVEATS */}
      <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>
          What this data cannot tell us — state these before anyone asks
        </div>
        <h3 className="mt-2 text-xl font-extrabold" style={{ color: C.fir }}>Six limits on the numbers above</h3>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            ["The dormant count is \u00b1 40 accounts", "The measure divides a campaign-creator count that is not ARR-filtered by a paying-account count that is. Directionally sound, not precise."],
            ["The ladder uses a different denominator", "Audience sophistication percentages resolve to a base of roughly 535, not the 499 or 502 used elsewhere. Do not mix the two in one chart."],
            ["Level overlap is unresolved", "We cannot tell how many of the 162 active accounts are also among the 96 using behavioural audiences, so Level 2 and Level 3 counts are ceilings rather than segments."],
            ["Level 4 and 5 are invisible", "No adaptive or agentic telemetry exists in this dashboard. Absence of evidence here is not evidence of absence."],
            ["Two tiles disagree", "Campaign Started and Campaign Qualified return zero on one tile while the North Star tile returns 393. One is wrong. Resolve before any external use."],
            ["Depth has no trend line", "Behavioural targeting adoption is a single point in time. We cannot say whether the Level 2 to 3 gap is widening or closing."],
          ].map(([t, d], i) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
              <div className="text-sm font-extrabold" style={{ color: C.fir }}>{t}</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: C.blue }}>
          <p className="text-sm leading-relaxed" style={{ color: C.fir }}>
            <span className="font-extrabold">Forward-looking targets are deliberately excluded from this tab. </span>
            The baseline is observed. Anything projected belongs in a separate conversation with its assumptions
            attached, and mixing the two is how a credible diagnosis turns into a number nobody trusts.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- SHELL ---------------------- */

const TABS = [
  { id: "maturity", label: "Maturity model", el: <Maturity /> },
  { id: "baseline", label: "The baseline", el: <Baseline /> },
  { id: "trust", label: "Trust", el: <Trust /> },
  { id: "ease", label: "Ease of execution", el: <Ease /> },
  { id: "reality", label: "Client reality", el: <Reality /> },
  { id: "funnels", label: "Journey funnels", el: <Funnels /> },
  { id: "problems", label: "The four problems", el: <Problems /> },
  { id: "fit", label: "Fit check", el: <FitCheck /> },
  { id: "next", label: "What we do next", el: <Next /> },
];

export default function AgenticPersonalization() {
  const [tab, setTab] = useState("maturity");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Personalization Maturity Model & Journey Map";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen w-full px-5 py-10 md:px-10" style={{ backgroundColor: C.n3, fontFamily: "Inter, Arial, sans-serif" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.lightFir }}>
            The Agentic Personalization Maturity Model · September 2026
          </div>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] md:text-6xl" style={{ color: C.fir }}>
            Easier to execute.
            <br />
            <span style={{ color: C.gtg }}>Only if they trust it.</span>
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed" style={{ color: `${C.fir}C0` }}>
            Clients already believe personalization is worth doing. What stops them is that nobody can confidently
            answer four questions in a row — who should see something different, why that group matters, what should
            change for them, and how we will know it worked. Agentic personalization can answer all four on their
            behalf. The entire adoption question is whether they will let it.
          </p>
          <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
            <p className="text-base font-bold leading-relaxed" style={{ color: C.lf }}>
              The principle underneath every screen here: every decision we take off the marketer's plate has to be
              replaced with something they can see.
            </p>
          </div>
        </header>

        <nav className="mb-10 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="rounded-full px-5 py-2.5 text-sm font-bold transition-colors" style={{ backgroundColor: on ? C.fir : "transparent", color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}>
                {t.label}
              </button>
            );
          })}
        </nav>

        <main>{TABS.find((t) => t.id === tab).el}</main>

        <footer className="mt-16 border-t pt-6 text-xs leading-relaxed" style={{ borderColor: `${C.fir}22`, color: `${C.fir}80` }}>
          Built from: Katie's 2024 Lucid board · Dan's client research deck · the Product Designer briefing · the CMAB
          interactive deck · Sathya's direct answers, September 2026 · the Customer Outcomes ELT slide · two years of
          client personalization sessions. Client examples named are drawn from those sessions.
        </footer>
      </div>
    </div>
  );
}
