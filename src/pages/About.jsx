import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Award, Lightbulb, Users } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

const timeline = [
  {
    year: '2009',
    title: 'Founded in Abuja',
    desc: 'Alpha Point Limited was established by a team of civil engineers with a mission to deliver premium construction services across the FCT.',
  },
  {
    year: '2012',
    title: 'First Government Contract',
    desc: 'Secured a landmark contract with the FCT Administration for infrastructure development — establishing our reputation for public sector delivery.',
  },
  {
    year: '2015',
    title: 'Expanded to 4 States',
    desc: 'Opened project offices in Kogi, Nasarawa, Niger, and Enugu — growing our footprint beyond the FCT.',
  },
  {
    year: '2018',
    title: 'Facilities Management Division Launched',
    desc: 'Responded to client demand by establishing a dedicated FM division, now managing over 60 commercial properties.',
  },
  {
    year: '2021',
    title: '400+ Projects Milestone',
    desc: 'Crossed the 400-project mark — from affordable housing estates to landmark commercial towers — cementing our place among Nigeria\'s top builders.',
  },
  {
    year: '2024',
    title: 'Building Beyond Boundaries',
    desc: 'Today, Alpha Point leads with innovation, sustainability-conscious construction practices, and an unwavering commitment to Nigerian excellence.',
  },
]

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'We operate with complete transparency. Every contract, timeline, and cost is communicated clearly — no surprises.',
  },
  {
    icon: Award,
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards of craftsmanship, from site safety to finish quality.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We embrace modern construction technology and sustainable practices to deliver smarter, better buildings.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'We invest in local labour, source from Nigerian suppliers, and give back to the communities we build in.',
  },
]

const team = [
  {
    name: 'Engr. Chukwuemeka Obi',
    title: 'Managing Director & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    desc: 'Over 20 years in civil and structural engineering. Led projects valued at over ₦8B across Nigeria.',
  },
  {
    name: 'Arch. Fatima Bello',
    title: 'Director of Design & Development',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    desc: 'Registered architect specialising in commercial and mixed-use developments. Alumna of ABU Zaria.',
  },
  {
    name: 'Mr. Kingsley Nwosu',
    title: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    desc: 'Project management professional with PMP certification. Oversees all site operations and contractor relations.',
  },
]

export default function About() {
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
          paddingTop: '72px',
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
            Who We Are
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              color: 'var(--color-white)',
              lineHeight: 1,
            }}
          >
            ABOUT ALPHA POINT
          </h1>
          <div
            style={{
              width: '60px',
              height: '3px',
              background: 'var(--color-primary)',
              margin: '1.5rem auto 0',
              borderRadius: '2px',
            }}
          />
        </div>
      </section>

      {/* MISSION SECTION */}
      <section style={{ background: 'var(--color-navy-mid)', padding: '6rem 1.5rem' }}>
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
          <ScrollReveal x={-50} y={0}>
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '4/3',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Alpha Point construction team at work on site"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(13,27,42,0.9), transparent)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  borderLeft: '3px solid var(--color-primary)',
                  paddingLeft: '1rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    color: 'var(--color-white)',
                  }}
                >
                  15+ Years of Excellence
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Building Nigeria's Future
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal x={50} y={0} delay={0.15}>
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
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--color-white)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.1,
                }}
              >
                OUR MISSION
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-light)',
                  lineHeight: 1.9,
                  marginBottom: '1.5rem',
                  fontSize: '1.05rem',
                }}
              >
                To deliver world-class construction and project development solutions that exceed client expectations — on time, within budget, and to the highest standards of quality and safety.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.8,
                  fontSize: '0.95rem',
                }}
              >
                We believe Nigeria deserves buildings that last generations. Every project we undertake is a statement of pride — in our work, our people, and our country.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* OUR STORY TIMELINE */}
      <section style={{ background: 'var(--color-navy)', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
                OUR STORY
              </h2>
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  background: 'var(--color-primary)',
                  margin: '0 auto',
                  borderRadius: '2px',
                }}
              />
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'rgba(200,75,17,0.2)',
                transform: 'translateX(-50%)',
              }}
              className="hidden md:block"
            />

            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} x={i % 2 === 0 ? -40 : 40} y={0}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '2rem',
                    marginBottom: '3rem',
                    alignItems: 'center',
                  }}
                >
                  {/* Left content (even) or spacer (odd) */}
                  <div style={{ textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                    {i % 2 === 0 && (
                      <GlassCard hover={false} style={{ padding: '1.5rem', display: 'inline-block', textAlign: 'right', maxWidth: '320px' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.3rem',
                            color: 'var(--color-white)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.7,
                          }}
                        >
                          {item.desc}
                        </p>
                      </GlassCard>
                    )}
                  </div>

                  {/* Center dot + year */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        border: '3px solid var(--color-navy)',
                        boxShadow: '0 0 0 2px var(--color-primary)',
                        zIndex: 1,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        color: 'var(--color-primary)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Right content (odd) or spacer (even) */}
                  <div>
                    {i % 2 !== 0 && (
                      <GlassCard hover={false} style={{ padding: '1.5rem', maxWidth: '320px' }}>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.3rem',
                            color: 'var(--color-white)',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.875rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.7,
                          }}
                        >
                          {item.desc}
                        </p>
                      </GlassCard>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section style={{ background: 'var(--color-navy-mid)', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
                OUR VALUES
              </h2>
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  background: 'var(--color-primary)',
                  margin: '0 auto',
                  borderRadius: '2px',
                }}
              />
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <ScrollReveal key={value.title} delay={i * 0.1}>
                  <GlassCard style={{ padding: '2rem' }}>
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        background: 'rgba(200,75,17,0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(200,75,17,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.2rem',
                      }}
                    >
                      <Icon size={26} color="var(--color-primary)" />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.6rem',
                        color: 'var(--color-white)',
                        marginBottom: '0.8rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {value.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.75,
                      }}
                    >
                      {value.desc}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section style={{ background: 'var(--color-navy)', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
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
                LEADERSHIP TEAM
              </h2>
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  background: 'var(--color-primary)',
                  margin: '0 auto',
                  borderRadius: '2px',
                }}
              />
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.12}>
                <GlassCard style={{ overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        filter: 'grayscale(20%)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div
                      style={{
                        width: '30px',
                        height: '2px',
                        background: 'var(--color-primary)',
                        marginBottom: '0.8rem',
                        borderRadius: '1px',
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.3rem',
                        color: 'var(--color-white)',
                        letterSpacing: '0.03em',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--color-primary)',
                        marginBottom: '0.8rem',
                      }}
                    >
                      {member.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                      }}
                    >
                      {member.desc}
                    </p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section
        style={{
          background: 'var(--color-navy-light)',
          borderTop: '1px solid rgba(200,75,17,0.15)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: 'var(--color-white)',
              marginBottom: '1rem',
            }}
          >
            LET'S BUILD SOMETHING GREAT TOGETHER
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-muted)',
              marginBottom: '2rem',
            }}
          >
            Reach out today for a no-obligation consultation with our team.
          </p>
          <Link
            to="/contact"
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
            Contact Us <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </section>
    </div>
  )
}
