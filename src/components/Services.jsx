import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_PATH;

const ServiceCard = ({ icon, title, description, index, slug }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  const handleLearnMore = () => {
    navigate(`/service-page/${slug}`);
  };

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center text-center bg-white border border-gray-100 rounded-xl px-6 sm:px-8 pt-12 sm:pt-14 pb-10 shadow-sm hover:shadow-md transition-shadow duration-300 mt-6 sm:mt-7 opacity-0"
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-18 sm:h-18 rounded-full bg-[#38b6ff] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-12 overflow-hidden">
        {icon ? (
          <img
            src={`${IMAGE_BASE_URL}/${icon}`}
            alt={title}
            className="sm:w-12 sm:h-12 w-7 h-7  object-contain"
          />
        ) : (
          <div className="w-7 h-7 bg-white/30 rounded-full" />
        )}
      </div>
      <h3 className="text-gray-800 text-4xl mb-4 mt-4 ">{title}</h3>
      <h3
        className="text-gray-700 text-lg mb-8 flex-1 prose prose-sm max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: description }}
      />
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
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/service`);
        const data = response.data.data ?? [];

        // Take the latest 3 by created_at, since the API itself
        // returns everything ordered by sort_order.
        const latestThree = [...data]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        setServices(latestThree);
      } catch (err) {
        console.error("fetching error", err);
        setError("Could not load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto overflow-hidden"
    >
      <div ref={headerRef} className="text-center mb-14 opacity-0">
        <p className="text-[#38b6ff] text-3xl font-medium tracking-wide mb-3">
          Our Services
        </p>
        <h2 className="text-gray-900 text-4xl md:text-6xl font-light">
          We Provide Best <br /> Accounting Service
        </h2>
      </div>

      {error && <p className="text-center text-red-500 mb-6">{error}</p>}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10 sm:gap-y-12">
        {!loading &&
          !error &&
          services.map((service, index) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.short_description ?? service.description}
              slug={service.slug}
              index={index}
            />
          ))}
      </div>
    </section>
  );
};

export default Services;