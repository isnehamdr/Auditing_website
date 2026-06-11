import React, { useState, useRef, useEffect } from "react";
// ✅ 1. Import Link from react-router-dom
import { Link } from "react-router-dom";

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
    items: [{ icon: "🏨", label: "Hospitality & Tourism" }],
    cta: true,
  },
];

const navLinks = ["Home", "About", "Team", "Services", "Industries", "Blog"];

// ✅ Helper function to create clean URL slugs (e.g., "Trade and Commerce" -> "trade-and-commerce")
const getSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// ── Mega Dropdown ─────────────────────────────────────────────────────────────
const IndustriesDropdown = ({ onClose, isWhiteBg }) => (
  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[860px] max-w-[95vw] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((col, ci) => (
        <div key={ci} className="p-6 border-r border-gray-100 last:border-r-0">
          <p className="text-lg font-normal text-[#38b6ff] uppercase mb-3 pb-3 border-b border-gray-100">
            {col.category}
          </p>
          <ul className="flex flex-col gap-3">
            {col.items.map((item) => (
              <li key={item.label}>
                {/* ✅ Changed <a> to <Link> with dynamic slug path */}
                <Link
                  to={`/industries/${getSlug(item.label)}`}
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-[#38b6ff]"
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {col.cta && (
            <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="text-sm text-gray-400 leading-snug mb-3">
                Cross-sector or emerging businesses are welcome to explore.
              </p>
              {/* ✅ Changed <a> to <Link> */}
              <Link
                to="/industries"
                onClick={onClose}
                className="flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 transition-colors text-white text-sm font-normal rounded-lg px-4 py-2.5"
              >
                All industries
                <ArrowUpRight />
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ── Mobile Industries Accordion ───────────────────────────────────────────────
// ✅ Added closeMenu prop to close drawer when a link is clicked
const MobileIndustriesAccordion = ({ closeMenu }) => {
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
                    {/* ✅ Changed <a> to <Link> and added onClick={closeMenu} */}
                    <Link 
                      to={`/industries/${getSlug(item.label)}`} 
                      onClick={closeMenu}
                      className="flex items-center gap-2 text-sm text-gray-800 hover:text-blue-600 py-1"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* ✅ Changed <a> to <Link> and added onClick={closeMenu} */}
          <Link 
            to="/industries" 
            onClick={closeMenu}
            className="mt-4 flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 text-white text-sm font-medium rounded-lg px-4 py-2.5"
          >
            All industries
            <ArrowUpRight />
          </Link>
        </div>
      )}
    </div>
  );
};

// ── Main Navbar ───────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [isWhiteBg, setIsWhiteBg] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setIsVisible(true);
        setIsWhiteBg(false);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setIsWhiteBg(false);
      } else {
        setIsVisible(true);
        setIsWhiteBg(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navClasses = `
    fixed top-0 left-0 w-full z-50
    transition-all duration-300 ease-in-out
    ${isVisible ? "translate-y-0" : "-translate-y-full"}
    ${isWhiteBg ? "bg-white shadow-lg shadow-black/5" : "bg-transparent"}
  `;

  const textColor = isWhiteBg ? "text-gray-900" : "text-white";
  const logoBorderColor = isWhiteBg ? "border-[#38b6ff]" : "border-white";
  const logoDotBg = isWhiteBg ? "bg-[#38b6ff]" : "bg-white";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 md:py-5">

        {/* Logo */}
        <Link to="/" className={`flex items-center gap-2 font-semibold text-base sm:text-lg tracking-wide ${textColor} transition-colors duration-300`}>
          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border-2 ${logoBorderColor} relative transition-colors duration-300`}>
            <span className={`w-2 h-2 rounded-full ${logoDotBg} absolute transition-colors duration-300`} />
            <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border ${logoBorderColor} opacity-60 transition-colors duration-300`} />
          </span>
          Accountant
        </Link>

        {/* Desktop Nav */}
        <ul className={`hidden md:flex items-center gap-7 text-lg font-medium ${textColor} transition-colors duration-300`}>
          {navLinks.map((link) => {
            // ✅ Generate clean paths (Home -> /, About -> /about, etc.)
            const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
            
            return link === "Industries" ? (
              <li key={link} className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity focus:outline-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  Industries
                  <ChevronDown className={`transition-transform duration-200 mt-0.5 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && <IndustriesDropdown onClose={() => setDropdownOpen(false)} isWhiteBg={isWhiteBg} />}
              </li>
            ) : (
              <li key={link} className="cursor-pointer hover:opacity-75 transition-opacity">
                {/* ✅ Changed <a> to <Link> */}
                <Link to={path}>{link}</Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        {/* ✅ Changed <button> to <Link> for routing */}
        <Link to="/signup" className="hidden md:inline-flex items-center bg-[#38b6ff] hover:bg-blue-400 text-white text-lg font-medium px-6 py-2 rounded-full transition-colors duration-200">
          Get Started
        </Link>

        {/* Hamburger */}
        {!menuOpen && (
          <button
            className={`md:hidden focus:outline-none ${textColor} transition-colors duration-300`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {menuOpen && <div className="md:hidden w-6 h-6" />}
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeMenu} // Optional: close menu if clicking the dark backdrop
      />

      <div
        className={`fixed top-0 left-0 z-50 w-4/5 max-w-xs h-full bg-white flex flex-col shadow-xl overflow-y-auto md:hidden
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 font-semibold text-base text-gray-900">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#38b6ff]">
              <span className="w-4 h-4 rounded-full bg-[#38b6ff]" />
            </span>
            Accountant
          </Link>
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
          {navLinks.map((link) => {
            const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
            
            return link === "Industries" ? (
              <li key={link}>
                {/* ✅ Pass closeMenu down to the accordion */}
                <MobileIndustriesAccordion closeMenu={closeMenu} />
              </li>
            ) : (
              <li key={link}>
                {/* ✅ Changed <a> to <Link> and added onClick={closeMenu} */}
                <Link 
                  to={path} 
                  onClick={closeMenu}
                  className="flex items-center px-5 py-4 text-base text-gray-900 hover:bg-gray-50"
                >
                  {link}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="px-5 py-6 border-t border-gray-100 flex-shrink-0">
          {/* ✅ Changed <button> to <Link> and added justify-center for text alignment */}
          <Link 
            to="/signup" 
            onClick={closeMenu}
            className="w-full py-3.5 bg-[#38b6ff] text-white text-base font-medium rounded-full transition-colors hover:bg-blue-400 flex items-center justify-center"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;