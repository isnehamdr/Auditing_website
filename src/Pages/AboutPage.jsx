import { useEffect, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OurValues from "../components/OurValues";
import HowWeWork from "../components/HowWeWork";
import Process from "../components/Process";
// import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const aboutBadgeRef = useRef(null);
  const aboutHeadingRef = useRef(null);
  const aboutDescRef = useRef(null);
  const aboutButtonRef = useRef(null);
  const aboutImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO SECTION ANIMATIONS
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      heroTl.fromTo(heroTitleRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(0.8)",
        }
      );

      heroTl.fromTo(heroDescRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // ABOUT SECTION ANIMATIONS
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        }
      });

      aboutTl.fromTo(aboutBadgeRef.current,
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      aboutTl.fromTo(aboutHeadingRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );

      aboutTl.fromTo(aboutDescRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.4"
      );

      aboutTl.fromTo(aboutButtonRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(0.6)",
        },
        "-=0.3"
      );

      aboutTl.fromTo(aboutImageRef.current,
        {
          opacity: 0,
          scale: 0.95,
          x: 30,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.7"
      );

    });

    return () => ctx.revert();
  }, []);

  // Button hover animation
  const handleButtonHover = (isEnter) => {
    if (isEnter) {
      gsap.to(aboutButtonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(aboutButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Image hover animation
  const handleImageHover = (isEnter) => {
    if (isEnter) {
      gsap.to(aboutImageRef.current, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(aboutImageRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  // JSON-LD Schema Markup for About Page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About P Sandeep CA - Professional Accounting & Advisory Firm",
    "description": "Learn about P Sandeep CA, a leading CA firm offering expert accounting, tax consulting, financial advisory, and audit services.",
    "url": "https://psandeepca.com/about",
    "isPartOf": {
      "@type": "WebSite",
      "name": "P Sandeep CA",
      "url": "https://psandeepca.com/"
    },
    "about": {
      "@type": "Organization",
      "name": "P Sandeep CA",
      "description": "Professional Chartered Accountancy firm providing comprehensive financial services."
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
        "name": "About Us",
        "item": "https://psandeepca.com/about"
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
        <title>About Us | P Sandeep CA - Professional Accounting & Advisory Firm</title>
        <meta name="title" content="About Us | P Sandeep CA - Professional Accounting & Advisory Firm" />
        <meta name="description" content="Learn about P Sandeep CA, a trusted CA firm offering expert accounting, tax consulting, financial advisory, and audit services. Discover our mission, values, and team expertise." />
        <meta name="keywords" content="About P Sandeep CA, Chartered Accountant Firm, Accounting Services, Tax Consulting, Financial Advisory, CA Firm India, Professional Accounting Services" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="P Sandeep CA" />
        <meta name="copyright" content="P Sandeep CA" />
        
        {/* Canonical Tag */}
        <link rel="canonical" href="https://psandeepca.com/about" />

        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://psandeepca.com/about" />
        <meta property="og:title" content="About Us | P Sandeep CA - Professional Accounting & Advisory Firm" />
        <meta property="og:description" content="Learn about P Sandeep CA, a leading CA firm offering expert accounting, tax consulting, financial advisory, and audit services. Discover our mission and values." />
        <meta property="og:image" content="https://psandeepca.com/og-image-about.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://psandeepca.com/about" />
        <meta name="twitter:title" content="About Us | P Sandeep CA - Professional Accounting & Advisory Firm" />
        <meta name="twitter:description" content="Learn about P Sandeep CA, a trusted CA firm offering expert accounting, tax consulting, and financial advisory services." />
        <meta name="twitter:image" content="https://psandeepca.com/twitter-image-about.jpg" />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="IN-XX" />
        <meta name="geo.placename" content="City Name" />
        <meta name="geo.position" content="XX.XXXXXX;XX.XXXXXX" />
        <meta name="ICBM" content="XX.XXXXXX, XX.XXXXXX" />

        {/* Schema Markup - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* YOUR EXISTING UI - UNCHANGED */}
      <div>
        {/* HERO SECTION */}
        <div
          className="hero-section relative flex items-center justify-center flex-col text-center px-5 py-16 md:py-24"
          style={{
            background:
              "linear-gradient(rgba(15,30,60,0.62), rgba(15,30,60,0.62)), url('/images/bg.webp') center/cover no-repeat",
            minHeight: 540,
          }}
        >
          <h2 ref={heroTitleRef} className="text-white font-medium text-6xl sm:text-7xl mb-8">
            About Us
          </h2>
          <p ref={heroDescRef} className="text-white/85 text-xl max-w-md">
            Accounting data is often used by governments and policymakers for
            economic planning and analysis.
          </p>
        </div>

        {/* ABOUT SECTION */}
        <div className="about-section max-w-7xl mx-auto px-5 py-12 md:py-20 sm:px-16">
          
          {/* ✅ Using a 12-column grid for precise, balanced width control */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* ✅ Text takes up 7 out of 12 columns (~58% width) */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <p ref={aboutBadgeRef} className="text-[#38b6ff] text-2xl font-medium mb-6">
                About Us
              </p>
              <h2 ref={aboutHeadingRef} className="text-gray-900 font-normal text-3xl sm:text-5xl mb-5 tracking-wide ">
                Navigating The World Of Accounting For Financial Clarity And
                Success
              </h2>
              <p ref={aboutDescRef} className="text-black text-xl mb-8 leading-relaxed">
                Record each transaction in the accounting system. This is
                typically done through a process called bookkeeping, where
                transactions are entered into journals or ledgers. Common tools
                include accounting software or manual accounting records.
              </p>
              <Link
                to="/contact"
                ref={aboutButtonRef}
                onMouseEnter={() => handleButtonHover(true)}
                onMouseLeave={() => handleButtonHover(false)}
                className="border-2 border-[#38b6ff] text-white bg-[#38b6ff] hover:bg-blue-50 hover:text-[#38b6ff] text-xl font-medium px-8 py-3 rounded-full transition-colors w-fit"
              >
                Request a Consultation
              </Link>
            </div>

            {/* ✅ Image takes up 5 out of 12 columns (~42% width) - perfectly balanced */}
            <div
              ref={aboutImageRef}
              onMouseEnter={() => handleImageHover(true)}
              onMouseLeave={() => handleImageHover(false)}
              className="md:col-span-5 w-full"
              style={{
                background: "url('/images/about1.jpg') center/cover no-repeat",
                minHeight: 580, 
                height: "100%",
              }}
            ></div>
          </div>
        </div>
      </div>
      <OurValues/>
      <HowWeWork/>
      <Process/>
      {/* <Testimonials/> */}
    </>
  );
}