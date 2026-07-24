import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Compass,
  Eye,
  GitBranch,
  Layers3,
  Network,
  Radar,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import {
  agents,
  annotations,
  architectureFlow,
  artifacts,
  clearStages,
  concepts,
  customerSignals,
  jsonExamples,
  journeys,
  patterns,
} from './data/portfolioData.js';

const colors = {
  mint: 'border-mint/40 bg-mint/10 text-mint',
  sky: 'border-sky/40 bg-sky/10 text-sky',
  coral: 'border-coral/40 bg-coral/10 text-coral',
  gold: 'border-gold/40 bg-gold/10 text-gold',
};

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function JsonBlock({ value }) {
  const html = useMemo(() => {
    const escaped = JSON.stringify(value, null, 2)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escaped
      .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
      .replace(/: "([^"]*)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/: (true|false)/g, ': <span class="json-bool">$1</span>')
      .replace(/: ([0-9]+)/g, ': <span class="json-number">$1</span>');
  }, [value]);

  return (
    <pre className="thin-scrollbar max-h-[30rem] overflow-auto rounded-md border border-white/10 bg-ink/90 p-4 text-xs leading-6 text-slate-200">
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

function ChapterLabel({ number, title }) {
  return (
    <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/7 px-4 py-2 text-xs uppercase tracking-[.2em] text-slate-400">
      <span className="text-mint">{number}</span>
      {title}
    </div>
  );
}

function Hero({ onBegin }) {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="cinematic-orbit absolute inset-0" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <ChapterLabel number="00" title="Enter the experience" />
          <h1 className="max-w-5xl text-5xl font-semibold tracking-normal text-white sm:text-7xl lg:text-8xl">
            From Customer Conversations to Product Innovation
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
            Over the last several years I have worked directly with enterprise experimentation teams, marketers, analysts, and digital leaders. Those conversations revealed recurring problems. This experience explores what happened next.
          </p>
          <button onClick={onBegin} className="mt-9 inline-flex items-center gap-2 rounded-md bg-mint px-5 py-4 text-sm font-semibold text-ink transition hover:bg-mint/90">
            Begin Exploration <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.8 }} className="glass relative min-h-[39rem] overflow-hidden rounded-lg p-6">
          <div className="absolute inset-0 command-grid opacity-70" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[.22em] text-slate-500">Operating system</div>
                <h2 className="mt-2 text-2xl font-semibold text-white">Product Thinking Runtime</h2>
              </div>
              <div className="rounded-full border border-mint/30 bg-mint/10 px-3 py-2 text-xs font-semibold text-mint">Interactive</div>
            </div>
            <AgentLabBoot />
            <div className="grid grid-cols-3 gap-3">
              {['Discover', 'Design', 'Validate'].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/7 p-3">
                  <div className="text-sm font-semibold text-white">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AgentLabBoot() {
  const scenes = [
    {
      signal: 'Value cannot be proven',
      pattern: 'Value Realization',
      artifact: 'ROI Agent',
      line: 'Experimentation evidence needed an executive-ready value story.',
      color: 'mint',
    },
    {
      signal: 'Program visibility is fragmented',
      pattern: 'Program Visibility',
      artifact: 'Program Health Agent',
      line: 'Teams needed a portfolio view of momentum, blockers, and next-best actions.',
      color: 'sky',
    },
    {
      signal: 'Evidence quality is uneven',
      pattern: 'Experimentation Intelligence',
      artifact: 'Gap Analysis Agent',
      line: 'The missing question was not what won, but what the program still had not learned.',
      color: 'coral',
    },
    {
      signal: 'AI needs workflow, not prompts',
      pattern: 'AI Enablement System',
      artifact: 'CLEAR Framework',
      line: 'Non-technical teams needed a repeatable way to turn domain expertise into agent blueprints.',
      color: 'gold',
    },
    {
      signal: 'Personalization needs a path',
      pattern: 'Personalization Adoption',
      artifact: 'Personalization Prototype',
      line: 'Customers needed maturity sequencing, not another disconnected feature list.',
      color: 'mint',
    },
  ];
  const [active, setActive] = useState(0);
  const scene = scenes[active];

  return (
    <div className="agent-lab relative my-8 overflow-hidden rounded-lg border border-white/10 bg-ink/35 p-4">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[.18em] text-slate-500">Agent lab title sequence</div>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">Select a signal to reveal the product system it became.</p>
        </div>
        <div className="rounded-md border border-mint/25 bg-mint/10 px-3 py-2 text-xs font-semibold text-mint">Scene 0{active + 1}</div>
      </div>

      <div className="relative z-10 mt-5 grid min-h-[25rem] gap-4 lg:grid-cols-[.72fr_1.28fr]">
        <div className="rounded-lg border border-white/10 bg-ink/55 p-4">
          <div className="mb-3 text-xs uppercase tracking-[.16em] text-slate-500">Customer signal archive</div>
          <div className="space-y-2">
            {scenes.map((item, index) => (
              <motion.button
                key={item.signal}
                onClick={() => setActive(index)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, duration: 0.45 }}
                className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition ${active === index ? 'border-mint/45 bg-mint/10 text-white' : 'border-white/10 bg-white/6 text-slate-400 hover:bg-white/10'}`}
              >
                <span className={`h-2 w-2 rounded-full ${active === index ? 'bg-mint shadow-[0_0_14px_rgba(69,211,167,.85)]' : 'bg-slate-600'}`} />
                {item.signal}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="agent-core rounded-lg border border-mint/20 bg-mint/5 p-4">
          <div className="grid gap-4 lg:grid-cols-[.95fr_1.05fr]">
            <div className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-ink/75">
              <div className="scene-vignette absolute inset-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div key={scene.artifact} initial={{ opacity: 0, scale: 0.82, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} className="agent-hologram flex h-48 w-48 items-center justify-center rounded-full border border-mint/30 bg-mint/10 p-6 text-center shadow-glow">
                  <div>
                    <div className="text-xs uppercase tracking-[.16em] text-mint">Artifact</div>
                    <div className="mt-2 text-2xl font-semibold text-white">{scene.artifact}</div>
                  </div>
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-ink/80 p-3 backdrop-blur">
                <div className="text-xs uppercase tracking-[.16em] text-slate-500">Pattern detected</div>
                <motion.div key={scene.pattern} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-lg font-semibold text-white">{scene.pattern}</motion.div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/6 p-4">
              <div>
                <div className="text-xs uppercase tracking-[.16em] text-slate-500">Transformation</div>
                <motion.h3 key={scene.signal} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-2xl font-semibold text-white">{scene.signal}</motion.h3>
                <motion.p key={scene.line} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm leading-6 text-slate-300">{scene.line}</motion.p>
              </div>
              <div className="mt-5 space-y-2">
                {['Customer signal', 'Product pattern', 'Built artifact'].map((step, index) => (
                  <div key={step} className={`rounded-md border p-3 text-xs font-semibold ${index <= 2 ? 'border-mint/25 bg-mint/10 text-mint' : 'border-white/10 bg-white/5 text-slate-500'}`}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalsChapter({ exploredSignals, setExploredSignals }) {
  const [active, setActive] = useState(customerSignals[0]);

  function selectSignal(signal) {
    setActive(signal);
    setExploredSignals((prev) => (prev.includes(signal.id) ? prev : [...prev, signal.id]));
  }

  return (
    <section id="signals" className="relative min-h-screen overflow-hidden border-y border-white/10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 signal-field" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <ChapterLabel number="01" title="The signals" />
        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <div>
            <h2 className="text-4xl font-semibold text-white sm:text-6xl">Recurring customer challenges begin to glow.</h2>
            <p className="mt-5 max-w-2xl text-slate-400">Click the signals. Each one expands into the customer problem, observed pattern, and business impact behind the product work.</p>
            <div className="relative mt-10 min-h-[34rem]">
              {customerSignals.map((signal, index) => (
                <motion.button
                  key={signal.id}
                  onClick={() => selectSignal(signal)}
                  animate={{ y: [0, index % 2 ? 14 : -14, 0] }}
                  transition={{ duration: 5 + index, repeat: Infinity }}
                  className={`absolute max-w-xs rounded-full border px-5 py-4 text-left text-sm shadow-soft backdrop-blur transition ${active.id === signal.id ? 'border-mint/50 bg-mint/15 text-white' : 'border-white/12 bg-white/8 text-slate-300 hover:bg-white/12'}`}
                  style={{
                    left: `${[3, 44, 17, 58, 29][index]}%`,
                    top: `${[4, 14, 42, 55, 75][index]}%`,
                  }}
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-mint shadow-[0_0_16px_rgba(69,211,167,.9)]" />
                  {signal.quote}
                </motion.button>
              ))}
            </div>
          </div>
          <SignalPanel signal={active} exploredCount={exploredSignals.length} />
        </div>
      </div>
    </section>
  );
}

function SignalPanel({ signal, exploredCount }) {
  return (
    <motion.aside key={signal.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="glass sticky top-8 self-start rounded-lg p-6">
      <div className="mb-4 inline-flex rounded-md border border-mint/30 bg-mint/10 px-3 py-2 text-sm text-mint">{exploredCount}/5 signals explored</div>
      <h3 className="text-2xl font-semibold text-white">{signal.quote}</h3>
      <InfoStack rows={[['Customer problem', signal.problem], ['Observed pattern', signal.pattern], ['Business impact', signal.impact]]} />
    </motion.aside>
  );
}

function PatternsChapter({ unlocked }) {
  const [active, setActive] = useState(patterns[0]);

  return (
    <section id="patterns" className={`relative min-h-screen px-4 py-24 transition sm:px-6 lg:px-8 ${unlocked ? 'opacity-100' : 'pointer-events-none opacity-35'}`}>
      <div className="mx-auto max-w-7xl">
        <ChapterLabel number="02" title="Pattern recognition" />
        <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <h2 className="text-4xl font-semibold text-white sm:text-6xl">Signals converge into product patterns.</h2>
            <p className="mt-5 text-slate-400">Once recurring challenges repeat across customers, they become product strategy inputs.</p>
            {!unlocked && <div className="mt-5 rounded-md border border-gold/25 bg-gold/10 p-4 text-sm text-gold">Explore at least two signals to unlock this chapter.</div>}
            <div className="network-stage mt-10 min-h-[32rem] rounded-lg border border-white/10 bg-white/[0.03] p-5">
              {patterns.map((pattern, index) => (
                <button
                  key={pattern.id}
                  onClick={() => setActive(pattern)}
                  className={`absolute rounded-full border px-4 py-3 text-sm font-semibold transition ${active.id === pattern.id ? 'border-sky/50 bg-sky/15 text-white' : 'border-white/12 bg-ink/75 text-slate-300 hover:bg-white/10'}`}
                  style={{
                    left: `${[38, 8, 55, 64, 20][index]}%`,
                    top: `${[8, 33, 34, 68, 70][index]}%`,
                  }}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
          <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass self-start rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-white">{active.name}</h3>
            <InfoStack rows={[['Observed customer evidence', active.evidence], ['Why it mattered', active.importance], ['Why existing solutions fell short', active.gap]]} />
            <button onClick={() => scrollToId('artifacts')} className="mt-5 inline-flex items-center gap-2 rounded-md bg-sky px-4 py-3 text-sm font-semibold text-ink">
              Explore What I Built <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArtifactsChapter() {
  const [active, setActive] = useState(artifacts[2]);
  const agent = agents.find((item) => item.id === active.agentId);

  return (
    <section id="artifacts" className="relative overflow-hidden border-y border-white/10 bg-white/[0.03] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ChapterLabel number="03" title="Solutions and agents" />
        <h2 className="max-w-4xl text-4xl font-semibold text-white sm:text-6xl">The network becomes a product ecosystem.</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <div className="ecosystem-stage relative min-h-[36rem] rounded-lg border border-white/10 bg-ink/55 p-5">
            {artifacts.map((artifact, index) => (
              <motion.button
                key={artifact.id}
                whileHover={{ scale: 1.04 }}
                onClick={() => setActive(artifact)}
                className={`absolute w-48 rounded-lg border p-4 text-left shadow-soft transition ${active.id === artifact.id ? 'border-mint/50 bg-mint/12' : 'border-white/12 bg-white/8 hover:bg-white/12'}`}
                style={{ left: `${[8, 56, 35, 12, 64][index]}%`, top: `${[12, 15, 42, 68, 68][index]}%` }}
              >
                <div className="text-xs uppercase tracking-[.16em] text-slate-500">{artifact.type}</div>
                <div className="mt-2 text-base font-semibold text-white">{artifact.name}</div>
              </motion.button>
            ))}
          </div>
          <motion.div key={active.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass self-start rounded-lg p-6">
            <div className="mb-3 text-xs uppercase tracking-[.18em] text-slate-500">{active.type}</div>
            <h3 className="text-3xl font-semibold text-white">{active.name}</h3>
            {agent ? (
              <>
                <InfoStack rows={[['Problem', agent.problem], ['Insight', agent.insight], ['Solution', agent.solution], ['Business impact', agent.metric], ['Product thinking', agent.skills.join(' | ')]]} />
                <button onClick={() => scrollToId('architecture')} className="mt-5 inline-flex items-center gap-2 rounded-md bg-mint px-4 py-3 text-sm font-semibold text-ink">
                  Explore Architecture <ArrowRight className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <p className="mt-4 leading-7 text-slate-300">CLEAR is the system that helped turn customer problems into agent blueprints. It is not another agent; it is a repeatable creation model.</p>
                <button onClick={() => scrollToId('clear')} className="mt-5 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink">
                  Experience CLEAR <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClearChapter() {
  const [stage, setStage] = useState(0);
  const current = clearStages[stage];

  return (
    <section id="clear" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ChapterLabel number="04" title="CLEAR framework" />
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <h2 className="text-4xl font-semibold text-white sm:text-6xl">Do not read CLEAR. Experience it.</h2>
            <p className="mt-5 text-slate-400">This framework enabled non-technical users to turn customer problems and domain expertise into agent blueprints without writing code.</p>
            <div className="mt-8 grid grid-cols-5 gap-2">
              {clearStages.map((item, index) => (
                <button key={item.letter} onClick={() => setStage(index)} className={`rounded-md border p-4 text-center transition ${stage === index ? 'border-gold/50 bg-gold/10 text-gold' : 'border-white/10 bg-white/6 text-slate-400 hover:bg-white/10'}`}>
                  <div className="text-2xl font-semibold">{item.letter}</div>
                  <div className="mt-1 text-xs">{item.name}</div>
                </button>
              ))}
            </div>
          </div>
          <motion.div key={current.letter} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-md border border-gold/30 bg-gold/10 text-3xl font-semibold text-gold">{current.letter}</div>
              <div>
                <div className="text-sm text-slate-500">CLEAR stage</div>
                <h3 className="text-3xl font-semibold text-white">{current.name}</h3>
              </div>
            </div>
            <div className="mt-6 rounded-md border border-white/10 bg-white/6 p-5">
              <div className="text-xs uppercase tracking-[.16em] text-slate-500">Question</div>
              <p className="mt-2 text-xl text-white">{current.question}</p>
            </div>
            <div className="mt-4 rounded-md border border-white/10 bg-white/6 p-5">
              <div className="text-xs uppercase tracking-[.16em] text-slate-500">Output</div>
              <p className="mt-2 leading-7 text-slate-300">{current.output}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-5">
              {['Business Problem', 'CLEAR Framework', 'Agent Blueprint', 'Agent JSON', 'Deploy to Opal'].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-ink/60 p-3 text-center text-xs font-semibold text-slate-300">{item}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureChapter() {
  const [activeId, setActiveId] = useState('gap');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const agent = agents.find((item) => item.id === activeId) || agents[0];

  return (
    <section id="architecture" className="border-y border-white/10 bg-white/[0.03] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ChapterLabel number="05" title="Agent architecture explorer" />
        <h2 className="max-w-4xl text-4xl font-semibold text-white sm:text-6xl">Explore the source code of product thinking.</h2>
        <div className="mt-8 flex flex-wrap gap-2">
          {agents.filter((item) => ['roi', 'health', 'gap'].includes(item.id)).map((item) => (
            <button key={item.id} onClick={() => setActiveId(item.id)} className={`rounded-md px-4 py-3 text-sm transition ${activeId === item.id ? 'bg-mint text-ink' : 'border border-white/10 bg-white/7 text-slate-300 hover:bg-white/12'}`}>{item.name}</button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.85fr]">
          <div className="glass rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-white">{agent.name}</h3>
            <div className="mt-6 space-y-3">
              {architectureFlow.map(([title, text], index) => (
                <motion.div key={title} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="flex items-center gap-4 rounded-md border border-white/10 bg-white/6 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-sky/25 bg-sky/10 text-sm font-semibold text-sky">{index + 1}</div>
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    <div className="mt-1 text-sm text-slate-400">{text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="glass rounded-lg p-6">
            <div className="mb-3 inline-flex rounded-md border border-sky/25 bg-sky/10 px-3 py-2 text-sm text-sky">Architecture first, JSON second</div>
            <p className="leading-7 text-slate-300">The architecture view explains the product decision before exposing implementation structure. JSON becomes an annotated artifact, not the primary experience.</p>
            <button onClick={() => setDrawerOpen(true)} className="mt-6 inline-flex items-center gap-2 rounded-md bg-sky px-4 py-3 text-sm font-semibold text-ink">
              View Annotated JSON <Code2 className="h-4 w-4" />
            </button>
            <AnnotationList agentId={activeId} />
          </div>
        </div>
      </div>
      <JsonDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} agent={agent} />
    </section>
  );
}

function JsonDrawer({ open, onClose, agent }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm" />
          <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 32, stiffness: 260 }} className="fixed right-0 top-0 z-50 h-full w-full max-w-3xl overflow-auto border-l border-white/10 bg-ink p-6 shadow-glow thin-scrollbar">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[.2em] text-slate-500">Annotated JSON</div>
                <h3 className="mt-2 text-3xl font-semibold text-white">{agent.name}</h3>
              </div>
              <button onClick={onClose} className="rounded-md border border-white/10 bg-white/8 p-2 text-slate-300 hover:bg-white/12"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6">
              <JsonBlock value={jsonExamples[agent.id]} />
            </div>
            <AnnotationList agentId={agent.id} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function ConceptsChapter() {
  const [active, setActive] = useState(concepts[0]);
  const [step, setStep] = useState(0);
  const labels = ['Problem', 'Future Vision', 'Interactive Prototype', 'Validation Questions'];
  const values = [active.focus, active.opportunity, active.prototype, active.questions.join('  |  ')];

  return (
    <section id="concepts" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ChapterLabel number="06" title="Product concepts" />
        <h2 className="max-w-4xl text-4xl font-semibold text-white sm:text-6xl">Future-state thinking becomes explorable.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="space-y-3">
            {concepts.map((concept) => (
              <button key={concept.id} onClick={() => { setActive(concept); setStep(0); }} className={`w-full rounded-lg border p-5 text-left transition ${active.id === concept.id ? 'border-gold/50 bg-gold/10' : 'border-white/10 bg-white/6 hover:bg-white/10'}`}>
                <div className="text-xs uppercase tracking-[.16em] text-slate-500">{concept.label}</div>
                <div className="mt-2 text-xl font-semibold text-white">{concept.title}</div>
              </button>
            ))}
          </div>
          <div className="glass rounded-lg p-6">
            <div className="mb-5 flex flex-wrap gap-2">
              {labels.map((label, index) => (
                <button key={label} onClick={() => setStep(index)} className={`rounded-md px-3 py-2 text-xs transition ${step === index ? 'bg-gold text-ink' : 'border border-white/10 bg-white/7 text-slate-300 hover:bg-white/12'}`}>{label}</button>
              ))}
            </div>
            <motion.div key={`${active.id}-${step}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-3xl font-semibold text-white">{labels[step]}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-300">{values[step]}</p>
            </motion.div>
            {active.id === 'personalization-concept' && (
              <button onClick={() => scrollToId('personalization-prototype')} className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-ink">
                Explore Personalization Prototype <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalizationPrototype() {
  const [stage, setStage] = useState(1);
  const stages = ['Foundation', 'Segmentation', 'Orchestration', 'Adaptive'];
  const capabilities = ['CMS Personalization', 'Web Experimentation', 'Audience Conditions', 'Behavior Targeting', 'Real Time Segmentation', 'ODP', 'Opal', 'CMAB'];
  return (
    <section id="personalization-prototype" className="border-y border-white/10 bg-white/[0.03] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ChapterLabel number="06A" title="Featured prototype" />
        <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <h2 className="text-4xl font-semibold text-white">Personalization Adoption Journey</h2>
            <p className="mt-4 text-slate-400">A contained concept showing how adoption challenges become a guided product prototype.</p>
            <div className="mt-6 grid gap-2">
              {stages.map((item, index) => (
                <button key={item} onClick={() => setStage(index)} className={`rounded-md border p-4 text-left transition ${stage === index ? 'border-gold/45 bg-gold/10 text-gold' : 'border-white/10 bg-white/6 text-slate-300 hover:bg-white/10'}`}>{item}</button>
              ))}
            </div>
          </div>
          <div className="glass rounded-lg p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">{stages[stage]} readiness</h3>
              <span className="rounded-md border border-gold/25 bg-gold/10 px-3 py-2 text-sm text-gold">{(stage + 1) * 25}%</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability, index) => {
                const active = stage >= Math.floor(index / 2);
                return (
                  <div key={capability} className={`rounded-md border p-4 ${active ? 'border-mint/30 bg-mint/10' : 'border-white/10 bg-white/5 opacity-55'}`}>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <CheckCircle2 className={`h-4 w-4 ${active ? 'text-mint' : 'text-slate-600'}`} />
                      {capability}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyProductChapter() {
  const [active, setActive] = useState(3);
  return (
    <section id="why-product" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ChapterLabel number="07" title="Why Product" />
        <div className="grid gap-8 lg:grid-cols-[1fr_.9fr]">
          <div>
            <h2 className="text-4xl font-semibold text-white sm:text-6xl">Product Management is the natural next step.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">After experiencing the customer problems, patterns, agents, frameworks, and concepts, the transition becomes the conclusion: this work is already product thinking.</p>
          </div>
          <div className="glass rounded-lg p-5">
            {journeys.map((item, index) => (
              <button key={item.stage} onClick={() => setActive(index)} className={`mb-2 flex w-full items-center gap-4 rounded-md border p-4 text-left transition ${active === index ? 'border-mint/45 bg-mint/10' : 'border-white/10 bg-white/6 hover:bg-white/10'}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-ink/60 text-sm text-mint">{index + 1}</span>
                <span>
                  <span className="block font-semibold text-white">{item.stage}</span>
                  <span className="mt-1 block text-sm text-slate-400">{item.skill}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnnotationList({ agentId }) {
  return (
    <div className="mt-5 space-y-3">
      {(annotations[agentId] || []).map(([title, text]) => (
        <div key={title} className="rounded-md border border-white/10 bg-white/6 p-4">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm leading-6 text-slate-400">{text}</div>
        </div>
      ))}
    </div>
  );
}

function InfoStack({ rows }) {
  return (
    <div className="mt-5 space-y-3">
      {rows.map(([label, text]) => (
        <div key={label} className="rounded-md border border-white/10 bg-white/6 p-4">
          <div className="text-xs uppercase tracking-[.16em] text-slate-500">{label}</div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
        </div>
      ))}
    </div>
  );
}

function FloatingNav() {
  return (
    <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-white/10 bg-ink/78 p-2 backdrop-blur-xl md:flex">
      {[
        ['Signals', 'signals', Eye],
        ['Patterns', 'patterns', Network],
        ['Artifacts', 'artifacts', Layers3],
        ['CLEAR', 'clear', Workflow],
        ['Architecture', 'architecture', Code2],
        ['Concepts', 'concepts', Sparkles],
        ['PM', 'why-product', Compass],
      ].map(([label, id, Icon]) => (
        <button key={id} onClick={() => scrollToId(id)} className="group relative rounded-full p-3 text-slate-400 transition hover:bg-white/10 hover:text-white">
          <Icon className="h-4 w-4" />
          <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-white px-2 py-1 text-xs text-ink opacity-0 transition group-hover:opacity-100">{label}</span>
        </button>
      ))}
    </div>
  );
}

function App() {
  const [begun, setBegun] = useState(false);
  const [exploredSignals, setExploredSignals] = useState([]);

  function begin() {
    setBegun(true);
    setTimeout(() => scrollToId('signals'), 220);
  }

  return (
    <>
      <main className={begun ? 'experience-begun' : ''}>
        <Hero onBegin={begin} />
        <SignalsChapter exploredSignals={exploredSignals} setExploredSignals={setExploredSignals} />
        <PatternsChapter unlocked={exploredSignals.length >= 2} />
        <ArtifactsChapter />
        <ClearChapter />
        <ArchitectureChapter />
        <ConceptsChapter />
        <PersonalizationPrototype />
        <WhyProductChapter />
      </main>
      <FloatingNav />
      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        Interactive front-end prototype using sanitized local mock data. No confidential customer data included.
      </footer>
    </>
  );
}

export default App;
