import React, { useEffect, useState } from "react";

/* ============================================================
   THE PERSONALIZATION MATURITY MODEL — CLIENT-FACING
   Levels · Journey funnel · Data foundation · Mark
   Every feature framed on three axes: what it does, why it is
   easy, why it can be trusted. No fabricated figures anywhere.
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

/* ---------------------- LEVELS ---------------------- */

const LEVELS = [
  {
    id: 1,
    name: "One Size Fits All",
    swatch: C.n3,
    ink: C.fir,
    x: 70,
    y: 340,
    unlocks: "Your baseline",
    removes: "This is what everything else gets measured against",
    hereIf: [
      "Every visitor sees the same page, the same offer, the same journey",
      "Personalization is something the team talks about, not something that runs",
      "Nobody could name your top five entry pages by volume without digging",
    ],
    startHere: {
      what: "One rule this month, and start collecting data today",
      why:
        "Two things at once, and the order matters. Ship a single visible rule on a high-traffic page so the team sees personalization work rather than hearing about it. Then turn on data collection, because behavioural history accumulates on a slower clock than anything else here. You cannot personalize next year on data you did not start collecting this year.",
      hero: "Web Experimentation audiences, plus ODP or your CDP collecting events",
    },
    features: [
      {
        n: "Web Experimentation — basic audiences",
        d: "Geo, device, traffic source, referrer.",
        easy: "Built from signals every website already receives. No integration, no data project, no engineering ticket.",
        trust: "You write the rule, so you can always answer why someone saw what they saw. Nothing happens that you did not specify.",
      },
      {
        n: "CMS visitor groups",
        d: "Built-in targeting, right where your content already lives.",
        easy: "Your content team does it themselves, in the tool they use every day.",
        trust: "Previewable before publishing. You see the variant exactly as the visitor will.",
      },
      {
        n: "Optimizely Data Platform (ODP)",
        d: "Start collecting events and resolving identity now.",
        easy: "Collection starts with a tag. The value builds quietly in the background while you get on with other work.",
        trust: "Consent and identity handling are explicit from day one, rather than retrofitted once the data matters.",
      },
    ],
    mark: {
      does:
        "Mark reads your site and your traffic and hands back a ranked shortlist of where personalizing would actually change an outcome. You get a starting position instead of an empty campaign builder.",
      trust:
        "Mark shows its reasoning for every suggestion — which pages, what traffic, what it noticed. And at this level it only ever drafts. Nothing reaches a visitor until you approve it.",
    },
    data: {
      state: "Analytics only, no unified customer profile",
      need: "Event collection and identity resolution switched on",
      detail:
        "This is the gating item for everything above. Whether that is ODP or an existing CDP, the priority is identical: accumulate behavioural history against a resolved identity, starting now.",
    },
    trap: "Waiting for a perfect data project before running anything. Ship a rule this month and instrument in parallel.",
    effort: "First rule live in under a day",
  },
  {
    id: 2,
    name: "Rules-Based Targeting",
    swatch: C.lf,
    ink: C.fir,
    x: 250,
    y: 305,
    unlocks: "Relevance you control",
    removes: "Removes the one-size-fits-all ceiling",
    hereIf: [
      "You can name two or three audiences that genuinely behave differently",
      "You are running targeted campaigns, but each one is hand-built",
      "You have rebuilt the same audience in more than one tool",
    ],
    startHere: {
      what: "Behavior Targeting",
      why:
        "The single best next step from rules, and far easier than it sounds. Rather than targeting who someone is, you target what they have just done — the category they keep returning to, the pages viewed repeatedly, where they have reached in a journey. It needs no CDP project and no data science, and it tends to outperform attribute-based rules for a simple reason: intent beats identity.",
      hero: "Behavior Targeting, on your highest-traffic template",
    },
    features: [
      {
        n: "Personalization Campaigns (Web Experimentation)",
        d: "Known audience, known experience. The workhorse.",
        easy: "Visual editor. A marketer builds and launches without waiting on a release cycle.",
        trust: "Preview as any audience before you publish, and switch it off instantly if something looks wrong.",
      },
      {
        n: "CMS Personalization",
        d: "Content-level targeting, owned by the content team.",
        easy: "Personalization becomes part of publishing rather than a separate project with its own process.",
        trust: "Runs through your existing editorial approval workflow. Nothing bypasses the people who already sign off content.",
      },
      {
        n: "Feature Experimentation — targeted delivery",
        d: "The same idea for app and in-product surfaces.",
        easy: "One way of defining an audience that works across web, mobile and product.",
        trust: "Flag-controlled, so anything can be rolled back immediately without a deployment.",
      },
      {
        n: "Behavior Targeting",
        d: "Onsite behaviour as an intent signal. The standout starting point.",
        easy: "No CDP project and no data science. The signal is already on your site — you are simply choosing to act on it.",
        trust: "You can see exactly which behaviour qualified someone, so the rule is explainable to anyone who asks.",
      },
      {
        n: "ODP / CDP segments and list attributes",
        d: "Known-customer segments powering web and email alike.",
        easy: "Define the audience once, use it in more than one place.",
        trust: "One definition means one answer. Three copies of an audience is how reporting stops being believable.",
      },
    ],
    mark: {
      does:
        "Mark drafts the variants, or points you at the asset you already own and forgot about. The content bottleneck — the reason most good ideas at this level never ship — stops being the thing that decides what you attempt.",
      trust:
        "Everything Mark produces arrives as a draft for review, in your brand voice, with the source it drew on. You approve, edit or reject. Mark never publishes on its own at this level.",
    },
    data: {
      state: "Segments exist, usually batch, often rebuilt per tool",
      need: "One agreed audience definition, even if maintained by hand",
      detail:
        "Your CDP earns its keep here. ODP, Tealium, Salesforce, Segment — whichever you run, the goal is an audience defined once and activated in more than one place. The common failure is the same audience existing three times, with three slightly different definitions and three different answers.",
    },
    trap: "Widening the audience until the content workload is manageable, which dilutes it until the effect disappears.",
    effort: "First campaign live in days",
  },
  {
    id: 3,
    name: "Behavioral & Data-Driven",
    swatch: C.grass,
    ink: C.fir,
    x: 440,
    y: 240,
    unlocks: "Relevance at a scale you could not staff",
    removes: "Removes the content production bottleneck",
    hereIf: [
      "Real-time behaviour drives what people see, not just static attributes",
      "Customer data from your CDP or CRM reaches the experience layer",
      "You personalize in more than one channel, though they do not yet coordinate",
    ],
    startHere: {
      what: "Recommendations, powered by real-time segments",
      why:
        "The ceiling at this level is almost never targeting. It is content. Recommendations break that ceiling by surfacing things you have already made instead of requiring a new variant per segment, which means relevance stops scaling with your production capacity. Pair them with real-time segments so someone qualifies mid-session rather than overnight.",
      hero: "Content or Product Recommendations, plus ODP Real-Time Segments",
    },
    features: [
      {
        n: "ODP Real-Time Segments",
        d: "Qualifies in-session rather than in an overnight batch.",
        easy: "Built in the same segment builder your team already uses. Real-time is a setting, not a rebuild.",
        trust: "You can see who qualified and which condition they met, at the moment it happened.",
      },
      {
        n: "Content Recommendations",
        d: "The right guide, story or tool from the library you already own.",
        easy: "No new content required. It works with what is already published.",
        trust: "You set the rules of the shelf — what can be recommended, what is excluded, what must always appear.",
      },
      {
        n: "Product Recommendations",
        d: "A short list from a catalogue of hundreds of thousands.",
        easy: "Replaces merchandising work no team could do by hand at catalogue scale.",
        trust: "Respects stock, eligibility and business rules, so it will not promote something you cannot fulfil.",
      },
      {
        n: "Salesforce Audience, Tealium, CRM attributes",
        d: "Bring the customer data you already hold to the experience.",
        easy: "Use what exists. No re-entering customer data into yet another system.",
        trust: "Your CRM stays the source of truth. Nothing is duplicated or quietly re-derived somewhere else.",
      },
      {
        n: "Dynamic Experience",
        d: "Experiences that compose rather than branching into rule sprawl.",
        easy: "One experience that adapts, instead of twelve variants to maintain forever.",
        trust: "Fewer moving parts means fewer places for an unintended combination to appear.",
      },
      {
        n: "Mark-assisted content variants",
        d: "Removes the production ceiling on small, sharp audiences.",
        easy: "Audience size stops being limited by how much content you can write.",
        trust: "Drafted against your brand guidelines, reviewed by your team before anything goes live.",
      },
    ],
    mark: {
      does:
        "Mark checks whether the data actually supports what you are about to build — reading across ODP, your CDP, CRM attributes and behavioural signals — and tells you in plain language what is usable and what is not. It then recommends the simplest approach that fits, so nobody has to learn feature names before they can describe their situation.",
      trust:
        "This is the point where Mark starts being most useful by telling you no. If your tracking, audience size or content will not support the idea, Mark says so before the sprint is spent rather than after the campaign underperforms. A recommendation always arrives with its reasoning and the signals behind it.",
    },
    data: {
      state: "Real-time behavioural signals plus known-customer data, connected",
      need: "A CDP doing real work: identity resolution, real-time segments, multi-channel activation",
      detail:
        "This is where a CDP stops being infrastructure and becomes the engine. ODP is the native path with the tightest integration, but the model holds with Tealium, Salesforce, Segment or an enterprise CDP. What matters is that a segment qualifies in real time and activates in more than one channel. Batch-only segmentation holds you at Level 2 no matter how good your targeting tooling is.",
    },
    trap: "Assuming entitlement equals readiness. Owning the capability is not the same as having tracking you would bet on.",
    effort: "Weeks — data readiness is the long pole, not build time",
  },
  {
    id: 4,
    name: "Adaptive & Orchestrated",
    swatch: C.gtg,
    ink: C.n1,
    x: 630,
    y: 160,
    unlocks: "Learning instead of guessing",
    removes: "Removes the need to pick a winner in advance",
    hereIf: [
      "You have several credible options and no strong opinion about which wins",
      "Channels coordinate — what happens on the site informs what happens in email",
      "You can see every personalization and its result in one place",
    ],
    startHere: {
      what: "Contextual Multi-Armed Bandits (CMAB)",
      why:
        "The honest use case is simple. You have five to twenty good ideas and no way to know which works for which visitor. Instead of choosing a winner too early, or hand-writing a rule for every combination, the system learns while the campaign runs and shifts traffic toward what is working in each context. You define the options, the guardrails and the metric. It handles the allocation, and it shows you what it has learned.",
      hero: "CMAB on one decision where you genuinely do not know the answer",
    },
    features: [
      {
        n: "Contextual Multi-Armed Bandits (CMAB)",
        d: "Learns which experience fits which visitor context.",
        easy: "Removes the need to hand-write a rule for every audience and treatment combination — the work that grows forever.",
        trust: "You see what it is weighing, which options are in play, and what it has learned so far. You set the options and the guardrails; it cannot go outside them.",
      },
      {
        n: "Autonomous Optimization",
        d: "Keeps optimising toward your metric without manual check-ins.",
        easy: "No weekly ritual of reading dashboards and manually reallocating traffic.",
        trust: "It optimises toward the metric you named, and you can pause or override it at any point.",
      },
      {
        n: "Cross-channel orchestration",
        d: "Web, app and email as one journey rather than three islands.",
        easy: "One coordinated sequence instead of three teams guessing at each other's timing.",
        trust: "Frequency and suppression rules are yours to set, so a customer is never pursued across every channel at once.",
      },
      {
        n: "Optimizely Analytics",
        d: "One consolidated view of personalization results.",
        easy: "The end of screenshotting four dashboards into one slide.",
        trust: "One number, one methodology, one place. Results that reconcile are results people act on.",
      },
      {
        n: "Experimentation programme",
        d: "Test broadly, find where audiences truly differ, personalize on evidence.",
        easy: "Tells you where personalizing is worth the effort, so you stop spending it everywhere.",
        trust: "Personalization backed by evidence is far easier to defend internally than personalization backed by a hunch.",
      },
    ],
    mark: {
      does:
        "Mark helps you judge whether an adaptive approach genuinely fits before you commit to one, then turns the result into a decision rather than a chart — keep, change, expand, stop, or reuse.",
      trust:
        "At this level the system is choosing who sees what, so explainability is the whole product. Mark answers, at any moment: here is what I am weighing, here are the options in play, here is what I have learned, and here is what I would do next. If the conditions for learning are not there — not enough traffic, no clear metric, options that barely differ — Mark tells you to run something simpler instead.",
    },
    data: {
      state: "Unified profile with rich context, activating across channels",
      need: "Enough traffic, and enough context per visitor, for a system to learn from",
      detail:
        "Adaptive approaches are hungry. They need volume, time, a clear primary metric and genuine contextual signal — and the context is what the CDP supplies. A bandit with no context is just a slower A/B test. This is also where CDP scalability becomes a real conversation, because you are querying it in the request path rather than nightly.",
    },
    trap: "Running an adaptive approach on a decision you already know the answer to. If you know the winner, ship the winner.",
    effort: "Configured in days, learns over weeks",
  },
  {
    id: 5,
    name: "Agentic 1:1",
    swatch: C.fir,
    ink: C.lf,
    x: 810,
    y: 85,
    unlocks: "An audience of one",
    removes: "Removes the manual production limit entirely",
    hereIf: [
      "You want relevance for an individual, not a segment",
      "Manual production could never reach the number of experiences you need",
      "AI agents, not only people, are arriving on your site",
    ],
    startHere: {
      what: "One bounded use case, with a holdback",
      why:
        "Do not start everywhere. Choose one surface where individual relevance is obviously valuable, set an explicit boundary on what Mark may change, and hold back a portion of traffic so you can prove the effect. Measurement is genuinely harder at this level — when only one person sees their version there is no variant to compare against — so decide how you will judge it before you build it.",
      hero: "Limitless 1:1 Personalization or the Front-end Experience Agent, on one surface",
    },
    features: [
      {
        n: "Limitless 1:1 Personalization",
        d: "Bespoke pages at a scale no team could staff manually.",
        easy: "The number of experiences you can run stops being a function of headcount.",
        trust: "You define what may be assembled and from which approved components. Every page is inspectable after the fact.",
      },
      {
        n: "Front-end Experience Agent",
        d: "Finds the most relevant next thing before a returning visitor leaves.",
        easy: "Works from content you already have. No new production required to make it useful.",
        trust: "It surfaces your published content, within your rules. It does not invent things about your business.",
      },
      {
        n: "Personalization Strategist",
        d: "Works an opportunity through to the next decision, not just the idea.",
        easy: "Covers the parts of the job nobody has time for — finding the opportunity, checking readiness, deciding what happens next.",
        trust: "Every recommendation arrives with its reasoning and the data behind it. You remain the one who decides.",
      },
      {
        n: "Agentic-legible experiences",
        d: "Your site readable by the agents now browsing on customers' behalf.",
        easy: "A growing share of your traffic is not human. This meets it without a separate build.",
        trust: "You control what is exposed to agents and what stays for people.",
      },
    ],
    mark: {
      does:
        "Mark reasons about the individual rather than matching them to a segment, assembles the experience, and closes the loop by measuring and adjusting. This is the level where the work genuinely stops scaling with your headcount.",
      trust:
        "The more Mark decides, the more it has to show. You set the remit — which surfaces, which content, what needs approval, what it may never touch. Every decision is logged and reviewable, there is always a way back, and Mark will recommend a holdback so you can prove the effect rather than assume it. In regulated industries the boundary is configured before anything runs.",
    },
    data: {
      state: "A live, complete profile the agent can reason over",
      need: "Consent, governance, and an explicit boundary on what may be used and changed",
      detail:
        "The CDP is no longer feeding a segment, it is feeding a reasoning process. That raises the bar on data quality and governance together. In regulated industries the boundary comes first: which signals are in scope, what requires human approval, what is logged, and what can be rolled back.",
    },
    trap: "Turning on autonomy with no checkpoint. The teams who struggle here are the ones who skipped the levels that build trust.",
    effort: "Continuous — there is no single launch moment",
  },
];

/* ---------------------- JOURNEY FUNNEL ---------------------- */

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
      { lvl: 4, p: "Learn which arrangement helps which kind of visitor find things faster", f: "CMAB, Dynamic Experience" },
      { lvl: 5, p: "The whole library reordered around one person", f: "Limitless 1:1 Personalization" },
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
      { lvl: 4, p: "Learn which reassurance resolves which hesitation, by context", f: "CMAB" },
      { lvl: 5, p: "Assemble the case for this individual", f: "Limitless 1:1 Personalization" },
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
      { lvl: 4, p: "Learn which framing, nudge or step order converts which context", f: "CMAB, Autonomous Optimization" },
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
      { lvl: 4, p: "Learn which prompt and which sequence gets which person to value fastest", f: "CMAB, cross-channel orchestration" },
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
      { lvl: 4, p: "Learn which next-best-offer fits which customer context", f: "CMAB, Autonomous Optimization" },
      { lvl: 5, p: "Reason about the right next step for this individual relationship", f: "Agentic personalization with Mark" },
    ],
    easy: true,
    trust:
      "Relevance and intrusion are separated by a thin line at this stage. Using what someone told you is helpful. Using what you inferred about them, without saying so, is where trust is lost.",
  },
];

/* ---------------------- MARK ---------------------- */

const MARK_JOBS = [
  {
    job: "Finding the opportunity",
    without: "Someone stares at analytics hoping something jumps out. Ideas are limited to one person's available hours.",
    with: "Mark reads your traffic, content and goals and returns a ranked list of where relevance would change an outcome.",
    lvl: 1,
  },
  {
    job: "Checking you are ready",
    without: "You discover the tracking, audience size or content was not sufficient after the campaign underperforms.",
    with: "Mark validates the data before you build and tells you plainly what is missing and what is usable.",
    lvl: 3,
  },
  {
    job: "Building the audience",
    without: "The same audience is defined separately in two or three tools, with three slightly different answers.",
    with: "Mark reads what is available across ODP, your CDP and your CRM, and assembles it once.",
    lvl: 3,
  },
  {
    job: "Choosing the approach",
    without: "You have to understand what a bandit is before you can decide whether you need one.",
    with: "Describe the situation in plain language. Mark recommends the simplest capability that fits, and explains why.",
    lvl: 3,
  },
  {
    job: "Creating the content",
    without: "The hard ceiling. No capacity for variants, so audiences get widened until the relevance disappears.",
    with: "Mark drafts the variants in your brand voice, or finds the asset already sitting in your library.",
    lvl: 2,
  },
  {
    job: "Deciding who sees what",
    without: "A human writes every rule, then writes more forever as the combinations multiply.",
    with: "Mark allocates by learning across context, inside the guardrails you set, and shows its working.",
    lvl: 4,
  },
  {
    job: "Knowing what happened",
    without: "Results sit in separate dashboards and someone assembles a slide from four screenshots.",
    with: "One result, one place, with the justification attached to the campaign that produced it.",
    lvl: 4,
  },
  {
    job: "Deciding what to do next",
    without: "The report shows a number and leaves you staring at a chart.",
    with: "Mark ends in a decision — keep, change, expand, stop or reuse — with the reasoning behind it.",
    lvl: 5,
  },
];

const MARK_TRUST = [
  {
    t: "It shows its work",
    d: "Every suggestion, audience and recommendation arrives with the reasoning and the signals behind it. You are never asked to accept an output on faith, and you can always answer a colleague who asks why a visitor saw what they saw.",
  },
  {
    t: "It checks the data first",
    d: "Mark validates what is actually usable before you build — tracking, audience size, content, measurement. Being told your data will not support an idea is more valuable than being helped to build it anyway.",
  },
  {
    t: "It tells you when not to",
    d: "If a simpler approach fits better, or the conditions for learning are not there, Mark says so. An assistant that only ever agrees with you is not one you can rely on for a decision that matters.",
  },
  {
    t: "You set the boundary",
    d: "Which surfaces, which content, which decisions need your approval, and what Mark may never touch. The remit is explicit, configured by you, and visible at all times.",
  },
  {
    t: "Nothing ships unseen",
    d: "Mark drafts by default. As you grant more autonomy, you choose the checkpoints — and there is always a way back. Trust is earned level by level, not requested up front.",
  },
  {
    t: "It reports the misses",
    d: "Including the personalizations that did not work. A system that only ever surfaces wins is a system nobody believes about a win.",
  },
];

/* ---------------------- SUPPORTING ---------------------- */

const CDP_TRACK = [
  { lvl: 1, label: "Collecting", d: "Events and identity switched on. Nothing activating yet." },
  { lvl: 2, label: "Segmenting", d: "Batch segments and list attributes, defined once where possible." },
  { lvl: 3, label: "Real-time", d: "In-session qualification, activating in more than one channel." },
  { lvl: 4, label: "Orchestrating", d: "Unified profile in the request path, feeding adaptive decisions." },
  { lvl: 5, label: "Reasoning", d: "A complete profile an agent can reason over, under explicit governance." },
];

const MYTHS = [
  ["We need a CDP before we can do anything.", "You can run rules-based personalization today with signals you already have. Start collecting in parallel, because data matures on a slower clock than tooling does."],
  ["Personalization means creating content for every segment.", "The cheapest relevance is surfacing something you already made. For most of the journey, recommendations beat authoring — and Mark drafts the rest."],
  ["AI will make decisions we cannot explain.", "Only if you let it. Mark shows its reasoning at every level, drafts by default, and operates inside a remit you define. Autonomy is something you grant deliberately, not a setting that arrives switched on."],
  ["We need perfect data first.", "You need trustworthy data for the one specific thing you are trying to do. That is a far smaller problem than a data strategy, and Mark will tell you whether you have it."],
];

const NINETY = [
  { w: "Weeks 1–2", t: "Find out where you actually are", d: "Walk the five levels honestly, then walk the data track separately. Most teams sit a level lower on data than they assume, and that gap is the real constraint." },
  { w: "Weeks 3–4", t: "Ship one thing", d: "One rule or one behaviour-triggered experience, on a page with real traffic, against one metric you already trust. Credibility before sophistication." },
  { w: "Weeks 5–8", t: "Close the data gap", d: "Whatever the next level needs — collection, identity resolution, real-time segments — start it now, because it takes longer than anything else on this list." },
  { w: "Weeks 9–12", t: "Prove it, then pick one next step", d: "Report the result honestly, including what did not work, and commit to one capability from the next level rather than three from the one after it." },
];

/* ---------------------- PRIMITIVES ---------------------- */

function Pill({ children, bg, fg, border }) {
  return (
    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: bg, color: fg, border: border ? `1px solid ${border}` : "none" }}>
      {children}
    </span>
  );
}

function LevelTag({ n }) {
  const l = LEVELS[n - 1];
  return (
    <span className="inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ backgroundColor: l.swatch, color: l.ink, border: `1px solid ${C.fir}22` }}>
      L{n} · {l.name}
    </span>
  );
}

function Eyebrow({ children }) {
  return <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>{children}</div>;
}

/* ---------------------- CURVE ---------------------- */

function Curve({ active, setActive }) {
  const path = "M 70 340 C 190 337, 240 327, 330 300 S 500 240, 600 188 S 740 112, 872 64";
  return (
    <div className="rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
      <Eyebrow><span style={{ color: C.lf }}>The curve</span></Eyebrow>
      <h2 className="mt-2 text-2xl font-extrabold md:text-3xl" style={{ color: C.n1 }}>
        Each level removes the constraint that was limiting the one below it
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: `${C.n1}B0` }}>
        That is why this gets easier as you climb rather than harder. Select a point to see what it takes to get there.
      </p>

      <div className="mt-6 overflow-x-auto">
        <svg viewBox="0 0 920 430" className="w-full" style={{ minWidth: 780 }}>
          <line x1="54" y1="34" x2="54" y2="378" stroke={`${C.n1}44`} strokeWidth="2" />
          <line x1="54" y1="378" x2="900" y2="378" stroke={`${C.n1}44`} strokeWidth="2" />
          <text x="-300" y="26" transform="rotate(-90)" fill={`${C.n1}99`} fontSize="12" fontWeight="700" letterSpacing="1.5">VALUE TO YOUR CUSTOMER</text>
          <text x="390" y="412" fill={`${C.n1}99`} fontSize="12" fontWeight="700" letterSpacing="1.5">PERSONALIZATION MATURITY</text>
          <path d={path} fill="none" stroke={C.lf} strokeWidth="3.5" strokeLinecap="round" />
          {LEVELS.map((l) => {
            const on = l.id === active;
            return (
              <g key={l.id} onClick={() => setActive(l.id)} style={{ cursor: "pointer" }}>
                <line x1={l.x} y1={l.y - 16} x2={l.x} y2={l.y - 38} stroke={`${C.n1}33`} strokeWidth="1.5" strokeDasharray="3 4" />
                <circle cx={l.x} cy={l.y} r={on ? 14 : 9} fill={on ? C.lf : C.n1} stroke={C.fir} strokeWidth="3" />
                <text x={l.x} y={l.y - 46} fill={on ? C.lf : C.n1} fontSize={on ? 15 : 13} fontWeight="800" textAnchor="middle">{l.unlocks}</text>
                <text x={l.x} y={l.y + 28} fill={on ? C.lf : `${C.n1}CC`} fontSize="12" fontWeight="700" textAnchor="middle">{`L${l.id}`}</text>
                <text x={l.x} y={l.y + 44} fill={on ? C.lf : `${C.n1}99`} fontSize="11" fontWeight="600" textAnchor="middle">{l.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ---------------------- LEVEL DETAIL ---------------------- */

function Detail({ l }) {
  return (
    <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
      <div className="flex flex-wrap items-center gap-3">
        <Pill bg={l.swatch} fg={l.ink} border={`${C.fir}33`}>Level {l.id} · {l.name}</Pill>
        <Pill bg={C.n3} fg={C.fir}>{l.removes}</Pill>
        <Pill bg={C.n3} fg={C.fir}>{l.effort}</Pill>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>You are here if</h4>
          <ul className="space-y-2">
            {l.hereIf.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm" style={{ color: C.fir }}>
                <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded" style={{ backgroundColor: C.lf, border: `1px solid ${C.fir}` }} />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl p-4" style={{ backgroundColor: C.sand, border: `1px solid ${C.fir}22` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>The trap at this level</div>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{l.trap}</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl p-6" style={{ backgroundColor: C.lf, border: `2px solid ${C.fir}` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.fir }}>Start here</div>
            <h3 className="mt-2 text-2xl font-extrabold leading-tight" style={{ color: C.fir }}>{l.startHere.what}</h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>{l.startHere.why}</p>
            <div className="mt-4 rounded-xl px-4 py-3" style={{ backgroundColor: C.fir }}>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: `${C.lf}AA` }}>Do this first · </span>
              <span className="text-sm font-bold" style={{ color: C.n1 }}>{l.startHere.hero}</span>
            </div>
          </div>

          {/* MARK AT THIS LEVEL */}
          <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: C.fir }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>How Mark helps at this level</div>
            <p className="mt-2 text-base leading-relaxed" style={{ color: C.n1 }}>{l.mark.does}</p>
            <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: C.pink }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>And why you can trust it here</div>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{l.mark.trust}</p>
            </div>
          </div>

          <h4 className="mb-1 mt-8 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>Everything available to you at this level</h4>
          <p className="mb-3 text-xs" style={{ color: `${C.fir}90` }}>Each one shown with why it is straightforward to run, and why you can stand behind it.</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {l.features.map((f, i) => (
              <div key={i} className="rounded-xl p-4" style={{ backgroundColor: C.n3, border: `1px solid ${C.fir}22` }}>
                <div className="text-sm font-extrabold" style={{ color: C.fir }}>{f.n}</div>
                <div className="mt-1 text-xs leading-relaxed" style={{ color: `${C.fir}B0` }}>{f.d}</div>
                <div className="mt-3 rounded-lg p-2.5" style={{ backgroundColor: `${C.lf}66` }}>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: C.midFir }}>Easy · </span>
                  <span className="text-xs leading-relaxed" style={{ color: C.fir }}>{f.easy}</span>
                </div>
                <div className="mt-2 rounded-lg p-2.5" style={{ backgroundColor: `${C.blue}66` }}>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: C.darkBlue }}>Trust · </span>
                  <span className="text-xs leading-relaxed" style={{ color: C.fir }}>{f.trust}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl p-6" style={{ backgroundColor: C.blue, border: `2px solid ${C.fir}` }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.fir }}>Your data foundation at this level · ODP or your CDP</div>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-xl p-3" style={{ backgroundColor: `${C.n1}CC` }}>
                <div className="text-[10px] font-bold uppercase" style={{ color: C.darkBlue }}>Where you are</div>
                <div className="text-sm font-semibold" style={{ color: C.fir }}>{l.data.state}</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: `${C.n1}CC` }}>
                <div className="text-[10px] font-bold uppercase" style={{ color: C.darkBlue }}>What the next level needs</div>
                <div className="text-sm font-semibold" style={{ color: C.fir }}>{l.data.need}</div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}DD` }}>{l.data.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- FUNNEL ---------------------- */

function Funnel({ level }) {
  const [open, setOpen] = useState("evaluate");
  const s = STAGES.find((x) => x.id === open);

  return (
    <section className="mt-16">
      <Eyebrow>Your customer journey</Eyebrow>
      <h2 className="mt-2 text-3xl font-extrabold md:text-4xl" style={{ color: C.fir }}>
        Personalization is not one thing on your homepage. It is a different job at every stage.
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
        These seven stages are deliberately generic, because every business has a version of them whatever the labels.
        Map your own journey onto them, in your own language. For each stage you will see what your customer is trying
        to do, the signal you almost certainly already have, and what you could do about it at each level of maturity.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {STAGES.map((st) => {
          const on = st.id === open;
          return (
            <button key={st.id} onClick={() => setOpen(st.id)} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors" style={{ backgroundColor: on ? C.fir : C.n1, color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}>
              <span className="text-[10px] opacity-70">{st.n}</span>
              {st.name}
              {st.easy && <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: on ? C.lf : C.gtg }} />}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs" style={{ color: `${C.fir}90` }}>
        A dot marks the stages where the signal is cheapest and the content usually already exists — the best places to
        start if you are early.
      </p>

      <div className="mt-6 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-5xl font-extrabold" style={{ color: C.lf }}>{s.n}</div>
            <h3 className="mt-1 text-3xl font-extrabold" style={{ color: C.fir }}>{s.name}</h3>
            <p className="mt-3 text-lg font-bold italic leading-snug" style={{ color: C.lightFir }}>“{s.q}”</p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{s.doing}</p>

            <div className="mt-6 rounded-2xl p-4" style={{ backgroundColor: C.blue }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>Signal available here</div>
              <p className="mt-1 text-sm font-semibold" style={{ color: C.fir }}>{s.signal}</p>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: `${C.fir}CC` }}>{s.haveIt}</p>
            </div>

            {s.trust && (
              <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.pink }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.fir }}>Handle with care</div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{s.trust}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>What you can do here, by level</h4>
            <div className="space-y-3">
              {s.plays.map((p, i) => {
                const yours = p.lvl === level;
                const reachable = p.lvl <= level;
                return (
                  <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: yours ? C.lf : C.n3, border: `2px solid ${yours ? C.fir : "transparent"}`, opacity: reachable ? 1 : 0.65 }}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <LevelTag n={p.lvl} />
                      {yours && <span className="text-[11px] font-extrabold uppercase tracking-wider" style={{ color: C.fir }}>You can run this now</span>}
                      {!reachable && <span className="text-[11px] font-semibold" style={{ color: `${C.fir}80` }}>Ahead of where you are today</span>}
                    </div>
                    <p className="mt-2 text-base font-bold leading-snug" style={{ color: C.fir }}>{p.p}</p>
                    <p className="mt-1 text-xs font-semibold" style={{ color: C.lightFir }}>{p.f}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
              <p className="text-sm leading-relaxed" style={{ color: C.n1 }}>
                <span className="font-extrabold" style={{ color: C.lf }}>Pick one stage, not seven. </span>
                The most common way a programme stalls is trying to personalize the whole journey at once. Choose the
                single stage where you lose the most people, do the level you are actually at, and prove it before
                moving on. Mark can tell you which stage that is.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- MARK SECTION ---------------------- */

function MarkSection() {
  return (
    <section className="mt-16">
      <Eyebrow>Mark, our AI platform</Eyebrow>
      <h2 className="mt-2 text-3xl font-extrabold md:text-4xl" style={{ color: C.fir }}>
        The work that made personalization hard is the work Mark takes on
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
        When teams ask whether personalization is worth it, they are not weighing software cost. They are weighing
        planning, audience definition, content production, design, development, QA, coordination, measurement and
        maintenance. Mark changes that side of the equation — and it does so without asking you to take anything on
        faith.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl" style={{ border: `2px solid ${C.fir}` }}>
        <table className="w-full min-w-[880px] border-collapse text-left">
          <thead>
            <tr style={{ backgroundColor: C.fir }}>
              {["The job", "Without Mark", "With Mark", "From"].map((h) => (
                <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lf }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MARK_JOBS.map((m, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 ? C.n3 : C.n1 }}>
                <td className="px-4 py-4 align-top text-sm font-extrabold" style={{ color: C.fir }}>{m.job}</td>
                <td className="px-4 py-4 align-top text-xs leading-relaxed" style={{ color: `${C.fir}A0` }}>{m.without}</td>
                <td className="px-4 py-4 align-top text-sm leading-relaxed" style={{ color: C.fir }}>{m.with}</td>
                <td className="px-4 py-4 align-top"><LevelTag n={m.lvl} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mt-12 text-2xl font-extrabold md:text-3xl" style={{ color: C.fir }}>
        Every decision Mark takes off your plate is replaced with something you can see
      </h3>
      <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
        That is the principle the whole product is built on. Ease of execution is worth nothing if you are not
        comfortable pressing go, so visibility scales with autonomy — the more Mark does, the more it shows you.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {MARK_TRUST.map((g, i) => (
          <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="text-2xl font-extrabold" style={{ color: C.gtg }}>{String(i + 1).padStart(2, "0")}</div>
            <h4 className="mt-2 text-lg font-extrabold leading-tight" style={{ color: C.fir }}>{g.t}</h4>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{g.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: C.lf }}>You decide how much Mark does</div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {["Mark suggests, you approve everything", "Mark advises on approach, you decide", "Mark decides inside your guardrails", "Mark runs the loop, you govern it"].map((s, i, arr) => (
            <React.Fragment key={s}>
              <span className="rounded-full px-4 py-2 text-xs font-bold" style={{ backgroundColor: i === 0 ? C.lf : `${C.n1}1A`, color: i === 0 ? C.fir : C.n1, border: `1px solid ${C.lf}66` }}>{s}</span>
              {i < arr.length - 1 && <span className="font-bold" style={{ color: C.lf }}>→</span>}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          Most teams start at the left and stay there for a while, which is exactly right. Each step is a deliberate
          decision you make once Mark has earned it, not a default you inherit. You can move back at any point.
        </p>
      </div>
    </section>
  );
}

/* ---------------------- MAIN ---------------------- */

export default function PersonalizationMaturityClient() {
  const [active, setActive] = useState(2);
  const l = LEVELS.find((x) => x.id === active);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Personalization Maturity Model | Client Guide";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen w-full px-5 py-10 md:px-10" style={{ backgroundColor: C.n3, fontFamily: "Inter, Arial, sans-serif" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <Eyebrow>The Personalization Maturity Model</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] md:text-6xl" style={{ color: C.fir }}>
            Find where you are.
            <br />
            <span style={{ color: C.gtg }}>Start with what fits.</span>
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed" style={{ color: `${C.fir}C0` }}>
            Most personalization programmes do not stall because the ambition was wrong. They stall because the first
            thing attempted sat three levels ahead of the data, the content capacity or the team behind it. This model
            exists to prevent that. Find your level honestly, take the one recommended next step, and let the
            capability arrive when you are ready for it.
          </p>
          <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
            <p className="text-base font-bold leading-relaxed" style={{ color: C.lf }}>
              Two things run through every level. How straightforward it is to actually execute, and why you can stand
              behind what it does. Neither is worth much without the other.
            </p>
          </div>
        </header>

        {/* LEVEL SELECTOR */}
        <div className="mb-8">
          <div className="mb-3 text-sm font-bold" style={{ color: C.lightFir }}>Select your level — everything below updates to match</div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {LEVELS.map((lv) => {
              const on = lv.id === active;
              return (
                <button key={lv.id} onClick={() => setActive(lv.id)} className="rounded-2xl p-4 text-left transition-all duration-150" style={{ backgroundColor: on ? lv.swatch : C.n1, color: on ? lv.ink : C.fir, border: `2px solid ${on ? C.fir : `${C.fir}22`}`, transform: on ? "translateY(-3px)" : "none", boxShadow: on ? `0 6px 0 0 ${C.fir}` : "none" }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">Level {lv.id}</div>
                  <div className="mt-1 text-base font-extrabold leading-tight">{lv.name}</div>
                  <div className="mt-3 text-xs font-semibold opacity-85">{lv.unlocks}</div>
                </button>
              );
            })}
          </div>
        </div>

        <Curve active={active} setActive={setActive} />
        <Detail l={l} />
        <Funnel level={active} />
        <MarkSection />

        {/* DATA TRACK */}
        <section className="mt-16">
          <Eyebrow>The parallel track</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl" style={{ color: C.fir }}>
            Your personalization maturity is capped by your data maturity
          </h2>
          <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
            These two tracks move together, and the data one moves slower. A team can license a sophisticated targeting
            capability this quarter and still operate at Level 2, because the signals underneath it are not there yet.
            Whether you run ODP, Tealium, Salesforce, Segment or an enterprise CDP, the progression is the same — and
            knowing which rung you are on is usually more useful than knowing what you are licensed for.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CDP_TRACK.map((c) => {
              const lv = LEVELS[c.lvl - 1];
              const on = c.lvl === active;
              return (
                <button key={c.lvl} onClick={() => setActive(c.lvl)} className="rounded-2xl p-5 text-left transition-all duration-150" style={{ backgroundColor: on ? C.blue : C.n1, border: `2px solid ${on ? C.fir : `${C.fir}22`}`, transform: on ? "translateY(-3px)" : "none", boxShadow: on ? `0 6px 0 0 ${C.fir}` : "none" }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.darkBlue }}>Data · Level {c.lvl}</div>
                  <div className="mt-1 text-lg font-extrabold" style={{ color: C.fir }}>{c.label}</div>
                  <div className="mt-2 text-xs leading-relaxed" style={{ color: `${C.fir}B0` }}>{c.d}</div>
                  <div className="mt-3 text-[11px] font-semibold" style={{ color: C.lightFir }}>Unlocks {lv.name}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
            <p className="text-sm leading-relaxed" style={{ color: C.n1 }}>
              <span className="font-extrabold" style={{ color: C.lf }}>The practical implication. </span>
              If your two tracks are misaligned, the lower one is your real level. Invest there first. The most common
              version of this is a team with excellent targeting tooling and batch-only segmentation, wondering why
              their behavioural campaigns underperform. Mark will tell you which of the two is holding you back.
            </p>
          </div>
        </section>

        {/* MEASUREMENT */}
        <section className="mt-16 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
          <Eyebrow>Proving it</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl" style={{ color: C.fir }}>How to get a number you can actually defend</h2>
          <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
            Personalization earns its budget on evidence, not enthusiasm. This method works at every level and it is
            what makes a result credible to the people who did not build it.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              ["Hold traffic back", "Keep a portion of visitors on the unpersonalized experience. This is your control, and the only honest comparison you have."],
              ["Name one metric first", "Decide what should move before you build, not after you see the results. One primary metric, agreed in advance."],
              ["Let it run properly", "Stopping early because the number looks good is the fastest way to report a result that does not repeat."],
              ["Report the misses too", "A programme that only ever reports wins is one nobody believes. Credibility is built on the honest ones."],
            ].map(([t, d], i) => (
              <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: C.n3, border: `1px solid ${C.fir}22` }}>
                <div className="text-2xl font-extrabold" style={{ color: C.gtg }}>{i + 1}</div>
                <h3 className="mt-1 text-base font-extrabold leading-tight" style={{ color: C.fir }}>{t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.sand }}>
            <p className="text-sm leading-relaxed" style={{ color: C.fir }}>
              <span className="font-extrabold">One caveat worth knowing early. </span>
              At Level 5, where an experience is assembled for one individual, the usual maths stops applying — there is
              no second group seeing the same version to compare against. A holdback population becomes the measurement
              method rather than a nice-to-have. We would rather raise that now than after you have built something.
            </p>
          </div>
        </section>

        {/* MYTHS */}
        <section className="mt-16">
          <Eyebrow>Before you start</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl" style={{ color: C.fir }}>Four things that hold teams back, and why they are wrong</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {MYTHS.map(([m, a], i) => (
              <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
                <p className="text-base font-bold italic leading-snug" style={{ color: `${C.fir}80` }}>“{m}”</p>
                <div className="mt-3 h-px w-full" style={{ backgroundColor: `${C.fir}22` }} />
                <p className="mt-3 text-sm leading-relaxed" style={{ color: C.fir }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 90 DAYS */}
        <section className="mt-16">
          <Eyebrow>Wherever you are starting</Eyebrow>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl" style={{ color: C.fir }}>The first ninety days look the same at every level</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {NINETY.map((n, i) => (
              <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: i === 1 ? C.lf : C.n1, border: `2px solid ${C.fir}` }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>{n.w}</div>
                <h3 className="mt-2 text-lg font-extrabold leading-tight" style={{ color: C.fir }}>{n.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{n.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSE */}
        <section className="mt-16 rounded-3xl p-8 md:p-12" style={{ backgroundColor: C.fir }}>
          <Eyebrow><span style={{ color: C.lf }}>What this is really for</span></Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: C.n1 }}>
            Every level you climb makes the next one easier, not harder
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed" style={{ color: `${C.n1}CC` }}>
            That runs against the usual intuition, where sophistication means more work. It holds here because each
            level removes a constraint that was limiting the one below it. Rules remove the one-size-fits-all ceiling.
            Behaviour removes the guesswork about who to target. Recommendations remove the content bottleneck.
            Adaptive removes the need to pick a winner in advance. Mark removes the manual production limit entirely.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed" style={{ color: `${C.n1}CC` }}>
            The teams who get furthest are not the ones who started with the most advanced capability. They are the
            ones who shipped something small, measured it honestly against a holdback, and used what they learned to
            justify the next step — building confidence in the system at the same rate they handed work to it.
          </p>
          <div className="mt-8 inline-block rounded-full px-8 py-4 text-base font-extrabold" style={{ backgroundColor: C.pink, color: C.fir }}>
            Find your level. Pick one journey stage. Take one step.
          </div>
        </section>

        <footer className="mt-12 border-t pt-6 text-xs leading-relaxed" style={{ borderColor: `${C.fir}22`, color: `${C.fir}80` }}>
          The journey stages are deliberately generic so they can be relabelled to match how your organisation already
          describes its customer journey. The data progression applies regardless of which CDP you run. Any performance
          figures added to this model should come from your own holdback measurement.
        </footer>
      </div>
    </div>
  );
}
