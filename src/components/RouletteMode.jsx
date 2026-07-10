import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PREFIXOS, RADICAIS, SUFIXOS, COMPLEMENTOS, SLOGANS } from "@/lib/pseudocienciaData";
import RouletteReel from "./RouletteReel";
import ShareButton from "./ShareButton";

const REELS = [
  { key: "prefixo", label: "Prefixo", options: PREFIXOS, accentColor: "#3b82f6", delay: 0, duration: 2.0 },
  { key: "radical", label: "Radical", options: RADICAIS, accentColor: "#a855f7", delay: 0.2, duration: 2.4 },
  { key: "sufixo", label: "Sufixo", options: SUFIXOS, accentColor: "#22c55e", delay: 0.4, duration: 2.8 },
  { key: "complemento", label: "Complemento", options: COMPLEMENTOS, accentColor: "#f97316", delay: 0.6, duration: 3.2 },
];

export default function RouletteMode() {
  const [spinKey, setSpinKey] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [finals, setFinals] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const cardRef = useRef(null);

  const maxFinish = Math.max(...REELS.map((r) => r.delay + r.duration));

  const handleSpin = () => {
    const picks = {
      prefixo: Math.floor(Math.random() * PREFIXOS.length),
      radical: Math.floor(Math.random() * RADICAIS.length),
      sufixo: Math.floor(Math.random() * SUFIXOS.length),
      complemento: Math.floor(Math.random() * COMPLEMENTOS.length),
      slogan: Math.floor(Math.random() * SLOGANS.length),
    };
    setFinals(picks);
    setShowResult(false);
    setSpinning(true);
    setSpinKey((k) => k + 1);
    setTimeout(() => {
      setSpinning(false);
      setShowResult(true);
    }, maxFinish * 1000 + 300);
  };

  const nomeFinal = finals
    ? `${PREFIXOS[finals.prefixo]}${RADICAIS[finals.radical]}${SUFIXOS[finals.sufixo]} ${COMPLEMENTOS[finals.complemento]}`
    : "";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="rounded-2xl border border-gray-700 p-6 md:p-8" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)" }}>
          {/* Reels - vertical slot machines */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {REELS.map((reel) => (
              <div key={reel.key} className="flex flex-col items-center gap-2">
                <RouletteReel
                  options={reel.options}
                  spinKey={spinKey}
                  finalIndex={finals ? finals[reel.key] : 0}
                  delay={reel.delay}
                  duration={reel.duration}
                  accentColor={reel.accentColor}
                />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: reel.accentColor }}
                >
                  {reel.label}
                </span>
              </div>
            ))}
          </div>

          {/* Spin button */}
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-black text-sm"
            style={{ background: spinning ? "#6b7280" : "linear-gradient(135deg, #facc15, #f59e0b)" }}
          >
            {spinning ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Girando a roleta do destino...
              </span>
            ) : spinKey === 0 ? (
              "🎲 Girar a roleta 🎲"
            ) : (
              "🔄 Girar novamente 🔄"
            )}
          </button>
        </div>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {showResult && finals && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-lg mt-8"
          >
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm uppercase tracking-widest">🎺 A roleta do destino decidiu:</p>
            </div>
            <div ref={cardRef} className="relative rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-2xl" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d1a3a 100%)" }}>
              <div className="bg-yellow-400 text-black text-center py-2 px-4 font-black uppercase tracking-widest text-xs">
                ⭐ A sua nova pseudociência é: ⭐
              </div>
              <div className="p-6 md:p-8 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-black leading-tight mb-5"
                  style={{ color: "#facc15" }}
                >
                  {nomeFinal}
                </motion.h2>
                <div className="border-t border-gray-700 my-5" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black bg-opacity-40 rounded-xl p-4"
                >
                  <div className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">📢 Slogan oficial</div>
                  <p className="text-white font-semibold text-base md:text-lg italic leading-relaxed">"{SLOGANS[finals.slogan]}"</p>
                </motion.div>
              </div>
              <div className="bg-blue-900 text-blue-200 text-center py-2 px-4 text-xs font-semibold">
                ⚠️ Conteúdo satírico • Baseado no livro-jogo de André D. Bacchi
              </div>
            </div>
            <div className="mt-4">
              <ShareButton targetRef={cardRef} caption={`A roleta do destino me deu: ${nomeFinal}! Gere a sua pseudociência no Gerador Supremo do Dr. Latão 2.0™ → https://geradorpseudociencia.base44.app/`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}