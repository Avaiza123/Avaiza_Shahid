import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X, Sparkles, Target, Github } from "lucide-react";

// Import images
import giggleboxImg1 from "../assets/gigglebox.jpg";
import giggleboxImg2 from "../assets/gbscreens.jpg";
import goalmateImg1 from "../assets/goalmate.png";
import flavamoImg from "../assets/flavamo.png";
import pizzaImg from "../assets/pizza.png";
import loginImg from "../assets/login.png";
import todoImg from "../assets/todolist.png";

const projects = [
  {
    id: "gigglebox",
    title: "GiggleBox",
    icon: Sparkles,
    tagline: "Kids Learning App",
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
    id: "goalmate",
    title: "GoalMate",
    icon: Target,
    tagline: "Smart Goal Tracker",
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
    id: "flavamo",
    title: "FLAVAMO",
    icon: Sparkles,
    tagline: "Recipe Generator App",
    images: [flavamoImg],
    github: "https://github.com/Avaiza123/Flavamo",
    description: "A recipe generator and explorer app built in Flutter.",
    techStack: ["Flutter", "Firebase", "API", "Android Studio"],
    features: ["Recipe search & explore", "API integration", "Mobile-friendly UI"],
  },
  {
    id: "pizza",
    title: "Pizza Online Web Page",
    icon: Sparkles,
    tagline: "E-commerce Web App",
    images: [pizzaImg],
    github: "https://github.com/Avaiza123/Pizza-Shop-Online",
    description:
      "React Vite project for an online pizza shop with Firebase Authentication and Firestore for user data.",
    techStack: ["React", "Firebase", "JSX", "Ant Design"],
    features: ["Responsive cart", "Product cards", "Firebase auth & database"],
  },
  {
    id: "login",
    title: "Login Page",
    icon: Sparkles,
    tagline: "React Authentication",
    images: [loginImg],
    github: "https://github.com/Avaiza123/Login-Signup-To-do-list",
    description:
      "React Vite project with Firebase Authentication supporting Google and email/password login.",
    techStack: ["React", "Firebase", "TypeScript", "CSS"],
    features: ["Secure signup/login", "Google auth", "Cloud Firestore"],
  },
  {
    id: "todo",
    title: "To-do List",
    icon: Sparkles,
    tagline: "Task Management App",
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const selected = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Featured work that showcases my expertise
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              onClick={() => setSelectedProject(project.id)}
              className="glass-card neon-border neon-glow-hover neon-border-hover overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 group"
            >
              {/* Card Image */}
              <div className="w-full h-48 md:h-56 flex items-center justify-center bg-background/10 p-2">
                <img
                  src={project.images[0]}
                  alt={`${project.title} preview`}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <project.icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p className="text-primary text-xs">{project.tagline}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  {project.description.slice(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-2 mt-4 items-center">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto p-1 rounded-full hover:bg-primary/20 transition-colors"
                      title="View on GitHub"
                    >
                      <Github size={18} className="text-primary" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Popup Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card neon-border neon-glow p-0 max-w-3xl w-full max-h-[85vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>

            {/* Scrollable Images */}
            <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory">
              {selected.images.map((img, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center w-full min-w-full max-h-[60vh] p-2 snap-start bg-background/10"
                >
                  <img
                    src={img}
                    alt={`${selected.title} screenshot ${i + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">{selected.title}</h3>
              <p className="text-primary text-sm mb-4">{selected.tagline}</p>
              <p className="text-foreground/80 text-sm mb-6">{selected.description}</p>

              {selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Github size={18} /> View on GitHub
                </a>
              )}

              <h4 className="text-sm font-semibold text-primary mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-sm font-semibold text-primary mb-2">Key Features</h4>
              <ul className="space-y-2">
                {selected.features.map((f, i) => (
                  <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
