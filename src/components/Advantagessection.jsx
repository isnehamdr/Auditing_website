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
  { value: "6K+", label: "Satisfied Clients" },
  { value: "10K+", label: "Satisfied Clients" },
  { value: "18+", label: "Satisfied Clients" },
  { value: "64", label: "Satisfied Clients" },
];

const AdvantagesSection = () => {
  const [activeId, setActiveId] = useState("02");

  return (
    <section className="w-full bg-[#eef2f9] py-14 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* ── TOP: Cards + Text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">

          {/* Left: Feature Cards */}
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {cards.map((card) => {
              const isActive = activeId === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveId(card.id)}
                  className={`cursor-pointer px-12 py-5 transition-all duration-200 ${
                    isActive
                      ? "bg-[#38b6ff] text-white shadow-lg"
                      : "bg-white text-gray-800 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className={`text-base sm:text-lg font-semibold ${
                        isActive ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <span
                      className={`text-sm font-medium tabular-nums ml-4 flex-shrink-0 ${
                        isActive ? "text-blue-200" : "text-gray-400"
                      }`}
                    >
                      {card.id}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isActive ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Heading + CTA */}
          <div className="flex flex-col gap-5">
            <p className="text-[#38b6ff] text-lg font-medium ">
              Advantages
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Empowering Decisions With Financial Precision
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
              In summary, accounting is an essential tool for maintaining financial
              order, supporting decision-making, and fostering transparency and
              accountability in both individual and business financial activities.
            </p>
            <div className="pt-2">
              <button className="bg-[#38b6ff] hover:bg-blue-700 active:scale-95 text-white text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full transition-all duration-200">
                Get a Free Consultation
              </button>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Stats Bar ── */}
        <div className="border-t border-gray-300 pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#38b6ff]">
                {s.value}
              </span>
              <span className="text-gray-500 text-sm">{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AdvantagesSection;