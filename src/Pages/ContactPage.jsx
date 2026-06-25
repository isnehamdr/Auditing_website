import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: heroRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
   <div ref={heroRef} className="relative w-full min-h-[540px] overflow-hidden flex items-center justify-center">
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80')" }}
  />
  <div className="absolute inset-0 bg-gray-800/65" />
  
  <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-16">
    <h2 ref={titleRef} className="text-5xl lg:text-7xl font-normal text-white mb-4">
      Contact Us
    </h2>
    <p ref={descRef} className="text-white text-lg  max-w-xl mx-auto">
      Accounting data is often used by governments and policymakers for economic planning and analysis.
    </p>
  </div>
</div>
  );
}

// ─── Info Cards ────────────────────────────────────────────────────────────
function InfoCards() {
  const cardsRef = useRef([]);
  
  const cards = [
    {
      title: "Office Location",
      lines: ["Pokhara-7,Masbar, Nepal"],
      color: false,
    },
    {
      title: "Our Contact",
      lines: ["+977-61-450488"],
      color: true,
    },
    {
      title: "Work Hours",
      lines: ["Mon-Fri: 9:00 – 17:00"],
      color: true,
    },
  ];

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: index * 0.15, ease: "back.out(0.6)",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });
  }, []);

  const handleCardHover = (index, isEnter) => {
    if (isEnter) {
      gsap.to(cardsRef.current[index], {
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(cardsRef.current[index], {
        y: 0,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl md:px-16 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div 
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={() => handleCardHover(i, true)}
            onMouseLeave={() => handleCardHover(i, false)}
            className="flex flex-col items-center justify-center text-center font-medium py-7 px-6 bg-white border border-gray-200 transition-all duration-300"
          >
            <h4 className="text-gray-700 font-normal text-3xl mb-4">{card.title}</h4>
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
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);

  // ─── Verification Code State ──────────────────────────────────────────
  const [verificationCode, setVerificationCode] = useState('');
  const [userInputCode, setUserInputCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // ─── Generate Random Verification Code ──────────────────────────────
  const generateVerificationCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // ─── Regenerate Code on Page Load ──────────────────────────────────
  useEffect(() => {
    // Generate new code when component mounts (page reload)
    const newCode = generateVerificationCode();
    setVerificationCode(newCode);
    setIsCodeVerified(false);
    setIsCodeValid(true);
    setUserInputCode('');
    setSubmitStatus(null);
  }, []); // Empty dependency array ensures this runs only on mount/reload

  // ─── Handle Verification ────────────────────────────────────────────
  const handleVerifyCode = () => {
    if (userInputCode.trim() === verificationCode) {
      setIsCodeVerified(true);
      setIsCodeValid(true);
      setSubmitStatus(null);
      // Reset the verification code after successful verification
      // This ensures the code can't be reused
      setVerificationCode('');
    } else {
      setIsCodeValid(false);
      setIsCodeVerified(false);
      setSubmitStatus('error');
      // Show error animation
      gsap.to('.verification-input', {
        x: -10,
        duration: 0.1,
        repeat: 3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to('.verification-input', { x: 0, duration: 0.2 });
        }
      });
    }
  };

  // ─── Handle Input Change ────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset submit status when user types
    if (submitStatus) setSubmitStatus(null);
  };

  // ─── Handle Form Submit ─────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if code is verified
    if (!isCodeVerified) {
      setSubmitStatus('error');
      setSubmitStatus('Please verify the code first');
      return;
    }

    // Validate all fields are filled
    const { firstName, lastName, email, phone, message } = formData;
    if (!firstName || !lastName || !email || !phone || !message) {
      setSubmitStatus('error');
      setSubmitStatus('Please fill all fields');
      return;
    }

    // Proceed with form submission
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    setTimeout(() => {
      console.log('Form Data:', formData);
      console.log('Verification Code Used:', verificationCode);
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      setIsCodeVerified(false);
      setUserInputCode('');
      // Generate new code for next submission
      const newCode = generateVerificationCode();
      setVerificationCode(newCode);
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  // ─── Regenerate Code Function ───────────────────────────────────────
  const handleRegenerateCode = () => {
    const newCode = generateVerificationCode();
    setVerificationCode(newCode);
    setUserInputCode('');
    setIsCodeVerified(false);
    setIsCodeValid(true);
    setSubmitStatus(null);
  };

  const inputClass =
    "w-full bg-white/10 border border-white/20 text-white text-lg placeholder-gray-300 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white/15 transition";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      // Animate input fields with stagger
      inputRefs.current.forEach((input, index) => {
        gsap.fromTo(input,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, delay: 0.3 + (index * 0.08), ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      });

      gsap.fromTo(textareaRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );

      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: "back.out(0.6)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (isEnter) => {
    if (isEnter) {
      gsap.to(buttonRef.current, {
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleInputHover = (index, isEnter) => {
    if (isEnter) {
      gsap.to(inputRefs.current[index], {
        scale: 1.01,
        duration: 0.2,
        ease: "power2.out"
      });
    } else {
      gsap.to(inputRefs.current[index], {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 sm:px-6 px-2 overflow-hidden"
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
        <p ref={labelRef} className="text-white text-md uppercase mb-4 font-normal">
          Get In Touch
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-white text-2xl md:text-3xl lg:text-5xl font-normal mb-10"
        >
          Complete The Form<br />For Us To Reach Out
        </h2>

        {/* Form */}
        <div ref={formRef} className="bg-white/10 border border-white/15 p-4 sm:p-10 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-3">
              <input 
                ref={(el) => (inputRefs.current[0] = el)}
                onMouseEnter={() => handleInputHover(0, true)}
                onMouseLeave={() => handleInputHover(0, false)}
                type="text" 
                name="firstName"
                placeholder="First Name" 
                className={inputClass}
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input 
                ref={(el) => (inputRefs.current[1] = el)}
                onMouseEnter={() => handleInputHover(1, true)}
                onMouseLeave={() => handleInputHover(1, false)}
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                className={inputClass}
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-3">
              <input 
                ref={(el) => (inputRefs.current[2] = el)}
                onMouseEnter={() => handleInputHover(2, true)}
                onMouseLeave={() => handleInputHover(2, false)}
                type="email" 
                name="email"
                placeholder="Email" 
                className={inputClass}
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input 
                ref={(el) => (inputRefs.current[3] = el)}
                onMouseEnter={() => handleInputHover(3, true)}
                onMouseLeave={() => handleInputHover(3, false)}
                type="tel" 
                name="phone"
                placeholder="Phone" 
                className={inputClass}
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <textarea
              ref={textareaRef}
              name="message"
              placeholder="Your Input"
              rows={5}
              className={`${inputClass} resize-none mb-3 mt-4`}
              value={formData.message}
              onChange={handleInputChange}
              required
            />

            {/* ─── Verification Code Section ────────────────────────── */}
            <div className="mb-6 mt-4 bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <label className="text-white text-sm font-medium block text-left mb-2">
                    Verification Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className={`verification-input flex-1 bg-white/10 border text-white text-lg placeholder-gray-300 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white/15 transition ${
                        isCodeValid ? 'border-white/20' : 'border-red-500'
                      } ${isCodeVerified ? 'border-green-500' : ''}`}
                      placeholder="Enter 6-digit code"
                      value={userInputCode}
                      onChange={(e) => {
                        setUserInputCode(e.target.value.toUpperCase());
                        if (!isCodeValid) setIsCodeValid(true);
                        if (isCodeVerified) setIsCodeVerified(false);
                      }}
                      disabled={isCodeVerified}
                      maxLength={6}
                    />
                    {isCodeVerified ? (
                      <button
                        type="button"
                        className="px-6 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors whitespace-nowrap"
                        disabled
                      >
                        ✓ Verified
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        className="px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors whitespace-nowrap"
                        disabled={userInputCode.length !== 6}
                      >
                        Verify
                      </button>
                    )}
                  </div>
                  {!isCodeValid && (
                    <p className="text-red-400 text-sm mt-1 text-left">Invalid verification code. Please try again.</p>
                  )}
                  {isCodeVerified && (
                    <p className="text-green-400 text-sm mt-1 text-left">✓ Code verified successfully!</p>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <span className="text-white text-lg font-mono tracking-wider">
                      {verificationCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRegenerateCode}
                    className="text-blue-300 hover:text-blue-200 text-sm underline transition-colors"
                    disabled={isSubmitting}
                  >
                    Regenerate Code
                  </button>
                </div>
              </div>
            </div>

            {/* ─── Submit Button ────────────────────────────────────── */}
            <button 
              ref={buttonRef}
              type="submit"
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
              disabled={isSubmitting || !isCodeVerified}
              className={`w-full text-white text-lg font-medium py-4 rounded-full transition-colors duration-200 ${
                isSubmitting || !isCodeVerified
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {/* ─── Status Messages ──────────────────────────────────── */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-green-400">✓ Form submitted successfully! We'll get back to you soon.</p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400">{typeof submitStatus === 'string' ? submitStatus : 'Error submitting form. Please try again.'}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  // JSON-LD Schema Markup for Contact Page
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us - P Sandeep CA",
    "description": "Get in touch with P Sandeep CA for expert accounting, tax consulting, and financial advisory services. Contact us for a consultation.",
    "url": "https://psandeepca.com/contact",
    "isPartOf": {
      "@type": "WebSite",
      "name": "P Sandeep CA",
      "url": "https://psandeepca.com/"
    },
    "about": {
      "@type": "Organization",
      "name": "P Sandeep CA",
      "description": "Professional Chartered Accountancy firm providing comprehensive financial services."
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://psandeepca.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": "https://psandeepca.com/contact"
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "P Sandeep CA",
    "description": "Leading CA firm providing accounting, tax consulting, financial advisory, and audit services.",
    "url": "https://psandeepca.com/",
    "telephone": "+977-61-450488",
    "email": "info@psandeepca.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pokhara-7, Masbar",
      "addressLocality": "Pokhara",
      "addressRegion": "Gandaki",
      "addressCountry": "Nepal"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.2096",
      "longitude": "83.9856"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/psandeepca",
      "https://www.linkedin.com/company/psandeepca",
      "https://twitter.com/psandeepca",
      "https://www.instagram.com/psandeepca/"
    ]
  };

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Contact Us | P Sandeep CA - Accounting, Tax & Financial Advisory</title>
        <meta name="title" content="Contact Us | P Sandeep CA - Accounting, Tax & Financial Advisory" />
        <meta name="description" content="Contact P Sandeep CA for expert accounting, tax consulting, financial advisory, and audit services. Get in touch with our team for professional financial solutions." />
        <meta name="keywords" content="Contact P Sandeep CA, Accounting Services, Tax Consultant, Financial Advisory, CA Firm Nepal, Pokhara CA, Professional Accounting Services" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="P Sandeep CA" />
        <meta name="copyright" content="P Sandeep CA" />
        
        {/* Canonical Tag */}
        <link rel="canonical" href="https://psandeepca.com/contact" />

        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://psandeepca.com/contact" />
        <meta property="og:title" content="Contact Us | P Sandeep CA - Accounting, Tax & Financial Advisory" />
        <meta property="og:description" content="Contact P Sandeep CA for expert accounting, tax consulting, financial advisory, and audit services. Get in touch with our team for professional financial solutions." />
        <meta property="og:image" content="https://psandeepca.com/og-image-contact.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://psandeepca.com/contact" />
        <meta name="twitter:title" content="Contact Us | P Sandeep CA - Accounting, Tax & Financial Advisory" />
        <meta name="twitter:description" content="Contact P Sandeep CA for expert accounting, tax consulting, financial advisory, and audit services." />
        <meta name="twitter:image" content="https://psandeepca.com/twitter-image-contact.jpg" />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Pokhara" />
        <meta name="geo.position" content="28.2096;83.9856" />
        <meta name="ICBM" content="28.2096, 83.9856" />

        {/* Schema Markup - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      {/* YOUR EXISTING UI - UNCHANGED */}
      <div className="min-h-screen bg-white overflow-hidden">
        <Hero />
        <InfoCards />
        <ContactForm />
      </div>
    </>
  );
}