import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Github, Mail, ExternalLink } from "lucide-react";

const contactLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    description: "Connect with me professionally",
    href: "https://www.linkedin.com/in/avaiza-shahid",
    color: "from-[hsl(210,80%,50%)] to-[hsl(210,80%,40%)]",
  },
  {
    icon: Github,
    label: "GitHub",
    description: "Check out my repositories",
    href: "https://github.com/Avaiza123",
    color: "from-[hsl(0,0%,30%)] to-[hsl(0,0%,20%)]",
  },
  {
    icon: Mail,
    label: "Email",
    description: "Send me a message directly",
    href: "mailto:avaizashahid@gmail.com",
    color: "from-[hsl(193,100%,40%)] to-[hsl(199,89%,38%)]",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Let's connect and build something amazing together
        </p>

        <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card neon-border neon-glow-hover neon-border-hover p-6 text-center hover:scale-[1.05] transition-all duration-300 group block"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <link.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-base mb-1">{link.label}</h3>
              <p className="text-muted-foreground text-xs mb-3">{link.description}</p>
              <span className="inline-flex items-center gap-1 text-primary text-xs font-medium">
                Open <ExternalLink size={12} />
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
