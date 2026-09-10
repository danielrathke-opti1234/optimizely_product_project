import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Boxes,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Eye,
  FileQuestion,
  Gauge,
  Layers3,
  Lightbulb,
  ListChecks,
  MousePointer2,
  Network,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Workflow,
} from 'lucide-react';

const blockers = [
  {
    name: 'Strategy',
    icon: Compass,
    friction: 'Teams jump from “we have personalization” to “what campaign should we build?” without a repeatable planning step.',
    need: 'Define Who, Signal, Need, Experience, and Outcome before configuration begins.',
  },
  {
    name: 'Audience',
    icon: UsersRound,
    friction: 'Customers discover late that the audience is unclear, too small, unavailable, or hard to qualify.',
    need: 'Make signal availability, audience size, and qualification rules visible before setup deepens.',
  },
  {
    name: 'Experience',
    icon: Layers3,
    friction: 'A well-defined audience still leaves teams asking what should actually be different.',
    need: 'Connect visitor need to the message, content, tool, proof point, or next step that should become more relevant.',
  },
  {
    name: 'Measurement',
    icon: BarChart3,
    friction: 'Clicks alone rarely prove whether the journey improved.',
    need: 'Tie results back to the business intent: discovery, evaluation, progression, revenue, support, or expansion.',
  },
  {
    name: 'Resources',
    icon: PackageCheck,
    friction: 'Every new audience can feel like another campaign, content version, approval path, and report to maintain.',
    need: 'Frame personalization as selected moments in an existing journey using assets and signals already available.',
  },
  {
    name: 'Confidence',
    icon: ShieldCheck,
    friction: 'Even when customers can launch, they hesitate because they are unsure whether the approach is “right.”',
    need: 'Show readiness, rationale, tradeoffs, and next-best actions so teams can launch with evidence.',
  },
];

const asks = [
  ['Help me identify opportunities', 'Start from journeys, data, content, and business priorities instead of a blank campaign builder.'],
  ['Help me choose the right approach', 'Guide the team toward rules, behavior, known customer context, testing, or adaptive decisioning.'],
  ['Use the data I already have', 'Translate account data, campaigns, audience lists, analytics, and behavior into activation logic.'],
  ['Tell me what is missing', 'Surface missing data, tracking, content, metrics, identifiers, traffic, or page definitions early.'],
  ['Help me understand what to show', 'Recommend which message, content, tool, story, CTA, or next step should become more prominent.'],
  ['Help me measure whether it mattered', 'Answer whether the journey improved, not just whether a variant got clicked.'],
  ['Tell me what to do next', 'Turn campaign results into keep, change, expand, stop, or reuse decisions.'],
];

const valueQuestions = [
  {
    label: 'Audience',
    icon: UsersRound,
    question: 'Is there a meaningful group to personalize for?',
    detail: 'The audience needs to represent a customer group or behavior pattern that matters to the business.',
  },
  {
    label: 'Experience',
    icon: Layers3,
    question: 'Would we actually make their journey better?',
    detail: 'The change should help the visitor find, evaluate, choose, request, buy, or resolve something more effectively.',
  },
  {
    label: 'Reach',
    icon: Gauge,
    question: 'Will enough visitors experience it?',
    detail: 'If very few visitors qualify, the team needs to understand whether the effort still makes sense.',
  },
  {
    label: 'Outcome',
    icon: BarChart3,
    question: 'What meaningful result should improve?',
    detail: 'Value may show up through discovery, resource engagement, consultation requests, progression, support success, conversion, or revenue.',
  },
];

const valueExamples = [
  {
    customer: 'Copeland',
    focus: 'Replacement journey, known accounts, tools and calculators',
    value: 'Help contractors find correct replacements faster, surface cross-reference tools earlier, and move visitors toward distributor or support pathways.',
    lesson: 'The discussion shifted from “where can we personalize?” to “where can relevance improve a meaningful customer journey?”',
  },
  {
    customer: 'Sysco',
    focus: 'Relevant solution discovery and message selection',
    value: 'Recognize the need a visitor is demonstrating, surface more relevant content, and learn which message works when several messages could be appropriate.',
    lesson: 'The investment became easier to justify once the team could name the customer behavior they expected to improve.',
  },
  {
    customer: 'Tapestry',
    focus: 'Experiment insight to audience insight to personalization opportunity',
    value: 'Use experimentation to identify what works broadly, analytics to reveal meaningful audience differences, and personalization to act on that evidence.',
    lesson: 'Personalization gets a stronger ROI story when it builds on evidence rather than speculation.',
  },
];

const workedExamples = [
  {
    label: 'Use Case First',
    before: 'Here is Behavior Targeting.',
    after: 'A contractor repeatedly researching replacement products sees compatibility tools and distributor resources earlier.',
    why: 'Customers understand a business scenario faster than a feature category.',
  },
  {
    label: 'Known Context + Current Behavior',
    before: 'This account belongs to this group, so show this message.',
    after: 'A strategic account with repeated pricing and technical evaluation activity receives more relevant technical proof.',
    why: 'The strongest signals combine who the customer is with what they are doing now.',
  },
  {
    label: 'Existing Content Reuse',
    before: 'Create a new experience for every segment.',
    after: 'Surface the right calculator, guide, customer story, or selection tool from the library the team already maintains.',
    why: 'Adoption rises when personalization feels like better discovery, not endless new content production.',
  },
];

const cmabChecks = [
  ['Fit', 'Several credible experiences could work, and the team genuinely does not know which will work best for different visitors.'],
  ['Inputs', 'The campaign has useful visitor context, meaningful options, a clear metric, enough traffic, and enough time to learn.'],
  ['Trust', 'The product explains what information is influencing decisions, which experiences are considered, and what has been learned.'],
];

const builderExamples = [
  {
    customer: 'Technical evaluator',
    signal: 'Repeated calculator, compatibility, and documentation activity',
    need: 'Find the right resource without searching a generic library',
    experience: 'Promote calculator, product selection tool, and application guide earlier',
    outcome: 'Increase technical evaluation depth',
  },
  {
    customer: 'Known strategic account',
    signal: 'Account opportunity plus active commercial refrigeration research',
    need: 'See proof and next steps that match the active sales motion',
    experience: 'Lead with relevant customer proof, technical validation, and contact path',
    outcome: 'Improve lead progression and sales alignment',
  },
  {
    customer: 'Campaign visitor',
    signal: 'Paid campaign source plus category-level browsing behavior',
    need: 'Continue intent from the campaign into the site experience',
    experience: 'Reorder page content around the campaign promise and next-best resource',
    outcome: 'Improve product discovery and content engagement',
  },
];

const designPrinciples = [
  {
    title: 'Start with business intent',
    problem: 'Customers ask “what should I personalize?” before they know which configuration path matters.',
    opportunity: 'Begin with the improvement goal, then guide users toward the right audience, signal, experience, and activation method.',
  },
  {
    title: 'Make readiness visible early',
    problem: 'Missing data, content, metrics, traffic, or identifiers often appear after the user is already building.',
    opportunity: 'Show readiness across audience, experience, measurement, and reach before setup becomes expensive.',
  },
  {
    title: 'Keep signal and experience connected',
    problem: 'Customers lose confidence when they cannot explain why a visitor qualifies and why an experience is relevant.',
    opportunity: 'Keep qualification rationale and experience rationale together through setup, review, and reporting.',
  },
  {
    title: 'Introduce complexity progressively',
    problem: 'Simple campaigns should not require advanced decisioning literacy, while CMAB needs extra education and trust.',
    opportunity: 'Reveal deeper mechanics only when the use case needs them.',
  },
  {
    title: 'Turn reporting into the next decision',
    problem: 'Results often end as disconnected performance reads.',
    opportunity: 'Help teams decide whether to keep, change, expand, stop, or reuse the learning.',
  },
];

const slides = [
  { id: 'reality', label: 'Reality', icon: Eye },
  { id: 'stuck', label: 'Blockers', icon: FileQuestion },
  { id: 'asks', label: 'Asks', icon: MousePointer2 },
  { id: 'worth', label: 'Worth It', icon: Calculator },
  { id: 'worked', label: 'Worked', icon: Lightbulb },
  { id: 'cmab', label: 'CMAB', icon: Sparkles },
  { id: 'builder', label: 'Builder', icon: Workflow },
  { id: 'design', label: 'Design', icon: Target },
  { id: 'takeaway', label: 'Takeaway', icon: CheckCircle2 },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#7DDD3D]/30 bg-[#7DDD3D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7DDD3D]">
      {children}
    </span>
  );
}

function ProgressMap({ activeIndex, setActiveIndex }) {
  return (
    <nav className="briefing-nav" aria-label="Presentation sections">
      {slides.map(({ id, label, icon: Icon }, index) => (
        <button
          key={id}
          onClick={() => setActiveIndex(index)}
          className={`briefing-nav-button ${activeIndex === index ? 'is-active' : ''}`}
          aria-label={`Go to ${label}`}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function SlideShell({ eyebrow, title, copy, children, aside }) {
  return (
    <section className="briefing-slide">
      <div className="briefing-slide-copy">
        <Badge>{eyebrow}</Badge>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      <div className="briefing-stage">
        <div className="briefing-stage-main">{children}</div>
        {aside && <aside className="briefing-stage-aside">{aside}</aside>}
      </div>
    </section>
  );
}

function RealitySlide() {
  return (
    <SlideShell
      eyebrow="Customer reality"
      title="Customers understand the value. They struggle to turn it into something they trust enough to launch."
      copy="Across client sessions, presentations, and workshops, the recurring gap is not feature awareness. It is connecting who should receive a different experience, why that audience matters, what should change, and how the team will know it worked."
      aside={<ReadinessScore />}
    >
      <div className="reality-chain">
        {['Recognize opportunity', 'Validate inputs', 'Build the right experience', 'Measure the outcome', 'Learn the next move'].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="chain-node"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item}</strong>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

function ReadinessScore() {
  return (
    <div>
      <div className="text-sm font-semibold text-white">Recurring adoption patterns</div>
      <div className="mt-4 space-y-3">
        {['Do not get started', 'Stay with basic targeting', 'Treat personalization as disconnected features'].map((item) => (
          <div key={item} className="rounded-md border border-white/10 bg-white/[0.055] p-3 text-sm text-slate-300">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-md border border-[#91DBDA]/25 bg-[#91DBDA]/10 p-4">
        <div className="text-xs uppercase tracking-[0.16em] text-[#91DBDA]">Product opportunity</div>
        <p className="mt-2 text-sm leading-6 text-slate-200">Make personalization feel like a guided workflow, not a menu of targeting tools.</p>
      </div>
    </div>
  );
}

function BlockersSlide() {
  const [active, setActive] = useState(blockers[0]);
  const Icon = active.icon;

  return (
    <SlideShell
      eyebrow="Why customers get stuck"
      title="The blockers show up before, during, and after campaign setup."
      copy="Most blockers are confidence problems hiding inside workflow problems. The product can reduce hesitation by showing what is known, what is missing, and what decision comes next."
      aside={
        <div>
          <Icon className="h-8 w-8 text-[#91DBDA]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">{active.name}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">{active.friction}</p>
          <div className="mt-5 rounded-md border border-[#7DDD3D]/25 bg-[#7DDD3D]/10 p-4 text-sm leading-6 text-[#d8ffbf]">{active.need}</div>
        </div>
      }
    >
      <div className="blocker-grid">
        {blockers.map((blocker) => {
          const BlockerIcon = blocker.icon;
          return (
            <button
              key={blocker.name}
              onClick={() => setActive(blocker)}
              className={`blocker-card ${active.name === blocker.name ? 'is-active' : ''}`}
            >
              <BlockerIcon className="h-5 w-5" />
              <span>{blocker.name}</span>
            </button>
          );
        })}
      </div>
    </SlideShell>
  );
}

function AsksSlide() {
  const [active, setActive] = useState(asks[0]);

  return (
    <SlideShell
      eyebrow="What customers ask for"
      title="They are asking for help making decisions, not just help finding controls."
      copy="The language customers use points toward a planning and confidence layer that sits before configuration and continues through reporting."
      aside={
        <div>
          <ClipboardCheck className="h-8 w-8 text-[#FF99B6]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">{active[0]}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">{active[1]}</p>
        </div>
      }
    >
      <div className="ask-stack">
        {asks.map((ask, index) => (
          <button key={ask[0]} onClick={() => setActive(ask)} className={`ask-row ${active[0] === ask[0] ? 'is-active' : ''}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{ask[0]}</strong>
          </button>
        ))}
      </div>
    </SlideShell>
  );
}

function WorthItSlide() {
  const [activeQuestion, setActiveQuestion] = useState(valueQuestions[0]);
  const [activeExample, setActiveExample] = useState(valueExamples[0]);
  const QuestionIcon = activeQuestion.icon;

  return (
    <SlideShell
      eyebrow="Value checkpoint"
      title="Is Personalization worth it?"
      copy="Customers are not asking whether personalization sounds useful. They are asking whether the expected value justifies the added planning, audience definition, content variation, coordination, measurement, and maintenance."
      aside={
        <div>
          <QuestionIcon className="h-8 w-8 text-[#7DDD3D]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">{activeQuestion.label}</h2>
          <p className="mt-4 text-base font-semibold leading-6 text-slate-100">{activeQuestion.question}</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">{activeQuestion.detail}</p>
          <div className="mt-5 rounded-md border border-[#91DBDA]/25 bg-[#91DBDA]/10 p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-[#91DBDA]">Design takeaway</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">Decide whether the idea is worth launching before the team spends time building it.</p>
          </div>
        </div>
      }
    >
      <div className="value-checkpoint">
        <div className="value-question-panel">
          <div className="value-quote">“Is the juice worth the squeeze?”</div>
          <div className="value-question-grid">
            {valueQuestions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveQuestion(item)}
                  className={`value-question-card ${activeQuestion.label === item.label ? 'is-active' : ''}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  <strong>{item.question}</strong>
                </button>
              );
            })}
          </div>
        </div>

        <div className="value-example-panel">
          <div className="value-example-tabs">
            {valueExamples.map((example) => (
              <button
                key={example.customer}
                onClick={() => setActiveExample(example)}
                className={activeExample.customer === example.customer ? 'is-active' : ''}
              >
                {example.customer}
              </button>
            ))}
          </div>
          <motion.div
            key={activeExample.customer}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="value-example-card"
          >
            <div className="text-xs uppercase tracking-[0.16em] text-[#FF99B6]">Customer example</div>
            <h2>{activeExample.customer}</h2>
            <dl>
              <div>
                <dt>Focus</dt>
                <dd>{activeExample.focus}</dd>
              </div>
              <div>
                <dt>Value story</dt>
                <dd>{activeExample.value}</dd>
              </div>
              <div>
                <dt>Lesson</dt>
                <dd>{activeExample.lesson}</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}

function WorkedSlide() {
  const [active, setActive] = useState(workedExamples[0]);

  return (
    <SlideShell
      eyebrow="What has worked"
      title="Use-case-first conversations land faster than feature-first explanations."
      copy="Customers engage when examples come from their journeys, products, sales motion, resource libraries, existing audiences, and current site behavior."
      aside={
        <div>
          <Lightbulb className="h-8 w-8 text-[#7DDD3D]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">{active.label}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">{active.why}</p>
        </div>
      }
    >
      <div className="compare-panel">
        <div>
          <span>Feature-first</span>
          <p>{active.before}</p>
        </div>
        <ArrowRight className="compare-arrow h-6 w-6" />
        <div>
          <span>Use-case-first</span>
          <p>{active.after}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {workedExamples.map((example) => (
          <button key={example.label} onClick={() => setActive(example)} className={`example-tab ${active.label === example.label ? 'is-active' : ''}`}>
            {example.label}
          </button>
        ))}
      </div>
    </SlideShell>
  );
}

function CmabSlide() {
  const [mode, setMode] = useState('cmab');

  return (
    <SlideShell
      eyebrow="CMAB adoption challenge"
      title="CMAB has an education and trust problem before it has a configuration problem."
      copy="Customers often understand rules-based targeting, but adaptive decisioning asks them to give up some manual control. The first campaign needs a guided mental model."
      aside={
        <div>
          <Gauge className="h-8 w-8 text-[#91DBDA]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">First-campaign checks</h2>
          <div className="mt-4 space-y-3">
            {cmabChecks.map(([label, text]) => (
              <div key={label} className="rounded-md border border-white/10 bg-white/[0.055] p-3">
                <div className="text-sm font-semibold text-white">{label}</div>
                <p className="mt-1 text-xs leading-5 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="decision-toggle">
        {['rules', 'cmab'].map((item) => (
          <button key={item} onClick={() => setMode(item)} className={mode === item ? 'is-active' : ''}>
            {item === 'rules' ? 'Rules Based' : 'CMAB'}
          </button>
        ))}
      </div>
      <div className="decision-card">
        <div className="decision-orbit">
          {(mode === 'rules' ? ['Known audience', 'Defined rule', 'Assigned experience'] : ['Relevant options', 'Visitor context', 'Learning signal']).map((item, index) => (
            <span key={item} style={{ '--i': index }}>{item}</span>
          ))}
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{mode === 'rules' ? 'Decision model' : 'Learning model'}</div>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            {mode === 'rules'
              ? 'We know this audience, so show this experience.'
              : 'Several experiences could work. Learn which one is most likely to work for this visitor.'}
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            {mode === 'rules'
              ? 'This is inspectable and comfortable, but it can push teams toward creating more and more manual rules.'
              : 'This creates value when the team has credible options, useful context, and a trustworthy view into what the campaign is learning.'}
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function BuilderSlide() {
  const [active, setActive] = useState(builderExamples[0]);
  const steps = [
    ['Customer', active.customer, UsersRound],
    ['Signal', active.signal, Network],
    ['Need', active.need, Target],
    ['Experience', active.experience, Boxes],
    ['Outcome', active.outcome, BarChart3],
  ];

  return (
    <SlideShell
      eyebrow="Customer journey builder"
      title="A simple planning pattern lets business and platform teams meet in the middle."
      copy="The strongest use cases can usually be explained through five questions. This gives Product Design a workflow shape to prototype around."
      aside={
        <div>
          <Route className="h-8 w-8 text-[#7DDD3D]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">Scenario library</h2>
          <div className="mt-4 space-y-2">
            {builderExamples.map((example) => (
              <button key={example.customer} onClick={() => setActive(example)} className={`scenario-button ${active.customer === example.customer ? 'is-active' : ''}`}>
                {example.customer}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="builder-flow">
        {steps.map(([label, value, Icon], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="builder-step"
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
            <p>{value}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}

function DesignSlide() {
  const [active, setActive] = useState(designPrinciples[0]);

  return (
    <SlideShell
      eyebrow="Product Design implications"
      title="Make Personalization feel like one connected workflow."
      copy="The future workflow should move naturally through opportunity, audience, signal readiness, experience design, activation approach, measurement, learning, and improvement."
      aside={
        <div>
          <ListChecks className="h-8 w-8 text-[#91DBDA]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">{active.title}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">{active.problem}</p>
          <div className="mt-5 rounded-md border border-[#91DBDA]/25 bg-[#91DBDA]/10 p-4 text-sm leading-6 text-slate-200">{active.opportunity}</div>
        </div>
      }
    >
      <div className="principle-list">
        {designPrinciples.map((principle, index) => (
          <button key={principle.title} onClick={() => setActive(principle)} className={`principle-row ${active.title === principle.title ? 'is-active' : ''}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{principle.title}</strong>
          </button>
        ))}
      </div>
    </SlideShell>
  );
}

function TakeawaySlide() {
  return (
    <SlideShell
      eyebrow="Core takeaway"
      title="Customers do not primarily need more ways to personalize."
      copy="They need more help turning the customer knowledge, behavior, content, and data they already have into personalization they are confident launching, measuring, and improving."
      aside={
        <div>
          <CheckCircle2 className="h-8 w-8 text-[#7DDD3D]" />
          <h2 className="mt-4 text-2xl font-semibold text-white">Product Design prompt</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">What would change if the product started with “what are you trying to improve?” instead of “which audience condition do you want to configure?”</p>
        </div>
      }
    >
      <div className="takeaway-board">
        {['Recognize', 'Readiness', 'Experience', 'Activation', 'Measurement', 'Learning'].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </SlideShell>
  );
}

function P13nClientRealityBriefing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = slides[activeIndex];

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => Math.min(slides.length - 1, current + 1));
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => Math.max(0, current - 1));
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeSlide = useMemo(() => {
    if (slide.id === 'reality') return <RealitySlide />;
    if (slide.id === 'stuck') return <BlockersSlide />;
    if (slide.id === 'asks') return <AsksSlide />;
    if (slide.id === 'worth') return <WorthItSlide />;
    if (slide.id === 'worked') return <WorkedSlide />;
    if (slide.id === 'cmab') return <CmabSlide />;
    if (slide.id === 'builder') return <BuilderSlide />;
    if (slide.id === 'design') return <DesignSlide />;
    return <TakeawaySlide />;
  }, [slide.id]);

  return (
    <main className="briefing-shell">
      <div className="briefing-aura" />
      <header className="briefing-topbar">
        <div>
          <span>Personalization Customer Reality</span>
          <strong>Product Design Briefing</strong>
        </div>
        <div className="briefing-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
      </header>

      <ProgressMap activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.28 }}
        >
          {activeSlide}
        </motion.div>
      </AnimatePresence>

      <footer className="briefing-controls">
        <button onClick={() => setActiveIndex((current) => Math.max(0, current - 1))} disabled={activeIndex === 0}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div>
          <span>{slide.label}</span>
          <div className="briefing-progress"><span style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }} /></div>
        </div>
        <button onClick={() => setActiveIndex((current) => Math.min(slides.length - 1, current + 1))} disabled={activeIndex === slides.length - 1}>
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </footer>
    </main>
  );
}

export default P13nClientRealityBriefing;
