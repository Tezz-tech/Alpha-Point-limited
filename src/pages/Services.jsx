import { Link } from 'react-router-dom'
import { HardHat, Building2, Package, Wrench, Settings, CheckCircle, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import { services } from '../data/services'

const iconMap = {
  HardHat,
  Building2,
  Package,
  Wrench,
  Settings,
}

function ServiceSection({ service, index }) {
  const isEven = index % 2 === 0
  const Icon = iconMap[service.icon]

  return (
    <section
      id={service.id}
      style={{
        background: isEven ? 'var(--color-navy)' : 'var(--color-navy-mid)',
        padding: '7rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        clipPath: index < services.length - 1
          ? 'polygon(0 0, 100% 0, 100% 94%, 0 100%)'
          : 'none',
        paddingBottom: index < services.length - 1 ? '9rem' : '7rem',
      }}
    >
      {/* Background accent circle */}
      <div
        style={{
          position: 'absolute',
          [isEven ? 'right' : 'left']: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'var(--color-primary)',
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          direction: isEven ? 'ltr' : 'rtl',
        }}
      >
        {/* Image */}
        <ScrollReveal x={isEven ? -50 : 50} y={0}>
          <div
            style={{
              direction: 'ltr',
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src={service.image}
              alt={service.alt}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Stat overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                background: 'var(--color-primary)',
                padding: '1rem 1.5rem',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: 'var(--color-white)',
                  lineHeight: 1,
                }}
              >
                {service.stat}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.8)',
                  marginTop: '0.2rem',
                }}
              >
                {service.statLabel}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Text content */}
        <ScrollReveal x={isEven ? 50 : -50} y={0} delay={0.15}>
          <div style={{ direction: 'ltr' }}>
            {/* Icon */}
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'rgba(200,75,17,0.12)',
                border: '1px solid rgba(200,75,17,0.25)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <Icon size={28} color="var(--color-primary)" />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                color: 'var(--color-white)',
                lineHeight: 1,
                marginBottom: '0.5rem',
                letterSpacing: '0.02em',
              }}
            >
              {service.title.toUpperCase()}
            </h2>

            <div
              style={{
                width: '40px',
                height: '3px',
                background: 'var(--color-primary)',
                borderRadius: '2px',
                marginBottom: '1.5rem',
              }}
            />

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-text-light)',
                lineHeight: 1.85,
                marginBottom: '2rem',
              }}
            >
              {service.description}
            </p>

            {/* Feature list */}
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
                marginBottom: '2.5rem',
              }}
            >
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  <CheckCircle
                    size={16}
                    style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              className="btn-shimmer"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'var(--color-primary)',
                color: 'var(--color-white)',
                padding: '14px 32px',
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
              Get a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <div>
      {/* HERO */}
      <section
        className="noise-overlay blueprint-bg"
        style={{
          background: 'var(--color-navy)',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 1.5rem 80px',
        }}
      >
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '1rem',
            }}
          >
            What We Offer
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: 'var(--color-white)',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            OUR SERVICES
          </h1>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'var(--color-primary)',
              margin: '0 auto 1.5rem',
              borderRadius: '2px',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Five specialised disciplines. One trusted partner. From groundbreaking to ongoing maintenance — Alpha Point does it all.
          </p>
        </div>
      </section>

      {/* SERVICE NAV */}
      <nav
        style={{
          background: 'var(--color-navy-mid)',
          borderBottom: '1px solid rgba(200,75,17,0.15)',
          padding: '0 1.5rem',
          overflowX: 'auto',
          position: 'sticky',
          top: '72px',
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            gap: 0,
          }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <a
                key={service.id}
                href={`#${service.id}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  padding: '1.1rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  borderBottom: '2px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-primary)'
                  e.currentTarget.style.borderBottomColor = 'var(--color-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-muted)'
                  e.currentTarget.style.borderBottomColor = 'transparent'
                }}
              >
                <Icon size={14} />
                {service.title}
              </a>
            )
          })}
        </div>
      </nav>

      {/* SERVICE SECTIONS */}
      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* CTA Banner */}
      <section
        style={{
          background: 'var(--color-primary)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: 'var(--color-white)',
              marginBottom: '1rem',
            }}
          >
            NOT SURE WHICH SERVICE YOU NEED?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '2.5rem',
              fontSize: '1.05rem',
            }}
          >
            Tell us about your project and we'll guide you to the right solution.
          </p>
          <Link
            to="/contact"
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
              gap: '8px',
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
            Talk to Our Team <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
