import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaMobileAlt, FaReact, FaPython, FaDatabase, FaCogs, FaLaptopCode } from "react-icons/fa";

const skills = [
  { name: "Flutter", icon: <FaMobileAlt /> },
  { name: "Firebase", icon: <FaDatabase /> },
  { name: "GetX", icon: <FaCogs /> },
  { name: "MVVM Architecture", icon: <FaLaptopCode /> },
  { name: "REST APIs", icon: <FaCogs /> },
  { name: "C++", icon: <FaLaptopCode /> },
  { name: "Python", icon: <FaPython /> },
  { name: "UI/UX Design", icon: <FaLaptopCode /> },
  { name: "Agile Methodologies", icon: <FaCogs /> },
  { name: "React.js", icon: <FaReact /> },
  { name: "Android Development", icon: <FaMobileAlt /> },
  { name: "Web Development", icon: <FaLaptopCode /> },
  { name: "JavaScript / TypeScript", icon: <FaLaptopCode /> },
  { name: "HTML / CSS / Bootstrap", icon: <FaLaptopCode /> },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Technologies, frameworks, and tools I have hands-on experience with
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center p-4 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/20 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer group"
            >
              <div className="text-4xl mb-3 text-primary group-hover:text-accent">
                {skill.icon}
              </div>
              <span className="text-lg font-semibold text-center">{skill.name}</span>
              <div className="mt-2 w-full h-1.5 rounded-full bg-primary/20 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${50 + i * 3}%` }}
                  transition={{ duration: 1 + i * 0.05, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
