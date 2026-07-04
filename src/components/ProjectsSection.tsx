import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, Sparkles, Target, Github, ArrowUpRight, CheckCircle2, Bot, Activity } from "lucide-react";
import TiltCard from "@/components/effects/TiltCard";

// Import images
import giggleboxImg1 from "../assets/gigglebox.webp";
import giggleboxImg2 from "../assets/gbscreens.webp";
import goalmateImg1 from "../assets/goalmate.webp";
import flavamoImg from "../assets/flavamo.webp";
import pizzaImg from "../assets/pizza.webp";
import todoImg from "../assets/todolist.webp";
import movewise from "../assets/Mlogo.png";
import MChat from "../assets/MChat.png";

interface Project {
  id: string;
  title: string;
  icon: typeof Sparkles;
  tagline: string;
  status: string;
  featured: boolean;
  images: string[];
  github?: string;
  period?: string;
  org?: string;
  description: string;
  techStack: string[];
  features: string[];
}

const projects: Project[] = [
  {
    id: "movewise",
    title: "MoveWise",
    icon: Activity,
    tagline: "AI-Powered Fitness App",
    status: "Completed",
    featured: true,
    images: [movewise],
    github: undefined,
    period: "Jun 2025 – Jun 2026",
    org: "COMSATS University Islamabad",
    description:
      "An AI-powered mobile fitness app featuring personalized workouts, real-time posture detection, nutrition tracking, water tracking, a fitness AI chatbot, and real-time progress analytics for holistic wellness management.",
    techStack: ["Flutter", "Artificial Intelligence", "Machine Learning", "Mediapipe", "Chatbot Development"],
    features: [
      "Personalized AI-generated workout plans",
      "Real-time posture detection with Mediapipe",
      "Nutrition & water intake tracking",
      "Built-in fitness AI chatbot",
      "Real-time progress analytics dashboard",
    ],
  },
  
  {
    id: "gigglebox",
    title: "GiggleBox",
    icon: Sparkles,
    tagline: "Kids Learning App",
    status: "Completed",
    featured: true,
    images: [giggleboxImg1, giggleboxImg2],
    github: "https://github.com/Avaiza123/GiggleBox",
    description:
      "GiggleBox is a fun learning app for kids that combines stories, quizzes, videos, NASA facts, and a creative coloring module into one interactive platform. Built with Flutter (MVVM + GetX).",
    techStack: ["Flutter", "MVVM", "GetX", "REST APIs"],
    features: [
      "Interactive stories and quizzes",
      "NASA space facts integration",
      "Creative coloring module",
      "Kid-friendly UI & UX",
    ],
  },
  {
    id: "flavamo",
    title: "FLAVAMO",
    icon: Sparkles,
    tagline: "Recipe Generator App",
    status: "Completed",
    featured: false,
    images: [flavamoImg],
    github: "https://github.com/Avaiza123/Flavamo",
    description: "A recipe generator and explorer app built in Flutter.",
    techStack: ["Flutter", "Firebase", "API", "Android Studio"],
    features: ["Recipe search & explore", "API integration", "Mobile-friendly UI"],
  },
 
  {
    id: "fitness-chatbot",
    title: "Fitness Chatbot",
    icon: Bot,
    tagline: "Domain-Trained Health Assistant",
    status: "Completed",
    featured: true,
    images: [MChat],
    github: undefined,
    period: "Jan 2026 – Jun 2026",
    org: "COMSATS University Islamabad",
    description:
      "A fully functional, production-ready fitness chatbot built on comprehensive knowledge bases spanning fitness (workout types, exercises, training principles), health (sleep, hydration, stress management, common conditions), diet (macronutrients, meal plans, dietary goals), and a detailed nutrition database covering 15+ foods with meal suggestions.",
    techStack: ["Chatbot Development", "Chatbot Response Design", "Nutrition Knowledge Base"],
    features: [
      "Structured knowledge bases for fitness, health, diet & food",
      "15+ food nutrition database with meal suggestions",
      "Training-principle-aware workout guidance",
      "Health guidance: sleep, hydration, stress, common conditions",
    ],
  },
   {
    id: "goalmate",
    title: "GoalMate",
    icon: Target,
    tagline: "Smart Goal Tracker",
    status: "Completed",
    featured: true,
    images: [goalmateImg1],
    github: "https://github.com/Avaiza123/GoalMate",
    description:
      "GoalMate is a Flutter-based personal goal management app designed to help users set, track, and complete goals with Firebase Authentication and Firestore for real-time data.",
    techStack: ["Flutter", "Firebase Auth", "Firestore", "GetX"],
    features: [
      "Authentication with Firebase",
      "Goal management & tracking",
      "Status-based filtering",
      "Profile & settings management",
    ],
  },
  {
    id: "pizza",
    title: "Pizza Online Web Page",
    icon: Sparkles,
    tagline: "E-commerce Web App",
    status: "Completed",
    featured: false,
    images: [pizzaImg],
    github: "https://github.com/Avaiza123/Pizza-Shop-Online",
    description:
      "React Vite project for an online pizza shop with Firebase Authentication and Firestore for user data.",
    techStack: ["React", "Firebase", "JSX", "Ant Design"],
    features: ["Responsive cart", "Product cards", "Firebase auth & database"],
  },
  {
    id: "todo",
    title: "To-do List",
    icon: Sparkles,
    tagline: "Task Management App",
    status: "Completed",
    featured: false,
    images: [todoImg],
    github: "https://github.com/Avaiza123/To-do-List",
    description:
      "A React Vite To-do list app with Firebase Firestore for data and Bootstrap for UI.",
    techStack: ["React", "Firebase", "Bootstrap", "Firestore"],
    features: ["Task CRUD", "Authentication", "Responsive UI"],
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const selected = projects.find((p) => p.id === selectedProject);

  const open = (id: string) => {
    setActiveImage(0);
    setSelectedProject(id);
  };

  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-4">
          <span className="section-label">Selected Work</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
          A few builds that show how I turn requirements into shipped, well-structured products.
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={project.featured ? "md:col-span-1" : ""}
            >
              <TiltCard maxTilt={5}>
                <div
                  onClick={() => open(project.id)}
                  data-cursor="view"
                  data-cursor-label="View project"
                  className="group relative overflow-hidden rounded-2xl glass-panel glass-panel-hover cursor-pointer transition-all duration-500"
                >
                  {/* Card image */}
                  <div className="relative h-52 md:h-60 overflow-hidden bg-secondary/30">
                    {project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-700 ease-premium group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-transparent">
                        <project.icon
                          size={56}
                          className="text-primary/50 transition-transform duration-700 group-hover:scale-110"
                          strokeWidth={1.25}
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full glass-panel px-3 py-1 text-[10px] font-medium text-primary">
                      <CheckCircle2 size={11} />
                      {project.status}
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor="link"
                        className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full glass-panel text-foreground/80 opacity-0 transition-all duration-300 hover:text-primary group-hover:opacity-100"
                        title="View on GitHub"
                      >
                        <Github size={15} />
                      </a>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <project.icon className="text-primary" size={16} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold leading-tight">{project.title}</h3>
                        <p className="text-xs text-primary">{project.tagline}</p>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="ml-auto text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100"
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {project.description.length > 110 ? `${project.description.slice(0, 110)}…` : project.description}
                    </p>
                    {project.period && (
                      <p className="mt-2 text-[11px] text-muted-foreground/70">
                        {project.period} · {project.org}
                      </p>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/85 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                data-cursor="link"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={16} />
              </button>

              {/* Image carousel */}
              <div className="relative bg-secondary/20">
                {selected.images.length > 0 ? (
                  <>
                    <div className="flex h-64 md:h-80 items-center justify-center overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImage}
                          src={selected.images[activeImage]}
                          alt={`${selected.title} screenshot ${activeImage + 1}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="max-h-full max-w-full object-contain"
                        />
                      </AnimatePresence>
                    </div>
                    {selected.images.length > 1 && (
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {selected.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImage(i)}
                            aria-label={`Show image ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === activeImage ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-64 md:h-72 items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-transparent">
                    <selected.icon size={72} className="text-primary/50" strokeWidth={1.1} />
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8">
                {selected.period && (
                  <p className="mb-1 text-xs text-muted-foreground">
                    {selected.period} · {selected.org}
                  </p>
                )}
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-primary mb-2">
                  <CheckCircle2 size={12} /> {selected.status}
                </div>
                <h3 className="text-2xl font-bold mb-1">{selected.title}</h3>
                <p className="text-primary text-sm mb-4">{selected.tagline}</p>
                <p className="text-sm leading-relaxed text-foreground/80 mb-6">{selected.description}</p>

                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="mb-6 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-primary transition-colors hover:bg-primary/20"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                )}

                <h4 className="mb-2 text-sm font-semibold text-primary">Tech Stack</h4>
                <div className="mb-6 flex flex-wrap gap-2">
                  {selected.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="mb-2 text-sm font-semibold text-primary">Key Features</h4>
                <ul className="space-y-2">
                  {selected.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1 text-primary">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
