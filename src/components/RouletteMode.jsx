import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PREFIXOS, RADICAIS, SUFIXOS, COMPLEMENTOS, SLOGANS } from "@/lib/pseudocienciaData";
import RouletteReel from "./RouletteReel";
import ShareButton from "./ShareButton";

const REELS = [
  { key: "prefixo", label: "Prefixo", options: PREFIXOS, delay: 0, duration: 2.0 },
  { key: "radical", label: "Radical", options: RADICAIS, delay: 0.2, duration: 2.4 },
  { key: "sufixo", label: "Sufixo", options: SUFIXOS, delay: 0.4, duration: 2.8 },
  { key: "complemento", label: "Complemento", options: COMPLEMENTOS, delay: 0.6, duration: 3.2 },
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
        <div className="rounded-xl p-6 md:p-8" style={{ background: "#151518", border: "1px solid #2a2a2e" }}>
          {/* Reels */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {REELS.map((reel) => (
              <div key={reel.key} className="flex flex-col items-center gap-2">
                <RouletteReel
                  options={reel.options}
                  spinKey={spinKey}
                  finalIndex={finals ? finals[reel.key] : 0}
                  delay={reel.delay}
                  duration={reel.duration}
                />
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#6a6560" }}>
                  {reel.label}
                </span>
              </div>
            ))}
          </div>

          {/* Spin button */}
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full py-4 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-bold"
            style={{
              background: spinning ? "#2a2a2e" : "#c9a96e",
              color: spinning ? "#6a6560" : "#0c0c0e",
            }}
          >
            {spinning ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Girando a roleta do destino...
              </span>
            ) : spinKey === 0 ? (
              "Girar a roleta"
            ) : (
              "Girar novamente"
            )}
          </button>
        </div>
      </motion.div>

      {/* Result */}
      <AnimatePresence>
        {showResult && finals && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-lg mt-8"
          >
            <div className="text-center mb-4">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#6a6560" }}>A roleta do destino decidiu</p>
            </div>
            <div ref={cardRef} className="relative rounded-xl overflow-hidden" style={{ background: "#0c0c0e", border: "1px solid #3a3a3e" }}>
              <div className="text-center py-3 px-4 text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ background: "#c9a96e", color: "#0c0c0e" }}>
                A sua nova pseudociência é
              </div>
              <div className="p-6 md:p-8 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-heading text-3xl md:text-4xl font-black leading-tight mb-5"
                  style={{ color: "#c9a96e" }}
                >
                  {nomeFinal}
                </motion.h2>
                <div className="my-5" style={{ borderTop: "1px solid #2a2a2e" }} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-lg p-4"
                  style={{ background: "#151518" }}
                >
                  <div className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "#6a6560" }}>Slogan oficial</div>
                  <p className="font-heading italic text-base md:text-lg leading-relaxed" style={{ color: "#e8e4dc" }}>"{SLOGANS[finals.slogan]}"</p>
                </motion.div>
              </div>
              <div className="text-center py-2.5 px-4 text-[10px] font-medium" style={{ background: "#151518", color: "#6a6560", borderTop: "1px solid #2a2a2e" }}>
                Conteúdo satírico · Baseado no livro-jogo de André D. Bacchi
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