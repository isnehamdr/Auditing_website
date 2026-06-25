import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_PATH;

// Builds a full image URL from a relative path returned by the API.
function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${IMAGE_BASE_URL}/${path}`;
}

// Format date helper
const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// ─── Blog Card ─────────────────────────────────────────────────────────────
function BlogCard({ title, image, excerpt, slug, index, created_at }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const excerptRef = useRef(null);
  const linkRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Card entrance animation
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: "power2.out",
        scrollTrigger: { 
          trigger: cardRef.current, 
          start: "top 85%", 
          toggleActions: "play none none reverse" 
        }
      }
    );

    // Animate inner elements with stagger
    gsap.fromTo([titleRef.current, excerptRef.current, dateRef.current, linkRef.current],
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        delay: index * 0.1 + 0.2, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: { 
          trigger: cardRef.current, 
          start: "top 85%", 
          toggleActions: "play none none reverse" 
        }
      }
    );
  }, [index]);

  const handleCardHover = (isEnter) => {
    if (!cardRef.current || !imageRef.current) return;

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

  // Truncate excerpt if too long
  const truncateExcerpt = (text, maxLength = 120) => {
    if (!text) return "";
    // Remove HTML tags if present
    const plainText = text.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
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
          src={getImageUrl(image)}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg';
          }}
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 ref={titleRef} className="text-gray-900 font-normal text-2xl mb-2">{title || "Untitled"}</h3>
        
        {created_at && (
          <p ref={dateRef} className="text-gray-500 text-sm mb-3">
            {formatDate(created_at)}
          </p>
        )}
        
        <p ref={excerptRef} className="text-gray-900 text-md flex-1 mb-4">
          {truncateExcerpt(excerpt)}
        </p>
        
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
    if (!heroRef.current || !titleRef.current || !descRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: { 
            trigger: heroRef.current, 
            start: "top 80%", 
            toggleActions: "play none none reverse" 
          }
        }
      );

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 0.2, 
          ease: "power2.out",
          scrollTrigger: { 
            trigger: heroRef.current, 
            start: "top 80%", 
            toggleActions: "play none none reverse" 
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="w-full bg-blue-50 py-20 min-h-[540px] px-6 text-center overflow-hidden">
      <h2 ref={titleRef} className="text-4xl md:text-6xl font-normal text-gray-900 mb-3 mt-24">Our Blog</h2>
      <p ref={descRef} className="text-gray-800 text-xl max-w-xl mx-auto">
        Accounting data is often used by governments and policymakers for economic planning and analysis.
      </p>
    </div>
  );
}

// ─── Blog Grid ─────────────────────────────────────────────────────────────
function BlogGrid({ blogs, loading, error }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current || loading || error) return;
    
    gsap.fromTo(gridRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out",
        scrollTrigger: { 
          trigger: gridRef.current, 
          start: "top 90%", 
          toggleActions: "play none none reverse" 
        }
      }
    );
  }, [loading, error]);

  if (loading) {
    return (
      <section className="bg-white py-14 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-16">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
              <div className="w-full h-64 bg-gray-200"></div>
              <div className="p-5">
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-1/3"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-14 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center py-12">
          <h3 className="text-2xl text-red-600 mb-2">Error loading blogs</h3>
          <p className="text-gray-600">Please try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-[#38b6ff] text-white rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section className="bg-white py-14 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center py-12">
          <h3 className="text-2xl text-gray-600 mb-2">No blog posts found</h3>
          <p className="text-gray-500">Check back soon for new articles.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-14 px-6 md:px-12 overflow-hidden">
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-16">
        {blogs.map((post, index) => (
          <BlogCard 
            key={post.id || index} 
            title={post.title}
            image={post.image}
            excerpt={post.excerpt}
            slug={post.slug}
            created_at={post.created_at}
            index={index} 
          />
        ))}
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching blogs from:", `${API_BASE_URL}/blog`);
        const response = await axios.get(`${API_BASE_URL}/blog`);
        console.log("API Response:", response.data);
        
        if (isMounted) {
          // Handle different API response structures
          let blogData = [];
          
          // Check if response has data property (Laravel style)
          if (response.data && response.data.data) {
            blogData = response.data.data;
          } 
          // Check if response is directly an array
          else if (Array.isArray(response.data)) {
            blogData = response.data;
          }
          // Check if response has data in a different structure
          else if (response.data && typeof response.data === 'object') {
            // Try to find any array property that might contain the blogs
            const possibleArrays = Object.values(response.data).filter(
              val => Array.isArray(val) && val.length > 0
            );
            if (possibleArrays.length > 0) {
              blogData = possibleArrays[0];
            }
          }
          
          console.log("Processed blog data:", blogData);
          
          // Filter out archived blogs if the field exists
          if (Array.isArray(blogData)) {
            const activeBlogs = blogData.filter(item => {
              // Check if item has is_archived field
              if (item.hasOwnProperty('is_archived')) {
                return item.is_archived === 0 || item.is_archived === false || item.is_archived === '0';
              }
              // If no is_archived field, include all
              return true;
            });
            setBlogs(activeBlogs);
          } else {
            setBlogs([]);
          }
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        console.error("Error details:", err.response?.data || err.message);
        if (isMounted) {
          setError(err);
          setBlogs([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Generate blog posts list for schema from API data
  const blogPostList = blogs.map(post => ({
    "@type": "BlogPosting",
    "headline": post.title || "Untitled",
    "description": post.excerpt || "",
    "image": getImageUrl(post.image),
    "url": `https://psandeepca.com/blogs/${post.slug || ''}`,
    "datePublished": post.created_at || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author?.name || "P Sandeep CA"
    },
    "publisher": {
      "@type": "Organization",
      "name": "P Sandeep CA"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://psandeepca.com/blogs/${post.slug || ''}`
    }
  }));

  // JSON-LD Schema Markup for Blog Page
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "P Sandeep CA Blog - Accounting, Tax & Financial Advisory Insights",
    "description": "Stay updated with expert insights on accounting, tax consulting, financial advisory, and business growth strategies from P Sandeep CA.",
    "url": "https://psandeepca.com/blog",
    "isPartOf": {
      "@type": "WebSite",
      "name": "P Sandeep CA",
      "url": "https://psandeepca.com/"
    },
    "about": {
      "@type": "Organization",
      "name": "P Sandeep CA",
      "description": "Professional Chartered Accountancy firm providing comprehensive financial services."
    },
    "blogPost": blogPostList
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://psandeepca.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://psandeepca.com/blog"
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "P Sandeep CA",
    "description": "Leading CA firm providing accounting, tax consulting, financial advisory, and audit services.",
    "url": "https://psandeepca.com/",
    "telephone": "+977-61-450488",
    "email": "info@psandeepca.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pokhara-7, Masbar",
      "addressLocality": "Pokhara",
      "addressRegion": "Gandaki",
      "addressCountry": "Nepal"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.2096",
      "longitude": "83.9856"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/psandeepca",
      "https://www.linkedin.com/company/psandeepca",
      "https://twitter.com/psandeepca",
      "https://www.instagram.com/psandeepca/"
    ]
  };

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Blog | P Sandeep CA - Accounting, Tax & Financial Advisory Insights</title>
        <meta name="title" content="Blog | P Sandeep CA - Accounting, Tax & Financial Advisory Insights" />
        <meta name="description" content="Explore expert insights on accounting, tax consulting, financial advisory, and business growth strategies. Stay updated with the latest from P Sandeep CA." />
        <meta name="keywords" content="Accounting Blog, Tax Tips, Financial Advisory, Business Growth, CA Blog, Accounting Insights, Tax Planning, Financial Management" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="P Sandeep CA" />
        <meta name="copyright" content="P Sandeep CA" />
        
        {/* Canonical Tag */}
        <link rel="canonical" href="https://psandeepca.com/blog" />

        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://psandeepca.com/blog" />
        <meta property="og:title" content="Blog | P Sandeep CA - Accounting, Tax & Financial Advisory Insights" />
        <meta property="og:description" content="Explore expert insights on accounting, tax consulting, financial advisory, and business growth strategies. Stay updated with the latest from P Sandeep CA." />
        <meta property="og:image" content="https://psandeepca.com/og-image-blog.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://psandeepca.com/blog" />
        <meta name="twitter:title" content="Blog | P Sandeep CA - Accounting, Tax & Financial Advisory Insights" />
        <meta name="twitter:description" content="Explore expert insights on accounting, tax consulting, financial advisory, and business growth strategies." />
        <meta name="twitter:image" content="https://psandeepca.com/twitter-image-blog.jpg" />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Pokhara" />
        <meta name="geo.position" content="28.2096;83.9856" />
        <meta name="ICBM" content="28.2096, 83.9856" />

        {/* Schema Markup - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* YOUR EXISTING UI - UNCHANGED */}
      <div className="bg-white">
        <Hero />
        <BlogGrid blogs={blogs} loading={loading} error={error} />
      </div>
    </>
  );
}