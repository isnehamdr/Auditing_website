import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Compliance Services",
    description:
      "These services are designed to help manage financial processes, ensure compliance with regulations, and provide accurate financial information for decision-making.",
  },
  {
    title: "Payroll Processing",
    description:
      "These services are designed to help manage financial processes, ensure compliance with regulations, and provide accurate financial information for decision-making.",
  },
  {
    title: "Bookkeeping",
    description:
      "These services are designed to help manage financial processes, ensure compliance with regulations, and provide accurate financial information for decision-making.",
  },
  {
    title: "Auditing",
    description:
      "These services are designed to help manage financial processes, ensure compliance with regulations, and provide accurate financial information for decision-making.",
  },
];

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-500"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ServiceItem = ({ title, description, index }) => {
  const itemRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const item = itemRef.current;
    const button = buttonRef.current;

    // Set initial styles
    gsap.set(item, { opacity: 0, x: 30 });

    // Animation when component mounts
    gsap.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: index * 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Button hover animation
    const hoverAnimation = gsap.to(button, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(0.5)",
      paused: true,
    });

    const handleMouseEnter = () => hoverAnimation.play();
    const handleMouseLeave = () => hoverAnimation.reverse();

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      hoverAnimation.kill();
      // Kill ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === item) trigger.kill();
      });
    };
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="flex items-start justify-between gap-4 py-5 border-b border-blue-200 last:border-b-0 first:pt-0"
    >
      <div className="flex-1">
        <h3 className="text-2xl md:text-4xl font-normal text-[#1a2f5e] mb-1">
          {title}
        </h3>
        <p className="text-base md:text-lg text-gray-700 mt-2 md:mt-6">{description}</p>
      </div>
      <button
        ref={buttonRef}
        aria-label={`Learn more about ${title}`}
        className="mt-1 flex-shrink-0 w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center hover:bg-blue-100 transition-colors duration-200"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default function SupportServices() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial styles
      gsap.set(labelRef.current, { opacity: 0, y: 20 });
      gsap.set(headingRef.current, { opacity: 0, y: 30 });
      gsap.set(imageRef.current, { opacity: 0, y: 30 });

      // Section label animation
      gsap.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Heading animation
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "back.out(0.6)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Image animation - simple fade in only
      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      // Kill all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#eef2f9] overflow-hidden">
      <div className="pb-20 px-4 sm:px-16 max-w-7xl mx-auto">
        {/* Section label */}
        <p
          ref={labelRef}
          className="text-lg text-[#38b6ff] mb-4 font-normal"
        >
          Our Support Services
        </p>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: heading + image */}
          <div>
            <h2
              ref={headingRef}
              className="text-3xl md:text-6xl font-normal text-[#1a1a2e] mb-12"
            >
              You Can Trust Us
            </h2>
            {/* mobile: full-width natural height — desktop: fixed size (unchanged) */}
            <div className="overflow-hidden w-full md:aspect-[3/4] md:w-auto">
              <img
                ref={imageRef}
                src="/images/supportimage.webp"
                alt="Two professionals reviewing financial documents together at a desk"
                className="w-full h-48 sm:h-64 md:w-[560px] md:h-[750px] object-cover"
              />
            </div>
          </div>

          {/* Right: services list */}
          <div className="flex flex-col md:mt-24">
            {services.map((service, idx) => (
              <ServiceItem
                key={service.title}
                title={service.title}
                description={service.description}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}