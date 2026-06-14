import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const corePillars = [
  {
    title: "Our Vision",
    description:
      "To be the most trusted financial partner, empowering businesses to achieve sustainable growth and long-term prosperity through innovative and transparent financial solutions.",
  },
  {
    title: "Our Mission",
    description:
      "To deliver exceptional, tailored financial services that ensure regulatory compliance, optimize operational performance, and provide accurate insights for confident decision-making.",
  },
  {
    title: "Our Values",
    description:
      "We are guided by unwavering integrity, meticulous accuracy, and client-centric collaboration, fostering a culture of trust and excellence in every financial process we manage.",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      width="13"
      height="13"
      fill="none"
      className="group-hover:stroke-white transition-colors"
    >
      <path
        d="M3 7h8M7 3l4 4-4 4"
        stroke="#6b8cba"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:stroke-white"
      />
    </svg>
  );
}

export default function OurValues() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(badgeRef.current,
        {
          opacity: 0,
          y: -30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Heading animation with split text effect
      gsap.fromTo(headingRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Cards animation with stagger
      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.15,
            ease: "back.out(0.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Add hover animations for cards
      cardRefs.current.forEach((card) => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              boxShadow: "0 20px 30px -15px rgba(0, 0, 0, 0.15)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
          
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "none",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

      // Animate title and description inside cards
      cardRefs.current.forEach((card) => {
        const title = card.querySelector(".card-title");
        const desc = card.querySelector(".card-desc");
        
        if (title && desc) {
          gsap.fromTo(title,
            {
              opacity: 0,
              x: -20,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            }
          );
          
          gsap.fromTo(desc,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.3,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-blue-50 py-20 px-5 sm:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <p 
          ref={badgeRef}
          className="text-center text-[#38b6ff] text-lg sm:text-xl font-medium tracking-widest uppercase mb-3"
        >
          Vision, Mission & Values
        </p>
        <h2
          ref={headingRef}
          className="text-center font-medium text-blue-950 text-3xl sm:text-5xl   mb-12"
        >
          Driven by Purpose,
          <br />
          Guided by Principles
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-600 border-dotted overflow-hidden">
          {corePillars.map((pillar, i) => (
            <div
              key={pillar.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`flex flex-col px-4 py-8 sm:px-12 sm:py-14 transition-all duration-300 ${
                i < corePillars.length - 1
                  ? "border-b md:border-b-0 md:border-r border-gray-600 border-dotted"
                  : ""
              }`}
            >
              {/* Title */}
              <h3
                className="card-title text-black font-medium mb-8 text-4xl"
              >
                {pillar.title}
              </h3>

              {/* Body */}
              <p className="card-desc text-gray-800 text-lg flex-1 mb-7">
                {pillar.description}
              </p>

              {/* Arrow Button - commented out in original */}
            </div>
          ))}
        </div>
      </div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .card-title, .card-desc {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}