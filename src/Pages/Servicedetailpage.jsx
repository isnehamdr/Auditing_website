import { useState, useRef, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_PATH;

// ─── Icons ─────────────────────────────────────────────────────────────────
const DotIcon = () => (<svg width="8" height="8" viewBox="0 0 8 8" fill="#3b82f6"><circle cx="4" cy="4" r="4" /></svg>);
const CartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" /></svg>);
const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);

// Inline SVG fallback — always renders even if no real file exists on disk.
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'>
       <rect width='400' height='250' fill='#e5e7eb'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='18' font-family='sans-serif'>No image</text>
     </svg>`
  );

// Builds a safe image URL
// function getImageUrl(path) {
//   if (!path) return PLACEHOLDER_IMAGE;
//   if (/^https?:\/\//i.test(path)) return path;
//   if (path.startsWith("/")) return path;

//   const base = (IMAGE_BASE_URL || "").replace(/\/+$/, "");
//   let cleanPath = String(path).replace(/^\/+/, "");
//   const baseHasStorage = /\/storage$/i.test(base);
//   const pathHasStorage = /^storage\//i.test(cleanPath);
//   if (!baseHasStorage && !pathHasStorage) {
//     cleanPath = `storage/${cleanPath}`;
//   }
//   return `${base}/${cleanPath}`;
// }

function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${IMAGE_BASE_URL}/${path}`;
}

// Normalizes API service record
function normalizeService(raw) {
  return {
    id: raw.id,
    title: raw.title || "",
    slug: raw.slug || String(raw.id || ""),
    is_active: raw.is_active,
    sort_order: raw.sort_order || 0,
    short_description: raw.short_description || "",
    description: raw.description || "",
    detail: raw.detail || "", // HTML content from admin
    icon: raw.icon || "",
    image: raw.image || "",
  };
}

// ─── HTML Parser Utility ──────────────────────────────────────────────
function parseHTMLToReact(htmlString, className = "") {
  if (!htmlString) return null;
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  
  // Process child nodes recursively
  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes).map(child => processNode(child));
      const tagName = node.tagName.toLowerCase();
      const attributes = {};
      
      // Get all attributes
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        attributes[attr.name] = attr.value;
      }
      
      // Map HTML elements to React components with styling
      switch (tagName) {
        case 'p':
          return <p className={`text-gray-500 text-lg md:text-xl max-w-lg mx-auto ${className}`}>{children}</p>;
        case 'h1':
          return <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">{children}</h1>;
        case 'h2':
          return <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-3">{children}</h2>;
        case 'h3':
          return <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">{children}</h3>;
        case 'h4':
          return <h4 className="text-xl md:text-2xl font-light text-gray-900 mb-2">{children}</h4>;
        case 'h5':
          return <h5 className="text-lg md:text-xl font-light text-gray-900 mb-1">{children}</h5>;
        case 'h6':
          return <h6 className="text-base md:text-lg font-light text-gray-900 mb-1">{children}</h6>;
        case 'strong':
        case 'b':
          return <strong className="font-semibold text-gray-700">{children}</strong>;
        case 'em':
        case 'i':
          return <em className="italic text-gray-600">{children}</em>;
        case 'span':
          return <span className={attributes.class || "text-gray-500"}>{children}</span>;
        case 'br':
          return <br />;
        case 'hr':
          return <hr className="my-4 border-gray-200" />;
        case 'ul':
          return <ul className="list-disc list-inside text-gray-500 text-lg md:text-xl max-w-lg mx-auto text-left">{children}</ul>;
        case 'ol':
          return <ol className="list-decimal list-inside text-gray-500 text-lg md:text-xl max-w-lg mx-auto text-left">{children}</ol>;
        case 'li':
          return <li className="text-gray-500 text-lg md:text-xl">{children}</li>;
        case 'a':
          return <a href={attributes.href} className="text-blue-500 hover:text-blue-700 underline" target={attributes.target || '_self'}>{children}</a>;
        case 'div':
          return <div className={attributes.class || "text-gray-500"}>{children}</div>;
        case 'section':
          return <section className={attributes.class || "text-gray-500"}>{children}</section>;
        case 'article':
          return <article className={attributes.class || "text-gray-500"}>{children}</article>;
        case 'header':
          return <header className={attributes.class || "text-gray-500"}>{children}</header>;
        case 'footer':
          return <footer className={attributes.class || "text-gray-500"}>{children}</footer>;
        case 'main':
          return <main className={attributes.class || "text-gray-500"}>{children}</main>;
        case 'blockquote':
          return <blockquote className="border-l-4 border-blue-400 pl-4 my-2 text-gray-600">{children}</blockquote>;
        case 'pre':
          return <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-gray-700">{children}</pre>;
        case 'code':
          return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-700">{children}</code>;
        case 'img':
          return <img src={attributes.src} alt={attributes.alt || ''} className="max-w-full h-auto rounded-lg my-4" />;
        case 'table':
          return <table className="min-w-full divide-y divide-gray-200 my-4">{children}</table>;
        case 'thead':
          return <thead className="bg-gray-50">{children}</thead>;
        case 'tbody':
          return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>;
        case 'tr':
          return <tr>{children}</tr>;
        case 'th':
          return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{children}</th>;
        case 'td':
          return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{children}</td>;
        default:
          return <span className="text-gray-500">{children}</span>;
      }
    }
    return null;
  };
  
  return processNode(tempDiv);
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ title, description }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [parsedDescription, setParsedDescription] = useState(null);

  useEffect(() => {
    // Parse HTML description when it changes
    if (description) {
      const parsed = parseHTMLToReact(description);
      setParsedDescription(parsed);
    }
  }, [description]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [title, description]);

  return (
    <div ref={heroRef} className="w-full bg-blue-50 py-16 px-6 text-center min-h-[450px]">
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-light text-gray-900 mb-4 mt-24">
        {title}
      </h2>
      <div ref={descRef} className="max-w-lg mx-auto">
        {parsedDescription || (
          <p className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto">{description}</p>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ links }) {
  const sidebarRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sidebarRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, delay: index * 0.08, ease: "power2.out" }
        );
      });
    });
    return () => ctx.revert();
  }, [links]);

  return (
    <aside 
      ref={sidebarRef} 
      className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-24 lg:self-start"
    >
      <ul className="flex flex-col divide-y divide-gray-100 overflow-hidden bg-white rounded-lg shadow-sm">
        {links.map((item, idx) => (
          <li 
            key={item.id ?? item.slug ?? idx} 
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
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }
      );

      // Content animation
      gsap.fromTo(contentWrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [service]);

  return (
    <div ref={contentRef} className="flex-1 min-w-0">
      {/* Image */}
      <div className="w-full rounded-xl overflow-hidden mb-6">
        <img
          ref={imageRef}
          src={getImageUrl(service.image)}
          alt={service.title}
          className="w-full h-72 md:h-96 object-cover"
          onError={(e) => {
            if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
              e.currentTarget.src = PLACEHOLDER_IMAGE;
            }
          }}
        />
      </div>

      {/* Render detail HTML content from admin */}
      <div 
        ref={contentWrapperRef}
        className="prose prose-lg max-w-none leading-relaxed text-gray-900 prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md text-lg sm:text-xl"
        dangerouslySetInnerHTML={{ __html: service.detail || service.description || service.short_description || '' }}
      />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/service`);
        const data = response.data?.data?.data ?? response.data?.data ?? [];
        const normalized = data.map(normalizeService);
        
        // Filter active services
        const activeServices = normalized.filter(
          (s) => s.is_active === 1 || s.is_active === true
        );
        
        setServices(activeServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Find the specific service for the current slug
  const service = services.find((s) => s.slug === slug) || null;

  // Generate sidebar links dynamically
  const sidebarLinks = services.map((s) => ({
    id: s.id,
    label: s.title,
    slug: s.slug,
    active: s.slug === slug,
  }));

  // Page transition animation
  useEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [slug, service]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading service...</p>
      </div>
    );
  }

  // Service not found
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Service Not Found</h2>
      </div>
    );
  }

  // Get hero description from short_description or description
  const heroDescription = service.short_description || service.description || "";

  // JSON-LD Schema Markup
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": heroDescription,
    "provider": {
      "@type": "ProfessionalService",
      "name": "P Sandeep CA",
      "url": "https://psandeepca.com/"
    },
    "url": `https://psandeepca.com/service-page/${service.slug}`,
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    },
    "serviceType": "Accounting & Financial Advisory"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://psandeepca.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://psandeepca.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://psandeepca.com/service-page/${service.slug}`
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "P Sandeep CA",
    "description": "Leading CA firm providing accounting, tax consulting, financial advisory, and audit services.",
    "url": "https://psandeepca.com/",
    "telephone": "+977-61-450488",
    "email": "info@psandeepca.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pokhara-7, Masbar",
      "addressLocality": "Pokhara",
      "addressRegion": "Gandaki",
      "addressCountry": "Nepal"
    }
  };

  return (
    <>
      <Helmet>
        <title>{service.title} | P Sandeep CA - Professional Accounting Services</title>
        <meta name="title" content={`${service.title} | P Sandeep CA - Professional Accounting Services`} />
        <meta name="description" content={heroDescription} />
        <meta name="keywords" content={`${service.title}, Accounting Services, Tax Consulting, Financial Advisory, CA Services, P Sandeep CA`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://psandeepca.com/service-page/${service.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://psandeepca.com/service-page/${service.slug}`} />
        <meta property="og:title" content={`${service.title} | P Sandeep CA - Professional Accounting Services`} />
        <meta property="og:description" content={heroDescription} />
        <meta property="og:image" content={getImageUrl(service.image)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${service.title} | P Sandeep CA - Professional Accounting Services`} />
        <meta name="twitter:description" content={heroDescription} />
        <meta name="twitter:image" content={getImageUrl(service.image)} />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* Page Content */}
      <div className="min-h-screen bg-white font-sans">
        <Hero title={service.title} description={heroDescription} />
        <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-16 py-14 flex flex-col lg:flex-row gap-10">
          <Sidebar links={sidebarLinks} />
          <MainContent service={service} />
        </div>
      </div>
    </>
  );
}