import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generatePseudociencia } from "@/lib/pseudocienciaData";
import { generateHistoria } from "@/lib/historiaData";
import ShareButton from "./ShareButton";

export default function ManualMode() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historia, setHistoria] = useState(null);
  const [loadingHistoria, setLoadingHistoria] = useState(false);
  const cardRef = useRef(null);
  const historiaRef = useRef(null);

  const handleGerar = () => {
    if (!nome.trim() || !dataNascimento) return;
    setLoading(true);
    setResultado(null);
    setHistoria(null);
    setTimeout(() => {
      setResultado(generatePseudociencia(nome, dataNascimento));
      setLoading(false);
    }, 1200);
  };

  const handleHistoria = () => {
    if (!resultado) return;
    setLoadingHistoria(true);
    setHistoria(null);
    setTimeout(() => {
      setHistoria(generateHistoria(nome, dataNascimento, resultado.nome_terapia));
      setLoadingHistoria(false);
    }, 1500);
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

            {!historia && !loadingHistoria && (
              <button
                onClick={handleHistoria}
                className="w-full mt-3 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold"
                style={{ background: "transparent", border: "1px solid #3a3a3e", color: "#8a8580" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5 5.754 5 4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18c1.746 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Criar minha história profissional
              </button>
            )}

            {loadingHistoria && (
              <div className="mt-3 py-8 rounded-lg flex items-center justify-center gap-2 text-sm" style={{ background: "#151518", border: "1px solid #2a2a2e", color: "#8a8580" }}>
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                O Dr. Charles Latão está redigindo sua lenda...
              </div>
            )}

            {historia && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="mt-6"
              >
                <div ref={historiaRef} className="relative rounded-xl overflow-hidden" style={{ background: "#0c0c0e", border: "1px solid #3a3a3e" }}>
                  <div className="text-center py-3 px-4 text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ background: "#c9a96e", color: "#0c0c0e" }}>
                    A origem mítica de {nome.trim().split(" ")[0]}
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap justify-center gap-2 mb-5">
                      {historia.etapas.map((etapa, i) => (
                        <div key={i} className="rounded-lg px-3 py-2 text-center" style={{ background: "#151518", border: "1px solid #2a2a2e" }}>
                          <div className="text-[9px] uppercase tracking-[0.15em] font-semibold" style={{ color: "#6a6560" }}>Etapa {i + 1}</div>
                          <div className="font-semibold text-sm mt-0.5" style={{ color: "#e8e4dc" }}>{etapa.titulo}</div>
                        </div>
                      ))}
                    </div>
                    <div className="my-4" style={{ borderTop: "1px solid #2a2a2e" }} />
                    <div className="space-y-4">
                      {historia.paragrafos.map((p, i) => (
                        <p key={i} className="text-sm md:text-base leading-relaxed text-justify" style={{ color: "#e8e4dc" }}>
                          {p}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs mt-5 leading-relaxed" style={{ color: "#5a5550" }}>
                      Narrativa gerada para <span className="font-semibold" style={{ color: "#8a8580" }}>{nome}</span> — {historia.idade} anos — pela Jornada do Herói do Dr. Charles Latão.
                    </p>
                  </div>
                  <div className="text-center py-2.5 px-4 text-[10px] font-medium" style={{ background: "#151518", color: "#6a6560", borderTop: "1px solid #2a2a2e" }}>
                    Conteúdo satírico · Baseado no livro-jogo de André D. Bacchi
                  </div>
                </div>
                <div className="mt-4">
                  <ShareButton targetRef={historiaRef} caption={`A origem mítica de ${nome.trim().split(" ")[0]} foi revelada pelo Dr. Charles Latão! Descubra a sua no Gerador Supremo 2.0™ → https://geradorpseudociencia.base44.app/`} />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}