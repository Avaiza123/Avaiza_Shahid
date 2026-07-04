import { useRef, useState, JSX } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaMobileAlt,
  FaReact,
  FaPython,
  FaDatabase,
  FaCogs,
  FaLaptopCode,
  FaFire,
  FaCode,
  FaUsers,
  FaPaintBrush,
} from "react-icons/fa";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface Skill {
  name: string;
  icon: JSX.Element;
  blurb: string;
}

interface Ring {
  label: string;
  radius: number;
  duration: number;
  clockwise: boolean;
  skills: Skill[];
}

const rings: Ring[] = [
  {
    label: "Mobile",
    radius: 116,
    duration: 34,
    clockwise: true,
    skills: [
      { name: "Flutter", icon: <FaMobileAlt />, blurb: "Cross-platform apps with clean, MVVM-structured codebases." },
      { name: "GetX", icon: <FaCogs />, blurb: "Reactive state management, routing & dependency injection." },
      { name: "MVVM", icon: <FaLaptopCode />, blurb: "Layered architecture for testable, maintainable apps." },
      { name: "Firebase", icon: <FaFire />, blurb: "Auth, Firestore, and real-time data for mobile & web." },
    ],
  },
  {
    label: "Web",
    radius: 200,
    duration: 46,
    clockwise: false,
    skills: [
      { name: "React", icon: <FaReact />, blurb: "Component-driven UIs with hooks and modern patterns." },
      { name: "TypeScript", icon: <FaLaptopCode />, blurb: "Type-safe JavaScript for fewer bugs, better tooling." },
      { name: "REST APIs", icon: <FaCogs />, blurb: "Designing & consuming APIs for real-world data flows." },
      { name: "HTML / CSS", icon: <FaCode />, blurb: "Semantic markup and responsive, accessible styling." },
    ],
  },
  {
    label: "Foundations",
    radius: 288,
    duration: 58,
    clockwise: true,
    skills: [
      { name: "Python", icon: <FaPython />, blurb: "Scripting, automation, and applied ML basics." },
      { name: "C++", icon: <FaLaptopCode />, blurb: "Strong CS fundamentals: DSA, OOP, systems thinking." },
      { name: "UI/UX Design", icon: <FaPaintBrush />, blurb: "Turning requirements into intuitive interfaces." },
      { name: "Agile", icon: <FaUsers />, blurb: "Sprint-based delivery, standups, and iterative shipping." },
      { name: "SQL / Data", icon: <FaDatabase />, blurb: "Relational modeling and everyday data wrangling." },
    ],
  },
];

const OrbitRing = ({
  ring,
  activeSkill,
  onHover,
}: {
  ring: Ring;
  activeSkill: string | null;
  onHover: (s: string | null) => void;
}) => {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const anim = reducedMotion ? "none" : `${ring.clockwise ? "orbit-cw" : "orbit-ccw"} ${ring.duration}s linear infinite`;
  const counterAnim = reducedMotion ? "none" : `${ring.clockwise ? "orbit-ccw" : "orbit-cw"} ${ring.duration}s linear infinite`;

  return (
  <div
    className="absolute left-1/2 top-1/2 rounded-full border border-primary/15"
    style={{
      width: ring.radius * 2,
      height: ring.radius * 2,
      marginLeft: -ring.radius,
      marginTop: -ring.radius,
      animation: anim,
      animationPlayState: paused ? "paused" : "running",
      // Add a dynamic z-index based on the inverse of the radius
      zIndex: 50 - Math.floor(ring.radius / 10), 
    }}
  >
      {ring.skills.map((skill, i) => {
        const angle = (360 / ring.skills.length) * i;
        return (
          <div
            key={skill.name}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `rotate(${angle}deg) translateX(${ring.radius}px)` }}
          >
            <div
              style={{
                animation: counterAnim,
                animationPlayState: paused ? "paused" : "running",
              }}
            >
              <button
                type="button"
                data-cursor="card"
                data-cursor-label={skill.name}
                onMouseEnter={() => {
                  onHover(skill.name);
                  setPaused(true);
                }}
                onMouseLeave={() => {
                  onHover(null);
                  setPaused(false);
                }}
                onFocus={() => onHover(skill.name)}
                onBlur={() => onHover(null)}
                style={{ transform: "translate(-50%, -50%)" }}
                className={`flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full glass-panel text-base md:text-lg transition-all duration-300 ${
                  activeSkill === skill.name
                    ? "scale-125 border-primary text-primary shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
                    : "text-foreground/70 hover:text-primary"
                }`}
                aria-label={skill.name}
              >
                {skill.icon}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<string | null>(null);

  const activeSkillData = rings.flatMap((r) => r.skills).find((s) => s.name === hovered);

  return (
    <section id="skills" className="py-24 px-4 max-w-6xl mx-auto overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-4">
          <span className="section-label">Capabilities</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Skill <span className="gradient-text">Universe</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-6">
          Hover a node to explore — organized from core mobile craft outward to the fundamentals that support it.
        </p>

        {/* Orbit visualization */}
        <div className="relative mx-auto flex h-[460px] sm:h-[560px] md:h-[680px] w-full max-w-3xl items-center justify-center">
          <div className="relative scale-[0.78] sm:scale-90 md:scale-100">
            {rings.map((ring) => (
              <OrbitRing key={ring.label} ring={ring} activeSkill={hovered} onHover={setHovered} />
            ))}

            {/* Center core */}
            <div className="relative z-10 flex h-28 w-28 md:h-36 md:w-36 flex-col items-center justify-center rounded-full glass-panel text-center animate-pulse-glow">
              <span className="text-sm md:text-base font-semibold">Avaiza</span>
              <span className="text-[11px] md:text-xs text-muted-foreground">Engineer</span>
            </div>
          </div>
        </div>

        {/* Active skill readout */}
        <div className="mx-auto mt-2 flex h-16 max-w-md items-center justify-center text-center">
          {activeSkillData ? (
            <motion.div
              key={activeSkillData.name}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel inline-block rounded-xl px-5 py-3"
            >
              <p className="text-sm font-semibold text-primary">{activeSkillData.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{activeSkillData.blurb}</p>
            </motion.div>
          ) : (
            <p className="text-xs text-muted-foreground/70">Hover any node above for details</p>
          )}
        </div>

        {/* Ring legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {rings.map((ring) => (
            <div key={ring.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary/60" />
              {ring.label}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
