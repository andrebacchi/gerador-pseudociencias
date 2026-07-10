import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PREFIXOS = ["Bio", "Neuro", "Crono", "Geo", "Paleo", "Ultra", "Micro", "Sub", "Eco", "Inter", "Termo", "Astro"];
const RADICAIS = ["farmaco", "gastro", "cito", "cardio", "psico", "odonto", "fono", "sinergio", "nutro", "osteo", "endócrino", "dermato"];
const SUFIXOS = ["logia", "terapia", "mancia", "nomia", "genia", "patia", "scopia", "genética", "filia", "sofia", "grafia", "entropia"];
const COMPLEMENTOS = ["Quântica", "Ortomolecular", "Vibracional", "Integrativa", "Holística", "Regenerativa", "Energética", "Adaptativa", "Xamânica", "Sistêmica", "Ancestral", "Cósmica"];
const SLOGANS = [
  "Tudo o que é natural é melhor. E sua intuição sabe disso.",
  "Porque nós tratamos a causa e não o sintoma.",
  "Milhares já usaram e aprovaram. Você vai ficar de fora?",
  "A ciência ainda não consegue provar... mas funciona!",
  "Vai continuar sofrendo ou vai experimentar a mudança?",
  "A sua verdade é o que realmente importa.",
  "Você não precisa entender. Só precisa sentir.",
  "Mais do que um tratamento: um reencontro com você mesmo(a).",
  "A cura só começa quando você se permite.",
  "É personalizado. Porque ninguém é igual a você.",
  "Pesquisadores da Harvard Medical School também aprovam.",
  "Na minha prática funciona. Pode confiar.",
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function generatePseudociencia(nome, dataNascimento) {
  const seed = hashString(nome.toLowerCase().trim() + dataNascimento);
  const pick = (arr, offset = 0) => arr[(seed + offset * 137) % arr.length];

  const prefixo = pick(PREFIXOS, 0);
  const radical = pick(RADICAIS, 1);
  const sufixo = pick(SUFIXOS, 2);
  const complemento = pick(COMPLEMENTOS, 3);
  const slogan = pick(SLOGANS, 4);

  const nome_terapia = `${prefixo}${radical}${sufixo} ${complemento}`;
  return { prefixo, radical, sufixo, complemento, slogan, nome_terapia };
}

export default function Home() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGerar = () => {
    if (!nome.trim() || !dataNascimento) return;
    setLoading(true);
    setResultado(null);
    setTimeout(() => {
      const r = generatePseudociencia(nome, dataNascimento);
      setResultado(r);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%)" }}>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <div className="flex justify-center mb-3">
          <span className="text-5xl">⚗️</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
          <span className="text-white">O Maior</span>{" "}
          <span style={{ color: "#3b82f6" }}>Picareta</span>
          <br />
          <span style={{ color: "#facc15" }}>em Saúde</span>
        </h1>
        <p className="mt-4 text-gray-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Descubra a pseudociência personalizada para você, gerada com base no seu nome e data de nascimento pelo{" "}
          <span className="text-blue-400 font-semibold">Gerador Supremo do Dr. Latão 2.0™</span>
        </p>
        <div className="mt-3 inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          ★ 20.736 possibilidades ★
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
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

      {/* Result */}
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
            {/* Announcement */}
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm uppercase tracking-widest">
                🎺 O Dr. Charles Latão anuncia:
              </p>
            </div>

            {/* Main card */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-2xl" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d1a3a 100%)" }}>
              {/* Top badge */}
              <div className="bg-yellow-400 text-black text-center py-2 px-4 font-black uppercase tracking-widest text-xs">
                ⭐ A sua nova pseudociência é: ⭐
              </div>

              <div className="p-6 md:p-8 text-center">
                {/* Therapy name */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-black leading-tight mb-2"
                  style={{ color: "#facc15" }}
                >
                  {resultado.nome_terapia}
                </motion.h2>

                {/* Structure breakdown */}
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

                {/* Divider */}
                <div className="border-t border-gray-700 my-5" />

                {/* Slogan */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-black bg-opacity-40 rounded-xl p-4"
                >
                  <div className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-bold">📢 Slogan oficial</div>
                  <p className="text-white font-semibold text-base md:text-lg italic leading-relaxed">
                    "{resultado.slogan}"
                  </p>
                </motion.div>

                {/* Personalized note */}
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

              {/* Bottom badge */}
              <div className="bg-blue-900 text-blue-200 text-center py-2 px-4 text-xs font-semibold">
                ⚠️ Conteúdo satírico • Baseado no livro-jogo de André D. Bacchi
              </div>
            </div>

            {/* Try again */}
            <div className="text-center mt-6">
              <button
                onClick={() => { setResultado(null); setNome(""); setDataNascimento(""); }}
                className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
              >
                Tentar com outro nome
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-16 text-center text-gray-700 text-xs max-w-sm">
        <p>Baseado no livro-jogo <em>"O Maior Picareta em Saúde"</em> de André D. Bacchi</p>
        <p className="mt-1">Este gerador é uma sátira educativa sobre pseudociências.</p>
      </div>
    </div>
  );
}