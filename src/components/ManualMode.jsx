import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePseudociencia } from "@/lib/pseudocienciaData";
import ShareButton from "./ShareButton";

export default function ManualMode() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  const handleGerar = () => {
    if (!nome.trim() || !dataNascimento) return;
    setLoading(true);
    setResultado(null);
    setTimeout(() => {
      setResultado(generatePseudociencia(nome, dataNascimento));
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="rounded-xl p-6 md:p-8" style={{ background: "#151518", border: "1px solid #2a2a2e" }}>
          <div className="mb-5">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "#8a8580" }}>
              Seu nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full rounded-lg px-4 py-3 text-sm transition-colors focus:outline-none"
              style={{ background: "#0c0c0e", border: "1px solid #2a2a2e", color: "#e8e4dc" }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a96e")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2e")}
              onKeyDown={(e) => e.key === "Enter" && handleGerar()}
            />
          </div>
          <div className="mb-6">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "#8a8580" }}>
              Data de nascimento
            </label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full rounded-lg px-4 py-3 text-sm transition-colors focus:outline-none"
              style={{ background: "#0c0c0e", border: "1px solid #2a2a2e", color: "#e8e4dc", colorScheme: "dark" }}
              onFocus={(e) => (e.target.style.borderColor = "#c9a96e")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2e")}
            />
          </div>
          <button
            onClick={handleGerar}
            disabled={!nome.trim() || !dataNascimento || loading}
            className="w-full py-4 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold"
            style={{
              background: loading ? "#2a2a2e" : "#c9a96e",
              color: loading ? "#6a6560" : "#0c0c0e",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Canalizando sua energia vibracional...
              </span>
            ) : (
              "Revelar minha pseudociência"
            )}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {resultado && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-md mt-8"
          >
            <div className="text-center mb-4">
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#6a6560" }}>O Dr. Charles Latão anuncia</p>
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
                  className="font-heading text-3xl md:text-4xl font-black leading-tight mb-2"
                  style={{ color: "#c9a96e" }}
                >
                  {resultado.nome_terapia}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-2 my-5"
                >
                  {[
                    { label: "Prefixo", value: resultado.prefixo },
                    { label: "Radical", value: resultado.radical },
                    { label: "Sufixo", value: resultado.sufixo },
                    { label: "Complemento", value: resultado.complemento },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg px-3 py-2 text-center" style={{ background: "#151518", border: "1px solid #2a2a2e" }}>
                      <div className="text-[9px] uppercase tracking-[0.15em] font-semibold" style={{ color: "#6a6560" }}>{item.label}</div>
                      <div className="font-semibold text-sm mt-0.5" style={{ color: "#e8e4dc" }}>{item.value}</div>
                    </div>
                  ))}
                </motion.div>
                <div className="my-5" style={{ borderTop: "1px solid #2a2a2e" }} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-lg p-4"
                  style={{ background: "#151518" }}
                >
                  <div className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: "#6a6560" }}>Slogan oficial</div>
                  <p className="font-heading italic text-base md:text-lg leading-relaxed" style={{ color: "#e8e4dc" }}>"{resultado.slogan}"</p>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs mt-5 leading-relaxed"
                  style={{ color: "#5a5550" }}
                >
                  Gerado exclusivamente para <span className="font-semibold" style={{ color: "#8a8580" }}>{nome}</span> com base em sua data de nascimento.
                  <br />
                  <span style={{ color: "#4a4540" }}><em>É personalizado. Porque ninguém é igual a você.</em></span>
                </motion.p>
              </div>
              <div className="text-center py-2.5 px-4 text-[10px] font-medium" style={{ background: "#151518", color: "#6a6560", borderTop: "1px solid #2a2a2e" }}>
                Conteúdo satírico · Baseado no livro-jogo de André D. Bacchi
              </div>
            </div>
            <div className="mt-4">
              <ShareButton targetRef={cardRef} caption={`Minha pseudociência é: ${resultado.nome_terapia}! E a sua? Gere a sua no Gerador Supremo do Dr. Latão 2.0™ → https://geradorpseudociencia.base44.app/`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}