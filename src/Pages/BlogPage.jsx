import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import blogData from "../data/Blogdata.json";

gsap.registerPlugin(ScrollTrigger);

// ─── Blog Card ─────────────────────────────────────────────────────────────
function BlogCard({ title, image, excerpt, slug, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const excerptRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    // Card entrance animation
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.1, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );

    // Animate inner elements with stagger
    gsap.fromTo([titleRef.current, excerptRef.current, linkRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1 + 0.2, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );
  }, [index]);

  const handleCardHover = (isEnter) => {
    if (isEnter) {
      gsap.to(cardRef.current, {
        y: -8,
        boxShadow: "0 20px 25px -12px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          ref={imageRef}
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 ref={titleRef} className="text-gray-900 font-normal text-2xl mb-4">{title}</h3>
        <p ref={excerptRef} className="text-gray-900 text-md flex-1 mb-4">{excerpt}</p>
        
        {/* Use Link with the dynamic slug */}
        <Link
          ref={linkRef}
          to={`/blogs/${slug}`}
          className="text-[#38b6ff] text-lg font-normal hover:text-blue-700 transition-colors w-fit"
        >
          Read full post
        </Link>
      </div>
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full bg-blue-50 py-20 min-h-[540px] px-6 text-center overflow-hidden">
      <h1 ref={titleRef} className="text-4xl md:text-6xl font-normal text-gray-900 mb-3 mt-24">Our Blog</h1>
      <p ref={descRef} className="text-gray-800 text-xl max-w-xl mx-auto">
        Accounting data is often used by governments and policymakers for economic planning and analysis.
      </p>
    </div>
  );
}

// ─── Blog Grid ─────────────────────────────────────────────────────────────
function BlogGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 90%", toggleActions: "play none none reverse" }
      }
    );
  }, []);

  return (
    <section className="bg-white py-14 px-6 md:px-12 overflow-hidden">
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-16">
        {blogData.map((post, index) => (
          <BlogCard key={post.id} {...post} index={index} />
        ))}
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function BlogPage() {
  return (
    <div className="bg-white">
      <Hero />
      <BlogGrid />
    </div>
  );
}