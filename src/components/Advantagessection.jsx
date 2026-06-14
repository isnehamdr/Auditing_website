import React, { useState, useRef, useEffect } from "react";
import {Link} from "react-router-dom";

const cards = [
  {
    id: "01",
    title: "Financial Clarity",
    desc: "Accounting provides a clear and organized record of financial transactions, enabling individuals and businesses to understand their financial position at any given time.",
  },
  {
    id: "02",
    title: "Decision Support",
    desc: "This information is crucial for making strategic decisions, setting goals, and planning for the future. Financial statements and reports generated through accounting help.",
    active: true,
  },
  {
    id: "03",
    title: "Resource Allocation",
    desc: "Businesses use accounting information to allocate resources efficiently. This includes determining the profitability of products or services.",
  },
];

const stats = [
  { value: "10+", label: "Years in Business" },
  { value: "8+", label: "Years in Offshoring" },
  { value: "30+", label: "Employees" },
];

const AdvantagesSection = () => {
  const [activeId, setActiveId] = useState("02");
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([false, false, false]);
  const [animatedStats, setAnimatedStats] = useState(false);
  
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const cardRefs = useRef([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            
            // Animate cards with delay
            cards.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Observer for stats section
  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedStats) {
            setAnimatedStats(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
    };
  }, [animatedStats]);

  // Number counting animation for stats
  useEffect(() => {
    if (animatedStats) {
      stats.forEach((stat, idx) => {
        const targetValue = parseInt(stat.value);
        const element = document.getElementById(`stat-value-${idx}`);
        if (element) {
          let start = 0;
          const duration = 2000;
          const increment = targetValue / (duration / 16);
          
          const counter = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
              element.textContent = stat.value;
              clearInterval(counter);
            } else {
              element.textContent = Math.floor(start) + "+";
            }
          }, 16);
          
          return () => clearInterval(counter);
        }
      });
    }
  }, [animatedStats]);

  const handleCardClick = (cardId, index) => {
    setActiveId(cardId);
    
    // Add ripple effect
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        if (card) card.style.transform = 'scale(1)';
      }, 150);
    }
  };

  const handleCardMouseEnter = (index) => {
    const card = cardRefs.current[index];
    if (card && activeId !== cards[index].id) {
      card.style.transform = 'translateY(-5px)';
      card.style.transition = 'all 0.3s ease';
    }
  };

  const handleCardMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'translateY(0)';
    }
  };

  const handleButtonHover = (e, isEnter) => {
    const button = e.currentTarget;
    if (isEnter) {
      button.style.transform = 'scale(1.05)';
      button.style.transition = 'all 0.2s ease';
    } else {
      button.style.transform = 'scale(1)';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#eef2f9] py-20 px-4 sm:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── TOP: Cards + Text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">

          {/* Left: Feature Cards */}
          <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
            {cards.map((card, index) => {
              const isActive = activeId === card.id;
              const isSecondCard = index === 1;
              const isAnimated = animatedCards[index];

              return (
                <div
                  key={card.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  onClick={() => handleCardClick(card.id, index)}
                  onMouseEnter={() => handleCardMouseEnter(index)}
                  onMouseLeave={() => handleCardMouseLeave(index)}
                  className={`
                    cursor-pointer px-6 py-5 transition-all duration-300 w-full
                    ${isActive || isSecondCard ? "bg-[#38b6ff] text-white shadow-lg" : "bg-white text-gray-800 hover:shadow-md"}
                    ${isSecondCard ? "lg:translate-x-12 md:translate-x-4 translate-x-2" : ""}
                    ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                  `}
                  style={{
                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: isAnimated ? 'translateX(0)' : 'translateX(-40px)',
                    opacity: isAnimated ? 1 : 0,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 
                      className={`text-base sm:text-2xl md:text-3xl font-normal transition-colors duration-300 ${
                        isActive || isSecondCard ? "text-white" : "text-gray-900"
                      }`}
                      style={{
                        animation: isActive ? 'pulse 0.3s ease' : 'none'
                      }}
                    >
                      {card.title}
                    </h3>
                    <span 
                      className={`text-md font-medium tabular-nums ml-4 flex-shrink-0 transition-all duration-300 ${
                        isActive || isSecondCard ? "text-blue-200" : "text-gray-700"
                      }`}
                      style={{
                        transform: isActive ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {card.id}
                    </span>
                  </div>
                  <p 
                    className={`text-base sm:text-lg leading-relaxed transition-all duration-300 ${
                      isActive || isSecondCard ? "text-blue-100" : "text-gray-700"
                    }`}
                    style={{
                      opacity: isActive ? 1 : 0.9,
                      transform: isActive ? 'translateY(0)' : 'translateY(0)'
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Heading + CTA */}
          <div className="flex flex-col gap-5 max-w-xl">
            <p 
              className="text-[#38b6ff] text-xl font-medium mt-8 overflow-hidden"
              style={{
                animation: isVisible ? 'slideInRight 0.6s ease forwards' : 'none',
                opacity: 0,
                transform: 'translateX(40px)'
              }}
            >
              Advantages
            </p>
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 overflow-hidden"
              style={{
                animation: isVisible ? 'slideInRight 0.6s ease 0.1s forwards' : 'none',
                opacity: 0,
                transform: 'translateX(40px)'
              }}
            >
              Empowering Decisions With Financial Precision
            </h2>
            <p 
              className="text-gray-800 text-sm sm:text-xl overflow-hidden"
              style={{
                animation: isVisible ? 'slideInRight 0.6s ease 0.2s forwards' : 'none',
                opacity: 0,
                transform: 'translateX(40px)'
              }}
            >
              A top-tier chartered accountancy firm based in Nepal, specializing in audit, tax, and advisory services, aims to increase its length of operations, ensuring long-term sustainability, deeper client relationships.
            </p>
            <div className="pt-2 overflow-hidden">
              <Link
  to="/contact"
  onMouseEnter={(e) => handleButtonHover(e, true)}
  onMouseLeave={(e) => handleButtonHover(e, false)}
  className="bg-[#38b6ff] hover:bg-blue-700 active:scale-95 text-white text-sm sm:text-lg font-semibold px-8 py-3.5 rounded-full transition-all duration-200 inline-block"
 
>
  Get a Free Consultation
</Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Stats Bar ── */}
        <div 
          ref={statsRef}
          className="max-w-7xl mx-auto lg:px-20"
        >
          <div 
            className="border-dotted border-[#38b6ff]  bg-white border-2 p-6 sm:p-8 mt-10 rounded-md transition-all duration-700"
            style={{
              opacity: animatedStats ? 1 : 0,
              transform: animatedStats ? 'translateY(0)' : 'translateY(50px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-16">
              {stats.map((s, i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-1 sm:gap-2 text-center"
                  style={{
                    animation: animatedStats ? `fadeInUp 0.6s ease ${i * 0.15}s forwards` : 'none',
                    opacity: 0,
                    transform: 'translateY(30px)'
                  }}
                >
                  <span 
                    id={`stat-value-${i}`}
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#38b6ff]"
                  >
                    {animatedStats ? '0+' : s.value}
                  </span>
                  <span className="text-gray-800 text-xs sm:text-base md:text-lg font-medium leading-tight">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

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

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Smooth hover transitions */
        .hover\\:shadow-md:hover {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default AdvantagesSection;