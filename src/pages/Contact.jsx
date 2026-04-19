import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Send,
} from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import { sendEmail } from '../utils/emailjs'

const schema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your full name')
    .max(80, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  service: z
    .string()
    .min(1, 'Please select a service'),
  message: z
    .string()
    .min(20, 'Please write at least 20 characters')
    .max(2000, 'Message is too long'),
})

function Toast({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`toast toast-${type}`}
      style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
    >
      {type === 'success' ? (
        <CheckCircle size={20} style={{ flexShrink: 0 }} />
      ) : (
        <AlertCircle size={20} style={{ flexShrink: 0 }} />
      )}
      {message}
    </motion.div>
  )
}

function InputField({ label, name, register, error, type = 'text', placeholder, required }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#555',
          marginBottom: '0.5rem',
        }}
      >
        {label} {required && <span style={{ color: 'var(--color-primary)' }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`input-field ${error ? 'error' : ''}`}
      />
      {error && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: '#e53e3e',
            marginTop: '0.4rem',
          }}
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [toast, setToast] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchParams] = useSearchParams()
  const prefilledService = searchParams.get('service') || ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      service: prefilledService,
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await sendEmail(data)
      setToast({
        type: 'success',
        message: "Message sent! We'll be in touch shortly.",
      })
      reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setToast({
        type: 'error',
        message: 'Something went wrong. Please call us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* HERO */}
      <section
        className="noise-overlay blueprint-bg"
        style={{
          background: 'var(--color-navy)',
          minHeight: '40vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 1.5rem 70px',
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
            Let's Talk
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: 'var(--color-white)',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            CONTACT US
          </h1>
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
      </section>

      {/* MAIN CONTACT SECTION */}
      <section style={{ background: 'var(--color-off-white)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 420px) 1fr',
            minHeight: '70vh',
          }}
          className="md:grid"
        >
          {/* LEFT — Navy info panel */}
          <div
            className="noise-overlay"
            style={{
              background: 'var(--color-navy)',
              padding: '4rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <ScrollReveal x={-40} y={0}>
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
                    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                    color: 'var(--color-white)',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem',
                  }}
                >
                  ALPHA POINT
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: 'var(--color-primary)',
                    letterSpacing: '0.08em',
                    marginBottom: '2.5rem',
                  }}
                >
                  LIMITED
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <a
                    href="tel:08160124685"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(200,75,17,0.15)',
                        border: '1px solid rgba(200,75,17,0.25)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Phone size={17} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.7rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-muted)',
                          marginBottom: '0.2rem',
                        }}
                      >
                        Phone
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--color-text-light)',
                          fontWeight: 500,
                        }}
                      >
                        08160124685
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:alphapointnig@yahoo.com"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(200,75,17,0.15)',
                        border: '1px solid rgba(200,75,17,0.25)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Mail size={17} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.7rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-muted)',
                          marginBottom: '0.2rem',
                        }}
                      >
                        Email
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--color-text-light)',
                          fontWeight: 500,
                          wordBreak: 'break-all',
                          fontSize: '0.9rem',
                        }}
                      >
                        alphapointnig@yahoo.com
                      </p>
                    </div>
                  </a>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(200,75,17,0.15)',
                        border: '1px solid rgba(200,75,17,0.25)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={17} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.7rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-text-muted)',
                          marginBottom: '0.2rem',
                        }}
                      >
                        Location
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--color-text-light)',
                          fontWeight: 500,
                          lineHeight: 1.5,
                        }}
                      >
                        Abuja,<br />Federal Capital Territory,<br />Nigeria
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/2348160124685"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#25D366',
                    color: 'var(--color-white)',
                    padding: '14px 24px',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                    marginBottom: '2.5rem',
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
                  <MessageCircle size={18} />
                  Message on WhatsApp
                </a>

                {/* Abstract Abuja map SVG */}
                <div
                  style={{
                    border: '1px solid rgba(200,75,17,0.2)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.5rem',
                  }}
                >
                  <svg
                    viewBox="0 0 240 160"
                    style={{ width: '100%', height: 'auto' }}
                  >
                    {/* Grid lines */}
                    <line x1="0" y1="40" x2="240" y2="40" stroke="rgba(200,75,17,0.1)" strokeWidth="1" />
                    <line x1="0" y1="80" x2="240" y2="80" stroke="rgba(200,75,17,0.1)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="240" y2="120" stroke="rgba(200,75,17,0.1)" strokeWidth="1" />
                    <line x1="60" y1="0" x2="60" y2="160" stroke="rgba(200,75,17,0.1)" strokeWidth="1" />
                    <line x1="120" y1="0" x2="120" y2="160" stroke="rgba(200,75,17,0.1)" strokeWidth="1" />
                    <line x1="180" y1="0" x2="180" y2="160" stroke="rgba(200,75,17,0.1)" strokeWidth="1" />
                    {/* Roads */}
                    <path d="M40 80 L200 80" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                    <path d="M120 20 L120 140" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                    <path d="M30 40 L180 130" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                    <path d="M60 20 L200 110" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    {/* Location pin */}
                    <circle cx="120" cy="80" r="8" fill="var(--color-primary)" opacity="0.9" />
                    <circle cx="120" cy="80" r="14" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" opacity="0.4" />
                    <circle cx="120" cy="80" r="20" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.2" />
                    {/* Label */}
                    <text x="130" y="75" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Abuja, FCT</text>
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT — Form panel */}
          <div style={{ padding: '4rem 3rem', background: 'var(--color-off-white)' }}>
            <ScrollReveal x={40} y={0}>
              <div style={{ maxWidth: '560px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    color: 'var(--color-navy)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.1,
                  }}
                >
                  SEND US A MESSAGE
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#777',
                    marginBottom: '2.5rem',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                  }}
                >
                  Fill in the form below and a member of our team will respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '0 1.2rem',
                    }}
                  >
                    <InputField
                      label="Full Name"
                      name="fullName"
                      register={register}
                      error={errors.fullName}
                      placeholder="e.g. Adaeze Okafor"
                      required
                    />
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      register={register}
                      error={errors.email}
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '0 1.2rem',
                    }}
                  >
                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      register={register}
                      error={errors.phone}
                      placeholder="+234 800 000 0000"
                      required
                    />

                    {/* Service dropdown */}
                    <div style={{ marginBottom: '1.2rem' }}>
                      <label
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: '#555',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Service Interested In <span style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <select
                        {...register('service')}
                        className={`input-field ${errors.service ? 'error' : ''}`}
                        style={{
                          background: 'transparent',
                          color: 'var(--color-navy)',
                          width: '100%',
                        }}
                        defaultValue={prefilledService}
                      >
                        <option value="">Select a service...</option>
                        <option value="Construction">Construction</option>
                        <option value="Project Development">Project Development</option>
                        <option value="Supplies">Supplies</option>
                        <option value="Renovations">Renovations</option>
                        <option value="Facilities Management">Facilities Management</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.service && (
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#e53e3e', marginTop: '0.4rem' }}>
                          {errors.service.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message textarea */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#555',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Your Message <span style={{ color: 'var(--color-primary)' }}>*</span>
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tell us about your project, timeline, or any specific requirements..."
                      className={`input-field ${errors.message ? 'error' : ''}`}
                      style={{ resize: 'vertical', minHeight: '130px' }}
                    />
                    {errors.message && (
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#e53e3e', marginTop: '0.4rem' }}>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-shimmer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: isSubmitting ? 'var(--color-primary-dark)' : 'var(--color-primary)',
                      color: 'var(--color-white)',
                      padding: '16px 40px',
                      borderRadius: '3px',
                      border: 'none',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      overflow: 'hidden',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                      opacity: isSubmitting ? 0.75 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.background = 'var(--color-primary-light)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isSubmitting ? 'var(--color-primary-dark)' : 'var(--color-primary)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>

                  <style>{`
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                  `}</style>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Toast notifications */}
      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
