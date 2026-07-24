export const agents = [
  {
    id: 'roi',
    name: 'ROI Agent',
    tag: 'Value realization',
    status: 'Prototype ready',
    problem: 'Customers struggle to quantify experimentation value and communicate ROI in a way executives trust.',
    insight: 'The product gap is not only calculation. Teams need confidence, assumption transparency, and a story that connects experiment evidence to business outcomes.',
    solution: 'An AI-assisted ROI framework that turns experiment evidence, business assumptions, and rollout scenarios into executive-ready value narratives.',
    capabilities: [
      'Positive gain and loss avoided modeling',
      'Conservative rollout factor',
      'RPV, AOV, dollar-per-lead, and dollar-per-click support',
      'Portfolio and experiment-level value attribution',
      'Assumption transparency and caveats',
    ],
    skills: ['Customer problem discovery', 'Value modeling', 'AI workflow design', 'Executive communication', 'Decision-support design'],
    metric: 'Value clarity',
    color: 'mint',
  },
  {
    id: 'health',
    name: 'Program Health Dashboard Agent',
    tag: 'Portfolio intelligence',
    status: 'Dashboard concept',
    problem: 'Experimentation teams lack a clear view of program health, portfolio performance, and next-best actions.',
    insight: 'Leaders do not need another activity table. They need a decision surface that shows where momentum, evidence, risk, and follow-up are breaking down.',
    solution: 'An agent-driven dashboard concept that summarizes running, paused, concluded, and archived experiments with actionable recommendations.',
    capabilities: [
      'Program inventory synthesis',
      'Health signals by state and outcome',
      'Recommendation queue',
      'Portfolio-level reporting',
      'Decision support for program leads',
    ],
    skills: ['Analytics product thinking', 'Workflow design', 'Reporting systems', 'Decision-support design', 'AI-assisted reporting'],
    metric: 'Next-best action',
    color: 'sky',
  },
  {
    id: 'gap',
    name: 'Experimentation Gap Analysis Agent',
    tag: 'Strategy intelligence',
    status: 'Schema concept',
    problem: 'Experimentation teams often lack visibility into coverage gaps, metric gaps, evidence quality issues, and roadmap blind spots.',
    insight: 'The highest-value product question is often not “what won?” It is “what are we not learning, and what should we do next?”',
    solution: 'An agent that analyzes experimentation context data and produces a strategic Gap Analysis Report.',
    capabilities: [
      'Coverage gap detection',
      'Metric and evidence quality assessment',
      'Roadmap blind spot analysis',
      'Prioritized action plan',
      'HTML Canvas strategic report output',
    ],
    skills: [
      'Customer problem discovery',
      'Analytics product thinking',
      'Evidence quality assessment',
      'Roadmap strategy',
      'Decision-support design',
      'AI-assisted reporting',
    ],
    metric: 'Learning coverage',
    color: 'coral',
  },
  {
    id: 'personalization',
    name: 'Personalization Maturity / Adoption Prototype',
    tag: 'Featured concept',
    status: 'Case study',
    problem: 'Customers often struggle to know where to start with personalization and how platform capabilities connect into a maturity journey.',
    insight: 'Personalization adoption improves when teams can see a sequence of capabilities, readiness signals, blockers, and next moves instead of a disconnected feature list.',
    solution: 'An interactive maturity and adoption journey that maps CMS Personalization, Web Experimentation, Real Time Segmentation, Behavior Targeting, ODP, Opal, and CMAB into a clear progression.',
    capabilities: [
      'Maturity scoring',
      'Capability sequencing',
      'Adoption blockers',
      'AI-assisted next moves',
      'Cross-platform roadmap framing',
    ],
    skills: ['Product strategy', 'Adoption design', 'AI personalization', 'Prototype development', 'Customer problem discovery'],
    metric: 'Maturity lift',
    color: 'gold',
  },
];

export const journeys = [
  {
    stage: 'Customer Signal',
    learned: 'Enterprise teams reveal product opportunities through repeated moments of confusion, manual work, and decision friction.',
    built: 'Signal maps for ROI, program health, gap analysis, and personalization adoption.',
    skill: 'Customer problem discovery',
  },
  {
    stage: 'Pattern Recognition',
    learned: 'The same pain point becomes product-relevant when it appears across roles, workflows, and maturity levels.',
    built: 'Patterns around missing evidence, unclear metrics, adoption blockers, and executive reporting pressure.',
    skill: 'Analytics product thinking',
  },
  {
    stage: 'Agent Workflow',
    learned: 'Agents work best when they have bounded inputs, clear decision layers, and outputs that help users act.',
    built: 'Sanitized agent schemas with parameters, tool assumptions, report outputs, and guardrails.',
    skill: 'AI workflow design',
  },
  {
    stage: 'Product Concept',
    learned: 'A concept gets stronger when it includes the customer problem, workflow, prioritization logic, prototype, and validation plan.',
    built: 'Featured concepts for personalization maturity, experimentation workflows, and value realization.',
    skill: 'Product strategy',
  },
  {
    stage: 'Validation Loop',
    learned: 'The PM motion is turning a promising concept into measurable learning with stakeholder feedback and crisp tradeoffs.',
    built: 'Case-study flows that move from problem to insight, product opportunity, prototype, and validation.',
    skill: 'Decision-support design',
  },
];

export const concepts = [
  {
    id: 'personalization-concept',
    title: 'Personalization Maturity & Adoption Journey',
    label: 'Featured product concept',
    focus: 'Translate customer adoption challenges into a guided maturity path for personalization capabilities.',
    opportunity: 'Turn disconnected platform features into a sequenced adoption experience with readiness signals and recommended next moves.',
    prototype: 'Interactive maturity assessment that maps CMS Personalization, Web Experimentation, audience conditions, behavior targeting, RTS, ODP, Opal, and CMAB.',
    validation: 'Test whether customers can identify their current stage, understand the next capability to activate, and explain the business reason for moving forward.',
    cta: 'Explore Personalization Prototype',
    questions: ['Which maturity signals predict adoption?', 'Where should Opal assist versus automate?', 'What guidance belongs in-product?'],
    skills: ['Product strategy', 'Adoption design', 'AI personalization', 'Prototype development'],
  },
  {
    id: 'opal-workflows',
    title: 'Opal-Powered Experimentation Workflows',
    label: 'Agent workflow concept',
    focus: 'Support ideation, prioritization, build guidance, result interpretation, ROI reporting, and program health.',
    opportunity: 'Reduce experiment cycle friction by adding AI support at each decision point.',
    prototype: 'Workflow command center with agent recommendations, evidence checks, and handoff states.',
    validation: 'Measure whether AI guidance reduces cycle time, improves brief quality, and increases confidence in next-best actions.',
    cta: 'View Workflow Concept',
    questions: ['Which workflow steps have the highest delay?', 'How should teams trust AI recommendations?', 'What signals should trigger follow-up?'],
    skills: ['AI workflow design', 'Workflow design', 'Experimentation strategy', 'Decision-support design'],
  },
  {
    id: 'value-platform',
    title: 'Value Realization Platform',
    label: 'Measurement concept',
    focus: 'Make experimentation ROI standardized, explainable, and executive-ready.',
    opportunity: 'Move value reporting from bespoke analysis into a repeatable product surface.',
    prototype: 'Value model builder with assumptions, confidence levels, executive summaries, and board-ready exports.',
    validation: 'Assess whether leaders trust the assumptions, understand uncertainty, and reuse the report across planning conversations.',
    cta: 'Inspect Value Model',
    questions: ['What assumptions are required?', 'How conservative should defaults be?', 'How should uncertainty be shown?'],
    skills: ['Value modeling', 'Executive communication', 'Product analytics', 'AI-assisted reporting'],
  },
];

export const framework = [
  ['Customer Signal', 'Capture repeated pain from customer calls, support requests, adoption gaps, and executive asks.'],
  ['Pattern Recognition', 'Group signals by workflow, persona, business impact, and product capability.'],
  ['Product Opportunity', 'Translate the pattern into a clear user problem and product bet.'],
  ['Prototype', 'Build a small interactive artifact that makes the future workflow tangible.'],
  ['Validation', 'Pressure-test with users, PMs, field teams, and measurable success criteria.'],
  ['Scale', 'Package the concept into reusable workflows, requirements, and roadmap-ready options.'],
];

export const skillHeatmap = [
  { skill: 'Customer problem discovery', level: 96, agents: ['roi', 'gap', 'personalization'] },
  { skill: 'Analytics product thinking', level: 90, agents: ['health', 'gap'] },
  { skill: 'Decision-support design', level: 92, agents: ['roi', 'health', 'gap'] },
  { skill: 'AI-assisted reporting', level: 86, agents: ['health', 'gap'] },
  { skill: 'Roadmap strategy', level: 82, agents: ['gap', 'personalization'] },
  { skill: 'Prototype development', level: 80, agents: ['personalization'] },
  { skill: 'Executive communication', level: 88, agents: ['roi'] },
  { skill: 'Evidence quality assessment', level: 84, agents: ['gap'] },
];

export const jsonExamples = {
  roi: {
    schema_version: 'sanitized-1.0',
    agent_type: 'decision_support_agent',
    name: 'ROI Agent',
    description: 'Models experiment and program value using bounded business assumptions.',
    parameters: [
      { name: 'business_value_model', type: 'enum', options: ['RPV', 'AOV', 'Dollar per Lead', 'Dollar per Click'] },
      { name: 'conservative_rollout_factor', type: 'percentage', default: 25 },
      { name: 'metric_focus', type: 'string', required: true },
    ],
    tools: ['experiment_summary_lookup', 'metric_context_reader', 'value_model_calculator'],
    workflow: ['collect_inputs', 'classify_value_unit', 'model_positive_gain', 'model_loss_avoided', 'generate_executive_summary'],
    output: {
      type: 'dashboard_report',
      sections: ['value_cards', 'top_drivers', 'assumptions', 'caveats', 'next_actions'],
    },
    guardrails: ['no_customer_data', 'show_assumptions', 'separate_observed_and_modeled_value'],
  },
  health: {
    schema_version: 'sanitized-1.0',
    agent_type: 'portfolio_review_agent',
    name: 'Program Health Dashboard Agent',
    description: 'Summarizes experimentation portfolio health and recommends next actions.',
    parameters: [
      { name: 'timeframe_months', type: 'number', default: 6 },
      { name: 'program_scope', type: 'enum', options: ['active', 'completed', 'all'] },
    ],
    tools: ['experiment_inventory_reader', 'status_classifier', 'recommendation_ranker'],
    workflow: ['inventory_experiments', 'classify_status', 'score_health_signals', 'rank_recommendations'],
    output: {
      type: 'program_health_dashboard',
      sections: ['portfolio_snapshot', 'health_signals', 'risk_flags', 'recommended_actions'],
    },
    guardrails: ['sanitized_results', 'recommendations_include_rationale', 'no_raw_customer_records'],
  },
  gap: {
    schema_version: 'sanitized-1.0',
    agent_type: 'strategic_gap_analysis_agent',
    name: 'Experimentation Gap Analysis Agent',
    description: 'Analyzes experimentation context and generates a strategic Gap Analysis Report.',
    parameters: [
      { name: 'analysis_scope', type: 'enum', options: ['portfolio', 'roadmap_theme', 'journey_stage'], required: true },
      { name: 'timeframe', type: 'date_range', required: true },
      { name: 'business_goal', type: 'string', required: true },
      { name: 'evidence_threshold', type: 'enum', options: ['directional', 'decision-grade', 'executive-ready'], default: 'decision-grade' },
    ],
    tools: [
      'experiment_inventory_reader',
      'metric_taxonomy_mapper',
      'evidence_quality_scorer',
      'roadmap_theme_classifier',
      'html_canvas_renderer',
    ],
    gap_analysis_layers: [
      { layer: 'coverage_gaps', evaluates: ['audience', 'journey_stage', 'funnel_area', 'roadmap_theme'] },
      { layer: 'metric_gaps', evaluates: ['primary_metric_quality', 'business_metric_linkage', 'missing_guardrails'] },
      { layer: 'evidence_quality', evaluates: ['sample_depth', 'result_confidence', 'decision_readiness', 'stale_learning'] },
      { layer: 'roadmap_blind_spots', evaluates: ['untested_assumptions', 'over-invested_themes', 'under-supported_opportunities'] },
    ],
    prioritization_logic: {
      scoring_inputs: ['customer_impact', 'evidence_risk', 'strategic_relevance', 'effort_to_validate'],
      ranking_model: 'impact_weighted_gap_score',
      output_levels: ['critical', 'high', 'monitor'],
    },
    output: {
      type: 'html_canvas_gap_analysis_report',
      sections: ['executive_snapshot', 'gap_map', 'evidence_quality_matrix', 'prioritized_actions', 'roadmap_implications'],
    },
    guardrails: ['sanitized_context_only', 'no_customer_identifiers', 'recommendations_include_rationale'],
  },
  personalization: {
    schema_version: 'sanitized-1.0',
    agent_type: 'maturity_guidance_agent',
    name: 'Personalization Maturity / Adoption Prototype',
    description: 'Maps current personalization readiness to next-best platform capabilities.',
    parameters: [
      { name: 'current_stage', type: 'enum', options: ['foundation', 'segmentation', 'orchestration', 'adaptive'] },
      { name: 'available_capabilities', type: 'array' },
      { name: 'primary_goal', type: 'string' },
    ],
    tools: ['capability_mapper', 'readiness_scorer', 'adoption_plan_generator'],
    workflow: ['score_readiness', 'identify_blockers', 'map_capabilities', 'recommend_next_stage'],
    output: {
      type: 'maturity_roadmap',
      sections: ['readiness_score', 'capability_map', 'next_moves', 'validation_plan'],
    },
    guardrails: ['recommend_sequence_not_shortcuts', 'explain_tradeoffs', 'no_customer_identifiers'],
  },
};

export const annotations = {
  roi: [
    ['Parameters', 'Keeps business assumptions explicit so ROI does not look like a black-box answer.'],
    ['Tools', 'Separates evidence retrieval from value modeling, which makes the workflow easier to trust.'],
    ['Output', 'Optimized for executive decision-making with assumptions and caveats visible.'],
  ],
  health: [
    ['Parameters', 'A small scope keeps the agent focused on a usable program health view.'],
    ['Tools', 'Inventory and status classification become the backbone for decision support.'],
    ['Output', 'The dashboard emphasizes next actions instead of passive reporting.'],
  ],
  gap: [
    ['Parameters', 'Scope, timeframe, business goal, and evidence threshold frame the analysis before any recommendations are generated.'],
    ['Tools', 'The tool set mirrors a PM analysis workflow: inventory, taxonomy, evidence scoring, roadmap classification, and canvas rendering.'],
    ['Gap analysis layers', 'Coverage, metric, evidence quality, and roadmap blind-spot layers keep the report strategic instead of just descriptive.'],
    ['Prioritization logic', 'Impact-weighted scoring turns many possible gaps into a ranked decision queue.'],
    ['HTML Canvas output', 'The final report is designed as a shareable product artifact for ELT and roadmap discussions.'],
  ],
  personalization: [
    ['Parameters', 'Current stage and available capabilities keep the recommendations grounded in adoption reality.'],
    ['Workflow', 'Readiness scoring comes before next-step guidance so the concept does not jump to advanced features too early.'],
    ['Output', 'The roadmap format positions personalization maturity as one product case study, not the whole portfolio.'],
  ],
};

export const customerSignals = [
  {
    id: 'roi-proof',
    quote: "We can't prove ROI.",
    problem: 'Experimentation teams need a credible way to connect results to business value.',
    pattern: 'Value realization keeps showing up when teams try to expand experimentation investment.',
    impact: 'Without clear value language, teams struggle to earn executive confidence and budget.',
    patternId: 'value',
  },
  {
    id: 'next-test',
    quote: "We don't know what to test next.",
    problem: 'Teams have activity, but not always a strategic learning roadmap.',
    pattern: 'Backlogs often contain ideas without evidence quality, coverage, or prioritization logic.',
    impact: 'Programs lose momentum when the next decision is unclear.',
    patternId: 'intelligence',
  },
  {
    id: 'visibility',
    quote: 'Our experimentation program lacks visibility.',
    problem: 'Leaders need a portfolio-level readout of health, blockers, and recommended actions.',
    pattern: 'The same program questions appear across customer conversations: what is running, what learned, what needs attention.',
    impact: 'Teams spend time rebuilding status narratives instead of improving the program.',
    patternId: 'visibility',
  },
  {
    id: 'ai-start',
    quote: "We want AI but don't know where to start.",
    problem: 'Customers want practical AI workflows, not abstract AI possibility.',
    pattern: 'AI adoption becomes easier when workflows, inputs, guardrails, and outputs are made explicit.',
    impact: 'Without a concrete operating model, AI interest does not become useful adoption.',
    patternId: 'agent',
  },
  {
    id: 'personalization',
    quote: 'We struggle with personalization adoption.',
    problem: 'Teams do not always know how personalization capabilities connect into a maturity path.',
    pattern: 'Adoption gaps often come from unclear sequencing, missing readiness signals, and disconnected platform features.',
    impact: 'Personalization remains aspirational instead of operational.',
    patternId: 'adoption',
  },
];

export const patterns = [
  {
    id: 'value',
    name: 'Value Realization',
    evidence: 'Multiple teams needed help translating experiment outcomes into business language.',
    importance: 'Value clarity is often the bridge between experimentation teams and executive sponsors.',
    gap: 'Existing result views rarely explain assumptions, rollout, caveats, and business impact together.',
  },
  {
    id: 'visibility',
    name: 'Program Visibility',
    evidence: 'Customers asked for easier ways to understand what was running, paused, concluded, and worth acting on.',
    importance: 'Program leaders need a health model, not a spreadsheet of activity.',
    gap: 'Status reporting often lacks prioritization and next-best-action logic.',
  },
  {
    id: 'intelligence',
    name: 'Experimentation Intelligence',
    evidence: 'Teams needed to understand coverage gaps, metric gaps, evidence quality, and roadmap blind spots.',
    importance: 'The next test should be guided by what the organization still needs to learn.',
    gap: 'Most tools summarize known results but do not reveal the missing learning agenda.',
  },
  {
    id: 'adoption',
    name: 'Personalization Adoption',
    evidence: 'Teams wanted personalization but struggled to sequence capabilities and readiness.',
    importance: 'Adoption requires a path from foundational targeting to AI-assisted adaptive experiences.',
    gap: 'Feature lists do not help customers understand maturity, blockers, or next actions.',
  },
  {
    id: 'agent',
    name: 'AI Agent Creation',
    evidence: 'Non-technical teams needed a repeatable way to turn domain expertise into useful AI agents.',
    importance: 'Agent creation becomes scalable when framed as a workflow system, not prompt writing.',
    gap: 'People needed structure: context, logic, execution, artifacts, and refinement.',
  },
];

export const artifacts = [
  { id: 'roi', name: 'ROI Agent', type: 'AI agent', agentId: 'roi' },
  { id: 'health', name: 'Program Health Agent', type: 'AI agent', agentId: 'health' },
  { id: 'gap', name: 'Experimentation Gap Analysis Agent', type: 'AI agent', agentId: 'gap' },
  { id: 'clear', name: 'CLEAR Framework', type: 'Agent creation system' },
  { id: 'personalization', name: 'Personalization Adoption Prototype', type: 'Product concept', agentId: 'personalization' },
];

export const clearStages = [
  {
    letter: 'C',
    name: 'Context',
    question: 'What problem are you solving, and who experiences it?',
    output: 'Business problem, user, workflow moment, success definition',
  },
  {
    letter: 'L',
    name: 'Logic',
    question: 'What decisions should the agent make, and what rules guide those decisions?',
    output: 'Decision tree, prioritization logic, assumptions, guardrails',
  },
  {
    letter: 'E',
    name: 'Execution',
    question: 'What inputs, tools, and steps does the agent need to perform the work?',
    output: 'Workflow steps, tool calls, data requirements, fallback paths',
  },
  {
    letter: 'A',
    name: 'Artifacts',
    question: 'What should the user receive at the end?',
    output: 'Agent blueprint, report, JSON schema, canvas output, next actions',
  },
  {
    letter: 'R',
    name: 'Refinement',
    question: 'How will users test, improve, and trust the agent?',
    output: 'Evaluation criteria, iteration notes, adoption plan, confidence checks',
  },
];

export const architectureFlow = [
  ['Inputs', 'Bounded parameters, customer context, timeframe, business goal'],
  ['Decision Logic', 'Classification, scoring, prioritization, evidence thresholds'],
  ['Tools', 'Inventory readers, metric mappers, quality scorers, report renderers'],
  ['Outputs', 'Strategic report, roadmap guidance, assumptions, next actions'],
  ['Business Outcomes', 'Better prioritization, clearer executive narrative, faster product decisions'],
];
