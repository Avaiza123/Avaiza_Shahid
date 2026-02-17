import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, Users, Award, Heart, ChevronDown } from "lucide-react";

const experiences = [
  {
    icon: Briefcase,
    title: "Flutter App Development Intern",
    company: "NETSOL Technologies Pakistan",
    period: "Jul 2025 – Aug 2025",
    details:
      "Contributed to end-to-end development of three mobile applications using Flutter. Implemented MVVM architecture to ensure clean, modular, and maintainable code. Worked in an Agile environment participating in sprint planning, daily stand-ups, and review sessions. Focused on UI/UX optimization, API integration, and state management while delivering scalable, production-ready features.",
  },
  {
    icon: Users,
    title: "Team Head",
    company: "ACM Student Chapter, CUI Lahore",
    period: "Oct 2024 – Sep 2025",
    details:
      "Initiated and hosted knowledge-sharing sessions focused on web development, covering React, Vite, UI/UX best practices, and performance optimization. Provided hands-on support in layout structuring, responsiveness, and API integration. Mentored team members and strengthened collaborative problem-solving skills.",
  },
  {
    icon: Award,
    title: "Student Ambassador",
    company: "UET Science Society",
    period: "Jun 2024 – Present",
    details:
      "Representing and promoting science and technology initiatives. Contributing to communication strategies and online outreach activities to increase engagement and awareness within the student community.",
  },
  {
    icon: Award,
    title: "Student Ambassador",
    company: "LetsUpgrade",
    period: "Jun 2025 – Jul 2025",
    details:
      "Promoted upskilling initiatives and learning programs in emerging technologies. Acted as a bridge between students and the platform, encouraging participation in workshops and technical training sessions.",
  },
  {
    icon: Briefcase,
    title: "Web Developer Intern",
    company: "GenITeam Solutions",
    period: "Jul 2024 – Aug 2024",
    details:
      "Worked on web development projects using React, TypeScript, Node.js, and Firebase. Built responsive interfaces, implemented routing, integrated Cloud Firestore, and collaborated with the development team to deliver functional web applications.",
  },
  {
    icon: Heart,
    title: "Online Teacher",
    company: "Self-Employed (Texas Virtual School & Pearson Institute)",
    period: "Sep 2023 – Sep 2025",
    details:
      "Provided remote academic support to students in Math, Science, and English. Delivered personalized, interactive lessons tailored to different learning styles using modern online teaching tools and resources.",
  },
];



const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="experience" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Professional journey and leadership roles
        </p>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px w-0.5 h-full bg-border" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i }}
              className={`relative flex mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
            >
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full glass-card neon-border-hover neon-glow-hover p-5 transition-all duration-300 text-left"
                >
                  <div className={`flex items-center gap-3 mb-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    <p className="text-primary text-xs font-mono">{exp.period}</p>
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground transition-transform duration-200 ${expanded === i ? "rotate-180" : ""}`}
                    />
                  </div>
                  <h4 className="font-semibold text-sm">{exp.title}</h4>
                  <p className="text-primary/80 text-xs">{exp.company}</p>
                  <AnimatePresence>
                    {expanded === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-muted-foreground text-xs mt-3 overflow-hidden"
                      >
                        {exp.details}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-secondary border-2 border-primary/50 flex items-center justify-center z-10">
                <exp.icon size={16} className="text-primary" />
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
