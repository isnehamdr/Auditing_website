import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";
import parse from 'html-react-parser';

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

// ─── Recent Post Card ──────────────────────────────────────────────────────
function RecentPostCard({ title, date, image, slug, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  const handleCardHover = (isEnter) => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      x: isEnter ? 5 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link
      ref={cardRef}
      to={`/blogs/${slug}`}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
      className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0 hover:opacity-80 transition-opacity"
    >
      <img
        src={getImageUrl(image)}
        alt={title}
        className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
        onError={(e) => {
          e.target.src = '/placeholder-image.jpg';
        }}
      />
      <div className="min-w-0">
        <h4 className="text-gray-800 text-sm font-semibold leading-snug mb-1.5 line-clamp-2">
          {title ? parse(title) : "Untitled"}
        </h4>
        <p className="text-gray-400 text-sm">{formatDate(date)}</p>
      </div>
    </Link>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ recentPosts }) {
  const sidebarRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (!sidebarRef.current || !headingRef.current) return;

    gsap.fromTo(
      sidebarRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sidebarRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  if (!recentPosts || recentPosts.length === 0) return null;

  return (
    <aside
      ref={sidebarRef}
      className="w-full lg:w-90 flex-shrink-0 lg:sticky lg:top-24 lg:self-start"
      style={{ height: "fit-content" }}
    >
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h3 ref={headingRef} className="text-gray-900 font-bold text-3xl mb-5">
          Recent Posts
        </h3>
        <div>
          {recentPosts.map((post, index) => (
            <RecentPostCard 
              key={post.id || post.slug || index} 
              title={post.title}
              date={post.created_at || post.date}
              image={post.image}
              slug={post.slug}
              index={index} 
            />
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
    if (!heroRef.current || !dateRef.current || !titleRef.current || !excerptRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dateRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        excerptRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[50vh] min-h-[540px] overflow-hidden flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${image || '/placeholder-image.jpg'}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
        <p ref={dateRef} className="text-gray-300 text-sm md:text-base mb-4 tracking-wide">
          {formatDate(date)}
        </p>
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight drop-shadow-lg"
        >
          {title ? parse(title) : "Untitled"}
        </h2>
        <div
          ref={excerptRef}
          className="text-white text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md"
        >
          {excerpt ? parse(excerpt) : ""}
        </div>
      </div>
    </section>
  );
}

// ─── Main Article ──────────────────────────────────────────────────────────
function Article({ post }) {
  const articleRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!articleRef.current || !headingRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        articleRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: articleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Parse content - handle both HTML content and structured content
  const renderContent = () => {
    if (!post) return null;
    
    // If content is HTML string - now using html-react-parser
    if (typeof post.content === 'string') {
      return (
        <div className="prose prose-lg max-w-none">
          {parse(post.content)}
        </div>
      );
    }
    
    // If content is an object with structured data
    if (typeof post.content === 'object') {
      const content = post.content;
      return (
        <>
          {content.intro && (
            <h3 className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              {parse(content.intro)}
            </h3>
          )}
          
          {Array.isArray(content.bulletPoints) && content.bulletPoints.length > 0 && (
            <ul className="space-y-6 mb-10">
              {content.bulletPoints.map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-4 text-base md:text-lg text-gray-600 leading-relaxed"
                >
                  <span className="mt-2 w-2.5 h-2.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
                  <h3>
                    {item.heading && <h3 className="font-semibold text-gray-800">{parse(item.heading)} </h3>}
                    {item.text && parse(item.text)}
                  </h3>
                </li>
              ))}
            </ul>
          )}
          
          {content.conclusion && (
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {parse(content.conclusion)}
            </p>
          )}
        </>
      );
    }
    
    return null;
  };

  return (
    <article ref={articleRef} className="flex-1 min-w-0">
      <h3 ref={headingRef} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {post?.title ? parse(post.title) : "Untitled"}
      </h3>

      <p ref={contentRef} className="text-gray-600 text-base md:text-lg leading-relaxed">
        {renderContent()}
      </p>
    </article>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function BlogDetailPage() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlog = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use your API endpoint - adjust if needed
        const response = await axios.get(`${API_BASE_URL}/blog/${slug}`);
        if (isMounted) {
          // Handle different API response structures
          const postData = response.data.data || response.data;
          setPost(postData);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blog`);
        const allPosts = response.data.data || response.data || [];
        
        if (Array.isArray(allPosts)) {
          const filtered = allPosts
            .filter((item) => item.slug !== slug)
            .slice(0, 4);
          if (isMounted) setRecentPosts(filtered);
        }
      } catch (err) {
        console.error("Error fetching recent posts:", err);
      }
    };

    if (slug) {
      fetchBlog();
      fetchRecentPosts();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Post Not Found</h2>
          <p className="text-gray-500">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="mt-4 inline-block text-[#38b6ff] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const postImageUrl = getImageUrl(post.image);
  const postDate = post.created_at || post.date || new Date().toISOString();

  // Generate article body for schema
  let articleBody = '';
  if (typeof post.content === 'string') {
    // Strip HTML tags for schema
    articleBody = post.content.replace(/<[^>]*>/g, '');
  } else if (typeof post.content === 'object') {
    const content = post.content;
    const parts = [];
    if (content.intro) parts.push(content.intro.replace(/<[^>]*>/g, ''));
    if (Array.isArray(content.bulletPoints)) {
      content.bulletPoints.forEach(b => {
        if (b.heading) parts.push(b.heading.replace(/<[^>]*>/g, ''));
        if (b.text) parts.push(b.text.replace(/<[^>]*>/g, ''));
      });
    }
    if (content.conclusion) parts.push(content.conclusion.replace(/<[^>]*>/g, ''));
    articleBody = parts.join(' ');
  }

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title ? post.title.replace(/<[^>]*>/g, '') : "Untitled",
    description: post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '') : "",
    image: postImageUrl,
    datePublished: postDate,
    dateModified: post.updated_at || postDate,
    author: {
      "@type": "Person",
      name: post.author?.name || "P Sandeep CA",
      url: "https://psandeepca.com/",
    },
    publisher: {
      "@type": "Organization",
      name: "P Sandeep CA",
      url: "https://psandeepca.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://psandeepca.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://psandeepca.com/blogs/${post.slug || ''}`,
    },
    articleBody,
    articleSection: "Accounting & Financial Advisory",
    keywords: post.tags?.join(', ') || "Accounting, Tax, Financial Advisory, Business Growth",
    url: `https://psandeepca.com/blogs/${post.slug || ''}`,
    isPartOf: {
      "@type": "Blog",
      name: "P Sandeep CA Blog",
      url: "https://psandeepca.com/blog",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://psandeepca.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://psandeepca.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title ? post.title.replace(/<[^>]*>/g, '') : "Blog Post",
        item: `https://psandeepca.com/blogs/${post.slug || ''}`,
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "P Sandeep CA",
    description:
      "Leading CA firm providing accounting, tax consulting, financial advisory, and audit services.",
    url: "https://psandeepca.com/",
    telephone: "+977-61-450488",
    email: "info@psandeepca.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pokhara-7, Masbar",
      addressLocality: "Pokhara",
      addressRegion: "Gandaki",
      addressCountry: "Nepal",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.2096",
      longitude: "83.9856",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/psandeepca",
      "https://www.linkedin.com/company/psandeepca",
      "https://twitter.com/psandeepca",
      "https://www.instagram.com/psandeepca/",
    ],
  };

  // Clean text for meta tags
  const cleanTitle = post.title ? post.title.replace(/<[^>]*>/g, '') : "Blog Post";
  const cleanExcerpt = post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '') : "";
  const cleanKeywords = post.tags?.join(', ') || "Accounting, Tax Consulting, Financial Advisory, Business Growth, P Sandeep CA";

  return (
    <>
      <Helmet>
        <title>{cleanTitle} | P Sandeep CA Blog</title>
        <meta name="title" content={`${cleanTitle} | P Sandeep CA Blog`} />
        <meta name="description" content={cleanExcerpt} />
        <meta name="keywords" content={cleanKeywords} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content={post.author?.name || "P Sandeep CA"} />
        <meta name="copyright" content="P Sandeep CA" />
        <meta name="article:published_time" content={postDate} />
        <meta name="article:modified_time" content={post.updated_at || postDate} />

        <link rel="canonical" href={`https://psandeepca.com/blogs/${post.slug || ''}`} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://psandeepca.com/blogs/${post.slug || ''}`} />
        <meta property="og:title" content={`${cleanTitle} | P Sandeep CA Blog`} />
        <meta property="og:description" content={cleanExcerpt} />
        <meta property="og:image" content={postImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />
        <meta property="article:published_time" content={postDate} />
        <meta property="article:modified_time" content={post.updated_at || postDate} />
        <meta property="article:author" content={post.author?.name || "P Sandeep CA"} />
        <meta property="article:section" content="Accounting & Financial Advisory" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://psandeepca.com/blogs/${post.slug || ''}`} />
        <meta name="twitter:title" content={`${cleanTitle} | P Sandeep CA Blog`} />
        <meta name="twitter:description" content={cleanExcerpt} />
        <meta name="twitter:image" content={postImageUrl} />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Pokhara" />
        <meta name="geo.position" content="28.2096;83.9856" />
        <meta name="ICBM" content="28.2096, 83.9856" />

        <script type="application/ld+json">{JSON.stringify(blogPostSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white overflow-hidden">
        <Hero 
          title={post.title || "Untitled"} 
          date={postDate} 
          excerpt={post.excerpt || ""} 
          image={postImageUrl} 
        />

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 flex flex-col lg:flex-row gap-12 items-start">
          <Article post={post} />
          <Sidebar recentPosts={recentPosts} />
        </div>
      </div>
    </>
  );
}