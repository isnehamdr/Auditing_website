import { Link } from "react-router-dom";
import blogData from "../data/Blogdata.json"; // Import the JSON data

// ─── Blog Card ─────────────────────────────────────────────────────────────
function BlogCard({ title, image, excerpt, slug }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-gray-900 font-normal text-2xl mb-4 ">{title}</h3>
        <p className="text-gray-900 text-md flex-1 mb-4">{excerpt}</p>
        
        {/* ✅ Use Link with the dynamic slug */}
        <Link
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
  return (
    <div className="w-full bg-blue-50 py-20 min-h-[540px] px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-normal text-gray-900 mb-3 mt-24">Our Blog</h1>
      <p className="text-gray-800 text-xl max-w-xl mx-auto">
        Accounting data is often used by governments and policymakers for economic planning and analysis.
      </p>
    </div>
  );
}

// ─── Blog Grid ─────────────────────────────────────────────────────────────
function BlogGrid() {
  return (
    <section className="bg-white py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-16">
        {blogData.map((post) => (
          <BlogCard key={post.id} {...post} />
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