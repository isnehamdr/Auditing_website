import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: 1,
    title: "Identification of Transactions",
    description:
      "Recognize and identify all financial transactions that occur within the business. This includes sales, purchases, expenses.",
  },
  {
    number: 2,
    title: "Posting to Ledgers",
    description:
      "The general ledger contains all the accounts used by the business and summarizes the financial activity.",
  },
  {
    number: 3,
    title: "Post-Closing Trial Balance",
    description:
      "Verify that all temporary accounts have been closed and that the post-closing trial balance is in balance.",
  },
];

const StepCard = ({ number, title, description, index }) => {
  const cardRef = useRef(null);
  const circleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const circle = circleRef.current;
    const content = contentRef.current;

    // Set initial styles
    gsap.set(card, { opacity: 0, y: 40 });
    gsap.set(circle, { scale: 0, rotation: -180 });
    gsap.set(content, { opacity: 0, x: -20 });

    // Main card animation
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Circle number animation with bounce
    gsap.to(circle, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      delay: index * 0.2 + 0.2,
      ease: "back.out(0.6)",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Content text animation
    gsap.to(content, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      delay: index * 0.2 + 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Hover animation for circle
    const hoverAnimation = gsap.to(circle, {
      scale: 1.1,
      backgroundColor: "#38b6ff",
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out",
      paused: true,
    });

    const handleMouseEnter = () => hoverAnimation.play();
    const handleMouseLeave = () => hoverAnimation.reverse();

    circle.addEventListener("mouseenter", handleMouseEnter);
    circle.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      circle.removeEventListener("mouseenter", handleMouseEnter);
      circle.removeEventListener("mouseleave", handleMouseLeave);
      hoverAnimation.kill();
    };
  }, [index]);

  return (
    <div ref={cardRef} className="flex flex-row gap-4 sm:flex-col sm:gap-0">
      <div
        ref={circleRef}
        className="flex-shrink-0 w-10 h-10 rounded-full shadow-lg border border-blue-200 flex items-center justify-center text-[#38b6ff] font-bold text-lg sm:mb-4 bg-white transition-colors duration-200 cursor-pointer"
      >
        {number}
      </div>
      <div ref={contentRef}>
        <h3 className="text-xl md:text-2xl font-normal text-[#1a1a2e] mb-2">
          {title}
        </h3>
        <p className="text-md sm:text-lg text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default function Process() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const dividerRef = useRef(null);
  const blueLineRef = useRef(null);
  const stepsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label animation
      gsap.set(labelRef.current, { opacity: 0, x: -30 });
      gsap.to(labelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Heading animation
      gsap.set(headingRef.current, { opacity: 0, x: -30 });
      gsap.to(headingRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "back.out(0.5)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Description animation
      gsap.set(descriptionRef.current, { opacity: 0, x: 30 });
      gsap.to(descriptionRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Divider base line animation
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.to(dividerRef.current, {
        scaleX: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Blue line animation - moves from left to right
      gsap.set(blueLineRef.current, { width: "0%" });
      gsap.to(blueLineRef.current, {
        width: "50%",
        duration: 1.2,
        delay: 0.7,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: dividerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Staggered animation for step items
      const stepItems = document.querySelectorAll('.step-item');
      if (stepItems.length) {
        gsap.fromTo(stepItems,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-12 sm:py-20 px-4 sm:px-16 overflow-hidden">
      {/* Top row: heading + description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-start mb-6 sm:mb-8">
        <div>
          <p ref={labelRef} className="text-xl text-[#38b6ff] mb-2 sm:mb-4">
            Process
          </p>
          <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1a1a2e]">
            How It Works
          </h2>
        </div>
        <p ref={descriptionRef} className="text-lg  text-gray-700 pt-0 md:pt-2">
          The process of accounting involves a series of systematic steps to
          record, analyze, and report financial transactions. Here is an
          overview of the accounting process:
        </p>
      </div>

      {/* Divider with moving blue line */}
      <div ref={dividerRef} className="relative mb-6 sm:mb-10 overflow-hidden">
        <div className="w-full h-px bg-gray-200" />
        <div 
          ref={blueLineRef} 
          className="absolute top-0 h-0.5 bg-[#38b6ff]" 
          style={{ width: '0%' }}
        />
      </div>

      {/* Steps — vertical list with dividers on mobile, 3-col grid on sm+ */}
      <div ref={stepsContainerRef} className="flex flex-col divide-y divide-gray-100 sm:divide-y-0 sm:grid sm:grid-cols-3 sm:gap-8 md:gap-10">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="step-item py-5 first:pt-0 last:pb-0 sm:py-0"
          >
            <StepCard {...step} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}