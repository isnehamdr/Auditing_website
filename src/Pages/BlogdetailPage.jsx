import { useParams, Link } from "react-router-dom";
import blogData from "../data/Blogdata.json"; // Import the JSON data

// ─── Recent Post Card ──────────────────────────────────────────────────────
function RecentPostCard({ title, date, image, slug }) {
  return (
    // ✅ Increased gap, padding, and image size
    <Link to={`/blog/${slug}`} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0 hover:opacity-80 transition-opacity">
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
  return (
    // ✅ Increased sidebar width from lg:w-64 to lg:w-80
    <aside className="w-full lg:w-90 flex-shrink-0">
      {/* ✅ Increased padding and heading size */}
      <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
        <h3 className="text-gray-900 font-bold text-3xl mb-5">Recent Posts</h3>
        <div>
          {recentPosts.map((post) => (
            <RecentPostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ title, date, excerpt, image }) {
  return (
    <section className="relative w-full h-[50vh] min-h-[540px] overflow-hidden flex items-center justify-center">
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
        <p className="text-gray-300 text-sm md:text-base mb-4 tracking-wide">{date}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          {excerpt}
        </p>
      </div>
    </section>
  );
}

// ─── Main Article ──────────────────────────────────────────────────────────
function Article({ post }) {
  return (
    <article className="flex-1 min-w-0">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h2>

      <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">{post.content.intro}</p>

      {/* Bullet points */}
      <ul className="space-y-6 mb-10">
        {post.content.bulletPoints.map((item, idx) => (
          <li key={idx} className="flex gap-4 text-base md:text-lg text-gray-600 leading-relaxed">
            <span className="mt-2 w-2.5 h-2.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
            <p>
              <span className="font-semibold text-gray-800">{item.heading} </span>
              {item.text}
            </p>
          </li>
        ))}
      </ul>

      {/* Closing paragraph */}
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">{post.content.conclusion}</p>
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
    <div className="min-h-screen bg-white">
      <Hero 
        title={currentPost.title} 
        date={currentPost.date} 
        excerpt={currentPost.excerpt} 
        image={currentPost.image}
      />

      {/* Body */}
      {/* ✅ Added responsive padding (px-6 md:px-16) to prevent overflow on mobile while keeping your requested max-width */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 flex flex-col lg:flex-row gap-12 items-start">
        <Article post={currentPost} />
        <Sidebar recentPosts={recentPosts} />
      </div>
    </div>
  );
}