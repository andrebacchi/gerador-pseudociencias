import { useState } from "react";
import { QrCode, Copy, Check, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// QR code do app (padrão do BACCHI LAB): abre o código do endereço do próprio app, grande e sobre branco,
// para compartilhar entre celulares ou projetar. O desenho é fixo, porque o endereço não muda: foi gerado
// com o qrcode.js do repositório bacchilab (nível M). Se o endereço mudar, gere de novo.
const ENDERECO = "https://andrebacchi.github.io/gerador-pseudociencias/";
const LADO = 37;
const DESENHO = "M2 2h7v1h-7zM10 2h2v1h-2zM13 2h1v1h-1zM19 2h5v1h-5zM25 2h1v1h-1zM28 2h7v1h-7zM2 3h1v1h-1zM8 3h1v1h-1zM10 3h2v1h-2zM16 3h1v1h-1zM18 3h1v1h-1zM20 3h1v1h-1zM23 3h1v1h-1zM25 3h2v1h-2zM28 3h1v1h-1zM34 3h1v1h-1zM2 4h1v1h-1zM4 4h3v1h-3zM8 4h1v1h-1zM11 4h1v1h-1zM15 4h3v1h-3zM20 4h1v1h-1zM22 4h1v1h-1zM26 4h1v1h-1zM28 4h1v1h-1zM30 4h3v1h-3zM34 4h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM10 5h2v1h-2zM14 5h1v1h-1zM20 5h1v1h-1zM24 5h1v1h-1zM26 5h1v1h-1zM28 5h1v1h-1zM30 5h3v1h-3zM34 5h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM11 6h1v1h-1zM14 6h2v1h-2zM18 6h1v1h-1zM21 6h2v1h-2zM26 6h1v1h-1zM28 6h1v1h-1zM30 6h3v1h-3zM34 6h1v1h-1zM2 7h1v1h-1zM8 7h1v1h-1zM12 7h3v1h-3zM16 7h3v1h-3zM21 7h4v1h-4zM26 7h1v1h-1zM28 7h1v1h-1zM34 7h1v1h-1zM2 8h7v1h-7zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM22 8h1v1h-1zM24 8h1v1h-1zM26 8h1v1h-1zM28 8h7v1h-7zM10 9h3v1h-3zM14 9h1v1h-1zM17 9h6v1h-6zM26 9h1v1h-1zM2 10h1v1h-1zM4 10h2v1h-2zM7 10h3v1h-3zM13 10h1v1h-1zM16 10h6v1h-6zM23 10h1v1h-1zM25 10h1v1h-1zM28 10h1v1h-1zM31 10h1v1h-1zM33 10h2v1h-2zM2 11h1v1h-1zM4 11h2v1h-2zM7 11h1v1h-1zM12 11h1v1h-1zM15 11h1v1h-1zM18 11h2v1h-2zM21 11h2v1h-2zM25 11h1v1h-1zM28 11h2v1h-2zM31 11h2v1h-2zM34 11h1v1h-1zM3 12h1v1h-1zM5 12h1v1h-1zM7 12h4v1h-4zM12 12h1v1h-1zM14 12h2v1h-2zM18 12h1v1h-1zM20 12h1v1h-1zM22 12h1v1h-1zM25 12h1v1h-1zM28 12h4v1h-4zM33 12h2v1h-2zM4 13h1v1h-1zM6 13h2v1h-2zM11 13h2v1h-2zM18 13h2v1h-2zM22 13h1v1h-1zM25 13h1v1h-1zM27 13h1v1h-1zM29 13h1v1h-1zM31 13h1v1h-1zM33 13h2v1h-2zM3 14h1v1h-1zM6 14h1v1h-1zM8 14h4v1h-4zM16 14h1v1h-1zM18 14h1v1h-1zM21 14h2v1h-2zM24 14h1v1h-1zM26 14h2v1h-2zM30 14h2v1h-2zM9 15h2v1h-2zM13 15h1v1h-1zM15 15h2v1h-2zM19 15h1v1h-1zM21 15h1v1h-1zM26 15h2v1h-2zM29 15h1v1h-1zM31 15h1v1h-1zM33 15h1v1h-1zM2 16h1v1h-1zM4 16h5v1h-5zM12 16h4v1h-4zM20 16h3v1h-3zM24 16h1v1h-1zM28 16h4v1h-4zM2 17h3v1h-3zM7 17h1v1h-1zM9 17h1v1h-1zM11 17h1v1h-1zM17 17h1v1h-1zM20 17h1v1h-1zM23 17h2v1h-2zM27 17h2v1h-2zM30 17h3v1h-3zM2 18h2v1h-2zM5 18h1v1h-1zM8 18h1v1h-1zM12 18h3v1h-3zM20 18h1v1h-1zM22 18h7v1h-7zM30 18h3v1h-3zM3 19h1v1h-1zM6 19h2v1h-2zM9 19h1v1h-1zM11 19h1v1h-1zM17 19h1v1h-1zM24 19h5v1h-5zM30 19h2v1h-2zM34 19h1v1h-1zM3 20h1v1h-1zM5 20h2v1h-2zM8 20h2v1h-2zM11 20h1v1h-1zM14 20h1v1h-1zM17 20h1v1h-1zM20 20h1v1h-1zM22 20h3v1h-3zM26 20h1v1h-1zM29 20h2v1h-2zM32 20h2v1h-2zM2 21h2v1h-2zM11 21h5v1h-5zM17 21h4v1h-4zM22 21h1v1h-1zM24 21h4v1h-4zM30 21h1v1h-1zM33 21h2v1h-2zM8 22h2v1h-2zM14 22h1v1h-1zM16 22h3v1h-3zM23 22h1v1h-1zM31 22h2v1h-2zM2 23h1v1h-1zM6 23h1v1h-1zM9 23h1v1h-1zM11 23h1v1h-1zM13 23h2v1h-2zM16 23h4v1h-4zM21 23h3v1h-3zM25 23h1v1h-1zM28 23h2v1h-2zM31 23h2v1h-2zM34 23h1v1h-1zM4 24h3v1h-3zM8 24h1v1h-1zM10 24h1v1h-1zM13 24h2v1h-2zM16 24h2v1h-2zM19 24h1v1h-1zM23 24h1v1h-1zM25 24h2v1h-2zM28 24h1v1h-1zM30 24h2v1h-2zM33 24h2v1h-2zM3 25h2v1h-2zM6 25h1v1h-1zM9 25h4v1h-4zM16 25h2v1h-2zM21 25h1v1h-1zM26 25h1v1h-1zM30 25h2v1h-2zM2 26h1v1h-1zM5 26h2v1h-2zM8 26h4v1h-4zM13 26h1v1h-1zM15 26h2v1h-2zM19 26h1v1h-1zM21 26h1v1h-1zM24 26h1v1h-1zM26 26h5v1h-5zM33 26h1v1h-1zM10 27h3v1h-3zM14 27h2v1h-2zM17 27h1v1h-1zM20 27h2v1h-2zM23 27h1v1h-1zM25 27h2v1h-2zM30 27h2v1h-2zM2 28h7v1h-7zM10 28h2v1h-2zM15 28h2v1h-2zM18 28h4v1h-4zM23 28h1v1h-1zM25 28h2v1h-2zM28 28h1v1h-1zM30 28h1v1h-1zM2 29h1v1h-1zM8 29h1v1h-1zM10 29h2v1h-2zM13 29h2v1h-2zM19 29h2v1h-2zM23 29h1v1h-1zM25 29h2v1h-2zM30 29h5v1h-5zM2 30h1v1h-1zM4 30h3v1h-3zM8 30h1v1h-1zM12 30h2v1h-2zM18 30h13v1h-13zM32 30h3v1h-3zM2 31h1v1h-1zM4 31h3v1h-3zM8 31h1v1h-1zM10 31h2v1h-2zM13 31h2v1h-2zM16 31h1v1h-1zM18 31h1v1h-1zM22 31h1v1h-1zM24 31h1v1h-1zM26 31h1v1h-1zM29 31h1v1h-1zM31 31h2v1h-2zM34 31h1v1h-1zM2 32h1v1h-1zM4 32h3v1h-3zM8 32h1v1h-1zM10 32h3v1h-3zM15 32h1v1h-1zM17 32h2v1h-2zM22 32h1v1h-1zM25 32h1v1h-1zM28 32h2v1h-2zM31 32h1v1h-1zM2 33h1v1h-1zM8 33h1v1h-1zM11 33h1v1h-1zM13 33h1v1h-1zM15 33h2v1h-2zM19 33h4v1h-4zM24 33h1v1h-1zM26 33h5v1h-5zM34 33h1v1h-1zM2 34h7v1h-7zM10 34h1v1h-1zM12 34h2v1h-2zM15 34h1v1h-1zM18 34h4v1h-4zM23 34h1v1h-1zM25 34h1v1h-1zM30 34h3v1h-3z";

export default function QrButton({ className }) {
  const [open, setOpen] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const podeCompartilhar = typeof navigator !== "undefined" && !!navigator.share;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(ENDERECO);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch { /* sem acesso à área de transferência: o endereço fica selecionável logo acima */ }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Mostrar o QR code deste app" style={{ background: "#151518", borderColor: "#c9a96e", color: "#c9a96e" }} className={cn("flex items-center justify-center gap-2 h-10 w-10 sm:w-auto sm:px-4 rounded-full border text-sm font-semibold transition-colors hover:bg-[#c9a96e] hover:text-[#0c0c0e]", className)}>
        <QrCode className="w-4 h-4" /> <span className="hidden sm:inline">QR code</span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-slate-900">QR code do Gerador de Pseudociências</DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-slate-600">Aponte a câmera do celular para o código.</p>
          <div className="mx-auto w-full max-w-[min(100%,56vh)] rounded-xl border border-slate-200 bg-white p-2.5">
            <svg viewBox={`0 0 ${LADO} ${LADO}`} shapeRendering="crispEdges" role="img" aria-label="QR code para andrebacchi.github.io/gerador-pseudociencias" className="block w-full h-auto">
              <rect width={LADO} height={LADO} fill="#fff" />
              <path d={DESENHO} fill="#161a22" />
            </svg>
          </div>
          <p className="text-center font-mono font-semibold text-[clamp(15px,4vw,20px)] break-all select-all text-slate-900">andrebacchi.github.io/gerador-pseudociencias</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={copiar} className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-semibold transition-colors bg-slate-900 text-white hover:bg-slate-700">
              {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copiado ? "Link copiado" : "Copiar link"}
            </button>
            {podeCompartilhar && (
              <button onClick={() => navigator.share({ title: "Gerador de Pseudociências", url: ENDERECO }).catch(() => {})} className="inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-semibold transition-colors border border-slate-300 text-slate-700 hover:bg-slate-100">
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            )}
          </div>
          <p className="text-center text-xs text-slate-600 opacity-80">QR Code é marca registrada da DENSO WAVE INCORPORATED.</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
