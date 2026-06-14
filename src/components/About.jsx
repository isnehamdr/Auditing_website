import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const features = [
  { label: "Financial Analysis" },
  { label: "Safe & Secure" },
  { label: "Real Clients" },
  { label: "100% Guarantee" },
];

const ChevronDoubleRight = () => (
  <svg
    className="w-8 h-8 text-[#38b6ff] flex-shrink-0 mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M6 5l7 7-7 7" />
  </svg>
);

const About = () => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const featuresRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    // Create a timeline for left column animations
    const leftTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate left column elements in sequence
    leftTimeline
      .fromTo(labelRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        }
      )
      .fromTo(headingRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .fromTo(textRef.current,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .fromTo(featuresRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1)",
        },
        "-=0.2"
      )
      .fromTo(buttonRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.2"
      );

    // Animate right column elements
    const rightTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
    });

    rightTimeline
      .fromTo(imageRef.current,
        {
          opacity: 0,
          x: 100,
          rotationY: 90,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      )
      .fromTo(captionRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "bounce.out",
        },
        "-=0.3"
      );

    // Animate individual feature items with stagger
    if (featuresRef.current) {
      const featureItems = featuresRef.current.querySelectorAll('.feature-item');
      gsap.fromTo(featureItems,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Cleanup ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">

        {/* ── LEFT COLUMN ── */}
        <div ref={leftColumnRef} className="flex flex-col gap-6">
          {/* Label */}
          <p ref={labelRef} className="text-[#38b6ff] text-2xl font-medium opacity-0">
            About Us
          </p>

          {/* Heading */}
          <h2 ref={headingRef} className="text-3xl sm:text-6xl font-normal text-gray-900 opacity-0">
            Mastering The Art And Science Of Accounting
          </h2>

          {/* Body text */}
          <p ref={textRef} className="text-gray-700 text-sm sm:text-lg max-w-xl opacity-0">
            The profession also upholds ethical standards and often requires continuing
            education to stay abreast of changes in accounting principles, tax laws,
            and technology.
          </p>

          {/* Feature grid */}
          <div ref={featuresRef} className="grid grid-cols-2 gap-x-8 gap-y-3 opacity-0">
            {features.map((f, index) => (
              <div key={f.label} className="feature-item flex items-start gap-2">
                <ChevronDoubleRight />
                <h3 className="text-gray-800 text-sm sm:text-2xl font-medium">{f.label}</h3>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div ref={buttonRef} className="pt-2 opacity-0">
            <Link to="/about" className="bg-[#38b6ff] active:scale-95 text-white text-md sm:text-xl font-normal px-6 py-2 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg">
              About Us
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div ref={rightColumnRef} className="relative w-full">
          {/* Image */}
          <div 
            ref={imageRef}
            className="w-full overflow-hidden bg-gray-100 aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src="/images/about.webp"
              alt="Professional accountant reviewing financial charts"
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Blue caption box overlapping the bottom of the image */}
          <div 
            ref={captionRef}
            className="bg-[#38b6ff] text-white text-md sm:text-xl px-5 py-5 lg:rounded-b-none lg:rounded-br-lg -mt-1 opacity-0 transform translate-y-10"
          >
            <p>
              By analyzing historical financial data and projecting future trends,
              businesses can create realistic budgets, set financial goals, and plan
              for future growth.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;