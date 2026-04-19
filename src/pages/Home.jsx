import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  HardHat,
  Building2,
  Package,
  Wrench,
  Settings,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import GlassCard from '../components/ui/GlassCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import { useCounter } from '../hooks/useCounter'
import { testimonials } from '../data/testimonials'

// ─── Stats Item ────────────────────────────────────────────────────────────────
function StatItem({ target, suffix, label, isLast }) {
  const { count, ref } = useCounter(target)
  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        flex: 1,
        padding: '1.5rem',
        borderRight: isLast ? 'none' : '1px solid rgba(200,75,17,0.2)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          color: 'var(--color-primary)',
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginTop: '0.4rem',
        }}
      >
        {label}
      </div>
    </div>
  )
}

const serviceCards = [
  {
    icon: HardHat,
    title: 'Construction',
    desc: 'End-to-end building solutions for residential, commercial & industrial projects.',
    id: 'construction',
  },
  {
    icon: Building2,
    title: 'Project Development',
    desc: 'Full lifecycle management from feasibility studies to final delivery.',
    id: 'project-development',
  },
  {
    icon: Package,
    title: 'Supplies',
    desc: 'Premium construction materials delivered directly to your site.',
    id: 'supplies',
  },
  {
    icon: Wrench,
    title: 'Renovations',
    desc: 'Transforming spaces with precision craftsmanship and minimal disruption.',
    id: 'renovations',
  },
  {
    icon: Settings,
    title: 'Facilities Management',
    desc: 'Comprehensive operations and maintenance for commercial properties.',
    id: 'facilities-management',
  },
]

const portfolioTeaser = [
  {
    id: 1,
    title: 'Garki Commercial Plaza',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80',
  },
  {
    id: 2,
    title: 'Maitama Luxury Residence',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80',
  },
  {
    id: 3,
    title: 'Asokoro Office Renovation',
    category: 'Renovation',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80',
  },
  {
    id: 4,
    title: 'Wuse II Retail Development',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=700&q=80',
  },
  {
    id: 5,
    title: 'CBD Office Tower',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80',
  },
  {
    id: 6,
    title: 'Lugbe Warehouse Complex',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
  },
]

const whyPoints = [
  'ISO-certified quality assurance on every project',
  'On-time, on-budget delivery guaranteed',
  'Certified engineers and skilled tradespeople',
  'Nigeria-wide reach across 6 states',
]

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection() {
  const words1 = ['WE', 'BUILD']
  const words2 = ['WHAT', 'LASTS']

  const wordVariant = {
    hidden: { opacity: 0, y: 70 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  const subVariant = {
    hidden: { opacity: 0, letterSpacing: '0.3em' },
    visible: {
      opacity: 1,
      letterSpacing: '0.15em',
      transition: { delay: 0.8, duration: 1.0, ease: 'easeOut' },
    },
  }

  return (
    <section
      className="noise-overlay blueprint-bg"
      style={{
        minHeight: '100vh',
        background: 'var(--color-navy)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Abstract orange diagonal lines */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.04,
        }}
        preserveAspectRatio="none"
      >
        <line x1="0" y1="40%" x2="100%" y2="10%" stroke="#C84B11" strokeWidth="1" />
        <line x1="0" y1="60%" x2="100%" y2="90%" stroke="#C84B11" strokeWidth="1" />
        <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#C84B11" strokeWidth="0.5" />
        <line x1="0" y1="80%" x2="60%" y2="0" stroke="#C84B11" strokeWidth="0.5" />
        <rect x="5%" y="15%" width="8px" height="8px" fill="none" stroke="#C84B11" strokeWidth="1" />
        <rect x="88%" y="70%" width="8px" height="8px" fill="none" stroke="#C84B11" strokeWidth="1" />
        <circle cx="15%" cy="75%" r="40" fill="none" stroke="#C84B11" strokeWidth="0.5" />
        <circle cx="85%" cy="20%" r="60" fill="none" stroke="#C84B11" strokeWidth="0.5" />
      </svg>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '900px',
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.4em',
            overflow: 'hidden',
            marginBottom: '0.05em',
          }}
        >
          {words1.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                color: 'var(--color-white)',
                lineHeight: 0.95,
                display: 'inline-block',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Line 2 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.4em',
            overflow: 'hidden',
          }}
        >
          {words2.map((word, i) => (
            <motion.span
              key={word}
              custom={words1.length + i}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                color: i === 1 ? 'var(--color-primary)' : 'var(--color-white)',
                lineHeight: 0.95,
                display: 'inline-block',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Orange rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '3px',
            background: 'var(--color-primary)',
            margin: '1.5rem auto',
            width: '80px',
            borderRadius: '2px',
            transformOrigin: 'left',
          }}
        />

        {/* Subheading */}
        <motion.p
          variants={subVariant}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(0.7rem, 1.5vw, 0.95rem)',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            marginBottom: '3rem',
          }}
        >
          Construction • Project Development • Supplies • Renovations • Facilities Management
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/booking"
            className="btn-shimmer"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'var(--color-primary)',
              color: 'var(--color-white)',
              padding: '16px 36px',
              borderRadius: '3px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              overflow: 'hidden',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-primary-light)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-primary)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Book a Consultation <ArrowRight size={16} />
          </Link>
          <Link
            to="/portfolio"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: 'transparent',
              color: 'var(--color-white)',
              padding: '16px 36px',
              borderRadius: '3px',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)'
              e.currentTarget.style.color = 'var(--color-primary)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = 'var(--color-white)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            View Our Work
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} color="var(--color-primary)" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Testimonials Carousel ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  return (
    <section style={{ background: 'var(--color-navy-mid)', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: 'var(--color-white)',
              }}
            >
              WHAT OUR CLIENTS SAY
            </h2>
            <div className="orange-rule" style={{ margin: '1rem auto 0' }} />
          </div>
        </ScrollReveal>

        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard hover={false} style={{ padding: '3rem', textAlign: 'center' }}>
                {/* Quote mark */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '5rem',
                    color: 'var(--color-primary)',
                    lineHeight: 0.7,
                    marginBottom: '1.5rem',
                    opacity: 0.4,
                  }}
                >
                  "
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    lineHeight: 1.85,
                    color: 'var(--color-text-light)',
                    fontStyle: 'italic',
                    marginBottom: '2rem',
                  }}
                >
                  {testimonials[active].quote}
                </p>
                <div
                  style={{
                    width: '40px',
                    height: '2px',
                    background: 'var(--color-primary)',
                    margin: '0 auto 1.5rem',
                    borderRadius: '1px',
                  }}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.1rem',
                    color: 'var(--color-white)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {testimonials[active].name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    marginTop: '0.3rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {testimonials[active].title} — {testimonials[active].project}
                </p>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            <button
              onClick={prev}
              style={{
                background: 'rgba(200,75,17,0.15)',
                border: '1px solid rgba(200,75,17,0.3)',
                color: 'var(--color-primary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,75,17,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(200,75,17,0.15)')}
            >
              <ChevronLeft size={18} />
            </button>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  borderRadius: i === active ? '4px' : '50%',
                  background: i === active ? 'var(--color-primary)' : 'rgba(200,75,17,0.3)',
                  border: 'none',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
            <button
              onClick={next}
              style={{
                background: 'rgba(200,75,17,0.15)',
                border: '1px solid rgba(200,75,17,0.3)',
                color: 'var(--color-primary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(200,75,17,0.3)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(200,75,17,0.15)')}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Main Home Component ───────────────────────────────────────────────────────
export default function Home() {
  return (
    <div>
      {/* HERO */}
      <HeroSection />

      {/* STATS BAR */}
      <section
        style={{
          background: 'var(--color-navy-mid)',
          borderTop: '1px solid rgba(200,75,17,0.15)',
          borderBottom: '1px solid rgba(200,75,17,0.15)',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <StatItem target={500} suffix="+" label="Projects Completed" />
          <StatItem target={15} suffix="+" label="Years of Excellence" />
          <StatItem target={200} suffix="+" label="Satisfied Clients" />
          <StatItem target={6} suffix="" label="States Covered" isLast />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        className="diagonal-bottom"
        style={{
          background: 'var(--color-navy)',
          padding: '6rem 1.5rem 8rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  color: 'var(--color-white)',
                  marginBottom: '1rem',
                }}
              >
                WHAT WE DO
              </h2>
              <div className="orange-rule" style={{ margin: '0 auto' }} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-muted)',
                  marginTop: '1.2rem',
                  maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                From groundbreaking to final handover — Alpha Point delivers across every stage of the build.
              </p>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {serviceCards.map((service, i) => {
              const Icon = service.icon
              return (
                <ScrollReveal key={service.id} delay={i * 0.1}>
                  <GlassCard style={{ padding: '2rem' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        background: 'rgba(200,75,17,0.12)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.2rem',
                        border: '1px solid rgba(200,75,17,0.2)',
                      }}
                    >
                      <Icon size={24} color="var(--color-primary)" />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        color: 'var(--color-white)',
                        marginBottom: '0.6rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        marginBottom: '1.2rem',
                      }}
                    >
                      {service.desc}
                    </p>
                    <Link
                      to={`/services#${service.id}`}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'gap 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.gap = '8px')}
                      onMouseLeave={(e) => (e.currentTarget.style.gap = '4px')}
                    >
                      Learn More <ArrowRight size={13} />
                    </Link>
                  </GlassCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        style={{
          background: 'var(--color-off-white)',
          padding: '7rem 1.5rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left */}
          <ScrollReveal x={-50} y={0}>
            <div>
              <div
                style={{
                  width: '40px',
                  height: '3px',
                  background: 'var(--color-primary)',
                  marginBottom: '1.5rem',
                  borderRadius: '2px',
                }}
              />
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  color: 'var(--color-navy)',
                  lineHeight: 1.05,
                  marginBottom: '1.5rem',
                }}
              >
                BUILT ON TRUST.
                <br />
                <span style={{ color: 'var(--color-primary)' }}>DRIVEN BY</span>
                <br />
                EXCELLENCE.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#555',
                  lineHeight: 1.8,
                  maxWidth: '420px',
                }}
              >
                Since our founding, Alpha Point Limited has been the trusted partner of choice for individuals, corporations, and government agencies who demand nothing but the best in construction and project delivery.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link
                  to="/about"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-white)',
                    background: 'var(--color-navy)',
                    padding: '14px 28px',
                    borderRadius: '3px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-navy)')}
                >
                  Our Story <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Right */}
          <ScrollReveal x={50} y={0} delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {whyPoints.map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.2rem 1.5rem',
                    background: 'rgba(13,27,42,0.05)',
                    border: '1px solid rgba(200,75,17,0.12)',
                    borderRadius: '6px',
                  }}
                >
                  <CheckCircle
                    size={22}
                    style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-navy)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section style={{ background: 'var(--color-navy-light)', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                  color: 'var(--color-white)',
                  marginBottom: '1rem',
                }}
              >
                OUR WORK
              </h2>
              <div className="orange-rule" style={{ margin: '0 auto' }} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-muted)',
                  marginTop: '1rem',
                }}
              >
                A selection of landmark projects across Nigeria
              </p>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {portfolioTeaser.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.08}>
                <div
                  className="portfolio-card"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    aspectRatio: '4/3',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div className="portfolio-card-overlay" />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.5rem',
                      zIndex: 2,
                      transform: 'translateY(10px)',
                      transition: 'transform 0.3s ease',
                    }}
                    className="portfolio-card-info"
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {project.category}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        color: 'var(--color-white)',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              to="/portfolio"
              className="btn-shimmer"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--color-primary)',
                color: 'var(--color-white)',
                padding: '16px 40px',
                borderRadius: '3px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                overflow: 'hidden',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-primary-light)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-primary)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              See All Projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        style={{
          background: 'var(--color-primary)',
          padding: '5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: 'var(--color-white)',
                lineHeight: 1.05,
                marginBottom: '1rem',
              }}
            >
              READY TO BUILD YOUR VISION?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.85)',
                marginBottom: '2.5rem',
                fontWeight: 300,
              }}
            >
              Book a free 1-hour Google Meet — pick a time that works for you.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/booking"
                className="btn-shimmer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: 'var(--color-white)',
                  color: 'var(--color-primary)',
                  padding: '16px 40px',
                  borderRadius: '3px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Book a Consultation
              </Link>
              <a
                href="https://wa.me/2348160124685"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.9)',
                  padding: '16px 28px',
                  borderRadius: '3px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                }}
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '2rem',
                justifyContent: 'center',
                marginTop: '2rem',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="tel:08160124685"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              >
                <Phone size={16} />
                08160124685
              </a>
              <a
                href="mailto:alphapointnig@yahoo.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.9)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              >
                <Mail size={16} />
                alphapointnig@yahoo.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />
    </div>
  )
}
