// ─── Icons ─────────────────────────────────────────────────────────────────
const DotIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="#3b82f6">
    <circle cx="4" cy="4" r="4" />
  </svg>
);
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

import { useState } from "react";

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);



// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="relative w-full h-52 md:min-h-[540px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80')" }}
      />
      <div className="absolute inset-0 bg-gray-800/65" />
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-10">
        <h1 className="text-3xl md:text-4xl lg:text-7xl font-normal text-white mb-3 " >
          Contact Us
        </h1>
        <p className="text-white text-lg max-w-xl mx-auto">
          Accounting data is often used by governments and policymakers for economic planning and analysis.
        </p>
      </div>
    </div>
  );
}

// ─── Info Cards ────────────────────────────────────────────────────────────
function InfoCards() {
  const cards = [
    {
      title: "Office Location",
      lines: ["2464 Royal Ln. Mesa, New Jersey 45463"],
      color: false,
    },
    {
      title: "Our Contact",
      lines: ["(603) 555-0123", "(786) 555-0198"],
      color: true,
    },
    {
      title: "Work Hours",
      lines: ["Mon-Fri: 9:00 – 17:00"],
      color: true,
    },
  ];

  return (
  <div className="bg-white py-24 px-6">
  {/* ✅ Removed border, rounded-lg, overflow-hidden, and divide classes from the parent */}
  <div className="max-w-7xl md:px-16 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
    {cards.map((card, i) => (
      // ✅ Added border, rounded-lg, and bg-white to each individual child
      <div key={i} className="flex flex-col items-center justify-center text-center py-7 px-6 bg-white border border-gray-200 ">
        <h4 className="text-gray-700 font-normal text-2xl mb-4">{card.title}</h4>
        {card.lines.map((line, j) => (
          <p key={j} className={`text-lg leading-relaxed ${card.color ? "text-[#38b6ff]" : "text-[#38b6ff]"}`}>
            {line}
          </p>
        ))}
      </div>
    ))}
  </div>
</div>
  );
}

// ─── Contact Form Section ──────────────────────────────────────────────────
function ContactForm() {
  const inputClass =
    "w-full bg-white/10 border border-white/20 text-white text-lg placeholder-gray-300 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white/15 transition";

  return (
    <div
      className="relative w-full py-20 px-6"
      style={{
        backgroundImage: "url('/images/bgform.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-800/75" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl sm:px-16 mx-auto text-center">
        {/* Label */}
        <p className="text-white text-md uppercase mb-4 font-normal">
          Get In Touch
        </p>

        {/* Heading */}
        <h2
          className="text-white text-2xl md:text-3xl lg:text-5xl font-normal mb-10 "
     
        >
          Complete The Form<br />For Us To Reach Out
        </h2>

        {/* Form */}
        <div className="bg-white/10 border border-white/15 p-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-3">
            <input type="text" placeholder="First Name" className={inputClass} />
            <input type="text" placeholder="Last Name" className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-3">
            <input type="email" placeholder="Email" className={inputClass} />
            <input type="tel" placeholder="Phone" className={inputClass} />
          </div>
          <textarea
            placeholder="Your Input"
            rows={5}
            className={`${inputClass} resize-none mb-3 mt-4`}
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-4 rounded-full transition-colors duration-200">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <InfoCards />
      <ContactForm />
    </div>
  );
}