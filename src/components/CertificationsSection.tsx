import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { X } from "lucide-react";

// Import certificate images
import certACMHead from "../assets/certificates/cert-acm head.png";
import certACM404 from "../assets/certificates/cert-acm404.png";
import certACMMembership from "../assets/certificates/cert-acm-membership.png";
import certAmbassador from "../assets/certificates/cert-ambassador.png";
import certFlutter from "../assets/certificates/cert-flutter.png";
import certGoogleAI from "../assets/certificates/cert-google-ai.png";
import certGoogleData from "../assets/certificates/cert-google-data.png";
import certGoogleData1 from "../assets/certificates/cert-google-data1.png";
import certGoogleData2 from "../assets/certificates/cert-google-data2.png";
import certGoogleData3 from "../assets/certificates/cert-google-data3.png";
import certGraphic from "../assets/certificates/cert-graphic.png";
import certGreatLearning from "../assets/certificates/cert-greatlearning.png";
import certHashtag from "../assets/certificates/cert-hastag.png";
import certHPE from "../assets/certificates/cert-hpe.png";
import certIBM from "../assets/certificates/cert-ibm.png";
import certJavaFX from "../assets/certificates/cert-javafx.png";
import certJavaFX2 from "../assets/certificates/cert-javafx2.png";
import certLinkedIn from "../assets/certificates/cert-linkedin.png";
import certOpenWeaver from "../assets/certificates/cert-openweaver.png";
import certParticipant from "../assets/certificates/cert-participant.png";
import certPixel from "../assets/certificates/cert-pixel.png";
import certPUCon from "../assets/certificates/cert-pucon.png";
import certPythonCrash from "../assets/certificates/cert-python-crash.png";
import certPythonUST from "../assets/certificates/cert-python-ust.png";
import certReact from "../assets/certificates/cert-react.png";
import certScientia from "../assets/certificates/cert-scientia.png";
import certSnap from "../assets/certificates/cert-snap.png";
import certWordPress from "../assets/certificates/cert-wordpress.png";

const certifications = [
  // 🔹 TECHNICAL
  { id: "flutter", category: "technical", title: "Flutter Apps (Web, Mobile & Desktop)", issuer: "Punjab Higher Education Commission", image: certFlutter, description: "Issued Jun 2025." },
  { id: "google-ai", category: "technical", title: "Maximize Productivity With AI Tools", issuer: "Google", image: certGoogleAI, description: "Issued Jun 2025." },
  { id: "google-data", category: "technical", title: "Google Data Analytics Capstone", issuer: "Google", image: certGoogleData, description: "Issued Jul 2023." },
  { id: "google-data1", category: "technical", title: "Foundations: Data, Data Everywhere", issuer: "Google", image: certGoogleData1, description: "Issued Dec 2023." },
  { id: "google-data2", category: "technical", title: "Ask Questions to Make Data-Driven Decisions", issuer: "Google", image: certGoogleData2, description: "Issued Jan 2024." },
  { id: "google-data3", category: "technical", title: "Google Data Analytics Case Study", issuer: "Google", image: certGoogleData3, description: "Issued Jul 2023." },
  { id: "python-crash", category: "technical", title: "Crash Course on Python", issuer: "Google", image: certPythonCrash, description: "Issued Feb 2023." },
  { id: "python-ust", category: "technical", title: "Create Your First Python Program", issuer: "UST / Coursera", image: certPythonUST, description: "Issued Feb 2023." },
  { id: "react", category: "technical", title: "React.js Course", issuer: "LetsUpgrade", image: certReact, description: "Issued Aug 2024." },
  { id: "javafx", category: "technical", title: "Starting GUI Programming with JavaFX", issuer: "Coursera", image: certJavaFX, description: "Issued May 2023." },
  { id: "javafx2", category: "technical", title: "Use Menus to Process Simple Personal Data in JavaFX", issuer: "Coursera", image: certJavaFX2, description: "Issued May 2023." },
  { id: "wordpress", category: "technical", title: "WordPress Web Development Course", issuer: "Learning With Earning", image: certWordPress, description: "Issued Aug 2023." },
  { id: "ibm", category: "technical", title: "What is Data Science?", issuer: "IBM", image: certIBM, description: "Issued Mar 2023." },
  { id: "hpe", category: "technical", title: "Cloud-Based Network Design", issuer: "HPE Aruba Networking", image: certHPE, description: "Issued Mar 2023." },
  { id: "openweaver", category: "technical", title: "Introduction to Programming Using Python", issuer: "Open Weaver", image: certOpenWeaver, description: "Issued Jan 2023." },
  { id: "graphic", category: "technical", title: "Graphic Designing Course", issuer: "Learning With Earning", image: certGraphic, description: "Issued Aug 2023." },
  { id: "greatlearning", category: "technical", title: "Flutter Course", issuer: "Great Learning", image: certGreatLearning, description: "Issued Oct 2024." },
  { id: "linkedin", category: "technical", title: "Content & Creative Design Certification", issuer: "LinkedIn Learning", image: certLinkedIn, description: "Issued Aug 2025." },
  { id: "snap", category: "technical", title: "Snapchat Lens Studio Workshop", issuer: "Snap Inc.", image: certSnap, description: "Issued Jul 2023." },

  // 🔹 LEADERSHIP
  { id: "acm-head", category: "leadership", title: "Head Certificate", issuer: "ACM CUI", image: certACMHead, description: "Leadership role as Head of ACM squad." },
  { id: "acm-404", category: "leadership", title: "ACM 404 Squad Certificate", issuer: "ACM CUI", image: certACM404, description: "Contribution to ACM 404 squad events." },
  { id: "acm-membership", category: "leadership", title: "ACM Membership", issuer: "ACM CUI", image: certACMMembership, description: "Active member of ACM Student Chapter." },
  { id: "ambassador", category: "leadership", title: "Ambassador", issuer: "UET Science Society", image: certAmbassador, description: "Recognized as an ambassador." },
  { id: "participant", category: "leadership", title: "Participant", issuer: "UET Science Society", image: certParticipant, description: "Issued Jul 2025." },
  { id: "pixel", category: "leadership", title: "Certificate of Appreciation", issuer: "Pixel Pioneers", image: certPixel, description: "Issued for contributions." },
  { id: "pucon", category: "leadership", title: "Campus Ambassador", issuer: "PUCon '25", image: certPUCon, description: "Issued Jun 2023." },
  { id: "scientia", category: "leadership", title: "Scientia Spectrum 2025", issuer: "UET Science Society", image: certScientia, description: "Issued Oct 2025." },
  { id: "hashtag", category: "leadership", title: "Certificate of Appreciation", issuer: "Hashtag Heroes", image: certHashtag, description: "Issued for contributions." },
];
const CertificationsSection = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<"technical" | "leadership" | "all">("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filteredCerts = certifications.filter(
    (c) => filter === "all" || c.category === filter
  );

  const cert = certifications.find((c) => c.id === selected);

  const handleCardClick = (id: string) => {
    // toggle modal
    setSelected((prev) => (prev === id ? null : id));
  };

  return (
    <section id="certifications" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="gradient-text">Certifications</span>
        </h2>

        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Professional achievements and recognitions
        </p>

        {/* Toggle Buttons */}
        {/* Toggle Buttons */}
<div className="flex justify-center gap-4 mb-12">
  <button
    onClick={() => setFilter("technical")}
    className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 transform border ${
      filter === "technical"
        ? "bg-primary text-background font-bold shadow-xl scale-105"
        : "bg-background/20 text-primary border-primary/50 hover:shadow-md hover:scale-[1.03]"
    }`}
  >
    Technical
  </button>

  <button
    onClick={() => setFilter("leadership")}
    className={`px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 transform border ${
      filter === "leadership"
        ? "bg-primary text-background font-bold shadow-xl scale-105"
        : "bg-background/20 text-primary border-primary/50 hover:shadow-md hover:scale-[1.03]"
    }`}
  >
    Leadership
  </button>
</div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {filteredCerts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + i * 0.03 }}
              onClick={() => handleCardClick(c.id)}
              className="glass-card neon-border neon-glow-hover neon-border-hover overflow-hidden cursor-pointer hover:scale-[1.03] transition-all duration-300 group"
            >
              <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-background/10 p-2">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
                <p className="text-primary/70 text-xs">{c.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card neon-border neon-glow p-0 max-w-md w-full relative overflow-hidden"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>

            <img
              src={cert.image}
              alt={cert.title}
              className="w-full aspect-[4/3] object-contain"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
              <p className="text-primary text-sm mb-3">{cert.issuer}</p>
              <p className="text-foreground/80 text-sm">{cert.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default CertificationsSection;