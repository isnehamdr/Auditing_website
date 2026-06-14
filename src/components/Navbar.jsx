import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

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

// Get all industry slugs
const industrySlugsList = industries.flatMap(col => col.items.map(item => item.slug));

// Check if a path is active for nav links
const isNavActive = (pathname, linkPath) => {
  if (linkPath === "/") {
    return pathname === "/";
  }
  return pathname === linkPath || pathname.startsWith(`${linkPath}/`);
};

// Smooth Link Component with page transitions
const SmoothLink = ({ to, children, onClick, className, style, isActive }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async (e) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) onClick();
    
    // Don't navigate if already on the same page
    if (location.pathname === to) return;
    
    // Create overlay for page transition
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = '#38b6ff';
    overlay.style.zIndex = '9999';
    overlay.style.transform = 'translateY(100%)';
    overlay.style.pointerEvents = 'none';
    document.body.appendChild(overlay);
    
    // Animate overlay in
    await gsap.to(overlay, {
      y: '0%',
      duration: 0.5,
      ease: 'power2.inOut'
    });
    
    // Navigate to new page
    navigate(to);
    
    // Animate overlay out
    await gsap.to(overlay, {
      y: '-100%',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.removeChild(overlay);
        // Scroll to top after navigation
        window.scrollTo(0, 0);
      }
    });
  };
  
  // Add active state styling
  const activeStyles = isActive ? {
    fontWeight: '600',
    position: 'relative',
  } : {};
  
  return (
    <Link to={to} onClick={handleClick} className={className} style={{ ...style, ...activeStyles }}>
      {children}
      {isActive && (
        <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#38b6ff] rounded-full" />
      )}
    </Link>
  );
};

// ── Mega Dropdown - Direct to slug (no prefix) ──────────────────────────────
const IndustriesDropdown = ({ onClose }) => {
  const location = useLocation();
  
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[1100px] max-w-[95vw] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((col, ci) => (
          <div key={ci} className="p-6 border-r border-gray-100 last:border-r-0">
            <p className="text-lg font-normal text-[#38b6ff] uppercase mb-3 pb-3 border-b border-gray-100 whitespace-nowrap">
              {col.category}
            </p>
            <ul className="flex flex-col gap-3">
              {col.items.map((item) => {
                const isActive = location.pathname === `/${item.slug}`;
                return (
                  <li key={item.label}>
                    <SmoothLink
                      to={`/${item.slug}`}
                      onClick={onClose}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#38b6ff] ${
                        isActive ? "text-[#38b6ff]" : "text-black"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        isActive ? "bg-[#38b6ff]" : "bg-[#38b6ff]"
                      }`} />
                      <span>{item.label}</span>
                    </SmoothLink>
                  </li>
                );
              })}
            </ul>
            {col.cta && (
              <div className="mt-5 rounded-xl bg-gray-50 border border-gray-200 p-4">
                <p className="text-sm text-gray-400 leading-snug mb-3">
                  Cross-sector or emerging businesses are welcome to explore.
                </p>
                <SmoothLink
                  to="/contact"
                  onClick={onClose}
                  className="flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 transition-colors text-white text-sm font-normal rounded-lg px-4 py-2.5"
                >
                  Contact Us
                  <ArrowUpRight />
                </SmoothLink>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Mobile Industries Accordion - Direct to slug ─────────────────────────────
const MobileIndustriesAccordion = ({ closeMenu }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const location = useLocation();
  
  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        gsap.to(contentRef.current, {
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
          opacity: 1,
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          duration: 0.3,
          ease: "power2.in",
          opacity: 0,
        });
      }
    }
  }, [open]);

  return (
    <div>
      <button
        className="flex items-center justify-between w-full py-3 text-xl text-gray-300 hover:text-white border-b border-white/10 transition-colors"
        onClick={() => setOpen(!open)}
      >
        Industries
        <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="bg-white/5 px-4 py-4 rounded-lg mt-2 mb-2">
          {industries.map((col) => (
            <div key={col.category} className="mt-4 first:mt-0">
              <p className="text-[10px] font-bold tracking-widest text-[#38b6ff] uppercase mb-2">
                {col.category}
              </p>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => {
                  const isActive = location.pathname === `/${item.slug}`;
                  return (
                    <li key={item.label}>
                      <SmoothLink
                        to={`/${item.slug}`}
                        onClick={closeMenu}
                        className={`flex items-center gap-2 text-sm py-1 transition-colors ${
                          isActive ? "text-[#38b6ff]" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38b6ff] flex-shrink-0" />
                        <span>{item.label}</span>
                      </SmoothLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <SmoothLink
            to="/contact"
            onClick={closeMenu}
            className="mt-4 flex items-center justify-between bg-[#38b6ff] hover:bg-blue-400 text-white text-sm font-medium rounded-lg px-4 py-2.5"
          >
            Contact Us
            <ArrowUpRight />
          </SmoothLink>
        </div>
      </div>
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
  const mobileMenuRef = useRef(null);
  const mobileOverlayRef = useRef(null);

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

  // Handle mobile menu animation
  useEffect(() => {
    if (menuOpen) {
      // Kill any ongoing animations
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.killTweensOf(mobileOverlayRef.current);
      
      // First make overlay visible
      gsap.set(mobileOverlayRef.current, { display: "block" });
      
      // Animate overlay
      gsap.fromTo(mobileOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      
      // Animate drawer from right
      gsap.fromTo(mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
      
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Kill any ongoing animations
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.killTweensOf(mobileOverlayRef.current);
      
      // Animate drawer out
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
      
      // Animate overlay out
      gsap.to(mobileOverlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileOverlayRef.current, { display: "none" });
        }
      });
      
      // Restore body scroll
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

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
    setIsAtTop(window.scrollY < 10);
    setDropdownOpen(false);
    // Close menu when route changes
    if (menuOpen) {
      setMenuOpen(false);
    }
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  // Helper function to check if a nav link is active
  const isLinkActive = (link) => {
    if (link === "Home") {
      return location.pathname === "/";
    }
    if (link === "Industries") {
      // Check if current path is an industry detail page
      return industrySlugs.some(slug => location.pathname === `/${slug}`);
    }
    const linkPath = `/${link.toLowerCase()}`;
    return location.pathname === linkPath || location.pathname.startsWith(`${linkPath}/`);
  };

  return (
    <>
      <nav
        style={navBgStyle}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 md:py-5">
          <SmoothLink to="/" style={navTextStyle} className="flex items-center gap-2 font-semibold text-base sm:text-lg tracking-wide transition-colors duration-300">
            {/* Logo with proper sizing */}
            <img 
              src="/images/logo.jpg" 
              alt="Logo" 
              className="h-10 w-auto md:h-12 object-contain"
              style={{ maxWidth: '100%' }}
            />
          </SmoothLink>

          <ul style={navTextStyle} className="hidden md:flex items-center gap-7 text-lg font-medium transition-colors duration-300">
            {navLinks.map((link) => {
              const pathLink = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              const isActive = isLinkActive(link);
              
              return link === "Industries" ? (
                <li key={link} className="relative" ref={dropdownRef}>
                  <button
                    style={navTextStyle}
                    className={`flex items-center gap-1 cursor-pointer hover:opacity-75 transition-opacity focus:outline-none ${
                      isActive ? "font-semibold" : ""
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    Industries
                    <ChevronDown className={`transition-transform duration-200 mt-0.5 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#38b6ff] rounded-full" />
                  )}
                  {dropdownOpen && <IndustriesDropdown onClose={() => setDropdownOpen(false)} />}
                </li>
              ) : (
                <li key={link} className="relative cursor-pointer hover:opacity-75 transition-opacity">
                  <SmoothLink 
                    style={navTextStyle} 
                    to={pathLink}
                    isActive={isActive}
                    className="relative inline-block"
                  >
                    {link}
                  </SmoothLink>
                </li>
              );
            })}
          </ul>

          <SmoothLink to="/contact" className="hidden md:inline-flex items-center bg-[#38b6ff] hover:bg-blue-400 text-white text-lg font-medium px-6 py-2 rounded-full transition-colors duration-200">
            Get Started
          </SmoothLink>

          {/* Mobile Menu Button */}
          <button
            style={navTextStyle}
            className="md:hidden focus:outline-none transition-colors duration-300 p-2"
            onClick={openMenu}
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
        ref={mobileOverlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        style={{ display: "none", opacity: 0 }}
        onClick={closeMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl z-50 md:hidden overflow-y-auto"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <SmoothLink to="/" onClick={closeMenu} className="flex items-center gap-2">
            <img 
              className="h-10 w-auto object-contain" 
              src="/images/logo.jpg" 
              alt="Logo" 
            />
          </SmoothLink>
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
        <div className="flex-1">
          <ul className="flex flex-col px-6 pt-4 gap-1 pb-6">
            {navLinks.map((link) => {
              const pathLink = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              const isActive = isLinkActive(link);
              
              return link === "Industries" ? (
                <li key={link}>
                  <MobileIndustriesAccordion closeMenu={closeMenu} />
                </li>
              ) : (
                <li key={link}>
                  <SmoothLink
                    to={pathLink}
                    onClick={closeMenu}
                    className={`flex items-center py-3 text-lg font-medium transition-colors ${
                      isActive ? "text-[#38b6ff]" : "text-white hover:text-[#38b6ff]"
                    }`}
                  >
                    {link}
                    {isActive && (
                      <span className="ml-2 w-1.5 h-1.5 rounded-full bg-[#38b6ff]" />
                    )}
                  </SmoothLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile CTA */}
        <div className="p-6 border-t border-white/10">
          <SmoothLink
            to="/contact"
            onClick={closeMenu}
            className="w-full flex items-center justify-center gap-2 bg-[#38b6ff] hover:bg-blue-500 text-white text-base font-medium py-3 rounded-full transition-all duration-300"
          >
            Get Started
            <ArrowRightIcon />
          </SmoothLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;