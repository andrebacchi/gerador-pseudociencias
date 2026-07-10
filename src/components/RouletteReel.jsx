import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export default function RouletteReel({ options, spinKey, finalIndex, delay = 0, duration = 2.5, itemWidth = 130, height = 56 }) {
  const controls = useAnimationControls();
  const repeats = 12;
  const strip = Array(repeats).fill(options).flat();
  const targetIndex = strip.length - options.length + finalIndex;
  const targetX = -(targetIndex * itemWidth);

  useEffect(() => {
    if (spinKey === 0) return;
    let mounted = true;
    (async () => {
      await controls.start({ x: 0, transition: { duration: 0 } });
      if (delay > 0) await new Promise((r) => setTimeout(r, delay * 1000));
      if (!mounted) return;
      await controls.start({
        x: [0, targetX * 0.5, targetX - 14, targetX],
        transition: { duration, times: [0, 0.5, 0.85, 1], ease: "linear" },
      });
    })();
    return () => {
      mounted = false;
    };
  }, [spinKey]);

  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900 relative"
      style={{ width: itemWidth, height }}
    >
      {/* center highlight */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 6px 12px -6px rgba(0,0,0,0.9), inset 0 -6px 12px -6px rgba(0,0,0,0.9)" }} />
      <motion.div animate={controls} className="flex" style={{ height }}>
        {strip.map((opt, i) => (
          <div
            key={i}
            style={{ width: itemWidth, height }}
            className="flex items-center justify-center text-lg font-bold text-white whitespace-nowrap"
          >
            {opt}
          </div>
        ))}
      </motion.div>
    </div>
  );
}