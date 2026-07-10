import { useState } from "react";
import { motion } from "framer-motion";
import ManualMode from "@/components/ManualMode";
import RouletteMode from "@/components/RouletteMode";

const TABS = [
  { id: "manual", label: "Modo Personalizado", icon: "🎯" },
  { id: "roleta", label: "Modo Roleta", icon: "🎲" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("manual");

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center px-4 py-10"
      style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <div className="flex justify-center mb-3">
          <span className="text-5xl">⚗️</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
          <span className="text-white">O Maior</span> <span style={{ color: "#3b82f6" }}>Picareta</span>
          <br />
          <span style={{ color: "#facc15" }}>em Saúde</span>
        </h1>
        <p className="mt-4 text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Gere sua pseudociência personalizada com o <span className="text-blue-400 font-semibold">Gerador Supremo do Dr. Latão 2.0™</span>
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md mb-8"
      >
        <div className="flex gap-2 p-1.5 rounded-2xl border border-gray-700" style={{ background: "rgba(255,255,255,0.04)" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200"
              style={
                activeTab === tab.id
                  ? { background: "linear-gradient(135deg, #facc15, #f59e0b)", color: "#000" }
                  : { color: "#9ca3af" }
              }
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Active mode */}
      {activeTab === "manual" ? <ManualMode /> : <RouletteMode />}

      {/* Footer */}
      <div className="mt-16 text-center text-gray-700 text-xs max-w-sm">
        <p>Baseado no livro-jogo <em>"O Maior Picareta em Saúde"</em> de André D. Bacchi</p>
        <p className="mt-1">Este gerador é uma sátira educativa sobre pseudociências.</p>
      </div>
    </div>
  );
}