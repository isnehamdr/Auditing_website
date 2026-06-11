export default function HowWeWork() {
  // ✅ Updated labels to be realistic and distinct
  const stats = [
    { value: "6K+", label: "Satisfied Clients" },
    { value: "10K+", label: "Projects Completed" },
    { value: "18+", label: "Years of Experience" },
    { value: "64", label: "Expert Advisors" },
  ];

  return (
    <div className="bg-blue-50 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* How We Work Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: Image Card */}
          <div className="relative w-full">
            {/* Image Container */}
            <div 
              className="w-full h-[450px] "
              style={{
                background: "url('/images/about2.jpg') center/cover no-repeat",
              }}
            ></div>
            
            {/* Floating Caption Card */}
            <div className="absolute -bottom-6 left-6 right-6 md:left-16  bg-white p-6 shadow-lg ">
              <p className="text-[#38b6ff] text-lg md:text-2xl font-medium ">
                Our experienced team conducts a personalized consultation to discuss your financial objectives.
              </p>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="md:pt-8">
            <h2 className="text-gray-900 font-normal text-4xl md:text-5xl mb-6 leading-tight">
              How We Work
            </h2>
            <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
              We begin by gaining a deep understanding of your unique requirements, 
              challenges, and goals. This foundational step allows us to tailor our 
              services to meet your specific needs and ensure long-term financial success.
            </p>
            <button className="bg-[#38b6ff] hover:bg-blue-400 transition-colors text-white text-lg font-medium px-8 py-3.5 rounded-full shadow-md hover:shadow-lg">
              Explore Our Services
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="border-2 border-dashed border-[#38b6ff]  p-8  ">
            {/* ✅ Changed to grid-cols-2 on mobile, grid-cols-4 on desktop to fit all 4 items perfectly */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <span className="text-4xl sm:text-5xl font-bold text-[#38b6ff]">
                    {s.value}
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}