import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const allTestimonials = [
  {
    name: "Robert Gold",
    rating: 5,
    text: "Accounting is a fundamental and indispensable field that plays a crucial role in the financial management of individuals, businesses, and organizations. It involves the systematic recording, organizing, and analysis of financial transactions to provide accurate and timely information for decision-making.",
  },
  {
    name: "Nensi Wing",
    rating: 5,
    text: "In summary, accounting is an essential and dynamic field that goes beyond the stereotype of number-oriented tasks. It is a key driver of financial transparency, accountability, and strategic planning, making it an integral part of the success and sustainability of businesses and organizations.",
  },
  {
    name: "James Carter",
    rating: 5,
    text: "The team provided exceptional financial guidance that helped our company navigate complex compliance requirements. Their expertise in bookkeeping and auditing gave us complete confidence in our reporting.",
  },
  {
    name: "Sarah Mitchell",
    rating: 5,
    text: "Working with this firm transformed how we manage our payroll and financial records. Their systematic approach and attention to detail ensure every transaction is accurately recorded and reported.",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ))}
  </div>
);

const TestimonialCard = ({ name, rating, text, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.15,
        ease: "back.out(0.4)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="bg-[#eef2f9] px-6 py-5">
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl font-normal text-[#38b6ff]">{name}</span>
        <StarRating rating={rating} />
      </div>
      <p className="text-lg text-gray-700">{text}</p>
    </div>
  );
};

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#38b6ff]">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#38b6ff]">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Testimonials() {
  // Desktop: 2 per page
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(allTestimonials.length / perPage);
  const visible = allTestimonials.slice(page * perPage, page * perPage + perPage);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  // Mobile: 1 per page
  const [mobilePage, setMobilePage] = useState(0);
  const totalMobilePages = allTestimonials.length;
  const mobileVisible = allTestimonials[mobilePage];
  const mobilePrev = () => setMobilePage((p) => (p - 1 + totalMobilePages) % totalMobilePages);
  const mobileNext = () => setMobilePage((p) => (p + 1) % totalMobilePages);

  // Refs for animations
  const sectionRef = useRef(null);
  const desktopLeftRef = useRef(null);
  const desktopLabelRef = useRef(null);
  const desktopHeadingRef = useRef(null);
  const desktopButtonsRef = useRef(null);
  const desktopCardsRef = useRef(null);
  const mobileHeaderRef = useRef(null);
  const mobileLabelRef = useRef(null);
  const mobileHeadingRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileCardRef = useRef(null);
  const mobileDotsRef = useRef(null);

  // Animation for page changes
  useEffect(() => {
    // Animate desktop cards when page changes
    const cards = document.querySelectorAll('.desktop-card');
    gsap.fromTo(cards,
      {
        opacity: 0,
        x: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
      }
    );
  }, [page]);

  useEffect(() => {
    // Animate mobile card when page changes
    const mobileCard = document.querySelector('.mobile-card');
    if (mobileCard) {
      gsap.fromTo(mobileCard,
        {
          opacity: 0,
          x: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(0.5)",
        }
      );
    }
  }, [mobilePage]);

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop animations
      gsap.set(desktopLabelRef.current, { opacity: 0, x: -30 });
      gsap.set(desktopHeadingRef.current, { opacity: 0, x: -30 });
      gsap.set(desktopButtonsRef.current, { opacity: 0, x: -30 });
      
      gsap.to(desktopLabelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: desktopLabelRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      
      gsap.to(desktopHeadingRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(0.5)",
        scrollTrigger: {
          trigger: desktopHeadingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      
      gsap.to(desktopButtonsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: desktopButtonsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Mobile animations
      gsap.set(mobileLabelRef.current, { opacity: 0, y: -20 });
      gsap.set(mobileHeadingRef.current, { opacity: 0, y: -20 });
      gsap.set(mobileNavRef.current, { opacity: 0, x: 20 });
      
      gsap.to(mobileLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mobileLabelRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      
      gsap.to(mobileHeadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(0.5)",
        scrollTrigger: {
          trigger: mobileHeadingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      
      gsap.to(mobileNavRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mobileNavRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Animate dot indicators on mobile
      gsap.fromTo(mobileDotsRef.current.children,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.6,
          ease: "back.out(0.6)",
          scrollTrigger: {
            trigger: mobileDotsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Button hover animations
  const handleButtonHover = (button, isEnter) => {
    gsap.to(button, {
      scale: isEnter ? 1.1 : 1,
      backgroundColor: isEnter ? "#eef0f8" : "transparent",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-16 max-w-7xl mx-auto overflow-hidden">

      {/* ── MOBILE layout ── */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <p ref={mobileLabelRef} className="text-xl text-[#38b6ff] mb-1 font-normal">Testimonials</p>
            <h2 ref={mobileHeadingRef} className="text-2xl font-normal text-[#1a1a2e] mt-2">
              What Our Satisfied Clients Say
            </h2>
          </div>
          {/* Nav arrows inline with heading on mobile */}
          <div ref={mobileNavRef} className="flex gap-2 mt-1 flex-shrink-0">
            <button
              onClick={mobilePrev}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors"
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            >
              <ChevronLeft />
            </button>
            <button
              onClick={mobileNext}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors"
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Single card */}
        <div ref={mobileCardRef} className="mobile-card">
          <TestimonialCard {...mobileVisible} index={0} />
        </div>

        {/* Dot indicators */}
        <div ref={mobileDotsRef} className="flex justify-center gap-2">
          {allTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setMobilePage(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === mobilePage ? "bg-[#38b6ff] scale-125" : "bg-gray-300"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout — completely unchanged ── */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12 items-start">
        {/* Left column */}
        <div ref={desktopLeftRef}>
          <p ref={desktopLabelRef} className="text-2xl text-[#38b6ff] mb-1 font-normal">Testimonials</p>
          <h2 ref={desktopHeadingRef} className="text-3xl md:text-5xl font-normal text-[#1a1a2e] mt-6 mb-6">
            What Our Satisfied Clients Say
          </h2>
          <div ref={desktopButtonsRef} className="flex gap-2">
            <button 
              onClick={prev} 
              aria-label="Previous testimonials" 
              className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors duration-200"
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={next} 
              aria-label="Next testimonials" 
              className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors duration-200"
              onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleButtonHover(e.currentTarget, false)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Right column — 2 cards */}
        <div ref={desktopCardsRef} className="flex flex-col gap-4 max-w-2xl mx-auto">
          {visible.map((t, idx) => (
            <div key={t.name} className="desktop-card">
              <TestimonialCard {...t} index={idx} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}