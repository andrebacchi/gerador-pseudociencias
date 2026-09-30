import { useState } from "react";
import { motion } from "framer-motion";
import ManualMode from "@/components/ManualMode";
import RouletteMode from "@/components/RouletteMode";

const TABS = [
  { id: "manual", label: "Personalizado" },
  { id: "roleta", label: "Roleta" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("manual");

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 font-body" style={{ background: "#0c0c0e", color: "#e8e4dc" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center mb-4">
          <span className="text-3xl" style={{ filter: "grayscale(0.2)" }}>⛏</span>
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-black leading-tight">
          <span style={{ color: "#c9a96e" }}>Gerador Supremo</span>
          <br />
          <span style={{ color: "#e8e4dc" }}>de Termos</span>{" "}
          <span className="italic font-normal" style={{ color: "#8a8580" }}>(Pseudo)Científicos</span>
          <br />
          <span style={{ color: "#c9a96e" }}>2.0™</span>
        </h1>
        <p className="mt-5 text-sm md:text-base max-w-md mx-auto leading-relaxed italic" style={{ color: "#8a8580" }}>
          Gere sua pseudociência personalizada com a ajuda do{" "}
          <span style={{ color: "#c9a96e" }}>Doutor Charles Latão</span>.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-sm mb-8"
      >
        <div className="flex border-b" style={{ borderColor: "#2a2a2e" }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 pb-3 text-sm font-semibold transition-all duration-200 relative"
              style={{
                color: activeTab === tab.id ? "#c9a96e" : "#6a6560",
              }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#c9a96e" }}
                />
              )}
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
        className="mt-20 w-full max-w-lg grid grid-cols-2 gap-5"
      >
        <a
          href="https://drive.google.com/file/d/1WimewHl-PI3NKJCb_FHszyRCyW_MT2vP/view"
          target="_blank"
          rel="noopener noreferrer"
          className="overflow-hidden block group"
        >
          <div className="overflow-hidden rounded-lg" style={{ background: "#151518" }}>
            <img
              src="https://media.base44.com/images/public/6a511894594db09521a1d76d/d790dc49c_image.png"
              alt="O Maior Picareta em Saúde - Livro-Jogo"
              className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <p className="mt-3 font-heading text-sm font-bold leading-tight" style={{ color: "#e8e4dc" }}>
            O Maior Picareta em Saúde
          </p>
          <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.2em] font-semibold pb-0.5 border-b transition-colors" style={{ color: "#c9a96e", borderColor: "#c9a96e" }}>
            Baixar grátis
          </span>
        </a>

        <a
          href="https://a.co/d/0d0edJBO"
          target="_blank"
          rel="noopener noreferrer"
          className="overflow-hidden block group"
        >
          <div className="overflow-hidden rounded-lg" style={{ background: "#151518" }}>
            <img
              src={`${import.meta.env.BASE_URL}img/livro-manual-picareta.jpg`}
              alt="Manual Prático do Picareta em Saúde"
              className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <p className="mt-3 font-heading text-sm font-bold leading-tight" style={{ color: "#e8e4dc" }}>
            Aprenda a se tornar um picareta
          </p>
          <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.2em] font-semibold pb-0.5 border-b transition-colors" style={{ color: "#c9a96e", borderColor: "#c9a96e" }}>
            Ver o livro
          </span>
        </a>
      </motion.div>

      {/* Author links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 flex flex-col items-center gap-5"
      >
        <a
          href="https://www.instagram.com/bacchi.andre/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#151518", border: "1px solid #2a2a2e" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5" className="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <span className="text-sm font-semibold group-hover:opacity-80 transition-opacity" style={{ color: "#e8e4dc" }}>
            @bacchi.andre
          </span>
        </a>

        <a
          href="https://linktr.ee/bacchi.andre"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.25em] font-semibold pb-1 border-b transition-opacity hover:opacity-70"
          style={{ color: "#c9a96e", borderColor: "#3a3a3e" }}
        >
          Conheça mais sobre André Bacchi
        </a>
      </motion.div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs max-w-sm leading-relaxed" style={{ color: "#5a5550" }}>
        <p>Baseado no livro-jogo <em>"O Maior Picareta em Saúde"</em> de André D. Bacchi</p>
        <p className="mt-1">Este gerador é uma sátira educativa sobre pseudociências.</p>
      </div>
    </div>
  );
}