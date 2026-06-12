import { useState } from "react";

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

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div
    className={`border rounded-lg overflow-hidden transition-colors duration-200 ${
      isOpen ? "border-gray-300" : "border-gray-200 hover:border-gray-300"
    } bg-white`}
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
      <div className="px-5 pb-4 border-t border-gray-100">
        <p className="text-lg text-gray-800  pt-3">{answer}</p>
      </div>
    </div>
  </div>
);

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-gray-50 min-h-screen flex items-start justify-center px-6 py-20 ">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-10 lg:gap-16 items-start sm:px-16">

        {/* Left: Heading */}
        <div className="max-w-xl flex-shrink-0">
          <p className="text-xl font-medium text-[#38b6ff] tracking-wide mb-3">
            FAQ's
          </p>
          <h2 className="text-3xl lg:text-6xl font-normal text-gray-900 ">
            Questions That We Are Asked Most Often
          </h2>
        </div>

        {/* Right: Accordion */}
        <div className="flex-1 flex flex-col gap-3 w-full">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}