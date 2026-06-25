import { useState, useRef, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import servicesData from "../data/servicedata.json"; // Local fallback data

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

// Builds a safe image URL: handles a missing/empty path, an already-absolute
// URL (e.g. a local JSON fallback using a real https URL), and Laravel's
// "/storage/" public-disk convention.
function getImageUrl(path) {
  if (!path) return PLACEHOLDER_IMAGE;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return path; // local public asset

  const base = (IMAGE_BASE_URL || "").replace(/\/+$/, "");
  let cleanPath = String(path).replace(/^\/+/, "");
  const baseHasStorage = /\/storage$/i.test(base);
  const pathHasStorage = /^storage\//i.test(cleanPath);
  if (!baseHasStorage && !pathHasStorage) {
    cleanPath = `storage/${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
}

// Normalizes a raw API service record (or a local JSON record) into the
// shape this page expects: { id, title, slug, detail: {...} }
function normalizeService(raw) {
  const existingDetail = raw.detail ?? {};
  return {
    id: raw.id,
    title: raw.title ?? raw.name ?? "",
    slug: raw.slug ?? String(raw.id ?? ""),
    is_active: raw.is_active,
    order: raw.order,
    detail: {
      heroDescription:
        existingDetail.heroDescription ?? raw.hero_description ?? raw.description ?? "",
      featureImage:
        existingDetail.featureImage ?? raw.feature_image ?? raw.image ?? raw.photo ?? "",
      introParagraph:
        existingDetail.introParagraph ?? raw.intro_paragraph ?? raw.intro ?? "",
      sectionTitle: existingDetail.sectionTitle ?? raw.section_title ?? "",
      sectionParagraph:
        existingDetail.sectionParagraph ?? raw.section_paragraph ?? raw.content ?? "",
    },
  };
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ title, description }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

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
      <h2 ref={titleRef} className="text-4xl md:text-5xl font-light text-gray-900 mb-4 mt-24">{title}</h2>
      <p ref={descRef} className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto">{description}</p>
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

      // Stagger animation for sidebar items
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
  const { detail } = service;
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const introRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });
    return () => ctx.revert();
  }, [service]);

  return (
    <div ref={contentRef} className="flex-1 min-w-0">
      <div className="w-full rounded-xl overflow-hidden mb-6">
        <img
          ref={imageRef}
          src={getImageUrl(detail.featureImage)}
          alt={service.title}
          className="w-full h-72 md:h-96 object-cover"
          onError={(e) => {
            if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
              e.currentTarget.src = PLACEHOLDER_IMAGE;
            }
          }}
        />
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

  // Seed with the local JSON (normalized) so the page never renders blank
  // while the API call is in flight or if it fails.
  const [allServices, setAllServices] = useState(() => servicesData.map(normalizeService));
  const [loading, setLoading] = useState(true);

  // Refs for page transitions
  const pageRef = useRef(null);
  const containerRef = useRef(null);

  // Fetch the full service list from the API (same backend the admin panel
  // and the Services listing page use) so this page reflects live content,
  // including any service that only exists in the database, not the JSON.
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/service`);
        const data = response.data?.data?.data ?? response.data?.data ?? [];
        const normalized = data.map(normalizeService);

        if (normalized[0]) {
          // Temporary debug log — remove once confirmed working.
          console.log("Sample service detail from API:", normalized[0]);
        }

        const activeServices = normalized.filter(
          (s) => s.is_active === 1 || s.is_active === true || s.is_active === undefined
        );

        // Only replace the local fallback if the API actually returned data.
        if (activeServices.length > 0) {
          setAllServices(activeServices);
        }
      } catch (error) {
        console.error("fetching error", error);
        // Keep the local JSON fallback on failure.
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Find the specific service for the current slug from whichever data set
  // is currently loaded (API once it arrives, local JSON until then).
  const service = allServices.find((s) => s.slug === slug) ?? null;

  // Generate sidebar links dynamically and mark the current one as active
  const sidebarLinks = allServices.map((s) => ({
    id: s.id,
    label: s.title,
    slug: s.slug,
    active: s.slug === slug,
  }));

  // Page transition animation when slug or the loaded service changes.
  // Hooks must always run in the same order, so this stays above any
  // conditional "not found" return below.
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

  // Still loading and we don't have a local-JSON match yet either —
  // show a loading state instead of jumping straight to "Not Found".
  if (!service && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading service...</p>
      </div>
    );
  }

  // Loading finished and nothing matched this slug in either data set.
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-800">Service Not Found</h2>
      </div>
    );
  }

  // JSON-LD Schema Markup for Service Detail Page
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.detail.heroDescription,
    "provider": {
      "@type": "ProfessionalService",
      "name": "P Sandeep CA",
      "url": "https://psandeepca.com/"
    },
    "url": `https://psandeepca.com/service-page/${service.slug}`,
    "about": {
      "@type": "Thing",
      "name": service.title,
      "description": service.detail.introParagraph
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.title} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "name": service.title,
          "description": service.detail.introParagraph
        }
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    },
    "serviceType": "Accounting & Financial Advisory"
  };

  // Breadcrumb Schema
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

  // Organization Schema
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
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.2096",
      "longitude": "83.9856"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/psandeepca",
      "https://www.linkedin.com/company/psandeepca",
      "https://twitter.com/psandeepca",
      "https://www.instagram.com/psandeepca/"
    ]
  };

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{service.title} | P Sandeep CA - Professional Accounting Services</title>
        <meta name="title" content={`${service.title} | P Sandeep CA - Professional Accounting Services`} />
        <meta name="description" content={service.detail.heroDescription} />
        <meta name="keywords" content={`${service.title}, Accounting Services, Tax Consulting, Financial Advisory, CA Services, P Sandeep CA`} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="P Sandeep CA" />
        <meta name="copyright" content="P Sandeep CA" />
        
        {/* Canonical Tag */}
        <link rel="canonical" href={`https://psandeepca.com/service-page/${service.slug}`} />

        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://psandeepca.com/service-page/${service.slug}`} />
        <meta property="og:title" content={`${service.title} | P Sandeep CA - Professional Accounting Services`} />
        <meta property="og:description" content={service.detail.heroDescription} />
        <meta property="og:image" content={getImageUrl(service.detail.featureImage)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://psandeepca.com/service-page/${service.slug}`} />
        <meta name="twitter:title" content={`${service.title} | P Sandeep CA - Professional Accounting Services`} />
        <meta name="twitter:description" content={service.detail.heroDescription} />
        <meta name="twitter:image" content={getImageUrl(service.detail.featureImage)} />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Pokhara" />
        <meta name="geo.position" content="28.2096;83.9856" />
        <meta name="ICBM" content="28.2096, 83.9856" />

        {/* Schema Markup - JSON-LD */}
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

      {/* YOUR EXISTING UI - UNCHANGED */}
      <div ref={pageRef} className="min-h-screen bg-white font-sans">
        <Hero title={service.title} description={service.detail.heroDescription} />
        <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-16 py-14 flex flex-col lg:flex-row gap-10">
          <Sidebar links={sidebarLinks} />
          <MainContent service={service} />
        </div>
      </div>
    </>
  );
}