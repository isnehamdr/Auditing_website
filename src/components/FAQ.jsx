import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: 1,
    question: "What accounting services does your firm provide?",
    answer:
      "We offer a full range of accounting services including bookkeeping, tax preparation, financial reporting, payroll processing, and audit support tailored to your business needs.",
  },
  {
    id: 2,
    question: "How can accounting services benefit my business?",
    answer:
      "Professional accounting helps you stay compliant, reduce tax liabilities, make informed financial decisions, and free up time to focus on growing your business.",
  },
  {
    id: 3,
    question: "What is the process for getting started with your accounting services?",
    answer:
      "Getting started is simple — schedule a free consultation, share your financial documents, and we'll set up a customized plan and onboarding timeline for your business.",
  },
  {
    id: 4,
    question: "How do you ensure the security and confidentiality of my financial information?",
    answer:
      "We use industry-standard encryption, secure client portals, and strict access controls. All staff are bound by confidentiality agreements and we comply with relevant data protection regulations.",
  },
];

const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-300 flex-shrink-0 text-gray-400 ${
      isOpen ? "rotate-180" : "rotate-0"
    }`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
  const itemRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (itemRef.current && isOpen) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className={`border rounded-lg overflow-hidden transition-colors duration-200 ${
        isOpen ? "border-gray-300" : "border-gray-200 hover:border-gray-300"
      } bg-white`}
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease ${index * 0.1}s forwards`
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 px-5 py-8 text-left cursor-pointer bg-transparent text-[#38b6ff]"
        aria-expanded={isOpen}
      >
        <span className="text-xl text-gray-800">{question}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-48" : "max-h-0"
        }`}
      >
        <div ref={contentRef} className="px-5 pb-4 border-t border-gray-100">
          <p className="text-lg text-gray-800 pt-3">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const accordionRef = useRef(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: badgeRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      // Accordion container animation
      gsap.fromTo(accordionRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: accordionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-gray-50 min-h-screen flex items-start justify-center px-6 py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10 lg:gap-16 items-start sm:px-16">

        {/* Left: Heading */}
        <div className="max-w-xl flex-shrink-0">
          <p 
            ref={badgeRef}
            className="text-xl font-medium text-[#38b6ff] tracking-wide mb-3"
          >
            FAQ's
          </p>
          <h2 
            ref={headingRef}
            className="text-3xl lg:text-6xl font-normal text-gray-900"
          >
            Questions That We Are Asked Most Often
          </h2>
        </div>

        {/* Right: Accordion */}
        <div 
          ref={accordionRef}
          className="flex-1 flex flex-col gap-3 w-full"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => handleToggle(faq.id)}
              index={index}
            />
          ))}
        </div>
      </div>

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
      `}</style>
    </section>
  );
}