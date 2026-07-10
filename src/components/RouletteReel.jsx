import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

const ITEM_HEIGHT = 64;
const GAP = 8;
const STEP = ITEM_HEIGHT + GAP;
const VISIBLE = 3;

export default function RouletteReel({ options, spinKey, finalIndex, delay = 0, duration = 2.5 }) {
  const controls = useAnimationControls();
  const spinKeyRef = useRef(0);

  const repeats = 15;
  const strip = [];
  for (let r = 0; r < repeats; r++) {
    for (let i = 0; i < options.length; i++) {
      strip.push(options[i]);
    }
  }
  const lastCycleStart = (repeats - 2) * options.length;
  const targetIndex = lastCycleStart + finalIndex;
  const centerSlot = Math.floor(VISIBLE / 2);
  const targetY = -(targetIndex * STEP) + centerSlot * STEP;

  useEffect(() => {
    if (spinKey === 0 || spinKey === spinKeyRef.current) return;
    spinKeyRef.current = spinKey;

    let mounted = true;
    (async () => {
      await controls.start({ y: 0, transition: { duration: 0 } });
      if (delay > 0) await new Promise((r) => setTimeout(r, delay * 1000));
      if (!mounted) return;
      await controls.start({
        y: targetY,
        transition: { duration, ease: [0.15, 0.8, 0.3, 1] },
      });
    })();
    return () => {
      mounted = false;
    };
  }, [spinKey]);

  const viewportHeight = VISIBLE * STEP;

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{ height: viewportHeight, width: 140, background: "#0c0c0e", border: "1px solid #2a2a2e" }}
    >
      {/* Center highlight band */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          top: centerSlot * STEP,
          height: ITEM_HEIGHT,
          borderTop: "1px solid #c9a96e",
          borderBottom: "1px solid #c9a96e",
          background: "rgba(201,169,110,0.06)",
        }}
      />
      {/* Top/bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0c0c0e, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #0c0c0e, transparent)" }} />

      <motion.div animate={controls} className="flex flex-col items-center" style={{ gap: GAP }}>
        {strip.map((opt, i) => {
          const isTarget = i === targetIndex;
          return (
            <div
              key={i}
              style={{ height: ITEM_HEIGHT, width: 124 }}
              className={`flex items-center justify-center text-sm font-semibold text-center leading-tight rounded-md ${
                isTarget ? "" : ""
              }`}
            >
              <span style={{ color: isTarget ? "#e8e4dc" : "#5a5550" }}>{opt}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}