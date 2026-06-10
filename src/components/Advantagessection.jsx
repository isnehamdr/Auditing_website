import React, { useState } from "react";

const cards = [
  {
    id: "01",
    title: "Financial Clarity",
    desc: "Accounting provides a clear and organized record of financial transactions, enabling individuals and businesses to understand their financial position at any given time.",
  },
  {
    id: "02",
    title: "Decision Support",
    desc: "This information is crucial for making strategic decisions, setting goals, and planning for the future. Financial statements and reports generated through accounting help.",
    active: true,
  },
  {
    id: "03",
    title: "Resource Allocation",
    desc: "Businesses use accounting information to allocate resources efficiently. This includes determining the profitability of products or services.",
  },
];

const stats = [
  { value: "10+", label: "Years in Business" },
  { value: "8+", label: "Years in Offshoring" },
  { value: "30+", label: "Employees" },

];

const AdvantagesSection = () => {
  const [activeId, setActiveId] = useState("02");

  return (
    <section className="w-full bg-[#eef2f9] py-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* ── TOP: Cards + Text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">

          {/* Left: Feature Cards */}
          <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
            {cards.map((card, index) => {
              const isActive = activeId === card.id;
              // Check if this is the second card (index 1)
              const isSecondCard = index === 1;
              
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveId(card.id)}
                  className={`
                    cursor-pointer px-6 py-5 transition-all duration-200 w-full
                    ${isActive || isSecondCard ? "bg-[#38b6ff] text-white shadow-lg" : "bg-white text-gray-800 hover:shadow-md"}
                    ${isSecondCard ? "lg:translate-x-12 md:translate-x-4 translate-x-2" : ""}
                  `}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className={`
                        text-base sm:text-2xl md:text-3xl font-normal
                        ${isActive || isSecondCard ? "text-white" : "text-gray-900"}
                      `}
                    >
                      {card.title}
                    </h3>
                    <span
                      className={`
                        text-md font-medium tabular-nums ml-4 flex-shrink-0
                        ${isActive || isSecondCard ? "text-blue-200" : "text-gray-700"}
                      `}
                    >
                      {card.id}
                    </span>
                  </div>
                  <p
                    className={`
                      text-base sm:text-lg leading-relaxed
                      ${isActive || isSecondCard ? "text-blue-100" : "text-gray-700"}
                    `}
                  >
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Heading + CTA */}
          <div className="flex flex-col gap-5">
            <p className="text-[#38b6ff] text-xl font-medium mt-8">
              Advantages
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-normal text-gray-900">
              Empowering Decisions With Financial Precision
            </h2>
            <p className="text-gray-800 text-sm sm:text-xl max-w-2xl">
              A top-tier chartered accountancy firm based in Nepal, specializing in audit, tax, and advisory services, aims to increase its length of operations, ensuring long-term sustainability, deeper client relationships, and a lasting footprint in the Nepalese financial landscape.
            </p>
            <div className="pt-2">
              <button className="bg-[#38b6ff] hover:bg-blue-700 active:scale-95 text-white text-sm sm:text-lg font-semibold px-8 py-3.5 rounded-full transition-all duration-200">
                Get a Free Consultation
              </button>
            </div>
          </div>
        </div>

      
{/* ── BOTTOM: Stats Bar ── */}
<div className="border-dotted border-[#38b6ff] border-2 p-6 sm:p-8 mt-10">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
    {stats.map((s, i) => (
      <div key={i} className="flex flex-col gap-2 text-center">
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#38b6ff]">
          {s.value}
        </span>
        <span className="text-gray-800 text-sm sm:text-base md:text-lg font-medium">
          {s.label}
        </span>
      </div>
    ))}
  </div>
</div>

      </div>
    </section>
  );
};

export default AdvantagesSection;