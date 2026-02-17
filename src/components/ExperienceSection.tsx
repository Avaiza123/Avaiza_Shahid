/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, Users, Award, Heart, ChevronDown } from "lucide-react";

/* =========================
   TECHNICAL EXPERIENCE
========================= */
const technicalExperiences = [
  {
    icon: Briefcase,
    title: "Flutter App Development Intern",
    company: "NETSOL Technologies Pakistan",
    period: "Jul 2025 – Aug 2025",
    details:
      "Contributed to end-to-end development of three mobile applications using Flutter. Implemented MVVM architecture, optimized UI/UX, integrated APIs, and worked in Agile sprints delivering scalable features.",
  },
  {
    icon: Briefcase,
    title: "Web Developer Intern",
    company: "GenITeam Solutions",
    period: "Jul 2024 – Aug 2024",
    details:
      "Built responsive web apps using React, TypeScript, Node.js, and Firebase. Implemented routing, Firestore integration, and collaborated in team-based development.",
  },
];

/* =========================
   LEADERSHIP EXPERIENCE
========================= */
const leadershipExperiences = [
  {
    icon: Users,
    title: "Team Head",
    company: "ACM Student Chapter, CUI Lahore",
    period: "Oct 2024 – Sep 2025",
    details:
      "Led web development sessions on React, Vite, UI/UX, and performance optimization. Mentored members and promoted collaborative problem-solving.",
  },
  {
    icon: Award,
    title: "Student Ambassador",
    company: "UET Science Society",
    period: "Jun 2024 – Present",
    details:
      "Represented and promoted science and technology initiatives. Contributed to outreach and engagement strategies.",
  },
  {
    icon: Award,
    title: "Student Ambassador",
    company: "LetsUpgrade",
    period: "Jun 2025 – Jul 2025",
    details:
      "Promoted upskilling initiatives in emerging technologies and encouraged participation in technical workshops.",
  },
  { icon: Heart, title: "Online Teacher", company: "Self-Employed (Texas Virtual School & Pearson Institute)", period: "Sep 2023 – Sep 2025", details: "Provided remote academic support to students in Math, Science, and English. Delivered personalized, interactive lessons tailored to different learning styles using modern online teaching tools and resources.", },
];

/* =========================
   VOLUNTEERING
========================= */
const volunteeringExperiences = [
  {
    icon: Heart,
    title: "Volunteer",
    company: "Alkhidmat Foundation - Digital",
    period: "Oct 2024 – Present",
    details:
      "Contributed to digital initiatives and supported community outreach programs.",
  },
  {
    icon: Heart,
    title: "Volunteer",
    company: "The Indus Hospital",
    period: "Oct 2024 – Present",
    details:
      "Participated in healthcare support activities and community service initiatives.",
  },
];

/* =========================
   REUSABLE TIMELINE
========================= */
const Timeline = ({ data }: { data: any[] }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-6 md:left-1/2 md:-translate-x-px w-0.5 h-full bg-border" />

      {data.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          className={`relative flex mb-8 ${
            i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } flex-row`}
        >
          <div
            className={`w-full md:w-1/2 pl-16 md:pl-0 ${
              i % 2 === 0
                ? "md:pr-10 md:text-right"
                : "md:pl-10 md:text-left"
            }`}
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="w-full glass-card neon-border-hover neon-glow-hover p-5 transition-all duration-300 text-left"
            >
              <div
                className={`flex items-center gap-3 mb-2 ${
                  i % 2 === 0 ? "md:justify-end" : ""
                }`}
              >
                <p className="text-primary text-xs font-mono">
                  {exp.period}
                </p>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform duration-200 ${
                    expanded === i ? "rotate-180" : ""
                  }`}
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
  );
};

/* =========================
   MAIN SECTION
========================= */
const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          My <span className="gradient-text">Experience</span>
        </h2>

        {/* Technical */}
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Technical Experience
        </h3>
        <Timeline data={technicalExperiences} />

        {/* Leadership */}
        <h3 className="text-2xl font-semibold mt-20 mb-8 text-center">
          Leadership Experience
        </h3>
        <Timeline data={leadershipExperiences} />

        {/* Volunteering */}
        <h3 className="text-2xl font-semibold mt-20 mb-8 text-center">
          Volunteering
        </h3>
        <Timeline data={volunteeringExperiences} />
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
