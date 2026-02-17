import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail, ArrowDown } from "lucide-react";

const skills = ["Flutter Developer", "Firebase Expert", "GetX Specialist", "MVVM Architecture", "UI/UX Designer", "Mobile App Developer"];

const HeroSection = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const skill = skills[currentSkill];
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
          setCurrentSkill((prev) => (prev + 1) % skills.length);
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary text-sm md:text-base tracking-widest uppercase mb-4"
        >
          Welcome 
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
        >
          Hi, I'm{" "}
          <span className="gradient-text neon-text">Avaiza Shahid</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground mb-2"
        >
          Software Engineer
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground mb-2 italic"
        >
          "Building Scalable & Elegant Mobile Solutions"
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="h-8 mb-8"
        >
          <span className="text-primary text-lg md:text-xl font-mono">
            {displayText}
            <span className="typing-cursor">&nbsp;</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold neon-glow hover:scale-105 transition-transform duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3 rounded-lg border border-primary/50 text-primary font-semibold neon-border-hover neon-glow-hover hover:scale-105 transition-all duration-200"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-6"
        >
          <a href="https://www.linkedin.com/in/avaiza-shahid/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={26} />
          </a>
          <a href="https://github.com/Avaiza123/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={26} />
          </a>
          <a href="mailto:avaizashahid@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail size={26} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
