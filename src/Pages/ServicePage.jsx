// import { useEffect, useRef, useState } from "react";
// import { Helmet } from 'react-helmet-async';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ReactHtmlParser from 'react-html-parser';
// import servicesData from "../data/servicedata.json";

// gsap.registerPlugin(ScrollTrigger);
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_PATH;

// // ─── Icons (inline SVG) ────────────────────────────────────────────────────
// const PencilIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" /></svg>);
// const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a2 2 0 100-4 2 2 0 000 4zM3 18a2 2 0 100-4 2 2 0 000 4z" /></svg>);
// const CogIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
// const GlobeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>);
// const BookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>);
// const FileIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);

// // Map string icon names from the API/JSON to actual React components
// const iconMap = {
//   pencil: <PencilIcon />,
//   users: <UsersIcon />,
//   cog: <CogIcon />,
//   globe: <GlobeIcon />,
//   book: <BookIcon />,
//   file: <FileIcon />,
// };

// // Picks an icon component for a given icon key, falling back to a sane
// // default so a card never renders blank just because the API used an
// // icon name that isn't in iconMap yet.
// function resolveIcon(iconKey) {
//   return iconMap[iconKey] ?? iconMap.file;
// }

// // ─── Hero ──────────────────────────────────────────────────────────────────
// function Hero() {
//   const heroRef = useRef(null);
//   const titleRef = useRef(null);
//   const descRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(titleRef.current,
//         { opacity: 0, y: 40 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
//           scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
//         }
//       );

//       gsap.fromTo(descRef.current,
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
//           scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
//         }
//       );
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={heroRef} className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden flex items-center justify-center">
//       <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80')", minHeight: 450 }} />
//       <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
//       <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
//         <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">Our Services</h2>
//         <p ref={descRef} className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">Accounting data is often used by governments and policymakers for economic planning and analysis.</p>
//       </div>
//     </section>
//   );
// }

// // ─── Service Card ──────────────────────────────────────────────────────────
// function ServiceCard({ icon, title, slug, desc, index }) {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(cardRef.current,
//         { opacity: 0, y: 50, scale: 0.95 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: "power2.out",
//           scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" }
//         }
//       );
//     });

//     return () => ctx.revert();
//   }, [index]);

//   const handleCardHover = (isEnter) => {
//     if (isEnter) {
//       gsap.to(cardRef.current, {
//         y: -8,
//         boxShadow: "0 20px 25px -12px rgba(0, 0, 0, 0.15)",
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     } else {
//       gsap.to(cardRef.current, {
//         y: 0,
//         boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     }
//   };

//   return (
//     <div 
//       ref={cardRef}
//       onMouseEnter={() => handleCardHover(true)}
//       onMouseLeave={() => handleCardHover(false)}
//       className="bg-white border border-gray-100 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-200"
//     >
//       <div className="w-14 h-14 rounded-full bg-[#38b6ff] flex items-center justify-center mb-5">{icon}</div>
//       <h3 className="text-gray-800 font-medium text-3xl mb-3">{title}</h3>
//       <div className="text-gray-900 text-md sm:text-xl">
//         {ReactHtmlParser(desc)}
//       </div>
//       <Link to={`/service-page/${slug}`} className="border mt-6 border-gray-300 bg-blue-50 text-gray-600 hover:border-white hover:text-[#38b6ff] text-md px-5 py-3 rounded-full transition-colors duration-200">
//         Learn More
//       </Link>
//     </div>
//   );
// }

// // ─── Services Grid ─────────────────────────────────────────────────────────
// function ServicesGrid({ services, loading }) {
//   const gridRef = useRef(null);

//   useEffect(() => {
//     if (loading || services.length === 0) return;
//     const ctx = gsap.context(() => {
//       gsap.fromTo(gridRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 0.5, ease: "power2.out",
//           scrollTrigger: { trigger: gridRef.current, start: "top 90%", toggleActions: "play none none reverse" }
//         }
//       );
//     });
//     return () => ctx.revert();
//   }, [loading, services]);

//   return (
//     <section className="bg-white py-16 px-6 md:px-12 overflow-hidden">
//       {loading ? (
//         <p className="text-center text-gray-500">Loading services...</p>
//       ) : services.length === 0 ? (
//         <p className="text-center text-gray-500">No services found.</p>
//       ) : (
//         <div ref={gridRef} className="max-w-7xl mx-auto lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((s, index) => (
//             <ServiceCard key={s.id ?? s.slug ?? index} icon={`${IMAGE_BASE_URL}/${s.icon}`} title={s.title} slug={s.slug} desc={s.description} index={index} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// // ─── Page ──────────────────────────────────────────────────────────────────
// export default function ServicesPage() {
//   // Start with the local JSON so the page never renders empty while the
//   // API call is in flight or if it fails.
//   const [services, setServices] = useState(servicesData);
//   const [loading, setLoading] = useState(true);

//   // Fetch services from the API (same backend the admin panel uses)
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${API_BASE_URL}/service`);
//         // Handle paginated ({data:{data:[...]}}) and flat ({data:[...]}) shapes
//         const data = response.data?.data?.data ?? response.data?.data ?? [];

//         // Normalize field names in case the API differs slightly from the
//         // local JSON's shape (e.g. "name" instead of "title").
//         const normalized = data.map((service) => ({
//           ...service,
//           title: service.title ?? service.name ?? "",
//           description: service.description ?? service.desc ?? "",
//           slug: service.slug ?? String(service.id ?? ""),
//           icon: service.icon ?? "file",
//         }));

//         // if (normalized[0]) {
//           // Temporary debug log — remove once confirmed working.
//         //  console.log("Sample service from API:", normalized[0]);
//        // }

//         const activeServices = normalized
//           .filter((s) => s.is_active === 1 || s.is_active === true || s.is_active === undefined)
//           .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

//         // Only switch away from the local fallback if the API actually
//         // returned something — an empty array shouldn't blank the page.
//         if (activeServices.length > 0) {
//           setServices(activeServices);
//         }
//       } catch (error) {
//         console.error("fetching error", error);
//         // Keep the local JSON fallback on failure.
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, []);

//   console.log("Services:", services);

//   // Generate service list for schema from the current services state
//   const serviceList = services.map(service => ({
//     "@type": "Service",
//     "name": service.title,
//     "description": service.description,
//     "url": `https://psandeepca.com/service-page/${service.slug}`
//   }));

//   // JSON-LD Schema Markup for Services Page
//   const servicesSchema = {
//     "@context": "https://schema.org",
//     "@type": "Service",
//     "name": "Professional Accounting & Advisory Services",
//     "description": "Comprehensive accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA.",
//     "provider": {
//       "@type": "ProfessionalService",
//       "name": "P Sandeep CA",
//       "url": "https://psandeepca.com/"
//     },
//     "url": "https://psandeepca.com/services",
//     "hasOfferCatalog": {
//       "@type": "OfferCatalog",
//       "name": "Accounting and Financial Services",
//       "itemListElement": serviceList
//     },
//     "areaServed": {
//       "@type": "Country",
//       "name": "India"
//     }
//   };

//   // Breadcrumb Schema
//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://psandeepca.com/"
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": "Services",
//         "item": "https://psandeepca.com/services"
//       }
//     ]
//   };

//   // Organization Schema
//   const organizationSchema = {
//     "@context": "https://schema.org",
//     "@type": "AccountingService",
//     "name": "P Sandeep CA",
//     "description": "Leading CA firm providing accounting, tax consulting, financial advisory, audit, and business valuation services.",
//     "url": "https://psandeepca.com/",
//     "telephone": "+91-XXXXXXXXXX",
//     "email": "info@psandeepca.com",
//     "address": {
//       "@type": "PostalAddress",
//       "streetAddress": "Your Office Address",
//       "addressLocality": "City Name",
//       "addressRegion": "State",
//       "postalCode": "XXXXXX",
//       "addressCountry": "India"
//     },
//     "geo": {
//       "@type": "GeoCoordinates",
//       "latitude": "XX.XXXXXX",
//       "longitude": "XX.XXXXXX"
//     },
//     "openingHoursSpecification": [
//       {
//         "@type": "OpeningHoursSpecification",
//         "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
//         "opens": "09:00",
//         "closes": "18:00"
//       },
//       {
//         "@type": "OpeningHoursSpecification",
//         "dayOfWeek": "Saturday",
//         "opens": "09:00",
//         "closes": "14:00"
//       }
//     ],
//     "sameAs": [
//       "https://www.facebook.com/psandeepca",
//       "https://www.linkedin.com/company/psandeepca",
//       "https://twitter.com/psandeepca",
//       "https://www.instagram.com/psandeepca/"
//     ]
//   };

//   return (
//     <>
//       {/* Helmet for SEO */}
//       <Helmet>
//         {/* Primary Meta Tags */}
//         <title>Services | P Sandeep CA - Accounting, Tax & Financial Advisory</title>
//         <meta name="title" content="Services | P Sandeep CA - Accounting, Tax & Financial Advisory" />
//         <meta name="description" content="Explore professional accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA. Trusted CA firm serving businesses across India." />
//         <meta name="keywords" content="Accounting Services, Tax Consulting, Financial Advisory, Business Valuation, Audit Services, GST Compliance, Corporate Finance, CA Services, P Sandeep CA" />
//         <meta name="robots" content="index, follow" />
//         <meta name="language" content="English" />
//         <meta name="revisit-after" content="7 days" />
//         <meta name="author" content="P Sandeep CA" />
//         <meta name="copyright" content="P Sandeep CA" />
        
//         {/* Canonical Tag */}
//         <link rel="canonical" href="https://psandeepca.com/services" />

//         {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://psandeepca.com/services" />
//         <meta property="og:title" content="Services | P Sandeep CA - Accounting, Tax & Financial Advisory" />
//         <meta property="og:description" content="Explore professional accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA. Trusted CA firm serving businesses across India." />
//         <meta property="og:image" content="https://psandeepca.com/og-image-services.jpg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:site_name" content="P Sandeep CA" />
//         <meta property="og:locale" content="en_IN" />

//         {/* Twitter Card Meta Tags */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:url" content="https://psandeepca.com/services" />
//         <meta name="twitter:title" content="Services | P Sandeep CA - Accounting, Tax & Financial Advisory" />
//         <meta name="twitter:description" content="Explore professional accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA." />
//         <meta name="twitter:image" content="https://psandeepca.com/twitter-image-services.jpg" />
//         <meta name="twitter:site" content="@psandeepca" />
//         <meta name="twitter:creator" content="@psandeepca" />

//         {/* Additional SEO Tags */}
//         <meta name="geo.region" content="IN-XX" />
//         <meta name="geo.placename" content="City Name" />
//         <meta name="geo.position" content="XX.XXXXXX;XX.XXXXXX" />
//         <meta name="ICBM" content="XX.XXXXXX, XX.XXXXXX" />

//         {/* Schema Markup - JSON-LD */}
//         <script type="application/ld+json">
//           {JSON.stringify(servicesSchema)}
//         </script>
//         <script type="application/ld+json">
//           {JSON.stringify(breadcrumbSchema)}
//         </script>
//         <script type="application/ld+json">
//           {JSON.stringify(organizationSchema)}
//         </script>
//       </Helmet>

//       {/* YOUR EXISTING UI - UNCHANGED */}
//       <div className="min-h-screen bg-white">
//         <Hero />
//         <ServicesGrid services={services} loading={loading} />
//       </div>
//     </>
//   );
// }



import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactHtmlParser from 'react-html-parser';
import servicesData from "../data/servicedata.json";

gsap.registerPlugin(ScrollTrigger);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_PATH;

// Builds a full image URL from a relative path returned by the API.
// Returns "" if there's no path, and passes already-absolute URLs through unchanged.
function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${IMAGE_BASE_URL}/${path}`;
}

// Fallback icon used when a service has no icon set, or the icon image
// fails to load (404, bad path, etc).
const DEFAULT_ICON_PATH = `${IMAGE_BASE_URL}/services/icons/default.png`;

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
        <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg">Our Services</h2>
        <p ref={descRef} className="text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">Accounting data is often used by governments and policymakers for economic planning and analysis.</p>
      </div>
    </section>
  );
}

// ─── Service Card ──────────────────────────────────────────────────────────
function ServiceCard({ icon, title, slug, desc, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: "power2.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });

    return () => ctx.revert();
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
      <div className="w-14 h-14 rounded-full bg-[#38b6ff] flex items-center justify-center mb-5">
        <img
          src={getImageUrl(icon)}
          alt={title ? `${title} icon` : "Service icon"}
          className="w-7 h-7 object-contain"
          onError={(e) => {
            // Avoid an infinite loop if the default icon itself 404s
            if (e.currentTarget.src !== DEFAULT_ICON_PATH) {
              e.currentTarget.src = DEFAULT_ICON_PATH;
            }
          }}
        />
      </div>
      <h3 className="text-gray-800 font-medium text-3xl mb-3">{title}</h3>
      <div className="text-gray-900 text-md sm:text-xl">
        {ReactHtmlParser(desc)}
      </div>
      <Link to={`/service-page/${slug}`} className="border mt-6 border-gray-300 bg-blue-50 text-gray-600 hover:border-white hover:text-[#38b6ff] text-md px-5 py-3 rounded-full transition-colors duration-200">
        Learn More
      </Link>
    </div>
  );
}

// ─── Services Grid ─────────────────────────────────────────────────────────
function ServicesGrid({ services, loading }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (loading || services.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 90%", toggleActions: "play none none reverse" }
        }
      );
    });
    return () => ctx.revert();
  }, [loading, services]);

  return (
    <section className="bg-white py-16 px-6 md:px-12 overflow-hidden">
      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div ref={gridRef} className="max-w-7xl mx-auto lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <ServiceCard key={s.id ?? s.slug ?? index} icon={s.icon} title={s.title} slug={s.slug} desc={s.description} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  // Start with the local JSON so the page never renders empty while the
  // API call is in flight or if it fails.
  const [services, setServices] = useState(servicesData);
  const [loading, setLoading] = useState(true);

  // Fetch services from the API (same backend the admin panel uses)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/service`);
        // Handle paginated ({data:{data:[...]}}) and flat ({data:[...]}) shapes
        const data = response.data?.data?.data ?? response.data?.data ?? [];

        // Normalize field names in case the API differs slightly from the
        // local JSON's shape (e.g. "name" instead of "title").
        const normalized = data.map((service) => ({
          ...service,
          title: service.title ?? service.name ?? "",
          description: service.description ?? service.desc ?? "",
          slug: service.slug ?? String(service.id ?? ""),
          // icon is expected to be an image path relative to IMAGE_BASE_URL,
          // e.g. "services/icons/xxxx.png" — fall back to a default image.
          icon: service.icon ?? "services/icons/default.png",
        }));

        // if (normalized[0]) {
          // Temporary debug log — remove once confirmed working.
        //  console.log("Sample service from API:", normalized[0]);
       // }

        const activeServices = normalized
          .filter((s) => s.is_active === 1 || s.is_active === true || s.is_active === undefined)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        // Only switch away from the local fallback if the API actually
        // returned something — an empty array shouldn't blank the page.
        if (activeServices.length > 0) {
          setServices(activeServices);
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

  console.log("Services:", services);

  // Generate service list for schema from the current services state
  const serviceList = services.map(service => ({
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "url": `https://psandeepca.com/service-page/${service.slug}`
  }));

  // JSON-LD Schema Markup for Services Page
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professional Accounting & Advisory Services",
    "description": "Comprehensive accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA.",
    "provider": {
      "@type": "ProfessionalService",
      "name": "P Sandeep CA",
      "url": "https://psandeepca.com/"
    },
    "url": "https://psandeepca.com/services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Accounting and Financial Services",
      "itemListElement": serviceList
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
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
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "P Sandeep CA",
    "description": "Leading CA firm providing accounting, tax consulting, financial advisory, audit, and business valuation services.",
    "url": "https://psandeepca.com/",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@psandeepca.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Office Address",
      "addressLocality": "City Name",
      "addressRegion": "State",
      "postalCode": "XXXXXX",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "XX.XXXXXX",
      "longitude": "XX.XXXXXX"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
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
        <title>Services | P Sandeep CA - Accounting, Tax & Financial Advisory</title>
        <meta name="title" content="Services | P Sandeep CA - Accounting, Tax & Financial Advisory" />
        <meta name="description" content="Explore professional accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA. Trusted CA firm serving businesses across India." />
        <meta name="keywords" content="Accounting Services, Tax Consulting, Financial Advisory, Business Valuation, Audit Services, GST Compliance, Corporate Finance, CA Services, P Sandeep CA" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="P Sandeep CA" />
        <meta name="copyright" content="P Sandeep CA" />
        
        {/* Canonical Tag */}
        <link rel="canonical" href="https://psandeepca.com/services" />

        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://psandeepca.com/services" />
        <meta property="og:title" content="Services | P Sandeep CA - Accounting, Tax & Financial Advisory" />
        <meta property="og:description" content="Explore professional accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA. Trusted CA firm serving businesses across India." />
        <meta property="og:image" content="https://psandeepca.com/og-image-services.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://psandeepca.com/services" />
        <meta name="twitter:title" content="Services | P Sandeep CA - Accounting, Tax & Financial Advisory" />
        <meta name="twitter:description" content="Explore professional accounting, tax consulting, financial advisory, audit, and business valuation services from P Sandeep CA." />
        <meta name="twitter:image" content="https://psandeepca.com/twitter-image-services.jpg" />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="IN-XX" />
        <meta name="geo.placename" content="City Name" />
        <meta name="geo.position" content="XX.XXXXXX;XX.XXXXXX" />
        <meta name="ICBM" content="XX.XXXXXX, XX.XXXXXX" />

        {/* Schema Markup - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* YOUR EXISTING UI - UNCHANGED */}
      <div className="min-h-screen bg-white">
        <Hero />
        <ServicesGrid services={services} loading={loading} />
      </div>
    </>
  );
}