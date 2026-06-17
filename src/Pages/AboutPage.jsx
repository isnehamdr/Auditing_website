


import { useEffect, useRef } from "react";
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

  return (
    <>
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
{/* <Testimonials/>  */}

    </>
  );
}