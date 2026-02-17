import { Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-3">Avaiza Shahid</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Software Engineering Student & Flutter Developer. Building scalable and elegant mobile solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-primary">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-left text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-primary">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/avaiza-shahid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/Avaiza123" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Github size={18} />
              </a>
              <a href="mailto:avaizashahid@gmail.com" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} <span className="text-primary">Avaiza Shahid</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
