import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Sparkles,
  Award,
  Mail,
  Github,
  Linkedin,
  Copy,
  FileDown,
  Command as CommandIcon,
} from "lucide-react";
import { toast } from "sonner";

const sectionLinks = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: FolderGit2, label: "Projects", href: "#projects" },
  { icon: Briefcase, label: "Experience", href: "#experience" },
  { icon: Sparkles, label: "Skills", href: "#skills" },
  { icon: Github, label: "GitHub", href: "#github" },
  { icon: Award, label: "Certifications", href: "#certifications" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const goTo = (href: string) => {
    setOpen(false);
    // Ensure we're on the homepage before scrolling to an in-page anchor.
    if (window.location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const openExternal = (url: string) => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyEmail = () => {
    setOpen(false);
    navigator.clipboard.writeText("avaizashahid@gmail.com");
    toast.success("Email copied to clipboard");
  };

  const downloadResume = async () => {
    setOpen(false);
    try {
      const res = await fetch("/resume.pdf", { method: "HEAD" });
      if (!res.ok) throw new Error("missing");
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Avaiza-Shahid-Resume.pdf";
      link.click();
    } catch {
      toast.info("Add resume.pdf to /public to enable this download.");
    }
  };

  return (
    <>
      {/* Discreet trigger, useful for touch users who can't press ⌘K */}
      <button
        onClick={() => setOpen(true)}
        data-cursor="link"
        data-cursor-label="Search"
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-full glass-panel px-4 py-2.5 text-xs text-muted-foreground transition-all duration-300 hover:text-primary hover:border-primary/40"
      >
        <CommandIcon size={14} />
        <span>Quick nav</span>
        <kbd className="ml-1 rounded border border-border/60 bg-secondary/80 px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, open a profile, or copy my email…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {sectionLinks.map((s) => (
              <CommandItem key={s.href} onSelect={() => goTo(s.href)}>
                <s.icon className="mr-2 h-4 w-4" />
                <span>{s.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Connect">
            <CommandItem onSelect={() => openExternal("https://github.com/Avaiza123")}>
              <Github className="mr-2 h-4 w-4" />
              <span>Open GitHub profile</span>
            </CommandItem>
            <CommandItem onSelect={() => openExternal("https://www.linkedin.com/in/avaiza-shahid/")}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>Open LinkedIn profile</span>
            </CommandItem>
            <CommandItem onSelect={copyEmail}>
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy email address</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={downloadResume}>
              <FileDown className="mr-2 h-4 w-4" />
              <span>Download résumé</span>
              <CommandShortcut>PDF</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandPalette;
