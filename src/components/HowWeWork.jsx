import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const stats = [
    { value: "50+", label: "Satisfied Clients" },
    { value: "100+", label: "Projects Completed" },
    { value: "3+", label: "Years of Experience" },
    { value: "3", label: "Expert Advisors" },
  ];

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const captionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade in animations
      gsap.fromTo(imageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(captionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: captionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(headingRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: descriptionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: buttonRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-blue-50 min-h-screen py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* How We Work Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left: Image Card */}
          <div className="relative w-full">
            <div 
              ref={imageRef}
              className="w-full h-[450px]"
              style={{
                background: "url('/images/about2.jpg') center/cover no-repeat",
              }}
            ></div>
            
            <div 
              ref={captionRef}
              className="absolute -bottom-6 left-6 right-6 md:left-16 bg-white p-6 shadow-lg"
            >
              <p className="text-[#38b6ff] text-lg md:text-2xl font-medium">
                Our experienced team conducts a personalized consultation to discuss your financial objectives.
              </p>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="md:pt-8">
            <h2 
              ref={headingRef}
              className="text-gray-900 font-normal text-4xl md:text-5xl mb-6 leading-tight"
            >
              How We Work
            </h2>
            <p 
              ref={descriptionRef}
              className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed"
            >
              We begin by gaining a deep understanding of your unique requirements, 
              challenges, and goals. This foundational step allows us to tailor our 
              services to meet your specific needs and ensure long-term financial success.
            </p>
            <Link 
              to="/services"
              ref={buttonRef}
              className="bg-[#38b6ff] hover:bg-blue-400 transition-colors text-white text-lg font-medium px-8 py-3.5 rounded-full shadow-md hover:shadow-lg"
            >
              Explore Our Services
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div 
            ref={statsRef}
            className="border-2 border-dashed border-[#38b6ff] bg-white p-8"
          >
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