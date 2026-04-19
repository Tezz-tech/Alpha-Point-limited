import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, User } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import { portfolioProjects, portfolioCategories } from '../data/portfolio'

function PortfolioModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'var(--color-navy-mid)',
          border: '1px solid rgba(200,75,17,0.2)',
          borderRadius: '12px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: '1rem',
            left: '100%',
            float: 'right',
            marginRight: '1rem',
            background: 'var(--color-primary)',
            border: 'none',
            color: 'var(--color-white)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-dark)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div style={{ aspectRatio: '16/8', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
          <img
            src={project.image.replace('w=900', 'w=1200')}
            alt={project.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '2.5rem' }}>
          {/* Category badge */}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'rgba(200,75,17,0.15)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(200,75,17,0.3)',
              padding: '4px 12px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            {project.category}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: 'var(--color-white)',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--color-text-light)',
              lineHeight: 1.85,
              marginBottom: '2rem',
            }}
          >
            {project.description}
          </p>

          {/* Meta info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              borderTop: '1px solid rgba(200,75,17,0.15)',
              paddingTop: '1.5rem',
            }}
          >
            {[
              { icon: MapPin, label: 'Location', value: project.location },
              { icon: Calendar, label: 'Year', value: project.year },
              { icon: User, label: 'Client Type', value: project.client },
            ].map((meta) => {
              const Icon = meta.icon
              return (
                <div key={meta.label}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '0.3rem',
                    }}
                  >
                    <Icon size={14} color="var(--color-primary)" />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      color: 'var(--color-text-light)',
                      fontWeight: 500,
                    }}
                  >
                    {meta.value}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered =
    activeFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeFilter)

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
            Our Work
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
            PORTFOLIO
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
            }}
          >
            {portfolioProjects.length} landmark projects delivered across Nigeria
          </p>
        </div>
      </section>

      {/* FILTER TABS + GRID */}
      <section style={{ background: 'var(--color-navy-mid)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Filter tabs */}
          <ScrollReveal>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '3.5rem',
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(200,75,17,0.1)',
                borderRadius: '40px',
                width: 'fit-content',
                margin: '0 auto 3.5rem',
              }}
            >
              {portfolioCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '9px 22px',
                    borderRadius: '30px',
                    border: 'none',
                    background:
                      activeFilter === cat ? 'var(--color-primary)' : 'transparent',
                    color:
                      activeFilter === cat
                        ? 'var(--color-white)'
                        : 'var(--color-text-muted)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeFilter !== cat) {
                      e.currentTarget.style.color = 'var(--color-primary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== cat) {
                      e.currentTarget.style.color = 'var(--color-text-muted)'
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="portfolio-card"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    aspectRatio: '4/3',
                    willChange: 'transform',
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
                  />
                  <div className="portfolio-card-overlay" />

                  {/* Always visible bottom info */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '1.5rem',
                      background:
                        'linear-gradient(to top, rgba(13,27,42,0.9) 0%, transparent 100%)',
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginBottom: '0.3rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: 'var(--color-primary)',
                        }}
                      >
                        {project.category}
                      </span>
                      <span style={{ color: 'rgba(200,75,17,0.4)' }}>•</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.65rem',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        color: 'var(--color-white)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {project.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '0.3rem',
                      }}
                    >
                      <MapPin size={11} color="rgba(255,255,255,0.5)" />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* Hover "View" indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none',
                    }}
                    className="portfolio-view-hint"
                  >
                    <div
                      style={{
                        background: 'var(--color-white)',
                        color: 'var(--color-primary)',
                        padding: '10px 22px',
                        borderRadius: '20px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      View Project
                    </div>
                  </div>

                  {/* CSS for hover */}
                  <style>{`
                    .portfolio-card:hover .portfolio-view-hint { opacity: 1 !important; }
                    .portfolio-card:hover img { transform: scale(1.06); }
                  `}</style>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
              <p style={{ fontFamily: 'var(--font-body)' }}>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <PortfolioModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
