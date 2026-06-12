import { useEffect, useRef, useState } from "react";

const stats = [
  { percent: 25,  label: "Traditional Employee" },
  { percent: 100, label: "Virtual Employee" },
  { percent: 100, label: "Success" },
  { percent: 100, label: "Trust" },
];

// Circumference for r=32: 2 * π * 32 ≈ 201.06
const RADIUS = 32;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function RingCard({ percent, label, animate }) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="bg-white rounded-md flex flex-col items-center py-7 px-4 gap-3">
      {/* SVG Ring */}
      <div className="relative w-20 h-20">
        <svg
          viewBox="0 0 80 80"
          className="w-20 h-20"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx="40" cy="40" r={RADIUS}
            fill="none"
            stroke="#e8edf8"
            strokeWidth="6"
          />
          {/* Progress fill */}
          <circle
            cx="40" cy="40" r={RADIUS}
            fill="none"
            stroke="#2563eb"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={animate ? offset : CIRCUMFERENCE}
            style={{ transition: "stroke-dashoffset 1.4s ease 0.3s" }}
          />
        </svg>
        {/* Label inside ring */}
        <div className="absolute inset-0 flex items-center justify-center text-blue-900 text-lg font-semibold">
          {percent}%
        </div>
      </div>

      {/* Card label */}
      <p className="text-gray-800 text-xl text-center">{label}</p>
    </div>
  );
}

export default function BusinessGrow() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  // Trigger animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-20 px-4 sm:px-16"
      style={{
        background:
          "linear-gradient(rgba(8,18,55,0.88), rgba(8,18,55,0.88)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80') center/cover no-repeat",
        minHeight: 640,
      }}
    >
      <div className="max-w-7xl mx-auto mt-12 sm:px-16">
        {/* Heading */}
        <h2
          className="text-white text-center font-medium text-6xl tracking-wide mb-11"
          
        >
          How We Can Make<br />Your Business Grow
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <RingCard
              key={i}
              percent={stat.percent}
              label={stat.label}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}