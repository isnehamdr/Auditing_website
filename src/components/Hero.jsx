import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#38b6ff] overflow-hidden">
      <div className="absolute top-36 left-0 w-64 h-64 md:w-52 md:h-72 overflow-hidden z-0">
          <img 
            src="/images/background.png" 
            alt="Professional" 
            className="w-full h-full object-cover brightness-250" 
          />
        </div>
      
      {/* 1. Right Panel - Made absolute so it bleeds to the right edge of the screen */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full overflow-hidden z-0">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80"
          alt="Accountant working at desk"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3FDB]/20 to-transparent pointer-events-none" />
      </div>

      {/* 2. Left Panel Wrapper - Uses max-w-7xl mx-auto to perfectly align with the Navbar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full min-h-screen flex flex-col md:flex-row">
        
        {/* Image in top-left corner */}
        
        
        {/* Left — Blue Panel Content */}
        {/* Removed max-w-4xl, and matched padding (px-8 md:px-12) to the Navbar */}
        <div className="relative z-10 flex flex-col justify-center w-full md:w-1/2 px-8 md:px-12 pt-32  md:py-12 overflow-hidden">
          
          {/* Headline */}
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-normal mb-6 ">
            Audit, tax, and 
            <br />
            advisory, Built around 
            
           your business
          </h1>

          {/* Sub-copy */}
          <p className="text-white/80 text-sm md:text-lg mb-10 tracking-[1px]">
           A decade of independent audit, tax, and advisory practice in Nepal, led by chartered accountants. Member of Praxity Global Alliance, with senior partner attention on every engagement.
          </p>

          {/* CTA */}
          <div>
            <button className="bg-white text-gray-800 hover:bg-[#38b6ff] hover:border hover:border-white hover:text-white font-medium text-lg px-8 py-4 rounded-full transition-colors duration-200 ">
              Request a Consultation
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;