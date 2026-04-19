import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { path: '/services#construction', label: 'Construction' },
  { path: '/services#project-development', label: 'Project Development' },
  { path: '/services#supplies', label: 'Supplies' },
  { path: '/services#renovations', label: 'Renovations' },
  { path: '/services#facilities-management', label: 'Facilities Management' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-navy)',
        borderTop: '1px solid rgba(200,75,17,0.25)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Orange rule */}
      <div
        style={{
          height: '3px',
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light), transparent)',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 2rem 2rem',
        }}
      >
        {/* Main grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Column 1 — Brand */}
          <div>
            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                color: 'var(--color-white)',
                letterSpacing: '0.05em',
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              ALPHA POINT
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'inline-block',
                  marginLeft: '3px',
                  marginBottom: '5px',
                }}
              />
            </Link>
            <p
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}
            >
              "Building Beyond Boundaries" — delivering world-class construction, development, and facilities solutions across Nigeria.
            </p>
            {/* WhatsApp */}
            <a
              href="https://wa.me/2348160124685"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: 'var(--color-white)',
                padding: '10px 18px',
                borderRadius: '4px',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--color-white)',
                letterSpacing: '0.08em',
                marginBottom: '1.2rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid rgba(200,75,17,0.2)',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease, paddingLeft 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary)'
                      e.currentTarget.style.paddingLeft = '6px'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)'
                      e.currentTarget.style.paddingLeft = '0'
                    }}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--color-white)',
                letterSpacing: '0.08em',
                marginBottom: '1.2rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid rgba(200,75,17,0.2)',
              }}
            >
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: '0.875rem',
                      transition: 'color 0.2s ease, paddingLeft 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-primary)'
                      e.currentTarget.style.paddingLeft = '6px'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-muted)'
                      e.currentTarget.style.paddingLeft = '0'
                    }}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--color-white)',
                letterSpacing: '0.08em',
                marginBottom: '1.2rem',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid rgba(200,75,17,0.2)',
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="tel:08160124685"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <Phone size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                08160124685
              </a>
              <a
                href="mailto:alphapointnig@yahoo.com"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s ease',
                  wordBreak: 'break-word',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <Mail size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                alphapointnig@yahoo.com
              </a>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.875rem',
                }}
              >
                <MapPin size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                Abuja, Federal Capital Territory, Nigeria
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(200,75,17,0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
            }}
          >
            © 2024 Alpha Point Limited. All Rights Reserved. | Abuja, Nigeria
          </p>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.8rem',
            }}
          >
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Building Beyond Boundaries
            </span>{' '}
            — Construction · Development · Supplies · Renovations · Facilities
          </p>
        </div>
      </div>
    </footer>
  )
}
