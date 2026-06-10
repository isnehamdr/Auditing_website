import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed  bottom-0 right-5 z-50 flex flex-col items-center gap-3">

      {/* WhatsApp button */}
      <a
        href="https://wa.me/97761450488"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
      >
        <img src="/images/whatsapp.png" alt="WhatsApp" className="w-14 h-14 object-cover" />
      </a>

      {/* Back to Top button — only visible after scrolling */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`w-12 h-12 rounded-full bg-[#38b6ff] hover:bg-blue-400 shadow-lg flex items-center justify-center transition-all duration-300
          ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

    </div>
  );
}