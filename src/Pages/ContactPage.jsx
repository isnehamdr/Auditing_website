import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Icons ─────────────────────────────────────────────────────────────────
const DotIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="#3b82f6">
    <circle cx="4" cy="4" r="4" />
  </svg>
);
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

import { useState } from "react";

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

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
   <div ref={heroRef} className="relative w-full min-h-[540px] overflow-hidden flex items-center justify-center">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80')" }}
  />
  <div className="absolute inset-0 bg-gray-800/65" />
  
  <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16">
    <h1 ref={titleRef} className="text-5xl lg:text-7xl font-normal text-white mb-4">
      Contact Us
    </h1>
    <p ref={descRef} className="text-white text-lg  max-w-xl mx-auto">
      Accounting data is often used by governments and policymakers for economic planning and analysis.
    </p>
  </div>
</div>
  );
}

// ─── Info Cards ────────────────────────────────────────────────────────────
function InfoCards() {
  const cardsRef = useRef([]);
  
  const cards = [
    {
      title: "Office Location",
      lines: ["Pokhara-7,Masbar, Nepal"],
      color: false,
    },
    {
      title: "Our Contact",
      lines: ["+977-61-450488"],
      color: true,
    },
    {
      title: "Work Hours",
      lines: ["Mon-Fri: 9:00 – 17:00"],
      color: true,
    },
  ];

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.15, ease: "back.out(0.6)",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });
  }, []);

  const handleCardHover = (index, isEnter) => {
    if (isEnter) {
      gsap.to(cardsRef.current[index], {
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(cardsRef.current[index], {
        y: 0,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl md:px-16 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div 
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={() => handleCardHover(i, true)}
            onMouseLeave={() => handleCardHover(i, false)}
            className="flex flex-col items-center justify-center text-center font-medium py-7 px-6 bg-white border border-gray-200 transition-all duration-300"
          >
            <h4 className="text-gray-700 font-normal text-3xl mb-4">{card.title}</h4>
            {card.lines.map((line, j) => (
              <p key={j} className={`text-lg leading-relaxed ${card.color ? "text-[#38b6ff]" : "text-[#38b6ff]"}`}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact Form Section ──────────────────────────────────────────────────
function ContactForm() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);

  const inputClass =
    "w-full bg-white/10 border border-white/20 text-white text-lg placeholder-gray-300 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white/15 transition";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      // Animate input fields with stagger
      inputRefs.current.forEach((input, index) => {
        gsap.fromTo(input,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, delay: 0.3 + (index * 0.08), ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      });

      gsap.fromTo(textareaRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: "back.out(0.6)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (isEnter) => {
    if (isEnter) {
      gsap.to(buttonRef.current, {
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleInputHover = (index, isEnter) => {
    if (isEnter) {
      gsap.to(inputRefs.current[index], {
        scale: 1.01,
        duration: 0.2,
        ease: "power2.out"
      });
    } else {
      gsap.to(inputRefs.current[index], {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 sm:px-6 px-2 overflow-hidden"
      style={{
        backgroundImage: "url('/images/bgform.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-800/75" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl sm:px-16 mx-auto text-center">
        {/* Label */}
        <p ref={labelRef} className="text-white text-md uppercase mb-4 font-normal">
          Get In Touch
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-white text-2xl md:text-3xl lg:text-5xl font-normal mb-10"
        >
          Complete The Form<br />For Us To Reach Out
        </h2>

        {/* Form */}
        <div ref={formRef} className="bg-white/10 border border-white/15 p-4 sm:p-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-3">
            <input 
              ref={(el) => (inputRefs.current[0] = el)}
              onMouseEnter={() => handleInputHover(0, true)}
              onMouseLeave={() => handleInputHover(0, false)}
              type="text" 
              placeholder="First Name" 
              className={inputClass} 
            />
            <input 
              ref={(el) => (inputRefs.current[1] = el)}
              onMouseEnter={() => handleInputHover(1, true)}
              onMouseLeave={() => handleInputHover(1, false)}
              type="text" 
              placeholder="Last Name" 
              className={inputClass} 
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-3">
            <input 
              ref={(el) => (inputRefs.current[2] = el)}
              onMouseEnter={() => handleInputHover(2, true)}
              onMouseLeave={() => handleInputHover(2, false)}
              type="email" 
              placeholder="Email" 
              className={inputClass} 
            />
            <input 
              ref={(el) => (inputRefs.current[3] = el)}
              onMouseEnter={() => handleInputHover(3, true)}
              onMouseLeave={() => handleInputHover(3, false)}
              type="tel" 
              placeholder="Phone" 
              className={inputClass} 
            />
          </div>
          <textarea
            ref={textareaRef}
            placeholder="Your Input"
            rows={5}
            className={`${inputClass} resize-none mb-3 mt-4`}
          />
          <button 
            ref={buttonRef}
            onMouseEnter={() => handleButtonHover(true)}
            onMouseLeave={() => handleButtonHover(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-4 rounded-full transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Hero />
      <InfoCards />
      <ContactForm />
    </div>
  );
}