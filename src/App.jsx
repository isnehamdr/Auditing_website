import { useState, useEffect } from 'react'
import './App.css'
// ✅ FIX: Import BrowserRouter instead of Router
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BacktoTop'
import AboutPage from './Pages/AboutPage'
import OurTeam from './Pages/OurTeam'
import ServicesPage from './Pages/ServicePage'
import ServiceDetailPage from './Pages/Servicedetailpage'
import BlogPage from './Pages/BlogPage'
import BlogDetailPage from './Pages/BlogdetailPage'
import ContactPage from './Pages/ContactPage'
import IndustryDetailPage from './Pages/IndustriesDetailPage'

// ScrollToTop component to handle scrolling on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top smoothly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <BackToTop />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service-page/:slug" element={<ServiceDetailPage />} />     
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/:slug" element={<IndustryDetailPage />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App