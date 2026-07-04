import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Github, Star, GitFork, BookMarked, Users, ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/effects/TiltCard";

interface GhUser {
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  created_at: string;
  html_url: string;
}

interface GhRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  pushed_at: string;
}

// Sensible fallback snapshot (fetched at build time) in case the API is
// rate-limited or the visitor is offline — keeps the section from looking broken.
const FALLBACK_USER: GhUser = {
  avatar_url: "https://avatars.githubusercontent.com/u/122295858?v=4",
  bio: "Software Engineer | Flutter & Full-Stack Developer | Passionate about building clean, scalable, and user-friendly apps | Open Source Enthusiast",
  public_repos: 13,
  followers: 0,
  created_at: "2023-01-09T15:59:34Z",
  html_url: "https://github.com/Avaiza123",
};

const FALLBACK_REPOS: GhRepo[] = [
  { id: 1, name: "GoalMate", html_url: "https://github.com/Avaiza123/GoalMate", description: "Flutter goal-tracking app with Firebase Auth, Firestore, and GetX.", language: "Dart", stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2025-08-05" },
  { id: 2, name: "Well_Serve_Enterprises", html_url: "https://github.com/Avaiza123/Well_Serve_Enterprises", description: null, language: "TypeScript", stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2026-01-14" },
  { id: 3, name: "AI_Posture_Detector", html_url: "https://github.com/Avaiza123/AI_Posture_Detector", description: null, language: "Python", stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2026-03-04" },
  { id: 4, name: "PakWheels-Selenium-WebDriver-Test", html_url: "https://github.com/Avaiza123/PakWheels-Selenium-WebDriver-Test", description: null, language: "Java", stargazers_count: 0, forks_count: 0, fork: false, pushed_at: "2026-05-29" },
];

const languageColors: Record<string, string> = {
  Dart: "#00B4AB",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

const GitHubStatsSection = () => {
  const [user, setUser] = useState<GhUser>(FALLBACK_USER);
  const [repos, setRepos] = useState<GhRepo[]>(FALLBACK_REPOS);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch("https://api.github.com/users/Avaiza123"),
          fetch("https://api.github.com/users/Avaiza123/repos?per_page=100&sort=pushed"),
        ]);
        if (uRes.ok) {
          const u = await uRes.json();
          if (!cancelled) setUser(u);
        }
        if (rRes.ok) {
          const r: GhRepo[] = await rRes.json();
          if (!cancelled && Array.isArray(r)) {
            setRepos(r.filter((repo) => !repo.fork).slice(0, 6));
          }
        }
      } catch {
        // Silent fallback — FALLBACK_USER / FALLBACK_REPOS already in state.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const languageCounts = repos.reduce<Record<string, number>>((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});
  const totalLangs = Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1;
  const topLanguages = Object.entries(languageCounts).sort((a, b) => b[1] - a[1]);

  const memberSince = new Date(user.created_at).getFullYear();
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  return (
    <section id="github" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-4">
          <span className="section-label">Open Source</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Live from <span className="gradient-text">GitHub</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
          Pulled live from the GitHub API — this is exactly what's on my profile right now.
        </p>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Profile + stat tiles */}
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4">
              <img src={user.avatar_url} alt="Avaiza Shahid GitHub avatar" className="h-16 w-16 rounded-full border border-primary/30" />
              <div>
                <p className="font-semibold">Avaiza123</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  View profile <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{user.bio}</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-primary">
                  <BookMarked size={14} /> <Counter value={user.public_repos} />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Repos</p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-primary">
                  <Star size={14} /> <Counter value={totalStars} />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Stars</p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-primary">
                  <Users size={14} /> <Counter value={user.followers} />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">Followers</p>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] text-muted-foreground">On GitHub since {memberSince}</p>

            {/* Language breakdown */}
            {topLanguages.length > 0 && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold text-primary">Top languages (recent repos)</p>
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-secondary/40">
                  {topLanguages.map(([lang, count]) => (
                    <div
                      key={lang}
                      style={{
                        width: `${(count / totalLangs) * 100}%`,
                        backgroundColor: languageColors[lang] || "hsl(var(--primary))",
                      }}
                      title={lang}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {topLanguages.map(([lang]) => (
                    <span key={lang} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: languageColors[lang] || "hsl(var(--primary))" }}
                      />
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Repo grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {repos.slice(0, 4).map((repo) => (
              <TiltCard key={repo.id} maxTilt={4}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group flex h-full flex-col rounded-2xl glass-panel glass-panel-hover p-5 transition-all duration-300"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Github size={14} className="text-primary" />
                    <span className="truncate text-sm font-semibold">{repo.name}</span>
                    <ArrowUpRight size={13} className="ml-auto text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mb-4 line-clamp-2 flex-1 text-xs text-muted-foreground">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: languageColors[repo.language] || "hsl(var(--primary))" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              </TiltCard>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GitHubStatsSection;
