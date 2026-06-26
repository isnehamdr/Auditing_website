import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_PATH;

// Fallback content shown while the API loads or if a field is missing,
// so the section never renders empty.
const DEFAULT_HERO = {
  heading: "Audit, tax, and advisory, Built around your business",
  description:
    "A decade of independent audit, tax, and advisory practice in Nepal, led by chartered accountants.",
  button_text: "Request a Consultation",
  button_link: "/contact",
  main_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  corner_image: "/images/background.png",
};

// Builds a safe image URL: passes through already-absolute URLs (http/https,
// e.g. Unsplash links or anything the API returns in full), passes through
// local /images/... paths unchanged, and otherwise joins the API's image
// base with the stored filename without producing "//" or missing "/".
function getImageUrl(path, fallback) {
  if (!path) return fallback;
  if (/^https?:\/\//i.test(path)) return path; // already a full URL
  if (path.startsWith("/")) return path; // local public asset, e.g. /images/...
  const base = (IMAGE_BASE_URL || "").replace(/\/+$/, "");
  const cleanPath = String(path).replace(/^\/+/, "");
  return `${base}/${cleanPath}`;
}

// Safe HTML parser with options
const parseHtmlContent = (content) => {
  if (!content) return null;
  
  // Options for html-react-parser to handle security
  const options = {
    replace: (node) => {
      // You can add custom replacements here if needed
      // For example, to add classes to certain elements
      return node;
    }
  };
  
  return parse(content, options);
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once triggered
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fetch hero content from the API
  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/hero`);
        // Handle paginated ({data:{data:[...]}}), flat list ({data:[...]}),
        // and single-object ({data:{...}}) response shapes.
        const raw = response.data?.data?.data ?? response.data?.data ?? null;
        const record = Array.isArray(raw) ? raw[0] : raw;

        if (record) {
          // Temporary debug log — remove once field names are confirmed.
          console.log("Hero data from API:", record);

          setHero({
            heading: record.heading ?? record.title ?? DEFAULT_HERO.heading,
            description: record.description ?? record.subtitle ?? DEFAULT_HERO.description,
            button_text: record.button_text ?? record.btn_text ?? DEFAULT_HERO.button_text,
            button_link: record.button_link ?? record.btn_link ?? DEFAULT_HERO.button_link,
            main_image: record.image ?? record.main_image ?? record.photo ?? DEFAULT_HERO.main_image,
            corner_image: record.corner_image ?? record.secondary_image ?? DEFAULT_HERO.corner_image,
            // Support for HTML content in description
            description_html: record.description_html ?? record.description ?? DEFAULT_HERO.description,
          });
        }
      } catch (error) {
        console.error("fetching error", error);
        // Keep DEFAULT_HERO on failure so the section still renders.
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const mainImageUrl = getImageUrl(hero.main_image, DEFAULT_HERO.main_image);
  const cornerImageUrl = getImageUrl(hero.corner_image, DEFAULT_HERO.corner_image);

  // Determine if we should render HTML or plain text
  const renderDescription = (description) => {
    // Check if the description contains HTML tags
    const hasHtml = /<[a-z][\s\S]*>/i.test(description);
    if (hasHtml) {
      return parseHtmlContent(description);
    }
    return description;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#38b6ff] overflow-hidden"
    >

      {/* Right image panel — hidden on mobile, absolute on md+ */}
      <div
        className={`hidden md:block absolute right-0 top-0 w-1/2 h-full overflow-hidden z-0 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
      >
        <img
          src={mainImageUrl}
          alt="Accountant working at desk"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            if (e.currentTarget.src !== DEFAULT_HERO.main_image) {
              e.currentTarget.src = DEFAULT_HERO.main_image;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3FDB]/20 to-transparent pointer-events-none" />
      </div>

      {/* Decorative corner image — desktop only */}
      <div
        className={`hidden md:block absolute top-36 left-0 w-52 h-72 overflow-hidden z-0 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        }`}
      >
        <img
          src={cornerImageUrl}
          alt="Professional"
          className="w-full h-full object-cover brightness-250"
          onError={(e) => {
            if (e.currentTarget.src !== DEFAULT_HERO.corner_image) {
              e.currentTarget.src = DEFAULT_HERO.corner_image;
            }
          }}
        />
      </div>

      {/* ── MOBILE layout: stacked column ── */}
      <div className="flex flex-col md:hidden">

        {/* 1. Text content first */}
        <div
          className={`relative z-10 flex flex-col justify-center px-6 pt-28 pb-10 transition-all duration-800 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-white text-4xl font-normal mb-6">
            {parseHtmlContent(hero.heading) || hero.heading}
          </h2>
          <p className="text-white/80 text-md mb-10">
            {renderDescription(hero.description)}
          </p>
          <div>
            <Link to={hero.button_link} className="bg-white text-gray-800 hover:bg-[#38b6ff] hover:border hover:border-white hover:text-white font-medium text-lg sm:px-8 sm:py-4 px-6 py-3 rounded-full transition-colors duration-200">
              {parseHtmlContent(hero.button_text) || hero.button_text}
            </Link>
          </div>
        </div>

        {/* 2. Image below text */}
        <div
          className={`w-full h-96 overflow-hidden flex-shrink-0 transition-all duration-800 delay-300 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <img
            src={mainImageUrl}
            alt="Accountant working at desk"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              if (e.currentTarget.src !== DEFAULT_HERO.main_image) {
                e.currentTarget.src = DEFAULT_HERO.main_image;
              }
            }}
          />
        </div>
      </div>

      {/* ── DESKTOP layout: original side-by-side ── */}
      <div className="hidden md:flex relative z-10 max-w-7xl mx-auto w-full min-h-screen flex-row">
        <div className="relative z-10 flex flex-col justify-center md:w-1/2 px-8 md:px-12 md:py-12 overflow-hidden">
          <div
            className={`transition-all duration-800 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-normal -mb-8 mt-24">
              {parseHtmlContent(hero.heading) || hero.heading}
            </h1>
            <p className="text-white/80 text-sm md:text-xl mb-10 tracking-[1px]">
              {renderDescription(hero.description)}
            </p>
          </div>
          <div
            className={`transition-all duration-800 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link to={hero.button_link} className="bg-white text-gray-800 hover:bg-[#38b6ff] hover:border hover:border-white hover:text-white font-medium text-lg px-8 py-4 rounded-full transition-colors duration-200">
              {parseHtmlContent(hero.button_text) || hero.button_text}
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;