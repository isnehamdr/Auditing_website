import React, { useState, useRef, useEffect } from "react";

const ChevronDown = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

const ArrowUpRight = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
  </svg>
);

const industries = [
  {
    category: "INFRASTRUCTURE",
    items: [
      { icon: "🏗️", label: "Construction Industry" },
      { icon: "⚡", label: "Energy Industry" },
      { icon: "⛏️", label: "Mineral Industry" },
    ],
  },
  {
    category: "TRADE & COMMERCE",
    items: [
      { icon: "🏭", label: "Manufacturing Industry" },
      { icon: "📦", label: "Trade and Commerce" },
      { icon: "🌿", label: "Agribusiness" },
    ],
  },
  {
    category: "SERVICES & TECH",
    items: [
      { icon: "💻", label: "Technology & Software" },
      { icon: "💼", label: "Service Industry" },
      { icon: "🏦", label: "Financial Sector" },
    ],
  },
  {
    category: "OTHER SECTORS",
    items: [
      { icon: "🏨", label: "Hospitality & Tourism" },
    ],
    cta: true,
  },
];

const navLinks = ["Home", "About", "Team", "Services", "Industries", "Blog"];

// ── Mega Dropdown ─────────────────────────────────────────────────────────────
const IndustriesDropdown = ({ onClose }) => (
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[860px] max-w-[95vw] bg-white border border-white/10 z-50 overflow-hidden">
    <div className="grid grid-cols-4">
      {industries.map((col, ci) => (
        <div key={ci} className="p-6 border-r border-gray-100 last:border-r-0">
          <p className="text-lg font-normal text-[#38b6ff] uppercase mb-3 pb-3 border-b border-gray-100">
            {col.category}
          </p>
          <ul className="flex flex-col gap-3">
            {col.items.map((item) => (
              <li key={item.label}>
                <a href="#" onClick={onClose} className="flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-[#38b6ff]">
                  <span className="text-base leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {col.cta && (
            <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="text-sm text-gray-400 leading-snug mb-3">
                Cross-sector or emerging businesses are welcome to explore.
              </p>
              <a href="#" onClick={onClose} className="flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 transition-colors text-white text-sm font-normal rounded-lg px-4 py-2.5">
                All industries
                <ArrowUpRight />
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ── Mobile Industries Accordion ───────────────────────────────────────────────
const MobileIndustriesAccordion = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex items-center justify-between w-full px-5 py-4 text-base text-gray-900 hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        Industries
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="bg-gray-50 px-5 pb-4">
          {industries.map((col) => (
            <div key={col.category} className="mt-4">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">
                {col.category}
              </p>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href="#" className="flex items-center gap-2 text-sm text-gray-800 hover:text-blue-600 py-1">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a href="#" className="mt-4 flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 text-white text-sm font-medium rounded-lg px-4 py-2.5">
            All industries
            <ArrowUpRight />
          </a>
        </div>
      )}
    </div>
  );
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-12 py-5">

        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-semibold text-lg tracking-wide">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-white relative">
            <span className="w-2 h-2 rounded-full bg-white absolute" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white opacity-60" />
          </span>
          Accountant
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-7 text-white text-lg font-medium">
          {navLinks.map((link) =>
            link === "Industries" ? (
              <li key={link} className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity focus:outline-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  Industries
                  <ChevronDown className={`transition-transform duration-200 mt-0.5 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && <IndustriesDropdown onClose={() => setDropdownOpen(false)} />}
              </li>
            ) : (
              <li key={link} className="cursor-pointer hover:opacity-75 transition-opacity">
                <a href="#">{link}</a>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTA */}
        <button className="hidden md:inline-flex items-center bg-[#38b6ff] hover:bg-blue-400 text-white text-lg font-medium px-6 py-2 rounded-full transition-colors duration-200">
          Get Started
        </button>

        {/* Hamburger — only shown when drawer is CLOSED */}
        {!menuOpen && (
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Spacer so layout doesn't shift when hamburger hides */}
        {menuOpen && <div className="md:hidden w-6 h-6" />}
      </div>

      {/* ── Mobile Drawer with smooth slide-in ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        // NO onClick here — backdrop click does NOT close
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 z-50 w-4/5 max-w-xs h-full bg-white flex flex-col shadow-xl overflow-y-auto md:hidden
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header — single close button here only */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 font-semibold text-base text-gray-900">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#38b6ff]">
              <span className="w-4 h-4 rounded-full bg-[#38b6ff]" />
            </span>
            Accountant
          </div>
          {/* THE ONLY close button */}
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="text-gray-500 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <ul className="flex flex-col divide-y divide-gray-100 flex-1">
          {navLinks.map((link) =>
            link === "Industries" ? (
              <li key={link}>
                <MobileIndustriesAccordion />
              </li>
            ) : (
              <li key={link}>
                {/* Nav links do NOT close the drawer */}
                <a
                  href="#"
                  className="flex items-center px-5 py-4 text-base text-gray-900 hover:bg-gray-50"
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>

        {/* CTA */}
        <div className="px-5 py-6 border-t border-gray-100 flex-shrink-0">
          <button className="w-full py-3.5 bg-[#38b6ff] text-white text-base font-medium rounded-full transition-colors hover:bg-blue-400">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;