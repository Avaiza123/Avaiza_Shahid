import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CursorMode = "default" | "link" | "text" | "card" | "drag" | "view";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * A single global cursor instance. Elements opt in to special states via
 * `data-cursor="link" | "text" | "card" | "drag" | "view"` and, optionally,
 * `data-cursor-label="View project"` for a text hint inside the ring.
 *
 * Disabled entirely on touch devices and softened under prefers-reduced-motion.
 */
const CustomCursor = () => {
  const isFinePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const enabled = isFinePointer && !reducedMotion;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring lags slightly behind the dot for a soft, expensive feel.
  const ringX = useSpring(mouseX, { stiffness: 260, damping: 26, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 260, damping: 26, mass: 0.4 });
  // Dot tracks almost 1:1 for precision.
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 40, mass: 0.2 });

  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      const nextMode = (target?.dataset.cursor as CursorMode) || "default";
      const nextLabel = target?.dataset.cursorLabel ?? null;

      // Only trigger a React re-render when the cursor's *state* actually
      // changes — not on every single mousemove (which fires 60-120x/sec
      // and was the source of the cursor feeling laggy).
      setMode((prev) => (prev === nextMode ? prev : nextMode));
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    const handleDown = (e: MouseEvent) => {
      setPressed(true);
      const id = rippleId.current++;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((r) => r.filter((rp) => rp.id !== id));
      }, 650);
    };
    const handleUp = () => setPressed(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  const BASE_RING = 90; // largest state (card); everything else scales down from this
  const ringTargetSize = { default: 32, link: 56, card: 90, text: 4, drag: 64, view: 84 }[mode];
  const ringScale = (ringTargetSize / BASE_RING) * (pressed ? 0.85 : 1);
  const showLabel = (mode === "view" || mode === "drag") && label;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Precision dot */}
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-primary"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: pressed ? 0.6 : 1,
          scaleX: mode === "text" ? 0.5 : 1,
          scaleY: mode === "text" ? 3.3 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Trailing morphing ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: BASE_RING,
          height: BASE_RING,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          borderColor:
            mode === "card" || mode === "view"
              ? "hsl(var(--primary) / 0.35)"
              : "hsl(var(--primary) / 0.6)",
          backgroundColor:
            mode === "link" || mode === "drag"
              ? "hsl(var(--primary) / 0.12)"
              : mode === "card" || mode === "view"
              ? "hsl(var(--primary) / 0.05)"
              : "transparent",
        }}
        animate={{ scale: ringScale }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {showLabel && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 / ringScale }}
            className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-primary"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="fixed left-0 top-0 h-[70px] w-[70px] rounded-full border border-primary/50"
            style={{ x: r.x, y: r.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
