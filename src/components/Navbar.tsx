import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((href: string) => {
    setMobileOpen(false);
    setActive(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[60] h-[3px] w-full bg-transparent">
        <motion.div
          className="scroll-progress h-full"
          style={{ width: `${scrollProgress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass-panel shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent"
          }`}
        >
          {/* Identity */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#home");
            }}
            data-cursor="link"
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src="/profile.webp"
              alt="Avaiza Shahid"
              className="h-10 w-10 rounded-full object-cover border border-primary/40"
            />
            <span className="hidden sm:block text-sm font-semibold tracking-tight">Avaiza Shahid</span>
          </a>

          {/* Desktop links with sliding active pill */}
          <div className="relative hidden md:flex items-center gap-1 rounded-full glass-panel px-1.5 py-1.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                data-cursor="link"
                className="relative z-10 px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300"
              >
                <span className={active === link.href ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}>
                  {link.label}
                </span>
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const evt = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                document.dispatchEvent(evt);
              }}
              data-cursor="link"
              className="hidden md:flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              aria-label="Open command palette"
            >
              <Command size={12} />
              <span>K</span>
            </button>

            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick("#contact");
                }}
                data-cursor="link"
                className="hidden sm:inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground neon-glow-hover transition-shadow"
              >
                Let's talk
              </a>
            </MagneticButton>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 glass-panel rounded-2xl md:hidden"
          >
            <div className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`text-left py-2.5 text-sm font-medium transition-colors ${
                    active === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
