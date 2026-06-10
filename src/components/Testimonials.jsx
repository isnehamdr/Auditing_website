import { useState } from "react";

const allTestimonials = [
  {
    name: "Robert Gold",
    rating: 5,
    text: "Accounting is a fundamental and indispensable field that plays a crucial role in the financial management of individuals, businesses, and organizations. It involves the systematic recording, organizing, and analysis of financial transactions to provide accurate and timely information for decision-making.",
  },
  {
    name: "Nensi Wing",
    rating: 5,
    text: "In summary, accounting is an essential and dynamic field that goes beyond the stereotype of number-oriented tasks. It is a key driver of financial transparency, accountability, and strategic planning, making it an integral part of the success and sustainability of businesses and organizations.",
  },
  {
    name: "James Carter",
    rating: 5,
    text: "The team provided exceptional financial guidance that helped our company navigate complex compliance requirements. Their expertise in bookkeeping and auditing gave us complete confidence in our reporting.",
  },
  {
    name: "Sarah Mitchell",
    rating: 5,
    text: "Working with this firm transformed how we manage our payroll and financial records. Their systematic approach and attention to detail ensure every transaction is accurately recorded and reported.",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ))}
  </div>
);

const TestimonialCard = ({ name, rating, text }) => (
  <div className="bg-[#eef2f9] px-6 py-5">
    <div className="flex items-start justify-between mb-2">
      <span className="text-2xl font-normal text-[#38b6ff]">{name}</span>
      <StarRating rating={rating} />
    </div>
    <p className="text-xl text-gray-700 leading-relaxed">{text}</p>
  </div>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#38b6ff]">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#38b6ff]">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function Testimonials() {
  // Desktop: 2 per page
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(allTestimonials.length / perPage);
  const visible = allTestimonials.slice(page * perPage, page * perPage + perPage);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  // Mobile: 1 per page
  const [mobilePage, setMobilePage] = useState(0);
  const totalMobilePages = allTestimonials.length;
  const mobileVisible = allTestimonials[mobilePage];
  const mobilePrev = () => setMobilePage((p) => (p - 1 + totalMobilePages) % totalMobilePages);
  const mobileNext = () => setMobilePage((p) => (p + 1) % totalMobilePages);

  return (
    <section className="py-20 px-4 sm:px-16 max-w-7xl mx-auto">

      {/* ── MOBILE layout ── */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xl text-[#38b6ff] mb-1 font-normal">Testimonials</p>
            <h2 className="text-2xl font-normal text-[#1a1a2e] mt-2">
              What Our Satisfied Clients Say
            </h2>
          </div>
          {/* Nav arrows inline with heading on mobile */}
          <div className="flex gap-2 mt-1 flex-shrink-0">
            <button
              onClick={mobilePrev}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={mobileNext}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Single card */}
        <TestimonialCard {...mobileVisible} />

        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {allTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setMobilePage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === mobilePage ? "bg-[#38b6ff]" : "bg-gray-300"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout — completely unchanged ── */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12 items-start">
        {/* Left column */}
        <div>
          <p className="text-2xl text-[#38b6ff] mb-1 font-normal">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-normal text-[#1a1a2e] mt-6 mb-6">
            What Our Satisfied Clients Say
          </h2>
          <div className="flex gap-2">
            <button onClick={prev} aria-label="Previous testimonials" className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors duration-200">
              <ChevronLeft />
            </button>
            <button onClick={next} aria-label="Next testimonials" className="w-9 h-9 rounded-full border border-[#c5ccd8] flex items-center justify-center hover:bg-[#eef0f8] transition-colors duration-200">
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Right column — 2 cards */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {visible.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>

    </section>
  );
}