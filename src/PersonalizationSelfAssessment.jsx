import React, { useEffect, useMemo, useState } from "react";

/* ============================================================
   FIND YOUR FIRST PERSONALIZATION — CLIENT SELF-ASSESSMENT
   Five questions in. One specific, defensible starting point out.
   Themes: trust and ease, throughout. No invented benchmarks.
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

/* ---------------------- OPTIONS ---------------------- */

const INDUSTRIES = [
  {
    id: "media",
    label: "Media & Publishing",
    moment: "the second article",
    care: null,
    note: "Almost all of your value sits in recirculation and in choosing the right moment to ask for something.",
  },
  {
    id: "software",
    label: "Software & Technology",
    moment: "the evaluation stage",
    care: null,
    note: "Your hardest handoff is marketing site to product, and it is usually where personalization stops dead.",
  },
  {
    id: "retail",
    label: "Retail & Ecommerce",
    moment: "the moment choice becomes overwhelming",
    care: null,
    note: "High volume and a large catalogue. The job is narrowing choice fast, then earning the second purchase.",
  },
  {
    id: "finserv",
    label: "Financial Services",
    moment: "the application drop-off",
    care:
      "Regulated. Mark works only on consented signals, and anything touching rates, terms or eligibility language sits behind a human approval checkpoint you configure before anything runs.",
    note: "Long, trust-led and heavily regulated, with a well-known drop-off at application.",
  },
  {
    id: "health",
    label: "Healthcare",
    moment: "finding and booking care",
    care:
      "PHI-bounded. Mark personalizes on non-PHI or explicitly consented signals only, and clinical content is never authored without clinical review. The boundary is configured first.",
    note: "Anxious anonymous research on one side, sensitive known-patient interaction on the other.",
  },
  {
    id: "b2b",
    label: "B2B Manufacturing & Distribution",
    moment: "finding the right part",
    care: null,
    note: "Your buyer is doing a job, not shopping. Wins come from removing friction, not from persuasion.",
  },
  {
    id: "services",
    label: "Consumer Services",
    moment: "the comparison stage",
    care: null,
    note: "Considered and trust-led. Value comes from qualification and deflection more than upsell.",
  },
  {
    id: "other",
    label: "Something else",
    moment: "your biggest drop-off",
    care: null,
    note: "The pattern below holds regardless of sector — relabel the stages in your own language.",
  },
];

const CDP = [
  { id: "odp", label: "Optimizely Data Platform (ODP)", weight: 2, note: "Native path, tightest integration. Real-time segments are a setting rather than a rebuild." },
  { id: "other", label: "Another CDP — Tealium, Segment, Salesforce, or similar", weight: 2, note: "Works the same way. What matters is real-time qualification and multi-channel activation, not the logo." },
  { id: "crm", label: "A CRM, but nothing I would call a CDP", weight: 1, note: "Enough for known-customer targeting. Real-time behavioural work will need a step up." },
  { id: "none", label: "Neither, or I am not sure", weight: 0, note: "Not a blocker for starting. It is the thing to begin in parallel, because data matures slowly." },
];

const DATA = [
  { id: "analytics", label: "Web analytics (GA4 or similar)", lifts: 0, note: "Tells you where the traffic and the drop-offs are. Enough to choose where to start." },
  { id: "experiment", label: "Experimentation results", lifts: 1, note: "The most underused input here. It already tells you where audiences genuinely behave differently." },
  { id: "behaviour", label: "On-site behavioural signals", lifts: 1, note: "Intent beats identity. This is what makes Behavior Targeting work without a data project." },
  { id: "crmdata", label: "CRM or customer records", lifts: 1, note: "Turns anonymous targeting into known-customer relevance, especially after they convert." },
  { id: "txn", label: "Purchase or transaction history", lifts: 1, note: "The strongest signal for repeat and expansion moments." },
  { id: "campaign", label: "Campaign and email engagement", lifts: 0, note: "Useful for coordinating channels once you reach orchestration." },
  { id: "unsure", label: "I am not sure what we have", lifts: 0, note: "Genuinely common. Mark can read what is connected and tell you what is usable." },
];

const STAGES = [
  { id: "arrive", label: "Arrive", q: "Is this place relevant to me at all?", signal: "Traffic source, campaign clicked, search term, device, location", cheap: true },
  { id: "orient", label: "Orient", q: "Where is the thing I need?", signal: "Category dwell, repeat views, search terms, filters applied", cheap: false },
  { id: "evaluate", label: "Evaluate", q: "Is this right, and can I trust it?", signal: "Repeat views without acting, comparison behaviour, proof content consumed", cheap: true },
  { id: "act", label: "Act", q: "Can I complete this without friction?", signal: "Drop-off step, time on step, device switch, basket or form state", cheap: false },
  { id: "onboard", label: "Onboard", q: "Did I make the right decision?", signal: "What they chose, setup steps outstanding, first-use behaviour", cheap: true },
  { id: "return", label: "Return", q: "Is it worth coming back?", signal: "Visit cadence, declining frequency, channel preference", cheap: false },
  { id: "grow", label: "Grow", q: "What else is genuinely useful to me?", signal: "What they already hold, category gaps, tenure", cheap: true },
];

/* ---------------------- RECOMMENDATION ENGINE ---------------------- */

const PLAYS = {
  arrive: {
    low: {
      name: "Match the landing experience to the reason they arrived",
      how: "Web Experimentation audiences, or CMS visitor groups",
      what:
        "Take your two or three highest-volume traffic sources and give each one an opening that reflects what they clicked. Nothing else changes on the page.",
    },
    high: {
      name: "Recognise the returning visitor and pick up where they left off",
      how: "Behavior Targeting with ODP or your CDP real-time segments",
      what:
        "A visitor who has been here before does not need the introduction again. Use what they did last time to choose the opening.",
    },
  },
  orient: {
    low: {
      name: "Reorder what you feature for your two clearest audiences",
      how: "Personalization Campaigns, or CMS Personalization",
      what:
        "Keep the page, change the order. Put the category or content each audience actually wants in the first screenful.",
    },
    high: {
      name: "Let the shortlist assemble itself from demonstrated interest",
      how: "Content or Product Recommendations, plus Behavior Targeting",
      what:
        "Rather than authoring a variant per segment, surface what you already have, ordered by what this visitor has shown interest in.",
    },
  },
  evaluate: {
    low: {
      name: "Bring your strongest reassurance forward for repeat visitors",
      how: "Behavior Targeting on repeat views",
      what:
        "Someone viewing the same thing a third time has an unresolved doubt. Move the reviews, the returns policy, the proof point, or the comparison up the page for them.",
    },
    high: {
      name: "Learn which reassurance resolves which hesitation",
      how: "Contextual Multi-Armed Bandits (CMAB)",
      what:
        "You likely have several credible reassurances and no way to know which works for whom. Let Mark learn it across visitor context rather than picking one in advance.",
    },
  },
  act: {
    low: {
      name: "Remove a step for the people who do not need it",
      how: "Personalization Campaigns, or Feature Experimentation for in-product flows",
      what:
        "Identify one audience who is being asked for something you already know, and skip it for them. Personalize the path, never the terms.",
    },
    high: {
      name: "Learn which framing recovers which abandonment context",
      how: "CMAB, with Autonomous Optimization once it is proven",
      what:
        "Abandonment has several different causes wearing the same costume. Let the system work out which nudge fits which context.",
    },
  },
  onboard: {
    low: {
      name: "Replace the generic welcome with one that reflects what they chose",
      how: "CMS Personalization with ODP or CDP segments",
      what:
        "You now know more about this person than at any earlier point, and most businesses use none of it. This is the most under-personalized stage there is.",
    },
    high: {
      name: "A next-best-action driven by what is still outstanding",
      how: "ODP Real-Time Segments, plus Content Recommendations",
      what:
        "Show the one thing they have not done yet, rather than a static checklist everybody sees.",
    },
  },
  return: {
    low: {
      name: "Change the entry point for people who have been here before",
      how: "Web Experimentation audiences, CMS Personalization",
      what:
        "A returning visitor arriving at the same front door as a stranger is a wasted signal. Start with something that acknowledges the history.",
    },
    high: {
      name: "Bring forward what they are most likely to want next",
      how: "Recommendations plus ODP or CDP segments across web and email",
      what:
        "Use cadence and history to anticipate the next need, and coordinate it across the channels you already run.",
    },
  },
  grow: {
    low: {
      name: "Suppress what they already have",
      how: "ODP or CDP segments with CMS Personalization",
      what:
        "The cheapest relevance win available anywhere. Stop showing existing customers the thing they bought last year. Costs almost nothing and is immediately noticeable.",
    },
    high: {
      name: "Surface the genuinely adjacent thing",
      how: "CRM and CDP attributes with Recommendations",
      what:
        "Base the next suggestion on what they actually hold, not on what you would most like to sell.",
    },
  },
};

const STAGE_METRIC = {
  arrive: "Bounce rate on those landing pages, and continuation to a second page",
  orient: "Products or articles viewed per session, and search abandonment",
  evaluate: "Progression from viewing to acting — add-to-cart, enquiry, application start",
  act: "Completion rate of the flow, measured at the step you changed",
  onboard: "Activation — the proportion who complete setup or reach first value",
  return: "Return visit rate and repeat purchase or engagement frequency",
  grow: "Share of customers holding more than one product, category or service",
};

function assess(a) {
  const ind = INDUSTRIES.find((i) => i.id === a.industry);
  const cdp = CDP.find((c) => c.id === a.cdp);
  const stage = STAGES.find((s) => s.id === a.stage);
  const picks = a.data || [];

  const signalScore = picks.reduce((n, id) => n + (DATA.find((d) => d.id === id)?.lifts || 0), 0);
  const cdpScore = cdp?.weight ?? 0;
  const raw = signalScore + cdpScore;

  // Level: deliberately conservative. We would rather under-promise.
  let level = 2;
  let levelName = "Rules-Based Targeting";
  if (raw >= 5) {
    level = 4;
    levelName = "Adaptive & Orchestrated";
  } else if (raw >= 3) {
    level = 3;
    levelName = "Behavioral & Data-Driven";
  }
  if (picks.length === 0 || (picks.length === 1 && picks[0] === "unsure")) {
    level = 2;
    levelName = "Rules-Based Targeting";
  }

  const tier = level >= 3 ? "high" : "low";
  const play = PLAYS[stage.id][tier];

  // Gaps — what is missing, said before they build
  const gaps = [];
  if (!picks.includes("behaviour") && !picks.includes("unsure")) {
    gaps.push({
      t: "On-site behavioural signal",
      d: "You did not select behavioural data. It is usually already being collected and it is the single cheapest upgrade to targeting quality — intent beats attributes almost every time.",
    });
  }
  if (cdp?.id === "none") {
    gaps.push({
      t: "Event collection and identity",
      d: "Start collecting now, even while you run the rule above. Behavioural history accumulates on a slow clock and it gates everything past Level 2 later.",
    });
  }
  if (cdp?.id === "crm") {
    gaps.push({
      t: "Real-time qualification",
      d: "Your CRM gives you known-customer targeting. Moving from overnight batch to in-session qualification is what opens Level 3.",
    });
  }
  if (!picks.includes("experiment")) {
    gaps.push({
      t: "Your experimentation results",
      d: "The most underused input available to you. Past tests already show where audiences genuinely behave differently, which is the cheapest way to find out where personalizing is worth the effort.",
    });
  }
  if (picks.includes("unsure")) {
    gaps.push({
      t: "A read of what you already have",
      d: "Not knowing is common and not a problem. Mark can read what is connected and report what is actually usable, in plain language, before you commit to anything.",
    });
  }

  return { ind, cdp, stage, level, levelName, play, gaps, signalScore, raw, picks };
}

/* ---------------------- PRIMITIVES ---------------------- */

function Eyebrow({ children, light }) {
  return (
    <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: light ? C.lf : C.lightFir }}>
      {children}
    </div>
  );
}

function Choice({ on, onClick, title, sub, multi }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-3 rounded-2xl p-4 text-left transition-all duration-150"
      style={{
        backgroundColor: on ? C.lf : C.n1,
        border: `2px solid ${on ? C.fir : `${C.fir}22`}`,
        transform: on ? "translateY(-2px)" : "none",
        boxShadow: on ? `0 4px 0 0 ${C.fir}` : "none",
      }}
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[11px] font-extrabold"
        style={{
          backgroundColor: on ? C.fir : "transparent",
          color: C.lf,
          border: `2px solid ${C.fir}`,
          borderRadius: multi ? 4 : 999,
        }}
      >
        {on ? "✓" : ""}
      </span>
      <span>
        <span className="block text-sm font-extrabold" style={{ color: C.fir }}>{title}</span>
        {sub && <span className="mt-0.5 block text-xs leading-relaxed" style={{ color: `${C.fir}A0` }}>{sub}</span>}
      </span>
    </button>
  );
}

/* ---------------------- QUESTIONS ---------------------- */

function Questions({ a, set, onRun, canRun }) {
  const toggleData = (id) => {
    const cur = a.data || [];
    if (id === "unsure") return set({ ...a, data: cur.includes("unsure") ? [] : ["unsure"] });
    const next = cur.filter((x) => x !== "unsure");
    set({ ...a, data: next.includes(id) ? next.filter((x) => x !== id) : [...next, id] });
  };

  const Q = ({ n, title, sub, children }) => (
    <section className="mb-10">
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-extrabold" style={{ color: C.gtg }}>{n}</span>
        <h3 className="text-xl font-extrabold" style={{ color: C.fir }}>{title}</h3>
      </div>
      {sub && <p className="mt-1 max-w-3xl text-sm leading-relaxed" style={{ color: `${C.fir}A0` }}>{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );

  return (
    <div>
      <Q n="1" title="What kind of business are you?" sub="This shapes which journey moments matter most, and whether there are regulatory boundaries to set first.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((i) => (
            <Choice key={i.id} on={a.industry === i.id} onClick={() => set({ ...a, industry: i.id })} title={i.label} />
          ))}
        </div>
      </Q>

      <Q n="2" title="Do you have a customer data platform?" sub="There is a useful starting point at every answer, including no. This only changes which one we point you at.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {CDP.map((c) => (
            <Choice key={c.id} on={a.cdp === c.id} onClick={() => set({ ...a, cdp: c.id })} title={c.label} sub={c.note} />
          ))}
        </div>
      </Q>

      <Q n="3" title="Which of these do you already have?" sub="Select everything that applies. We will only recommend something your data can actually support — and tell you plainly what is missing.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {DATA.map((d) => (
            <Choice key={d.id} multi on={(a.data || []).includes(d.id)} onClick={() => toggleData(d.id)} title={d.label} sub={d.note} />
          ))}
        </div>
      </Q>

      <Q n="4" title="Where on your site are you thinking about?" sub="Optional, and nothing is fetched or stored — it simply makes the recommendation concrete enough to act on.">
        <input
          value={a.url || ""}
          onChange={(e) => set({ ...a, url: e.target.value })}
          placeholder="yourcompany.com/the-page-you-have-in-mind"
          className="w-full rounded-2xl px-5 py-4 text-sm outline-none"
          style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}33`, color: C.fir }}
        />
        <p className="mt-2 text-xs" style={{ color: `${C.fir}90` }}>
          Prefer not to share a URL? Leave it blank, or bring a screenshot to the conversation instead. It changes
          nothing about the recommendation you get.
        </p>
      </Q>

      <Q n="5" title="Which moment in your customer's journey?" sub="Pick the one where you lose the most people. Not the one that is easiest to change — the one that costs you most.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((s) => (
            <Choice
              key={s.id}
              on={a.stage === s.id}
              onClick={() => set({ ...a, stage: s.id })}
              title={s.label}
              sub={`“${s.q}”`}
            />
          ))}
        </div>
      </Q>

      <button
        onClick={onRun}
        disabled={!canRun}
        className="rounded-full px-8 py-4 text-base font-extrabold transition-opacity"
        style={{
          backgroundColor: canRun ? C.pink : `${C.fir}1A`,
          color: canRun ? C.fir : `${C.fir}66`,
          border: `2px solid ${canRun ? C.fir : "transparent"}`,
          cursor: canRun ? "pointer" : "not-allowed",
        }}
      >
        Show me where to start
      </button>
      {!canRun && (
        <p className="mt-3 text-xs" style={{ color: `${C.fir}90` }}>
          Answer questions 1, 2, 3 and 5 to continue. Question 4 is optional.
        </p>
      )}
    </div>
  );
}

/* ---------------------- RESULT ---------------------- */

function Result({ r, a, onBack }) {
  const { ind, cdp, stage, level, levelName, play, gaps } = r;

  return (
    <div>
      <button onClick={onBack} className="mb-8 rounded-full px-5 py-2 text-xs font-bold" style={{ backgroundColor: C.n1, color: C.fir, border: `2px solid ${C.fir}` }}>
        Change my answers
      </button>

      {/* HEADLINE */}
      <div className="rounded-3xl p-6 md:p-10" style={{ backgroundColor: C.fir }}>
        <Eyebrow light>Your starting point</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl" style={{ color: C.n1 }}>
          {play.name}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed" style={{ color: `${C.n1}CC` }}>{play.what}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full px-4 py-2 text-xs font-extrabold" style={{ backgroundColor: C.lf, color: C.fir }}>
            {play.how}
          </span>
          <span className="rounded-full px-4 py-2 text-xs font-bold" style={{ backgroundColor: `${C.n1}1A`, color: C.n1, border: `1px solid ${C.lf}66` }}>
            Level {level} · {levelName}
          </span>
          <span className="rounded-full px-4 py-2 text-xs font-bold" style={{ backgroundColor: `${C.n1}1A`, color: C.n1, border: `1px solid ${C.lf}66` }}>
            {stage.label} · {ind.label}
          </span>
        </div>
        {a.url && (
          <p className="mt-5 text-sm" style={{ color: `${C.n1}99` }}>
            Applied to <span className="font-bold" style={{ color: C.lf }}>{a.url}</span>
          </p>
        )}
      </div>

      {/* REGULATED CARE */}
      {ind.care && (
        <div className="mt-4 rounded-3xl p-6" style={{ backgroundColor: C.blue, border: `2px solid ${C.fir}` }}>
          <Eyebrow>Before anything else, the boundary</Eyebrow>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>{ind.care}</p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}CC` }}>
            In your sector this is the first conversation, not the last one. Knowing exactly what the system may and may
            not touch is what makes the rest of it evaluable.
          </p>
        </div>
      )}

      {/* WHY THIS */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-3xl p-6 lg:col-span-2" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
          <Eyebrow>Why this one, for you</Eyebrow>
          <ul className="mt-3 space-y-3">
            <li className="flex gap-3 text-sm" style={{ color: C.fir }}>
              <span className="font-extrabold" style={{ color: C.gtg }}>—</span>
              <span>
                <span className="font-extrabold">You chose {stage.label}.</span> Your customer is asking “{stage.q}”.
                The signal that answers it — {stage.signal.toLowerCase()} — is the kind you are most likely already
                collecting.
              </span>
            </li>
            <li className="flex gap-3 text-sm" style={{ color: C.fir }}>
              <span className="font-extrabold" style={{ color: C.gtg }}>—</span>
              <span>
                <span className="font-extrabold">{ind.label}.</span> {ind.note}
              </span>
            </li>
            <li className="flex gap-3 text-sm" style={{ color: C.fir }}>
              <span className="font-extrabold" style={{ color: C.gtg }}>—</span>
              <span>
                <span className="font-extrabold">Your data foundation.</span> {cdp.note}
              </span>
            </li>
            <li className="flex gap-3 text-sm" style={{ color: C.fir }}>
              <span className="font-extrabold" style={{ color: C.gtg }}>—</span>
              <span>
                <span className="font-extrabold">We kept it one level below your ceiling.</span> You could reach further
                than this. Starting here means it ships in weeks rather than quarters, and a result nobody argues with
                is what buys you the budget for the harder thing next.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl p-6" style={{ backgroundColor: C.lf, border: `2px solid ${C.fir}` }}>
          <Eyebrow>How Mark makes this easy</Eyebrow>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>
            Mark reads the page, drafts the variants in your brand voice or finds the assets you already own, and
            confirms the audience is large enough to be worth it.
          </p>
          <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.n1 }}>
            <Eyebrow>And why you can trust it</Eyebrow>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>
              Everything arrives as a draft with the reasoning attached. Nothing reaches a visitor until you approve
              it, you can see exactly which condition qualified someone, and you can switch it off instantly.
            </p>
          </div>
        </div>
      </div>

      {/* WHAT TO EXPECT */}
      <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <Eyebrow>What to expect</Eyebrow>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: C.fir }}>Realistic, rather than encouraging</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            ["Effort to launch", level >= 3 ? "Days to build. Validating the data usually takes longer than the build." : "Hours to build, days to get approved. No engineering release needed."],
            ["Time to a readable result", "Two to four weeks of normal traffic on that page. Less than that and you are reading noise."],
            ["What should move", STAGE_METRIC[stage.id]],
            ["Honest odds", "Plenty of first personalizations show no movement. That is a normal and useful result — it tells you the hesitation is somewhere else, which is worth knowing."],
          ].map(([t, d], i) => (
            <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: i === 3 ? C.sand : C.n3, border: `1px solid ${C.fir}22` }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>{t}</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: C.blue }}>
          <p className="text-sm leading-relaxed" style={{ color: C.fir }}>
            <span className="font-extrabold">Hold some traffic back. </span>
            Keep a portion of visitors on the current experience so you have something honest to compare against. It is
            the difference between a number you can take to your finance team and a number you have to defend.
          </p>
        </div>
      </div>

      {/* GAPS */}
      {gaps.length > 0 && (
        <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.pink }}>
          <Eyebrow>What is missing, told to you now rather than later</Eyebrow>
          <h3 className="mt-2 text-2xl font-extrabold" style={{ color: C.fir }}>
            None of these stop you starting. All of them are worth beginning in parallel.
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {gaps.map((g, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: C.n1 }}>
                <div className="text-sm font-extrabold" style={{ color: C.fir }}>{g.t}</div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AFTER */}
      <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <Eyebrow>Once it has run</Eyebrow>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: C.fir }}>Three outcomes, and what each one means you do next</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            [
              "It worked",
              C.lf,
              `Expand it before you add sophistication. Apply the same idea to your next two highest-traffic ${stage.label.toLowerCase()} pages first — repeating a proven pattern is worth more than attempting a cleverer one.`,
            ],
            [
              "Nothing moved",
              C.n3,
              "The most common outcome, and genuinely useful. Either the hesitation lives somewhere else in the journey, or the change was too small to notice. Move to the stage where you lose the next largest group.",
            ],
            [
              "Mixed — some segments up, others down",
              C.sand,
              "The most interesting result of the three. It means different people need different things here, which is precisely the case for an adaptive approach. This is your genuine reason to look at CMAB.",
            ],
          ].map(([t, bg, d], i) => (
            <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: bg, border: `1px solid ${C.fir}22` }}>
              <div className="text-base font-extrabold" style={{ color: C.fir }}>{t}</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.fir}CC` }}>{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
          Whichever you get, report it honestly — including the misses. A personalization programme that only ever
          reports wins is one nobody in the business believes when it does win.
        </p>
      </div>

      {/* THE ROAD */}
      <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <Eyebrow light>Where this leads</Eyebrow>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: C.n1 }}>Your next ninety days</h3>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            ["Weeks 1–2", `Ship the ${stage.label.toLowerCase()} play above. One page, one audience, one metric.`],
            ["Weeks 3–6", "Let it run against a holdback. Resist the urge to call it early."],
            ["Weeks 5–8", gaps.length ? `Close the gaps flagged above in parallel — starting with ${gaps[0].t.toLowerCase()}.` : "Extend the same pattern to your next two highest-traffic pages."],
            ["Weeks 9–12", "Report it honestly, then commit to one capability from the next level. One, not three."],
          ].map(([w, d], i) => (
            <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: i === 0 ? C.lf : `${C.n1}14`, border: `1px solid ${C.lf}44` }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: i === 0 ? C.midFir : C.lf }}>{w}</div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: i === 0 ? C.fir : `${C.n1}DD` }}>{d}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed" style={{ color: `${C.fir}80` }}>
        This assessment is guidance based on what you told us, not a forecast. Nothing you entered is stored or
        retrieved. The one number worth trusting is the one your own holdback produces.
      </p>
    </div>
  );
}

/* ---------------------- MAIN ---------------------- */

export default function PersonalizationSelfAssessment() {
  const [a, setA] = useState({ data: [] });
  const [done, setDone] = useState(false);

  const canRun = Boolean(a.industry && a.cdp && (a.data || []).length > 0 && a.stage);
  const r = useMemo(() => (canRun ? assess(a) : null), [a, canRun]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Personalization Self-Assessment | Find Your Starting Point";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen w-full px-5 py-10 md:px-10" style={{ backgroundColor: C.n3, fontFamily: "Inter, Arial, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <Eyebrow>Personalization self-assessment</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] md:text-6xl" style={{ color: C.fir }}>
            Five questions.
            <br />
            <span style={{ color: C.gtg }}>One place to start.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed" style={{ color: `${C.fir}C0` }}>
            Most personalization programmes stall because the first thing attempted was too ambitious for the data, the
            content or the team behind it. This gives you one specific starting point that fits where you actually are,
            what to expect from it, and what to do once you have the result.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Takes about two minutes",
              "Nothing is stored",
              "You will be told what you are missing",
            ].map((t) => (
              <span key={t} className="rounded-full px-4 py-2 text-xs font-bold" style={{ backgroundColor: C.n1, color: C.fir, border: `2px solid ${C.fir}` }}>
                {t}
              </span>
            ))}
          </div>
        </header>

        {!done || !r ? (
          <Questions a={a} set={setA} onRun={() => setDone(true)} canRun={canRun} />
        ) : (
          <Result r={r} a={a} onBack={() => setDone(false)} />
        )}
      </div>
    </div>
  );
}
