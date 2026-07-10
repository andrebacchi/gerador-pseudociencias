import { useState } from "react";

export default function ShareButton({ targetRef, caption }) {
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (!targetRef?.current) return;
    setSharing(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#0c0c0e",
        scale: 2,
        useCORS: true,
      });

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      const file = new File([blob], "minha-pseudociencia.png", { type: "image/png" });

      const shareData = {
        title: "Gerador Supremo de Termos (Pseudo)Científicos 2.0™",
        text: caption || "Olha a minha pseudociência gerada!",
      };

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ ...shareData, files: [file] });
      } else if (navigator.share) {
        await navigator.share(shareData);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "minha-pseudociencia.png";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "minha-pseudociencia.png";
        a.click();
        URL.revokeObjectURL(url);
        const waText = encodeURIComponent(caption || "Olha a minha pseudociência gerada!");
        window.open(`https://wa.me/?text=${waText}`, "_blank");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Erro ao compartilhar:", err);
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="w-full py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      style={{ background: "#151518", border: "1px solid #c9a96e", color: "#c9a96e" }}
    >
      {sharing ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Preparando imagem...
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Compartilhar minha pseudociência
        </>
      )}
    </button>
  );
}