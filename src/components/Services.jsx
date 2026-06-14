import React, { useEffect, useRef } from "react"; 
import gsap from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { useNavigate } from "react-router-dom"; // ✅ 1. Import useNavigate

// Register GSAP plugins 
gsap.registerPlugin(ScrollTrigger); 

const services = [ 
  { 
    id: 1, 
    slug: "auditing", // ✅ 2. Added slug mapped to your JSON data
    icon: ( 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> 
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" /> 
      </svg> 
    ), 
    title: "Audit & Assurance", 
    description: "Independent assurance that stands up to scrutiny — from boards, regulators, lenders, and investors. Statutory audits, internal audits, due diligence, and special-purpose work.", 
  }, 
  { 
    id: 2, 
    slug: "compliance-services", // ✅ 2. Added slug mapped to your JSON data
    icon: ( 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> 
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 4a2 2 0 11-4 0 2 2 0 014 0zM5 18a2 2 0 114 0 2 2 0 01-4 0z" /> 
      </svg> 
    ), 
    title: "Tax & Regulatory Compliance", 
    description: "Practical tax and regulatory advice for businesses operating in Nepal's constantly shifting landscape. Income tax, VAT, customs, dispute defence, and sector-specific regulators.", 
  }, 
  { 
    id: 3, 
    slug: "financial-analysis", // ✅ 2. Added slug mapped to your JSON data
    icon: ( 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> 
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /> 
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> 
      </svg> 
    ), 
    title: "Business Advisory & Consulting", 
    description: "The work that helps a business run better, grow faster, and make sharper decisions. Business model design, internal controls, outsourced finance, and training.", 
  }, 
]; 

const ServiceCard = ({ icon, title, description, index, slug }) => { 
  const cardRef = useRef(null); 
  const navigate = useNavigate(); // ✅ 3. Initialize navigate hook

  useEffect(() => { 
    // Animate each card individually with GSAP 
    gsap.fromTo(cardRef.current, 
      { opacity: 0, y: 50, scale: 0.9 }, 
      { 
        opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.15, ease: "power3.out", 
        scrollTrigger: { 
          trigger: cardRef.current, start: "top 85%", end: "bottom 60%", toggleActions: "play none none reverse", 
        }, 
      } 
    ); 
  }, [index]); 

  // ✅ 4. Create redirect handler
  const handleLearnMore = () => {
    navigate(`/service-page/${slug}`);
  };

  return ( 
    <div ref={cardRef} className="relative flex flex-col items-center text-center bg-white border border-gray-100 px-6 sm:px-8 pt-12 sm:pt-14 pb-10 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6 sm:mt-7 opacity-0" > 
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-18 sm:h-18 rounded-full bg-[#38b6ff] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-12"> 
        {icon} 
      </div> 
      <h3 className="text-gray-800 text-3xl mb-4 mt-4 font-normal"> 
        {title} 
      </h3> 
      <p className="text-gray-700 text-lg mb-8 flex-1"> 
        {description} 
      </p> 
      {/* ✅ 5. Attach onClick handler to the button */}
      <button 
        onClick={handleLearnMore}
        className="mt-auto border border-gray-200 text-gray-600 bg-blue-100 hover:border-[#38b6ff] hover:text-white hover:bg-[#38b6ff] text-lg font-medium px-7 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105"
      > 
        Learn More 
      </button> 
    </div> 
  ); 
}; 

const Services = () => { 
  const sectionRef = useRef(null); 
  const headerRef = useRef(null); 

  useEffect(() => { 
    // Animate section header 
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: -30 }, 
      { 
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", 
        scrollTrigger: { 
          trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse", 
        }, 
      } 
    ); 

    // Cleanup ScrollTriggers 
    return () => { 
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
    }; 
  }, []); 

  return ( 
    <section ref={sectionRef} className="bg-white py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto overflow-hidden"> 
      {/* Section header */} 
      <div ref={headerRef} className="text-center mb-14 opacity-0"> 
        <p className="text-[#38b6ff] text-3xl font-medium tracking-wide mb-3"> Our Services </p> 
        <h2 className="text-gray-900 text-4xl md:text-6xl font-light"> We Provide Best <br /> Accounting Service </h2> 
      </div> 

      {/* Cards grid */} 
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 sm:gap-y-12"> 
        {services.map((service, index) => ( 
          <ServiceCard 
            key={service.id} 
            icon={service.icon} 
            title={service.title} 
            description={service.description} 
            slug={service.slug} // ✅ 6. Pass the slug down to the card
            index={index} 
          /> 
        ))} 
      </div> 
    </section> 
  ); 
}; 

export default Services;