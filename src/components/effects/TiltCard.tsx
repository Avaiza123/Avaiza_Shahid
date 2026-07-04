import { useRef, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glow?: boolean;
}

const TiltCard = ({ children, className, maxTilt = 8, glow = true }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const active = isFinePointer && !reducedMotion;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springX = useSpring(px, { stiffness: 180, damping: 20 });
  const springY = useSpring(py, { stiffness: 180, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [0, 1], [-maxTilt, maxTilt]);
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: active ? rotateX : 0,
        rotateY: active ? rotateY : 0,
        transformPerspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {glow && active && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${glowX} ${glowY}, hsl(var(--primary) / 0.35), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default TiltCard;
