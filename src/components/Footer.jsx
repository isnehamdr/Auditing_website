import { useState } from "react";

const LinkedInIcon = () => <img src="/images/linkedin.png" alt="" className="w-full h-full object-contain" />;
const FacebookIcon = () => <img src="/images/facebook.png" alt="" className="w-full h-full object-contain" />;
const YoutubeIcon = () => <img src="/images/youtube.png" alt="" className="w-full h-full object-contain" />;
const TwitterIcon = () => <img src="/images/twitter.png" alt="" className="w-full h-full object-contain" />;
const WhatsappIcon = () => <img src="/images/whatsapp.png" alt="" className="w-full h-full object-contain" />;
const InstagramIcon = () => <img src="/images/instagram.png" alt="" className="w-full h-full object-contain" />;

const navLinks = [
  ["Home", "About", "Service"],
  ["Industries", "Our Team", "Blog"],
  ["+977-61-450488", "Pokhara-7,Masbar", "connect@psandeepca.com"],
];

const socialLinks = [
  { icon: <LinkedInIcon />, label: "LinkedIn" },
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <YoutubeIcon />, label: "Youtube" },
  { icon: <TwitterIcon />, label: "Twitter" },
  { icon: <WhatsappIcon />, label: "Whatsapp" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f1f3d] text-white">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-6">

          {/* Brand Column */}
          <div className="flex-shrink-0 md:max-w-xs lg:max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-5 h-5 flex-shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-white opacity-60"></div>
                <div className="absolute inset-[3px] rounded-full bg-white opacity-80"></div>
              </div>
              <span className="text-white font-normal text-2xl sm:text-3xl">
                Accountant
              </span>
            </div>

            {/* Description */}
            <p className="text-white text-base sm:text-lg mb-5 ">
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
          <div className="flex-1 grid grid-cols-3 gap-4 sm:flex sm:flex-row sm:gap-0 sm:justify-between md:justify-around lg:justify-center lg:gap-16 mt-2 md:mt-8">
            {navLinks.map((col, i) => (
              <ul key={i} className="flex flex-col gap-3">
                {col.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm sm:text-md text-white transition-colors hover:text-blue-300 break-words">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          {/* Social Icons — 3×2 grid on desktop, horizontal row on mobile */}
          <div className="flex-shrink-0 mt-2 md:mt-8">
            {/* Desktop: 3 cols × 2 rows grid */}
            <div className="hidden md:grid grid-cols-3 gap-3">
              {socialLinks.map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Mobile: horizontal row */}
            <div className="flex md:hidden flex-row gap-4 flex-wrap">
              {socialLinks.map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-gray-400">
<span>© PSandeep Associates Chartered Accountants. All Rights Reserved.</span>      
  <span className="sm:text-right">
  Crafted By :{" "}
  <a
    href="https://saitsolution.com.np"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    S.A I.T Solution Nepal
  </a>
</span>
        </div>
      </div>

    </footer>
  );
}