import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background 0.4s ease, box-shadow 0.4s ease, border-bottom 0.4s ease',
          background: scrolled
            ? 'var(--color-navy)'
            : 'transparent',
          borderBottom: scrolled
            ? '1px solid rgba(200,75,17,0.15)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0,0,0,0.3)'
            : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              letterSpacing: '0.05em',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span>ALPHA POINT</span>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--color-primary)',
                display: 'inline-block',
                marginLeft: '2px',
                marginBottom: '4px',
              }}
            />
          </Link>

          {/* Desktop Links */}
          <div
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: '2.5rem' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-underline"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive(link.path)
                    ? 'var(--color-primary)'
                    : 'var(--color-text-light)',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
              >
                {link.label}
                {isActive(link.path) && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--color-primary)',
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            ))}

            <Link
              to="/booking"
              className="btn-shimmer"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--color-primary)',
                color: 'var(--color-white)',
                padding: '10px 22px',
                borderRadius: '3px',
                transition: 'background 0.2s ease, transform 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-primary-light)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-primary)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Phone size={14} />
              Get Consultation
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-white)',
              padding: '8px',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--color-navy)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0',
            }}
          >
            {/* Orange diagonal accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '200px',
                height: '200px',
                background: 'var(--color-primary)',
                opacity: 0.05,
                borderRadius: '0 0 0 100%',
              }}
            />

            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={link.path}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                    color: isActive(link.path)
                      ? 'var(--color-primary)'
                      : 'var(--color-white)',
                    letterSpacing: '0.03em',
                    display: 'block',
                    padding: '0.3rem 0',
                    textAlign: 'center',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Contact info at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '3rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                }}
              >
                08160124685 | alphapointnig@yahoo.com
              </p>
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  background: 'var(--color-primary)',
                  margin: '0.8rem auto 0',
                  borderRadius: '1px',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
