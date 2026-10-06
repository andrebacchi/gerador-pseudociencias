import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { janelaApp, appInstalado, marcarInstalado } from "@/lib/janela";

const CHAVE = "gerador-pseudociencias.instalado";

let deferredPrompt = null;
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredPrompt = e; });
}

function platform() {
  const u = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/.test(u) || (/Macintosh/.test(u) && navigator.maxTouchPoints > 1)) return "ios";
  if (/Android/.test(u)) return "android";
  return "desktop";
}

const STEPS = {
  ios: ["Abra esta página no Safari.", "Toque em Compartilhar (o quadrado com a seta para cima).", "Toque em “Adicionar à Tela de Início”.", "Confirme em “Adicionar”. O ícone da picareta aparece junto dos seus apps."],
  android: ["Abra esta página no Chrome.", "Toque no menu ⋮, no canto superior direito.", "Toque em “Instalar app” ou “Adicionar à tela inicial”.", "Confirme. O ícone aparece junto dos seus apps."],
  desktop: ["Chrome ou Edge: clique no ícone de instalar na barra de endereço, ou no menu ⋮ → “Transmitir, salvar e compartilhar” → “Instalar página como app”.", "Safari (Mac): menu Arquivo → “Adicionar ao Dock”.", "Em qualquer navegador, dá para salvar nos favoritos com Ctrl + D."],
};
const TABS = [["ios", "iPhone"], ["android", "Android"], ["desktop", "Computador"]];

export default function InstallButton({ className }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("android");
  const [janela, setJanela] = useState("navegador");

  useEffect(() => {
    const j = janelaApp(CHAVE);
    setJanela(j);
    if (j === "outra") appInstalado(CHAVE).then((ok) => { if (ok) setJanela("propria"); });
    const onInstalled = () => { marcarInstalado(CHAVE); setJanela("propria"); };
    window.addEventListener("appinstalled", onInstalled);
    return () => window.removeEventListener("appinstalled", onInstalled);
  }, []);

  // some só na janela do próprio app instalado; dentro de outro app (BACCHI LAB), continua visível
  if (janela === "propria") return null;

  const click = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const r = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (r?.outcome === "accepted") return;
      } catch { /* mostra as instruções */ }
    }
    setTab(platform());
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={click}
        className={cn("flex items-center gap-2 px-4 h-10 rounded-full border text-sm font-semibold transition-colors hover:bg-[#c9a96e] hover:text-[#0c0c0e]", className)}
        style={{ background: "#151518", borderColor: "#c9a96e", color: "#c9a96e" }}
      >
        <Download className="w-4 h-4" /> Instalar app
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle style={{ color: "#8f7240" }}>Instalar o Gerador de Pseudociências</DialogTitle>
          </DialogHeader>
          {janela === "outra" && (
            <p className="rounded-xl bg-slate-100 px-3 py-2.5 text-sm text-slate-700">
              Você abriu este app por dentro de outro, como o BACCHI LAB, e daqui não dá para instalar. Toque em ⋮ no alto da tela e em <b>Abrir no Chrome</b>; lá, toque de novo em <b>Instalar app</b>.
            </p>
          )}
          <p className="text-sm text-slate-600">O gerador fica na tela inicial como um aplicativo, abre em tela cheia e funciona sem internet depois da primeira visita.</p>
          <div className="flex gap-1 p-1 rounded-full bg-slate-100 w-fit">
            {TABS.map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={cn("px-3 py-1.5 rounded-full text-sm font-semibold", tab === k ? "bg-slate-900 text-white" : "text-slate-600")}>{l}</button>
            ))}
          </div>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
            {STEPS[tab].map((s) => <li key={s}>{s}</li>)}
          </ol>
        </DialogContent>
      </Dialog>
    </>
  );
}
