import React, { useEffect, useState } from "react";

/* ==========================================================
   OPTIMIZELY PERSONALIZATION — SELLER & PROSPECT BOARD
   One product, sold on outcomes.
   Flow: outcome -> journey moment -> solution.
   Anchor outcome is lifetime value and retention.
   ========================================================== */

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
  teal: "#5ED9D1",
};

/* ---------------------- SOLUTIONS ---------------------- */

const SOLUTIONS = {
  rules: {
    key: "rules",
    name: "Rules and Behavior Targeting",
    tag: "Available today",
    color: C.lf,
    one: "Target on who someone is, or what they have just done.",
    outcome: "Immediate relevance. The fastest credible proof that personalization moves a number.",
    needs: "Nothing beyond the signals already arriving with the visit.",
    ttv: "Live in days",
    why: "Intent beats identity. A visitor who has viewed the same thing three times is telling you more than any attribute ever will.",
  },
  autoOpt: {
    key: "autoOpt",
    name: "Autonomous Optimization",
    tag: "Available today",
    color: C.grass,
    one: "Several credible options, no single clear winner. It shifts traffic to whichever one is performing best, automatically, while the campaign runs.",
    outcome: "Conversion lift without picking a winner in advance, and without a weekly manual check-in.",
    needs: "A set of variants already built, and one clear metric.",
    ttv: "Configured in days, learns over weeks",
    why: "Removes the work of declaring a winner before the data is in. You do not need to know which variant wins, only that one of them probably does.",
  },
  cmab: {
    key: "cmab",
    name: "CMAB Personalization",
    tag: "Available today",
    color: C.teal,
    one: "The same automatic optimization as above, but it learns per audience instead of settling on one winner for everyone.",
    outcome: "Engagement and conversion lift in the moments where one static winner cannot serve every visitor equally well.",
    needs: "A handful of defined variants, plus the audience or contextual signals already flowing in.",
    ttv: "Configured in days, learns continuously",
    why: "Sits between a rule you would otherwise hand-write for every segment and a fully agentic experience you are not ready to turn loose. Most of its value shows up right before and right after conversion.",
  },
  dynamic: {
    key: "dynamic",
    name: "Dynamic Experiences",
    tag: "Available today",
    color: C.gtg,
    one: "One experience that composes itself per visitor, instead of a branching tree of variants.",
    outcome: "Relevance at a scale the team could not maintain by hand.",
    needs: "Content broken into components the system can assemble.",
    ttv: "Weeks",
    why: "Twelve hand-built variants become one adaptive experience. Far less to QA and far less to keep current.",
  },
  limitless: {
    key: "limitless",
    name: "Limitless Personalization",
    tag: "Available today",
    color: C.blue,
    one: "Generates a bespoke experience per visitor or per account, at a scale no team could staff.",
    outcome: "Relevance for an audience of one. The experience count stops being a function of headcount.",
    needs: "A defined universe to generate across, approved components, and content governance.",
    ttv: "Weeks to first surface",
    why: "The pitches that land are the ones where the customer never sees the CMS. Mark is the surface they work in.",
  },
  affinity: {
    key: "affinity",
    name: "Affinity Engine",
    tag: "Emerging",
    color: C.pink,
    one: "Scores what each visitor is drawn to, and keeps scoring across visits.",
    outcome: "Return and repeat behaviour. This is the engine behind lifetime value rather than a single conversion.",
    needs: "SDK work, slot definitions, and a catalog or content feed. The heaviest lift of the five.",
    ttv: "Longest runway of the five",
    why: "An affinity score is a profile that accumulates. It is the only one of the five that gets better the longer a customer stays.",
  },
};

const SOL_ORDER = ["rules", "autoOpt", "cmab", "dynamic", "limitless", "affinity"];

/* ---------------------- OUTCOMES ---------------------- */

const OUTCOMES = [
  {
    id: "ltv",
    name: "Lifetime value and retention",
    rank: "The outcome everything else ladders into",
    d: "A customer who keeps coming back is worth more than a customer who converted once. Personalization earns this by being consistently useful, not by being visibly clever.",
    stages: ["onboard", "return", "grow"],
    hero: true,
  },
  {
    id: "conv",
    name: "Conversion",
    rank: "Immediate and measurable",
    d: "The number most teams are asked about, and the easiest to prove. Worth leading with when a prospect needs a near-term win, provided it is framed as the first rung rather than the destination.",
    stages: ["evaluate", "act"],
  },
  {
    id: "relevance",
    name: "Relevance and findability",
    rank: "Where the journey is won or lost early",
    d: "Helping someone reach the thing they came for, faster. Usually the cheapest outcome to influence and the most visible to the visitor.",
    stages: ["arrive", "orient"],
  },
  {
    id: "wallet",
    name: "Share of wallet",
    rank: "Expansion within an existing relationship",
    d: "More categories, more products, more services. The failure mode is obvious and common: being sold something you already own.",
    stages: ["grow"],
  },
];

/* ---------------------- JOURNEY ---------------------- */

const STAGES = [
  {
    id: "arrive",
    n: "01",
    name: "Arrive",
    q: "Is this place relevant to me at all?",
    phase: "acquire",
    doing: "First contact, usually anonymous, decided in seconds. Whatever brought them here is the most valuable thing you know about them, and it is almost always discarded in favour of a generic landing experience.",
    signal: "Traffic source, campaign or ad clicked, search term, referrer, device, location",
    outcome: "relevance",
    sols: [
      { k: "rules", p: "Lead with the reason they came rather than the house hero" },
      { k: "limitless", p: "Generate the landing experience per account or per campaign, at volume" },
      { k: "dynamic", p: "One landing experience that composes around the arriving context" },
    ],
  },
  {
    id: "orient",
    n: "02",
    name: "Orient",
    q: "Where is the thing I need?",
    phase: "acquire",
    doing: "Browsing, searching, scanning. Narrowing a large space to a few candidates, where every extra step is a chance to leave. This stage rewards reducing choice, not adding persuasion.",
    signal: "Category dwell, repeat views, search terms, filters applied, session depth",
    outcome: "relevance",
    sols: [
      { k: "affinity", p: "Rank what they see by what they are demonstrably drawn to" },
      { k: "dynamic", p: "The page reorders itself around demonstrated interest" },
      { k: "rules", p: "Reorder featured content for known segments" },
    ],
  },
  {
    id: "evaluate",
    n: "03",
    name: "Evaluate",
    q: "Is this right, and can I trust it?",
    phase: "convert",
    doing: "Comparing, hesitating, returning without acting. The blocker is rarely awareness, it is an unresolved doubt. Different people hold different doubts, which is exactly why one piece of reassurance for everyone underperforms.",
    signal: "Repeat views without acting, comparison behaviour, proof content consumed",
    outcome: "conv",
    sols: [
      { k: "autoOpt", p: "Find the single best-performing proof point across everyone, without a manual test review" },
      { k: "cmab", p: "Learn which specific reassurance resolves which type of hesitation, automatically, with no hand-written rule for each" },
      { k: "rules", p: "Bring the relevant proof point forward for a known segment" },
      { k: "limitless", p: "Assemble the case for this specific account" },
    ],
  },
  {
    id: "act",
    n: "04",
    name: "Act",
    q: "Can I complete this without friction?",
    phase: "convert",
    doing: "The conversion moment, whatever that means here. Abandonment is expensive because everything upstream already worked.",
    signal: "Drop-off step, time on step, device switch, basket or form state",
    outcome: "conv",
    sols: [
      { k: "autoOpt", p: "Find the single best-performing checkout flow automatically, without a manual call" },
      { k: "cmab", p: "Learn which framing or step order recovers which abandonment context, automatically, per visitor" },
      { k: "rules", p: "Remove a step for people you already have the answer for" },
    ],
    care: "Personalize the clarity and the path, not the terms. This is the stage where personalization is most visible and most likely to feel like manipulation.",
  },
  {
    id: "onboard",
    n: "05",
    name: "Onboard",
    q: "Did I make the right decision?",
    phase: "retain",
    doing: "The first experience after committing, and the most under-personalized stage in almost every business. You now know more about this person than at any earlier point, and most teams use none of it.",
    signal: "What they chose, setup steps outstanding, first-use behaviour",
    outcome: "ltv",
    sols: [
      { k: "limitless", p: "A first-run experience built around what they actually bought" },
      { k: "dynamic", p: "Next-best-action that reflects what is still outstanding" },
      { k: "affinity", p: "Start scoring from day one, so the relationship compounds" },
    ],
  },
  {
    id: "return",
    n: "06",
    name: "Return",
    q: "Is it worth coming back?",
    phase: "retain",
    doing: "They come back on a rhythm, or they drift and quietly stop. Nobody sends a churn notification. This is where lifetime value is actually decided.",
    signal: "Visit and purchase cadence, declining frequency, channel preference, lapse-risk patterns",
    outcome: "ltv",
    sols: [
      { k: "affinity", p: "Bring forward what they are most likely to want next, scored across every prior visit" },
      { k: "cmab", p: "Decide which win-back message or offer fits which lapsing pattern, automatically, with no manual segment rules" },
      { k: "limitless", p: "An entry experience assembled from their whole history, not their last click" },
      { k: "dynamic", p: "The return experience composes around where they left off" },
    ],
  },
  {
    id: "grow",
    n: "07",
    name: "Grow",
    q: "What else is genuinely useful to me?",
    phase: "retain",
    doing: "Deepening the relationship. More categories, more products, more services, or an advocate.",
    signal: "What they already hold, category gaps, tenure, service history",
    outcome: "wallet",
    sols: [
      { k: "affinity", p: "Surface the genuinely adjacent thing, based on accumulated affinity" },
      { k: "autoOpt", p: "Try several next-best-offers and settle on whichever wins most often, automatically" },
      { k: "rules", p: "Suppress what they already have. The cheapest relevance win available" },
    ],
    care: "Using what someone told you is helpful. Using what you inferred, without saying so, is where trust is lost.",
  },
];

const PHASES = {
  acquire: { label: "Acquire", color: C.lf, d: "Earning the first interaction" },
  convert: { label: "Convert", color: C.grass, d: "Turning interest into action" },
  retain: { label: "Retain and grow", color: C.gtg, d: "Where lifetime value is built" },
};

/* ---------------------- DISCOVERY ---------------------- */

const DISCOVERY = [
  {
    q: "Where do you lose the most people today?",
    why: "Finds the journey moment. Everything else follows from this, and it is a question every prospect can answer without preparation.",
    listen: "If they answer with a page, you have the moment. If they answer with a metric, ask which step produces it.",
  },
  {
    q: "What happens after someone converts?",
    why: "The highest-value question on this list. Most personalization programmes stop at conversion, which means the retention half of the journey is untouched.",
    listen: "A thin answer here is the opening. Onboard, Return and Grow are usually wide open.",
  },
  {
    q: "What do you already know about a returning visitor?",
    why: "Separates a single-session conversation from a lifetime-value one, and tells you whether affinity has anything to work with.",
    listen: "If the answer is nothing, start at Arrive and Evaluate. If it is substantial, Return and Grow are live immediately.",
  },
  {
    q: "How many variants of anything are you maintaining by hand?",
    why: "Qualifies Dynamic Experiences directly, and surfaces a cost they are already paying.",
    listen: "A number above about five means the maintenance burden is already a problem they would like solved.",
  },
  {
    q: "Where do you have several good ideas and no way to choose?",
    why: "Qualifies Autonomous Optimization, or CMAB if the right answer is likely to differ by audience rather than be universal. If they already know the winner, they do not need either.",
    listen: "Genuine uncertainty plus real traffic is the signal. Certainty means ship the thing they are certain about. A hunch that different segments want different things points at CMAB specifically.",
  },
];

/* ---------------------- PRIMITIVES ---------------------- */

function Eyebrow({ children, light }) {
  return (
    <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: light ? C.lf : C.lightFir }}>
      {children}
    </div>
  );
}

function Pill({ children, bg, fg, border }) {
  return (
    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: bg, color: fg || C.fir, border: border ? `1px solid ${border}` : "none" }}>
      {children}
    </span>
  );
}

function SolChip({ k, onClick, active }) {
  const s = SOLUTIONS[k];
  return (
    <button onClick={onClick}
      className="rounded-full px-3 py-1.5 text-xs font-extrabold transition-all"
      style={{
        backgroundColor: active ? C.fir : s.color,
        color: active ? s.color : C.fir,
        border: `2px solid ${C.fir}`,
      }}>
      {s.name}
    </button>
  );
}

/* ---------------------- TAB: THE OUTCOME ---------------------- */

function Outcomes({ goStage }) {
  return (
    <div>
      <Eyebrow>Start here</Eyebrow>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: C.fir }}>
        Every outcome personalization produces ladders into one of them
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
        Conversion is the number most teams are asked about, and it is the easiest to prove. But a customer who keeps
        coming back is worth more than a customer who converted once. Lead with lifetime value and retention, and let
        conversion be the first rung rather than the whole ladder.
      </p>

      {/* the ladder */}
      <div className="mt-8 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.fir }}>
        <Eyebrow light>The outcome ladder</Eyebrow>
        <div className="mt-5 space-y-3">
          {OUTCOMES.map((o) => (
            <div key={o.id} className="rounded-2xl p-5"
              style={{ backgroundColor: o.hero ? C.lf : `${C.n1}0F`, border: o.hero ? "none" : `1px solid ${C.lf}33` }}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-extrabold" style={{ color: o.hero ? C.fir : C.n1 }}>{o.name}</h3>
                <span className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: o.hero ? C.midFir : C.lf }}>{o.rank}</span>
              </div>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed"
                style={{ color: o.hero ? `${C.fir}DD` : `${C.n1}CC` }}>{o.d}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {o.stages.map((sid) => {
                  const st = STAGES.find((x) => x.id === sid);
                  return (
                    <button key={sid} onClick={() => goStage(sid)}
                      className="rounded-full px-3 py-1 text-xs font-bold transition-colors"
                      style={{
                        backgroundColor: o.hero ? C.fir : `${C.n1}1A`,
                        color: o.hero ? C.lf : C.n1,
                        border: `1px solid ${o.hero ? C.fir : `${C.lf}44`}`,
                      }}>
                      {st.n} {st.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* the honest framing */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-3xl p-6 lg:col-span-2" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
          <Eyebrow>The claim that holds up in the room</Eyebrow>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight" style={{ color: C.fir }}>
            Deliver a genuinely useful experience and they come back. That compounds.
          </h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
            Promising to double conversion is a claim most buyers have heard before and discounted. Retention and
            lifetime value is a slower story and a more defensible one, and it is the outcome personalization is
            actually best at producing. It also happens to be the outcome their CFO cares about most.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
            Worth saying plainly: good personalization is usually not visible. It does not announce itself. It just
            means the next thing someone needs is already in front of them.
          </p>
        </div>
        <div className="rounded-3xl p-6" style={{ backgroundColor: C.sand, border: `2px solid ${C.fir}` }}>
          <Eyebrow>Where most programmes stop</Eyebrow>
          <div className="mt-3 space-y-2">
            {STAGES.map((st) => (
              <div key={st.id} className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ backgroundColor: st.phase === "retain" ? C.lf : `${C.fir}0A` }}>
                <span className="text-[10px] font-extrabold" style={{ color: C.lightFir }}>{st.n}</span>
                <span className="text-sm font-bold" style={{ color: C.fir }}>{st.name}</span>
                {st.phase === "retain" && (
                  <span className="ml-auto text-[10px] font-extrabold uppercase" style={{ color: C.midFir }}>LTV</span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.fir}CC` }}>
            Most personalization work lives in the first four stages. The last three are where lifetime value is
            built, and they are usually wide open.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- TAB: THE JOURNEY ---------------------- */

function Journey({ stage, setStage }) {
  const st = STAGES.find((x) => x.id === stage);
  const out = OUTCOMES.find((o) => o.id === st.outcome);
  const ph = PHASES[st.phase];

  return (
    <div>
      <Eyebrow>The main event</Eyebrow>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: C.fir }}>
        Their journey, their language, and what fits where
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
        Seven stages any business can relabel. Ask where they lose the most people, go to that stage, and the
        conversation becomes about a moment they already recognise rather than a product they have never heard of.
      </p>

      {/* phase bands + stage picker */}
      <div className="mt-6 space-y-3">
        {Object.entries(PHASES).map(([pk, p]) => (
          <div key={pk} className="flex flex-wrap items-center gap-2">
            <div className="w-36 shrink-0">
              <div className="text-xs font-extrabold uppercase tracking-wider" style={{ color: C.fir }}>{p.label}</div>
              <div className="text-[10px]" style={{ color: `${C.fir}80` }}>{p.d}</div>
            </div>
            {STAGES.filter((s) => s.phase === pk).map((s) => {
              const on = s.id === stage;
              return (
                <button key={s.id} onClick={() => setStage(s.id)}
                  className="rounded-2xl px-4 py-3 text-left transition-all"
                  style={{
                    backgroundColor: on ? C.fir : C.n1,
                    border: `2px solid ${on ? C.fir : `${C.fir}22`}`,
                    transform: on ? "translateY(-2px)" : "none",
                    boxShadow: on ? `0 4px 0 0 ${p.color}` : "none",
                    minWidth: 128,
                  }}>
                  <div className="text-[10px] font-bold" style={{ color: on ? p.color : C.lightFir }}>{s.n}</div>
                  <div className="text-sm font-extrabold" style={{ color: on ? C.n1 : C.fir }}>{s.name}</div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* stage detail */}
      <div className="mt-6 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-5xl font-extrabold" style={{ color: ph.color }}>{st.n}</div>
            <h3 className="mt-1 text-3xl font-extrabold" style={{ color: C.fir }}>{st.name}</h3>
            <p className="mt-3 text-lg font-bold italic leading-snug" style={{ color: C.lightFir }}>
              &ldquo;{st.q}&rdquo;
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{st.doing}</p>

            <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: C.blue }}>
              <Eyebrow>Signal available here</Eyebrow>
              <p className="mt-1 text-sm font-semibold" style={{ color: C.fir }}>{st.signal}</p>
            </div>

            <div className="mt-3 rounded-2xl p-4" style={{ backgroundColor: out.hero ? C.lf : C.n3 }}>
              <Eyebrow>Outcome this stage drives</Eyebrow>
              <p className="mt-1 text-base font-extrabold" style={{ color: C.fir }}>{out.name}</p>
              {out.hero && (
                <p className="mt-1 text-xs font-semibold" style={{ color: C.midFir }}>
                  This is the compounding one. Lead here when you can.
                </p>
              )}
            </div>

            {st.care && (
              <div className="mt-3 rounded-2xl p-4" style={{ backgroundColor: C.pink }}>
                <Eyebrow>Handle with care</Eyebrow>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{st.care}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-3 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>
              What fits this moment
            </h4>
            <div className="space-y-3">
              {st.sols.map((sl, i) => {
                const s = SOLUTIONS[sl.k];
                return (
                  <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: C.n3, border: `1px solid ${C.fir}22` }}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full px-3 py-1 text-xs font-extrabold"
                        style={{ backgroundColor: s.color, color: C.fir }}>{s.name}</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.lightFir }}>
                        {s.ttv}
                      </span>
                    </div>
                    <p className="mt-3 text-base font-bold leading-snug" style={{ color: C.fir }}>{sl.p}</p>
                    <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: `${C.n1}CC` }}>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>
                        What it takes to light up
                      </span>
                      <span className="ml-2 text-xs" style={{ color: C.fir }}>{s.needs}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
              <p className="text-sm leading-relaxed" style={{ color: C.n1 }}>
                <span className="font-extrabold" style={{ color: C.lf }}>One product, several doors. </span>
                Everything above is the same Personalization product. What differs is what the customer needs in
                place before each one lights up, which is a sequencing conversation rather than a buying decision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- TAB: SOLUTIONS ---------------------- */

function Solutions({ goStage }) {
  const [sel, setSel] = useState("rules");
  const s = SOLUTIONS[sel];
  const where = STAGES.filter((st) => st.sols.some((x) => x.k === sel));

  return (
    <div>
      <Eyebrow>The capabilities underneath</Eyebrow>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: C.fir }}>
        Six ways to do it, sold as one thing
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
        A prospect does not buy these separately and should not have to choose between them up front. This page is
        for you, so that when they describe a moment you know what answers it and what it asks of them.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {SOL_ORDER.map((k) => (
          <SolChip key={k} k={k} active={k === sel} onClick={() => setSel(k)} />
        ))}
      </div>

      <div className="mt-6 rounded-3xl p-6 md:p-8" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-extrabold" style={{ color: C.fir }}>{s.name}</h3>
          <Pill bg={s.color} fg={C.fir} border={`${C.fir}33`}>{s.tag}</Pill>
          <Pill bg={C.n3} fg={C.fir}>{s.ttv}</Pill>
        </div>
        <p className="mt-4 text-xl font-bold leading-snug" style={{ color: C.fir }}>{s.one}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.lf }}>
            <Eyebrow>Outcome it drives</Eyebrow>
            <p className="mt-2 text-sm font-semibold leading-relaxed" style={{ color: C.fir }}>{s.outcome}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.sand }}>
            <Eyebrow>What it takes to light up</Eyebrow>
            <p className="mt-2 text-sm font-semibold leading-relaxed" style={{ color: C.fir }}>{s.needs}</p>
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.n3 }}>
            <Eyebrow>Why it lands</Eyebrow>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>{s.why}</p>
          </div>
        </div>

        <h4 className="mb-3 mt-6 text-sm font-extrabold uppercase tracking-wider" style={{ color: C.lightFir }}>
          Where it fits in the journey
        </h4>
        <div className="flex flex-wrap gap-2">
          {where.map((st) => {
            const play = st.sols.find((x) => x.k === sel);
            return (
              <button key={st.id} onClick={() => goStage(st.id)}
                className="rounded-2xl p-4 text-left transition-transform"
                style={{ backgroundColor: C.n3, border: `1px solid ${C.fir}22`, maxWidth: 330 }}>
                <div className="text-[10px] font-extrabold" style={{ color: C.lightFir }}>
                  {st.n} {st.name.toUpperCase()}
                </div>
                <div className="mt-1 text-sm font-bold leading-snug" style={{ color: C.fir }}>{play.p}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-3xl p-6" style={{ backgroundColor: C.fir }}>
        <Eyebrow light>The spread worth knowing before you promise a timeline</Eyebrow>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
          Rules, Autonomous Optimization and CMAB work largely on signals already flowing in. Affinity Engine needs
          SDK work, slot definitions and a catalog feed, the heaviest lift of the six. That is a wide spread in time
          to value sitting inside one product. Selling the whole thing is right. Promising the same runway for all
          of it is not.
        </p>
      </div>
    </div>
  );
}

/* ---------------------- TAB: DISCOVERY ---------------------- */

function Discovery() {
  return (
    <div>
      <Eyebrow>In the room</Eyebrow>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: C.fir }}>
        Five questions that get you to the right moment
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-relaxed" style={{ color: `${C.fir}B0` }}>
        None of these mention a product name. They are designed to surface a journey moment the prospect already
        recognises, which is the only thing you need before the rest of the conversation has somewhere to go.
      </p>

      <div className="mt-6 space-y-3">
        {DISCOVERY.map((d, i) => (
          <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
            <div className="flex items-baseline gap-3">
              <span className="text-xl font-extrabold" style={{ color: C.gtg }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-extrabold leading-snug" style={{ color: C.fir }}>
                &ldquo;{d.q}&rdquo;
              </h3>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-2xl p-4" style={{ backgroundColor: C.n3 }}>
                <Eyebrow>Why it works</Eyebrow>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{d.why}</p>
              </div>
              <div className="rounded-2xl p-4" style={{ backgroundColor: C.lf }}>
                <Eyebrow>What to listen for</Eyebrow>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: C.fir }}>{d.listen}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-3xl p-6" style={{ backgroundColor: C.sand, border: `2px solid ${C.fir}` }}>
          <Eyebrow>Do not open with a capability list</Eyebrow>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>
            Leading with feature names makes the prospect do the mapping work, and they will map it wrong. Lead with
            the moment they lose people, then name the one thing that answers it.
          </p>
        </div>
        <div className="rounded-3xl p-6" style={{ backgroundColor: C.pink, border: `2px solid ${C.fir}` }}>
          <Eyebrow>If they say their data is not ready</Eyebrow>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: C.fir }}>
            It usually is. Most of what this product does runs on signals already arriving with the visit. Point to
            a moment that is live today, get the first win, and the rest of the journey opens from there.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- SHELL ---------------------- */

export default function SellerBoard() {
  const [tab, setTab] = useState("outcomes");
  const [stage, setStage] = useState("return");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Personalization Seller & Prospect Board | Optimizely";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const goStage = (sid) => { setStage(sid); setTab("journey"); };

  const TABS = [
    { id: "outcomes", label: "The outcome", el: <Outcomes goStage={goStage} /> },
    { id: "journey", label: "The journey", el: <Journey stage={stage} setStage={setStage} /> },
    { id: "solutions", label: "What fits where", el: <Solutions goStage={goStage} /> },
    { id: "discovery", label: "Discovery", el: <Discovery /> },
  ];

  return (
    <div className="min-h-screen w-full px-5 py-10 md:px-10"
      style={{ backgroundColor: C.n3, fontFamily: "Inter, Arial, sans-serif" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <Eyebrow>Optimizely Personalization — for sellers</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] md:text-6xl" style={{ color: C.fir }}>
            One product.
            <br />
            <span style={{ color: C.gtg }}>Every moment of their journey.</span>
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-relaxed" style={{ color: `${C.fir}C0` }}>
            Optimizely Personalization is a single product that works across the entire customer journey. Your
            prospect gets all of it. The only question worth asking is which moment to point it at first.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { n: "01", t: "Lead with the outcome", d: "Lifetime value and retention. Conversion is the first rung, not the ladder." },
              { n: "02", t: "Find the moment", d: "Ask where they lose the most people. They will tell you, and that is your starting point." },
              { n: "03", t: "Name what fixes it", d: "One solution for that moment. Not a capability list, not a roadmap." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl p-5" style={{ backgroundColor: C.n1, border: `2px solid ${C.fir}` }}>
                <div className="text-xs font-extrabold" style={{ color: C.gtg }}>{s.n}</div>
                <div className="mt-1 text-base font-extrabold" style={{ color: C.fir }}>{s.t}</div>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl p-5" style={{ backgroundColor: C.fir }}>
            <p className="text-base font-bold leading-relaxed" style={{ color: C.lf }}>
              Sell the whole product. Start it at one moment.
            </p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: `${C.n1}CC` }}>
              They are not choosing between options today. They are choosing where the first win comes from.
            </p>
          </div>
        </header>

        <nav className="mb-10 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="rounded-full px-5 py-2.5 text-sm font-bold transition-colors"
                style={{ backgroundColor: on ? C.fir : "transparent", color: on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}>
                {t.label}
              </button>
            );
          })}
        </nav>

        <main>{TABS.find((t) => t.id === tab).el}</main>

        <footer className="mt-16 border-t pt-6 text-xs leading-relaxed"
          style={{ borderColor: `${C.fir}22`, color: `${C.fir}80` }}>
          Seller-facing positioning for Optimizely Personalization. Built to be opened live in a conversation:
          start on the outcome, move to the moment they name, read the play. Everything here is one product.
        </footer>
      </div>
    </div>
  );
}
