export const PREFIXOS = ["Bio", "Neuro", "Crono", "Geo", "Paleo", "Ultra", "Micro", "Sub", "Eco", "Inter", "Termo", "Astro"];
export const RADICAIS = ["farmaco", "gastro", "cito", "cardio", "psico", "odonto", "fono", "sinergio", "nutro", "osteo", "endócrino", "dermato"];
export const SUFIXOS = ["logia", "terapia", "mancia", "nomia", "genia", "patia", "scopia", "genética", "filia", "sofia", "grafia", "entropia"];
export const COMPLEMENTOS = ["Quântica", "Ortomolecular", "Vibracional", "Integrativa", "Holística", "Regenerativa", "Energética", "Adaptativa", "Xamânica", "Sistêmica", "Ancestral", "Cósmica"];
export const SLOGANS = [
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

export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function generatePseudociencia(nome, dataNascimento) {
  const combined = nome.toLowerCase().trim() + dataNascimento;
  const prefixo = PREFIXOS[hashString(combined + "prefixo") % PREFIXOS.length];
  const radical = RADICAIS[hashString(combined + "radical") % RADICAIS.length];
  const sufixo = SUFIXOS[hashString(combined + "sufixo") % SUFIXOS.length];
  const complemento = COMPLEMENTOS[hashString(combined + "complemento") % COMPLEMENTOS.length];
  const slogan = SLOGANS[hashString(combined + "slogan") % SLOGANS.length];
  const nome_terapia = `${prefixo}${radical}${sufixo} ${complemento}`;
  return { prefixo, radical, sufixo, complemento, slogan, nome_terapia };
}