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

      {/* Books promotion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 w-full max-w-lg grid grid-cols-2 gap-4"
      >
        {/* Livro-jogo (grátis) */}
        <a
          href="https://drive.google.com/file/d/1WimewHl-PI3NKJCb_FHszyRCyW_MT2vP/view"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl overflow-hidden border border-gray-700 hover:border-green-400 transition-colors block group"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <img
            src="https://media.base44.com/images/public/6a511894594db09521a1d76d/d790dc49c_image.png"
            alt="O Maior Picareta em Saúde - Livro-Jogo"
            className="w-full h-auto"
          />
          <div className="p-4 text-center">
            <p className="text-white font-bold text-xs uppercase tracking-wide leading-tight">
              O Maior Picareta em Saúde
            </p>
            <span className="mt-2 inline-block text-xs font-black uppercase tracking-widest text-black px-4 py-2 rounded-lg group-hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
              ⬇ Baixar Grátis
            </span>
          </div>
        </a>

        {/* Manual prático */}
        <a
          href="https://a.co/d/0d0edJBO"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-400 transition-colors block group"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <img
            src="https://media.base44.com/images/public/6a511894594db09521a1d76d/386647b1f_image.png"
            alt="Manual Prático do Picareta em Saúde"
            className="w-full h-auto"
          />
          <div className="p-4 text-center">
            <p className="text-white font-bold text-xs uppercase tracking-wide leading-tight">
              Aprenda a se tornar um picareta
            </p>
            <span className="mt-2 inline-block text-xs font-bold uppercase tracking-widest text-black px-4 py-2 rounded-lg group-hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #facc15, #f59e0b)" }}>
              📖 Ver o livro
            </span>
          </div>
        </a>
      </motion.div>

      {/* Instagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10"
      >
        <a
          href="https://www.instagram.com/bacchi.andre/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors">
            @bacchi.andre
          </span>
        </a>
      </motion.div>

      {/* Linktree - destaque */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <a
          href="https://linktr.ee/bacchi.andre"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-black font-black uppercase tracking-widest text-sm px-6 py-3 rounded-xl group-hover:scale-105 transition-transform"
          style={{ background: "linear-gradient(135deg, #43d854, #34a853)" }}
        >
          🔗 Conheça mais sobre André Bacchi
        </a>
      </motion.div>

      {/* Footer */}
      <div className="mt-10 text-center text-gray-700 text-xs max-w-sm">
        <p>Baseado no livro-jogo <em>"O Maior Picareta em Saúde"</em> de André D. Bacchi</p>
        <p className="mt-1">Este gerador é uma sátira educativa sobre pseudociências.</p>
      </div>
    </div>
  );
}