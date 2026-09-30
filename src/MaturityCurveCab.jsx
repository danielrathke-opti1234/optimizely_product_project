import React, { useEffect, useState } from "react";

/* ============================================================
   PERSONALIZATION MATURITY CURVE — PRINT / CAB VERSION
   Neutral state: no level selected, no green highlight,
   all dots uniform. Labels haloed so the curve never cuts
   through them. Built for export and presentation.
   ============================================================ */

const C = {
  lf: "#ABFF44",
  grass: "#7DDD3D",
  gtg: "#3AB533",
  fir: "#08251A",
  lightFir: "#197B5D",
  n1: "#FFFFFF",
  n3: "#E4F0DA",
};

const LEVELS = [
  { id: 1, name: "One Size Fits All",        unlocks: "Your baseline",                            x: 70,  y: 340 },
  { id: 2, name: "Rules-Based Targeting",    unlocks: "Relevance you control",                    x: 250, y: 305 },
  { id: 3, name: "Behavioral & Data-Driven", unlocks: "Relevance at a scale you could not staff", x: 440, y: 240 },
  { id: 4, name: "Adaptive & Orchestrated",  unlocks: "Learning instead of guessing",             x: 630, y: 160 },
  { id: 5, name: "Agentic 1:1",              unlocks: "An audience of one",                       x: 810, y: 85  },
];

const PATH = "M 70 340 C 190 337, 240 327, 330 300 S 500 240, 600 188 S 740 112, 872 64";

function Curve({ dark, showTitle }) {
  const bg    = dark ? C.fir : C.n1;
  const ink   = dark ? C.n1 : C.fir;
  const axis  = dark ? `${C.n1}44` : `${C.fir}33`;
  const axLbl = dark ? `${C.n1}99` : `${C.fir}99`;
  const sub   = dark ? `${C.n1}99` : `${C.fir}80`;
  const line  = dark ? C.lf : C.gtg;
  const dot   = dark ? C.n1 : C.gtg;
  const stalk = dark ? `${C.n1}33` : `${C.fir}25`;

  // The background-colored stroke masks the curve anywhere a label overlaps it.
  const halo = { stroke: bg, strokeWidth: 6, strokeLinejoin: "round", paintOrder: "stroke" };

  return (
    <div className="rounded-3xl p-8 md:p-10" style={{ backgroundColor: bg, border: dark ? "none" : `2px solid ${C.fir}` }}>
      {showTitle && (
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: dark ? C.lf : C.lightFir }}>
            The Personalization Maturity Model
          </div>
          <h2 className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl" style={{ color: ink }}>
            Each level removes the constraint that was limiting the one below it
          </h2>
        </div>
      )}

      <div className="overflow-x-auto">
        <svg viewBox="0 0 920 448" className="w-full" style={{ minWidth: 640 }}>
          {/* axes */}
          <line x1="54" y1="34" x2="54" y2="388" stroke={axis} strokeWidth="2" />
          <line x1="54" y1="388" x2="900" y2="388" stroke={axis} strokeWidth="2" />
          <text x="-305" y="26" transform="rotate(-90)" fill={axLbl} fontSize="12" fontWeight="700" letterSpacing="1.5">
            VALUE TO YOUR CUSTOMER
          </text>
          <text x="390" y="428" fill={axLbl} fontSize="12" fontWeight="700" letterSpacing="1.5">
            PERSONALIZATION MATURITY
          </text>

          {/* curve — drawn first so labels sit above it */}
          <path d={PATH} fill="none" stroke={line} strokeWidth="3.5" strokeLinecap="round" />

          {/* points — all uniform, nothing selected */}
          {LEVELS.map((l) => (
            <g key={l.id}>
              <line x1={l.x} y1={l.y - 16} x2={l.x} y2={l.y - 38} stroke={stalk} strokeWidth="1.5" strokeDasharray="3 4" />
              <circle cx={l.x} cy={l.y} r="9" fill={dot} stroke={bg} strokeWidth="3" />

              <text x={l.x} y={l.y - 46} fill={ink} fontSize="13" fontWeight="800" textAnchor="middle" {...halo}>
                {l.unlocks}
              </text>

              <text x={l.x} y={l.y + 33} fill={dark ? `${C.n1}CC` : `${C.fir}CC`} fontSize="12" fontWeight="700" textAnchor="middle" {...halo}>
                {`L${l.id}`}
              </text>

              <text x={l.x} y={l.y + 50} fill={sub} fontSize="11" fontWeight="600" textAnchor="middle" {...halo}>
                {l.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function MaturityCurveCab() {
  const [dark, setDark] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Personalization Maturity Curve | CAB Version";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen w-full px-5 py-10 md:px-10" style={{ backgroundColor: C.n3, fontFamily: "Inter, Arial, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: C.lightFir }}>
            Export version
          </div>
          <h1 className="mt-2 text-2xl font-extrabold md:text-3xl" style={{ color: C.fir }}>
            Maturity curve — neutral state
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: `${C.fir}B0` }}>
            No level selected, uniform dots, no highlight colour. Labels are haloed so the curve cannot cut through
            them at L3 and L4. Use the toggles for a light version that prints cleanly on white, or to drop the title
            if your slide already has one.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { on: dark, set: () => setDark(true), label: "Dark" },
            { on: !dark, set: () => setDark(false), label: "Light — for print" },
          ].map((b) => (
            <button
              key={b.label}
              onClick={b.set}
              className="rounded-full px-5 py-2 text-sm font-bold transition-colors"
              style={{ backgroundColor: b.on ? C.fir : "transparent", color: b.on ? C.lf : C.fir, border: `2px solid ${C.fir}` }}
            >
              {b.label}
            </button>
          ))}
          <button
            onClick={() => setShowTitle(!showTitle)}
            className="rounded-full px-5 py-2 text-sm font-bold transition-colors"
            style={{ backgroundColor: showTitle ? C.fir : "transparent", color: showTitle ? C.lf : C.fir, border: `2px solid ${C.fir}` }}
          >
            {showTitle ? "Title on" : "Title off"}
          </button>
        </div>

        <Curve dark={dark} showTitle={showTitle} />

        <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: C.n1, border: `1px solid ${C.fir}22` }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: C.lightFir }}>
            The five levels, for reference
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {LEVELS.map((l) => (
              <div key={l.id} className="rounded-xl p-3" style={{ backgroundColor: C.n3 }}>
                <div className="text-[11px] font-extrabold" style={{ color: C.lightFir }}>Level {l.id}</div>
                <div className="mt-0.5 text-sm font-extrabold leading-tight" style={{ color: C.fir }}>{l.name}</div>
                <div className="mt-1 text-xs leading-snug" style={{ color: `${C.fir}A0` }}>{l.unlocks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
