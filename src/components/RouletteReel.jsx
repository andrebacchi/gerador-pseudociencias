import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

const ITEM_HEIGHT = 64;
const GAP = 8;
const STEP = ITEM_HEIGHT + GAP;
const VISIBLE = 3; // items visible in viewport (odd, so center is highlighted)

export default function RouletteReel({ options, spinKey, finalIndex, delay = 0, duration = 2.5, accentColor = "#facc15" }) {
  const controls = useAnimationControls();
  const spinKeyRef = useRef(0);

  // Build a tall strip: options repeated many times, with the final item landing near the end
  const repeats = 15;
  const strip = [];
  for (let r = 0; r < repeats; r++) {
    for (let i = 0; i < options.length; i++) {
      strip.push(options[i]);
    }
  }
  // The target item index in the strip - place it near the end
  const lastCycleStart = (repeats - 2) * options.length;
  const targetIndex = lastCycleStart + finalIndex;
  // We want the target item to be in the CENTER of the viewport
  // Center slot index (0-based within visible items) = floor(VISIBLE / 2)
  const centerSlot = Math.floor(VISIBLE / 2);
  const targetY = -(targetIndex * STEP) + centerSlot * STEP;

  useEffect(() => {
    if (spinKey === 0 || spinKey === spinKeyRef.current) return;
    spinKeyRef.current = spinKey;

    let mounted = true;
    (async () => {
      // reset to top instantly
      await controls.start({ y: 0, transition: { duration: 0 } });
      if (delay > 0) await new Promise((r) => setTimeout(r, delay * 1000));
      if (!mounted) return;
      // animate to target with ease-out for a natural stop
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
      className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-950"
      style={{ height: viewportHeight, width: 140 }}
    >
      {/* Center highlight band */}
      <div
        className="absolute left-0 right-0 pointer-events-none z-10"
        style={{
          top: centerSlot * STEP,
          height: ITEM_HEIGHT,
          borderTop: `2px solid ${accentColor}`,
          borderBottom: `2px solid ${accentColor}`,
          background: `${accentColor}11`,
        }}
      />
      {/* Top/bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #030712, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #030712, transparent)" }} />

      <motion.div animate={controls} className="flex flex-col items-center" style={{ gap: GAP }}>
        {strip.map((opt, i) => {
          // is this the target slot?
          const isTarget = i === targetIndex;
          return (
            <div
              key={i}
              style={{ height: ITEM_HEIGHT, width: 124 }}
              className={`flex items-center justify-center text-sm font-bold text-center leading-tight rounded-lg ${
                isTarget ? "text-white" : "text-gray-500"
              }`}
            >
              {opt}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}