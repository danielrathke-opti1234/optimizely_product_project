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
    sub: "It suggests and optimises what you built",
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
      "Drafts the variants — or finds the asset you already own and forgot about",
      "Turns a blank campaign builder into a starting position",
      "Optimises the traffic split across options you built, toward the metric you named",
    ],
    unblocks: ["Ideation doesn't scale", "Content creation is the bottleneck", "No dedicated resourcing"],
    stuckOn: [
      "“We don't have the capacity to produce the amount of content needed for small, hyper-personalized audiences, without AI.”",
    ],
    trustHeadline: "Draft by default. Nothing new reaches a visitor without you.",
    trustBody:
      "This level exists because it carries almost no decision risk — which makes it the cheapest possible place to earn credibility. Mark is visibly useful before it is ever consequential. Autonomous Optimization is the one place here where Mark decides rather than drafts, and it belongs at this level precisely because the handover is so tightly bounded: the human built every option and named the metric, so Mark is optimising a decision already made rather than making a new one. That makes it the cheapest first experience of letting Mark decide anything at all. Customers who skip straight to real autonomy without this step have no reason to believe the recommendations when they arrive.",
    features: [
      { n: "Mark-assisted content variants", d: "Removes the production ceiling on small audiences." },
      { n: "Personalization Campaigns (Web Exp)", d: "The rules workhorse the suggestions land in." },
      { n: "Behavior Targeting", d: "Onsite behaviour as intent, without needing a data analyst." },
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
      "Reads the site and the traffic and points at where relevance would actually matter",
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
      { n: "ODP Real-Time Segments", d: "Qualifies in-session rather than overnight." },
      { n: "Salesforce Audience / Tealium / CRM", d: "Use the data they already have. Don't make them re-enter it." },
      { n: "Product & Content Recommendations", d: "Catalogue relevance without authoring per segment." },
      { n: "Contextual Multi-Armed Bandits (CMAB)", d: "Multiple viable treatments, learned across visitor context." },
      { n: "Autonomous Optimization", d: "Optimises traffic allocation toward the primary metric continuously, without a weekly manual check-in." },
      { n: "Optimizely Analytics — warehouse-native", d: "Runs on the client's own warehouse (Snowflake, BigQuery, Databricks, Redshift). Their warehouse stays the single source of truth; personalization is measured against revenue and retention, not proxy events. Also analyses experiments run outside Optimizely." },
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
      { n: "Personalization Strategist", d: "Decides where to personalize next and which approach fits, then works the opportunity through to a recommendation — inside the remit you set." },
      { n: "Dynamic Experience", d: "Composition that adapts rather than branching into rule sprawl." },
      { n: "Cross-channel orchestration", d: "Web, app and email behaving as one journey rather than three islands." },
      { n: "Personalization Hub (proposed)", d: "Name, Audience, Status, Uplift, Justification — one place, finally." },
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
      { n: "Limitless Personalization (Mark + CMS)", d: "A genuinely bespoke experience assembled for the individual, at a scale no team could staff." },
      { n: "Front-end Experience Agent (Mark + Graph)", d: "Finds the relevant thing before a returning visitor bounces." },
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


/* ---------- CANONICAL LEVEL CRITERIA (shared with the client-facing model) ---------- */

const CRITERIA = [
  {
    id: 1,
    internal: "Manual",
    client: "One Size Fits All",
    def: "Every visitor sees the same thing. Personalization is an ambition, not a practice.",
    hereIf: [
      "Every visitor sees the same page, the same offer, the same journey",
      "Personalization is something the team talks about, not something that runs",
      "Nobody could name the top five entry pages by volume without digging",
    ],
    carries: 0,
    data: "Collecting — events and identity switched on, nothing activating yet",
    gates: ["A named owner, even part-time", "One agreed primary metric", "Top entry pages known by volume"],
    trust: "No trust required — and that is exactly the problem",
    effort: "First rule live in under a day",
    trap: "Waiting for a perfect data project before running anything",
    measure: "Zero p13n campaigns created in the window",
    evidence: "340 accounts · 67.7% of the paying base",
    conf: "measured",
  },
  {
    id: 2,
    internal: "Mark Assists",
    client: "Rules-Based Targeting",
    def: "A human writes the if/then. Mark drafts the content and optimises what you built.",
    hereIf: [
      "You can name two or three audiences that genuinely behave differently",
      "You are running targeted campaigns, but each one is hand-built",
      "You have rebuilt the same audience in more than one tool",
    ],
    carries: 2,
    data: "Segmenting — batch segments and list attributes, defined once where possible",
    gates: ["An audience worth the effort, not twelve people", "Someone who can approve without a two-week queue"],
    trust: "Draft by default. Nothing new reaches a visitor without you.",
    effort: "First campaign live in days",
    trap: "Widening the audience until the content workload is manageable, which dilutes the effect",
    measure: "≥1 campaign created; audiences are attribute-based",
    evidence: "Up to 162 active accounts · 217 use custom attribute audiences",
    conf: "upper bound",
  },
  {
    id: 3,
    internal: "Mark Advises",
    client: "Behavioral & Data-Driven",
    def: "Behaviour and customer data drive targeting. Mark assesses readiness and recommends the approach.",
    hereIf: [
      "Real-time behaviour drives what people see, not just static attributes",
      "Customer data from the CDP or CRM reaches the experience layer",
      "Personalizing in more than one channel, though they do not yet coordinate",
    ],
    carries: 4,
    data: "Real-time — in-session qualification, activating in more than one channel",
    gates: ["Event tracking trusted enough to target on", "A clear owner for audience definitions", "Primary metric instrumented end to end"],
    trust: "Show the reasoning and show the gaps",
    effort: "Weeks — data readiness is the long pole, not build time",
    trap: "Assuming entitlement equals readiness",
    measure: "Behavioural audiences, RTS, or CMAB active; results measured in their own warehouse",
    evidence: "Up to 96 accounts · 17.9% — different denominator, treat as a ceiling",
    conf: "upper bound",
  },
  {
    id: 4,
    internal: "Mark Decides",
    client: "Adaptive & Orchestrated",
    def: "Several experiences could work. Mark learns which, for whom — inside guardrails the human sets.",
    hereIf: [
      "Several credible options exist and nobody knows which wins",
      "Channels coordinate — what happens on the site informs what happens in email",
      "Every personalization and its result is visible in one place",
    ],
    carries: 6,
    data: "Orchestrating — unified profile in the request path, feeding adaptive decisions",
    gates: ["Genuinely multiple credible options", "Enough traffic and enough time to learn", "One clear primary metric and real visitor context", "Meaningful differences between the experiences"],
    trust: "Show the work, in the moment, while it is deciding",
    effort: "Configured in days, learns over weeks",
    trap: "Running an adaptive approach on a decision you already know the answer to",
    measure: "Cross-channel orchestration or Dynamic Experience active; warehouse-native measurement in place",
    evidence: "Not instrumented — we cannot currently evidence anyone here",
    conf: "no telemetry",
  },
  {
    id: 5,
    internal: "Mark Orchestrates",
    client: "Agentic 1:1",
    def: "Nobody wrote a rule for this person. Mark reasons about the individual and closes its own loop.",
    hereIf: [
      "Relevance is wanted for an individual, not a segment",
      "Manual production could never reach the number of experiences needed",
      "AI agents, not only people, are arriving on the site",
    ],
    carries: 7,
    data: "Reasoning — a complete profile an agent can reason over, under explicit governance",
    gates: ["A measurement model that works without a control group", "Defined checkpoints: what is approved vs what runs free", "Governance on what Mark is permitted to change", "In regulated sectors, a compliance boundary Mark cannot cross"],
    trust: "Show the boundaries and keep the receipts",
    effort: "Continuous — there is no launch moment",
    trap: "Turning on autonomy with no checkpoint",
    measure: "Agentic surfaces active; Mark selects the audience, not just the content",
    evidence: "Not instrumented — two of four ELT bets land here",
    conf: "no telemetry",
  },
];

/* ---------- THE PROBLEMS THIS VISION SOLVES ---------- */

const PROBLEMS_WE_SOLVE = [
  {
    n: "P1",
    t: "Two thirds of the base never starts",
    sym: "340 of 502 paying accounts have not created a personalization campaign in nine months. A wider window found fewer active accounts than the previous one.",
    why: "Nobody can answer the four questions in a row — who should see something different, why that group matters, what should change, and how we will know. So the campaign never gets built.",
    ev: "Measured · adoption dashboard",
    arr: "$8.87M non-engaged ARR",
    quote: "Because I'm just a one person show, sometimes I feel I run out of ideas.",
    fix: "Readiness and opportunity surfaced in-product, before the blank canvas",
    lvl: 1,
  },
  {
    n: "P2",
    t: "Half of what gets built never ships",
    sym: "780 campaigns created in August, 393 qualified. 387 abandoned. Flat for twelve months — roughly 4,600 a year.",
    why: "Setup, QA, approvals and content production exceed the capacity of teams who have personalization as a second job.",
    ev: "Measured · adoption dashboard",
    arr: "~114 more campaigns/month at 65% conversion, zero new accounts",
    quote: "We don't have the capacity to produce the amount of content needed for small, hyper-personalized audiences, without AI.",
    fix: "Mark drafts the variants and absorbs the setup that needs no human judgement",
    lvl: 2,
  },
  {
    n: "P3",
    t: "The evidence loop is open",
    sym: "101 accounts created a campaign in August. Nine viewed a results page. Under 9% close the loop on their own work.",
    why: "Results live in separate dashboards per channel, and a report that shows a number rather than a decision gives nobody a reason to return.",
    ev: "Measured · adoption dashboard",
    arr: "Gates every expansion conversation — no proof, no second campaign",
    quote: "Relevancy is really hard to measure. A lot of what you're doing with personalization is qualitative, not quantitative.",
    fix: "Personalization Hub with a Justification column — results that end in a decision",
    lvl: 4,
  },
  {
    n: "P4",
    t: "The suggestion surface is being abandoned",
    sym: "Mark-generated audiences down 77% year over year. Mark-Suggested down 84%, faster than the underlying real-time capability at 60%.",
    why: "A suggestion with no reasoning, no readiness check and no stated confidence is just a different kind of blank canvas. It does not earn trust.",
    ev: "Measured · proxy metric only",
    arr: "Undermines the whole agentic thesis if unaddressed",
    quote: "Customers understand the value — they struggle to trust it enough to launch.",
    fix: "Rebuild Level 2 around explainability: reasoning, readiness and confidence attached to every suggestion",
    lvl: 2,
  },
  {
    n: "P5",
    t: "Personalization has no home and no consistent name",
    sym: "The same capability is called different things in different products, and personalization is nested under experiment creation.",
    why: "Users must understand the Optimizely feature before they can understand the problem it solves. Capability-first, not need-first.",
    ev: "Client sessions · two years",
    arr: "Cheapest credibility win available — a decision, not a build",
    quote: "We forget about the personalization type of experiment within Optimizely, I think because it's nested under experiment creation.",
    fix: "A consistent home across Web Experimentation and FX; need-first sequencing",
    lvl: 2,
  },
  {
    n: "P6",
    t: "Audiences are rebuilt in every tool",
    sym: "The same audience defined separately in web, app and the data platform, with three slightly different answers.",
    why: "No shared definition of an audience exists anywhere in the stack.",
    ev: "Client sessions · two years",
    arr: "Blocks Level 2 → 3, the widest gap in the product (41% → 18%)",
    quote: "We create audiences once, and all the activations feed off those same audiences.",
    fix: "One definition, activated everywhere — borrow the model from ODP, do not inherit the codebase",
    lvl: 3,
  },
  {
    n: "P7",
    t: "We cannot measure our own strategy",
    sym: "Mark telemetry sits in a personal sandbox schema. Level 4 and Level 5 adoption cannot be evidenced at all.",
    why: "Instrumentation was never governed as a Product dataset.",
    ev: "Measured · instrumentation audit",
    arr: "Blocks a Product OKR and two of four ELT bets",
    quote: "CMAB has an education and trust problem before it has a configuration problem.",
    fix: "Govern the Mark telemetry; instrument the Assist dimension and time-to-first-campaign",
    lvl: 4,
  },
];

/* ---------- PRIORITIZATION CRITERIA ---------- */

const PRIOR_CRITERIA = [
  { k: "ARR exposure", d: "How much non-engaged or at-risk ARR does this unlock or protect?", w: "Highest weight — it is the argument that funds the work" },
  { k: "Accounts affected", d: "How much of the base does this reach? Breadth beats depth while 68% are dormant.", w: "High" },
  { k: "Evidence strength", d: "Measured, proxy, or anecdotal? We do not prioritise on hunches.", w: "High — gates everything else" },
  { k: "Blocking", d: "Does anything else depend on this shipping first?", w: "Override — blockers jump the queue" },
  { k: "Effort", d: "A decision, a design, or a build? Naming fixes cost almost nothing.", w: "Tie-breaker" },
  { k: "Client demand", d: "Do we have direct quotes asking for this, or are we inferring it?", w: "Validating" },
];


/* ---------- THE SESSIONS REPORT: DECISION ARC + ADOPTION PATTERNS ---------- */

const DECISION_ARC = [
  { n: "01", t: "Recognize opportunity", d: "Where in the journey would relevance actually change an outcome?", breaks: "Ideas come from one person staring at analytics. Nothing systematic points at where to look.", lvl: 3 },
  { n: "02", t: "Validate inputs", d: "Does the data, the audience size and the content actually support this?", breaks: "Nobody finds out until after the campaign underperforms. Readiness is invisible until it fails.", lvl: 3 },
  { n: "03", t: "Build the right experience", d: "What should change, and can we produce it?", breaks: "The content ceiling. Half of everything built never ships.", lvl: 2 },
  { n: "04", t: "Measure the outcome", d: "Did it work, and can we say so credibly?", breaks: "Results sit in separate dashboards. Nine of 101 accounts look at them.", lvl: 4 },
  { n: "05", t: "Learn the next move", d: "Keep it, change it, expand it, or stop?", breaks: "The report shows a number and leaves the marketer staring at a chart.", lvl: 5 },
];

const ADOPTION_PATTERNS = [
  {
    p: "Do not get started",
    lvl: 1,
    d: "The account never creates a first campaign. The blocker is not capability, it is that nobody can answer the four questions in a row.",
    measured: "340 accounts · 67.7% of the paying base",
    conf: "Measured",
  },
  {
    p: "Stay with basic targeting",
    lvl: 2,
    d: "They run rules, and stop. Attribute-based audiences never progress to behavioural intent, which is where personalization starts producing differentiated outcomes.",
    measured: "217 at custom attributes · only 96 reach behavioural",
    conf: "Measured",
  },
  {
    p: "Treat personalization as disconnected features",
    lvl: 3,
    d: "Each channel is its own island, audiences are rebuilt per tool, and personalization is nested under experiment creation rather than having a home.",
    measured: "No shared audience definition anywhere in the stack",
    conf: "Client sessions",
  },
];

const SEVEN_ASKS = [
  { n: "01", ask: "Help me identify opportunities", mean: "Start from my traffic, content and goals. Not a blank canvas.", lvl: 3 },
  { n: "02", ask: "Help me choose the right approach", mean: "Tell me if this is a rule, a test, or an adaptive approach. I do not know which fits.", lvl: 3 },
  { n: "03", ask: "Use the data I already have", mean: "It is already in other systems. Do not make me re-enter it.", lvl: 3 },
  { n: "04", ask: "Tell me what is missing", mean: "Warn me before I build, not after it fails.", lvl: 3 },
  { n: "05", ask: "Help me understand what to show", mean: "Recommend the message, image or CTA. Do not hand me an empty box.", lvl: 2 },
  { n: "06", ask: "Help me measure whether it mattered", mean: "Tell me if the whole experience improved, not just whether something got clicked.", lvl: 4 },
  { n: "07", ask: "Tell me what to do next", mean: "Keep it, change it, expand it, or kill it. Do not leave me staring at a chart.", lvl: 5 },
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

const STAGES = [
  {
    id: "arrive",
    n: "01",
    name: "Arrive",
    q: "Is this place relevant to me at all?",
    doing:
      "First contact, almost always anonymous, and a decision made in seconds. Whatever brought them here is the most valuable thing you know, and it is usually thrown away in favour of a generic landing experience.",
    signal: "Traffic source, campaign or ad clicked, search term, referrer, device, location, time",
    haveIt: "You already have every one of these. No data project, no integration, no waiting.",
    plays: [
      { lvl: 2, p: "Lead with the reason they came rather than your default hero", f: "Web Experimentation audiences, CMS visitor groups" },
      { lvl: 3, p: "Recognise a returning visitor and pick up where they left off", f: "Behavior Targeting, ODP Real-Time Segments" },
      { lvl: 5, p: "Assemble the entry experience around this specific person", f: "Front-end Experience Agent, agentic-legible pages" },
    ],
    easy: true,
    trust: null,
  },
  {
    id: "orient",
    n: "02",
    name: "Orient",
    q: "Where is the thing I need?",
    doing:
      "Browsing, searching, scanning. They are trying to narrow a large space down to a few candidates, and every extra step is a chance to leave. This stage rewards reducing choice rather than adding persuasion.",
    signal: "Category or topic dwell, repeat views, search terms used, filters applied, session depth",
    haveIt: "Behavioural signal, available in-session. Needs collection switched on, not a data warehouse.",
    plays: [
      { lvl: 2, p: "Reorder navigation or featured content for known segments", f: "Personalization Campaigns, CMS Personalization" },
      { lvl: 3, p: "Surface the guide, tool or product that matches demonstrated interest", f: "Content and Product Recommendations, Behavior Targeting" },
      { lvl: 3, p: "Learn which arrangement helps which kind of visitor find things faster", f: "CMAB" },
      { lvl: 5, p: "The whole library reordered around one person", f: "Limitless Personalization" },
    ],
    easy: false,
    trust: null,
  },
  {
    id: "evaluate",
    n: "03",
    name: "Evaluate",
    q: "Is this the right choice, and can I trust it?",
    doing:
      "Comparing, hesitating, returning without acting. The blocker here is rarely awareness — it is an unresolved doubt. Different people hold different doubts, which is exactly why one piece of reassurance for everyone underperforms.",
    signal: "Repeat views without acting, comparison behaviour, proof content consumed, time between visits",
    haveIt: "The strongest intent signal on your whole site, and the most commonly unused.",
    plays: [
      { lvl: 2, p: "Bring the relevant proof point or reassurance forward for a known segment", f: "Personalization Campaigns, CMS Personalization" },
      { lvl: 3, p: "Match the proof to what they have actually been looking at", f: "Behavior Targeting, Content Recommendations" },
      { lvl: 3, p: "Learn which reassurance resolves which hesitation, by context", f: "CMAB" },
      { lvl: 5, p: "Assemble the case for this individual", f: "Limitless Personalization" },
    ],
    easy: true,
    trust: null,
  },
  {
    id: "act",
    n: "04",
    name: "Act",
    q: "Can I complete this without friction?",
    doing:
      "The conversion moment, whatever that means for you — purchase, application, booking, sign-up, enquiry, submission. Abandonment here is expensive because everything upstream already worked.",
    signal: "Drop-off point, step reached, device switch, cart or basket state, time on step",
    haveIt: "Usually instrumented already, because everyone measures this funnel. The signal is there — it is just not being acted on in the moment.",
    plays: [
      { lvl: 2, p: "Adjust the call to action or remove a step for a known segment", f: "Personalization Campaigns, Feature Experimentation" },
      { lvl: 3, p: "Shortcut the flow for a recognised customer using what you already know", f: "ODP Real-Time Segments, CRM attributes" },
      { lvl: 3, p: "Learn which framing, nudge or step order converts which context", f: "CMAB" },
      { lvl: 5, p: "The flow adapts to the individual as they move through it", f: "Agentic personalization with Mark" },
    ],
    easy: false,
    trust:
      "Be deliberate here. This is the stage where personalization is most visible to the customer and most likely to feel like manipulation if handled carelessly. Personalize the clarity and the path, not the terms.",
  },
  {
    id: "onboard",
    n: "05",
    name: "Onboard",
    q: "Did I make the right decision?",
    doing:
      "The first experience after committing, and the most under-personalized stage in most businesses. A generic welcome is a wasted moment — you now know more about this person than at any earlier point.",
    signal: "What they chose, setup steps outstanding, account age, first-use behaviour, stated intent",
    haveIt: "Known-customer data. This is where a CDP starts paying for itself in an obvious way.",
    plays: [
      { lvl: 2, p: "A welcome experience that reflects what they actually chose", f: "CMS Personalization, ODP segments" },
      { lvl: 3, p: "A next-best-action tile driven by what is still outstanding", f: "ODP Real-Time Segments, Content Recommendations" },
      { lvl: 4, p: "Coordinate the sequence across channels so it behaves as one conversation", f: "Cross-channel orchestration, Dynamic Experience" },
      { lvl: 5, p: "An onboarding path reasoned out for this individual", f: "Agentic personalization with Mark" },
    ],
    easy: true,
    trust: null,
  },
  {
    id: "return",
    n: "06",
    name: "Return",
    q: "Is it worth coming back?",
    doing:
      "They come back on a rhythm, or they drift and quietly stop. This is the stage where channels most obviously need to coordinate, and most obviously do not.",
    signal: "Visit and purchase cadence, declining frequency, channel preference, lapse-risk patterns",
    haveIt: "Requires accumulated history. This is why collection at Level 1 matters so much.",
    plays: [
      { lvl: 2, p: "Recognise a returning visitor and change the entry point accordingly", f: "Web Experimentation audiences, CMS Personalization" },
      { lvl: 3, p: "Bring forward the thing they are most likely to want next", f: "Recommendations, ODP segments across web and email" },
      { lvl: 4, p: "Coordinate web, app and email so they behave as one conversation", f: "Cross-channel orchestration, Autonomous Optimization" },
      { lvl: 5, p: "Pre-empt the drift with a reason to return, chosen for them", f: "Front-end Experience Agent" },
    ],
    easy: false,
    trust: null,
  },
  {
    id: "grow",
    n: "07",
    name: "Grow",
    q: "What else is genuinely useful to me?",
    doing:
      "Deepening the relationship — more categories, more products, more services, or an advocate. The failure mode is obvious and common: being sold something you already have.",
    signal: "What they hold, category or usage gaps, tenure, service history, engagement breadth",
    haveIt: "Lives in your CRM or CDP rather than on the website. Connecting it is the unlock.",
    plays: [
      { lvl: 2, p: "Suppress what they already have. The cheapest relevance win available", f: "ODP / CDP segments, CMS Personalization" },
      { lvl: 3, p: "Surface the adjacent thing based on what they actually hold", f: "CRM and CDP attributes, Recommendations" },
      { lvl: 3, p: "Learn which next-best-offer fits which customer context", f: "CMAB" },
      { lvl: 5, p: "Reason about the right next step for this individual relationship", f: "Agentic personalization with Mark" },
    ],
    easy: true,
    trust:
      "Relevance and intrusion are separated by a thin line at this stage. Using what someone told you is helpful. Using what you inferred about them, without saying so, is where trust is lost.",
  },
];

/* ---------------------- TAB: MATURITY ---------------------- */

function Maturity() {
  const [active, setActive] = useState(2);
  const [stage, setStage] = useState("evaluate");
  const l = LEVELS[active - 1];
  const st = STAGES.find((x) => x.id === stage);

  return (
    <div>
      <SectionTitle
        eyebrow="The model"
        title="Maturity is how many decisions the client has handed to Mark"
        sub="Same five levels as the client-facing model, same criteria — expressed in our vocabulary rather than theirs. Select a level to see what sits there, then use the funnel below to see where those capabilities apply."
      />

      {/* level selector */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {LEVELS.map((lv) => {
          const on = lv.id === active;
          return (
            <button key={lv.id} onClick={() => setActive(lv.id)} className="rounded-2xl p-4 text-left transition-all duration-150"
              style={{ backgroundColor: on ? lv.swatch : C.n1, color: on ? lv.ink : C.fir,
                       border: `2px solid ${on ? C.fir : `${C.fir}22`}`,
                       transform: on ? "translateY(-3px)" : "none",
                       boxShadow: on ? `0 6px 0 0 ${C.fir}` : "none" }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">{lv.tag}</div>
              <div className="mt-1 text-base font-extrabold leading-tight">{lv.name}</div>
              <div className="mt-1 text-xs font-semibold opacity-80">{lv.sub}</div>
              <div className="mt-3 text-[11px] font-bold opacity-85">{lv.carries.length} of 7 decisions</div>
            </button>
          );
        })}
      </div>

      {/* level detail */}
      <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="flex flex-wrap items-center gap-3">
          <Pill bg={l.swatch} fg={l.ink} border={`${C.fir}33`}>{l.tag} · {l.name}</Pill>
          <Pill bg={C.n3} fg={C.fir}>Client-facing name: {CRITERIA[active - 1].client}</Pill>
          <Pill bg={C.n3} fg={C.fir}>{l.ttv}</Pill>
        </div>
        <p className="mt-4 text-xl font-bold leading-snug md:text-2xl" style={{ color: C.fir }}>{l.strap}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: C.n3 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>You are here if</div>
              <ul className="mt-3 space-y-2">
                {CRITERIA[active - 1].hereIf.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: C.fir }}>
                    <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded" style={{ backgroundColor: C.lf, border: `1px solid ${C.fir}` }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.sand }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>The trap here</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{CRITERIA[active - 1].trap}</p>
            </div>
            <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.blue }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>How we know an account is here</div>
              <p className="mt-1 text-sm font-semibold" style={{ color: C.fir }}>{CRITERIA[active - 1].measure}</p>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: `${C.fir}CC` }}>
                <span className="font-extrabold">Today: </span>{CRITERIA[active - 1].evidence}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lf }}>What Mark carries at this level</div>
              <ul className="mt-3 space-y-2">
                {l.agentDoes.map((x, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: C.n1 }}>
                    <span className="font-bold" style={{ color: C.lf }}>—</span><span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: C.pink }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>The trust this level requires</div>
                <p className="mt-1 text-sm font-extrabold" style={{ color: C.fir }}>{l.trustHeadline}</p>
              </div>
            </div>

            <h4 className="mb-2 mt-6 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>The features that live here</h4>
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

      {/* ---- THE FUNNEL, directly below ---- */}
      <div className="mt-10">
        <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>Where it applies</div>
        <h3 className="mt-2 text-2xl font-extrabold md:text-3xl" style={{ color: C.fir }}>
          The same capabilities, mapped to the client&rsquo;s own customer journey
        </h3>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
          Seven generic stages any client can relabel. Plays at or below the level selected above are live; anything
          higher is a roadmap conversation, not a this-quarter commitment.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {STAGES.map((x) => {
            const on = x.id === stage;
            return (
              <button key={x.id} onClick={() => setStage(x.id)} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors"
                style={{ backgroundColor: on ? C.fir : C.n1, color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}>
                <span className="text-[10px] opacity-70">{x.n}</span>{x.name}
                {x.easy && <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: on ? C.lf : C.gtg }} />}
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="text-4xl font-extrabold" style={{ color: C.lf }}>{st.n}</div>
              <h4 className="mt-1 text-2xl font-extrabold" style={{ color: C.fir }}>{st.name}</h4>
              <p className="mt-2 text-base font-bold italic leading-snug" style={{ color: C.lightFir }}>“{st.q}”</p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{st.doing}</p>
              <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.blue }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>Signal available</div>
                <p className="mt-1 text-sm font-semibold" style={{ color: C.fir }}>{st.signal}</p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: `${C.fir}CC` }}>{st.haveIt}</p>
              </div>
              {st.trust && (
                <div className="mt-3 rounded-2xl p-4" style={{ backgroundColor: C.pink }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>Handle with care</div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{st.trust}</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <h5 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>What a client can do here, by level</h5>
              <div className="space-y-3">
                {st.plays.map((pl, i) => {
                  const yours = pl.lvl === active;
                  const reachable = pl.lvl <= active;
                  return (
                    <div key={i} className="rounded-2xl p-4"
                      style={{ backgroundColor: yours ? C.lf : C.n3, border: `2px solid ${yours ? C.fir : "transparent"}`, opacity: reachable ? 1 : 0.6 }}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <LevelBadge n={pl.lvl} />
                        {yours && <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: C.fir }}>At the selected level</span>}
                        {!reachable && <span className="text-[11px] font-semibold" style={{ color: `${C.fir}80` }}>Ahead of this level</span>}
                      </div>
                      <p className="mt-2 text-base font-bold leading-snug" style={{ color: C.fir }}>{pl.p}</p>
                      <p className="mt-1 text-xs font-semibold" style={{ color: C.lightFir }}>{pl.f}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- THE DISTRIBUTION CHART ---------------------- */

const DIST_CHART = [
  { lvl: 1, name: "Manual", client: "One Size Fits All", n: 340, pct: 67.7, arr: 8.87,
    conf: "Measured", col: "#E4F0DA", ink: "#08251A",
    means: "These accounts pay for Personalization and have not created a single campaign in nine months. They are not under-using the product — they are not using it at all.",
    arrNote: "Non-engaged ARR. More than three quarters of the book sits here.",
    risk: "Renewal exposure. Three of these accounts carry over $1M each.",
    move: "Activation, not sophistication. Readiness and opportunity surfaced before the blank canvas." },
  { lvl: 2, name: "Mark Assists", client: "Rules-Based", n: 162, pct: 32.3, arr: 1.80,
    conf: "Upper bound", col: "#ABFF44", ink: "#08251A",
    means: "Created at least one campaign in the window. This is the ceiling, not a clean segment — some of these accounts also appear in Level 3, and the overlap is not resolvable in the current data.",
    arrNote: "Engaged ARR, combined with Level 3. The engaged share fell 4.6pp year over year.",
    risk: "Half of what this cohort builds never ships — 50.4% created-to-qualified, flat for twelve months.",
    move: "Rebuild the Mark suggestion surface. Suggested audiences are down 84%." },
  { lvl: 3, name: "Mark Advises", client: "Behavioral & Data-Driven", n: 96, pct: 17.9, arr: 0.77,
    conf: "Upper bound, different denominator", col: "#7DDD3D", ink: "#08251A",
    means: "Use behavioural or visitor-behaviour audiences. This measures audience sophistication rather than campaign sophistication, and resolves against a base of roughly 535 rather than 502.",
    arrNote: "The most valuable cohort per account, and the smallest.",
    risk: "The drop from Level 2 to Level 3 is the widest gap in the product — 41% to 18%.",
    move: "One audience definition, activated everywhere. This is the transition the client-facing model points every Level 2 account at." },
  { lvl: 4, name: "Mark Decides", client: "Adaptive & Orchestrated", n: 0, pct: 0, arr: 0,
    conf: "No telemetry", col: "#3AB533", ink: "#FFFFFF",
    means: "We cannot currently evidence that anyone operates here. Adaptive and orchestrated usage is not instrumented in this dashboard.",
    arrNote: "Unmeasurable. Any ARR at this level is counted inside Level 2 or 3 above.",
    risk: "We are selling a level we cannot prove anyone has reached.",
    move: "Instrument the Assist dimension. This is the blocking item on the roadmap." },
  { lvl: 5, name: "Mark Orchestrates", client: "Agentic 1:1", n: 0, pct: 0, arr: 0,
    conf: "No telemetry", col: "#08251A", ink: "#ABFF44",
    means: "Also uninstrumented. Two of the four ELT flagship bets land at this level and we have no way to measure progress toward either.",
    arrNote: "Unmeasurable.",
    risk: "Absence of evidence is not evidence of absence — but we cannot report progress on the company's stated strategy.",
    move: "Govern the Mark telemetry before anything else on the list." },
];

const MARQUEE = [
  "Three dormant accounts carry over $1M each",
  "Top ten dormant accounts: $9.1M combined",
  "Engaged ARR share fell 4.6pp year over year",
];

function Distribution() {
  const [sel, setSel] = useState(1);
  const d0 = DIST_CHART.find((x) => x.lvl === sel);

  const X0 = 90, COLW = 150, GAP = 24;
  const BAR_TOP = 54, BASE = 250, MAX_BAR_H = 180;
  const LABEL_1_Y = BASE + 34;
  const LABEL_2_Y = BASE + 54;
  const ARR_CAPTION_Y = BASE + 96;
  const ARR_TOP = BASE + 112;
  const ARR_H = 58;
  const FOOT_1_Y = ARR_TOP + ARR_H + 32;
  const FOOT_2_Y = ARR_TOP + ARR_H + 52;
  const W = X0 + 5 * COLW + 4 * GAP + 40;
  const H = FOOT_2_Y + 18;
  const maxN = 340, ARR_W = 5 * COLW + 4 * GAP, totalArr = 11.43;

  const segs = [
    { lvl: 1, w: (8.87 / totalArr) * ARR_W, fill: C.pink,  label: "$8.87M · 77.6%", sub: "non-engaged", big: true },
    { lvl: 2, w: (1.80 / totalArr) * ARR_W, fill: C.lf,    label: "$1.80M", sub: "engaged" },
    { lvl: 3, w: (0.77 / totalArr) * ARR_W, fill: C.grass, label: "$0.77M", sub: "" },
  ];

  return (
    <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
      <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>
        The current state, in one picture
      </div>
      <h3 className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: C.n1 }}>
        Two thirds of the base has never left Level 1 &mdash; and that is where the money is
      </h3>
      <p className="mt-2 text-sm" style={{ color: `${C.n1}99` }}>Select any level to see what it represents.</p>

      <div className="mt-5 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 820 }}>
          <line x1={X0 - 20} y1={BASE} x2={X0 + ARR_W + 10} y2={BASE} stroke={`${C.n1}33`} strokeWidth="1.5" />
          <text x={X0 - 28} y={BAR_TOP + 8} fill={`${C.n1}66`} fontSize="10" textAnchor="end" fontWeight="700">340</text>
          <text x={X0 - 28} y={BASE + 4} fill={`${C.n1}66`} fontSize="10" textAnchor="end" fontWeight="700">0</text>
          <text x="-170" y="22" transform="rotate(-90)" fill={`${C.n1}77`} fontSize="10" fontWeight="700" letterSpacing="1.2">ACCOUNTS</text>

          {DIST_CHART.map((d, i) => {
            const x = X0 + i * (COLW + GAP);
            const h = d.n > 0 ? Math.max((d.n / maxN) * MAX_BAR_H, 8) : 0;
            const y = BASE - h;
            const on = d.lvl === sel;
            return (
              <g key={d.lvl} onClick={() => setSel(d.lvl)} style={{ cursor: "pointer" }}>
                <rect x={x - 6} y={BAR_TOP - 34} width={COLW + 12} height={BASE - BAR_TOP + 96} fill="transparent" />
                {d.n > 0 ? (
                  <>
                    <rect x={x} y={y} width={COLW} height={h} fill={d.col} rx="5"
                          stroke={on ? C.n1 : "transparent"} strokeWidth="2.5" />
                    <text x={x + COLW / 2} y={y - 30} fill={C.n1} fontSize="26" fontWeight="800" textAnchor="middle">{d.n}</text>
                    <text x={x + COLW / 2} y={y - 12} fill={`${C.n1}99`} fontSize="11" fontWeight="700" textAnchor="middle">{d.pct}% of base</text>
                  </>
                ) : (
                  <>
                    <rect x={x} y={BASE - 38} width={COLW} height="38" fill="none"
                          stroke={on ? C.n1 : `${C.n1}30`} strokeWidth={on ? "2.5" : "1.5"} strokeDasharray="5 4" rx="5" />
                    <text x={x + COLW / 2} y={BASE - 15} fill={`${C.n1}70`} fontSize="11" fontWeight="700" textAnchor="middle">no telemetry</text>
                  </>
                )}
                <text x={x + COLW / 2} y={LABEL_1_Y} fill={on ? C.n1 : C.lf} fontSize="13" fontWeight="800" textAnchor="middle">
                  {`L${d.lvl} · ${d.name}`}
                </text>
                <text x={x + COLW / 2} y={LABEL_2_Y} fill={`${C.n1}88`} fontSize="10.5" fontWeight="600" textAnchor="middle">{d.client}</text>
                {on && <rect x={x + COLW / 2 - 18} y={LABEL_2_Y + 10} width="36" height="3" fill={C.n1} rx="1.5" />}
              </g>
            );
          })}

          <text x={X0} y={ARR_CAPTION_Y} fill={`${C.n1}77`} fontSize="10.5" fontWeight="700" letterSpacing="1.2">
            ARR BY LEVEL · $11.43M TOTAL
          </text>
          {(() => {
            let cx = X0;
            return segs.map((sg) => {
              const on = sg.lvl === sel;
              const el = (
                <g key={sg.lvl} onClick={() => setSel(sg.lvl)} style={{ cursor: "pointer" }}>
                  <rect x={cx} y={ARR_TOP} width={sg.w} height={ARR_H} fill={sg.fill} rx="5"
                        stroke={on ? C.n1 : "transparent"} strokeWidth="2.5" />
                  <text x={cx + sg.w / 2} y={ARR_TOP + 26} fill={C.fir} fontSize={sg.big ? "18" : "13"} fontWeight="800" textAnchor="middle">{sg.label}</text>
                  {sg.sub && <text x={cx + sg.w / 2} y={ARR_TOP + 44} fill={`${C.fir}CC`} fontSize="11" fontWeight="700" textAnchor="middle">{sg.sub}</text>}
                </g>
              );
              cx += sg.w + 4;
              return el;
            });
          })()}

          <text x={X0} y={FOOT_1_Y} fill={`${C.n1}66`} fontSize="10.5" fontWeight="600">
            Level 2 and 3 counts are upper bounds — cohort overlap is not resolvable in the current data. Dormant count ± 40 accounts.
          </text>
          <text x={X0} y={FOOT_2_Y} fill={`${C.n1}66`} fontSize="10.5" fontWeight="600">
            Level 4 and 5 have no telemetry at all. Absence of evidence is not evidence of absence.
          </text>
        </svg>
      </div>

      {/* ---- selected-level detail ---- */}
      <div className="mt-5 rounded-2xl p-6" style={{ backgroundColor: `${C.n1}0F`, border: `1px solid ${C.lf}33` }}>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ backgroundColor: d0.col, color: d0.ink }}>
            L{d0.lvl} · {d0.name}
          </span>
          <span className="text-sm font-semibold" style={{ color: `${C.n1}99` }}>client-facing: {d0.client}</span>
          <span className="rounded-full px-3 py-1 text-[11px] font-bold"
                style={{ backgroundColor: d0.conf === "Measured" ? C.lf : d0.conf === "No telemetry" ? C.pink : `${C.n1}1A`,
                         color: d0.conf === "No telemetry" || d0.conf === "Measured" ? C.fir : C.n1 }}>
            {d0.conf}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl p-4" style={{ backgroundColor: `${C.n1}10` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lf }}>Accounts</div>
            <div className="mt-1 text-2xl font-extrabold" style={{ color: C.n1 }}>
              {d0.n > 0 ? d0.n : "—"}
            </div>
            <div className="text-xs font-semibold" style={{ color: `${C.n1}88` }}>
              {d0.n > 0 ? `${d0.pct}% of the paying base` : "not measurable"}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: `${C.n1}10` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lf }}>ARR at this level</div>
            <div className="mt-1 text-2xl font-extrabold" style={{ color: d0.lvl === 1 ? C.pink : C.n1 }}>
              {d0.arr > 0 ? `$${d0.arr.toFixed(2)}M` : "—"}
            </div>
            <div className="text-xs font-semibold" style={{ color: `${C.n1}88` }}>{d0.arrNote}</div>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: C.pink }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>The risk</div>
            <p className="mt-1 text-sm font-semibold leading-snug" style={{ color: C.fir }}>{d0.risk}</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl p-4" style={{ backgroundColor: `${C.n1}10` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lf }}>What this cohort actually represents</div>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: `${C.n1}DD` }}>{d0.means}</p>
          </div>
          <div className="rounded-xl p-4" style={{ backgroundColor: C.lf }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.midFir }}>The move</div>
            <p className="mt-1 text-sm font-semibold leading-relaxed" style={{ color: C.fir }}>{d0.move}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        {MARQUEE.map((m, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: i === 0 ? C.pink : `${C.n1}14`, border: `1px solid ${C.lf}33` }}>
            <p className="text-sm font-extrabold leading-snug" style={{ color: i === 0 ? C.fir : C.n1 }}>{m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------- TAB: THE PROBLEMS ---------------------- */

function TheProblems() {
  const [open, setOpen] = useState("P1");
  const pr = PROBLEMS_WE_SOLVE.find((x) => x.n === open);
  const evTint = { "Measured · adoption dashboard": C.lf, "Measured · proxy metric only": C.sand, "Measured · instrumentation audit": C.lf, "Client sessions · two years": C.blue };
  return (
    <div>
      <SectionTitle
        eyebrow="Start here · the current state"
        title="Where the base actually sits today"
        sub="Before the model, before the roadmap — this is what we are solving for. Two thirds of paying accounts have never run a personalization campaign, and that is where more than three quarters of the ARR sits."
      />

      <Distribution />

      <div className="mt-12" />

      <SectionTitle
        eyebrow="The seven problems"
        title="Seven problems. Everything else in this board exists to solve one of them."
        sub="Stated before the model, before the evidence and before the roadmap — because a maturity model without a named problem is just a diagram. Each one carries what we observe, why it happens, how well evidenced it is, and what it costs us."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {PROBLEMS_WE_SOLVE.map((x) => {
          const on = x.n === open;
          return (
            <button key={x.n} onClick={() => setOpen(x.n)} className="rounded-full px-4 py-2 text-sm font-bold transition-colors" style={{ backgroundColor: on ? C.fir : C.n1, color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}>
              <span className="opacity-60">{x.n}</span>  {x.t}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full px-3 py-1 text-xs font-extrabold" style={{ backgroundColor: C.fir, color: C.lf }}>{pr.n}</span>
          <LevelBadge n={pr.lvl} />
          <Pill bg={evTint[pr.ev] || C.n3} fg={C.fir} border={`${C.fir}33`}>{pr.ev}</Pill>
        </div>
        <h3 className="mt-4 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: C.fir }}>{pr.t}</h3>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.n3 }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>What we observe</div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>{pr.sym}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.n3 }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>Why it happens</div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>{pr.why}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.sand }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>What it costs us</div>
            <p className="mt-2 text-sm font-extrabold leading-relaxed" style={{ color: C.fir }}>{pr.arr}</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.blue }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>In a client's words</div>
          <p className="mt-2 text-base italic leading-relaxed" style={{ color: C.fir }}>“{pr.quote}”</p>
        </div>

        <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lf }}>What fixes it</div>
          <p className="mt-2 text-base font-bold leading-relaxed" style={{ color: C.n1 }}>{pr.fix}</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["#", "Problem", "Evidence", "What it costs us", "Bites at"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROBLEMS_WE_SOLVE.map((x, i) => (
              <tr key={x.n} onClick={() => setOpen(x.n)} style={{ backgroundColor: x.n === open ? C.lf : i % 2 ? C.n3 : C.n1, cursor: "pointer" }}>
                <td className="px-4 py-3 text-sm font-extrabold" style={{ color: C.fir }}>{x.n}</td>
                <td className="px-4 py-3 text-sm font-bold" style={{ color: C.fir }}>{x.t}</td>
                <td className="px-4 py-3 text-xs" style={{ color: `${C.fir}A0` }}>{x.ev}</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: C.fir }}>{x.arr}</td>
                <td className="px-4 py-3"><LevelBadge n={x.lvl} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------- TAB: CLIENT REALITY ---------------------- */

function Reality() {
  return (
    <div>
      <SectionTitle
        eyebrow="The evidence base · two years of client sessions"
        title="Customers understand the value. They struggle to turn it into something they trust enough to launch."
        sub="Everything in this board traces back to one body of research: two years of personalization sessions, workshops and presentations with clients, synthesised into a single report. It is the reason we can say the base is early rather than assuming it, and the reason the model is shaped the way it is. Where a claim on any other tab is not backed by adoption telemetry, it is backed by this."
      />

      {/* PROVENANCE */}
      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>Where this comes from</div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight" style={{ color: C.n1 }}>
          The recurring gap is not feature awareness
        </h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          Across every session, the thing clients could not do was connect four things: who should receive a different
          experience, why that audience matters, what should change, and how the team will know it worked. Not one of
          those is a targeting capability. That single finding is what turned a feature roadmap into a maturity model,
          and it is why trust and ease run through every tab rather than sitting in a section of their own.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Katie's 2024 Lucid board", "Dan's client research deck", "The Product Designer briefing", "The CMAB interactive deck", "Two years of session themes"].map((x) => (
            <span key={x} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ backgroundColor: `${C.n1}14`, color: C.n1, border: `1px solid ${C.lf}44` }}>{x}</span>
          ))}
        </div>
      </div>

      {/* THE DECISION ARC */}
      <h3 className="mb-2 text-xl font-extrabold" style={{ color: C.fir }}>The five decisions a marketer actually walks through</h3>
      <p className="mb-4 max-w-4xl text-sm" style={{ color: `${C.fir}B0` }}>
        The sessions surfaced a consistent sequence — and a consistent place it breaks for each step. This is the
        workflow the product should support end to end. Today it supports step three well and the rest barely.
      </p>
      <div className="mb-12 space-y-3">
        {DECISION_ARC.map((d) => (
          <div key={d.n} className="rounded-2xl p-5" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                <span className="text-lg font-extrabold" style={{ color: C.gtg }}>{d.n}</span>
                <div>
                  <div className="text-base font-extrabold" style={{ color: C.fir }}>{d.t}</div>
                  <div className="mt-0.5 text-sm" style={{ color: `${C.fir}A0` }}>{d.d}</div>
                </div>
              </div>
              <LevelBadge n={d.lvl} />
            </div>
            <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: C.sand }}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>Where it breaks today · </span>
              <span className="text-sm" style={{ color: C.fir }}>{d.breaks}</span>
            </div>
          </div>
        ))}
      </div>

      {/* THE THREE ADOPTION PATTERNS */}
      <h3 className="mb-2 text-xl font-extrabold" style={{ color: C.fir }}>Three recurring adoption patterns — and they are the model's failure modes</h3>
      <p className="mb-4 max-w-4xl text-sm" style={{ color: `${C.fir}B0` }}>
        The sessions report named three ways a personalization programme gets stuck. They were written before this
        maturity model existed, and each one lands precisely on a level. That is the strongest single piece of
        validation we have — the research independently described the same three plateaus the model predicts.
      </p>
      <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {ADOPTION_PATTERNS.map((a) => (
          <div key={a.p} className="flex flex-col rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-base font-extrabold leading-tight" style={{ color: C.fir }}>{a.p}</h4>
              <LevelBadge n={a.lvl} />
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: `${C.fir}A0` }}>{a.d}</p>
            <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: a.conf === "Measured" ? C.lf : C.blue }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.midFir }}>{a.conf} today</div>
              <p className="mt-1 text-sm font-extrabold" style={{ color: C.fir }}>{a.measured}</p>
            </div>
          </div>
        ))}
      </div>

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

/* ---------------------- TAB: THE BASELINE ---------------------- */

const LADDER = [
  { rung: "Creates any audience", n: 408, pct: 76.3, lvl: "Entry to Level 2" },
  { rung: "Custom attribute audiences", n: 217, pct: 40.6, lvl: "Established Level 2" },
  { rung: "Behavioural / visitor-behaviour audiences", n: 96, pct: 17.9, lvl: "Entry to Level 3" },
];

const PROOFS = [
  { k: "01", t: "The ladder halves at every rung", n: "76% → 41% → 18%", tint: "lf",
    d: "408 accounts create an audience. 217 use custom attributes. 96 reach behavioural targeting. That is the maturity model's shape, measured independently of it.",
    so: "The model is not a framing device we invented. It describes a progression that already exists in the data, with the steepest fall exactly where we claimed: Level 2 to Level 3." },
  { k: "02", t: "Half of everything built never ships", n: "50.4%", tint: "sand",
    d: "780 campaigns created in August, 393 qualified. 387 abandoned. That conversion rate has not moved in twelve months — roughly 4,600 campaigns a year built and never launched.",
    so: "The execution bottleneck with a number attached, and the cleanest agentic argument available: lifting conversion to 65% ships around 114 more campaigns a month with zero new accounts." },
  { k: "03", t: "Almost nobody looks at the result", n: "9 of 101", tint: "pink",
    d: "101 accounts created a campaign in August. Nine viewed a results page. Under nine percent close the loop on their own work.",
    so: "The most serious finding for our thesis. Trust is built on evidence, and the evidence loop is open. A client who never sees whether it worked cannot build an internal case for doing more." },
  { k: "04", t: "The people who do use it are at a capacity ceiling", n: "+11%", tint: "blue",
    d: "Campaigns per active account rose from 6.95 to 7.72 while the per-paying-account ratio fell 21%. Absolute output was flat — the ratio fell because the denominator grew 25%.",
    so: "The product works for people who use it. They increased throughput while pressed against their own limits. That is the ceiling this model describes, and what agentic execution removes." },
];

function Baseline() {
  const tints = { lf: C.lf, sand: C.sand, pink: C.pink, blue: C.blue };
  return (
    <div>
      <SectionTitle
        eyebrow="Optimizely Analytics · baseline August 2026"
        title="The model is no longer a point of view. This is the measured baseline."
        sub="Adoption data from the Personalization usage dashboard, internal users excluded. It validates the shape of the maturity model against real behaviour, and replaces every population estimate with something defensible."
      />

      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>Correcting this model with real numbers</div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: C.n1 }}>
          I estimated a third of accounts sat at Level 1. It is more than two thirds.
        </h3>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          340 of 502 paying accounts — 67.7% — have not created a personalization campaign since December 2025.
          Measured monthly, 79.8% are inactive. The base is substantially earlier than this model assumed, and the
          error ran in the direction that matters: we have been designing and selling for a maturity most of the base
          has not reached.
        </p>
      </div>

      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>The audience sophistication ladder — independent confirmation</div>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: C.fir }}>Nobody built this to match our model. It matches anyway.</h3>
        <div className="mt-6 space-y-4">
          {LADDER.map((r, i) => (
            <div key={i}>
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-extrabold" style={{ color: C.fir }}>{r.rung}</span>
                <span className="text-xs font-semibold" style={{ color: C.lightFir }}>{r.n} accounts · {r.pct}% · {r.lvl}</span>
              </div>
              <div className="h-8 w-full overflow-hidden rounded-lg" style={{ backgroundColor: `${C.fir}10` }}>
                <div className="flex h-full items-center justify-end rounded-lg pr-3 text-xs font-extrabold" style={{ width: `${r.pct}%`, backgroundColor: [C.lf, C.grass, C.gtg][i], color: i === 2 ? C.n1 : C.fir }}>{r.pct}%</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
          Roughly half of each cohort fails to reach the next rung. The drop from custom attributes to behavioural
          targeting is the Level 2 to Level 3 transition — the single widest gap in the product, and the transition
          the client-facing model points every Level 2 account at.
        </p>
      </div>

      <h3 className="mb-4 text-xl font-extrabold" style={{ color: C.fir }}>Four findings, and what each means for this vision</h3>
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {PROOFS.map((pf) => (
          <div key={pf.k} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-extrabold" style={{ color: C.gtg }}>{pf.k}</span>
              <h4 className="text-lg font-extrabold leading-tight" style={{ color: C.fir }}>{pf.t}</h4>
            </div>
            <div className="mt-3 inline-block rounded-xl px-4 py-2 text-2xl font-extrabold" style={{ backgroundColor: tints[pf.tint], color: C.fir }}>{pf.n}</div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}A0` }}>{pf.d}</p>
            <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>What it means for us</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{pf.so}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.pink }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.fir }}>The finding that argues against us, kept in on purpose</div>
        <h3 className="mt-3 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: C.fir }}>
          Mark-generated audiences are down 77%, and the suggestion surface is falling fastest
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[["Mark-Suggested", "280 → 44", "−84%"], ["Mark Real-Time", "116 → 46", "−60%"], ["Combined", "396 → 90", "−77%"]].map(([t, v, d]) => (
            <div key={t} className="rounded-2xl p-4" style={{ backgroundColor: C.n1 }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>{t}</div>
              <div className="mt-1 text-sm font-semibold" style={{ color: `${C.fir}B0` }}>{v}</div>
              <div className="text-2xl font-extrabold" style={{ color: C.fir }}>{d}</div>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>
          <span className="font-extrabold">The asymmetry is the useful part.</span> Users are walking away from the
          suggestion experience faster than from the underlying capability. That points at the surface, not the
          intelligence — and it is precisely the failure this model predicts. A suggestion with no reasoning, no
          readiness check and no stated confidence is just a different kind of blank canvas.
        </p>
      </div>

      <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>What this data cannot tell us — state these before anyone asks</div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            ["The dormant count is ± 40 accounts", "The measure divides a campaign-creator count that is not ARR-filtered by a paying-account count that is."],
            ["The ladder uses a different denominator", "Audience sophistication percentages resolve to a base of roughly 535, not the 499 or 502 used elsewhere."],
            ["Level overlap is unresolved", "We cannot tell how many of the 162 active accounts are also among the 96 using behavioural audiences."],
            ["Level 4 and 5 are invisible", "No adaptive or agentic telemetry exists. Absence of evidence is not evidence of absence."],
            ["Two tiles disagree", "Campaign Started and Campaign Qualified return zero on one tile while the North Star tile returns 393."],
            ["Depth has no trend line", "Behavioural targeting adoption is a single point in time."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
              <div className="text-sm font-extrabold" style={{ color: C.fir }}>{t}</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------- TAB: NEXT ---------------------- */

const MOVES = [
  {
    r: 1, t: "Govern the Mark telemetry and instrument Assist",
    solves: "P7", arr: "Blocks a Product OKR and two of four ELT bets",
    accounts: "All", ev: "Measured", effort: "Data engineering", blocking: true,
    d: "Three Mark event streams sit in a personal sandbox schema and the only campaign-level authorship flag is in a personal namespace. Level 4 and Level 5 adoption cannot be evidenced at all today.",
    q: null,
    owner: "Data Engineering · do first",
  },
  {
    r: 2, t: "Rebuild the Mark suggestion surface around explainability",
    solves: "P4", arr: "Undermines the agentic thesis if unaddressed", accounts: "Every Level 2 account",
    ev: "Measured · proxy", effort: "Design + build", blocking: false,
    d: "Suggested audiences fell 84% against 60% for the underlying real-time capability. Users are leaving the suggestion experience faster than the intelligence behind it. Attach reasoning, readiness and confidence to every suggestion.",
    q: "Customers understand the value — they struggle to trust it enough to launch.",
    owner: "Design-owned · was not on the original list",
  },
  {
    r: 3, t: "Make readiness visible in-product",
    solves: "P1", arr: "$8.87M non-engaged ARR", accounts: "340 dormant",
    ev: "Measured", effort: "Design + build", blocking: false,
    d: "The eight readiness dimensions are invisible until something fails. Surfacing them turns 'tell me what is missing' from a client ask into a product feature, and it serves the 68% who never create a first campaign.",
    q: "Because I'm just a one person show, sometimes I feel I run out of ideas.",
    owner: "Highest-leverage build",
  },
  {
    r: 4, t: "Personalization Hub — list and detail, with Justification",
    solves: "P3", arr: "Gates every expansion conversation", accounts: "101 creating, 9 reviewing",
    ev: "Measured", effort: "Design + build", blocking: false,
    d: "Green-lit by Sathya. Name, Audience, Status, Uplift, Justification. That Justification column is the trust model made concrete. Reframe as activation rather than reporting — partner with Ola given the OA move.",
    q: "Relevancy is really hard to measure. A lot of what you're doing with personalization is qualitative, not quantitative.",
    owner: "Partner with Ola on results",
  },
  {
    r: 5, t: "Fix the terminology and build the consistent home",
    solves: "P5", arr: "Cheapest credibility win available", accounts: "All",
    ev: "Client sessions", effort: "A decision, not a build", blocking: false,
    d: "Sathya was explicit — not a fourth standalone product, but dedicated consistent space across Web Experimentation and FX. The shared surface can ship long before the plumbing is shared. Note the rename is incomplete in the data layer.",
    q: "We forget about the personalization type of experiment within Optimizely, I think because it's nested under experiment creation.",
    owner: "Needs a naming decision",
  },
  {
    r: 6, t: "One audience definition, activated everywhere",
    solves: "P6", arr: "Unblocks the widest gap in the product", accounts: "217 stuck at attribute audiences",
    ev: "Measured + sessions", effort: "Platform position", blocking: false,
    d: "76% create an audience, 41% use custom attributes, 18% reach behavioural. Borrow the interaction and mental model from ODP and other CDPs; do not assume the future is built on that codebase given the scalability questions.",
    q: "We create audiences once, and all the activations feed off those same audiences.",
    owner: "Needs a platform position",
  },
  {
    r: 7, t: "Take a position on FX, and review the Strategist outputs",
    solves: "Open", arr: "Unquantified — no telemetry", accounts: "Unknown",
    ev: "Anecdotal", effort: "Design direction", blocking: false,
    d: "Sathya flagged end-to-end agentic personalization as needing design input and named Dan's Personalization Strategist artifact. He also asked for direction on bringing FX into web and mobile personalization. Currently unowned.",
    q: "A couple items top of mind for me it would be good to get design direction on.",
    owner: "The opening · act on it",
  },
];

function Next() {
  const [open, setOpen] = useState(1);
  const m = MOVES.find((x) => x.r === open);
  const evTint = { Measured: C.lf, "Measured · proxy": C.sand, "Measured + sessions": C.lf, "Client sessions": C.blue, Anecdotal: C.n3 };
  return (
    <div>
      <SectionTitle
        eyebrow="Where this goes"
        title="Seven moves, ordered by criteria rather than instinct"
        sub="Every move maps to a named problem, carries its ARR exposure, and states how well evidenced it is. Two of these were reordered by the adoption data and one was not on the list at all before it."
      />

      {/* criteria */}
      <div className="mb-8 rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>How we prioritise — stated before the list, not after</div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PRIOR_CRITERIA.map((x) => (
            <div key={x.k} className="rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-extrabold" style={{ color: C.fir }}>{x.k}</span>
                <span className="text-[10px] font-bold uppercase" style={{ color: C.lightFir }}>{x.w}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: `${C.fir}A0` }}>{x.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ranked table */}
      <div className="mb-6 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["#", "Move", "Solves", "ARR exposure", "Reach", "Evidence", "Effort"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOVES.map((x, i) => (
              <tr key={x.r} onClick={() => setOpen(x.r)} style={{ backgroundColor: x.r === open ? C.lf : i % 2 ? C.n3 : C.n1, cursor: "pointer" }}>
                <td className="px-4 py-3 text-sm font-extrabold" style={{ color: C.fir }}>{x.r}</td>
                <td className="px-4 py-3 text-sm font-bold" style={{ color: C.fir }}>
                  {x.t}
                  {x.blocking && <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ backgroundColor: C.pink, color: C.fir }}>BLOCKING</span>}
                </td>
                <td className="px-4 py-3"><Pill bg={C.fir} fg={C.lf}>{x.solves}</Pill></td>
                <td className="px-4 py-3 text-xs font-semibold" style={{ color: C.fir }}>{x.arr}</td>
                <td className="px-4 py-3 text-xs" style={{ color: `${C.fir}A0` }}>{x.accounts}</td>
                <td className="px-4 py-3"><Pill bg={evTint[x.ev] || C.n3} fg={C.fir} border={`${C.fir}33`}>{x.ev}</Pill></td>
                <td className="px-4 py-3 text-xs" style={{ color: `${C.fir}A0` }}>{x.effort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* detail */}
      <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold" style={{ backgroundColor: C.lf, color: C.fir, border: `2px solid ${C.fir}` }}>{m.r}</span>
          <Pill bg={C.fir} fg={C.lf}>Solves {m.solves}</Pill>
          <Pill bg={C.n3} fg={C.lightFir}>{m.owner}</Pill>
        </div>
        <h3 className="mt-4 text-2xl font-extrabold leading-tight" style={{ color: C.fir }}>{m.t}</h3>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{m.d}</p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-2xl p-4" style={{ backgroundColor: C.sand }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>ARR exposure</div>
            <div className="mt-1 text-sm font-extrabold" style={{ color: C.fir }}>{m.arr}</div>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>Accounts reached</div>
            <div className="mt-1 text-sm font-extrabold" style={{ color: C.fir }}>{m.accounts}</div>
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: evTint[m.ev] || C.n3 }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>Evidence strength</div>
            <div className="mt-1 text-sm font-extrabold" style={{ color: C.fir }}>{m.ev}</div>
          </div>
        </div>
        {m.q && (
          <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.blue }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>Asked for, in their words</div>
            <p className="mt-2 text-base italic leading-relaxed" style={{ color: C.fir }}>“{m.q}”</p>
          </div>
        )}
      </div>

      {/* data gap honesty */}
      <div className="mt-6 rounded-3xl p-6" style={{ backgroundColor: C.pink }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.fir }}>Where this prioritisation is still weak</div>
        <h3 className="mt-2 text-xl font-extrabold" style={{ color: C.fir }}>Per-account ARR is not yet attached to individual moves</h3>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>
          The ARR figures above are portfolio-level, taken from the adoption report. Attaching ARR to a specific move
          means joining the dormant-account list to Salesforce account records. Two things currently block that:
          Salesforce name matching is unreliable — a lookup for one named dormant account returned a different legal
          entity in another region with zero ARR — so the join needs account IDs from the adoption analysis rather than
          names. And the analytics warehouse behind the Personalization dashboard is not currently queryable for this.
          Both are fixable, and both sit inside move 1.
        </p>
      </div>
    </div>
  );
}

/* ---------------------- SHELL ---------------------- */

const TABS = [
  { id: "problems", label: "The problems",    el: <TheProblems /> },
  { id: "baseline", label: "The baseline",    el: <Baseline /> },
  { id: "maturity", label: "Maturity model",  el: <Maturity /> },
  { id: "reality",  label: "Client reality",  el: <Reality /> },
  { id: "next",     label: "What we do next", el: <Next /> },
];

export default function AgenticPersonalization() {
  const [tab, setTab] = useState("problems");

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
              <button key={t.id} onClick={() => setTab(t.id)} className="rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
                style={{ backgroundColor: on ? C.fir : "transparent", color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}>
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
