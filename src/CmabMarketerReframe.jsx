import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  Lightbulb,
  MessageSquareText,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  XCircle,
} from 'lucide-react';

const navItems = [
  ['problem', 'Problem'],
  ['reframe', 'Reframe'],
  ['two-paths', 'Two Paths'],
  ['picker', 'Use Case Picker'],
  ['examples', 'Client Examples'],
  ['decision', 'Decision Model'],
  ['talk-track', 'Talk Track'],
  ['readiness', 'Readiness Checklist'],
  ['action', 'Action Plan'],
];

const useCases = [
  {
    prompt: 'I know the audience and I know the exact experience I want to show.',
    path: 'Rules Based Personalization',
    icon: Target,
    why: 'The marketer has already decided the audience and treatment. The goal is controlled delivery, not learning which treatment performs best.',
    example: 'Show a returning customer a loyalty message when they visit the homepage.',
  },
  {
    prompt: 'I have multiple possible experiences, but I do not know which one will work best.',
    path: 'CMAB',
    icon: BrainCircuit,
    why: 'The marketer has multiple meaningful experience options and needs to learn which one performs best across audiences or visitor contexts. The client may already know the audience, or they may be starting with contextual signals like device, traffic source, location, behavior, page type, or session context.',
    example: 'Test whether mobile organic visitors respond better to a value message, trust signal, product capability message, or lower commitment CTA.',
  },
  {
    prompt: 'I need to validate whether the personalization idea works at all.',
    path: 'A/B Test',
    icon: BarChart3,
    why: 'The marketer needs to compare a treatment against a control before turning it into an ongoing personalization strategy.',
    example: 'Test whether a personalized homepage hero improves conversion compared to the default homepage experience.',
  },
  {
    prompt: 'I have customer data, but I am not sure if the signals are usable.',
    path: 'Audience Readiness Review',
    icon: ShieldCheck,
    why: 'The marketer should confirm whether the audience, events, attributes, behavioral data, or Real-Time Segments are reliable before using them in a personalization campaign.',
    example: 'Review whether ODP Real-Time Segments, behavioral conditions, or customer attributes are stable enough to support campaign targeting.',
  },
];

const cmabPaths = [
  {
    title: 'The marketer knows the audience, but not the best experience.',
    label: 'Audience Known',
    icon: UsersRound,
    scenario: 'The team knows who they want to personalize for, but they are unsure which message, offer, layout, or content treatment will perform best.',
    example: 'A marketer wants to personalize for mobile organic visitors in the United States, but does not know whether a value message, trust signal, product capability message, or lower commitment CTA will work best.',
    fit: 'CMAB lets the team start with multiple experience options and learn which experience performs better for that audience based on performance data.',
  },
  {
    title: 'The marketer has contextual signals, but not a perfect audience strategy.',
    label: 'Audience Not Fully Defined',
    icon: Network,
    scenario: 'The team has useful signals like device, traffic source, location, page behavior, session context, or customer data, but they are not fully sure which context should receive which experience.',
    example: 'A marketer wants to personalize the homepage experience based on mobile visitors, search traffic, paid media traffic, geography, and page behavior, but does not know which experience should be matched to which context.',
    fit: 'CMAB can help learn what works across different visitor contexts without requiring the team to manually define every audience and treatment combination upfront.',
  },
];

const clientExamples = [
  {
    client: 'Copeland',
    angle: 'Audience and interest-based personalization',
    relevant: 'Copeland had signals that could support different audience experiences, but the stronger conversation was helping them understand how different messages could be matched to different visitor contexts.',
    landed: 'CMAB made sense when framed as a way to answer: “Which experience should we show when we have multiple possible options and need to learn what works best?”',
    learning: 'CMAB lands better when it is framed as decision support for personalization, not as an advanced algorithm.',
  },
  {
    client: 'Extra Space Storage',
    angle: 'BPCLP page optimization',
    relevant: 'Extra Space Storage had a specific page type and multiple possible experience directions. CMAB became easier to explain when tied to the practical campaign decision of which treatment should be shown based on visitor context.',
    landed: 'The conversation worked better when CMAB was connected to an actual page and campaign decision instead of explained as a standalone feature.',
    learning: 'CMAB should be introduced once the marketer sees the personalization decision it helps solve.',
  },
  {
    client: 'Sysco',
    angle: 'Behavior-based personalization and campaign decisioning',
    relevant: 'Sysco needed a practical way to understand how behavior targeting and CMAB could fit into a personalization strategy. The stronger framing showed how CMAB can work within a defined audience or context to help determine the best experience.',
    landed: 'CMAB was easier to understand when positioned as part of campaign strategy, not as a separate technical feature.',
    learning: 'CMAB should be shown through scenarios that connect audience, context, experience, metric, and decision logic.',
  },
];

const concerns = [
  {
    concern: 'I do not know which message will work best.',
    response: 'CMAB helps compare multiple experiences while the campaign runs, so the team does not have to manually pick one winner too early.',
  },
  {
    concern: 'I want to personalize, but I do not want to overcomplicate the campaign.',
    response: 'CMAB gives marketers a structured way to start with multiple experience options and let performance guide which one should be shown more often.',
  },
  {
    concern: 'I need to show business value.',
    response: 'CMAB connects the personalization decision to a primary metric, so the campaign is tied to a measurable outcome.',
  },
  {
    concern: 'I do not know which audience or context should receive which experience.',
    response: 'CMAB can help learn which experience works best across different visitor contexts, such as device, traffic source, location, behavior, page type, session context, or customer data.',
  },
];

const readinessItems = [
  ['Multiple experience options', 'The marketer has at least two meaningful experiences worth comparing.'],
  ['Usable audience or contextual signals', 'The campaign has enough context to learn from, such as audience membership, device, traffic source, location, behavior, page type, session context, or customer data.'],
  ['Clear primary metric', 'The team knows what success should optimize toward.'],
  ['Enough traffic to learn', 'The campaign has enough volume for performance signals to become useful.'],
  ['Meaningful experience differences', 'The treatments are different enough to produce useful learning.'],
];

const antiPatterns = [
  'Do not use CMAB when the marketer already knows the exact experience to show.',
  'Do not use CMAB when the team has no clear success metric.',
  'Do not position CMAB as the first step if the audience or contextual signal is not reliable enough to learn from.',
  'Do not start with the algorithm explanation before the use case is clear.',
];

const actionPlan = [
  ['Update CMAB positioning', 'Lead with the marketer problem first, then explain the capability.'],
  ['Attach CMAB to real client use cases', 'Use examples like Copeland, Extra Space Storage, and Sysco to show where the framing works.'],
  ['Create a CMAB readiness checklist', 'Help Sales, CS, and V&A know when CMAB is appropriate.'],
  ['Build a short demo campaign', 'Show CMAB answering: “Which experience works best across these visitor contexts?”'],
  ['Add CMAB into the adoption path', 'Position CMAB as a practical next step when clients have multiple experience options, usable context, and a clear success metric.'],
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function SectionLabel({ children }) {
  return <div className="cmab-label">{children}</div>;
}

function CmabNav() {
  return (
    <nav className="cmab-nav" aria-label="CMAB enablement sections">
      {navItems.map(([id, label]) => (
        <button key={id} onClick={() => scrollToSection(id)}>{label}</button>
      ))}
    </nav>
  );
}

function UseCasePicker() {
  const [active, setActive] = useState(useCases[1]);
  const Icon = active.icon;

  return (
    <section id="picker" className="cmab-section">
      <div>
        <SectionLabel>Use Case Picker</SectionLabel>
        <h2>Start with what the marketer is trying to solve.</h2>
        <p>Click a marketer question to reveal the recommended Optimizely path. CMAB should show up when the team has multiple possible experiences and needs to learn which one works best.</p>
      </div>
      <div className="cmab-picker-grid">
        <div className="cmab-usecase-list">
          {useCases.map((item) => (
            <button
              key={item.path}
              onClick={() => setActive(item)}
              className={active.path === item.path ? 'is-active' : ''}
            >
              <span>{item.prompt}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ))}
        </div>
        <motion.aside
          key={active.path}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="cmab-recommendation-card"
        >
          <Icon className="h-8 w-8" />
          <div className="cmab-kicker">Recommended path</div>
          <h3>{active.path}</h3>
          <dl>
            <div>
              <dt>Why</dt>
              <dd>{active.why}</dd>
            </div>
            <div>
              <dt>Example</dt>
              <dd>{active.example}</dd>
            </div>
          </dl>
        </motion.aside>
      </div>
    </section>
  );
}

function TwoPaths() {
  const [active, setActive] = useState(cmabPaths[0]);
  const Icon = active.icon;

  return (
    <section id="two-paths" className="cmab-section">
      <div>
        <SectionLabel>The Two Common CMAB Paths</SectionLabel>
        <h2>CMAB can support known audiences and broader visitor contexts.</h2>
        <p>Many teams assume CMAB only applies after a perfect audience strategy exists. The stronger framing is that CMAB helps when there are multiple meaningful experience options and useful signals to learn from.</p>
      </div>
      <div className="cmab-path-grid">
        <div className="cmab-path-list">
          {cmabPaths.map((path) => {
            const PathIcon = path.icon;
            return (
              <button
                key={path.label}
                onClick={() => setActive(path)}
                className={active.label === path.label ? 'is-active' : ''}
              >
                <PathIcon className="h-5 w-5" />
                <span>
                  <strong>{path.label}</strong>
                  <small>{path.title}</small>
                </span>
              </button>
            );
          })}
        </div>
        <motion.aside
          key={active.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="cmab-path-detail"
        >
          <Icon className="h-8 w-8" />
          <h3>{active.label}</h3>
          <InfoGrid rows={[
            ['Scenario', active.scenario],
            ['Example', active.example],
            ['Why CMAB fits', active.fit],
          ]} />
        </motion.aside>
      </div>
    </section>
  );
}

function ClientExamples() {
  const [active, setActive] = useState(clientExamples[0]);

  return (
    <section id="examples" className="cmab-section cmab-section-muted">
      <div>
        <SectionLabel>Client Examples</SectionLabel>
        <h2>CMAB lands when it is attached to a real campaign decision.</h2>
        <p>These examples make the positioning credible because they connect the capability to audience context, page intent, message options, and a decision the marketer already needs to make.</p>
      </div>
      <div className="cmab-client-shell">
        <div className="cmab-client-tabs">
          {clientExamples.map((example) => (
            <button key={example.client} onClick={() => setActive(example)} className={active.client === example.client ? 'is-active' : ''}>
              {example.client}
            </button>
          ))}
        </div>
        <motion.div key={active.client} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="cmab-client-card">
          <h3>{active.client}</h3>
          <InfoGrid rows={[
            ['Use case angle', active.angle],
            ['What made CMAB relevant', active.relevant],
            ['What landed', active.landed],
            ['Internal learning', active.learning],
          ]} />
        </motion.div>
      </div>
    </section>
  );
}

function DecisionModel() {
  const steps = [
    ['Does the client have multiple meaningful experience options?', 'No: use rules based personalization if the experience is known, or help define the experience options first. Yes: move forward.'],
    ['Does the client have usable audience or contextual signals?', 'No: start with audience discovery, ODP readiness, behavioral data review, or campaign planning. Yes: move forward.'],
    ['Does the client have a clear success metric?', 'No: define the primary metric before recommending CMAB. Yes: CMAB is a strong fit.'],
  ];

  return (
    <section id="decision" className="cmab-section">
      <div>
        <SectionLabel>Decision Model</SectionLabel>
        <h2>Recommend CMAB only after the use case is clear.</h2>
        <p>CMAB is a strong fit when the client has multiple meaningful experiences, usable audience or contextual signals, and a clear metric for deciding what “best” means.</p>
      </div>
      <div className="cmab-decision-flow">
        {steps.map(([question, answer], index) => (
          <div key={question} className="cmab-decision-step">
            <span>{index + 1}</span>
            <h3>{question}</h3>
            <p>{answer}</p>
          </div>
        ))}
        <div className="cmab-decision-fit">
          <BrainCircuit className="h-7 w-7" />
          <strong>CMAB fit</strong>
          <p>Multiple meaningful experiences + usable audience or contextual signals + clear success metric.</p>
        </div>
      </div>
    </section>
  );
}

function TalkTrack() {
  const [activeConcern, setActiveConcern] = useState(concerns[0]);

  return (
    <section id="talk-track" className="cmab-section cmab-section-muted">
      <div>
        <SectionLabel>Talk Track</SectionLabel>
        <h2>Make the marketer value visible before the mechanics.</h2>
        <p>The goal is to move teams away from leading with how CMAB works and toward what it helps the client decide.</p>
      </div>
      <div className="cmab-talk-grid">
        <div className="cmab-concern-card">
          <div className="cmab-kicker">What is in it for me?</div>
          <div className="cmab-concern-list">
            {concerns.map((item) => (
              <button key={item.concern} onClick={() => setActiveConcern(item)} className={activeConcern.concern === item.concern ? 'is-active' : ''}>
                {item.concern}
              </button>
            ))}
          </div>
          <motion.div key={activeConcern.concern} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="cmab-concern-response">
            <MessageSquareText className="h-6 w-6" />
            <p>{activeConcern.response}</p>
          </motion.div>
        </div>
        <div className="cmab-concern-card">
          <div className="cmab-kicker">Recommended talk track</div>
          <div className="cmab-talk-script-grid">
            <div className="cmab-script-card">
              <span>Short version</span>
              <p>CMAB is useful when marketers have multiple possible experiences and need to learn which one works best across different audiences or visitor contexts. It helps teams avoid guessing too early by using context and performance signals while the campaign runs.</p>
            </div>
            <div className="cmab-script-card">
              <span>Longer version</span>
              <p>Many marketers want to personalize, but they may not know the right experience, the right audience, or the right context to prioritize. CMAB helps by letting teams start with multiple meaningful experiences and a clear success metric. As the campaign runs, it uses contextual and performance signals to help determine which experience should be shown more often.</p>
            </div>
            <div className="cmab-script-card">
              <span>Avoid saying first</span>
              <p>CMAB is a contextual multi-armed bandit algorithm that dynamically allocates traffic.</p>
            </div>
            <div className="cmab-script-card">
              <span>Say instead</span>
              <p>CMAB helps marketers decide which experience should be shown when there are multiple credible options and no clear single answer upfront.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReadinessChecklist() {
  const [checked, setChecked] = useState(() => new Set(['Multiple experience options', 'Usable audience or contextual signals']));
  const checkedCount = checked.size;

  function toggle(label) {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  return (
    <section id="readiness" className="cmab-section">
      <div>
        <SectionLabel>Readiness Checklist</SectionLabel>
        <h2>Help internal teams know when CMAB is appropriate.</h2>
        <p>This is a readiness conversation, not a technical interrogation. The checklist helps Sales, CS, Product, PMM, and V&A decide whether CMAB belongs in the recommendation.</p>
      </div>
      <div className="cmab-readiness-grid">
        <div className="cmab-checklist">
          {readinessItems.map(([label, detail]) => {
            const active = checked.has(label);
            return (
              <button key={label} onClick={() => toggle(label)} className={active ? 'is-active' : ''}>
                <CheckCircle2 className="h-5 w-5" />
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
              </button>
            );
          })}
        </div>
        <aside className="cmab-status-panel">
          <Gauge className="h-8 w-8" />
          <h3>{checkedCount >= 4 ? 'Strong CMAB candidate' : checkedCount >= 3 ? 'Needs one more check' : 'Not ready yet'}</h3>
          <p>{checkedCount}/5 readiness signals selected</p>
          <div className="cmab-readiness-bar"><span style={{ width: `${(checkedCount / readinessItems.length) * 100}%` }} /></div>
          <div className="cmab-antipatterns">
            {antiPatterns.map((item) => (
              <div key={item}><XCircle className="h-4 w-4" />{item}</div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function InfoGrid({ rows }) {
  return (
    <div className="cmab-info-grid">
      {rows.map(([label, text]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{text}</dd>
        </div>
      ))}
    </div>
  );
}

function CmabMarketerReframe() {
  useEffect(() => {
    document.title = 'Reframing CMAB for Marketers | Internal Enablement';
  }, []);

  const statCards = useMemo(() => [
    ['North Star', 'Learn which experience works best across audiences, behaviors, and visitor contexts'],
    ['Primary audience', 'Product, PMM, Sales, CS, and V&A'],
    ['Positioning shift', 'From algorithm explanation to decision support'],
  ], []);

  return (
    <main className="cmab-shell">
      <div className="cmab-background" />
      <CmabNav />

      <section id="problem" className="cmab-hero">
        <div className="cmab-hero-copy">
          <SectionLabel>Reframing CMAB for Marketers</SectionLabel>
          <h1>Lead with the marketer problem, not the algorithm.</h1>
          <p>CMAB should not be introduced as an advanced algorithm. It should be introduced as a practical answer to a common personalization blocker.</p>
          <button onClick={() => scrollToSection('two-paths')}>
            Explore CMAB paths <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="cmab-hero-panel">
          <div className="cmab-question-card">
            <span>Common blocker</span>
            <strong>“We have multiple experience ideas. Which one should we show, to whom, and under what context?”</strong>
          </div>
          <div className="cmab-stat-grid">
            {statCards.map(([label, text]) => (
              <div key={label}>
                <span>{label}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reframe" className="cmab-section cmab-section-muted">
        <div>
          <SectionLabel>The Better Way To Explain CMAB</SectionLabel>
          <h2>CMAB is useful when a marketer has multiple possible experiences and does not want to guess which one should win.</h2>
          <p>Clients are not usually asking for contextual multi-armed bandits. They want to personalize, but they do not know which experience will work best across the audience, behavior, or visitor context in front of them.</p>
        </div>
        <div className="cmab-reframe-grid">
          <div>
            <BrainCircuit className="h-7 w-7" />
            <span>Feature first</span>
            <p>CMAB uses machine learning to dynamically allocate traffic across experiences based on visitor context and performance data.</p>
          </div>
          <div>
            <Sparkles className="h-7 w-7" />
            <span>Use case first</span>
            <p>CMAB helps marketers learn which experience works best across different audiences, behaviors, and visitor contexts while the campaign runs.</p>
          </div>
          <div className="cmab-simple-statement">
            <Target className="h-7 w-7" />
            <span>Core reframe</span>
            <p>The issue is both feature capability and how we frame the marketer’s decision problem.</p>
          </div>
        </div>
      </section>

      <TwoPaths />
      <UseCasePicker />
      <ClientExamples />
      <DecisionModel />
      <TalkTrack />
      <ReadinessChecklist />

      <section id="action" className="cmab-section cmab-action-section">
        <div>
          <SectionLabel>Action Plan</SectionLabel>
          <h2>Use CMAB as a practical next step in the personalization adoption path.</h2>
          <p>Internal teams need a shared way to recognize, explain, and demonstrate CMAB without making the first conversation feel technical.</p>
        </div>
        <div className="cmab-action-grid">
          {actionPlan.map(([title, detail], index) => (
            <div key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          ))}
        </div>
        <div className="cmab-final-card">
          <Lightbulb className="h-7 w-7" />
          <strong>CMAB should not be introduced as an advanced algorithm.</strong>
          <p>It should be introduced as a practical answer to a common personalization blocker: “We have multiple experience ideas. Which one should we show, to whom, and under what context?”</p>
        </div>
      </section>
    </main>
  );
}

export default CmabMarketerReframe;
