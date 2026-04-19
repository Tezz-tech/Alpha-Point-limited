import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Video,
  Copy,
  ArrowLeft,
  Loader,
  AlertCircle,
} from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlassCard from '../components/ui/GlassCard'

// ─── Constants ─────────────────────────────────────────────────────────────
const WAT_OFFSET_MS = 1 * 60 * 60 * 1000 // UTC+1
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// ─── Zod schema ────────────────────────────────────────────────────────────
const detailsSchema = z.object({
  name:  z.string().min(2, 'Please enter your full name').max(80),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number').max(20),
  topic: z.string().min(5, 'Please briefly describe your consultation topic').max(500),
})

// ─── Helpers ────────────────────────────────────────────────────────────────
function toWATDate(isoString) {
  return new Date(new Date(isoString).getTime() + WAT_OFFSET_MS)
}

function formatDisplayDate(dateKey) {
  // dateKey = "YYYY-MM-DD"
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatFullDateTime(isoString) {
  return new Date(isoString).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Lagos',
    timeZoneName: 'short',
  })
}

// ─── Calendar Component ────────────────────────────────────────────────────
function MonthCalendar({ availableDateKeys, selectedDate, onSelectDate }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`

  // Don't allow navigating to past months
  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth())

  return (
    <div>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          style={{
            background: canGoPrev ? 'rgba(200,75,17,0.12)' : 'rgba(255,255,255,0.03)',
            border: '1px solid ' + (canGoPrev ? 'rgba(200,75,17,0.2)' : 'rgba(255,255,255,0.06)'),
            color: canGoPrev ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)',
            width: '36px', height: '36px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          color: 'var(--color-white)',
          letterSpacing: '0.05em',
        }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>

        <button
          onClick={nextMonth}
          style={{
            background: 'rgba(200,75,17,0.12)',
            border: '1px solid rgba(200,75,17,0.2)',
            color: 'var(--color-primary)',
            width: '36px', height: '36px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,75,17,0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(200,75,17,0.12)'}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
        {DAY_NAMES.map(d => (
          <div key={d} style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            padding: '4px 0',
          }}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
          const isAvailable = availableDateKeys.has(dateKey)
          const isToday = dateKey === todayKey
          const isSelected = dateKey === selectedDate
          const isPast = dateKey < todayKey
          const isWeekend = new Date(viewYear, viewMonth, day).getDay() === 0 || new Date(viewYear, viewMonth, day).getDay() === 6

          const isDisabled = isPast || isWeekend || !isAvailable

          return (
            <button
              key={dateKey}
              onClick={() => !isDisabled && onSelectDate(dateKey)}
              disabled={isDisabled}
              style={{
                aspectRatio: '1',
                borderRadius: '8px',
                border: isToday && !isSelected ? '1px solid rgba(200,75,17,0.5)' : '1px solid transparent',
                background: isSelected
                  ? 'var(--color-primary)'
                  : isAvailable
                  ? 'rgba(200,75,17,0.1)'
                  : 'transparent',
                color: isSelected
                  ? 'var(--color-white)'
                  : isDisabled
                  ? 'rgba(255,255,255,0.15)'
                  : 'var(--color-text-light)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: isAvailable ? 600 : 400,
                transition: 'all 0.18s ease',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '2px',
              }}
              onMouseEnter={e => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.background = 'rgba(200,75,17,0.25)'
                }
              }}
              onMouseLeave={e => {
                if (!isDisabled && !isSelected) {
                  e.currentTarget.style.background = isAvailable ? 'rgba(200,75,17,0.1)' : 'transparent'
                }
              }}
            >
              {day}
              {/* Green dot indicator for available days */}
              {isAvailable && !isSelected && (
                <span style={{
                  width: '4px', height: '4px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'block',
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Unavailable/Weekend</span>
        </div>
      </div>
    </div>
  )
}

// ─── Step indicator ─────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  const steps = ['Choose Date & Time', 'Your Details', 'Confirmed']
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '3rem' }}>
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isActive = stepNum === current
        const isDone = stepNum < current
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: isDone ? 'var(--color-primary)' : isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                border: '2px solid ' + (isActive || isDone ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}>
                {isDone
                  ? <CheckCircle size={16} color="white" />
                  : <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: isActive ? 'white' : 'rgba(255,255,255,0.3)' }}>{stepNum}</span>
                }
              </div>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                color: isActive ? 'var(--color-primary)' : isDone ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.2)',
                whiteSpace: 'nowrap',
              }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: '60px', height: '2px', margin: '0 0.5rem',
                background: isDone ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                marginBottom: '20px',
                transition: 'background 0.3s ease',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main Booking Component ─────────────────────────────────────────────────
export default function Booking() {
  const [step, setStep] = useState(1)
  const [slots, setSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [slotsError, setSlotsError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState(null)
  const [confirmedEvent, setConfirmedEvent] = useState(null)
  const [copied, setCopied] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(detailsSchema),
  })

  // Safe JSON parser — handles HTML error pages from dev server gracefully
  async function safeJson(res) {
    const text = await res.text()
    try {
      return JSON.parse(text)
    } catch {
      // API route not available (e.g. running npm run dev instead of vercel dev)
      if (!res.ok && (text.startsWith('<') || text.startsWith('Cannot'))) {
        throw new Error(
          'API routes are not available. Run "vercel dev" instead of "npm run dev", ' +
          'or deploy to Vercel to test the booking system.'
        )
      }
      throw new Error(`Unexpected response from server (status ${res.status})`)
    }
  }

  // Fetch availability on mount
  useEffect(() => {
    async function fetchSlots() {
      setLoadingSlots(true)
      setSlotsError(null)
      try {
        const res = await fetch('/api/availability?days=21')
        const data = await safeJson(res)
        if (!res.ok) throw new Error(data.error || 'Failed to load availability')
        setSlots(data.slots || [])
      } catch (err) {
        setSlotsError(err.message)
      } finally {
        setLoadingSlots(false)
      }
    }
    fetchSlots()
  }, [])

  // Build set of dates that have available slots
  const availableDateKeys = new Set(slots.map(s => s.dateKey))

  // Get slots for selected date
  const slotsForDate = selectedDate
    ? slots.filter(s => s.dateKey === selectedDate)
    : []

  const handleDateSelect = useCallback((dateKey) => {
    setSelectedDate(dateKey)
    setSelectedSlot(null)
  }, [])

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
  }

  const handleProceedToDetails = () => {
    if (!selectedSlot) return
    setStep(2)
    setBookingError(null)
  }

  const onSubmitDetails = async (formData) => {
    if (!selectedSlot) return
    setIsBooking(true)
    setBookingError(null)

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: selectedSlot.start,
          end:   selectedSlot.end,
          name:  formData.name,
          email: formData.email,
          phone: formData.phone,
          topic: formData.topic,
        }),
      })

      const data = await safeJson(res)

      if (!res.ok) {
        throw new Error(data.error || 'Booking failed. Please try again.')
      }

      setConfirmedEvent(data.event)
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setBookingError(err.message)
    } finally {
      setIsBooking(false)
    }
  }

  const copyMeetLink = () => {
    if (confirmedEvent?.meetLink) {
      navigator.clipboard.writeText(confirmedEvent.meetLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(200,75,17,0.25)',
    color: 'var(--color-text-light)',
    padding: '13px 16px',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    width: '100%',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem',
  }

  const errorStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    color: '#fc8181',
    marginTop: '0.35rem',
  }

  return (
    <div>
      {/* HERO */}
      <section
        className="noise-overlay blueprint-bg"
        style={{
          background: 'var(--color-navy)',
          minHeight: '42vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 1.5rem 80px',
        }}
      >
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.8rem',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--color-primary)', marginBottom: '1rem',
          }}>
            Free · 1 Hour · Google Meet
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            color: 'var(--color-white)', lineHeight: 1, marginBottom: '1rem',
          }}>
            BOOK A CONSULTATION
          </h1>
          <div style={{ width: '60px', height: '3px', background: 'var(--color-primary)', margin: '0 auto 1.5rem', borderRadius: '2px' }} />
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Pick a time that works for you. A Google Meet link is generated automatically — both you and our team receive calendar invites with all the details.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS BAR */}
      <section style={{ background: 'var(--color-navy-mid)', borderBottom: '1px solid rgba(200,75,17,0.1)', padding: '1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {[
            { icon: Calendar, text: 'Pick an available slot' },
            { icon: User,     text: 'Enter your details' },
            { icon: Video,    text: 'Get your Google Meet link' },
            { icon: Mail,     text: 'Both parties receive email invite' },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN BOOKING AREA */}
      <section style={{ background: 'var(--color-navy)', padding: '5rem 1.5rem', minHeight: '60vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Step indicator — hidden on step 3 */}
          {step < 3 && <StepIndicator current={step} />}

          <AnimatePresence mode="wait">

            {/* ── STEP 1: Date + Time ───────────────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {loadingSlots ? (
                  <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{ display: 'inline-block', marginBottom: '1rem' }}
                    >
                      <Loader size={36} color="var(--color-primary)" />
                    </motion.div>
                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                      Checking calendar availability...
                    </p>
                  </div>
                ) : slotsError ? (
                  <GlassCard hover={false} style={{ padding: '3rem', textAlign: 'center' }}>
                    <AlertCircle size={40} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-white)', marginBottom: '0.8rem' }}>
                      COULDN'T LOAD CALENDAR
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                      {slotsError.includes('vercel dev')
                        ? 'The booking API requires Vercel to run. Either deploy the site to Vercel, or run the project locally using "vercel dev" instead of "npm run dev".'
                        : slotsError}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                      In the meantime, book directly:
                      <br /><br />
                      <a href="tel:08160124685" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>08160124685</a>
                      {'  ·  '}
                      <a href="https://wa.me/2348160124685" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>WhatsApp</a>
                      {'  ·  '}
                      <a href="mailto:alphapointnig@yahoo.com" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Email</a>
                    </p>
                  </GlassCard>
                ) : slots.length === 0 ? (
                  <GlassCard hover={false} style={{ padding: '3rem', textAlign: 'center' }}>
                    <Calendar size={40} color="var(--color-primary)" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-white)', marginBottom: '0.8rem' }}>
                      NO SLOTS AVAILABLE RIGHT NOW
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)' }}>
                      Our calendar appears fully booked for the next 3 weeks. Please contact us directly.
                    </p>
                    <a href="https://wa.me/2348160124685" target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '1.5rem', background: '#25D366', color: 'white', padding: '12px 24px', borderRadius: '6px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem' }}>
                      WhatsApp Us
                    </a>
                  </GlassCard>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>

                    {/* Calendar */}
                    <GlassCard hover={false} style={{ padding: '2rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-white)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
                        SELECT A DATE
                      </h3>
                      <MonthCalendar
                        availableDateKeys={availableDateKeys}
                        selectedDate={selectedDate}
                        onSelectDate={handleDateSelect}
                      />
                    </GlassCard>

                    {/* Time slots */}
                    <div>
                      <GlassCard hover={false} style={{ padding: '2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-white)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
                          {selectedDate ? `AVAILABLE TIMES — ${formatDisplayDate(selectedDate).split(',')[0].toUpperCase()}` : 'SELECT A DATE FIRST'}
                        </h3>

                        {!selectedDate ? (
                          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                            Click a highlighted date on the calendar to see available 1-hour slots.
                          </p>
                        ) : slotsForDate.length === 0 ? (
                          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                            No slots available on this date. Please pick another day.
                          </p>
                        ) : (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.6rem' }}>
                            {slotsForDate.map((slot) => {
                              const isSelected = selectedSlot?.start === slot.start
                              return (
                                <motion.button
                                  key={slot.start}
                                  onClick={() => handleSlotSelect(slot)}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.97 }}
                                  style={{
                                    padding: '12px 8px',
                                    borderRadius: '8px',
                                    border: '1px solid ' + (isSelected ? 'var(--color-primary)' : 'rgba(200,75,17,0.2)'),
                                    background: isSelected ? 'var(--color-primary)' : 'rgba(200,75,17,0.07)',
                                    color: isSelected ? 'var(--color-white)' : 'var(--color-text-light)',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    transition: 'background 0.18s ease, border-color 0.18s ease',
                                  }}
                                >
                                  <Clock size={13} />
                                  {slot.label}
                                </motion.button>
                              )
                            })}
                          </div>
                        )}

                        {selectedSlot && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginTop: '1.5rem' }}
                          >
                            <div style={{
                              background: 'rgba(200,75,17,0.1)',
                              border: '1px solid rgba(200,75,17,0.25)',
                              borderRadius: '8px',
                              padding: '1rem',
                              marginBottom: '1rem',
                            }}>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>Selected</p>
                              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-white)' }}>
                                {formatDisplayDate(selectedSlot.dateKey)}
                              </p>
                              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                                {selectedSlot.label} — 1 hour · WAT
                              </p>
                            </div>

                            <button
                              onClick={handleProceedToDetails}
                              className="btn-shimmer"
                              style={{
                                width: '100%',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 700,
                                fontSize: '0.875rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                background: 'var(--color-primary)',
                                color: 'var(--color-white)',
                                padding: '14px',
                                borderRadius: '6px',
                                border: 'none',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'background 0.2s ease',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-light)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
                            >
                              Continue to Details →
                            </button>
                          </motion.div>
                        )}
                      </GlassCard>

                      {/* Duration info */}
                      <div style={{ marginTop: '1rem', padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', display: 'flex', gap: '0.8rem' }}>
                        <Video size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-text-light)', fontWeight: 500, marginBottom: '0.2rem' }}>Google Meet · 1 Hour · Free</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                            A unique meeting link is generated instantly. Both you and Alpha Point receive a calendar invite with the link by email.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── STEP 2: Your Details ──────────────────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                  {/* Back button */}
                  <button
                    onClick={() => setStep(1)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    <ArrowLeft size={16} /> Back to calendar
                  </button>

                  {/* Booking summary */}
                  <div style={{ background: 'rgba(200,75,17,0.08)', border: '1px solid rgba(200,75,17,0.2)', borderRadius: '10px', padding: '1.2rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} color="var(--color-primary)" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
                        {selectedSlot && formatDisplayDate(selectedSlot.dateKey)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} color="var(--color-primary)" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                        {selectedSlot?.label} WAT · 1 hour
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Video size={16} color="var(--color-primary)" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        Google Meet (link sent by email)
                      </span>
                    </div>
                  </div>

                  <GlassCard hover={false} style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-white)', marginBottom: '0.4rem' }}>
                      YOUR DETAILS
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
                      A Google Meet invite will be sent to your email immediately after booking.
                    </p>

                    <form onSubmit={handleSubmit(onSubmitDetails)} noValidate>
                      {/* Full Name */}
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={labelStyle}>
                          Full Name <span style={{ color: 'var(--color-primary)' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <User size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
                          <input
                            {...register('name')}
                            placeholder="e.g. Adaeze Okafor"
                            style={{ ...inputStyle, paddingLeft: '40px', borderColor: errors.name ? '#fc8181' : undefined }}
                            onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,75,17,0.15)' }}
                            onBlur={e => { e.target.style.borderColor = errors.name ? '#fc8181' : 'rgba(200,75,17,0.25)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                        {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
                      </div>

                      {/* Email */}
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={labelStyle}>
                          Email Address <span style={{ color: 'var(--color-primary)' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="you@example.com"
                            style={{ ...inputStyle, paddingLeft: '40px', borderColor: errors.email ? '#fc8181' : undefined }}
                            onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,75,17,0.15)' }}
                            onBlur={e => { e.target.style.borderColor = errors.email ? '#fc8181' : 'rgba(200,75,17,0.25)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.73rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                          Google Meet link + calendar invite will be sent here
                        </p>
                      </div>

                      {/* Phone */}
                      <div style={{ marginBottom: '1.2rem' }}>
                        <label style={labelStyle}>
                          Phone Number <span style={{ color: 'var(--color-primary)' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Phone size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
                          <input
                            {...register('phone')}
                            type="tel"
                            placeholder="+234 800 000 0000"
                            style={{ ...inputStyle, paddingLeft: '40px', borderColor: errors.phone ? '#fc8181' : undefined }}
                            onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,75,17,0.15)' }}
                            onBlur={e => { e.target.style.borderColor = errors.phone ? '#fc8181' : 'rgba(200,75,17,0.25)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                        {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
                      </div>

                      {/* Topic */}
                      <div style={{ marginBottom: '2rem' }}>
                        <label style={labelStyle}>
                          Consultation Topic <span style={{ color: 'var(--color-primary)' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <MessageSquare size={15} style={{ position: 'absolute', left: '14px', top: '16px', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
                          <textarea
                            {...register('topic')}
                            rows={3}
                            placeholder="Briefly describe your project or what you'd like to discuss..."
                            style={{ ...inputStyle, paddingLeft: '40px', resize: 'vertical', minHeight: '90px', borderColor: errors.topic ? '#fc8181' : undefined }}
                            onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(200,75,17,0.15)' }}
                            onBlur={e => { e.target.style.borderColor = errors.topic ? '#fc8181' : 'rgba(200,75,17,0.25)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                        {errors.topic && <p style={errorStyle}>{errors.topic.message}</p>}
                      </div>

                      {/* Error */}
                      {bookingError && (
                        <div style={{ background: 'rgba(252,129,129,0.08)', border: '1px solid rgba(252,129,129,0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <AlertCircle size={18} color="#fc8181" style={{ flexShrink: 0, marginTop: '1px' }} />
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#fc8181', lineHeight: 1.5 }}>{bookingError}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isBooking}
                        className="btn-shimmer"
                        style={{
                          width: '100%',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 700, fontSize: '0.9rem',
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          background: isBooking ? 'var(--color-primary-dark)' : 'var(--color-primary)',
                          color: 'var(--color-white)',
                          padding: '16px', borderRadius: '6px',
                          border: 'none', overflow: 'hidden',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          transition: 'background 0.2s ease',
                          opacity: isBooking ? 0.8 : 1,
                        }}
                        onMouseEnter={e => { if (!isBooking) e.currentTarget.style.background = 'var(--color-primary-light)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = isBooking ? 'var(--color-primary-dark)' : 'var(--color-primary)' }}
                      >
                        {isBooking ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                              <Loader size={18} />
                            </motion.div>
                            Creating your meeting...
                          </>
                        ) : (
                          <>
                            <Video size={18} />
                            Confirm & Get Meeting Link
                          </>
                        )}
                      </button>

                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.5 }}>
                        By booking you agree to receive a calendar invite at the email provided. No spam — ever.
                      </p>
                    </form>
                  </GlassCard>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Confirmation ──────────────────────────────────────── */}
            {step === 3 && confirmedEvent && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
                  {/* Success icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '80px', height: '80px', borderRadius: '50%',
                      background: 'rgba(200,75,17,0.15)',
                      border: '2px solid var(--color-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                    }}
                  >
                    <CheckCircle size={36} color="var(--color-primary)" />
                  </motion.div>

                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-white)', marginBottom: '0.8rem' }}>
                    MEETING CONFIRMED!
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                    Your consultation with Alpha Point Limited is booked. Check your inbox — both you and our team have received a Google Calendar invite with all the details.
                  </p>

                  {/* Event details card */}
                  <GlassCard hover={false} style={{ padding: '2rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(200,75,17,0.12)', border: '1px solid rgba(200,75,17,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Calendar size={18} color="var(--color-primary)" />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>Date & Time</p>
                          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-light)', fontWeight: 500, lineHeight: 1.5 }}>
                            {confirmedEvent.displayTime || formatFullDateTime(confirmedEvent.start)}
                          </p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Duration: 1 hour</p>
                        </div>
                      </div>

                      <div style={{ height: '1px', background: 'rgba(200,75,17,0.1)' }} />

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(200,75,17,0.12)', border: '1px solid rgba(200,75,17,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Video size={18} color="var(--color-primary)" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>Google Meet Link</p>
                          {confirmedEvent.meetLink ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                              <a
                                href={confirmedEvent.meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', wordBreak: 'break-all', textDecoration: 'underline' }}
                              >
                                {confirmedEvent.meetLink}
                              </a>
                              <button
                                onClick={copyMeetLink}
                                style={{ background: 'rgba(200,75,17,0.12)', border: '1px solid rgba(200,75,17,0.2)', color: copied ? '#68d391' : 'var(--color-primary)', padding: '5px 10px', borderRadius: '6px', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s ease' }}
                              >
                                <Copy size={12} />
                                {copied ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          ) : (
                            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                              Link is in your calendar invite email.
                            </p>
                          )}
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                            Also in your Google Calendar invite email
                          </p>
                        </div>
                      </div>

                      <div style={{ height: '1px', background: 'rgba(200,75,17,0.1)' }} />

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(200,75,17,0.12)', border: '1px solid rgba(200,75,17,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Mail size={18} color="var(--color-primary)" />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>Email Invites Sent</p>
                          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-light)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                            Both you and Alpha Point Limited have received calendar invites with the Google Meet link, date, time, and reminder emails.
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Join button */}
                  {confirmedEvent.meetLink && (
                    <a
                      href={confirmedEvent.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shimmer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        background: 'var(--color-primary)', color: 'var(--color-white)',
                        padding: '16px 40px', borderRadius: '6px',
                        fontFamily: 'var(--font-body)', fontWeight: 700,
                        fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        overflow: 'hidden', marginBottom: '1.5rem',
                        transition: 'background 0.2s ease, transform 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <Video size={18} />
                      Open Google Meet
                    </a>
                  )}

                  <div style={{ borderTop: '1px solid rgba(200,75,17,0.1)', paddingTop: '1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                      Need to reschedule? Contact us at{' '}
                      <a href="tel:08160124685" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>08160124685</a>
                      {' '}or{' '}
                      <a href="https://wa.me/2348160124685" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>WhatsApp</a>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
