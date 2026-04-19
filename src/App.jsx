import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/PageLoader'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Booking from './pages/Booking'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about"    element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/portfolio"element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/contact"  element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/booking"  element={<PageTransition><Booking /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
