import { useState } from 'react'
import './App.css'
// ✅ FIX: Import BrowserRouter instead of Router
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BacktoTop'
import AboutPage from './Pages/AboutPage'
import OurTeam from './Pages/OurTeam'



function App() {
  const [count, setCount] = useState(0) // You can remove this if you aren't using it

  return (
    <>
      {/* ✅ FIX: Use BrowserRouter here */}
      <BrowserRouter>
        <Navbar />
        <BackToTop />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/team" element={<OurTeam />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App