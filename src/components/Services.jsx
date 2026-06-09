import React from "react";

const services = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" />
      </svg>
    ),
    title: "Financial Analysis",
    description:
      "These services are designed to help manage financial processes, ensure compliance with regulations, and provide accurate financial information for decision-making.",
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 4a2 2 0 11-4 0 2 2 0 014 0zM5 18a2 2 0 114 0 2 2 0 01-4 0z" />
      </svg>
    ),
    title: "Software Integration",
    description:
      "These services are designed to help manage financial processes, ensure compliance with regulations, and provide accurate financial information for decision-making.",
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Compliance Services",
    description:
      "These services are designed to help manage financial processes, ensure compliance with regulations, and provide accurate financial information for decision-making.",
  },
];

const ServiceCard = ({ icon, title, description }) => (
  // 1. Added 'relative' to the card container.
  // 2. Added 'mt-6 sm:mt-7' to push the card down, creating space for the top half of the icon.
  // 3. Increased top padding ('pt-12 sm:pt-14') so text doesn't overlap the bottom half of the icon.
  <div className="relative flex flex-col items-center text-center bg-white border border-gray-100  px-6 sm:px-8 pt-12 sm:pt-14 pb-10 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6 sm:mt-7">
    
    {/* Icon circle: Fixed typo 'abolute' -> 'absolute'. Now correctly positioned relative to the card. */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-18 sm:h-18 rounded-full bg-[#38b6ff] flex items-center justify-center flex-shrink-0">
      {icon}
    </div>

    {/* Title */}
    <h3 className="text-gray-800 text-3xl mb-4 mt-4 font-normal">
      {title}
    </h3>

    {/* Description */}
    <p className="text-gray-700 text-lg  mb-8 flex-1">
      {description}
    </p>

    {/* Learn More button */}
    <button className="mt-auto border border-gray-200 text-gray-600 bg-blue-100 hover:border-[#38b6ff] hover:text-white hover:bg-[#38b6ff] text-lg font-medium px-7 py-2.5 rounded-full transition-colors duration-200 ">
      Learn More
    </button>
  </div>
);

const Services = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-14">
        <p className="text-[#38b6ff] text-3xl font-medium tracking-wide mb-3">
          Our Services
        </p>
        <h2 className="text-gray-900 text-4xl md:text-6xl font-light">
          We Provide Best
          <br />
          Accounting Service
        </h2>
      </div>

      {/* Cards grid */}
      {/* Added 'gap-y-10 sm:gap-y-12' to ensure the top icons of the second row don't overlap the cards in the first row */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 sm:gap-y-12">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;