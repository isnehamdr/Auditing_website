import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Home", "About", "Services", "Industries", "Insights", "Careers"];

  return (
    // 1. Outer <nav> handles absolute positioning and spans full width
    <nav className="absolute top-0 left-0 w-full z-50">
      
      {/* 2. Inner <div> handles the max-width and centering */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-12 py-5">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-semibold text-lg tracking-wide">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-white relative">
            <span className="w-2 h-2 rounded-full bg-white absolute" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white opacity-60" />
          </span>
          Accountant
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-7 text-white text-lg font-medium">
          {navLinks.map((link) => (
            <li
              key={link}
              className="cursor-pointer hover:opacity-75 transition-opacity"
            >
              {link}
            </li>
          ))}
          
        </ul>

        {/* CTA Button */}
        <button className="hidden md:inline-flex items-center bg-[#38b6ff] hover:bg-blue-400 text-white text-lg font-medium px-6 py-2 rounded-full transition-colors duration-200">
          Get Started
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 3. Mobile Menu is placed outside the max-w-7xl container so it can span full width on small screens */}
      {menuOpen && (
  <div className="fixed inset-0 z-40 flex">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setMenuOpen(false)}
    />

    {/* Drawer */}
    <div className="relative z-50 w-4/5 max-w-xs h-full bg-white flex flex-col shadow-xl">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
        <div className="flex items-center gap-2 font-semibold text-base text-gray-900">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-700" />
          </span>
          Accountant
        </div>
        <button
          onClick={() => setMenuOpen(false)}
          className="text-gray-500 text-xl w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* Nav Items */}
      <ul className="flex flex-col divide-y divide-gray-100">
        {[
           { label: "Home" },
          { label: "About", hasChevron: true },
          { label: "Company", hasChevron: true },
          { label: "Services" },
          { label: "Insights" },
          { label: "Careers" },
          { label: "All Pages", hasChevron: true },
        ].map(({ label, hasChevron }) => (
          <li
            key={label}
            className="flex items-center justify-between px-5 py-4 text-base text-gray-900 cursor-pointer hover:bg-gray-50"
          >
            {label}
            {hasChevron && <span className="text-gray-400 text-sm">▾</span>}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="px-5 pt-6">
        <button className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white text-base font-medium rounded-full transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;