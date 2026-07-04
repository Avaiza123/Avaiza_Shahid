import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A short, calm brand-reveal loader shown once per session. Purely
 * cosmetic — it never blocks longer than ~1.1s, so it can't hurt
 * perceived performance, only add a touch of ceremony to first load.
 */
const PageLoader = () => {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem("hasLoaded"));

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("hasLoaded", "true");
    }, 1100);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm uppercase text-muted-foreground"
          >
            Avaiza Shahid
          </motion.span>
          <div className="relative h-px w-40 overflow-hidden bg-border/50">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
