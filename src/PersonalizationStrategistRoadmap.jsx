import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardList,
  FileStack,
  Gauge,
  Layers3,
  Network,
  Sparkles,
  Target,
} from 'lucide-react';

const roadmapItems = [
  {
    id: 'campaign-execution',
    phase: 'Now',
    eyebrow: 'GA motion',
    title: 'Personalization Strategist for campaign execution',
    platform: 'Web Experimentation, Personalization, Optimizely Analytics',
    outcome: 'Help customers move from Personalization access to campaign execution and performance monitoring.',
    capability:
      'Researches available project data, identifies personalization opportunities, creates the campaign plan, builds the campaign setup, supports Code Editor implementation, and monitors performance.',
    why:
      'This is already in motion for GA and gives Product a concrete Virtual Teammate pattern to evaluate.',
    success:
      'Campaigns created, campaign setup reviewed, performance monitored, setup gaps identified, and reduced manual effort from planning to execution.',
    icon: Target,
    signal: 'From access to action',
    metric: 'GA pattern',
  },
  {
    id: 'audience-readiness',
    phase: 'Next',
    eyebrow: 'Data readiness',
    title: 'Audience readiness and activation strategy',
    platform: 'ODP, Real-Time Segments, Personalization',
    outcome: 'Help customers turn audience data into usable personalization strategy.',
    capability:
      'Reviews ODP segments, Real-Time Segments, customer attributes, behaviors, and event data to identify which audiences are ready to activate, which signals are strong enough to support a campaign, and which setup gaps need to be resolved first.',
    why:
      'Personalization becomes stronger when customers can act on real customer context, not just static page rules. ODP audiences are built from customer attributes and activities, and Real-Time Segments can support web-based personalization using customer behavior as it happens. Personalization Strategist can help turn those segments into campaign strategy by explaining what the audience represents, how it should be used, what experience should be delivered, and what must be confirmed before activation.',
    success:
      'Audience opportunities identified, Real-Time Segment use cases recommended, missing attributes or events surfaced, and more customers moving from available customer data to active personalization campaigns.',
    icon: Gauge,
    signal: 'From audience data to strategy',
    metric: 'Readiness scored',
  },
  {
    id: 'experience-planning',
    phase: 'Next',
    eyebrow: 'Experience strategy',
    title: 'Content and experience planning',
    platform: 'CMS, CMP, Personalization',
    outcome: 'Help teams connect audience intent to the content or experience that should be delivered.',
    capability:
      'Creates experience briefs, recommends content variants, connects campaign goals to audience needs, and prepares review-ready personalization concepts.',
    why:
      'Once the audience and campaign direction are clear, customers still need help translating the strategy into the actual experience. This is where CMS and CMP become important.',
    success:
      'Experience briefs created, content variants prepared, campaign concepts reviewed, and faster movement from strategy to experience creation.',
    icon: FileStack,
    signal: 'From strategy to experience',
    metric: 'Briefs ready',
  },
  {
    id: 'mercator-limitless',
    phase: 'Later',
    eyebrow: 'Advanced creation',
    title: 'Mercator and Limitless Personalization support',
    platform: 'Mercator, Limitless Personalization, CMS, CMP, ODP, Opal',
    outcome:
      'Support more advanced personalized experience creation using product, content, audience, and recommendation context.',
    capability:
      'Helps identify where personalized pages or experiences should be created, recommends what content or product context should influence the experience, supports approved build preparation, and monitors performance after activation.',
    why:
      'This is the natural next level once the VT model proves it can move customers from data and strategy into approved personalized experiences. Mercator and Limitless Personalization provide stronger outcome-based paths where Personalization Strategist could help connect planning, content, data, and execution.',
    success:
      'Personalized page concepts generated, approved experiences prepared, recommendation-driven use cases identified, and performance reviewed after launch.',
    icon: Sparkles,
    signal: 'From campaigns to outcome paths',
    metric: 'Use cases ranked',
  },
  {
    id: 'cross-platform-model',
    phase: 'Later',
    eyebrow: 'Reusable pattern',
    title: 'Cross-platform Virtual Teammate model',
    platform: 'Opal, Personalization, ODP, CMS, CMP, Analytics',
    outcome:
      'Create a repeatable Virtual Teammate model that helps customers move from insight to action across Optimizely platforms.',
    capability:
      'Coordinates research, planning, build preparation, measurement, and iteration across connected products while keeping human review in the activation path.',
    why:
      'The long-term value is not one VT for one use case. The opportunity is a reusable operating model for how Virtual Teammates help customers complete product workflows across Optimizely.',
    success:
      'Repeat usage across workflows, more completed activation paths, stronger customer questions for CS and V&A, and clearer signals on where customers need product guidance.',
    icon: Network,
    signal: 'From one teammate to a model',
    metric: 'Reusable VT loop',
  },
];

const phaseCopy = {
  Now: {
    label: 'Now',
    title: 'Prove the GA teammate pattern.',
    copy:
      'Start with the concrete launch motion: campaign planning, build support, monitoring, and setup gap detection.',
  },
  Next: {
    label: 'Next',
    title: 'Expand from execution into strategy.',
    copy:
      'Help customers decide which audiences are ready and what experience should be created for them.',
  },
  Later: {
    label: 'Later',
    title: 'Turn the pattern into a platform model.',
    copy:
      'Move toward advanced personalization creation and a reusable Virtual Teammate operating model across products.',
  },
};

const progression = [
  'Campaign Execution',
  'Audience Readiness',
  'Experience Planning',
  'Mercator / Limitless Personalization',
  'Cross-Platform VT Model',
];

function FieldCard({ label, children, icon: Icon }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[.18em] text-slate-500">
        <Icon className="h-4 w-4 text-[#91dbda]" />
        {label}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{children}</p>
    </div>
  );
}

function PhaseTabs({ activePhase, setActivePhase }) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.045] p-1">
      {Object.keys(phaseCopy).map((phase) => (
        <button
          key={phase}
          onClick={() => setActivePhase(phase)}
          className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
            activePhase === phase
              ? 'bg-[#91dbda] text-[#061314] shadow-[0_0_24px_rgba(145,219,218,.22)]'
              : 'text-slate-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {phase}
        </button>
      ))}
    </div>
  );
}

function RoadmapCard({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-lg border p-4 text-left transition ${
        active
          ? 'border-[#91dbda]/70 bg-[#91dbda]/10 shadow-[0_18px_60px_rgba(0,0,0,.28)]'
          : 'border-white/10 bg-white/[0.04] hover:border-[#91dbda]/40 hover:bg-white/[0.07]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${
              active ? 'border-[#91dbda]/50 bg-[#91dbda]/15 text-[#91dbda]' : 'border-white/10 bg-[#061314]/70 text-slate-400'
            }`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xs uppercase tracking-[.18em] text-slate-500">{item.eyebrow}</span>
            <span className="mt-2 block text-lg font-semibold text-white">{item.title}</span>
          </span>
        </div>
        <ArrowRight className={`mt-2 h-4 w-4 transition ${active ? 'text-[#91dbda]' : 'text-slate-600 group-hover:text-[#91dbda]'}`} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-[#91dbda]/20 bg-[#91dbda]/10 px-3 py-1 text-xs font-semibold text-[#91dbda]">
          {item.signal}
        </span>
        <span className="rounded-full border border-[#ff99b6]/20 bg-[#ff99b6]/10 px-3 py-1 text-xs font-semibold text-[#ff99b6]">
          {item.metric}
        </span>
      </div>
    </button>
  );
}

function ProgressionRail({ activeItem, onSelect }) {
  return (
    <aside className="roadmap-progress-rail rounded-xl border border-white/10 bg-[#071414]/80 p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[.18em] text-slate-500">
        <Layers3 className="h-4 w-4 text-[#91dbda]" />
        Evolution path
      </div>
      <div className="space-y-3">
        {roadmapItems.map((item, index) => {
          const selected = item.id === activeItem.id;
          return (
            <button key={item.id} onClick={() => onSelect(item)} className="group flex w-full gap-3 text-left">
              <span className="relative flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                    selected ? 'border-[#91dbda] bg-[#91dbda] text-[#061314]' : 'border-white/15 bg-white/[0.04] text-slate-400'
                  }`}
                >
                  {index + 1}
                </span>
                {index < roadmapItems.length - 1 && <span className="h-10 w-px bg-white/10" />}
              </span>
              <span className="pb-2">
                <span className={`block text-sm font-semibold transition ${selected ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                  {progression[index]}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-[.14em] text-slate-600">{item.phase}</span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function PersonalizationStrategistRoadmap() {
  const [activePhase, setActivePhase] = useState('Now');
  const phaseItems = useMemo(() => roadmapItems.filter((item) => item.phase === activePhase), [activePhase]);
  const [activeId, setActiveId] = useState(roadmapItems[0].id);
  const activeItem = roadmapItems.find((item) => item.id === activeId) || roadmapItems[0];

  function selectPhase(phase) {
    setActivePhase(phase);
    const firstInPhase = roadmapItems.find((item) => item.phase === phase);
    if (firstInPhase) setActiveId(firstInPhase.id);
  }

  function selectItem(item) {
    setActivePhase(item.phase);
    setActiveId(item.id);
  }

  const activePhaseCopy = phaseCopy[activePhase];

  return (
    <main className="roadmap-shell min-h-screen overflow-hidden px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="roadmap-grid-bg absolute inset-0" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">
        <header className="grid gap-6 border-b border-white/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#91dbda]/20 bg-[#91dbda]/10 px-4 py-2 text-xs uppercase tracking-[.2em] text-[#91dbda]">
              <Bot className="h-4 w-4" />
              Personalization Strategist
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              Virtual Teammate Evolution Roadmap
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
              How Personalization Strategist can evolve from a GA Virtual Teammate into a repeatable product pattern across Optimizely platforms.
            </p>
          </div>
          <div className="rounded-xl border border-[#ff99b6]/20 bg-[#ff99b6]/10 p-4 text-sm text-slate-200">
            <div className="text-xs uppercase tracking-[.16em] text-[#ff99b6]">Opticon GA lens</div>
            <div className="mt-2 max-w-xs font-semibold">Start with campaign execution, then expand the operating model.</div>
          </div>
        </header>

        <section className="grid flex-1 gap-6 py-8 xl:grid-cols-[17rem_1fr]">
          <ProgressionRail activeItem={activeItem} onSelect={selectItem} />

          <div className="grid gap-6 xl:grid-cols-[.86fr_1.14fr]">
            <section className="rounded-xl border border-white/10 bg-[#071414]/70 p-5 backdrop-blur-xl">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <PhaseTabs activePhase={activePhase} setActivePhase={selectPhase} />
                <div className="text-xs uppercase tracking-[.18em] text-slate-500">{phaseItems.length} roadmap moves</div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-xs uppercase tracking-[.18em] text-[#91dbda]">{activePhaseCopy.label}</div>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{activePhaseCopy.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{activePhaseCopy.copy}</p>
                  </div>

                  <div className="space-y-3">
                    {phaseItems.map((item) => (
                      <RoadmapCard key={item.id} item={item} active={item.id === activeId} onClick={() => setActiveId(item.id)} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>

            <section className="rounded-xl border border-white/10 bg-[#081112]/86 p-5 shadow-[0_24px_80px_rgba(0,0,0,.34)] backdrop-blur-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="flex flex-col gap-5 border-b border-white/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[.2em] text-slate-500">{activeItem.phase} roadmap card</div>
                      <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white lg:text-4xl">{activeItem.title}</h2>
                    </div>
                    <div className="rounded-lg border border-[#91dbda]/20 bg-[#91dbda]/10 px-4 py-3 text-sm font-semibold text-[#91dbda]">
                      {activeItem.metric}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <FieldCard label="Product Outcome" icon={BarChart3}>{activeItem.outcome}</FieldCard>
                    <FieldCard label="Platform Area" icon={Layers3}>{activeItem.platform}</FieldCard>
                    <FieldCard label="VT Capability" icon={Bot}>{activeItem.capability}</FieldCard>
                    <FieldCard label="Success Signal" icon={CheckCircle2}>{activeItem.success}</FieldCard>
                  </div>

                  <div className="mt-4 rounded-lg border border-[#ff99b6]/20 bg-[#ff99b6]/10 p-5">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[.18em] text-[#ff99b6]">
                      <ClipboardList className="h-4 w-4" />
                      Why this comes next
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-200">{activeItem.why}</p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {['Human review stays in path', 'Insight moves toward action', 'Platform signal improves'].map((item) => (
                      <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-slate-300">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PersonalizationStrategistRoadmap;
