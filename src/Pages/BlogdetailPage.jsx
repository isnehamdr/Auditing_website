import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import blogData from "../data/Blogdata.json";

gsap.registerPlugin(ScrollTrigger);

// ─── Recent Post Card ──────────────────────────────────────────────────────
function RecentPostCard({ title, date, image, slug, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, delay: index * 0.1, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 90%", toggleActions: "play none none reverse" }
      }
    );
  }, [index]);

  const handleCardHover = (isEnter) => {
    if (isEnter) {
      gsap.to(cardRef.current, {
        x: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(cardRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <Link 
      ref={cardRef}
      to={`/blogs/${slug}`} 
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
      className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0 hover:opacity-80 transition-opacity"
    >
      <img src={image} alt={title} className="w-32 h-32 rounded-lg object-cover flex-shrink-0" />
      <div className="min-w-0">
        <h4 className="text-gray-800 text-sm font-semibold leading-snug mb-1.5 line-clamp-2">{title}</h4>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
    </Link>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ recentPosts }) {
  const sidebarRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(sidebarRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: sidebarRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );

    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );
  }, []);

  return (
    <aside 
      ref={sidebarRef} 
      className="w-full lg:w-90 flex-shrink-0 lg:sticky lg:top-24 lg:self-start"
      style={{ height: 'fit-content' }}
    >
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h3 ref={headingRef} className="text-gray-900 font-bold text-3xl mb-5">Recent Posts</h3>
        <div>
          {recentPosts.map((post, index) => (
            <RecentPostCard key={post.id} {...post} index={index} />
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ title, date, excerpt, image }) {
  const heroRef = useRef(null);
  const dateRef = useRef(null);
  const titleRef = useRef(null);
  const excerptRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(dateRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(excerptRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-[50vh] min-h-[540px] overflow-hidden flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      />
      
      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Hero text */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
        <p ref={dateRef} className="text-gray-300 text-sm md:text-base mb-4 tracking-wide">{date}</p>
        <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>
        <p ref={excerptRef} className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {excerpt}
        </p>
      </div>
    </section>
  );
}

// ─── Main Article ──────────────────────────────────────────────────────────
function Article({ post }) {
  const articleRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);
  const bulletRefs = useRef([]);
  const conclusionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(articleRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: articleRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );

    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );

    gsap.fromTo(introRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: introRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );

    // Animate bullet points with stagger
    bulletRefs.current.forEach((bullet, index) => {
      gsap.fromTo(bullet,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.3 + (index * 0.1), ease: "power2.out",
          scrollTrigger: { trigger: bullet, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });

    gsap.fromTo(conclusionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: conclusionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      }
    );
  }, []);

  return (
    <article ref={articleRef} className="flex-1 min-w-0">
      <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h2>

      <p ref={introRef} className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">{post.content.intro}</p>

      {/* Bullet points */}
      <ul className="space-y-6 mb-10">
        {post.content.bulletPoints.map((item, idx) => (
          <li 
            key={idx} 
            ref={(el) => (bulletRefs.current[idx] = el)}
            className="flex gap-4 text-base md:text-lg text-gray-600 leading-relaxed"
          >
            <span className="mt-2 w-2.5 h-2.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
            <p>
              <span className="font-semibold text-gray-800">{item.heading} </span>
              {item.text}
            </p>
          </li>
        ))}
      </ul>

      {/* Closing paragraph */}
      <p ref={conclusionRef} className="text-gray-600 text-base md:text-lg leading-relaxed">{post.content.conclusion}</p>
    </article>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function BlogDetailPage() {
  // Extract the slug from the URL parameters
  const { slug } = useParams();
  
  // Find the specific blog post data based on the slug
  const currentPost = blogData.find((p) => p.slug === slug);

  // Handle case where slug doesn't match any post
  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Blog Post Not Found</h1>
      </div>
    );
  }

  // Generate recent posts dynamically (exclude the current post and take the first 4)
  const recentPosts = blogData.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Hero 
        title={currentPost.title} 
        date={currentPost.date} 
        excerpt={currentPost.excerpt} 
        image={currentPost.image}
      />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 flex flex-col lg:flex-row gap-12 items-start">
        <Article post={currentPost} />
        <Sidebar recentPosts={recentPosts} />
      </div>
    </div>
  );
}