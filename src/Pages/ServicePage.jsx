import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "../data/servicedata.json";

gsap.registerPlugin(ScrollTrigger);

// ─── Icons (inline SVG) ────────────────────────────────────────────────────
const PencilIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" /></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a2 2 0 100-4 2 2 0 000 4zM3 18a2 2 0 100-4 2 2 0 000 4z" /></svg>);
const CogIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const GlobeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>);
const BookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>);
const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);

// Map string icon names from JSON to actual React components
const iconMap = {
  pencil: <PencilIcon />,
  users: <UsersIcon />,
  cog: <CogIcon />,
  globe: <GlobeIcon />,
  book: <BookIcon />,
  file: <FileIcon />,
};

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80')", minHeight: 450 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
        <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">Our Services</h1>
        <p ref={descRef} className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">Accounting data is often used by governments and policymakers for economic planning and analysis.</p>
      </div>
    </section>
  );
}

// ─── Service Card ──────────────────────────────────────────────────────────
function ServiceCard({ icon, title, slug, desc, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );
  }, [index]);

  const handleCardHover = (isEnter) => {
    if (isEnter) {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow: "0 20px 25px -12px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
      className="bg-white border border-gray-100 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="w-14 h-14 rounded-full bg-[#38b6ff] flex items-center justify-center mb-5">{icon}</div>
      <h3 className="text-gray-800 font-medium text-3xl mb-3">{title}</h3>
      <p className="text-gray-900 text-md mb-6">{desc}</p>
      <Link to={`/service-page/${slug}`} className="border border-gray-300 bg-blue-50 text-gray-600 hover:border-white hover:text-[#38b6ff] text-md px-5 py-3 rounded-full transition-colors duration-200">
        Learn More
      </Link>
    </div>
  );
}

// ─── Services Grid ─────────────────────────────────────────────────────────
function ServicesGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 90%", toggleActions: "play none none reverse" }
      }
    );
  }, []);

  return (
    <section className="bg-white py-16 px-6 md:px-12 overflow-hidden">
      <div ref={gridRef} className="max-w-7xl mx-auto lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((s, index) => (
          <ServiceCard key={s.id} icon={iconMap[s.icon]} title={s.title} slug={s.slug} desc={s.description} index={index} />
        ))}
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Hero />
      <ServicesGrid />
    </div>
  );
}