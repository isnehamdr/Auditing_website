import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Traditional Employee", percent: 25 },
  { label: "Virtual Employee", percent: 100 },
  { label: "Success", percent: 100 },
];

const RADIUS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircleProgress({ percent, animate }) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="relative w-[72px] h-[72px]">
      <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90" aria-hidden="true">
        <circle cx="36" cy="36" r={RADIUS} fill="none" stroke="#e8ecf5" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={RADIUS} fill="none"
          stroke="#2a5bd7" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={animate ? offset : CIRCUMFERENCE}
          style={{ transition: animate ? "stroke-dashoffset 1s ease-out" : "none" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#1a2f6e]">
        {percent}%
      </span>
    </div>
  );
}

function StatCard({ label, percent }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white/95 backdrop-blur-sm px-2 py-5 flex flex-col items-center gap-2 hover:shadow-lg transition-shadow duration-300"
    >
      <CircleProgress percent={percent} animate={animate} />
      <span className="text-sm sm:text-lg text-gray-800 text-center font-normal leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function FuelingGrowth() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.webp')" }}
    >
      {/* Overlay — slightly deeper on mobile for text contrast */}
      <div className="absolute inset-0 bg-blue-900/60 sm:bg-blue-500/50" />

      {/* ── MOBILE layout ── */}
      <div className="relative z-10 flex flex-col px-5 py-14 gap-8 sm:hidden">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-normal text-white  mb-5">
            Fueling Business Growth With Accounting
          </h2>
          <button className="bg-[#38b6ff] hover:bg-blue-400 text-white text-base font-medium px-7 py-3 rounded-full transition-all duration-200 shadow-lg">
            Get a Free Consultation
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-blue-100 text-center leading-relaxed">
          This approach underscores the idea that effective financial management,
          facilitated by accounting practices, acts as a catalyst for overall
          business success.
        </p>

        {/* 3 stat cards in a row */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* ── DESKTOP layout — completely unchanged ── */}
      <div className="hidden sm:block relative z-10 py-20 sm:px-16 px-4">
        <div className="sm:max-w-7xl sm:mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-center">

            {/* Left */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-6">
                Fueling Business Growth With Accounting
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm sm:text-2xl px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Get a Free Consultation
              </button>
            </div>

            {/* Right */}
            <div>
              <p className="text-sm sm:text-2xl text-blue-100 mb-6 text-center lg:text-left">
                This approach underscores the idea that effective financial
                management, facilitated by accounting practices, acts as a
                catalyst for overall business success.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}