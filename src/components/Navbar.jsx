// import React, { useState, useRef, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// const ChevronDown = ({ className = "" }) => (
//   <svg className={className} viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
//     <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//   </svg>
// );

// const ArrowUpRight = () => (
//   <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
//     <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
//   </svg>
// );

// const ArrowRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//   </svg>
// );

// const industries = [
//   {
//     category: "INFRASTRUCTURE",
//     items: [
//       { label: "Construction Industry" },
//       { label: "Energy Industry" },
//       { label: "Mineral Industry" },
//     ],
//   },
//   {
//     category: "TRADE & COMMERCE",
//     items: [
//       { label: "Manufacturing Industry" },
//       { label: "Trade and Commerce" },
//       { label: "Agribusiness" },
//     ],
//   },
//   {
//     category: "SERVICES & TECH",
//     items: [
//       { label: "Technology & Software" },
//       { label: "Service Industry" },
//       { label: "Financial Sector" },
//     ],
//   },
//   {
//     category: "OTHER SECTORS",
//     items: [{ label: "Hospitality & Tourism" }],
//     cta: true,
//   },
// ];

// const navLinks = ["Home", "About", "Team", "Services", "Industries", "Blog"];
// const getSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// // ── Mega Dropdown ──────────────────────────────────────────────────────────────
// const IndustriesDropdown = ({ onClose }) => (
//   <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[860px] max-w-[95vw] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//       {industries.map((col, ci) => (
//         <div key={ci} className="p-6 border-r border-gray-100 last:border-r-0">
//           <p className="text-lg font-normal text-[#38b6ff] uppercase mb-3 pb-3 border-b border-gray-100">
//             {col.category}
//           </p>
//           <ul className="flex flex-col gap-3">
//             {col.items.map((item) => (
//               <li key={item.label}>
//                 <Link
//                   to={`/industries/${getSlug(item.label)}`}
//                   onClick={onClose}
//                   className="flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-[#38b6ff]"
//                 >
//                   <span className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           {col.cta && (
//             <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4">
//               <p className="text-sm text-gray-400 leading-snug mb-3">
//                 Cross-sector or emerging businesses are welcome to explore.
//               </p>
//               <Link
//                 to="/industries"
//                 onClick={onClose}
//                 className="flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 transition-colors text-white text-sm font-normal rounded-lg px-4 py-2.5"
//               >
//                 All industries
//                 <ArrowUpRight />
//               </Link>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   </div>
// );

// // ── Mobile Industries Accordion (Dark Theme) ────────────────────────────────────
// const MobileIndustriesAccordion = ({ closeMenu }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div>
//       <button
//         className="flex items-center justify-between w-full py-3 text-xl text-gray-300 hover:text-white border-b border-white/10 transition-colors"
//         onClick={() => setOpen(!open)}
//       >
//         Industries
//         <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//       </button>
//       {open && (
//         <div className="bg-white/5 px-4 py-4 rounded-lg mt-2 mb-2">
//           {industries.map((col) => (
//             <div key={col.category} className="mt-4 first:mt-0">
//               <p className="text-[10px] font-bold tracking-widest text-[#38b6ff] uppercase mb-2">
//                 {col.category}
//               </p>
//               <ul className="flex flex-col gap-2">
//                 {col.items.map((item) => (
//                   <li key={item.label}>
//                     <Link
//                       to={`/industries/${getSlug(item.label)}`}
//                       onClick={closeMenu}
//                       className="flex items-center gap-2 text-sm text-gray-300 hover:text-white py-1"
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
//                       <span>{item.label}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//           <Link
//             to="/industries"
//             onClick={closeMenu}
//             className="mt-4 flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 text-white text-sm font-medium rounded-lg px-4 py-2.5"
//           >
//             All industries
//             <ArrowUpRight />
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Main Navbar ────────────────────────────────────────────────────────────────
// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [isAtTop, setIsAtTop] = useState(() => window.scrollY < 10);

//   const lastScrollY = useRef(0);
//   const ticking = useRef(false);
//   const dropdownRef = useRef(null);

//   const location = useLocation();

//   // Normalize path by removing trailing slash for consistent matching
//   const path = location.pathname.endsWith('/') && location.pathname !== '/' 
//     ? location.pathname.slice(0, -1) 
//     : location.pathname;

//   // ── 1. Service DETAIL pages (Exclude the main /services index) ──
//   const isServiceDetail =
//     (path.startsWith("/services/") && path !== "/services") ||
//     (path.startsWith("/service/") && path !== "/service") ||
//     path.startsWith("/service-page/");

//   // ── 2. Blog INDEX page ONLY (Exclude blog detail pages) ──
//   const isBlogIndex = path === "/blog" || path === "/blogs";

//   // ── Pages that must ALWAYS have black text ──
//   const isBlackTextPage = isServiceDetail || isBlogIndex;

//   // Background is transparent when at the top, solid white when scrolled down (for ALL pages)
//   const navBgStyle = { backgroundColor: isAtTop ? "transparent" : "#ffffff" };

//   // White text ONLY on non-black-text pages when at the top
//   const useLightText = !isBlackTextPage && isAtTop;
//   const navTextStyle = { color: useLightText ? "#ffffff" : "#111827" };

//   const logoBorderColor = useLightText ? "border-white" : "border-[#38b6ff]";
//   const logoDotBg       = useLightText ? "bg-white"     : "bg-[#38b6ff]";
//   const navBgClass      = "";

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // Lock body scroll when mobile menu is open
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   // Reset states on route change
//   useEffect(() => {
//     setIsAtTop(window.scrollY < 10);
//     setDropdownOpen(false);
//     setMenuOpen(false);
//   }, [location.pathname]);

//   // Scroll listener
//   useEffect(() => {
//     let lastScrollYVal = window.scrollY;
//     let tickingVal = false;

//     const controlNavbar = () => {
//       if (tickingVal) return;
//       window.requestAnimationFrame(() => {
//         const currentScrollY = window.scrollY;
//         const atTop = currentScrollY < 10;
//         setIsAtTop(atTop);
//         setIsVisible(atTop || currentScrollY < lastScrollYVal || currentScrollY <= 50);
//         lastScrollYVal = currentScrollY;
//         tickingVal = false;
//       });
//       tickingVal = true;
//     };

//     controlNavbar();
//     window.addEventListener("scroll", controlNavbar, { passive: true });
//     return () => window.removeEventListener("scroll", controlNavbar);
//   }, []);

//   const closeMenu = () => setMenuOpen(false);

//   return (
//     <nav
//       style={navBgStyle}
//       className={[
//         "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
//         isVisible ? "translate-y-0" : "-translate-y-full",
//         navBgClass,
//       ].join(" ")}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 md:py-5">

//         {/* Logo */}
//         <Link
//           to="/"
//           style={navTextStyle}
//           className={`flex items-center gap-2 font-semibold text-base sm:text-lg tracking-wide transition-colors duration-300`}
//         >
//           <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border-2 ${logoBorderColor} relative transition-colors duration-300`}>
//             <span className={`w-2 h-2 rounded-full ${logoDotBg} absolute transition-colors duration-300`} />
//             <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border ${logoBorderColor} opacity-60 transition-colors duration-300`} />
//           </span>
//           Accountant
//         </Link>

//         {/* Desktop Nav Links */}
//         <ul style={navTextStyle} className="hidden md:flex items-center gap-7 text-lg font-medium transition-colors duration-300">
//           {navLinks.map((link) => {
//             const pathLink = link === "Home" ? "/" : `/${link.toLowerCase()}`;
//             return link === "Industries" ? (
//               <li key={link} className="relative" ref={dropdownRef}>
//                 <button
//                   style={navTextStyle}
//                   className="flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity focus:outline-none"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   aria-expanded={dropdownOpen}
//                 >
//                   Industries
//                   <ChevronDown className={`transition-transform duration-200 mt-0.5 ${dropdownOpen ? "rotate-180" : ""}`} />
//                 </button>
//                 {dropdownOpen && (
//                   <IndustriesDropdown onClose={() => setDropdownOpen(false)} />
//                 )}
//               </li>
//             ) : (
//               <li key={link} className="cursor-pointer hover:opacity-75 transition-opacity">
//                 <Link style={navTextStyle} to={pathLink}>{link}</Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Desktop CTA */}
//         <Link
//           to="/contact"
//           className="hidden md:inline-flex items-center bg-[#38b6ff] hover:bg-blue-400 text-white text-lg font-medium px-6 py-2 rounded-full transition-colors duration-200"
//         >
//           Get Started
//         </Link>

//         {/* Mobile Hamburger */}
//         {!menuOpen && (
//           <button
//             style={navTextStyle}
//             className="md:hidden focus:outline-none transition-colors duration-300"
//             onClick={() => setMenuOpen(true)}
//             aria-label="Open menu"
//           >
//             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         )}
//         {menuOpen && <div className="md:hidden w-6 h-6" />}
//       </div>

//       {/* ── Mobile Backdrop ── */}
//       <div
//         className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden transition-opacity duration-500 ${
//           menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={closeMenu}
//       />

//       {/* ── Mobile Drawer (Dark Theme, slides from right) ── */}
//       <div
//         className={`fixed right-0 top-0 z-50 h-full w-full sm:w-96 transform bg-[#0f0f0f] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden flex flex-col ${
//           menuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Drawer Header */}
//         <div className="flex items-center justify-between px-8 h-20 border-b border-white/10 flex-shrink-0">
//           <Link
//             to="/"
//             onClick={closeMenu}
//             className="flex items-center gap-2 font-semibold text-base text-white"
//           >
//             <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
//               <span className="w-4 h-4 rounded-full bg-white" />
//             </span>
//             Accountant
//           </Link>
//           <button
//             onClick={closeMenu}
//             aria-label="Close menu"
//             className="text-white/70 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
//           >
//             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Nav Items */}
//         <ul className="flex flex-col flex-1 px-8 pt-6 gap-2 overflow-y-auto">
//           {navLinks.map((link) => {
//             const pathLink = link === "Home" ? "/" : `/${link.toLowerCase()}`;
//             return link === "Industries" ? (
//               <li key={link}>
//                 <MobileIndustriesAccordion closeMenu={closeMenu} />
//               </li>
//             ) : (
//               <li key={link}>
//                 <Link
//                   to={pathLink}
//                   onClick={closeMenu}
//                   className="flex items-center py-3 text-xl text-gray-300 hover:text-white border-b border-white/10 transition-colors"
//                 >
//                   {link}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* Mobile CTA */}
//         <div className="px-8 py-6 border-t border-white/10 flex-shrink-0">
//           <Link
//             to="/contact"
//             onClick={closeMenu}
//             className="w-full py-4 border border-white/20 text-white text-base font-medium rounded-full transition-colors hover:bg-white hover:text-black flex items-center justify-center gap-3"
//           >
//             Get Started
//             <ArrowRightIcon />
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Industries with direct slugs (no prefix)
const industries = [
  {
    category: "INFRASTRUCTURE",
    items: [
      { label: "Construction Industry", slug: "construction-industry" },
      { label: "Energy Industry", slug: "energy-industry" },
      { label: "Mineral Industry", slug: "mineral-industry" },
    ],
  },
  {
    category: "TRADE & COMMERCE",
    items: [
      { label: "Manufacturing Industry", slug: "manufacturing-industry" },
      { label: "Trade and Commerce", slug: "trade-and-commerce" },
      { label: "Agribusiness", slug: "agribusiness" },
    ],
  },
  {
    category: "SERVICES & TECH",
    items: [
      { label: "Technology & Software", slug: "technology-software" },
      { label: "Service Industry", slug: "service-industry" },
      { label: "Financial Sector", slug: "financial-sector" },
    ],
  },
  {
    category: "OTHER SECTORS",
    items: [{ label: "Hospitality & Tourism", slug: "hospitality-tourism" }],
    cta: true,
  },
];

const navLinks = ["Home", "About", "Team", "Services", "Industries", "Blog"];

// ── Mega Dropdown - Direct to slug (no prefix) ──────────────────────────────
const IndustriesDropdown = ({ onClose }) => (
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
                <Link
                  to={`/${item.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-[#38b6ff]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
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
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 transition-colors text-white text-sm font-normal rounded-lg px-4 py-2.5"
              >
                Contact Us
                <ArrowUpRight />
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// ── Mobile Industries Accordion - Direct to slug ─────────────────────────────
const MobileIndustriesAccordion = ({ closeMenu }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-3 text-xl text-gray-300 hover:text-white border-b border-white/10 transition-colors"
        onClick={() => setOpen(!open)}
      >
        Industries
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="bg-white/5 px-4 py-4 rounded-lg mt-2 mb-2">
          {industries.map((col) => (
            <div key={col.category} className="mt-4 first:mt-0">
              <p className="text-[10px] font-bold tracking-widest text-[#38b6ff] uppercase mb-2">
                {col.category}
              </p>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={`/${item.slug}`}
                      onClick={closeMenu}
                      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white py-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="mt-4 flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 text-white text-sm font-medium rounded-lg px-4 py-2.5"
          >
            Contact Us
            <ArrowUpRight />
          </Link>
        </div>
      )}
    </div>
  );
};

// ── Main Navbar ────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(() => window.scrollY < 10);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownRef = useRef(null);

  const location = useLocation();

  const path = location.pathname.endsWith('/') && location.pathname !== '/' 
    ? location.pathname.slice(0, -1) 
    : location.pathname;

  // Get all industry slugs to detect if current page is an industry detail
  const industrySlugs = industries.flatMap(col => col.items.map(item => item.slug));
  const isIndustryDetail = industrySlugs.includes(path.slice(1)); // Remove the leading slash

  const isServiceDetail =
    (path.startsWith("/services/") && path !== "/services") ||
    (path.startsWith("/service/") && path !== "/service") ||
    path.startsWith("/service-page/");

  const isBlogIndex = path === "/blog" || path === "/blogs";

  // For industry detail pages, we want WHITE text when at top (transparent bg)
  // For service detail and blog index, we want BLACK text
  const shouldHaveWhiteText = isIndustryDetail && isAtTop;
  const isBlackTextPage = isServiceDetail || isBlogIndex;
  
  // Use white text ONLY for industry detail pages when at top
  const useLightText = shouldHaveWhiteText || (!isBlackTextPage && isAtTop);

  // Background: transparent for industry detail/home at top, white for everything else
  // BUT always white when mobile menu is open
  const shouldBeTransparent = !menuOpen && ((isIndustryDetail && isAtTop) || (!isBlackTextPage && isAtTop));
  const navBgStyle = { backgroundColor: shouldBeTransparent ? "transparent" : "#ffffff" };
  
  const navTextStyle = { color: useLightText && !menuOpen ? "#ffffff" : "#111827" };

  const logoBorderColor = (useLightText && !menuOpen) ? "border-white" : "border-[#38b6ff]";
  const logoDotBg = (useLightText && !menuOpen) ? "bg-white" : "bg-[#38b6ff]";

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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    setIsAtTop(window.scrollY < 10);
    setDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let lastScrollYVal = window.scrollY;
    let tickingVal = false;

    const controlNavbar = () => {
      if (tickingVal) return;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const atTop = currentScrollY < 10;
        setIsAtTop(atTop);
        setIsVisible(atTop || currentScrollY < lastScrollYVal || currentScrollY <= 50);
        lastScrollYVal = currentScrollY;
        tickingVal = false;
      });
      tickingVal = true;
    };

    controlNavbar();
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={navBgStyle}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 md:py-5">
          <Link to="/" style={navTextStyle} className="flex items-center gap-2 font-semibold text-base sm:text-lg tracking-wide transition-colors duration-300">
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border-2 ${logoBorderColor} relative transition-colors duration-300`}>
              <span className={`w-2 h-2 rounded-full ${logoDotBg} absolute transition-colors duration-300`} />
              <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border ${logoBorderColor} opacity-60 transition-colors duration-300`} />
            </span>
            Accountant
          </Link>

          <ul style={navTextStyle} className="hidden md:flex items-center gap-7 text-lg font-medium transition-colors duration-300">
            {navLinks.map((link) => {
              const pathLink = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              return link === "Industries" ? (
                <li key={link} className="relative" ref={dropdownRef}>
                  <button
                    style={navTextStyle}
                    className="flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity focus:outline-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Industries
                    <ChevronDown className={`transition-transform duration-200 mt-0.5 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {dropdownOpen && <IndustriesDropdown onClose={() => setDropdownOpen(false)} />}
                </li>
              ) : (
                <li key={link} className="cursor-pointer hover:opacity-75 transition-opacity">
                  <Link style={navTextStyle} to={pathLink}>{link}</Link>
                </li>
              );
            })}
          </ul>

          <Link to="/contact" className="hidden md:inline-flex items-center bg-[#38b6ff] hover:bg-blue-400 text-white text-lg font-medium px-6 py-2 rounded-full transition-colors duration-200">
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            style={navTextStyle}
            className="md:hidden focus:outline-none transition-colors duration-300 p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
              <span className="w-2 h-2 rounded-full bg-white" />
            </span>
            <span className="text-white font-semibold text-lg">Accountant</span>
          </Link>
          <button
            onClick={closeMenu}
            className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col px-6 pt-4 gap-1">
            {navLinks.map((link) => {
              const pathLink = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              return link === "Industries" ? (
                <li key={link}>
                  <MobileIndustriesAccordion closeMenu={closeMenu} />
                </li>
              ) : (
                <li key={link}>
                  <Link
                    to={pathLink}
                    onClick={closeMenu}
                    className="flex items-center py-3 text-white text-lg font-medium hover:text-[#38b6ff] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile CTA */}
        <div className="p-6 border-t border-white/10">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="w-full flex items-center justify-center gap-2 bg-[#38b6ff] hover:bg-blue-500 text-white text-base font-medium py-3 rounded-full transition-all duration-300"
          >
            Get Started
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;