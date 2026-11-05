/**
 * ResearchPanel - Tryb Badawczy
 *
 * Fullscreen modal dokumentujący metodologię spatialModel.
 *
 *
 * Integracja:
 * - Store: useSightingsStore().showResearchPanel
 * - Toggle: useSightingsStore().toggleResearchPanel()
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSightingsStore } from "../../stores/sightingsStore";
import DocsTab from "./tabs/DocsTab";
import PipelineTab from "./tabs/PipelineTab";
import CodeTab from "./tabs/CodeTab";
import LiteratureTab from "./tabs/LiteratureTab";

const SHOW_LITERATURE_TAB = true;

const TABS = [
  { id: "pipeline", label: "Konfiguracja", icon: "⚙️" },
  { id: "docs", label: "Dokumentacja", icon: "📚" },
  { id: "code", label: "Kod", icon: "💻" },
  ...(SHOW_LITERATURE_TAB ? [{ id: "literature", label: "Literatura", icon: "📖" }] : []),
];

const ResearchPanel = () => {
  const { showResearchPanel, toggleResearchPanel } = useSightingsStore();
  const [activeTab, setActiveTab] = useState("pipeline");

  // Nie renderuj jeśli panel zamknięty
  if (!showResearchPanel) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col text-slate-100
                   bg-[#0b1120]
                   bg-[radial-gradient(900px_circle_at_15%_-10%,rgba(56,189,248,0.10),transparent_55%),radial-gradient(700px_circle_at_100%_0%,rgba(16,185,129,0.08),transparent_50%)]"
      >
        {/* HEADER */}
        <header className="relative flex items-center justify-between px-7 py-4
                           bg-slate-900/70 backdrop-blur-xl
                           border-b border-white/5
                           shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-4">
            <span className="grid place-items-center h-11 w-11 rounded-xl text-xl
                             bg-slate-800/80 ring-1 ring-inset ring-white/10
                             shadow-inner shadow-black/40">
              🔬
            </span>
            <div className="flex items-baseline gap-3 leading-tight">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                Tryb Badawczy
              </h1>
              <span className="text-sm text-slate-500">spatialModel</span>
            </div>
          </div>

          <button
            data-qa="research.panel-close"
            onClick={toggleResearchPanel}
            className="grid place-items-center h-9 w-9 rounded-lg text-xl text-slate-400
                       ring-1 ring-inset ring-white/10 bg-slate-800/40
                       hover:text-white hover:bg-slate-700/60 hover:ring-white/20
                       transition-colors"
            aria-label="Zamknij panel badawczy"
          >
            ✕
          </button>

          {/* akcentowa linia pod nagłówkiem */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px
                           bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
        </header>

        {/* TABS NAVIGATION — segmentowany pasek */}
        <nav className="flex gap-1 px-6 py-3 bg-transparent">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                data-qa={`research.tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 rounded-lg px-4 py-2
                            text-sm font-medium transition-all
                            ${
                              active
                                ? "bg-slate-800/90 text-white ring-1 ring-inset ring-white/10 shadow-lg shadow-black/30"
                                : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                            }`}
              >
                <span className={active ? "opacity-100" : "opacity-70"}>{tab.icon}</span>
                <span>{tab.label}</span>
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full
                                   bg-gradient-to-r from-sky-400 to-emerald-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CONTENT AREA — osadzona ramka */}
        <main className="flex-1 overflow-hidden px-6 pb-6">
          <div className="h-full overflow-auto rounded-2xl p-6
                          bg-slate-900/40 ring-1 ring-inset ring-white/5
                          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
            {activeTab === "pipeline" && <PipelineTab />}
            {activeTab === "docs" && <DocsTab />}
            {activeTab === "code" && <CodeTab />}
            {activeTab === "literature" && <LiteratureTab />}
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResearchPanel;
