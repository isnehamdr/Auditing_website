import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import servicesData from "../data/servicedata.json"; // Import the JSON data

// ─── Icons ─────────────────────────────────────────────────────────────────
const DotIcon = () => (<svg width="8" height="8" viewBox="0 0 8 8" fill="#3b82f6"><circle cx="4" cy="4" r="4" /></svg>);
const CartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" /></svg>);
const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);





// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero({ title, description }) {
  return (
    <div className="w-full bg-blue-50 py-16 px-6 text-center min-h-[450px]">
      <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 mt-24 " >{title}</h1>
      <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto ">{description}</p>
    </div>
  );
}

// ─── Skill Bar ─────────────────────────────────────────────────────────────
// function SkillBar({ label, value }) {
//   return (
//     <div className="mb-4">
//       <div className="flex justify-between items-center mb-1"><span className="text-sm text-gray-700 font-medium">{label}</span><span className="text-xs text-white bg-blue-600 rounded px-1.5 py-0.5 font-semibold">{value}</span></div>
//       <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full transition-all duration-700" style={{ width: `${value}%` }} /></div>
//     </div>
//   );
// }

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ links }) {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <ul className="flex flex-col divide-y divide-gray-100  overflow-hidden">
        {links.map((item) => (
          <li key={item.id}>
            {/* Use Link to navigate to other service slugs */}
            <Link to={`/service-page/${item.slug}`} className={`w-full flex items-center justify-between px-5 py-3.5 text-xl transition-colors ${item.active ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`}>
              <span>{item.label}</span>
              <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${item.active ? "border-blue-400 text-blue-600" : "border-gray-300 text-gray-400"}`}><ChevronRightIcon /></span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ─── Main Content ──────────────────────────────────────────────────────────
function MainContent({ service }) {
  const { detail } = service;
  return (
    <div className="flex-1 min-w-0">
      <div className="w-full rounded-xl overflow-hidden mb-6"><img src={detail.featureImage} alt={service.title} className="w-full h-72 md:h-96 object-cover" /></div>
      <p className="text-gray-900 text-lg mb-8">{detail.introParagraph}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4" >{detail.sectionTitle}</h2>
      <p className="text-gray-900 text-lg  mb-10">{detail.sectionParagraph}</p>
      {/* <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-full sm:w-48 flex-shrink-0 rounded-xl overflow-hidden"><img src={detail.aboutImage} alt="About Our Service" className="w-full h-56 sm:h-64 object-cover" /></div>
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-normal text-gray-900 mb-2">About Our Service</h3>
          <p className="text-gray-800 text-md  mb-5">{detail.aboutText}</p>
          {detail.skills.map((s) => (<SkillBar key={s.label} label={s.label} value={s.value} />))}
        </div>
      </div> */}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ServiceDetailPage() {
  // Extract the slug from the URL parameters
  const { slug } = useParams();
  
  // Find the specific service data based on the slug
  const service = servicesData.find(s => s.slug === slug);

  // Handle case where slug doesn't match any service
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h1 className="text-2xl font-bold text-gray-800">Service Not Found</h1>
      </div>
    );
  }

  // Generate sidebar links dynamically and mark the current one as active
  const sidebarLinks = servicesData.map(s => ({
    id: s.id,
    label: s.title,
    slug: s.slug,
    active: s.slug === slug
  }));

  return (
    <div className="min-h-screen bg-white font-sans">
    
      <Hero title={service.title} description={service.detail.heroDescription} />
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 flex flex-col lg:flex-row gap-10">
        <Sidebar links={sidebarLinks} />
        <MainContent service={service} />
      </div>
    </div>
  );
}