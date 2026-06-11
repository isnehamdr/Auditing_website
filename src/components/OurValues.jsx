const corePillars = [
  {
    title: "Our Vision",
    description:
      "To be the most trusted financial partner, empowering businesses to achieve sustainable growth and long-term prosperity through innovative and transparent financial solutions.",
  },
  {
    title: "Our Mission",
    description:
      "To deliver exceptional, tailored financial services that ensure regulatory compliance, optimize operational performance, and provide accurate insights for confident decision-making.",
  },
  {
    title: "Our Values",
    description:
      "We are guided by unwavering integrity, meticulous accuracy, and client-centric collaboration, fostering a culture of trust and excellence in every financial process we manage.",
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      width="13"
      height="13"
      fill="none"
      className="group-hover:stroke-white transition-colors"
    >
      <path
        d="M3 7h8M7 3l4 4-4 4"
        stroke="#6b8cba"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:stroke-white"
      />
    </svg>
  );
}

export default function OurValues() {
  return (
    <div className="bg-blue-50 py-20 px-5 sm:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <p className="text-center text-[#38b6ff] text-xl font-medium tracking-widest uppercase mb-3">
          Vision, Mission & Values
        </p>
        <h2
          className="text-center font-medium text-blue-950 text-5xl tracking-wide  mb-12"
          
        >
          Driven by Purpose,
          <br />
          Guided by Principles
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-600 border-dotted  overflow-hidden  ">
          {corePillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className={`flex flex-col px-12 py-14 ${
                i < corePillars.length - 1
                  ? "border-b md:border-b-0 md:border-r border-gray-600 border-dotted"
                  : ""
              }`}
            >
              {/* Title */}
              <h3
                className="text-black font-medium mb-8 text-4xl"
               
              >
                {pillar.title}
              </h3>

              {/* Body */}
              <p className="text-gray-800 text-lg flex-1 mb-7">
                {pillar.description}
              </p>

              {/* Arrow Button */}
              {/* <button 
                className="group w-9 h-9 border border-blue-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                aria-label={`Learn more about ${pillar.title}`}
              >
                <ArrowIcon />
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}