import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail, ArrowDown, FileDown, Sparkles } from "lucide-react";
import { FaMobileAlt, FaReact, FaFire } from "react-icons/fa";
import MagneticButton from "@/components/effects/MagneticButton";
import TiltCard from "@/components/effects/TiltCard";
import { toast } from "sonner";

const rotatingTitles = ["Flutter Developer", "Firebase Expert", "GetX Specialist", "MVVM Architecture", "UI/UX Designer", "Mobile App Developer"];

const NAME = "Avaiza Shahid";

const floatingBadges = [
  { icon: FaMobileAlt, className: "top-2 -left-6 md:-left-10", delay: 0 },
  { icon: FaFire, className: "bottom-10 -right-6 md:-right-10", delay: 1.2 },
  { icon: FaReact, className: "-bottom-4 left-6", delay: 2.1 },
];

const HeroSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const skill = rotatingTitles[currentSkill];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < skill.length) {
          setDisplayText(skill.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentSkill((prev) => (prev + 1) % rotatingTitles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentSkill]);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 10}s`,
        duration: `${8 + Math.random() * 12}s`,
        size: `${2 + Math.random() * 3}px`,
      })),
    []
  );

  const downloadResume = async () => {
    try {
      const res = await fetch("/resume.pdf", { method: "HEAD" });
      if (!res.ok) throw new Error("missing");
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Avaiza-Shahid-Resume.pdf";
      link.click();
    } catch {
      toast.info("Add resume.pdf to /public to enable this download.");
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 md:grid-cols-[1.15fr_0.85fr] md:gap-8">
        {/* Text column */}
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Open to Software Engineering opportunities
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="block text-2xl font-medium text-muted-foreground sm:text-3xl md:text-4xl"
            >
              Hi, I'm
            </motion.span>
            <span className="mt-1 flex flex-wrap justify-center gap-x-[0.2em] md:justify-start text-4xl md:text-6xl sm:text-6xl ">
              {NAME.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.4 + i * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="gradient-text neon-text inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-1 text-lg text-muted-foreground md:text-xl"
          >
            Software Engineer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-3 italic text-muted-foreground/80"
          >
            "Building scalable & elegant mobile solutions"
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25 }} className="mb-8 h-8">
            <span className="font-mono text-lg text-primary md:text-xl">
              {displayText}
              <span className="typing-cursor">&nbsp;</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <MagneticButton>
              <a
                href="#projects"
                data-cursor="link"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground neon-glow transition-transform duration-200"
              >
                View Projects
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                data-cursor="link"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="rounded-lg border border-primary/50 px-8 py-3 font-semibold text-primary neon-border-hover neon-glow-hover transition-all duration-200"
              >
                Contact Me
              </a>
            </MagneticButton>
            <MagneticButton>
              <button
                onClick={downloadResume}
                data-cursor="link"
                className="flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <FileDown size={17} /> Résumé
              </button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55 }}
            className="flex items-center justify-center gap-6 md:justify-start"
          >
            <a href="https://www.linkedin.com/in/avaiza-shahid/" target="_blank" rel="noopener noreferrer" data-cursor="link" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/Avaiza123/" target="_blank" rel="noopener noreferrer" data-cursor="link" className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={24} />
            </a>
            <a href="mailto:avaizashahid@gmail.com" data-cursor="link" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>

        {/* Profile column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-xs md:max-w-sm"
        >
          <TiltCard maxTilt={10}>
            <div className="glass-panel relative overflow-hidden rounded-3xl p-3" data-cursor="card">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img src="/profile.webp" alt="Avaiza Shahid" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
            </div>
          </TiltCard>

          {/* Floating tech badges */}
          {floatingBadges.map((b, i) => (
            <motion.div
              key={i}
              className={`absolute z-10 hidden h-12 w-12 items-center justify-center rounded-2xl glass-panel text-lg text-primary sm:flex ${b.className}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
            >
              <b.icon />
            </motion.div>
          ))}

          <motion.div
            className="absolute -bottom-5 right-4 z-10 hidden items-center gap-2 rounded-2xl glass-panel px-4 py-2.5 text-xs sm:flex"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={13} className="text-primary" />
            <span>13 public repos on GitHub</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown className="text-muted-foreground" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
