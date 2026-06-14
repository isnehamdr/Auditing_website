import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {Link} from "react-router-dom";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Traditional Employee", percent: 25 },
  { label: "Virtual Employee", percent: 100 },
  { label: "Success", percent: 100 },
];

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircleProgress({ percent, animate }) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="relative w-[72px] h-[72px]">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90" aria-hidden="true">
        <circle cx="36" cy="36" r={RADIUS} fill="none" stroke="#e8ecf5" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={RADIUS} fill="none"
          stroke="#2a5bd7" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={animate ? offset : CIRCUMFERENCE}
          style={{ transition: animate ? "stroke-dashoffset 1s ease-out" : "none" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#1a2f6e]">
        {percent}%
      </span>
    </div>
  );
}

function StatCard({ label, percent, index }) {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setAnimate(true);
          
          // GSAP animation for card entrance
          gsap.fromTo(cardRef.current,
            {
              opacity: 0,
              y: 50,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.15,
              ease: "back.out(0.6)",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  // Hover animation for stat card
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -12px rgba(0, 0, 0, 0.25)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={ref}
      className="bg-white/95 backdrop-blur-sm px-2 py-8 flex flex-col items-center gap-2 hover:shadow-lg transition-shadow duration-300"
    >
      <div 
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col items-center gap-2"
      >
        <CircleProgress percent={percent} animate={animate} />
        <span className="text-sm sm:text-lg text-gray-800 text-center font-normal leading-tight">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function FuelingGrowth() {
  const sectionRef = useRef(null);
  const mobileHeadingRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const mobileDescRef = useRef(null);
  const mobileStatsRef = useRef(null);
  
  const desktopHeadingRef = useRef(null);
  const desktopButtonRef = useRef(null);
  const desktopDescRef = useRef(null);
  const desktopStatsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create master timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      });

      // MOBILE ANIMATIONS
      if (window.innerWidth < 640) {
        // Mobile heading animation
        masterTl.fromTo(mobileHeadingRef.current,
          {
            opacity: 0,
            y: -50,
            rotationX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );

        // Mobile button animation with bounce
        masterTl.fromTo(mobileButtonRef.current,
          {
            opacity: 0,
            scale: 0,
            rotation: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.2)",
          },
          "-=0.4"
        );

        // Mobile description animation
        masterTl.fromTo(mobileDescRef.current,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

        // Mobile stats container animation
        masterTl.fromTo(mobileStatsRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );
      } 
      // DESKTOP ANIMATIONS
      else {
        // Desktop heading animation with 3D effect (no floating)
        masterTl.fromTo(desktopHeadingRef.current,
          {
            opacity: 0,
            x: -80,
            rotationY: -30,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
          }
        );

        // Desktop button animation with pulse effect
        masterTl.fromTo(desktopButtonRef.current,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.6"
        );

        // Desktop description animation with fade and slide
        masterTl.fromTo(desktopDescRef.current,
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );

        // Desktop stats container animation
        masterTl.fromTo(desktopStatsRef.current,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "back.out(0.7)",
          },
          "-=0.5"
        );
      }

      // Parallax effect for background
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Button hover animations
  const handleButtonHover = (buttonRef, isEnter) => {
    if (isEnter) {
      gsap.to(buttonRef, {
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(buttonRef, {
        scale: 1,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.webp')", backgroundPosition: "50% 50%" }}
    >
      {/* Overlay — slightly deeper on mobile for text contrast */}
      <div className="absolute inset-0 bg-blue-900/60 sm:bg-blue-500/50" />

      {/* ── MOBILE layout ── */}
      <div className="relative z-10 flex flex-col px-5 py-14 gap-8 sm:hidden">

        {/* Heading */}
        <div 
          ref={mobileHeadingRef}
          className="text-center"
        >
          <h2 className="text-2xl font-normal text-white mb-5">
            Fueling Business Growth With Accounting
          </h2>
          <button 
            ref={mobileButtonRef}
            onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
            onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            className="bg-[#38b6ff] hover:bg-blue-400 text-white text-base font-medium px-7 py-3 rounded-full transition-all duration-200 shadow-lg"
          >
            Get a Free Consultation
          </button>
        </div>

        {/* Description */}
        <p 
          ref={mobileDescRef}
          className="text-sm text-blue-100 text-center leading-relaxed"
        >
          This approach underscores the idea that effective financial management,
          facilitated by accounting practices, acts as a catalyst for overall
          business success.
        </p>

        {/* 3 stat cards in a row */}
        <div 
          ref={mobileStatsRef}
          className="grid grid-cols-3 gap-2"
        >
          {stats.map((s, idx) => (
            <StatCard key={s.label} {...s} index={idx} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout — completely unchanged ── */}
      <div className="hidden sm:block relative z-10 py-20 sm:px-16 px-4">
        <div className="sm:max-w-7xl sm:mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">

            {/* Left */}
            <div className="text-center lg:text-left">
              <h2 
                ref={desktopHeadingRef}
                className="text-3xl sm:text-4xl lg:text-6xl font-normal text-white mb-6"
              >
                Fueling Business Growth With Accounting
              </h2>
              <Link 
                to="/contact" 
                ref={desktopButtonRef}
                onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm sm:text-lg px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
              >
                Get a Free Consultation
              </Link>
            </div>

            {/* Right */}
            <div>
              <p 
                ref={desktopDescRef}
                className="text-sm sm:text-2xl text-blue-100 mb-8 text-center lg:text-left"
              >
                This approach underscores the idea that effective financial
                management, facilitated by accounting practices, acts as a
                catalyst for overall business success.
              </p>
              <div 
                ref={desktopStatsRef}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3"
              >
                {stats.map((s, idx) => (
                  <StatCard key={s.label} {...s} index={idx} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}