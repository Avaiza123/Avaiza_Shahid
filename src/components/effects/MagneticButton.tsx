import { useRef, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  [key: string]: unknown;
}

/**
 * Wraps any element (typically a button/link) and offsets it toward the
 * pointer while hovered, snapping back with a spring on leave. Falls back
 * to a static passthrough on touch devices / reduced motion.
 */
const MagneticButton = ({ children, className, strength = 0.35, ...rest }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const active = isFinePointer && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={active ? { x: springX, y: springY } : undefined}
      className={cn("inline-block", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
