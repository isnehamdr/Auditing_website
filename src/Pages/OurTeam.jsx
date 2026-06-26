import { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BusinessGrow from "../components/Businessgrow";
import FAQ from "../components/FAQ"; 

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_PATH;
// Inline SVG fallback — renders with zero dependency on an actual file
// existing on disk (unlike a /images/placeholder.png that may not exist).
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
       <rect width='200' height='200' fill='#e5e7eb'/>
       <circle cx='100' cy='80' r='35' fill='#9ca3af'/>
       <rect x='45' y='130' width='110' height='60' rx='30' fill='#9ca3af'/>
     </svg>`
  );


// function getImageUrl(path) {
//   if (!path) return PLACEHOLDER_IMAGE;
//   if (/^https?:\/\//i.test(path)) return path; // already a full URL

//   const base = (IMAGE_BASE_URL || "").replace(/\/+$/, "");
//   let cleanPath = String(path).replace(/^\/+/, "");

//   // If the base doesn't already end in /storage and the path doesn't
//   // already start with storage/, assume Laravel's storage-disk convention.
//   const baseHasStorage = /\/storage$/i.test(base);
//   const pathHasStorage = /^storage\//i.test(cleanPath);
//   if (!baseHasStorage && !pathHasStorage) {
//     cleanPath = `${IMAGE_BASE_URL}/${cleanPath}`;
//   }

//   return `${base}/${cleanPath}`;
// }

function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${IMAGE_BASE_URL}/${path}`;
}

// Social Icons Component — driven by each team member's own links.
// Falls back gracefully: any platform without a link is simply skipped,
// and the whole block renders nothing if a member has no links at all.
function SocialIcons({ member, size = "w-12 h-12", className = "mt-12" }) {
  const socialLinks = [
    {
      key: "instagram",
      image: "/images/instagram.png",
      href: member?.instagram_link,
      alt: "Instagram",
    },
    {
      key: "facebook",
      image: "/images/facebook.png",
      href: member?.facebook_link,
      alt: "Facebook",
    },
    {
      key: "linkedin",
      image: "/images/linkedin.png",
      href: member?.linkedin_link,
      alt: "LinkedIn",
    },
  ].filter((social) => social.href);

  if (socialLinks.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.key}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${size} rounded-full  flex items-center justify-center `}
          aria-label={social.alt}
        >
          <img
            src={social.image}
            alt={social.alt}
            className="w-full h-full object-contain "
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.classList.add('bg-blue-600');
              e.currentTarget.parentElement.innerHTML = `<span class="text-white text-xs font-bold">${social.alt.charAt(0)}</span>`;
            }}
          />
        </a>
      ))}
    </div>
  );
}

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);

  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const teamBadgeRef = useRef(null);
  const teamHeadingRef = useRef(null);
  const teamCardsRef = useRef([]);
  const carouselContainerRef = useRef(null);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch team data from the API (same backend the admin panel uses)
  useEffect(() => {
    const fetchOurTeam = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/team`);
        // Handle both paginated ({data:{data:[...]}}) and flat ({data:[...]}) shapes
        const data = response.data?.data?.data ?? response.data?.data ?? [];

        // Normalize field names in case the API uses a different key than
        // the admin panel (e.g. "image" / "photo" instead of "person_image")
        const normalized = data.map((member) => ({
          ...member,
          person_image: member.person_image ?? member.image ?? member.photo ?? null,
          title: member.title ?? member.role ?? "",
          instagram_link: member.instagram_link ?? member.instagram ?? "",
          facebook_link: member.facebook_link ?? member.facebook ?? "",
          linkedin_link: member.linkedin_link ?? member.linkedin ?? "",
        }));

        if (normalized[0]) {
          // Temporary debug log — remove once images are confirmed working.
          console.log("Sample team member from API:", normalized[0]);
          console.log("Resolved image URL would be:", getImageUrl(normalized[0].person_image));
          console.log("IMAGE_BASE_URL is:", IMAGE_BASE_URL);
        }

        const activeMembers = normalized
          .filter((member) => member.is_active === 1 || member.is_active === true || member.is_active === undefined)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setTeamMembers(activeMembers);
      } catch (error) {
        console.error("fetching error", error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOurTeam();
  }, []);


  console.log(teamMembers);

  // Autoplay functionality for mobile
  useEffect(() => {
    if (isMobile && autoplay && teamMembers.length > 1) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isMobile, autoplay, teamMembers.length]);

  // Stop autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      setAutoplay(false);
    }
  };

  const resumeAutoplay = () => {
    if (isMobile && !autoplay) {
      setAutoplay(true);
    }
  };

  // Navigation functions
  const goToPrev = () => {
    pauseAutoplay();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
    setTimeout(resumeAutoplay, 5000); // Resume after 5 seconds of inactivity
  };

  const goToNext = () => {
    pauseAutoplay();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    setTimeout(resumeAutoplay, 5000); // Resume after 5 seconds of inactivity
  };

  const goToSlide = (index) => {
    pauseAutoplay();
    setCurrentIndex(index);
    setTimeout(resumeAutoplay, 5000);
  };

  useEffect(() => {
    if (loading || teamMembers.length === 0) return;

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(heroTitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(heroDescRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      // Team section animations
      gsap.fromTo(teamBadgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: teamBadgeRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(teamHeadingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: teamHeadingRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      // Only animate cards on desktop (non-mobile)
      if (!isMobile) {
        teamCardsRef.current.forEach((card, index) => {
          if (card) {
            gsap.fromTo(card,
              { opacity: 0, y: 50, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.15, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
              }
            );
          }
        });

        // Hover animations for team cards (desktop only)
        teamCardsRef.current.forEach((card) => {
          if (card) {
            const imageDiv = card.querySelector(".team-image");

            card.addEventListener("mouseenter", () => {
              gsap.to(imageDiv, {
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out"
              });
            });

            card.addEventListener("mouseleave", () => {
              gsap.to(imageDiv, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
              });
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, [isMobile, loading, teamMembers]);

  // Generate team members list for schema
  const teamMemberSchema = teamMembers.map((member) => ({
    "@type": "Person",
    "name": member.name,
    "jobTitle": member.title,
    "image": member.person_image ? getImageUrl(member.person_image) : undefined,
    "url": "https://psandeepca.com/team",
    "sameAs": [member.instagram_link, member.facebook_link, member.linkedin_link].filter(Boolean),
    "worksFor": {
      "@type": "Organization",
      "name": "P Sandeep CA"
    }
  }));

  // JSON-LD Schema Markup for Team Page
  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Our Team - P Sandeep CA",
    "description": "Meet the experienced team at P Sandeep CA. Led by CA Sandeep Paudel, our team provides expert accounting, tax consulting, and financial advisory services.",
    "url": "https://psandeepca.com/team",
    "isPartOf": {
      "@type": "WebSite",
      "name": "P Sandeep CA",
      "url": "https://psandeepca.com/"
    },
    "about": {
      "@type": "Organization",
      "name": "P Sandeep CA",
      "description": "Professional Chartered Accountancy firm providing comprehensive financial services."
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": teamMemberSchema
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
        "name": "Our Team",
        "item": "https://psandeepca.com/team"
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
      "https://www.facebook.com",
      "https://www.linkedin.com",
      "https://twitter.com",
      "https://www.instagram.com"
    ]
  };

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Our Team | P Sandeep CA - Experienced Chartered Accountants</title>
        <meta name="title" content="Our Team | P Sandeep CA - Experienced Chartered Accountants" />
        <meta name="description" content="Meet the experienced team at P Sandeep CA. Led by CA Sandeep Paudel, our team delivers expert accounting, tax consulting, and financial advisory services." />
        <meta name="keywords" content="Our Team, Chartered Accountants, CA Sandeep Paudel, Accounting Team, Tax Experts, Financial Advisors, P Sandeep CA Team" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="P Sandeep CA" />
        <meta name="copyright" content="P Sandeep CA" />

        {/* Canonical Tag */}
        <link rel="canonical" href="https://psandeepca.com/team" />

        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://psandeepca.com/team" />
        <meta property="og:title" content="Our Team | P Sandeep CA - Experienced Chartered Accountants" />
        <meta property="og:description" content="Meet the experienced team at P Sandeep CA. Led by CA Sandeep Paudel, our team delivers expert accounting, tax consulting, and financial advisory services." />
        <meta property="og:image" content="https://psandeepca.com/og-image-team.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://psandeepca.com/team" />
        <meta name="twitter:title" content="Our Team | P Sandeep CA - Experienced Chartered Accountants" />
        <meta name="twitter:description" content="Meet the experienced team at P Sandeep CA. Led by CA Sandeep Paudel, our team delivers expert accounting, tax consulting, and financial advisory services." />
        <meta name="twitter:image" content="https://psandeepca.com/twitter-image-team.jpg" />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="IN-XX" />
        <meta name="geo.placename" content="City Name" />
        <meta name="geo.position" content="XX.XXXXXX;XX.XXXXXX" />
        <meta name="ICBM" content="XX.XXXXXX, XX.XXXXXX" />

        {/* Schema Markup - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(teamSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* YOUR EXISTING UI - UNCHANGED */}
      <div
        ref={heroRef}
        className="flex flex-col items-center justify-center text-center px-5 py-16"
        style={{
          background:
            "linear-gradient(rgba(10,22,50,0.60), rgba(10,22,50,0.60)), url('/images/bgteam.webp') center/cover no-repeat",
          minHeight: 540,
        }}
      >
        <h2
          ref={heroTitleRef}
          className="text-white font-medium mb-8 text-7xl"
        >
          Our Team
        </h2>
        <p
          ref={heroDescRef}
          className="text-white/80 text-xl max-w-xl font-medium"
        >
          Accounting data is often used by governments and policymakers for economic planning and analysis.
        </p>
      </div>

      {/* TEAM SECTION */}
      <div className="bg-white py-20 px-6 sm:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p
            ref={teamBadgeRef}
            className="text-center text-[#38b6ff] font-medium text-xl mb-8 tracking-wide"
          >
            Our Team
          </p>
          <h2
            ref={teamHeadingRef}
            className="text-center text-6xl font-medium text-blue-950 mb-12"
          >
            Our Experienced Team
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading team...</p>
          ) : teamMembers.length === 0 ? (
            <p className="text-center text-gray-500">No team members found.</p>
          ) : (
            <>
              {/* Desktop View (Grid) */}
              <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teamMembers.map((member, i) => (
                  <div
                    key={member.id ?? i}
                    ref={(el) => (teamCardsRef.current[i] = el)}
                    className="flex flex-col"
                  >
                    {/* Photo card with social icons */}
                    <div
                      className="relative overflow-hidden"
                      style={{ height: 430 }}
                    >
                      <img
                        src={getImageUrl(member.person_image)}
                        alt={member.name}
                        className="team-image absolute inset-0 w-full h-full object-contain object-top transition-transform duration-300"
                        onError={(e) => {
                          if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
                            e.currentTarget.src = PLACEHOLDER_IMAGE;
                          }
                        }}
                      />
                      {/* Social icons — absolute bottom right, pulled from this member's own links */}
                      <div className="absolute -bottom-2 right-2.5 flex gap-1.5">
                        <SocialIcons member={member} size="w-14 h-14" />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="mt-3">
                      <p className="text-2xl font-medium text-blue-950">{member.name}</p>
                      <p className="text-md text-gray-800 mt-2">{member.title}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile View (Carousel) */}
              <div className="sm:hidden relative">
                <div
                  ref={carouselContainerRef}
                  className="overflow-hidden"
                  onMouseEnter={pauseAutoplay}
                  onMouseLeave={resumeAutoplay}
                >
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {teamMembers.map((member, i) => (
                      <div key={member.id ?? i} className="w-full flex-shrink-0 px-4">
                        <div className="flex flex-col">
                          {/* Photo card with social icons */}
                          <div
                            className="relative overflow-hidden rounded-xl"
                            style={{ height: 430 }}
                          >
                            <img
                              // src={getImageUrl(member.person_image)}
                              src={`${IMAGE_BASE_URL}/${member.person_image}`}
                              alt={member.name}
                              className="absolute inset-0 w-full h-full object-contain object-top"
                              onError={(e) => {
                                if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
                                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                                }
                              }}
                            />
                            {/* Social icons — absolute bottom right, pulled from this member's own links */}
                            <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
                              <SocialIcons member={member} size="w-10 h-10" />
                            </div>
                          </div>

                          {/* Name & Role */}
                          <div className="mt-3 text-center">
                            <p className="text-2xl font-medium text-blue-950">{member.name}</p>
                            <p className="text-md text-gray-800 mt-2">{member.title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                {teamMembers.length > 1 && (
                  <>
                    <button
                      onClick={goToPrev}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                      aria-label="Previous"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
                      aria-label="Next"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                      {teamMembers.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`transition-all duration-300 ${
                            index === currentIndex
                              ? "w-8 h-2 bg-[#38b6ff] rounded-full"
                              : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <BusinessGrow/>
      <FAQ/>
    </>
  );
}