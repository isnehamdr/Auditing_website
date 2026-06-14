import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const LinkedInIcon = () => <img src="/images/linkedin.png" alt="" className="w-full h-full object-contain" />;
const FacebookIcon = () => <img src="/images/facebook.png" alt="" className="w-full h-full object-contain" />;
const YoutubeIcon = () => <img src="/images/youtube.png" alt="" className="w-full h-full object-contain" />;
const TwitterIcon = () => <img src="/images/twitter.png" alt="" className="w-full h-full object-contain" />;
const WhatsappIcon = () => <img src="/images/whatsapp.png" alt="" className="w-full h-full object-contain" />;
const InstagramIcon = () => <img src="/images/instagram.png" alt="" className="w-full h-full object-contain" />;

const navLinks = [
  [
    { name: "Home", path: "/", type: "link" },
    { name: "About", path: "/about", type: "link" },
    { name: "Service", path: "/services", type: "link" }
  ],
  [
    { name: "Contact", path: "/contact", type: "link" },
    { name: "Our Team", path: "/team", type: "link" },
    { name: "Blog", path: "/blog", type: "link" }
  ],
  [
    { name: "+977-61-450488", value: "+977-61-450488", type: "phone" },
    { name: "Pokhara-7,Masbar", type: "text" },
    { name: "connect@psandeepca.com", value: "connect@psandeepca.com", type: "email" }
  ],
];

const socialLinks = [
  { icon: <LinkedInIcon />, label: "LinkedIn", url: "https://linkedin.com" },
  { icon: <FacebookIcon />, label: "Facebook", url: "https://facebook.com" },
  { icon: <InstagramIcon />, label: "Instagram", url: "https://instagram.com" },
  { icon: <YoutubeIcon />, label: "Youtube", url: "https://youtube.com" },
  { icon: <TwitterIcon />, label: "Twitter", url: "https://twitter.com" },
  { icon: <WhatsappIcon />, label: "Whatsapp", url: "https://whatsapp.com" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const navContainerRef = useRef(null);
  const socialRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple fade-in animations
      gsap.fromTo(brandRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );

      gsap.fromTo(navContainerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: navContainerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );

      gsap.fromTo(socialRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          }
        }
      );

      gsap.fromTo(bottomBarRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          scrollTrigger: {
            trigger: bottomBarRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#0f1f3d] text-white">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-6">

          {/* Brand Column */}
          <div ref={brandRef} className="flex-shrink-0 md:max-w-xs lg:max-w-md">
            {/* Logo */}
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-5 h-5 flex-shrink-0">
                  <div className="absolute inset-0 rounded-full border-2 border-white opacity-60"></div>
                  <div className="absolute inset-[3px] rounded-full bg-white opacity-80"></div>
                </div>
                <span className="text-white font-normal text-2xl sm:text-3xl">
                  Accountant
                </span>
              </div>
            </Link>

            {/* Description */}
            <p className="text-white text-base sm:text-lg mb-5">
              An accountant is a professional responsible for managing
              financial records, preparing financial statements, and ensuring
              compliance with relevant laws and regulations.
            </p>

            {/* Email */}
            <a
              href="mailto:connect@psandeepca.com"
              className="text-gray-300 text-base sm:text-lg underline underline-offset-2 hover:text-white transition-colors break-all"
            >
              connect@psandeepca.com
            </a>
          </div>

          {/* Nav Links */}
          <div ref={navContainerRef} className="flex-1 grid grid-cols-3 gap-4 sm:flex sm:flex-row sm:gap-0 sm:justify-between md:justify-around lg:justify-center lg:gap-16 mt-2 md:mt-8">
            {navLinks.map((col, colIndex) => (
              <ul key={colIndex} className="flex flex-col gap-3">
                {col.map((link, linkIndex) => {
                  if (link.type === "link") {
                    return (
                      <li key={linkIndex}>
                        <Link 
                          to={link.path} 
                          className="text-sm sm:text-md text-white transition-colors hover:text-blue-300 break-words"
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  } else if (link.type === "phone") {
                    return (
                      <li key={linkIndex}>
                        <a 
                          href={`tel:${link.value}`}
                          className="text-sm sm:text-md text-white transition-colors hover:text-blue-300 break-words"
                        >
                          {link.name}
                        </a>
                      </li>
                    );
                  } else if (link.type === "email") {
                    return (
                      <li key={linkIndex}>
                        <a 
                          href={`mailto:${link.value}`}
                          className="text-sm sm:text-md text-white transition-colors hover:text-blue-300 break-words"
                        >
                          {link.name}
                        </a>
                      </li>
                    );
                  } else {
                    return (
                      <li key={linkIndex}>
                        <span className="text-sm sm:text-md text-white break-words">
                          {link.name}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            ))}
          </div>

          {/* Social Icons */}
          <div ref={socialRef} className="flex-shrink-0 mt-2 md:mt-8">
            <div className="hidden md:grid grid-cols-3 gap-3">
              {socialLinks.map(({ icon, label, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity hover:scale-110 duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>

            <div className="flex md:hidden flex-row gap-4 flex-wrap">
              {socialLinks.map(({ icon, label, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity hover:scale-110 duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div ref={bottomBarRef} className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-gray-400">
          <span>© PSandeep Associates Chartered Accountants. All Rights Reserved.</span>      
          <span className="sm:text-right">
            Crafted By :{" "}
            <a
              href="https://saitsolution.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white transition-colors"
            >
              S.A I.T Solution Nepal
            </a>
          </span>
        </div>
      </div>

    </footer>
  );
}