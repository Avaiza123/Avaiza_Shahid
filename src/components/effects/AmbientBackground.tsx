import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Fixed, full-viewport ambient backdrop shared by every section:
 * drifting aurora blobs + a faint architectural grid + film-grain noise +
 * a soft spotlight that eases toward the pointer. Everything here is
 * `pointer-events-none` and sits behind `relative z-10` page content.
 */
const AmbientBackground = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, hsl(var(--primary) / 0.06), transparent 65%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
      {/* Aurora mesh blobs */}
      <div
        className="aurora-blob aurora-blob-1 -top-40 -left-40 h-[36rem] w-[36rem] bg-primary/20"
      />
      <div
        className="aurora-blob aurora-blob-2 top-1/3 -right-40 h-[32rem] w-[32rem] bg-accent/20"
      />
      <div
        className="aurora-blob aurora-blob-3 bottom-0 left-1/4 h-[30rem] w-[30rem] bg-cyan/10"
      />

      {/* Architectural grid, fading toward the edges */}
      <div
        className="grid-overlay absolute inset-0 opacity-[0.35]"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {/* Pointer-reactive spotlight */}
      <div ref={spotlightRef} className="absolute inset-0" />

      {/* Film grain */}
      <div className="noise-overlay" />

      {/* Vignette to keep edges calm and content legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, transparent 55%, hsl(var(--background) / 0.9) 100%)",
        }}
      />
    </div>
  );
};

export default AmbientBackground;
