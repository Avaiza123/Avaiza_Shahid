import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Users, BookOpen } from "lucide-react";

const timelineItems = [
  {
    icon: Briefcase,
    title: "Flutter Intern – NETSOL Technologies",
    period: "2024",
    desc: "Developed Flutter applications using MVVM architecture and GetX state management.",
  },
  {
    icon: Users,
    title: "Team Head – ACM Student Chapter",
    period: "2023–Present",
    desc: "Leading ACM chapter at COMSATS, organizing workshops and coding competitions.",
  },
  {
    icon: GraduationCap,
    title: "Ambassador – UET Science Society",
    period: "2023",
    desc: "Represented COMSATS as student ambassador for UET Science Society events.",
  },
  {
    icon: BookOpen,
    title: "Online Teacher",
    period: "2022–Present",
    desc: "Teaching programming concepts and Flutter development remotely.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="glass-card neon-border p-8 mb-16 max-w-3xl mx-auto">
          <p className="text-foreground/90 leading-relaxed">
            A dedicated <span className="text-primary font-semibold">Software Engineering student</span> at COMSATS University Islamabad, focused on building scalable and high-performance mobile applications. Specializing in{" "}
            <span className="text-primary font-semibold">Flutter & Firebase</span>, with practical experience implementing MVVM architecture, GetX state management, and clean, maintainable code practices. Experienced in Agile development environments, contributing to real-world projects that emphasize performance, usability, and structured design. Passionate about transforming complex requirements into intuitive, visually engaging, and user-centered digital solutions.
          </p>
        </div>

        {/*
        <h3 className="text-2xl font-bold text-center mb-10">My Journey</h3>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 -translate-x-px w-0.5 h-full bg-border" />
          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className={`relative flex items-center mb-10 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`w-1/2 ${i % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <div className="glass-card neon-border-hover neon-glow-hover p-4 transition-all duration-300">
                  <p className="text-primary text-xs font-mono mb-1">{item.period}</p>
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-secondary border-2 border-primary/50 flex items-center justify-center z-10">
                <item.icon size={16} className="text-primary" />
              </div>
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
        */}
      </motion.div>
    </section>
  );
};

export default AboutSection;
