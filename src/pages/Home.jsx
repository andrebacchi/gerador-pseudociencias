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
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
          <span style={{ color: "#facc15" }}>Gerador Supremo</span>
          <br />
          <span className="text-white">de Termos</span>{" "}
          <span style={{ color: "#3b82f6" }}>(Pseudo)Científicos</span>
          <br />
          <span style={{ color: "#ef4444" }}>2.0™</span>
        </h1>
        <p className="mt-4 text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Gere sua pseudociência personalizada com a ajuda do{" "}
          <span className="text-yellow-400 font-semibold">Doutor Charles Latão</span>.
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

      {/* Book promotion */}
      <motion.a
        href="https://a.co/d/0d0edJBO"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 w-full max-w-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-400 transition-colors block group"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <img
          src="https://media.base44.com/images/public/6a511894594db09521a1d76d/386647b1f_image.png"
          alt="Manual Prático do Picareta em Saúde"
          className="w-full h-auto"
        />
        <div className="p-5 text-center">
          <p className="text-white font-bold text-sm uppercase tracking-wide">
            Aprenda a se tornar um picareta em saúde
          </p>
          <span className="mt-2 inline-block text-xs font-bold uppercase tracking-widest text-black px-4 py-2 rounded-lg group-hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #facc15, #f59e0b)" }}>
            📖 Ver o livro
          </span>
        </div>
      </motion.a>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-700 text-xs max-w-sm">
        <p>Baseado no livro-jogo <em>"O Maior Picareta em Saúde"</em> de André D. Bacchi</p>
        <p className="mt-1">Este gerador é uma sátira educativa sobre pseudociências.</p>
      </div>
    </div>
  );
}