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
        <div className="rounded-2xl border border-gray-700 p-6 md:p-8" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)" }}>
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Seu nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: João da Silva"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              onKeyDown={(e) => e.key === "Enter" && handleGerar()}
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Data de nascimento
            </label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            onClick={handleGerar}
            disabled={!nome.trim() || !dataNascimento || loading}
            className="w-full font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-black text-sm"
            style={{ background: loading ? "#6b7280" : "linear-gradient(135deg, #facc15, #f59e0b)" }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Canalizando sua energia vibracional...
              </span>
            ) : (
              "✨ Revelar minha pseudociência ✨"
            )}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {resultado && (
          <motion.div
            key="resultado"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-md mt-8"
          >
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm uppercase tracking-widest">🎺 O Dr. Charles Latão anuncia:</p>
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
                  className="text-3xl md:text-4xl font-black leading-tight mb-2"
                  style={{ color: "#facc15" }}
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
                    { label: "Prefixo", value: resultado.prefixo, color: "bg-blue-900 text-blue-300 border-blue-700" },
                    { label: "Radical", value: resultado.radical, color: "bg-purple-900 text-purple-300 border-purple-700" },
                    { label: "Sufixo", value: resultado.sufixo, color: "bg-green-900 text-green-300 border-green-700" },
                    { label: "Complemento", value: resultado.complemento, color: "bg-orange-900 text-orange-300 border-orange-700" },
                  ].map((item) => (
                    <div key={item.label} className={`rounded-lg border px-3 py-2 text-center ${item.color}`}>
                      <div className="text-xs uppercase tracking-wider opacity-70 font-bold">{item.label}</div>
                      <div className="font-bold text-sm mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </motion.div>
                <div className="border-t border-gray-700 my-5" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-black bg-opacity-40 rounded-xl p-4"
                >
                  <div className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">📢 Slogan oficial</div>
                  <p className="text-white font-semibold text-base md:text-lg italic leading-relaxed">"{resultado.slogan}"</p>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-gray-500 text-xs mt-5"
                >
                  Gerado exclusivamente para <span className="text-gray-300 font-semibold">{nome}</span> com base em sua data de nascimento.
                  <br />
                  <span className="text-gray-600">*É personalizado. Porque ninguém é igual a você.*</span>
                </motion.p>
              </div>
              <div className="bg-blue-900 text-blue-200 text-center py-2 px-4 text-xs font-semibold">
                ⚠️ Conteúdo satírico • Baseado no livro-jogo de André D. Bacchi
              </div>
            </div>
            <div className="mt-4">
              <ShareButton targetRef={cardRef} caption={`Minha pseudociência é: ${resultado.nome_terapia}! E a sua? Gere a sua no Gerador Supremo do Dr. Latão 2.0™`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}