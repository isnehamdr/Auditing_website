import React from "react";

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

const ServiceItem = ({ title, description }) => (
  <div className="flex items-start justify-between gap-4 py-5 border-b border-blue-200 last:border-b-0 first:pt-0">
    <div className="flex-1">
      {/* mobile: text-2xl — desktop: text-5xl (unchanged) */}
      <h3 className="text-2xl md:text-4xl font-normal text-[#1a2f5e] mb-1">
        {title}
      </h3>
      {/* mobile: mt-2 — desktop: mt-6 (unchanged) */}
      <p className="text-base md:text-lg text-gray-700 mt-2 md:mt-6">{description}</p>
    </div>
    <button
      aria-label={`Learn more about ${title}`}
      className="mt-1 flex-shrink-0 w-8 h-8 rounded-full border border-blue-200 flex items-center justify-center hover:bg-blue-100 transition-colors duration-200"
    >
      <ChevronRight />
    </button>
  </div>
);

export default function SupportServices() {
  return (
    <section className="bg-[#eef2f9]">
      <div className="pb-20 px-4 sm:px-16 max-w-7xl mx-auto">
        {/* Section label */}
        <p className="text-lg text-[#38b6ff] mb-4 font-normal">
          Our Support Services
        </p>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: heading + image */}
          <div>
            <h2 className="text-3xl md:text-6xl font-normal text-[#1a1a2e] mb-12">
              You Can Trust Us
            </h2>
            {/* mobile: full-width natural height — desktop: fixed size (unchanged) */}
            <div className="overflow-hidden w-full md:aspect-[3/4] md:w-auto">
              <img
                src="/images/supportimage.webp"
                alt="Two professionals reviewing financial documents together at a desk"
                className="w-full h-48 sm:h-64 md:w-[560px] md:h-[750px] object-cover"
              />
            </div>
          </div>

          {/* Right: services list — removed mt-24 on mobile */}
          <div className="flex flex-col divide-y-3 md:mt-24">
            {services.map((service) => (
              <ServiceItem
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}