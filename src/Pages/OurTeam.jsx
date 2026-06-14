import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BusinessGrow from "../components/Businessgrow";
import FAQ from "../components/FAQ"; 

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "CA Sandeep Paudel",
    role: "Proprietor",
    photo: "/images/t1.png",
  },
  // {
  //   name: "Nansi Link",
  //   role: "Auditor",
  //   photo: "/images/t2.webp",
  // },
  // {
  //   name: "Jessica Robinson",
  //   role: "Accountant",
  //   photo: "/images/t3.webp",
  // },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#374151" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="#374151" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="#374151" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
      <path
        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Carousel Navigation Arrows
function PrevArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}

function NextArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}

export default function OurTeam() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Autoplay functionality for mobile
  useEffect(() => {
    if (isMobile && autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
      }, 3000); // Change slide every 3 seconds
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isMobile, autoplay]);

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
  }, [isMobile]);

  return (
    <>
      <div
        ref={heroRef}
        className="flex flex-col items-center justify-center text-center px-5 py-16"
        style={{
          background:
            "linear-gradient(rgba(10,22,50,0.60), rgba(10,22,50,0.60)), url('/images/bgteam.webp') center/cover no-repeat",
          minHeight: 540,
        }}
      >
        <h1
          ref={heroTitleRef}
          className="text-white font-medium mb-8 text-7xl"
        >
          Our Team
        </h1>
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

          {/* Desktop View (Grid) */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div 
                key={i} 
                ref={(el) => (teamCardsRef.current[i] = el)}
                className="flex flex-col"
              >
                {/* Photo card with social icons */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 430 }}
                >
                  <div
                    className="team-image absolute inset-0 transition-transform duration-300"
                    style={{
                      background: `url('${member.photo}') top center/contain no-repeat`,
                    }}
                  />
                  {/* Social icons — absolute bottom right */}
                  <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
                    <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors group">
                      <InstagramIcon />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors group">
                      <FacebookIcon />
                    </div>
                  </div>
                </div>

                {/* Name & Role */}
                <div className="mt-3">
                  <p className="text-2xl font-medium text-blue-950">{member.name}</p>
                  <p className="text-md text-gray-800 mt-2">{member.role}</p>
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
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="flex flex-col">
                      {/* Photo card with social icons */}
                      <div
                        className="relative overflow-hidden rounded-xl"
                        style={{ height: 430 }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `url('${member.photo}') top center/contain no-repeat`,
                          }}
                        />
                        {/* Social icons — absolute bottom right */}
                        <div className="absolute bottom-2.5 right-2.5 flex gap-1.5">
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors group">
                            <InstagramIcon />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors group">
                            <FacebookIcon />
                          </div>
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div className="mt-3 text-center">
                        <p className="text-2xl font-medium text-blue-950">{member.name}</p>
                        <p className="text-md text-gray-800 mt-2">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              aria-label="Previous"
            >
              <PrevArrow />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              aria-label="Next"
            >
              <NextArrow />
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
          </div>
        </div>
      </div>

      <BusinessGrow/>
      <FAQ/>
    </>
  );
}