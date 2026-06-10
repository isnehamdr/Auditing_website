import React from "react";

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
  return (
    <section className="max-w-7xl mx-auto  py-20 px-4 sm:px-8 lg:px-16">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-6">
          {/* Label */}
          <p className="text-[#38b6ff] text-2xl font-medium ">About Us</p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-6xl font-normal text-gray-900 ">
            Mastering The Art And Science OfAccounting
          </h2>

          {/* Body text */}
          <p className="text-gray-700 text-sm sm:text-xl max-w-xl">
            The profession also upholds ethical standards and often requires continuing
            education to stay abreast of changes in accounting principles, tax laws,
            and technology.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {features.map((f) => (
              <div key={f.label} className="flex items-start gap-2">
                <ChevronDoubleRight />
                <span className="text-gray-800 text-sm sm:text-2xl font-medium">{f.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button className="bg-[#38b6ff] active:scale-95 text-white text-md sm:text-xl font-normal px-6 py-2 rounded-full transition-all duration-200">
              About Us
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="relative w-full">
          {/* Image */}
          <div className="w-full overflow-hidden bg-gray-100 aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
            <img
              src="/images/about.webp"
              alt="Professional accountant reviewing financial charts"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Blue caption box overlapping the bottom of the image */}
          <div className="bg-[#38b6ff] text-white text-md sm:text-2xl px-5 py-5  lg:rounded-b-none lg:rounded-br-lg -mt-1">
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