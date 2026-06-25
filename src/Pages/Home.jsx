import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import AdvantagesSection from '../components/Advantagessection'
import SupportServices from '../components/Supportservices'
// import Testimonials from '../components/Testimonials'
import Process from '../components/Process'
import FuelingGrowth from '../components/Fuelinggrowth'

const Home = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // JSON-LD Schema Markup
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "P Sandeep CA",
    "description": "Leading CA firm offering accounting, tax consulting, financial advisory, and audit services.",
    "url": "https://psandeepca.com/",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@psandeepca.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "City Name",
      "addressRegion": "State",
      "addressCountry": "India",
      "postalCode": "XXXXXX"
    },
    "openingHours": "Mon-Fri 09:00-18:00",
    "priceRange": "₹₹",
    "image": "https://psandeepca.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/psandeepca",
      "https://www.linkedin.com/company/psandeepca",
      "https://twitter.com/psandeepca",
      "https://www.instagram.com/psandeepca/"
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "offerCount": "8",
      "availability": "https://schema.org/InStock",
      "itemOffered": [
        {
          "@type": "Service",
          "name": "Accounting Services",
          "description": "Professional accounting services for businesses and individuals."
        },
        {
          "@type": "Service",
          "name": "Tax Consulting",
          "description": "Expert tax planning and consulting services."
        },
        {
          "@type": "Service",
          "name": "Financial Advisory",
          "description": "Strategic financial advisory for business growth."
        },
        {
          "@type": "Service",
          "name": "Business Valuation",
          "description": "Professional business valuation services."
        },
        {
          "@type": "Service",
          "name": "Audit & Assurance",
          "description": "Comprehensive audit and assurance services."
        }
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  }

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
      }
    ]
  }

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "P Sandeep CA",
    "description": "Professional Chartered Accountancy firm providing accounting, tax, and financial advisory services.",
    "url": "https://psandeepca.com/",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@psandeepca.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Office Address",
      "addressLocality": "City Name",
      "addressRegion": "State",
      "postalCode": "XXXXXX",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "XX.XXXXXX",
      "longitude": "XX.XXXXXX"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "UPI"],
    "currenciesAccepted": "INR"
  }

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>P Sandeep CA | Chartered Accountants & Tax Experts</title>
        <meta name="title" content="P Sandeep CA | Chartered Accountants & Tax Experts" />
<meta name="description" content="Professional chartered accountants offering tax planning, auditing, accounting and financial advisory services for businesses and individuals."/>  
      <meta name="keywords" content="Chartered Accountant, CA Firm, Accounting Services, Tax Consulting, Financial Advisory, Business Valuation, Audit Services, GST Compliance, Corporate Finance, P Sandeep CA" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="P Sandeep CA" />
        <meta name="copyright" content="P Sandeep CA" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Canonical Tag */}
        <link rel="canonical" href="https://psandeepca.com/" />

        {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://psandeepca.com/" />
        <meta property="og:title" content="P Sandeep CA | Professional Accounting, Tax & Financial Advisory Services" />
        <meta property="og:description" content="Expert accounting, tax consulting, and financial advisory services from P Sandeep CA. Trusted CA firm serving businesses across India." />
        <meta property="og:image" content="https://psandeepca.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="P Sandeep CA" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://psandeepca.com/" />
        <meta name="twitter:title" content="P Sandeep CA | Professional Accounting, Tax & Financial Advisory Services" />
        <meta name="twitter:description" content="Expert accounting, tax consulting, and financial advisory services from P Sandeep CA." />
        <meta name="twitter:image" content="https://psandeepca.com/twitter-image.jpg" />
        <meta name="twitter:site" content="@psandeepca" />
        <meta name="twitter:creator" content="@psandeepca" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="IN-XX" />
        <meta name="geo.placename" content="City Name" />
        <meta name="geo.position" content="XX.XXXXXX;XX.XXXXXX" />
        <meta name="ICBM" content="XX.XXXXXX, XX.XXXXXX" />

        {/* Favicon Links */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        {/* Schema Markup - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      {/* Page Content */}
      <Hero />
      <Services />
      <About />
      <AdvantagesSection />
      <SupportServices />
      {/* <Testimonials /> */}
      <Process />
      <FuelingGrowth />
    </>
  )
}

export default Home