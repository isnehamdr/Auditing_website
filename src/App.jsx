import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import AdvantagesSection from './components/Advantagessection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Hero/>
<Services/>
<About/>
<AdvantagesSection/>
 
    </>
  )
}

export default App
