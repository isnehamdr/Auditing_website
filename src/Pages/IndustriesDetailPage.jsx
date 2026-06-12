import { useParams, Link } from "react-router-dom";
import industriesData from "../data/industriesdata.json";

// Icons
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38b6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

function Hero({ title, tagline, backgroundImage }) {
  return (
    <section className="relative w-full h-[40vh] min-h-[400px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${backgroundImage}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight drop-shadow-lg">{title}</h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">{tagline}</p>
      </div>
    </section>
  );
}

function Sidebar({ industries, currentSlug }) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm sticky top-24">
        <h3 className="text-gray-900 font-bold text-xl mb-4">Industries</h3>
        <ul className="flex flex-col divide-y divide-gray-100">
          {industries.map((industry) => (
            <li key={industry.id}>
              <Link
                to={`/${industry.slug}`}  // Direct to slug
                className={`w-full flex items-center justify-between px-4 py-3 text-base transition-colors ${
                  industry.slug === currentSlug
                    ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-[#38b6ff]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#38b6ff]"
                }`}
              >
                <span>{industry.name}</span>
                <ChevronRightIcon />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MainContent({ industry }) {
  const { overview, challenges, solutions, keyServices, whyChooseUs, caseStudy } = industry.detail;

  return (
    <div className="flex-1 min-w-0">
      <div className="w-full rounded-xl overflow-hidden mb-8">
        <img src={industry.featureImage} alt={industry.name} className="w-full h-64 md:h-80 object-cover" />
      </div>

      <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">{overview}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Challenges</h3>
          <ul className="space-y-3">
            {challenges?.map((challenge, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600">
                <span className="text-red-400 mt-1">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Solutions</h3>
          <ul className="space-y-3">
            {solutions?.map((solution, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-600">
                <CheckCircleIcon />
                <span>{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {keyServices && keyServices.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Key Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyServices.map((service, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function IndustryDetailPage() {
  const { slug } = useParams();
  console.log("Looking for industry with slug:", slug);
  
  const industry = industriesData.find((i) => i.slug === slug);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Industry Not Found</h1>
          <p className="text-gray-500">The industry page for "{slug}" doesn't exist.</p>
          <Link to="/" className="inline-block mt-4 text-[#38b6ff] hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const sidebarIndustries = industriesData.map((i) => ({
    id: i.id,
    name: i.name,
    slug: i.slug,
  }));

  return (
    <div className="min-h-screen bg-white">
      <Hero title={industry.name} tagline={industry.tagline} backgroundImage={industry.heroImage} />
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 flex flex-col lg:flex-row gap-12 items-start">
        <MainContent industry={industry} />
        <Sidebar industries={sidebarIndustries} currentSlug={industry.slug} />
      </div>
    </div>
  );
}