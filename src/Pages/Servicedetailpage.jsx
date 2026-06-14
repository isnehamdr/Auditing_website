import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "../data/servicedata.json"; // Import the JSON data

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ─── Icons ─────────────────────────────────────────────────────────────────
const DotIcon = () => (<svg width="8" height="8" viewBox="0 0 8 8" fill="#3b82f6"><circle cx="4" cy="4" r="4" /></svg>);
const CartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" /></svg>);
const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ title, description }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    gsap.fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={heroRef} className="w-full bg-blue-50 py-16 px-6 text-center min-h-[450px]">
      <h1 ref={titleRef} className="text-4xl md:text-5xl font-light text-gray-900 mb-4 mt-24">{title}</h1>
      <p ref={descRef} className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto">{description}</p>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ links }) {
  const sidebarRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(sidebarRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );

    // Stagger animation for sidebar items
    itemsRef.current.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: index * 0.08, ease: "power2.out" }
      );
    });
  }, [links]);

  return (
    <aside 
      ref={sidebarRef} 
      className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 lg:self-start"
    >
      <ul className="flex flex-col divide-y divide-gray-100 overflow-hidden bg-white rounded-lg shadow-sm">
        {links.map((item, idx) => (
          <li 
            key={item.id} 
            ref={el => itemsRef.current[idx] = el}
          >
            <Link 
              to={`/service-page/${item.slug}`} 
              className={`w-full flex items-center justify-between px-5 py-3.5 text-xl transition-all duration-300 ${
                item.active 
                  ? "bg-blue-50 text-blue-600 font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              <span>{item.label}</span>
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                item.active 
                  ? "border-blue-400 text-blue-600 bg-blue-100" 
                  : "border-gray-300 text-gray-400"
              } ${item.active ? "scale-110" : ""}`}>
                <ChevronRightIcon />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ─── Main Content ──────────────────────────────────────────────────────────
function MainContent({ service }) {
  const { detail } = service;
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Image animation
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }
    );

    // Intro paragraph animation
    gsap.fromTo(introRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );

    // Section title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.4, ease: "power2.out" }
    );

    // Section paragraph animation
    gsap.fromTo(paragraphRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
    );
  }, [service]);

  return (
    <div ref={contentRef} className="flex-1 min-w-0">
      <div className="w-full rounded-xl overflow-hidden mb-6">
        <img ref={imageRef} src={detail.featureImage} alt={service.title} className="w-full h-72 md:h-96 object-cover" />
      </div>
      <p ref={introRef} className="text-gray-900 text-lg mb-8">{detail.introParagraph}</p>
      <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{detail.sectionTitle}</h2>
      <p ref={paragraphRef} className="text-gray-900 text-lg mb-10">{detail.sectionParagraph}</p>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  // Extract the slug from the URL parameters
  const { slug } = useParams();
  
  // Find the specific service data based on the slug
  const service = servicesData.find(s => s.slug === slug);
  
  // Refs for page transitions
  const pageRef = useRef(null);
  const containerRef = useRef(null);

  // Handle case where slug doesn't match any service
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Service Not Found</h1>
      </div>
    );
  }

  // Generate sidebar links dynamically and mark the current one as active
  const sidebarLinks = servicesData.map(s => ({
    id: s.id,
    label: s.title,
    slug: s.slug,
    active: s.slug === slug
  }));

  // Page transition animation when slug changes
  useEffect(() => {
    // Animate content fade-in when service changes
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [slug]);

  return (
    <div ref={pageRef} className="min-h-screen bg-white font-sans">
      <Hero title={service.title} description={service.detail.heroDescription} />
      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-16 py-14 flex flex-col lg:flex-row gap-10">
        <Sidebar links={sidebarLinks} />
        <MainContent service={service} />
      </div>
    </div>
  );
}